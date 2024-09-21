import { Center, HStack, Icon, Image } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

import { PencilSimpleLine } from "phosphor-react-native";

type Props = ComponentProps<typeof Image>;

export function UserPhoto({ ...rest }: Props) {
  return (
    <Image
      rounded="$full"
      borderWidth="$2"
      borderColor="$blue"
      backgroundColor="$gray500"
      mt="$2"
      {...rest}
    />
  );
}
