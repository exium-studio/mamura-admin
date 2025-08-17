import useAuthMiddleware from "@/context/useAuthMiddleware";
import useLang from "@/context/useLang";
import { useThemeConfig } from "@/context/useThemeConfig";
import useRequest from "@/hooks/useRequest";
import { FieldsetRoot, HStack, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import BButton from "../ui-custom/BButton";
import CContainer from "../ui-custom/CContainer";
import Heading6 from "../ui-custom/Heading6";
import PasswordInput from "../ui-custom/PasswordInput";
import StringInput from "../ui-custom/StringInput";
import { Field } from "../ui/field";
import TextRouterLink from "../ui-custom/TextRouterLink";

const SigninForm = () => {
  // Hooks
  const { l } = useLang();

  // Contexts
  const setAuthToken = useAuthMiddleware((s) => s.setAuthToken);
  const setPermissions = useAuthMiddleware((s) => s.setPermissions);
  const { themeConfig } = useThemeConfig();
  const { req, loading } = useRequest({
    id: "signin",
    loadingMessage: {
      ...l.signin_loading_toast,
    },
    successMessage: {
      ...l.signin_success_toast,
    },
    errorMessage: {
      400: {
        WRONG_CREDENTIALS: {
          ...l.signin_wrong_credentials_toast,
        },
      },
    },
  });

  // Utils
  const navigate = useNavigate();

  // Formik
  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      identifier: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      identifier: yup.string().required(l.required_form),
      password: yup.string().required(l.required_form),
    }),
    onSubmit: (values) => {
      const payload = {
        email: values.identifier,
        password: values.password,
      };
      const config = {
        method: "post",
        url: "/api/admin/auth/signin",
        data: payload,
      };

      req({
        config,
        onResolve: {
          onSuccess: (r: any) => {
            localStorage.setItem("__auth_token", r.data.data?.token);
            localStorage.setItem(
              "__user_data",
              JSON.stringify(r.data.data?.user)
            );
            setAuthToken(r.data.data?.token);
            setPermissions(r.data.data?.permissions);
            navigate("/dashboard");
          },
        },
      });
    },
  });

  return (
    <CContainer
      bg={"body"}
      maxW={"380px"}
      p={6}
      borderRadius={8}
      justify={"center"}
    >
      <FieldsetRoot disabled={loading}>
        <CContainer mb={4} gap={1}>
          <Heading6 fontWeight={"bold"}>{l.login_form.title}</Heading6>
          <Text fontSize={"sm"}>{l.login_form.description}</Text>
        </CContainer>

        <form id="login-form" onSubmit={formik.handleSubmit}>
          <Field
            label="Email/Username"
            invalid={!!formik.errors.identifier}
            errorText={formik.errors.identifier}
            mb={4}
          >
            <StringInput
              name="identifier"
              onChangeSetter={(input) => {
                formik.setFieldValue("identifier", input);
              }}
              inputValue={formik.values.identifier}
              placeholder="example@email.com"
            />
          </Field>

          <Field
            label="Password"
            invalid={!!formik.errors.password}
            errorText={formik.errors.password}
          >
            <PasswordInput
              name="password"
              onChangeSetter={(input) => {
                formik.setFieldValue("password", input);
              }}
              inputValue={formik.values.password}
              placeholder="********"
            />
          </Field>

          <HStack mt={4}>
            <TextRouterLink to="/">{l.forgot_password}</TextRouterLink>
          </HStack>

          <BButton
            type="submit"
            form="login-form"
            w={"full"}
            mt={6}
            size={"lg"}
            loading={loading}
            colorPalette={themeConfig.colorPalette}
          >
            Login
          </BButton>
        </form>
      </FieldsetRoot>
    </CContainer>
  );
};

export default SigninForm;
