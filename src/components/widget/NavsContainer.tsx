import { NAVS } from "@/constants/navs";
import useADM from "@/context/useADM";
import useLang from "@/context/useLang";
import { useThemeConfig } from "@/context/useThemeConfig";
import useIsSmScreenWidth from "@/hooks/useIsSmScreenWidth";
import pluck from "@/utils/pluck";
import {
  Circle,
  CircleProps,
  HStack,
  Icon,
  Image,
  Separator,
  Stack,
  VStack,
} from "@chakra-ui/react";
import { IconSettings } from "@tabler/icons-react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../ui-custom/BackButton";
import CContainer from "../ui-custom/CContainer";
import FloatCounter from "../ui-custom/FloatCounter";
import Heading6 from "../ui-custom/Heading6";
import HelperText from "../ui-custom/HelperText";
import NavLink from "../ui-custom/NavLink";
import { Avatar } from "../ui/avatar";
import { ColorModeButton } from "../ui/color-mode";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "../ui/menu";
import { Tooltip } from "../ui/tooltip";
import CurrentUserTimeZone from "./CurrentUserTimeZone";

const ActiveNavIndicator = ({ ...props }: CircleProps) => {
  // Contexts
  const { themeConfig } = useThemeConfig();

  return (
    <Circle
      w={"12px"}
      h={"2px"}
      bg={themeConfig.primaryColor}
      position={"absolute"}
      bottom={0}
      {...props}
    />
  );
};

const NavItemContainer = (props: any) => {
  // Props
  const { children, active, ...restProps } = props;

  // Contexts
  const { themeConfig } = useThemeConfig();

  return (
    <VStack
      gap={0}
      w={"40px"}
      h={"40px"}
      justify={"center"}
      position={"relative"}
      color={active ? "fg" : "fg.muted"}
      _hover={{ bg: "bg.muted" }}
      borderRadius={themeConfig.radii.component}
      transition={"200ms"}
      {...restProps}
    >
      {active && <ActiveNavIndicator bottom={[-2, null, 0]} />}

      {children}
    </VStack>
  );
};

const NavList = (props: any) => {
  // Props
  const { activePath } = props;

  // Hooks
  const { l } = useLang();
  const iss = useIsSmScreenWidth();
  const navigate = useNavigate();

  const NavItem = ({ nav, active }: any) => {
    return (
      <Tooltip
        content={pluck(l, nav.labelKey)}
        positioning={{ placement: "right" }}
        contentProps={{ ml: 2 }}
      >
        <NavItemContainer active={active} cursor={"pointer"}>
          <FloatCounter
            circleProps={{
              h: "18px",
              fontSize: "xs",
              mt: "18px",
              mr: "18px",
            }}
            display={"none"}
          >
            2
          </FloatCounter>

          <Icon {...nav?.iconProps}>
            <nav.icon strokeWidth={1.5} size={iss ? 24 : 20} />
          </Icon>

          {iss && (
            <HelperText
              color={active ? "" : "fg.muted"}
              lineHeight={1}
              mt={1}
              lineClamp={1}
            >
              {pluck(l, nav.labelKey)}
            </HelperText>
          )}
        </NavItemContainer>
      </Tooltip>
    );
  };

  return (
    <>
      {NAVS.map((nav: any, i) => {
        const active = activePath === nav.path;

        if (nav.subNavs) {
          return (
            <MenuRoot key={i} positioning={{ placement: "right-start" }}>
              <MenuTrigger pos={"relative"}>
                <NavItem nav={nav} active={active} />
              </MenuTrigger>

              <MenuContent ml={2}>
                {nav.subNavs.map((subNav: any, ii: number) => {
                  return (
                    <MenuItem
                      key={ii}
                      value={subNav.path}
                      onClick={() => {
                        navigate(subNav.path);
                      }}
                    >
                      {pluck(l, subNav.labelKey)}
                    </MenuItem>
                  );
                })}
              </MenuContent>
            </MenuRoot>
          );
        }

        return (
          <NavLink key={i} align={"center"} to={nav.path}>
            <NavItem nav={nav} active={active} />
          </NavLink>
        );
      })}
    </>
  );
};
const NavList2 = (props: any) => {
  // Props
  const { activePath } = props;

  // Hooks
  const iss = useIsSmScreenWidth();

  // Contexts
  const { l } = useLang();

  return (
    <>
      <NavLink to={"/settings"} align={"center"}>
        <Tooltip
          content={l.navs.settings}
          positioning={{ placement: "right" }}
          contentProps={{ ml: 2 }}
        >
          <NavItemContainer
            active={activePath === "/settings"}
            cursor={"pointer"}
          >
            <Icon>
              <IconSettings strokeWidth={1.5} size={iss ? 24 : 20} />
            </Icon>

            {iss && (
              <HelperText
                color={activePath === "/settings" ? "" : "fg.muted"}
                lineHeight={1}
                mt={1}
                lineClamp={1}
              >
                {pluck(l, "navs.settings")}
              </HelperText>
            )}
          </NavItemContainer>
        </Tooltip>
      </NavLink>

      {!iss && <Separator w={"full"} mb={1} />}

      <NavLink to={"/profile"} align={"center"}>
        <Tooltip
          content={l.navs.profile}
          positioning={{ placement: "right" }}
          contentProps={{ ml: 2 }}
        >
          <NavItemContainer active={activePath === "/profile"}>
            <Avatar
              name="Jolitos Kurniawan"
              cursor={"pointer"}
              size={"xs"}
              w={"24px"}
              h={"24px"}
            />

            {iss && (
              <HelperText
                color={activePath === "/profile" ? "" : "fg.muted"}
                lineHeight={1}
                mt={1}
                lineClamp={1}
              >
                {pluck(l, "navs.profile")}
              </HelperText>
            )}
          </NavItemContainer>
        </Tooltip>
      </NavLink>
    </>
  );
};

