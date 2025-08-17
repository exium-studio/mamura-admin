import ConfirmationDisclosure from "./ConfirmationDisclosure";
import AnimalListDisclosure from "./AnimalListDisclosure";
import ChangePasswordDisclosure from "./ChangePasswordDisclosure";
import EditAnimalBreedDisclosure from "./EditAnimalBreedDisclosure";
import EditAnimalCategoryDisclosure from "./EditAnimalCategoryDisclosure";
import EditAnimalDisclosure from "./EditAnimalDisclosure";
import EditAqiqahProductDisclosure from "./EditAqiqahProductDisclosure";
import EditCityDisclosure from "./EditCityDisclosure";
import EditMosqueDisclosure from "./EditMosqueDisclosure";
import EditProvinceDisclosure from "./EditProvinceDisclosure";
import EditQurbanProductDisclosure from "./EditQurbanProductDisclosure";
import EditSadaqahProductDisclosure from "./EditSadaqahProductDisclosure";
import LocationDisclosure from "./LocationDisclosure";
import OfflineDisclosure from "./OfflineDisclosure";
// import ToasterDetailDisclosure from "./ToasterDetailDisclosure";

const GlobalDisclosure = () => {
  return (
    <>
      <OfflineDisclosure />

      <ChangePasswordDisclosure />

      <EditQurbanProductDisclosure />

      <EditAqiqahProductDisclosure />

      <EditSadaqahProductDisclosure />

      <EditAnimalDisclosure />

      <EditAnimalBreedDisclosure />

      <EditAnimalCategoryDisclosure />

      <ConfirmationDisclosure />

      <AnimalListDisclosure />

      <EditProvinceDisclosure />

      <EditCityDisclosure />

      <EditMosqueDisclosure />

      <LocationDisclosure />

      {/* <ToasterDetailDisclosure /> */}
    </>
  );
};

export default GlobalDisclosure;
