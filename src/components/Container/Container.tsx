import { Box } from "@gluestack-ui/themed";
import { ComponentProps, ReactNode } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ScrollViewContainer,
  ViewContainer,
} from "./components/ScreenContainer";
import { KeyboardAvoidingView, Platform } from "react-native";

type ContainerProps = {
  children: ReactNode;
  boxProps?: ComponentProps<typeof Box>;
  scrollable?: boolean;
};

export function Container({
  children,
  boxProps,
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
          {children}
        </Box>
      </View>
    </KeyboardAvoidingView>
  );
}
