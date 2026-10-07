import clsx from "clsx";
import css from "./Button.module.css";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost"; //  | "outline"
  size?: "sm" | "icon-sm" | "md" | "icon-md"; //  | "lg"
}

export default function Button({ children, className, variant = "primary", size = "md", ...props }: ButtonProps): React.ReactNode {
  const variantClass = css[`button--variant-${variant}`];
  const sizeClass = css[`button--size-${size}`];

  return (
    <button {...props} className={clsx(css.button, variantClass, sizeClass, className)}>
      {children}
    </button>
  );
}
