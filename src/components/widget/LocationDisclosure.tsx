import useLang from "@/context/useLang";
import {
  DisclosureBody,
  DisclosureContent,
  DisclosureFooter,
  DisclosureHeader,
  DisclosureRoot,
} from "../ui-custom/Disclosure";
import DisclosureHeaderContent from "../ui-custom/DisclosureHeaderContent";
import useLocationDisclosure from "@/context/useLocationDisclosure";
import BackButton from "../ui-custom/BackButton";
import useBackOnClose from "@/hooks/useBackOnClose";
import CContainer from "../ui-custom/CContainer";
import Map, { Marker } from "react-map-gl/mapbox";
import { useEffect, useRef, useState } from "react";
import { useColorMode } from "../ui/color-mode";
import { Icon, StackProps } from "@chakra-ui/react";
import BButton from "../ui-custom/BButton";
import { IconArrowUpRight } from "@tabler/icons-react";
import { useThemeConfig } from "@/context/useThemeConfig";
import { Link } from "react-router-dom";
import MapMarkerCircle from "./MapMarkerCircle";

const LocationDisclosure = () => {
  // Hooks
  const { l } = useLang();
  const { colorMode } = useColorMode();

  // Contexts
  const { themeConfig } = useThemeConfig();
  const { data, open, onOpen, onClose } = useLocationDisclosure();
  useBackOnClose(`location`, open, onOpen, onClose);

  // Refs
  const mapRef = useRef<any>(null);

  // States
  const [view, setView] = useState({
    latitude: data?.latitude || 0,
    longitude: data?.longitude || 0,
  });
  const [containerStyle, setContainerStyle] = useState<StackProps>({
    width: "100%",
    height: "100%",
  });
  const [showMap, setShowMap] = useState(false);
  const cartoStyle =
    colorMode === "dark"
      ? "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
      : "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setShowMap(true);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      setShowMap(false);
    }
  }, [open]);

  useEffect(() => {
    if (data?.aspectRatio) {
      setContainerStyle({
        width: "100%",
        aspectRatio: `${data?.aspectRatio}`,
      });
    } else {
      setContainerStyle({
        width: "100%",
        height: "100%",
      });
    }
  }, [data?.aspectRatio]);

  useEffect(() => {
    setView({
      latitude: data?.latitude,
      longitude: data?.longitude,
    });
  }, [data]);

  return (
    <DisclosureRoot open={open} lazyLoad size="xs">
      <DisclosureContent>
        <DisclosureHeader>
          <DisclosureHeaderContent title={`${l.location}`} />
        </DisclosureHeader>

        <DisclosureBody>
          <CContainer
            pos={"relative"}
            minW={"352px"}
            minH={"300px"}
            overflow={"clip"}
            {...containerStyle}
          >
            {showMap && (
              <Map
                ref={mapRef}
                initialViewState={{
                  longitude: view.longitude,
                  latitude: view.latitude,
                  zoom: 2,
                }}
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
                style={{
                  minWidth: "352px",
                  minHeight: "300px",
                  width: "100%",
                  height: "100%",
                }}
                mapStyle={cartoStyle}
              >
                <Marker longitude={view.longitude} latitude={view.latitude}>
                  <MapMarkerCircle />
                </Marker>
              </Map>
            )}
          </CContainer>
        </DisclosureBody>

        <DisclosureFooter>
          <BackButton />

          <Link
            to={`https://www.google.com/maps?q=${view.latitude},${view.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <BButton colorPalette={themeConfig.colorPalette} pr={3}>
              Google Maps{" "}
              <Icon>
                <IconArrowUpRight stroke={1.5} />
              </Icon>
            </BButton>
          </Link>
        </DisclosureFooter>
      </DisclosureContent>
    </DisclosureRoot>
  );
};

export default LocationDisclosure;
