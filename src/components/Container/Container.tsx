import {
  Box,
  Center,
  HStack,
  Icon,
  Pressable,
  Text,
} from "@gluestack-ui/themed";
import { ComponentProps, ReactNode } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ScrollViewContainer,
  ViewContainer,
} from "./components/ScreenContainer";
import { KeyboardAvoidingView, Platform } from "react-native";
import { ArrowLeft, BookCheck } from "lucide-react-native";

type ContainerProps = {
  children: ReactNode;
  canGoBack?: boolean;
  titleBack?: string;
  boxProps?: ComponentProps<typeof Box>;
  scrollable?: boolean;
};

export function Container({
  children,
  boxProps,
  canGoBack = false,
  titleBack,
  scrollable = false,
}: ContainerProps) {
  const { bottom, top } = useSafeAreaInsets();
  const View = scrollable ? ScrollViewContainer : ViewContainer;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View>
        <Box pb={bottom} pt={top} backgroundColor="$gray6" {...boxProps}>
          {canGoBack && (
            <HStack alignItems="center" my="$6">
              <Pressable>
                <Icon as={ArrowLeft} color="$gray2" size="xl" />
              </Pressable>

              <Text
                color="$gray1"
                fontFamily="$heading"
                fontSize="$lg"
                ml="$24"
              >
                {titleBack}
              </Text>
            </HStack>
          )}
          {children}
        </Box>
      </View>
    </KeyboardAvoidingView>
  );
}
