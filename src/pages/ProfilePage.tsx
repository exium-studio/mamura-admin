import BButton from "@/components/ui-custom/BButton";
import CContainer from "@/components/ui-custom/CContainer";
import P from "@/components/ui-custom/P";
import { Avatar } from "@/components/ui/avatar";
import ChangePasswordDisclosureTrigger from "@/components/widget/ChangePasswordDisclosureTrigger";
import PageContainer from "@/components/widget/PageContainer";
import useAuthMiddleware from "@/context/useAuthMiddleware";
import useRequest from "@/hooks/useRequest";
import { VStack } from "@chakra-ui/react";

const ProfilePage = () => {
  // Hooks
  const { req, loading } = useRequest({
    id: "signout",
    showLoadingToast: false,
    showSuccessToast: false,
  });

  // Contexts
  const setPermissions = useAuthMiddleware((s) => s.setPermissions);
  const setAuthToken = useAuthMiddleware((s) => s.setAuthToken);

  // Utils
  function onSignout() {
    const url = `/api/logout`;

    const config = {
      url,
      method: "GET",
    };

    req({
      config,
      onResolve: {
        onSuccess: () => {
          localStorage.removeItem("__auth_token");
          localStorage.removeItem("__user_data");
          setAuthToken(undefined);
          setPermissions(undefined);
        },
      },
    });
  }

  return (
    <PageContainer flex={1} align={"center"} justify={"center"} gap={4}>
      <Avatar size={"2xl"} />

      <VStack gap={0}>
        <P textAlign={"center"} fontWeight={"semibold"}>
          Admin Mamura
        </P>
        <P textAlign={"center"}>admin@mamura.com</P>
      </VStack>

      <CContainer align={"center"} gap={1}>
        <ChangePasswordDisclosureTrigger>
          <BButton w={"fit"} variant={"outline"}>
            Reset Password
          </BButton>
        </ChangePasswordDisclosureTrigger>

        <BButton
          onClick={onSignout}
          w={"fit"}
          colorPalette={"red"}
          variant={"ghost"}
          loading={loading}
        >
          Sign out
        </BButton>
      </CContainer>
    </PageContainer>
  );
};

export default ProfilePage;
