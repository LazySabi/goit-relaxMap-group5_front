import clsx from "clsx";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import "../common.module.css";
import css from "./Link.module.css";

type LinkProps = NextLinkProps & {
  children?: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost"; //  | "outline"
  size?: "sm" | "icon-sm" | "md" | "icon-md"; //  | "lg"
};

export default function Link({ children, className, variant = "ghost", size = "md", ...props }: LinkProps): React.ReactNode {
  const variantClass = css[`link--variant-${variant}`];
  const sizeClass = css[`link--size-${size}`];

  return (
    <NextLink {...props} className={clsx(css.link, variantClass, sizeClass, className)}>
      {children}
    </NextLink>
  );
}
