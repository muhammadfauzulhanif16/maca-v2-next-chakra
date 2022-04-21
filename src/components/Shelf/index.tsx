import { FC, useRef } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useColorModeValue,
  useColorMode,
  VisuallyHidden,
  useToast,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import moment from "moment-timezone";
import {
  Delete,
  Edit,
  Book,
  BookOpen,
} from "@emotion-icons/fluentui-system-regular";
import { IconButton } from "../IconButton";
import {
  BookState,
  useDeleteBookMutation,
  useReadAllBooksQuery,
  useUpdateStatusBookMutation,
} from "../../app/services/book";
import { Layout } from "../../components/Layout";
import { Add, DismissSquare } from "@emotion-icons/fluentui-system-regular";

interface ShelfProps {
  titlePage: string;
  status: string;
  description: string;
}

export const Shelf: FC<ShelfProps> = ({
  titlePage,
  status,
  description,
}: ShelfProps) => {
  const { colorMode } = useColorMode(),
    toast = useToast();

  const {
      data = [],
      isLoading: isReading,
      isSuccess,
      isError,
    } = useReadAllBooksQuery(status),
    [updateStatusBook, { isLoading: isUpdating }] =
      useUpdateStatusBookMutation(),
    [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  const gray = {
      "50-900": useColorModeValue("gray.50", "gray.900"),
      "400-500": useColorModeValue("gray.400", "gray.500"),
    },
    red = {
      "400-500": useColorModeValue("red.400", "red.500"),
      "300-600": useColorModeValue("red.300", "red.600"),
    },
    yellow = {
      "400-500": useColorModeValue("yellow.400", "yellow.500"),
      "300-600": useColorModeValue("yellow.300", "yellow.600"),
    },
    blue = {
      "400-500": useColorModeValue("blue.400", "blue.500"),
      "300-600": useColorModeValue("blue.300", "blue.600"),
    };

  const handleUpdate = async ({ id, title, is_completed }: any) => {
      try {
        await updateStatusBook(id).unwrap();
        toast({
          position: "top-right",
          title: "Book updated status.",
          description: `You've updated status "${title}" book to ${
            is_completed ? "reading" : "finished"
          }`,
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
    },
    handleDelete = async ({ id, title }: any) => {
      try {
        await deleteBook(id).unwrap();
        toast({
          position: "top-right",
          title: "Book deleted.",
          description: `You've deleted "${title}" book`,
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
    };

  return (
    <Layout
      titlePage={titlePage}
      isLoading={isReading || isUpdating || isDeleting}
      description={description}
      buttonIcon={Add}
      buttonText="Add"
      amount={data.length}
    >
      {isError && (
        <IconButton
          as={DismissSquare}
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
      )}

      {isSuccess && (
        <>
          {data.length === 0 ? (
            <IconButton
              as={status === "true" ? Book : BookOpen}
              text={`No book on ${
                status === "true" ? "finished" : "reading"
              } list`}
              textProps={{
                fontSize: "xl",
                mt: 8,
              }}
              iconProps={{
                w: 12,
                h: 12,
              }}
              buttonProps={{
                color: gray["400-500"],
                w: "full",
                h: "full",
                display: "flex",
                flexDirection: "column",
                p: 0,
                variant: "none",
                cursor: "default",
              }}
            />
          ) : (
            <TableContainer
              overflow="auto"
              maxH="68vh"
              css={{
                "&::-webkit-scrollbar": {
                  width: ".5rem",
                  height: ".5rem",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor:
                    colorMode === "light" ? "#76E4F7" : "#00A3C4",
                  borderRadius: "1rem",
                },
              }}
            >
              <Table variant="simple">
                <Thead
                  position="sticky"
                  top={0}
                  bgColor={gray["50-900"]}
                  zIndex={2}
                  my={2}
                >
                  <Tr>
                    <Th>#</Th>
                    <Th>Title</Th>
                    <Th>Author</Th>
                    <Th>Published</Th>
                    <Th>Created At</Th>
                    <Th>
                      <VisuallyHidden>Action</VisuallyHidden>
                    </Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {data?.map(
                    (
                      {
                        id,
                        title,
                        author,
                        published,
                        is_completed,
                        created_at,
                      }: any,
                      idx: number
                    ) => (
                      <Tr key={id}>
                        <Td>{idx + 1}</Td>
                        <Td>{title}</Td>
                        <Td>{author}</Td>
                        <Td>
                          {moment(published)
                            .tz("Asia/Jakarta")
                            .format("MMM YYYY")}
                        </Td>
                        <Td>
                          {moment(created_at)
                            .tz("Asia/Jakarta")
                            .format("DD/MM/YYYY HH:mm:ss")}
                        </Td>
                        <Td>
                          <IconButton
                            as={status === "true" ? BookOpen : Book}
                            iconProps={{
                              w: 6,
                              h: 6,
                            }}
                            buttonProps={{
                              p: 0,
                              mx: 1,
                              _hover: {
                                bgColor: blue["300-600"],
                              },
                              bgColor: blue["400-500"],
                              onClick: () =>
                                handleUpdate({ id, title, is_completed }),
                            }}
                            tooltipProps={{
                              children: null,
                              label: `Change to ${
                                status === "true" ? "reading" : "finished"
                              }?`,
                            }}
                          />

                          {/* <IconButton
                            as={Edit}
                            iconProps={{
                              w: 6,
                              h: 6,
                            }}
                            buttonProps={{
                              p: 0,
                              mx: 1,
                              _hover: {
                                bgColor: yellow["300-600"],
                              },
                              bgColor: yellow["400-500"],
                              onClick: () => {},
                            }}
                            tooltipProps={{
                              children: null,
                              label: "Edit?",
                            }}
                          /> */}

                          <IconButton
                            as={Delete}
                            iconProps={{
                              w: 6,
                              h: 6,
                            }}
                            buttonProps={{
                              p: 0,
                              mx: 1,
                              _hover: {
                                bgColor: red["300-600"],
                              },
                              bgColor: red["400-500"],
                              onClick: () => handleDelete({ id, title }),
                            }}
                            tooltipProps={{
                              children: null,
                              label: "Delete?",
                            }}
                          />
                        </Td>
                      </Tr>
                    )
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
    </Layout>
  );
};
