import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  Textarea,
  TextareaInput,
} from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof TextareaInput> & {
  errorMessage?: string | null;
  isInvalid?: boolean;
};

export function TextAreaInput({
  errorMessage = null,
  isInvalid = false,
  ...rest
}: Props) {
  const invalid = !!errorMessage;
  return (
    <FormControl isInvalid={invalid} w="$full">
      <Textarea
        height={200}
        bg="$white"
        rounded="$md"
        borderWidth={0}
        mt="$4"
        w="$full"
      >
        <TextareaInput
          placeholder="descrição do produto"
          fontFamily="$body"
          fontSize="$lg"
          color="$gray300"
          placeholderTextColor="$gray300"
          {...rest}
        />
      </Textarea>
      <FormControlError>
        <FormControlErrorText color="$red500">
          {errorMessage}
        </FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
}
