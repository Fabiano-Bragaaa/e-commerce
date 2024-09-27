import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "@routes/auth.routes";
import { AppRoutes } from "@routes/app.routes";

export function Routes() {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
}
