import { Image } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof Image> & {
  sizeImage?: number;
  isUser?: boolean;
};

export function UserPhoto({ sizeImage, isUser = false, ...rest }: Props) {
  return (
    <Image
      rounded="$full"
      borderWidth="$2"
      borderColor={isUser ? "$white" : "$blueLight"}
      backgroundColor="$gray4"
      resizeMode="cover"
      w={sizeImage}
      h={sizeImage}
      {...rest}
    />
  );
}
