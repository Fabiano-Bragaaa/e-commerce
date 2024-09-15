import { Center, Image, VStack } from "@gluestack-ui/themed";

import Logo from "@assets/logo.png";
import { Highlight } from "@components/Highlight";

export function SignIn() {
  return (
    <Center flex={1}>
      <Image alt="logo" source={Logo} w="$32" h={100} />
      <Highlight title="marketspace" subtitle="Seu espaço de compra e venda" />
    </Center>
  );
}
