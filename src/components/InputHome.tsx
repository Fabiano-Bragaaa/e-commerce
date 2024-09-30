import { ComponentProps } from "react";
import { TouchableOpacity } from "react-native";

import {
  Center,
  Input as GluestackInput,
  HStack,
  Icon,
  InputField,
  Text,
} from "@gluestack-ui/themed";

import { Search, SlidersVertical } from "lucide-react-native";

type Props = ComponentProps<typeof InputField> & {
  securityType?: boolean;
  openModal: () => void;
};

export function InputHome({ openModal, securityType = false, ...rest }: Props) {
  return (
    <GluestackInput
      bg="$white"
      rounded="$md"
      borderWidth={0}
      mt="$4"
      w="$full"
      h="$12"
    >
      <InputField
        fontFamily="$body"
        fontSize="$lg"
        color="$gray300"
        placeholderTextColor="$gray300"
        {...rest}
      />

      <HStack mr="$4" alignItems="center" justifyContent="center">
        <TouchableOpacity>
          <Icon as={Search} color="$black" size="lg" />
        </TouchableOpacity>

        <Text px="$2" fontFamily="$body" fontSize="$lg" color="$gray300">
          |
        </Text>

        <TouchableOpacity onPress={openModal}>
          <Icon as={SlidersVertical} color="$black" size="lg" />
        </TouchableOpacity>
      </HStack>
    </GluestackInput>
  );
}
