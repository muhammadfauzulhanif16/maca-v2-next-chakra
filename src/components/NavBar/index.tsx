import { Grid, Flex, useColorModeValue, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC } from "react";
import { Theme } from "../Theme";
import { IconButton } from "../IconButton";
import { Logo } from "../Logo";
import { NavList, NavListState } from "./NavList";

interface NavBarProps {
  titlePage: string;
}

export const NavBar: FC<NavBarProps> = ({ titlePage }): JSX.Element => {
  const router = useRouter(),
    cyan = {
      "300-600": useColorModeValue("cyan.300", "cyan.600"),
    },
    gray = {
      "100-800": useColorModeValue("gray.100", "gray.800"),
      "50-900": useColorModeValue("gray.50", "gray.900"),
    };

  return (
    <Flex
      bgColor={gray["50-900"]}
      h={{
        base: "max",
        lg: "100vh",
      }}
      borderRightWidth={2}
      borderRightColor={gray["100-800"]}
      borderTopWidth={2}
      borderTopColor={gray["100-800"]}
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
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="space-around"
        display={{ base: "none", lg: "flex" }}
      >
        <Logo />

        <Grid templateRows="repeat(4, 1fr)" gap={4}>
          {NavList.map(({ icon, title }: NavListState, id: number) => (
            <IconButton
              key={id}
              as={icon}
              iconProps={{
                w: 6,
                h: 6,
              }}
              buttonProps={{
                p: 0,
                variant: "ghost",
                _hover: {
                  bgColor: cyan["300-600"],
                },
                bgColor: title === titlePage ? cyan["300-600"] : "",
                onClick: () =>
                  router.push(
                    title === "Dashboard" ? "/" : `/${title.toLowerCase()}`
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
          ))}
        </Grid>

        <Theme />
      </Flex>

      <Flex w="100vw" display={{ base: "flex", lg: "none" }} gap={2}>
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
              w: title === titlePage ? "full" : 0,
              variant: "ghost",
              _hover: {
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
    </Flex>
  );
};
