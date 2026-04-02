interface FilterBadgesProps {
  activeFilters: (string | undefined)[];
}

export const FilterBadges = ({ activeFilters }: FilterBadgesProps) => {
  const filtered = activeFilters.filter(Boolean);

  if (filtered.length === 0) return null;

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {filtered.map((filter) => (
        <span
          key={filter}
          className="bg-primary-100 text-primary-400 rounded-full px-3 py-1 text-sm font-medium"
        >
          {filter}
        </span>
      ))}
    </div>
  );
};
