import { FC } from "react";
import { IconButton } from "../IconButton";
import { Notebook } from "@emotion-icons/fluentui-system-regular";
import { useRouter } from "next/router";
import { ButtonProps, useColorModeValue } from "@chakra-ui/react";

interface LogoProps {
  buttonProps?: ButtonProps;
}

export const Logo: FC<LogoProps> = ({
  buttonProps,
}: LogoProps): JSX.Element => {
  const router = useRouter(),
    cyan = {
      "400-500": useColorModeValue("cyan.400", "cyan.500"),
    };

  return (
    <IconButton
      tooltipProps={{
        children: null,
        placement: "right",
        label: "Maca",
      }}
      as={Notebook}
      iconProps={{
        w: 8,
        h: 8,
      }}
      buttonProps={{
        ...buttonProps,
        color: cyan["400-500"],
        variant: "none",
        onClick: () => router.push("/"),
        p: 0,
      }}
    />
  );
};
