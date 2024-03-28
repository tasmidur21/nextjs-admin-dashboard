import * as MUIcon from "@mui/icons-material";
import { FC, CSSProperties } from 'react';

interface IconProps {
  icon?: keyof typeof MUIcon;
  style?: CSSProperties;
}

const TextToIcon: FC<IconProps> = ({ icon, style }) => {
  const Icon = icon && MUIcon[icon];
  // Apply the provided style to the icon
  return Icon && <Icon style={style} />;
}

export default TextToIcon;
