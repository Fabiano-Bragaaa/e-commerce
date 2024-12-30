import { Box } from "@gluestack-ui/themed";
import { ComponentProps, ReactNode } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ContainerProps = {
  children: ReactNode;
  boxProps?: ComponentProps<typeof Box>;
};

export function Container({ children, boxProps }: ContainerProps) {
  const { bottom, top } = useSafeAreaInsets();
  return (
    <Box flex={1} pb={bottom} pt={top} backgroundColor="$gray6" {...boxProps}>
      {children}
    </Box>
  );
}
