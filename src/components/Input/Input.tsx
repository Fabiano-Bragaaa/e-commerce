import { Input as GSInput, Icon, InputField } from "@gluestack-ui/themed";
import { ComponentProps } from "react";
import { EyeIcon } from "lucide-react-native";

type InputProps = ComponentProps<typeof InputField> & {
  isPassword?: boolean;
  toggleSecurity?: boolean;
};

export function Input({
  isPassword = false,
  toggleSecurity = false,
  ...inputField
}: InputProps) {
  return (
    <GSInput
      h={55}
      borderWidth="$0"
      borderRadius="$lg"
      flexDirection="row"
      alignItems="center"
      px="$4"
      bg="$white"
    >
      <InputField
        fontFamily="$body"
        p="$0"
        color="$gray2"
        flexGrow={1}
        flexShrink={1}
        placeholderTextColor="$gray4"
        {...inputField}
      />
      <Icon as={EyeIcon} color="$gray4" size="lg" />
    </GSInput>
  );
}
