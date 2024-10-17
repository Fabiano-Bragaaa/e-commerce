import { Text } from "@gluestack-ui/themed";
import { FormControl, FormControlErrorText } from "@gluestack-ui/themed";
import {
  Center,
  FormControlError,
  Input as GluestackInput,
  Icon,
  InputField,
} from "@gluestack-ui/themed";
import { Eye, EyeOff } from "lucide-react-native";
import { ComponentProps, useState } from "react";
import { TouchableOpacity } from "react-native";

type Props = ComponentProps<typeof InputField> & {
  securityType?: boolean;
  showValue?: boolean;
  heightType?: "primary" | "secondary";
  errorMessage?: string | null;
};

export function Input({
  heightType = "primary",
  showValue = false,
  securityType = false,
  errorMessage = null,
  ...rest
}: Props) {
  const [security, setSecurity] = useState(false);
  const invalid = !!errorMessage;
  return (
    <FormControl isInvalid={invalid} w="$full">
      <GluestackInput
        isInvalid={invalid}
        bg="$white"
        rounded="$md"
        borderWidth={0}
        mt="$4"
        w="$full"
        h={heightType === "primary" ? "$12" : "$64"}
      >
        {showValue && (
          <Center gap="$3" pl="$4">
            <Text color="$gray200" fontFamily="$heading" fontSize="$lg">
              R$
            </Text>
          </Center>
        )}
        <InputField
          fontFamily="$body"
          fontSize="$lg"
          color="$gray300"
          placeholderTextColor="$gray300"
          secureTextEntry={security}
          {...rest}
        />
        {securityType && (
          <Center mr="$4">
            <TouchableOpacity onPress={() => setSecurity(!security)}>
              {security ? (
                <Icon as={EyeOff} color="$black" size="lg" />
              ) : (
                <Icon as={Eye} color="$black" size="lg" />
              )}
            </TouchableOpacity>
          </Center>
        )}
      </GluestackInput>
      <FormControlError>
        <FormControlErrorText color="$red500">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
}
