import useDateFormat from "@/context/useDateFormat";
import useLang from "@/context/useLang";
import useTimeZone from "@/context/useTimeZone";
import autoTimeZone from "@/utils/autoTimeZone";
import formatDate from "@/utils/formatDate";
import { HStack, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { IconTimezone } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import BButton from "../ui-custom/BButton";
import CContainer from "../ui-custom/CContainer";
import HelperText from "../ui-custom/HelperText";
import { PopoverContent, PopoverRoot, PopoverTrigger } from "../ui/popover";
import { Tooltip } from "../ui/tooltip";
import Clock from "./Clock";
import MenuHeaderContainer from "./MenuHeaderContainer";
import useClickOutside from "@/hooks/useClickOutside";
import { useRef } from "react";

const CurrentUserTimeZone = () => {
  // Contexts
  const { timeZone } = useTimeZone();
  const { dateFormat } = useDateFormat();
  const { l } = useLang();

  // States, Refs
  const autoTz = autoTimeZone();
  const userSelect = autoTz.key === timeZone.key;
  const triggerRef = useRef(null);
  const contentRef = useRef(null);

  // Utils
  const { open, onToggle, onClose } = useDisclosure();
  useClickOutside([triggerRef, contentRef], onClose);

  return (
    <PopoverRoot open={open}>
      <PopoverTrigger asChild>
        <div>
          <Tooltip content={l.timezone}>
            <BButton
              ref={triggerRef}
              iconButton
              unclicky
              variant="ghost"
              onClick={onToggle}
            >
              <Icon>
                <IconTimezone stroke={1.5} />
              </Icon>
            </BButton>
          </Tooltip>
        </div>
      </PopoverTrigger>

      <PopoverContent ref={contentRef} mr={2} w={"fit"} p={1}>
        <MenuHeaderContainer>
          <HStack>
            <IconTimezone stroke={1.5} size={20} />
            <Text fontWeight={"bold"}>{l.timezone}</Text>
          </HStack>
        </MenuHeaderContainer>

        <CContainer p={2}>
          <HelperText mb={1}>{l.selected_timezone}</HelperText>

          <HStack>
            <Text fontWeight={"medium"}>{formatDate(new Date())}</Text>
            <Clock fontWeight={"medium"} />
          </HStack>

          <Text color={"fg.muted"}>
            {timeZone.key} {timeZone.formattedOffset} ({timeZone.localAbbr})
          </Text>
        </CContainer>

        {!userSelect && (
          <CContainer px={1} mt={4}>
            <HelperText mb={1}>{l.auto_timezone}</HelperText>

            <HStack>
              <Text fontWeight={"medium"}>
                {formatDate(new Date(), {
                  prefixTimeZoneKey: autoTz.key,
                  prefixDateFormat: dateFormat,
                })}
              </Text>
              <Clock fontWeight={"medium"} timeZoneKey={autoTimeZone().key} />
            </HStack>

            <Text color={"fg.muted"}>
              {autoTz.key} {autoTz.formattedOffset} ({autoTz.localAbbr})
            </Text>
          </CContainer>
        )}

        <CContainer p={1}>
          <Link to="/settings/regional">
            <BButton variant="outline" size="sm" w="full" onClick={onClose}>
              {l.change}
            </BButton>
          </Link>
        </CContainer>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default CurrentUserTimeZone;
