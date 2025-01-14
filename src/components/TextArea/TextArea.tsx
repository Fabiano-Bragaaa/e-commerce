import { FormControlErrorText } from "@gluestack-ui/themed";
import {
  TextareaInput,
  Textarea as GSTextArea,
  FormControl,
  FormControlError,
} from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type TextAreaProps = ComponentProps<typeof TextareaInput> & {
  errorMessage?: string | null;
  isInvalid?: boolean;
  boxProps?: ComponentProps<typeof GSTextArea>;
};

export function TextArea({
  boxProps,
  errorMessage = null,
  isInvalid = false,
  ...textareaInput
}: TextAreaProps) {
  const invalid = !!errorMessage || isInvalid;
  return (
    <FormControl isInvalid={invalid} w="$full" mb="$4">
      <GSTextArea
        size="md"
        h="$32"
        isReadOnly={false}
        isInvalid={invalid}
        isDisabled={false}
        borderWidth="$0"
        borderRadius="$lg"
        px="$4"
        bg="$white"
        $focus={{
          borderWidth: 1,
          borderColor: invalid ? "$redLight" : "$gray1",
        }}
        $invalid={{ borderWidth: 1, borderColor: "$redLight" }}
        {...boxProps}
      >
        <TextareaInput {...textareaInput} />
      </GSTextArea>
      <FormControlError>
        <FormControlErrorText color="$red500">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
}
