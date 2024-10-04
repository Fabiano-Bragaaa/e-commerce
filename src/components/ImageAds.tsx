import { Image } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof Image> & {
  roundedType?: boolean;
};

export function ImageAds({ roundedType = false, ...rest }: Props) {
  return <Image rounded={roundedType ? 0 : "$lg"} {...rest} />;
}
