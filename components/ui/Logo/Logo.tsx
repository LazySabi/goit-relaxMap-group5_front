import Link from "next/link";
import LogoIcon from "../Icons/LogoIcon";
import css from "./Logo.module.css";

interface LogoProps {
  onClick?: () => void;
}

const Logo = ({ onClick }: LogoProps) => {
  return (
    <Link href="/" className={css.logo} onClick={onClick} aria-label="Relax Map — на головну">
      <LogoIcon className={css.icon} aria-hidden="true" />
      <span className={css.text}>Relax Map</span>
    </Link>
  );
};

export default Logo;
