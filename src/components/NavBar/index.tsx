import {
  Grid,
  Flex,
  useColorModeValue,
  Box,
  useColorMode,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC } from "react";
import { Theme } from "../Theme";
import { IconButton } from "../IconButton";
import { Logo } from "../Logo";
import { NavList, NavListState } from "./NavList";
import { Help } from "../Help";

interface NavBarProps {
  titlePage: string;
}

export const NavBar: FC<NavBarProps> = ({
  titlePage,
}: NavBarProps): JSX.Element => {
  const router = useRouter(),
    { colorMode } = useColorMode();

  const cyan = {
      "300-600": useColorModeValue("cyan.300", "cyan.600"),
    },
    gray = {
      "100-800": useColorModeValue("gray.100", "gray.800"),
      "50-900": useColorModeValue("gray.50", "gray.900"),
    };

  return (
    <Box
      bgColor={gray["50-900"]}
      h={{
        base: "max",
        lg: "100vh",
      }}
      borderRight={{
        base: "none",
        lg: `2px solid ${colorMode === "light" ? "#edf2f7" : "#1a202c"}`,
      }}
      borderTop={{
        base: `2px solid ${colorMode === "light" ? "#edf2f7" : "#1a202c"}`,
        lg: "none",
      }}
      w={{
        base: "100vw",
        lg: "max",
      }}
      px={{
        base: 4,
        lg: 2,
      }}
      py={{
        base: 2,
      }}
    >
      <Grid
        h="full"
        templateRows="repeat(3, 1fr)"
        display={{
          base: "none",
          lg: "grid",
        }}
      >
        <Logo />

        <Flex justifyContent="center" direction="column" gap={2}>
          {NavList.map(
            ({ icon, title }: NavListState, id: number): JSX.Element => (
              <IconButton
                key={id}
                as={icon}
                iconProps={{
                  w: 6,
                  h: 6,
                }}
                buttonProps={{
                  variant: "ghost",
                  _hover: {
                    bgColor: cyan["300-600"],
                  },
                  bgColor: title === titlePage ? cyan["300-600"] : "",
                  onClick: () =>
                    router.push(
                      `/${
                        title === "Dashboard" ? "" : `${title.toLowerCase()}`
                      }`
                    ),
                }}
                tooltipProps={{
                  placement: "right",
                  label:
                    title === "Dashboard"
                      ? title
                      : title === "Add"
                      ? `${title} book`
                      : `${title} list`,
                  children: null,
                }}
              />
            )
          )}
        </Flex>

        <Flex justifyContent="center" direction="column" gap={2}>
          <Theme />
          <Help />
        </Flex>
      </Grid>

      <Flex
        w="full"
        display={{
          base: "flex",
          lg: "none",
        }}
        gap={2}
      >
        {NavList.map(({ icon, title }: NavListState, id: number) => (
          <IconButton
            key={id}
            as={icon}
            text={title === titlePage ? title : ""}
            textProps={{
              ml: title === titlePage ? 2 : 0,
            }}
            iconProps={{
              w: 6,
              h: 6,
            }}
            buttonProps={{
              shadow: title === titlePage ? "md" : "",
              w: title === titlePage ? "full" : 0,
              variant: "ghost",
              _hover: {
                shadow: "md",
                bgColor: cyan["300-600"],
              },
              bgColor: title === titlePage ? cyan["300-600"] : "",
              onClick: () =>
                router.push(
                  title === "Dashboard" ? "/" : `/${title.toLowerCase()}`
                ),
            }}
          />
        ))}
      </Flex>
    </Box>
  );
};
