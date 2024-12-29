import { Text, View } from "react-native";
import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from "@expo-google-fonts/karla";
import { Center, GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "./config/gluestack-ui.config";

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });
  return (
    <GluestackUIProvider config={config}>
      <Center flex={1}>
        {fontsLoaded ? (
          <Text style={{ fontFamily: "Karla_700Bold" }}>
            Open up App.tsx to start working on your app!
          </Text>
        ) : (
          <View />
        )}
      </Center>
    </GluestackUIProvider>
  );
}
