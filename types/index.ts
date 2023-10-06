import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export type FormInputPost = {
  title: string;
  content: string;
  tagId: string;
};

