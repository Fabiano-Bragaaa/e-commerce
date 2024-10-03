import { Textarea, TextareaInput } from "@gluestack-ui/themed";

export function TextAreaInput() {
  return (
    <>
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
        />
      </Textarea>
    </>
  );
}
