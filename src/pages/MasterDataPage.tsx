import ItemContainer from "@/components/ui-custom/ItemContainer";
import { EmptyState } from "@/components/ui/empty-state";
import MasterDataNavsContainer from "@/components/widget/MasterDataNavsContainer";
import useLang from "@/context/useLang";
import { Icon } from "@chakra-ui/react";
import { IconDatabaseCog } from "@tabler/icons-react";

const MasterDataPage = () => {
  // Hooks
  const { l } = useLang();

  return (
    <MasterDataNavsContainer align={"stretch"}>
      <ItemContainer minH={"full"}>
        <EmptyState
          icon={
            <Icon>
              <IconDatabaseCog />
            </Icon>
          }
          title={l.master_data_page.title}
          description={l.master_data_page.description}
          m={"auto"}
        />
      </ItemContainer>
    </MasterDataNavsContainer>
  );
};

export default MasterDataPage;
