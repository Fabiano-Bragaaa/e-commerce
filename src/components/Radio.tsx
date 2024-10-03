import {
  CircleIcon,
  RadioGroup,
  Radio as RadioChoice,
  RadioIndicator,
  RadioLabel,
  RadioIcon,
  HStack,
} from "@gluestack-ui/themed";
import { useState } from "react";

export function Radio() {
  const [radioSelect, setRadioSelect] = useState("");

  return (
    <RadioGroup
      value={radioSelect}
      onChange={setRadioSelect}
      flexDirection="row"
      gap="$4"
      alignItems="center"
      justifyContent="flex-start"
      mt="$5"
    >
      <RadioChoice value="newProduct" size="md">
        <RadioIndicator mr="$2">
          <RadioIcon as={CircleIcon} color="$blue" />
        </RadioIndicator>
        <RadioLabel>Novo Produto</RadioLabel>
      </RadioChoice>

      <RadioChoice value="oldProduct" size="md">
        <RadioIndicator mr="$2">
          <RadioIcon as={CircleIcon} color="$blue" />
        </RadioIndicator>
        <RadioLabel>Produto usado</RadioLabel>
      </RadioChoice>
    </RadioGroup>
  );
}
