import { Button, ButtonText, HStack } from "@gluestack-ui/themed";

interface CardSelectProps {
  selected: "new" | "used" | null;
  setSelected: (value: "new" | "used") => void;
}

export function CardSelect({ selected, setSelected }: CardSelectProps) {
  return (
    <HStack gap="$4">
      <Button
        w="$24"
        h="$8"
        rounded="$2xl"
        bgColor={selected === "new" ? "$blue" : "$gray5"}
        onPress={() => setSelected("new")}
      >
        <ButtonText color={selected === "new" ? "$white" : "$black"}>
          NOVO
        </ButtonText>
      </Button>

      <Button
        w="$24"
        h="$8"
        rounded="$2xl"
        bgColor={selected === "used" ? "$blue" : "$gray5"}
        onPress={() => setSelected("used")}
      >
        <ButtonText color={selected === "used" ? "$white" : "$black"}>
          USADO
        </ButtonText>
      </Button>
    </HStack>
  );
}
