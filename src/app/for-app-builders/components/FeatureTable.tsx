// Label/detail rows inside a card, used under both loop diagrams.
export function FeatureTable({ rows }: { rows: Array<[string, string]> }) {
  return (
    <div className="mt-10 overflow-hidden rounded-xl border border-gray-200 bg-white">
      <dl className="divide-y divide-gray-100">
        {rows.map(([label, detail]) => (
          <div key={label} className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:gap-6">
            <dt className="flex flex-shrink-0 items-start gap-2.5 font-semibold text-gray-900 sm:w-48">
              <span className="mt-[0.6rem] h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
              {label}
            </dt>
            <dd className="leading-relaxed text-gray-600">{detail}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
