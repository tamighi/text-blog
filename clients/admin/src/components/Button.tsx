type ButtonVariant = "active" | "primary" | "secondary" | "success";

type Props = {
  variant?: ButtonVariant;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variantStyles: { [K in ButtonVariant]: string } = {
  active: "bg-primary text-elevation-0",
  primary: "bg-primary text-elevation-0",
  secondary: "bg-elevation-2 text-secondary border border-elevation-3",
  success: "bg-success text-elevation-0",
};

const Button = ({
  variant = "primary",
  disabled = false,
  children,
  ...buttonProps
}: Props) => {
  return (
    <button
      {...buttonProps}
      disabled={disabled}
      className={` px-3 py-1 rounded transition-colors ${variantStyles[variant]}
        ${disabled ? "opacity-50 cursor-default" : "cursor-pointer hover:brightness-110"}
        `}
    >
      {children}
    </button>
  );
};

export default Button;
