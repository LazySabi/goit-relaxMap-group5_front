import "../common.module.css";
import css from "./Spinner.module.css";
import { SpinnerDotted } from "spinners-react";

interface SpinnerProps {
  size?: number;
  color?: string;
}

export default function Spinner({
  size = 48,
  color = "var(--color-coral)",
}: SpinnerProps): React.ReactNode {
  return <SpinnerDotted color={color} size={size} />;
}
