import { Container } from "@components/Container/Container";
import { Center, Spinner } from "@gluestack-ui/themed";

export function Loading() {
  return (
    <Center flex={1}>
      <Container>
        <Spinner color="$blue" size="large" />
      </Container>
    </Center>
  );
}
