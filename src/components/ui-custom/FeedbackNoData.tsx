import useLang from "@/context/useLang";
import { Icon, StackProps } from "@chakra-ui/react";
import { IconDatabaseOff } from "@tabler/icons-react";
import CContainer from "./CContainer";
import FeedbackState from "./FeedbackState";

interface Props extends Omit<StackProps, "title"> {
  title?: string | null;
  description?: string | null;
  icon?: any;
}

export default function FeedbackNoData(props: Props) {
  // Hooks
  const { l } = useLang();

  // Props
  const {
    title = l.no_data_feedback.title,
    description = l.no_data_feedback.description,
    icon,
    children,
    ...restProps
  } = props;

  return (
    <CContainer
      w={"fit"}
      m={"auto"}
      align={"center"}
      minH={"300px"}
      justify={"center"}
      gap={4}
      {...restProps}
    >
      <FeedbackState
        icon={<Icon mb={title ? -2 : 0}>{icon || <IconDatabaseOff />}</Icon>}
        title={title}
        description={description}
        maxW={"300px"}
      />

      {children}
    </CContainer>
  );
}
