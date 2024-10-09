import { Button, Text } from "@gluestack-ui/themed";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof Button> & {
  isActive?: boolean;
  name: string;
};

export function ButtonChoice({
  isActive,
  name,
  ...rest
}: Props) {
  return (
    <Button
      mt="$3"
      mr="$3"
      w= "$24" 
      rounded="$full"
      h= "$10" 
      bg={isActive ? "$blue1" : "$gray400"}
      {...rest}
      alignItems="center"
      justifyContent="center"
    >
      <Text
        color={isActive ? "$white" : "$gray100"}
        fontFamily="$heading"
        textTransform="uppercase"
      >
        {name}
      </Text>
    </Button>
  );
}
