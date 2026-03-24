import clsx from 'clsx'

export interface IntroSectionCategory {
  name: string
  count: number
}

interface CategorySelectorProps {
  categories: IntroSectionCategory[]
  selectedCategory?: string
  onCategorySelect?: (categoryName: string | undefined) => void
  showAll: boolean
  onShowAllChange: (showAll: boolean) => void
  searchTerm: string
  onSearchChange: (searchTerm: string) => void
}

export function CategorySelector({
  categories,
  selectedCategory,
  onCategorySelect,
  showAll,
  onShowAllChange,
  searchTerm,
  onSearchChange
}: CategorySelectorProps) {
  return (
    <div className="mb-8">
      {/* Category Tabs and Show All */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-3">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.name
          return (
            <button
              key={category.name}
              onClick={() => onCategorySelect?.(isSelected ? undefined : category.name)}
              className={clsx(
                'inline-flex items-center justify-center whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2',
                isSelected
                  ? 'bg-gray-900 text-white hover:bg-gray-900'
                  : 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-100'
              )}
            >
              <span>{category.name}</span>
              <span className="ml-1">({category.count})</span>
            </button>
          )
        })}
        <label className="flex cursor-pointer items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100">
          <input
            type="checkbox"
            checked={showAll}
            onChange={(e) => onShowAllChange(e.target.checked)}
            className="h-4 w-4 cursor-pointer rounded border-gray-300 focus:ring-1"
          />
          <span>Show All</span>
        </label>
      </div>

      {/* Search Input */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search apps by name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full max-w-md rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>
    </div>
  )
}
