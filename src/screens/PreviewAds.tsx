import { ImageAds } from "@components/ImageAds";
import { Center, Text, VStack } from "@gluestack-ui/themed";

import PagerView from "react-native-pager-view";

export function PreviewAds() {
  return (
    <VStack flex={1}>
      <VStack w="$full" h={150} bg="$blue1" justifyContent="flex-end">
        <Center mb="$6">
          <Text color="$white" fontFamily="$heading" mb="$1">
            Pré visualização do anúncio
          </Text>
          <Text color="$white" fontFamily="$body">
            É assim que seu produto vai aparecer!
          </Text>
        </Center>
      </VStack>

      <PagerView initialPage={0} style={{ width: "100%", height: 320 }}>
        <ImageAds
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3avUFThjxODyz5vGd7Z1VAErcYQrqi5fweg&s.png",
          }}
          alt="foto do produto"
          w="$full"
          h={320}
          resizeMode="cover"
          roundedType
          key={1}
        />
        <ImageAds
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3avUFThjxODyz5vGd7Z1VAErcYQrqi5fweg&s.png",
          }}
          alt="foto do produto"
          w="$full"
          h={320}
          resizeMode="cover"
          roundedType
          key={2}
        />
        <ImageAds
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3avUFThjxODyz5vGd7Z1VAErcYQrqi5fweg&s.png",
          }}
          alt="foto do produto"
          w="$full"
          h={320}
          resizeMode="cover"
          roundedType
          key={3}
        />
      </PagerView>
    </VStack>
  );
}
