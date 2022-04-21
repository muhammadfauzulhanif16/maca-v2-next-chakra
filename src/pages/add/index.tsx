import { FC, useRef, MutableRefObject, forwardRef } from "react";
import { Layout } from "../../components/Layout";
import { ArrowEnterLeft } from "@emotion-icons/fluentui-system-regular";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Checkbox,
  Grid,
  useColorModeValue,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  useCreateBookMutation,
  useReadAllBooksQuery,
} from "../../app/services/book";
import { Formik, Form, Field, FormikProps, ErrorMessage } from "formik";
import { boolean, object, string } from "yup";

type InitialValues = {
  title: string;
  author: string;
  published: string;
  is_completed: boolean;
};

const Add: FC<{}> = (): JSX.Element => {
  const router = useRouter(),
    toast = useToast();

  const { data = [], isLoading, isFetching } = useReadAllBooksQuery(""),
    [createBook] = useCreateBookMutation();

  const initialValues: InitialValues = {
    title: "",
    author: "",
    published: "",
    is_completed: false,
  };

  const titleRef = useRef() as MutableRefObject<HTMLInputElement>,
    authorRef = useRef() as MutableRefObject<HTMLInputElement>,
    publishedRef = useRef() as MutableRefObject<HTMLInputElement>;

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
        setTimeout(async () => {
          try {
            await createBook(values).unwrap();
            toast({
              position: "top-right",
              title: "Book added",
              description: `You've book "${values.title}" on ${
                values.is_completed ? "finished" : "reading"
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
            >
              <Grid templateRows="repeat(4, 1fr)" gap={10}>
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
                        ref={titleRef}
                        onFocus={() => {
                          titleRef.current.placeholder = "Enter title book";
                        }}
                        onBlur={() => {
                          titleRef.current.placeholder = " ";
                        }}
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
                        ref={authorRef}
                        onFocus={() => {
                          authorRef.current.placeholder = "Enter author book";
                        }}
                        onBlur={() => {
                          authorRef.current.placeholder = " ";
                        }}
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
                        ref={publishedRef}
                        onFocus={() => {
                          publishedRef.current.type = "month";
                          publishedRef.current.placeholder =
                            "Enter published book";
                        }}
                        onBlur={() => {
                          publishedRef.current.type = "text";
                          publishedRef.current.placeholder = " ";
                        }}
                      />

                      <FormLabel htmlFor="published">Published</FormLabel>

                      <Grid templateColumns="repeat(2, 1fr)">
                        <FormHelperText>Book publishing time.</FormHelperText>
                        <FormErrorMessage
                          display="flex"
                          justifyContent="end"
                          alignItems="start"
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
