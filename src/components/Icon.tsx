import { useTheme } from "hooks";
import React from "react";
import { SvgProps } from "react-native-svg";

import ArrowBackIcon from "../../assets/icons/arrow-back.svg";
import CardInUseIcon from "../../assets/icons/card-in-use.svg";
import MoneyBoxIcon from "../../assets/icons/money-box.svg";
import WalletIcon from "../../assets/icons/wallet.svg";

import type { IconName } from "types";

const Icons: Record<IconName, React.FC<SvgProps>> = {
  wallet: WalletIcon,
  "card-in-use": CardInUseIcon,
  "money-box": MoneyBoxIcon,
  "arrow-back": ArrowBackIcon,
};

interface IconProps extends SvgProps {
  name: keyof typeof Icons;
  height?: number;
  width?: number;
  fill?: string;
}

export function Icon({
  name,
  height = 24,
  width = 24,
  fill,
  ...props
}: IconProps) {
  const { theme } = useTheme();

  const SvgIcon = Icons[name] ?? Icons["wallet"];

  return (
    <SvgIcon
      height={height}
      width={width}
      fill={
        fill || theme.colors["on-color"][theme.name === "dark" ? "200" : "500"]
      }
      {...props}
    />
  );
}
