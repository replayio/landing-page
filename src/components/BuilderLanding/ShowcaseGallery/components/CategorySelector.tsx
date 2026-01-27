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
  onSearchChange,
}: CategorySelectorProps) {
  return (
    <div className="mb-8">
      {/* Category Tabs and Show All */}
      <div className="flex flex-wrap justify-center items-center gap-3 mb-4">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.name
          return (
            <button
              key={category.name}
              onClick={() => onCategorySelect?.(isSelected ? undefined : category.name)}
              className={clsx(
                'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 inline-flex items-center justify-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2',
                isSelected
                  ? 'bg-gray-900 text-white hover:bg-gray-900'
                  : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-100'
              )}
            >
              <span>{category.name}</span>
              <span className="ml-1">({category.count})</span>
            </button>
          )
        })}
        <label className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium text-gray-900 cursor-pointer transition-all duration-200 border border-gray-300 bg-white hover:bg-gray-100">
          <input
            type="checkbox"
            checked={showAll}
            onChange={(e) => onShowAllChange(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 focus:ring-1 cursor-pointer"
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
          className="w-full max-w-md px-4 py-2.5 rounded-lg text-sm text-gray-900 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent placeholder:text-gray-500"
        />
      </div>
    </div>
  )
}
