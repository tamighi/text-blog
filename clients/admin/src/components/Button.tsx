type Props = {
  active?: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  active = false,
  disabled = false,
  children,
  ...buttonProps
}: Props) => {
  return (
    <button
      {...buttonProps}
      disabled={disabled}
      className={`
        px-3 py-1 rounded
        ${
          active
            ? "bg-fg-primary text-elevation-0"
            : "bg-elevation-2 text-fg-primary"
        }
        ${disabled ? "opacity-50 cursor-default" : "cursor-pointer"}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
