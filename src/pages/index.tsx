import {
  Grid,
  Stat,
  GridItem,
  useToast,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import {
  Add,
  Book,
  BookAdd,
  BookOpen,
} from "@emotion-icons/fluentui-system-regular";
import { Layout, IconButton } from "../components";
import { BookState, useReadAllBooksQuery } from "../app/services/book";

type Overview = {
  icon: any;
  label: string;
  amount: Array<BookState>;
  // description: number;
};

const Home: NextPage = (): JSX.Element => {
  const {
      data: allData = [],
      isFetching,
      isLoading: isLoadingAll,
      isError,
      isSuccess,
    } = useReadAllBooksQuery(""),
    { data: readingData = [], isLoading: isLoadingReading } =
      useReadAllBooksQuery("false"),
    { data: finishedData = [], isLoading: isLoadingFinished } =
      useReadAllBooksQuery("true");

  const overviewList: Array<Overview> = [
    {
      icon: BookAdd,
      label: "Amount added",
      amount: allData,
    },
    {
      icon: BookOpen,
      label: "Amount Reading",
      amount: readingData,
    },
    {
      icon: Book,
      label: "Amount Finished",
      amount: finishedData,
    },
  ];

  const neutral = {
      "100-800": useColorModeValue("neutral.100", "neutral.800"),
    },
    blue = {
      "300-600": useColorModeValue("blue.300", "blue.600"),
    };

  return (
    <Layout
      isLoading={isLoadingAll || isLoadingReading || isLoadingFinished}
      titlePage="Dashboard"
      description="All important overviews of book activity"
      buttonIcon={Add}
      buttonText="Add"
      isSuccess={isSuccess}
      isError={isError}
    >
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={{
          base: 4,
          lg: 10,
        }}
      >
        {overviewList.map(
          ({ icon, label, amount }: Overview, id: number): JSX.Element => (
            <GridItem
              key={id}
              bgColor={neutral["100-800"]}
              p={6}
              rounded={16}
              display="flex"
              flexDirection="row"
              shadow="md"
            >
              <IconButton
                as={icon}
                iconProps={{
                  w: 6,
                  h: 6,
                }}
                buttonProps={{
                  shadow: "md",
                  cursor: "default",
                  variant: "none",
                  mr: 6,
                  p: 0,
                  bgColor: blue["300-600"],
                }}
              />

              <Stat>
                <StatLabel>{label}</StatLabel>

                <StatNumber>
                  {amount.length} {amount.length < 2 ? "book" : "books"}
                </StatNumber>
                {/* <StatHelpText>
                  <StatArrow type="increase" />
                  {description} - today
                </StatHelpText> */}
              </Stat>
            </GridItem>
          )
        )}
      </Grid>
    </Layout>
  );
};

export default Home;

export { getServerSideProps } from "../Chakra";
