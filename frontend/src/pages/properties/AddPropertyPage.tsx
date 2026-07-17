export default function AddPropertyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Add Property
        </h1>

        <p className="mt-1 text-sm text-slate-600">
          Create a new property in BomaFlow.
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <form className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Property Name
            </label>

            <input
              type="text"
              placeholder="Greenview Apartments"
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Property Code
            </label>

            <input
              type="text"
              placeholder="PROP-001"
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Address
            </label>

            <input
              type="text"
              placeholder="Kilimani"
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              City
            </label>

            <input
              type="text"
              placeholder="Nairobi"
              className="w-full rounded-lg border px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-800"
          >
            Save Property
          </button>
        </form>
      </div>
    </div>
  )
}