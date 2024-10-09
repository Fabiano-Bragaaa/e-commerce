import { Center, Text } from "@gluestack-ui/themed";

type Props = {
  title: string;
};

export function TypeAds({ title }: Props) {
  return (
    <Center w={60} h={30} bg="$gray400" rounded="$2xl" mt="$3">
      <Text
        color="$gray100"
        fontFamily="$heading"
        fontSize={12}
        textTransform="uppercase"
      >
        {title}
      </Text>
    </Center>
  );
}
