import { Center, Heading, Text, VStack } from "@gluestack-ui/themed";

type Props = {
  title: string;
  subtitle: string;
};

export function Highlight({ title, subtitle }: Props) {
  return (
    <Center>
      <Text fontFamily="$heading" fontSize="$4xl" color="$gray50">
        {title}
      </Text>
      <Text
        fontFamily="$body"
        color="$gray200"
        fontSize="$lg"
        textAlign="center"
      >
        {subtitle}
      </Text>
    </Center>
  );
}
