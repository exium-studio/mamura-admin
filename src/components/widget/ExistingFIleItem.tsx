import { useThemeConfig } from "@/context/useThemeConfig";
import { HStack, Icon, StackProps } from "@chakra-ui/react";
import { IconTrash } from "@tabler/icons-react";
import BButton from "../ui-custom/BButton";
import CContainer from "../ui-custom/CContainer";
import FileIcon from "../ui-custom/FileIcon";
import P from "../ui-custom/P";

interface Props extends StackProps {
  data: any;
  withDeleteButton?: boolean;
  onDelete?: () => void;
  withUndobutton?: boolean;
  onUndo?: () => void;
}

const ExistingFileItem = (props: Props) => {
  // Props
  const {
    data,
    withDeleteButton = true,
    onDelete,
    withUndobutton = false,
    onUndo,
    ...restProps
  } = props;

  // Contexts
  const { themeConfig } = useThemeConfig();
  return (
    <HStack
      py={2}
      px={4}
      pr={3}
      borderRadius={themeConfig.radii.container}
      border={"1px solid"}
      borderColor={"border.muted"}
      gap={4}
      {...restProps}
    >
      <FileIcon flexShrink={0} mimeType={data?.file_mime_type} />

      <CContainer flex={1}>
        <P lineClamp={1}>{data?.file_name}</P>
        <P fontSize={"xs"} color={"fg.muted"}>
          {data?.file_size}
        </P>
      </CContainer>

      {withDeleteButton && (
        <BButton
          flexShrink={0}
          iconButton
          size={"xs"}
          variant={"ghost"}
          colorPalette={"red"}
          onClick={onDelete}
        >
          <Icon>
            <IconTrash />
          </Icon>
        </BButton>
      )}

      {withUndobutton && (
        <BButton flexShrink={0} size={"xs"} onClick={onUndo} variant={"ghost"}>
          Undo
        </BButton>
      )}
    </HStack>
  );
};

export default ExistingFileItem;
