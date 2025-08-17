import ConfirmationDisclosure from "./ConfirmationDisclosure";
import AnimalListDisclosure from "./AnimalListDisclosure";
import ChangePasswordDisclosure from "./ChangePasswordDisclosure";
import LocationDisclosure from "./LocationDisclosure";
import OfflineDisclosure from "./OfflineDisclosure";
// import ToasterDetailDisclosure from "./ToasterDetailDisclosure";

const GlobalDisclosure = () => {
  return (
    <>
      <OfflineDisclosure />

      <ChangePasswordDisclosure />

      <ConfirmationDisclosure />

      <AnimalListDisclosure />

      <LocationDisclosure />

      {/* <ToasterDetailDisclosure /> */}
    </>
  );
};

export default GlobalDisclosure;
