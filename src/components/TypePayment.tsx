import { HStack, Text } from "@gluestack-ui/themed";

import React from "react";
import { SvgProps } from "react-native-svg";

type Props = {
  icon: React.FC<SvgProps> | null;
  title: string;
};

export function TypePayment({ icon: Icon, title }: Props) {
  return (
    <HStack gap="$3" mb="$1">
      {Icon && <Icon width={24} height={24} fill={"#000"} />}
      <Text color="$gray100" fontFamily="$heading">
        {title}
      </Text>
    </HStack>
  );
}
