/**

* BomaFlow
* Module: Properties
* File: properties.files.service.ts
*
* Purpose:
* Handles property-specific file operations while enforcing
* property ownership through the authenticated landlord.
  */

import {
uploadAndCreateFileService,
getFilesByEntityService,
deleteFileService,
} from '../files/files.service.js'

import {
createSignedUrlForStorageFile,
} from '../../services/storage.service.js'

import {
findPropertyByIdForLandlord,
} from './properties.repository.js'

import {
PropertyNotFoundError,
} from './properties.errors.js'

export const uploadPropertyFileService = async (
propertyId: string,
landlordId: string,
data: {
buffer: Buffer
contentType: string
mime: string
size: number
purpose?: 'image' | 'document' | 'agreement' | 'attachment'
sortOrder?: number
isPublic?: boolean
metadata?: Record<string, unknown>
},
) => {
const property =
await findPropertyByIdForLandlord(
propertyId,
landlordId,
)

if (!property) {
throw new PropertyNotFoundError()
}

const extension =
data.mime === 'image/jpeg'
? 'jpg'
: data.mime === 'image/png'
? 'png'
: data.mime === 'image/webp'
? 'webp'
: 'bin'

const path =
`properties/${propertyId}/${crypto.randomUUID()}.${extension}`

return uploadAndCreateFileService({
entityType: 'property',
entityId: propertyId,
purpose: data.purpose ?? 'image',
bucket: 'property-images',
path,
mime: data.mime,
size: data.size,
...(data.sortOrder !== undefined && {
sortOrder: data.sortOrder,
}),
isPublic: data.isPublic ?? false,
...(data.metadata !== undefined && {
metadata: data.metadata,
}),
buffer: data.buffer,
contentType: data.contentType,
})
}

export const getPropertyFilesService = async (
propertyId: string,
landlordId: string,
) => {
const property =
await findPropertyByIdForLandlord(
propertyId,
landlordId,
)

if (!property) {
throw new PropertyNotFoundError()
}

 const files =
await getFilesByEntityService(
'property',
propertyId,
)

return Promise.all(
files.map(
async (file) => ({
...file,
url:
await createSignedUrlForStorageFile(
file.bucket,
file.path,
),
}),
),
)
}

export const deletePropertyFileService = async (
propertyId: string,
fileId: string,
landlordId: string,
) => {
const property =
await findPropertyByIdForLandlord(
propertyId,
landlordId,
)

if (!property) {
throw new PropertyNotFoundError()
}

const files =
await getFilesByEntityService(
'property',
propertyId,
)

const fileBelongsToProperty =
files.some(
(file) => file.id === fileId,
)

if (!fileBelongsToProperty) {
throw new PropertyNotFoundError()
}

return deleteFileService(
fileId,
)
}
