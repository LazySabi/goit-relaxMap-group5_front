export type IconName = "logo" | "youtube" | "twitter" | "star_empty" | "star_half" | "star_filled" | "select_check_box" | "menu" | "map_search" | "logout" | "keyboard_arrow_up" | "keyboard_arrow_down" | "instagram" | "filter_alt" | "facebook" | "edit" | "communication" | "close" | "chevron_right" | "chevron_left" | "bookmark" | "arrow_forward" | "arrow_back" | "error";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  width?: number;
  height?: number;
}

export default function Icon({ name, width = 24, height = width, className, ...props }: IconProps) {
  return (
    <svg width={width} height={height} className={className} {...props}>
      <use href={`/sprite.svg#${name}`}></use>
    </svg>
  );
}
