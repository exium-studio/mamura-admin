import { useThemeConfig } from "@/context/useThemeConfig";
import type {
  SkeletonProps as ChakraSkeletonProps,
  CircleProps,
  SkeletonProps,
} from "@chakra-ui/react";
import { Skeleton as ChakraSkeleton, Circle, Stack } from "@chakra-ui/react";
import { forwardRef } from "react";
import CContainer from "../ui-custom/CContainer";

export interface SkeletonCircleProps extends ChakraSkeletonProps {
  size?: CircleProps["size"];
}

export const SkeletonCircle = (props: SkeletonCircleProps) => {
  const { size, ...rest } = props;
  return (
    <Circle size={size} asChild>
      <ChakraSkeleton {...rest} />
    </Circle>
  );
};

export interface SkeletonTextProps extends ChakraSkeletonProps {
  noOfLines?: number;
}

export const SkeletonText = forwardRef<HTMLDivElement, SkeletonTextProps>(
  function SkeletonText(props, ref) {
    const { noOfLines = 3, gap, ...rest } = props;
    return (
      <Stack gap={gap} width="full" ref={ref}>
        {Array.from({ length: noOfLines }).map((_, index) => (
          <ChakraSkeleton
            height="4"
            key={index}
            {...props}
            _last={{ maxW: "80%" }}
            {...rest}
          />
        ))}
      </Stack>
    );
  }
);

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  function Skeleton(props, ref) {
    const { gap, ...rest } = props;

    // Contexts
    const { themeConfig } = useThemeConfig();

    return (
      <CContainer
        bg={"body"}
        flex={1}
        borderRadius={themeConfig.radii.container}
      >
        <ChakraSkeleton
          ref={ref}
          borderRadius={themeConfig.radii.container}
          {...rest}
        />
      </CContainer>
    );
  }
);

// export const Skeleton = ChakraSkeleton;
