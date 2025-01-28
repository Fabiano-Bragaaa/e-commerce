import { Container } from "@components/Container/Container";
import { UsedOrNew } from "@components/UsedOrNew/UsedOrNew";
import { UserPhoto } from "@components/UserPhoto/UserPhoto";
import { Box, Center, HStack, Image, Text, VStack } from "@gluestack-ui/themed";
import { useAuth } from "@hooks/useAuth";
import { RouteProp, useRoute } from "@react-navigation/native";
import { AppRoutes } from "@routes/app.routes";
import { api } from "@services/api";
import { GeneratePaymentMethods } from "@utils/generatePaymentMethods";
import { formatCurrency } from "@utils/validationValueProduct";
import { Dimensions, ScrollView } from "react-native";

import Carousel from "react-native-reanimated-carousel";

const { width, height } = Dimensions.get("window");

export function PreviewAds() {
  const route = useRoute<RouteProp<AppRoutes, "previewAds">>();
  const { user } = useAuth();

  const {
    checkbox,
    description_title,
    images,
    product_title,
    switchValue,
    value_product,
    selectedOption,
  } = route.params;

  console.log(
    checkbox,
    description_title,
    images,
    product_title,
    switchValue,
    value_product
  );

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
        <Center gap="$1" h={"17%"} bg="$blueLight">
          <Text color="$white" fontSize="$lg" fontWeight="$bold">
            Pré visualização do anúncio
          </Text>
          <Text color="$white" fontSize="$md">
            É assim que seu produto vai aparecer!
          </Text>
        </Center>

        <Box flex={1} maxHeight={height * 0.3}>
          <Carousel
            loop={false}
            width={width}
            height={height * 0.3}
            data={images}
            renderItem={({ item }) => (
              <Image
                w="$full"
                h="$full"
                resizeMode="cover"
                source={{ uri: item }}
              />
            )}
          />
        </Box>

        <Container scrollable>
          <VStack paddingHorizontal="$4">
            <HStack alignItems="center" gap="$2">
              <UserPhoto
                source={{
                  uri: `${api.defaults.baseURL}/images/${user.avatar}`,
                }}
                sizeImage={40}
              />
              <Text color="$gray1" fontFamily="$heading">
                {user.name}
              </Text>
            </HStack>
            <UsedOrNew
              isViewAds
              isUsed={selectedOption === "new_product" ? true : false}
              my="$4"
            />
            <HStack alignItems="center" mb="$4">
              <Text
                color="$gray1"
                fontSize="$2xl"
                fontFamily="$heading"
                flex={1}
                numberOfLines={1}
              >
                {product_title}
              </Text>
              <HStack gap="$1" alignItems="center">
                <Text color="$blue" fontSize="$lg" fontFamily="$heading">
                  R$
                </Text>
                <Text
                  color="$blue"
                  fontSize="$2xl"
                  fontFamily="$heading"
                  mt={-5}
                >
                  {formatCurrency(value_product || "")}
                </Text>
              </HStack>
            </HStack>
            <Text fontSize="$lg" color="$gray2" mb="$4">
              {description_title}
            </Text>
            <HStack alignItems="center" gap="$2" mb="$4">
              <Text fontSize="$lg" color="$gray1" fontFamily="$heading">
                Aceita troca?
              </Text>
              <Text fontSize="$lg" color="$gray1" fontFamily="$body">
                {switchValue ? "Sim" : "Não"}
              </Text>
            </HStack>
            <Text fontSize="$lg" color="$gray1" fontFamily="$heading" mb="$2">
              Meios de pagamento:
            </Text>
            <GeneratePaymentMethods paymentMethods={checkbox} />
          </VStack>
        </Container>
      </VStack>
    </ScrollView>
  );
}
