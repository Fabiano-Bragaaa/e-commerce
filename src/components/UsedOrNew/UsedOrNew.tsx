import { Center, Text } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof Center> & {
  isViewAds?: boolean;
  isUsed: boolean;
};

export function UsedOrNew({ isViewAds = false, isUsed, ...rest }: Props) {
  return (
    <Center
      bg={isUsed ? "$blue" : "$gray5"}
      rounded="$2xl"
      w={isViewAds ? "$16" : "$20"}
      height="$8"
      {...rest}
    >
      <Text
        textTransform="uppercase"
        color={isUsed ? "$white" : "$gray1"}
        fontFamily="$heading"
      >
        {isUsed ? "novo" : "usado"}
      </Text>
    </Center>
  );
}
