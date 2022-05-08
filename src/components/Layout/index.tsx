import {
  Box,
  Flex,
  Grid,
  GridItem,
  useColorModeValue,
  Spinner,
  useColorMode,
} from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import Head from "next/head";
import { NavBar } from "../NavBar";
import { PageHeader } from "../PageHeader";
import {
  Dismiss,
  Book,
  BookOpen,
} from "@emotion-icons/fluentui-system-regular";
import { IconButton } from "../IconButton";

interface LayoutProps {
  titlePage: string;
  children: ReactNode;
  description: string;
  buttonText: string;
  buttonIcon: any;
  amount?: number;
  isLoading?: boolean;
  buttonType?: any;
  isSuccess?: boolean;
  isError?: boolean;
  shelfSearch?: any;
  setShelfSearch?: any;
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
  isError,
  isSuccess,
  shelfSearch,
  setShelfSearch,
}: LayoutProps): JSX.Element => {
  const { colorMode } = useColorMode();

  const neutral = {
      "50-900": useColorModeValue("neutral.50", "neutral.900"),
      "900-50": useColorModeValue("neutral.900", "neutral.50"),
    },
    blue = {
      "300-600": useColorModeValue("blue.300", "blue.600"),
    },
    red = {
      "400-500": useColorModeValue("red.400", "red.500"),
    };

  return (
    <Flex
      bgColor={neutral["50-900"]}
      color={neutral["900-50"]}
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
        p={{
          base: 0,
          lg: 12,
        }}
        templateRows="repeat(5, 1fr)"
        w="full"
        gap={4}
      >
        <PageHeader
          buttonType={buttonType}
          pageHeaderTitle={titlePage}
          description={description}
          buttonIcon={buttonIcon}
          buttonText={buttonText}
          amount={amount}
          isLoading={isLoading}
          shelfSearch={shelfSearch}
          setShelfSearch={setShelfSearch}
        />

        {isLoading ? (
          <GridItem
            rowSpan={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
            mx={{
              base: 4,
              lg: 0,
            }}
          >
            <Spinner size="xl" color={blue["300-600"]} thickness="4px" />
          </GridItem>
        ) : (
          <>
            {isError && (
              <GridItem
                rowSpan={4}
                mx={{
                  base: 4,
                  lg: 0,
                }}
              >
                <IconButton
                  as={Dismiss}
                  text="An error occurred"
                  textProps={{
                    fontSize: "xl",
                    mt: 8,
                  }}
                  iconProps={{
                    w: 12,
                    h: 12,
                  }}
                  buttonProps={{
                    color: red["400-500"],
                    w: "full",
                    h: "full",
                    display: "flex",
                    flexDirection: "column",
                    p: 0,
                    variant: "none",
                    cursor: "default",
                  }}
                />
              </GridItem>
            )}

            {isSuccess && (
              <GridItem
                rowSpan={4}
                px={{
                  base: 4,
                  lg: 0,
                }}
                overflow="auto"
                css={{
                  "&::-webkit-scrollbar": {
                    width: ".5rem",
                    height: ".5rem",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor:
                      colorMode === "light" ? "#63B3ED" : "#2B6CB0",
                    borderRadius: "1rem",
                  },
                }}
              >
                {children}
              </GridItem>
            )}
          </>
        )}

        <Box display={{ base: "flex", lg: "none" }}>
          <NavBar titlePage={titlePage} />
        </Box>
      </Grid>
    </Flex>
  );
};
