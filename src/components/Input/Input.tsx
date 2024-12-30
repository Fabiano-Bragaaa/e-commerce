import { Input as GSInput, Icon, InputField } from "@gluestack-ui/themed";
import { ComponentProps } from "react";
import { EyeIcon, EyeOff } from "lucide-react-native";
import { Pressable } from "react-native";

type InputProps = ComponentProps<typeof InputField> & {
  isPassword?: boolean;
  toggleSecurity?: boolean;
  onToggleSecurity?: () => void;
  boxProps?: ComponentProps<typeof GSInput>;
};

export function Input({
  isPassword = false,
  toggleSecurity = false,
  onToggleSecurity,
  boxProps,
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
      {...boxProps}
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
      {isPassword && (
        <Pressable onPress={onToggleSecurity}>
          <Icon
            as={toggleSecurity ? EyeOff : EyeIcon}
            color="$gray4"
            size="lg"
          />
        </Pressable>
      )}
    </GSInput>
  );
}
