import {
  Box,
  ChevronDownIcon,
  Icon,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@gluestack-ui/themed";
import { useState } from "react";

export function SelectFilter() {
  const [valueSelected, setValueSelected] = useState("todos");

  return (
    <Select
      w={"40%"}
      initialLabel="Todos"
      defaultValue={valueSelected}
      onValueChange={setValueSelected}
    >
      <SelectTrigger variant="outline" size="md">
        <SelectInput />
        <Box mr="$3">
          <Icon as={ChevronDownIcon} />
        </Box>
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          <SelectItem label="Todos" value="todos" />
          <SelectItem label="Novos" value="novos" />
          <SelectItem label="Usados" value="usados" />
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}
