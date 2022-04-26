import { FC } from "react";
import { IconButton } from "../IconButton";
import { Notebook } from "@emotion-icons/fluentui-system-regular";
import { useRouter } from "next/router";
import { ButtonProps, useColorModeValue } from "@chakra-ui/react";

export const Logo: FC<{}> = (): JSX.Element => {
  const router = useRouter(),
    cyan = {
      "400-500": useColorModeValue("cyan.400", "cyan.500"),
    };

  return (
    <IconButton
      as={Notebook}
      iconProps={{
        w: 8,
        h: 8,
      }}
      buttonProps={{
        h: "full",
        color: cyan["400-500"],
        variant: "none",
        onClick: () => router.push("/"),
      }}
      text="Maca"
      textProps={{
        display: {
          base: "inline",
          lg: "none",
        },
        fontSize: "2xl",
        ml: 4,
        fontWeight: "bold",
      }}
    />
  );
};
