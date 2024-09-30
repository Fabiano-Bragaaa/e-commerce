import { Center, HStack, Icon, Image } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

import { PencilSimpleLine } from "phosphor-react-native";

type Props = ComponentProps<typeof Image> & {
  type?: "primary" | "secondary";
};

export function UserPhoto({ type = "primary", ...rest }: Props) {
  return (
    <Image
      rounded="$full"
      borderWidth="$2"
      borderColor={type === "primary" ? "$blue" : "$white"}
      backgroundColor="$gray500"
      mt="$2"
      {...rest}
    />
  );
}
