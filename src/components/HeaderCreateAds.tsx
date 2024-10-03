import { Center, HStack, Icon, Text } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { AppRoutesNavigationProps } from "@routes/app.routes";

import { ArrowLeft } from "lucide-react-native";
import { TouchableOpacity } from "react-native";

type Props = {
  title: string;
};

export function HeaderCreateAds({ title }: Props) {
  const navigation = useNavigation<AppRoutesNavigationProps>();
  return (
    <HStack w="$full" alignItems="center" mt="$8">
      <TouchableOpacity onPress={() => navigation.navigate("myAds")}>
        <Icon as={ArrowLeft} color="$gray100" size="xl" />
      </TouchableOpacity>
      <Center flex={1}>
        <Text color="$gray100" fontFamily="$heading" fontSize="$2xl">
          {title}
        </Text>
      </Center>
    </HStack>
  );
}
