import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom'

import {
  useState,
} from 'react'

import type {
  ChangeEvent,
} from 'react'

import {
  useProperty,
} from '../../hooks/useProperties'

import {
  useUnitsByProperty,
} from '../../hooks/useUnits'

import {
  useDeleteProperty,
  useArchiveProperty,
  useRestoreProperty,
  usePropertyFiles,
  useUploadPropertyFile,
  useDeletePropertyFile,
} from '../../hooks/usePropertyMutations'

import ConfirmDialog from '../../components/common/ConfirmDialog'

export default function PropertyDetailsPage() {
  const navigate =
    useNavigate()

  const { propertyId } =
    useParams()

  const {
    data: property,
    isLoading,
    error,
  } = useProperty(
    propertyId ?? '',
  )

  const {
    data: units,
    isLoading: unitsLoading,
  } = useUnitsByProperty(
    propertyId ?? '',
  )

  const {
    data: propertyFiles,
    isLoading: propertyFilesLoading,
    error: propertyFilesError,
  } = usePropertyFiles(
    propertyId ?? '',
  )

  const deleteProperty =
    useDeleteProperty()

  const archiveProperty =
    useArchiveProperty()

  const restoreProperty =
    useRestoreProperty()

  const uploadPropertyFile =
    useUploadPropertyFile()

  const deletePropertyFile =
    useDeletePropertyFile()

  const [
    showDeleteDialog,
    setShowDeleteDialog,
  ] = useState(false)

  const [
    showArchiveDialog,
    setShowArchiveDialog,
  ] = useState(false)

  const [
    showRestoreDialog,
    setShowRestoreDialog,
  ] = useState(false)

  const [
    actionError,
    setActionError,
  ] = useState<string | null>(null)

  const [
    fileError,
    setFileError,
  ] = useState<string | null>(null)

  const [
    selectedFile,
    setSelectedFile,
  ] = useState<File | null>(null)

  const [
    isUploadingFile,
    setIsUploadingFile,
  ] = useState(false)

  const totalUnits =
    units?.length ?? 0

  const vacantUnits =
    units?.filter(
      (unit) =>
        unit.status === 'vacant',
    ).length ?? 0

  const occupiedUnits =
    units?.filter(
      (unit) =>
        unit.status === 'occupied',
    ).length ?? 0

  const maintenanceUnits =
    units?.filter(
      (unit) =>
        unit.status === 'maintenance',
    ).length ?? 0

  const occupancyRate =
    totalUnits > 0
      ? Math.round(
          (occupiedUnits /
            totalUnits) *
            100,
        )
      : 0

  const imageFiles =
    propertyFiles?.filter(
      (file) =>
        file.purpose === 'image' ||
        file.mime?.startsWith(
          'image/',
        ),
    ) ?? []

  async function handleDelete() {
    if (!property) {
      return
    }

    try {
      setActionError(null)

      await deleteProperty.mutateAsync(
        property.id,
      )

      setShowDeleteDialog(false)

      navigate(
        '/dashboard/properties',
      )
    } catch {
      setShowDeleteDialog(false)

      setActionError(
        'Unable to delete property. This property still contains units. Remove units first or archive the property.',
      )
    }
  }

  async function handleArchive() {
    if (!property) {
      return
    }

    try {
      setActionError(null)

      await archiveProperty.mutateAsync(
        property.id,
      )

      setShowArchiveDialog(false)
    } catch {
      setShowArchiveDialog(false)

      setActionError(
        'Unable to archive property.',
      )
    }
  }

  async function handleRestore() {
    if (!property) {
      return
    }

    try {
      setActionError(null)

      await restoreProperty.mutateAsync(
        property.id,
      )

      setShowRestoreDialog(false)
    } catch {
      setShowRestoreDialog(false)

      setActionError(
        'Unable to restore property.',
      )
    }
  }
    async function handleFileUpload(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file =
      event.target.files?.[0] ?? null

    event.target.value = ''

    if (!propertyId || !file) {
      return
    }

    setFileError(null)

    if (!file.type.startsWith('image/')) {
      setFileError(
        'Please select a valid image file.',
      )

      return
    }

    const maxSize =
      10 * 1024 * 1024

    if (file.size > maxSize) {
      setFileError(
        'Image must be 10 MB or smaller.',
      )

      return
    }

    setSelectedFile(file)

    try {
      setIsUploadingFile(true)

      await uploadPropertyFile.mutateAsync(
        {
          propertyId,
          options: {
            file,
            purpose: 'image',
            isPublic: true,
          },
        },
      )

      setSelectedFile(null)
    } catch (error) {
      setFileError(
        error instanceof Error
          ? error.message
          : 'Unable to upload property image.',
      )
    } finally {
      setIsUploadingFile(false)
    }
  }

  async function handleDeleteFile(
    fileId: string,
  ) {
    if (!propertyId) {
      return
    }

    try {
      setFileError(null)

      await deletePropertyFile.mutateAsync(
        {
          propertyId,
          fileId,
        },
      )
    } catch (error) {
      setFileError(
        error instanceof Error
          ? error.message
          : 'Unable to delete property image.',
      )
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-xl border bg-white p-8 shadow-sm">
        <p className="text-slate-600">
          Loading property...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8">
        <h2 className="text-lg font-semibold text-red-700">
          Failed to load property
        </h2>

        <p className="mt-2 text-red-600">
          {
            error instanceof Error
              ? error.message
              : 'Something went wrong.'
          }
        </p>

        <Link
          to="/dashboard/properties"
          className="mt-6 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-white"
        >
          Back to Properties
        </Link>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="rounded-xl border bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold">
          Property not found
        </h2>

        <Link
          to="/dashboard/properties"
          className="mt-6 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-white"
        >
          Back to Properties
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {actionError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <h2 className="text-lg font-semibold text-red-700">
            Property Action Failed
          </h2>

          <p className="mt-2 text-red-600">
            {actionError}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {property.name}
          </h1>

          <p className="mt-2 text-slate-600">
            Property Details
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to={`/dashboard/properties/${property.id}/edit`}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100"
          >
            Edit Property
          </Link>

          {property.status === 'archived' ? (
            <button
              type="button"
              onClick={() => {
                setActionError(null)
                setShowRestoreDialog(true)
              }}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              Restore Property
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setActionError(null)
                setShowArchiveDialog(true)
              }}
              className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
            >
              Archive Property
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setActionError(null)
              setShowDeleteDialog(true)
            }}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Delete Property
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Total Units
          </p>

          <p className="mt-2 text-3xl font-bold">
            {totalUnits}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Vacant
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {vacantUnits}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Occupied
          </p>

          <p className="mt-2 text-3xl font-bold text-blue-600">
            {occupiedUnits}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Maintenance
          </p>

          <p className="mt-2 text-3xl font-bold text-amber-600">
            {maintenanceUnits}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Occupancy Rate
          </p>

          <p className="mt-2 text-3xl font-bold text-indigo-600">
            {occupancyRate}%
          </p>
        </div>
      </div>
            <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              Property Images
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Upload photos of this property for
              verification, management, and future
              listings.
            </p>
          </div>
        </div>

        {fileError && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-700">
              {fileError}
            </p>
          </div>
        )}

        <div className="mb-6 rounded-lg border border-dashed border-slate-300 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileUpload}
              disabled={
                isUploadingFile ||
                uploadPropertyFile.isPending
              }
              className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200"
            />

            <span className="text-xs text-slate-500">
              JPG, PNG, WebP, or GIF. Max 10 MB.
            </span>
          </div>

          {selectedFile && (
            <p className="mt-2 text-sm text-slate-500">
              Selected: {selectedFile.name}
            </p>
          )}

          {(isUploadingFile ||
            uploadPropertyFile.isPending) && (
            <p className="mt-3 text-sm font-medium text-slate-600">
              Uploading image...
            </p>
          )}
        </div>

        {propertyFilesLoading ? (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="text-slate-600">
              Loading property images...
            </p>
          </div>
        ) : propertyFilesError ? (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-600">
              Unable to load property images.
            </p>
          </div>
        ) : imageFiles.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {imageFiles.map((file) => (
              <div
                key={file.id}
                className="group overflow-hidden rounded-xl border bg-slate-50"
              >
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  {file.url ? (
                    <img
                      src={file.url}
                      alt={`${property.name} property`}
                      className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center p-4 text-center text-sm text-slate-500">
                      Image URL unavailable
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-3 p-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-700">
                      {file.path
                        .split('/')
                        .pop() ??
                        'Property image'}
                    </p>

                    {file.size !== null &&
                      file.size !== undefined && (
                        <p className="text-xs text-slate-500">
                          {Math.ceil(
                            file.size / 1024,
                          )}{' '}
                          KB
                        </p>
                      )}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteFile(
                        file.id,
                      )
                    }
                    disabled={
                      deletePropertyFile.isPending
                    }
                    className="shrink-0 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {deletePropertyFile.isPending
                      ? 'Deleting...'
                      : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 p-10 text-center">
            <div className="mx-auto max-w-md">
              <h3 className="font-medium text-slate-900">
                No property images yet
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Upload clear photos of the property.
                These images can later support
                property verification and listings.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">
            Basic Information
          </h2>

          <dl className="space-y-3">
            <div className="flex justify-between gap-4">
              <dt className="font-medium text-slate-500">
                Name
              </dt>

              <dd className="text-right">
                {property.name}
              </dd>
            </div>

            <div className="flex justify-between gap-4">
              <dt className="font-medium text-slate-500">
                Type
              </dt>

              <dd className="text-right">
                {property.type ?? '-'}
              </dd>
            </div>

            <div className="flex justify-between gap-4">
              <dt className="font-medium text-slate-500">
                Status
              </dt>

              <dd className="text-right">
                {property.status}
              </dd>
            </div>

            <div className="flex justify-between gap-4">
              <dt className="font-medium text-slate-500">
                Total Units
              </dt>

              <dd className="text-right">
                {property.total_units}
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">
            Location
          </h2>

          <dl className="space-y-3">
            <div className="flex justify-between gap-4">
              <dt className="font-medium text-slate-500">
                County
              </dt>

              <dd className="text-right">
                {property.county ?? '-'}
              </dd>
            </div>

            <div className="flex justify-between gap-4">
              <dt className="font-medium text-slate-500">
                Town
              </dt>

              <dd className="text-right">
                {property.town ?? '-'}
              </dd>
            </div>

            <div className="flex justify-between gap-4">
              <dt className="font-medium text-slate-500">
                Address
              </dt>

              <dd className="text-right">
                {property.address ?? '-'}
              </dd>
            </div>
          </dl>
        </div>
      </div>
            <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Units
          </h2>

          <Link
            to={`/dashboard/properties/${property.id}/units/new`}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white hover:bg-slate-800"
          >
            Add Unit
          </Link>
        </div>

        {unitsLoading ? (
          <p className="text-slate-600">
            Loading units...
          </p>
        ) : units &&
          units.length > 0 ? (
          <div className="space-y-3">
            {units.map((unit) => (
              <Link
                key={unit.id}
                to={`/dashboard/properties/${property.id}/units/${unit.id}`}
                className="block rounded-lg border p-4 hover:bg-slate-50"
              >
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="font-medium">
                      Unit {unit.unit_number}
                    </p>

                    <p className="text-sm text-slate-500">
                      {unit.bedrooms ?? 0}{' '}
                      bedrooms ·{' '}
                      {unit.bathrooms ?? 0}{' '}
                      bathrooms
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-medium">
                      KES {unit.rent_amount}
                    </p>

                    <p className="text-sm text-slate-500">
                      {unit.status}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-slate-600">
            No units added yet.
          </p>
        )}
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">
          Description
        </h2>

        <p className="text-slate-600">
          {property.description ??
            'No description has been provided for this property.'}
        </p>
      </div>

      <ConfirmDialog
        open={showArchiveDialog}
        title="Archive Property"
        message={
          <>
            Are you sure you want to archive{' '}
            <strong>
              {property.name}
            </strong>
            ?

            <br />
            <br />

            Archived properties will no longer
            appear as active properties.
          </>
        }
        confirmText="Archive Property"
        confirmVariant="danger"
        loading={
          archiveProperty.isPending
        }
        onCancel={() =>
          setShowArchiveDialog(false)
        }
        onConfirm={
          handleArchive
        }
      />

      <ConfirmDialog
        open={showRestoreDialog}
        title="Restore Property"
        message={
          <>
            Are you sure you want to restore{' '}
            <strong>
              {property.name}
            </strong>
            ?
          </>
        }
        confirmText="Restore Property"
        loading={
          restoreProperty.isPending
        }
        onCancel={() =>
          setShowRestoreDialog(false)
        }
        onConfirm={
          handleRestore
        }
      />

      <ConfirmDialog
        open={showDeleteDialog}
        title="Delete Property"
        message={
          <>
            Are you sure you want to delete{' '}
            <strong>
              {property.name}
            </strong>
            ?

            <br />
            <br />

            This action cannot be undone.
          </>
        }
        confirmText="Delete Property"
        confirmVariant="danger"
        loading={
          deleteProperty.isPending
        }
        onCancel={() =>
          setShowDeleteDialog(false)
        }
        onConfirm={
          handleDelete
        }
      />
    </div>
  )
}