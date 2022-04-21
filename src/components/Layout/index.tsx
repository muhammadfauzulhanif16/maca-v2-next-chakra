import {
  Box,
  Flex,
  Grid,
  GridItem,
  useColorModeValue,
  Center,
  Spinner,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import Head from "next/head";
import { NavBar } from "../NavBar";
import { PageHeader } from "../PageHeader";

interface LayoutProps {
  titlePage: string;
  children: ReactNode;
  description: string;
  buttonText: string;
  buttonIcon: any;
  amount?: number;
  isLoading?: boolean;
  buttonType?: any;
}

export const Layout: FC<LayoutProps> = ({
  titlePage,
  children,
  description,
  buttonText,
  buttonIcon,
  amount,
  isLoading,
  buttonType,
}: LayoutProps): JSX.Element => {
  const gray = {
      "50-900": useColorModeValue("gray.50", "gray.900"),
      "900-50": useColorModeValue("gray.900", "gray.50"),
    },
    cyan = {
      "300-600": useColorModeValue("cyan.300", "cyan.600"),
    };

  return (
    <Flex
      bgColor={gray["50-900"]}
      color={gray["900-50"]}
      h="100vh"
      userSelect="none"
    >
      <Head>
        <title>
          {`${
            titlePage === "Dashboard"
              ? titlePage
              : titlePage === "Add"
              ? `${titlePage} book`
              : `${titlePage} list`
          } | Maca - Bookshelf Web App CreatedBy Fauzul`}
        </title>
      </Head>

      <Box display={{ base: "none", lg: "flex" }}>
        <NavBar titlePage={titlePage} />
      </Box>

      <Grid
        m={{
          base: 0,
          lg: 8,
        }}
        templateRows="repeat(5, 1fr)"
        gap={8}
        w="full"
      >
        <PageHeader
          buttonType={buttonType}
          pageHeaderTitle={titlePage}
          description={description}
          buttonIcon={buttonIcon}
          buttonText={buttonText}
          amount={amount}
          isLoading={isLoading}
        />

        {isLoading ? (
          <GridItem
            rowSpan={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Spinner size="xl" color={cyan["300-600"]} thickness="4px" />
          </GridItem>
        ) : (
          <GridItem
            rowSpan={4}
            mx={{
              base: 4,
              lg: 0,
            }}
            mb={{
              base: 4,
              lg: 0,
            }}
          >
            {children}
          </GridItem>
        )}

        <Box display={{ base: "flex", lg: "none" }}>
          <NavBar titlePage={titlePage} />
        </Box>
      </Grid>
    </Flex>
  );
};
