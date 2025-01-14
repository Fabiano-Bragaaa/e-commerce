import {
  FormControl,
  FormControlErrorText,
  Input as GSInput,
  HStack,
  Icon,
  InputField,
} from "@gluestack-ui/themed";
import { ComponentProps } from "react";
import { EyeIcon, EyeOff, Search, SlidersVertical } from "lucide-react-native";
import { Pressable } from "react-native";
import { FormControlError } from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";

type InputProps = ComponentProps<typeof InputField> & {
  isMoney?: boolean;
  isPassword?: boolean;
  isSearch?: boolean;
  toggleSecurity?: boolean;
  onToggleSecurity?: () => void;
  errorMessage?: string | null;
  isInvalid?: boolean;
  boxProps?: ComponentProps<typeof GSInput>;
};

export function Input({
  isPassword = false,
  isSearch = false,
  isMoney = false,
  toggleSecurity = false,
  onToggleSecurity,
  boxProps,
  errorMessage = null,
  isInvalid = false,
  ...inputField
}: InputProps) {
  const invalid = !!errorMessage || isInvalid;
  return (
    <FormControl isInvalid={invalid} w="$full" mb="$4">
      <GSInput
        isInvalid={invalid}
        h={55}
        borderWidth="$0"
        borderRadius="$lg"
        flexDirection="row"
        alignItems="center"
        px="$4"
        bg="$white"
        $focus={{
          borderWidth: 1,
          borderColor: invalid ? "$redLight" : "$gray1",
        }}
        $invalid={{ borderWidth: 1, borderColor: "$redLight" }}
        {...boxProps}
      >
        {isMoney && (
          <Text color="$gray1" fontFamily="$heading">
            R$
          </Text>
        )}
        <InputField
          fontFamily="$body"
          p="$0"
          color="$gray2"
          flexGrow={1}
          flexShrink={1}
          placeholderTextColor="$gray4"
          {...inputField}
        />
        {isPassword && (
          <Pressable onPress={onToggleSecurity}>
            <Icon
              as={toggleSecurity ? EyeOff : EyeIcon}
              color="$gray4"
              size="lg"
            />
          </Pressable>
        )}
        {isSearch && (
          <HStack gap="$2">
            <Pressable onPress={() => {}}>
              <Icon as={Search} color="$gray1" size="lg" />
            </Pressable>
            <Text color="$gray4">|</Text>
            <Pressable onPress={() => {}}>
              <Icon as={SlidersVertical} color="$gray1" size="lg" />
            </Pressable>
          </HStack>
        )}
      </GSInput>
      <FormControlError>
        <FormControlErrorText color="$red500">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
}
