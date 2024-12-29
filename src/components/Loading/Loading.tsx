import { Container } from "@components/Container/Container";
import { Center, Spinner } from "@gluestack-ui/themed";

export function Loading() {
  return (
    <Container>
      <Center flex={1}>
        <Spinner color="$blue" size="large" />
      </Center>
    </Container>
  );
}
