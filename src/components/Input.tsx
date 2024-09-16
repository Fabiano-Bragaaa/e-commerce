import { Input as GluestackInput, InputField } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof InputField>;

export function Input({ ...rest }: Props) {
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
    </GluestackInput>
  );
}
