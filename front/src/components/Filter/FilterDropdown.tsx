type FilterDropdownProps = {
  options: (string | { value: string; label: string })[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel?: string;
  defaultLabel?: string;
};

export const FilterDropdown = ({
  options,
  value,
  onChange,
  ariaLabel = "Selecione uma opção",
  defaultLabel = "Selecione",
}: FilterDropdownProps) => {
  return (
    <select
      className="form-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={ariaLabel}
    >
      {options.map((option) => {
        const value = typeof option === "string" ? option : option.value;
        const label = typeof option === "string" ? option : option.label;

        return (
          <option key={value} value={value}>
            {value === "todas" && defaultLabel ? defaultLabel : label}
          </option>
        );
      })}
    </select>
  );
};
