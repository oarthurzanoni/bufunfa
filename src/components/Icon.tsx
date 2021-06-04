import React from "react";
import { SvgXml } from "react-native-svg";

interface Props {
  svg: string;
  fill: string;
  height: string;
  width: string;
}

export default function Icon({ svg, fill, height, width }: Props): JSX.Element {
  const imagesvg = svg.includes("fill")
    ? svg.replace(/fill="([^"]+)"/i, `fill="${fill}"`)
    : svg.replace("<svg ", `<svg fill="${fill}" `);

  return <SvgXml xml={imagesvg} height={height} width={width} />
}