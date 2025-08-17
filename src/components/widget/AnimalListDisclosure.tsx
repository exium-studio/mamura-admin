import useAnimalListDisclosure from "@/context/useAnimalListDisclosure";
import useLang from "@/context/useLang";
import useBackOnClose from "@/hooks/useBackOnClose";
import { age } from "@/utils/age";
import empty from "@/utils/empty";
import formatNumber from "@/utils/formatNumber";
import { HStack, Icon } from "@chakra-ui/react";
import { IconHourglassEmpty, IconWeight } from "@tabler/icons-react";
import BackButton from "../ui-custom/BackButton";
import CContainer from "../ui-custom/CContainer";
import {
  DisclosureBody,
  DisclosureContent,
  DisclosureFooter,
  DisclosureHeader,
  DisclosureRoot,
} from "../ui-custom/Disclosure";
import DisclosureHeaderContent from "../ui-custom/DisclosureHeaderContent";
import FeedbackNoData from "../ui-custom/FeedbackNoData";
import Img from "../ui-custom/Img";
import P from "../ui-custom/P";

const AnimalListDisclosure = () => {
  // Hooks
  const { l } = useLang();
  const { data, open, onOpen, onClose } = useAnimalListDisclosure();
  useBackOnClose(`animal-list`, open, onOpen, onClose);

  return (
    <DisclosureRoot open={open} lazyLoad size={"xs"}>
      <DisclosureContent>
        <DisclosureHeader>
          <DisclosureHeaderContent title={l.animal} />
        </DisclosureHeader>

        <DisclosureBody>
          <CContainer>
            {empty(data) && <FeedbackNoData />}

            {data?.map((item: any, i: number) => {
              return (
                <HStack
                  key={i}
                  gap={4}
                  overflow={"clip"}
                  borderBottom={
                    i === data.length - 1
                      ? "none"
                      : "1px solid {colors.border.muted}"
                  }
                  py={4}
                  pt={i === 0 ? 0 : 4}
                  pb={i === data.length - 1 ? 0 : 4}
                >
                  <CContainer>
                    <P
                      fontWeight={"semibold"}
                      mb={2}
                    >{`${item?.animal_breed?.label} - ${item?.animal_category?.label}`}</P>

                    <HStack>
                      <Icon color={"fg.muted"}>
                        <IconWeight stroke={1.5} size={16} />
                      </Icon>

                      <P color={"fg.muted"}>{`${formatNumber(
                        item?.average_weight
                      )} kg`}</P>
                    </HStack>

                    <HStack>
                      <Icon color={"fg.muted"}>
                        <IconHourglassEmpty stroke={1.5} size={16} />
                      </Icon>

                      <P color={"fg.muted"}>{`${age(item?.birth_date, {
                        format: "month",
                      })} ${l.month.toLocaleLowerCase()}`}</P>
                    </HStack>
                  </CContainer>

                  <CContainer w={"70px"} mr={2}>
                    <Img src={item?.animal_category?.icon_id?.[0]?.file_path} />
                  </CContainer>
                </HStack>
              );
            })}
          </CContainer>
        </DisclosureBody>

        <DisclosureFooter>
          <BackButton />
        </DisclosureFooter>
      </DisclosureContent>
    </DisclosureRoot>
  );
};

export default AnimalListDisclosure;
