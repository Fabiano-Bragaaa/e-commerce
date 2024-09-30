import { Image } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof Image>;

export function ImageAds({ ...rest }: Props) {
  return <Image rounded="$lg" {...rest} />;
}
