import { FC } from "react";
import { IconButton } from "../IconButton";
import { Notebook } from "@emotion-icons/fluentui-system-regular";
import { useRouter } from "next/router";
import { ButtonProps, useColorModeValue } from "@chakra-ui/react";

export const Logo: FC<{}> = (): JSX.Element => {
  const router = useRouter(),
    blue = {
      "300-600": useColorModeValue("blue.300", "blue.600"),
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
        color: blue["300-600"],
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
