import useLang from "@/context/useLang";
import { useThemeConfig } from "@/context/useThemeConfig";
import useBackOnClose from "@/hooks/useBackOnClose";
import useRequest from "@/hooks/useRequest";
import getUserData from "@/utils/getUserData";
import {
  FieldRoot,
  PinInput,
  StackProps,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as yup from "yup";
import BackButton from "../ui-custom/BackButton";
import BButton from "../ui-custom/BButton";
import CContainer from "../ui-custom/CContainer";
import {
  DisclosureBody,
  DisclosureContent,
  DisclosureFooter,
  DisclosureHeader,
  DisclosureRoot,
} from "../ui-custom/Disclosure";
import DisclosureHeaderContent from "../ui-custom/DisclosureHeaderContent";
import { Field } from "../ui/field";
import { toaster } from "../ui/toaster";
import PasswordInput from "../ui-custom/PasswordInput";

interface Props extends StackProps {
  children: any;
}

const Step2Section = (props: any) => {
  // Props
  const { setOtp } = props;

  // Hooks
  const { l } = useLang();
  const { req } = useRequest({
    id: "reset_password",
  });

  // Contexts
  const { themeConfig } = useThemeConfig();

  // States
  const user = getUserData();
  const formik = useFormik({
    validateOnChange: false,
    initialValues: { otp: [] },
    validationSchema: yup
      .object()
      .shape({ otp: yup.array().required(l.required_form) }),
    onSubmit: (values) => {
      const payload = {
        email: user?.email,
        otp: values.otp.join(""),
      };

      const config = {
        url: `/api/admin/auth/verify-otp`,
        method: "POST",
        data: payload,
      };

      req({
        config,
        onResolve: {
          onSuccess: (r) => {
            console.log(r);

            setOtp(values.otp.join(""));
          },
        },
      });
    },
  });

  // Handle auto submit when otp is filled
  useEffect(() => {
    const otp = formik.values.otp;
    if (otp?.[0] && otp?.[1] && otp?.[2] && otp?.[3] && otp?.[4] && otp?.[5]) {
      formik.submitForm();
    }
  }, [formik.values.otp]);

  return (
    <CContainer gap={2}>
      <form id="send_otp" onSubmit={formik.handleSubmit}>
        <FieldRoot>
          <Field
            label={l.enter_otp}
            invalid={!!formik.errors.otp}
            errorText={formik.errors.otp as string}
          >
            <PinInput.Root
              w={"full"}
              colorPalette={themeConfig.colorPalette}
              value={formik.values.otp}
              onValueChange={(e) => formik.setFieldValue("otp", e.value)}
            >
              <PinInput.HiddenInput />
              <PinInput.Control>
                <PinInput.Input index={0} w={"full"} h={"60px"} />
                <PinInput.Input index={1} w={"full"} h={"60px"} />
                <PinInput.Input index={2} w={"full"} h={"60px"} />
                <PinInput.Input index={3} w={"full"} h={"60px"} />
                <PinInput.Input index={4} w={"full"} h={"60px"} />
                <PinInput.Input index={5} w={"full"} h={"60px"} />
              </PinInput.Control>
            </PinInput.Root>
          </Field>
        </FieldRoot>
      </form>
    </CContainer>
  );
};

const Step3Section = (props: any) => {
  // Props
  const { otp, setOtp } = props;

  // Hooks
  const { l } = useLang();
  const { req } = useRequest({ id: "reset_password" });

  // States
  const user = getUserData();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: { password: "", password_confirmation: "" },
    validationSchema: yup.object().shape({
      password: yup.string().required(l.required_form),
      password_confirmation: yup
        .string()
        .oneOf([yup.ref("password")], l.password_not_match)
        .required(l.required_form),
    }),
    onSubmit: (values) => {
      const payload = {
        email: user?.email,
        otp: otp,
        password: values.password,
        password_confirmation: values.password_confirmation,
      };

      const config = {
        url: `/api/admin/auth/verify-otp`,
        method: "POST",
        data: payload,
      };

      req({
        config,
        onResolve: {
          onSuccess: (r) => {
            console.log(r);

            setOtp("");
          },
        },
      });
    },
  });

  return (
    <CContainer gap={2}>
      <FieldRoot>
        <Field
          label={l.new_password}
          invalid={!!formik.errors.password}
          errorText={formik.errors.password as string}
        >
          <PasswordInput
            inputValue={formik.values.password}
            onChangeSetter={(input) => {
              formik.setFieldValue("password", input);
            }}
          />
        </Field>

        <Field
          label={l.confirm_password}
          invalid={!!formik.errors.password_confirmation}
          errorText={formik.errors.password_confirmation as string}
        >
          <PasswordInput
            inputValue={formik.values.password_confirmation}
            onChangeSetter={(input) => {
              formik.setFieldValue("password_confirmation", input);
            }}
          />
        </Field>
      </FieldRoot>
    </CContainer>
  );
};

const ChangePasswordDisclosureTrigger = (props: Props) => {
  // Props
  const { children, ...restProps } = props;

  // Hooks
  const { l } = useLang();
  const { open, onOpen, onClose } = useDisclosure();
  useBackOnClose(`reset-password`, open, onOpen, onClose);
  const { req } = useRequest({
    id: "reset_password",
  });

  // Contexts
  const { themeConfig } = useThemeConfig();

  // States
  const user = getUserData();
  const [otp, setOtp] = useState<string>("");

  // Utils
  function handleStep1() {
    setOtp("");

    if (!user?.email) {
      toaster.error({
        title: l.reset_password_failed,
        description: l.email_not_found,
        action: {
          label: "Close",
          onClick: () => {},
        },
      });

      return;
    }

    onOpen();

    const payload = {
      email: user?.email,
    };

    const config = {
      url: `/api/admin/auth/send-otp`,
      method: "POST",
      data: payload,
    };

    req({
      config,
      onResolve: {
        onSuccess: (r) => {
          console.log(r);
        },
      },
    });
  }

  return (
    <>
      <CContainer w={"fit"} onClick={handleStep1} {...restProps}>
        {children}
      </CContainer>

      <DisclosureRoot open={open} lazyLoad size={"xs"}>
        <DisclosureContent>
          <DisclosureHeader>
            <DisclosureHeaderContent title={`Reset Password`} />
          </DisclosureHeader>

          <DisclosureBody>
            {!otp && <Step2Section setOtp={setOtp} />}

            {otp && <Step3Section otp={otp} setOtp={setOtp} />}
          </DisclosureBody>

          <DisclosureFooter>
            <BackButton />

            <BButton
              type="submit"
              form="send_otp"
              colorPalette={themeConfig.colorPalette}
            >
              Submit
            </BButton>
          </DisclosureFooter>
        </DisclosureContent>
      </DisclosureRoot>
    </>
  );
};

export default ChangePasswordDisclosureTrigger;