const NavContainer = (props: any) => {
  // Props
  const { children, title, backPath, activePath } = props;

  // Hooks
  const iss = useIsSmScreenWidth();
  // const navigate = useNavigate();

  // Contexts
  const { ADM } = useADM();
  // const onOpenChangePassword = useChangePasswordDisclosure((s) => s.onOpen);
  // const setAuthToken = useAuthMiddleware((s) => s.setAuthToken);

  // States, Refs
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Stack
      flexDir={iss ? "column" : "row"}
      h={"100dvh"}
      gap={0}
      overflowX={"clip"}
    >
      {/* Lg screen nav */}
      {!iss && (
        <VStack
          w={"fit"}
          align={"center"}
          px={2}
          pt={5}
          pb={4}
          overflowX={"clip"}
          overflowY={"scroll"}
          mr={"-6px"}
          className="scrollY"
          bg={"body"}
          borderRight={"1px solid"}
          borderColor={"border.muted"}
        >
          <Link to={"/"}>
            <Image w={"30px"} src={`/logo_only_color.png`} />
          </Link>

          <VStack mt={6} flex={1}>
            <NavList activePath={activePath} />
          </VStack>

          <VStack mt={"auto"}>
            <NavList2 activePath={activePath} />
          </VStack>
        </VStack>
      )}

      {/* Content */}
      <CContainer
        fRef={containerRef}
        position={"relative"}
        flex={1}
        overflowY={"auto"}
        className="scrollY"
        overflowX={"clip"}
        bg={"bgContent"}
      >
        <HStack
          justify={"space-between"}
          p={2}
          px={4}
          position={"sticky"}
          top={0}
          zIndex={2}
          bg={iss ? "body" : "bgContent"}
          borderBottom={iss ? "1px solid {colors.border.subtle}" : ""}
        >
          <HStack>
            {backPath && <BackButton iconButton backPath={backPath} />}

            <Heading6 fontWeight={"bold"} lineClamp={1}>
              {title}
            </Heading6>
          </HStack>

          {/* Quick Settings */}
          <HStack flexShrink={0} gap={0}>
            <ColorModeButton fontSize={"1.1rem"} disabled={ADM === "true"} />

            <CurrentUserTimeZone />

            {/* <MenuRoot positioning={{ placement: "bottom-end" }}>
              <MenuTrigger asChild>
                <HStack ml={2} cursor={"pointer"}>
                  <Avatar src="" size={"xs"} />

                  <Text fontWeight={"semibold"}>Admin PopBox</Text>

                  <Icon>
                    <IconChevronDown size={16} />
                  </Icon>
                </HStack>
              </MenuTrigger>

              <MenuContent>
                <MenuItem
                  value="change password"
                  onClick={onOpenChangePassword}
                >
                  Change Password
                </MenuItem>

                <MenuItem
                  value="logout"
                  color={"red.400"}
                  fontWeight={"bold"}
                  onClick={() => {
                    localStorage.removeItem("__auth_token");
                    localStorage.removeItem("__user_data");
                    setAuthToken(undefined);
                    navigate("/");
                  }}
                >
                  Logout
                </MenuItem>
              </MenuContent>
            </MenuRoot> */}

            {/* <MerchantInbox /> */}
          </HStack>
        </HStack>

        {children}
      </CContainer>

      {/* Sm screen nav */}
      {iss && (
        <HStack
          h={"80px"}
          justify={"space-around"}
          pt={1}
          pb={6}
          px={4}
          borderTop={"1px solid"}
          borderColor={"d2"}
          overflowX={"auto"}
          flexShrink={0}
          position={"sticky"}
          bottom={0}
          gap={4}
        >
          <NavList activePath={activePath} />

          <NavList2 activePath={activePath} />
        </HStack>
      )}
    </Stack>
  );
};

export default NavContainer;
