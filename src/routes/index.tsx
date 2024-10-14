import { NavigationContainer } from "@react-navigation/native";

import { AuthRoutes } from "@routes/auth.routes";
import { AppRoutes } from "@routes/app.routes";
import { Box } from "@gluestack-ui/themed";

export function Routes() {
  return (
    <Box flex={1} bg="$gray600">
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </Box>
  );
}
