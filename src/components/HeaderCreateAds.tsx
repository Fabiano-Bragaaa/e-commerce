import { Center, HStack, Icon, Text } from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import { AppRoutesNavigationProps } from "@routes/app.routes";

import { ArrowLeft } from "lucide-react-native";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & {
  title: string;
};

export function HeaderCreateAds({ title, ...rest }: Props) {
  const navigation = useNavigation<AppRoutesNavigationProps>();
  return (
    <HStack w="$full" alignItems="center" mt="$8">
      <TouchableOpacity onPress={() => navigation.navigate("myAds")} {...rest}>
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
