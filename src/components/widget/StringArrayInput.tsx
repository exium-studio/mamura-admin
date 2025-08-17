import { HStack, Icon, useFieldContext } from "@chakra-ui/react";
import StringInput from "../ui-custom/StringInput";
import BButton from "../ui-custom/BButton";
import { useThemeConfig } from "@/context/useThemeConfig";
import { IconCircleFilled, IconPlus, IconX } from "@tabler/icons-react";
import CContainer from "../ui-custom/CContainer";
import empty from "@/utils/empty";
import P from "../ui-custom/P";
import { useRef, useState } from "react";
import SimplePopover from "./SimplePopover";

interface Props {
  inputValue?: string[];
  onConfirm?: (inputValue: string[]) => void;
  invalid?: boolean;
  placeholder?: string;
}

const StringArratInput = (props: Props) => {
  // Props
  const { inputValue, onConfirm, invalid, placeholder } = props;

  // Contexts
  const { themeConfig } = useThemeConfig();
  const fc = useFieldContext();

  // States
  const [tempText, setTempText] = useState<string>("");

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);

  // Utils
  function handleAdd() {
    if (tempText.trim() !== "") {
      onConfirm?.([...(inputValue ?? []), tempText]);
      setTempText("");
      inputRef.current?.focus();
    }
  }
  function handleRemove(index: number) {
    if (!inputValue) return;
    const newValues = inputValue.filter((_, i) => i !== index);
    onConfirm?.(newValues);
    inputRef.current?.focus();
  }

  return (
    <CContainer gap={4}>
      <HStack w={"full"}>
        <StringInput
          fRef={inputRef}
          inputValue={tempText}
          onChangeSetter={(input) => {
            setTempText(input);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
          placeholder={placeholder}
          borderColor={invalid ?? fc?.invalid ? "border.error" : "border.muted"}
        />

        <BButton iconButton variant={"outline"} onClick={handleAdd}>
          <Icon>
            <IconPlus stroke={1.5} />
          </Icon>
        </BButton>
      </HStack>

      {!empty(inputValue) && (
        <CContainer gap={2}>
          {inputValue?.map((p: string, i: number) => {
            return (
              <HStack
                key={p}
                justify={"space-between"}
                pl={3}
                pr={1}
                py={1}
                border={"1px solid"}
                borderColor={"border.muted"}
                borderRadius={themeConfig.radii.component}
              >
                <SimplePopover content={p}>
                  <HStack>
                    <Icon boxSize={1}>
                      <IconCircleFilled />
                    </Icon>

                    <P>{p}</P>
                  </HStack>
                </SimplePopover>

                <BButton
                  iconButton
                  variant={"ghost"}
                  size={"xs"}
                  onClick={() => {
                    handleRemove(i);
                  }}
                >
                  <Icon>
                    <IconX stroke={1.5} />
                  </Icon>
                </BButton>
              </HStack>
            );
          })}
        </CContainer>
      )}
    </CContainer>
  );
};

export default StringArratInput;
