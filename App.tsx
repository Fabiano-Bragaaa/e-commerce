import { StatusBar, Text } from "react-native";
import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from "@expo-google-fonts/karla";
import { Center, GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "./config/gluestack-ui.config";
import { Loading } from "@components/Loading/Loading";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Routes } from "@routes/index";

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });
  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        {fontsLoaded ? <Routes /> : <Loading />}
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}
