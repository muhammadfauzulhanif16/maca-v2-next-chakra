import type { NextPage } from "next";
import { Layout } from "../components/Layout";
import { Add } from "@emotion-icons/fluentui-system-regular";
import {
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  useToast,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { IconButton } from "../components/IconButton";
import {
  BookAdd,
  BookOpen,
  Book,
} from "@emotion-icons/fluentui-system-regular";
import { BookState, useReadAllBooksQuery } from "../app/services/book";

type Overview = {
  icon: any;
  label: string;
  amount: Array<BookState>;
  // description: number;
};

const Home: NextPage = (): JSX.Element => {
  const toast = useToast();

  const {
      data: allData = [],
      isFetching,
      isLoading,
      error,
      isError: isErrorAll,
    } = useReadAllBooksQuery(""),
    { data: readingData = [], isError: isErrorReading } =
      useReadAllBooksQuery("false"),
    { data: finishedData = [], isError: isErrorFinished } =
      useReadAllBooksQuery("true");

  // console.log("err", error);

  const overviewList: Array<Overview> = [
    {
      icon: BookAdd,
      label: "Amount added",
      amount: allData,
      // description: 2,
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
      // description: 16,
    },
  ];

  const gray = {
      "100-800": useColorModeValue("gray.100", "gray.800"),
    },
    cyan = {
      "300-600": useColorModeValue("cyan.300", "cyan.600"),
    };

  // if (isErrorAll && isErrorReading && isErrorFinished) {
  //   toast({
  //     title: "Error",
  //     description: `${error.data}`,
  //     status: "error",
  //     duration: 3000,
  //     isClosable: true,
  //     position: "top",
  //   });
  // }

  return (
    <Layout
      isLoading={isLoading || isFetching}
      titlePage="Dashboard"
      description="All important overviews of book activity"
      buttonIcon={Add}
      buttonText="Add"
    >
      <Grid templateColumns="repeat(3, 1fr)" gap={10}>
        {overviewList.map(({ icon, label, amount }, id: number) => (
          <GridItem
            key={id}
            bgColor={gray["100-800"]}
            p={6}
            rounded={16}
            display="flex"
            flexDirection="row"
          >
            <IconButton
              as={icon}
              iconProps={{
                w: 6,
                h: 6,
              }}
              buttonProps={{
                cursor: "default",
                variant: "none",
                mr: 6,
                p: 0,
                bgColor: cyan["300-600"],
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
        ))}
      </Grid>
    </Layout>
  );
};

export default Home;

export { getServerSideProps } from "../Chakra";
