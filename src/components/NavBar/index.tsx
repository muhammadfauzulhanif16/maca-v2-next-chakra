import { Grid, Flex, useColorModeValue } from "@chakra-ui/react";
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
    };

  return (
    <Flex
      h="100vh"
      alignItems="center"
      justifyContent="space-around"
      borderRightWidth={2}
      borderRightColor={gray["100-800"]}
      w="max"
      p={2}
      direction="column"
    >
      <Logo />

      <Grid templateRows="repeat(3, 1fr)" gap={4}>
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
  );
};
