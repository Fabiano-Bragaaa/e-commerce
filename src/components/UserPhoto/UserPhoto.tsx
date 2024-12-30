import { Image } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof Image> & {
  sizeImage?: number;
};

export function UserPhoto({ sizeImage, ...rest }: Props) {
  return (
    <Image
      rounded="$full"
      borderWidth="$2"
      borderColor="$blueLight"
      backgroundColor="$gray4"
      w={sizeImage}
      h={sizeImage}
      {...rest}
    />
  );
}
