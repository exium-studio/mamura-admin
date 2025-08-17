import CContainer from "@/components/ui-custom/CContainer";
import useBackOnClose from "@/hooks/useBackOnClose";
import { HStack, Icon, useDisclosure } from "@chakra-ui/react";
import {
  DisclosureBody,
  DisclosureContent,
  DisclosureFooter,
  DisclosureHeader,
  DisclosureRoot,
} from "../ui-custom/Disclosure";
import DisclosureHeaderContent from "../ui-custom/DisclosureHeaderContent";
import useLang from "@/context/useLang";
import BackButton from "../ui-custom/BackButton";
import { IconCircleFilled } from "@tabler/icons-react";
import P from "../ui-custom/P";

const PromoDisclosureTrigger = (props: any) => {
  // Props
  const { id, promoTerms, children } = props;

  // Hooks
  const { l } = useLang();
  const { open, onOpen, onClose } = useDisclosure();
  useBackOnClose(`promo-temrs-${id}`, open, onOpen, onClose);

  return (
    <>
      <CContainer w={"fit"} onClick={onOpen}>
        {children}
      </CContainer>

      <DisclosureRoot open={open} lazyLoad size={"xs"}>
        <DisclosureContent>
          <DisclosureHeader>
            <DisclosureHeaderContent title={`${l.promo_interface.terms}`} />
          </DisclosureHeader>

          <DisclosureBody>
            <CContainer gap={2}>
              {promoTerms?.map((term: string) => {
                return (
                  <HStack key={term}>
                    <Icon boxSize={1}>
                      <IconCircleFilled />
                    </Icon>

                    <P>{term}</P>
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
    </>
  );
};

export default PromoDisclosureTrigger;
