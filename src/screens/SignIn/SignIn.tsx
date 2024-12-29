import { Container } from "@components/Container/Container";
import { Input } from "@components/Input/Input";
import { Box } from "@gluestack-ui/themed";

export function SignIn() {
  return (
    <Container>
      <Box flex={1} paddingHorizontal="$10">
        <Input placeholder="E-mail" isPassword />
      </Box>
    </Container>
  );
}
