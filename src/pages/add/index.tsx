import {
  Flex,
  Grid,
  Input,
  Checkbox,
  useToast,
  FormLabel,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  useColorModeValue,
} from "@chakra-ui/react";
import { FC } from "react";
import {
  useReadAllBooksQuery,
  useCreateBookMutation,
} from "../../app/services/book";
import { Layout } from "../../components";
import { Form, Field, Formik } from "formik";
import { object, string, boolean } from "yup";
import { ArrowEnterLeft } from "@emotion-icons/fluentui-system-regular";

type InitialValues = {
  title: string;
  author: string;
  published: string;
  is_completed: boolean;
};

const Add: FC<{}> = (): JSX.Element => {
  const toast = useToast();

  const [createBook] = useCreateBookMutation(),
    {
      data = [],
      isLoading,
      isFetching,
      isSuccess,
      isError,
    } = useReadAllBooksQuery("");

  const initialValues: InitialValues = {
    title: "",
    author: "",
    published: "",
    is_completed: false,
  };

  const blue = {
      "400-500": useColorModeValue("blue.400", "blue.500"),
    },
    red = {
      "400-500": useColorModeValue("red.400", "red.500"),
    },
    neutral = {
      "400-500": useColorModeValue("neutral.400", "neutral.500"),
    };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={object().shape({
        title: string().required("Book title required !"),
        author: string().required("Book author required !"),
        published: string().required("Book published required !"),
        is_completed: boolean(),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const { title, is_completed } = values;

        setTimeout(async () => {
          try {
            await createBook(values).unwrap();
            toast({
              position: "top-right",
              title: "Book added",
              description: `You've book "${title}" on ${
                is_completed ? "finished" : "reading"
              } list`,
              status: "success",
              duration: 4000,
              isClosable: true,
            });
          } catch ({ data }) {
            toast({
              position: "top-right",
              title: "An error occurred, try again.",
              description: `${data}`,
              status: "error",
              duration: 4000,
              isClosable: true,
            });
          }

          setSubmitting(false);
          resetForm();
        }, 1000);
      }}
    >
      {({ isSubmitting }: any) => {
        return (
          <Form>
            <Layout
              buttonType="submit"
              isLoading={isLoading || isFetching || isSubmitting}
              titlePage="Add"
              description="Add a book or more"
              buttonIcon={ArrowEnterLeft}
              buttonText="Submit"
              amount={data.length}
              isSuccess={isSuccess}
              isError={isError}
            >
              <Grid templateRows="repeat(4, 1fr)" gap={10} pt={2}>
                <Field name="title">
                  {({ field, meta: { error, touched } }: any) => (
                    <FormControl
                      variant="floating"
                      isRequired
                      isInvalid={touched && error}
                    >
                      <Input
                        id="title"
                        name="title"
                        placeholder=" "
                        {...field}
                        variant="flushed"
                        focusBorderColor={blue["400-500"]}
                        errorBorderColor={red["400-500"]}
                        borderColor={neutral["400-500"]}
                      />

                      <FormLabel htmlFor="title">Title</FormLabel>

                      <Grid templateColumns="repeat(2, 1fr)">
                        <FormHelperText>
                          Keep reading books with interesting titles.
                        </FormHelperText>
                        <FormErrorMessage
                          display="flex"
                          justifyContent="end"
                          alignItems="start"
                          color={red["400-500"]}
                        >
                          {error}
                        </FormErrorMessage>
                      </Grid>
                    </FormControl>
                  )}
                </Field>

                <Field name="author">
                  {({ field, meta: { error, touched } }: any) => (
                    <FormControl
                      variant="floating"
                      isRequired
                      isInvalid={touched && error}
                    >
                      <Input
                        id="author"
                        name="author"
                        placeholder=" "
                        {...field}
                        variant="flushed"
                        focusBorderColor={blue["400-500"]}
                        errorBorderColor={red["400-500"]}
                        borderColor={neutral["400-500"]}
                      />

                      <FormLabel htmlFor="author">Author</FormLabel>

                      <Grid templateColumns="repeat(2, 1fr)">
                        <FormHelperText>
                          Great person who made this book.
                        </FormHelperText>
                        <FormErrorMessage
                          display="flex"
                          justifyContent="end"
                          alignItems="start"
                          color={red["400-500"]}
                        >
                          {error}
                        </FormErrorMessage>
                      </Grid>
                    </FormControl>
                  )}
                </Field>

                <Field name="published">
                  {({ field, meta: { error, touched } }: any) => (
                    <FormControl
                      variant="floating"
                      isRequired
                      isInvalid={touched && error}
                    >
                      <Input
                        id="published"
                        name="published"
                        placeholder=" "
                        {...field}
                        type="month"
                        variant="flushed"
                        focusBorderColor={blue["400-500"]}
                        errorBorderColor={red["400-500"]}
                        borderColor={neutral["400-500"]}
                      />

                      <FormLabel htmlFor="published">Published</FormLabel>

                      <Grid templateColumns="repeat(2, 1fr)">
                        <FormHelperText>Book publishing time.</FormHelperText>
                        <FormErrorMessage
                          display="flex"
                          justifyContent="end"
                          alignItems="start"
                          color={red["400-500"]}
                        >
                          {error}
                        </FormErrorMessage>
                      </Grid>
                    </FormControl>
                  )}
                </Field>

                <Field name="is_completed">
                  {({ field }: any) => (
                    <FormControl>
                      <Flex>
                        <Checkbox
                          __css={{
                            color: "red.400",
                          }}
                          variant="rounded"
                          id="is_completed"
                          name="is_completed"
                          {...field}
                        />

                        <FormLabel htmlFor="is_completed" mb={0} ml={4}>
                          Completed
                        </FormLabel>
                      </Flex>

                      <FormHelperText>Have you read it?</FormHelperText>
                    </FormControl>
                  )}
                </Field>
              </Grid>
            </Layout>
          </Form>
        );
      }}
    </Formik>
  );
};

export default Add;

export { getServerSideProps } from "../../Chakra";
