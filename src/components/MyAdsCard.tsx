import { HStack, Icon, Text, VStack } from "@gluestack-ui/themed";

import MyAdsIcon from "@assets/myAds.svg";

import { gluestackUIConfig } from "../../config/gluestack-ui.config";

import { TouchableOpacity } from "react-native";

import { ArrowRight } from "lucide-react-native";

import { useNavigation } from "@react-navigation/native";
import { AppRoutesNavigationProps } from "@routes/app.routes";

export function MyAdsCard() {
  const { tokens } = gluestackUIConfig;

  const navigation = useNavigation<AppRoutesNavigationProps>();

  return (
    <HStack
      w="$full"
      h={100}
      bg="$blue100"
      alignItems="center"
      rounded="$lg"
      gap="$4"
    >
      <MyAdsIcon fill={tokens.colors.blue1} style={{ marginLeft: 15 }} />
      <VStack flex={1}>
        <Text fontFamily="$heading" fontSize="$3xl" color="$gray100">
          4
        </Text>
        <Text fontSize="$md" color="$gray100" fontFamily="$body">
          anúncios ativos
        </Text>
      </VStack>
      <TouchableOpacity onPress={() => navigation.navigate("myAds")}>
        <HStack gap="$4" mr="$4">
          <Text color="$blue" fontFamily="$heading" fontSize="$md">
            Meus anúncios
          </Text>
          <Icon as={ArrowRight} color="$blue" size="lg" />
        </HStack>
      </TouchableOpacity>
    </HStack>
  );
}
