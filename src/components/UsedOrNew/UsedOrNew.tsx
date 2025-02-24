import { Center, Text } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof Center> & {
  isViewAds?: boolean;
  isUsed: boolean;
};

export function UsedOrNew({ isViewAds = false, isUsed, ...rest }: Props) {
  return (
    <Center
      bg={isUsed ? "$blue" : "$gray1"}
      rounded="$2xl"
      w={"$16"}
      height="$6"
      {...rest}
    >
      <Text textTransform="uppercase" color={"$white"} fontFamily="$heading">
        {isUsed ? "novo" : "usado"}
      </Text>
    </Center>
  );
}
