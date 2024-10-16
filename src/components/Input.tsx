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
  heightType?: "primary" | "secondary";
  errorMessage?: string | null;
  isInvalid?: boolean;
};

export function Input({
  heightType = "primary",
  securityType = false,
  isInvalid = false,
  errorMessage = null,
  ...rest
}: Props) {
  const [security, setSecurity] = useState(false);
  const invalid = !!errorMessage || !!isInvalid;
  return (
    <FormControl isInvalid={invalid} w="$full" mb="$4">
      <GluestackInput
        isInvalid={invalid}
        bg="$white"
        rounded="$md"
        borderWidth={0}
        mt="$4"
        w="$full"
        h={heightType === "primary" ? "$12" : "$64"}
      >
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
