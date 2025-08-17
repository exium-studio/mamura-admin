import { useEffect, useRef, useState } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import CContainer from "@/components/ui-custom/CContainer";
import { SimpleGrid, StackProps } from "@chakra-ui/react";
import NumberInput from "@/components/ui-custom/NumberInput";
import { useColorMode } from "../ui/color-mode";
import MapMarkerCircle from "./MapMarkerCircle";
import { InputGroup } from "../ui/input-group";

interface Props {
  aspectRatio?: number;
  inputValue: { latitude: number; longitude: number };
  onChangeSetter: (coords: { latitude: number; longitude: number }) => void;
}

export default function LocationMapInput(props: Props) {
  // Props
  const { aspectRatio, inputValue, onChangeSetter } = props;

  // Hooks
  const { colorMode } = useColorMode();

  // Refs
  const mapRef = useRef<any>(null);

  // States
  const center = {
    latitude: inputValue?.latitude ?? 2.5489,
    longitude: inputValue?.longitude ?? 118.0149,
  };
  const [view, setView] = useState({
    latitude: center?.latitude,
    longitude: center?.longitude,
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

  // Utils
  function handleMapClick(e: any) {
    const { lat, lng } = e.lngLat;
    onChangeSetter({ latitude: lat, longitude: lng });
  }
  function handleLatChange(lat: number | null | undefined) {
    if (typeof lat === "number") {
      onChangeSetter({ latitude: lat, longitude: center?.longitude });
    }
  }
  function handleLngChange(lng: number | null | undefined) {
    if (typeof lng === "number") {
      onChangeSetter({ latitude: center?.latitude, longitude: lng });
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMap(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (aspectRatio) {
      setContainerStyle({
        width: "100%",
        aspectRatio: `${aspectRatio}`,
      });
    } else {
      setContainerStyle({
        width: "100%",
        height: "100%",
      });
    }
  }, [aspectRatio]);

  useEffect(() => {
    setView({
      latitude: center?.latitude,
      longitude: center?.longitude,
    });
  }, [inputValue]);

  return (
    <CContainer>
      <CContainer
        pos={"relative"}
        minW={"200px"}
        minH={"200px"}
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
              minWidth: "200px",
              minHeight: "200px",
              width: "100%",
              height: "100%",
            }}
            mapStyle={cartoStyle}
            onClick={handleMapClick}
          >
            <Marker longitude={view.longitude} latitude={view.latitude}>
              <MapMarkerCircle />
            </Marker>
          </Map>
        )}
      </CContainer>

      <SimpleGrid columns={1} gap={2} mt={2}>
        <InputGroup startElement={"Lat"}>
          <NumberInput
            name="latitude"
            onChangeSetter={handleLatChange}
            inputValue={center?.latitude}
            placeholder="Latitude"
            pl={"40px !important"}
          />
        </InputGroup>

        <InputGroup startElement={"Lon"}>
          <NumberInput
            name="longitude"
            onChangeSetter={handleLngChange}
            inputValue={center?.longitude}
            placeholder="Longitude"
            pl={"40px !important"}
          />
        </InputGroup>
      </SimpleGrid>
    </CContainer>
  );
}
