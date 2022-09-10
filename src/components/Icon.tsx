import { useTheme } from "hooks";
import React from "react";
import { SvgProps } from "react-native-svg";
import WalletIcon from "../../assets/icons/wallet.svg";

type IconName = "wallet";

const Icons: Record<IconName, React.FC<SvgProps>> = {
  wallet: WalletIcon,
};

interface IconProps {
  name: keyof typeof Icons;
  height?: number;
  width?: number;
  fill?: string;
}

export function Icon({ name, height = 24, width = 24, fill }: IconProps) {
  const { theme } = useTheme();

  const SvgIcon = Icons[name] || Icons["wallet"];

  return (
    <SvgIcon
      height={height}
      width={width}
      fill={
        fill || theme.colors["on-color"][theme.name === "dark" ? "200" : "500"]
      }
    />
  );
}
