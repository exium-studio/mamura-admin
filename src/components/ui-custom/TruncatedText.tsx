import SimplePopover from "../widget/SimplePopover";
import P from "./P";

interface Props {
  children: string;
}

const TruncatedText = ({ children, ...restProps }: Props) => {
  return (
    <SimplePopover content={children} {...restProps}>
      <P lineClamp={1} w={"200px"}>
        {`${children}`}
      </P>
    </SimplePopover>
  );
};

export default TruncatedText;
