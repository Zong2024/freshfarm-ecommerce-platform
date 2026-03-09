interface SectionHeaderProps {
  badge: string;
  title: string;
  subtitle: string;
}

export const SectionHeader = ({
  badge,
  title,
  subtitle,
}: SectionHeaderProps) => {
  return (
    <div className="mb-8 flex md:mb-15">
      <div className="bg-primary-400 me-4 w-2 rounded-full md:me-6" />

      <div className="flex flex-col gap-2">
        <div>
          <span className="bg-primary-300 inline-block rounded-full px-2 py-1 font-bold text-white">
            {badge}
          </span>
        </div>

        <h2 className="text-2xl font-bold md:text-4xl">{title}</h2>
        <p className="text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
};
