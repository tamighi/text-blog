type ButtonColor = "primary" | "secondary" | "success";
type ButtonVariant = "filed" | "outlined";

type Props = {
  color?: ButtonColor;
  variant?: ButtonVariant;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const filed: Record<ButtonColor, string> = {
  primary: "bg-primary text-elevation-0",
  secondary: "bg-elevation-2 text-secondary border border-elevation-3",
  success: "bg-success text-elevation-0",
};

const outlined: Record<ButtonColor, string> = {
  primary: "bg-transparent text-primary border border-primary",
  secondary: "bg-transparent text-secondary border border-secondary",
  success: "bg-transparent text-success border border-success",
};

const Button = ({
  color = "primary",
  variant = "filed",
  disabled = false,
  className = "",
  children,
  ...buttonProps
}: Props) => {
  const variantStyles = variant === "filed" ? filed[color] : outlined[color];

  return (
    <button
      {...buttonProps}
      disabled={disabled}
      className={`px-3 py-1 rounded font-semibold transition-colors
        ${variantStyles} ${
          disabled
            ? "opacity-50 cursor-default"
            : "cursor-pointer hover:brightness-110"
        } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
