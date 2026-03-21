import React from "react";

type AutocompleteProps = {
  options: string[];
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
};

const Autocomplete = ({
  options,
  value,
  onChange,
  placeholder,
}: AutocompleteProps) => {
  const [open, setOpen] = React.useState(false);

  const filtered = React.useMemo(() => {
    return options.filter((o) => o.toLowerCase().includes(value.toLowerCase()));
  }, [options, value]);

  return (
    <div className="relative">
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          onChange?.(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 100)}
        className="input"
      />

      {open && filtered.length > 0 && (
        <ul
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg
            border border-border bg-elevation-1 shadow-lg"
        >
          {filtered.map((option) => (
            <li
              key={option}
              onMouseDown={() => {
                onChange?.(option);
                setOpen(false);
              }}
              className="cursor-pointer px-3 py-2 hover:bg-elevation-2"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
