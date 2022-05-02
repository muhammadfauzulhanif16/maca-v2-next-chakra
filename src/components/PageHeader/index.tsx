import {
  GridItem,
  Heading,
  Text,
  Box,
  Badge,
  useColorModeValue,
  Spinner,
  Grid,
  Flex,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ListItem,
  OrderedList,
  UnorderedList,
  ModalOverlay,
  ListIcon,
  List,
  Code,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import { Github } from "@emotion-icons/boxicons-logos";
import {
  Dismiss,
  LineHorizontal3,
} from "@emotion-icons/fluentui-system-regular";
import { useRouter } from "next/router";
import { FC } from "react";
import { IconButton } from "../IconButton";
import { Logo } from "../Logo";
import { MacaMenu } from "../Menu";
import { Search } from "../Search";

interface PageHeaderProps {
  pageHeaderTitle: string;
  description: string;
  buttonText: string;
  buttonIcon: any;
  amount?: number;
  isLoading?: boolean;
  buttonType?: any;
  shelfSearch?: any;
  setShelfSearch?: any;
}

export const PageHeader: FC<PageHeaderProps> = ({
  pageHeaderTitle,
  description,
  buttonText,
  buttonIcon,
  amount = 0,
  isLoading,
  buttonType,
  shelfSearch,
  setShelfSearch,
}): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure(),
    router = useRouter(),
    { colorMode, toggleColorMode } = useColorMode();

  const blue = {
      "300-600": useColorModeValue("blue.300", "blue.600"),
      "200-800": useColorModeValue("blue.200", "blue.800"),
      "400-500": useColorModeValue("blue.400", "blue.500"),
    },
    gray = {
      "100-800": useColorModeValue("gray.100", "gray.800"),
      "400-500": useColorModeValue("gray.400", "gray.500"),
    };

  return (
    <GridItem>
      <Box
        borderBottomWidth={2}
        borderBottomColor={gray["100-800"]}
        display={{
          base: "block",
          lg: "none",
        }}
      >
        <Flex mx={4} my={2} justifyContent="space-between" alignItems="center">
          <Logo />

          <Grid templateColumns="repeat(1, 1fr)" gap={2}>
            <MacaMenu
              as="iconButton"
              iconButtonProps={{
                "aria-label": "Menu",
                icon: <LineHorizontal3 />,
                p: 2,
              }}
              menuItemList={[
                {
                  text: `Theme : ${colorMode === "light" ? "Light" : "Dark"}`,
                  onClick: toggleColorMode,
                },
                {
                  text: "Help",
                  onClick: onOpen,
                },
              ]}
              menuProps={{
                children: null,
                placement: "bottom-end",
              }}
              menuListProps={{
                p: 0,
              }}
            />
          </Grid>
        </Flex>
      </Box>

      <Box
        display={{
          base: "grid",
          lg: "flex",
        }}
        justifyContent="space-between"
        gridTemplateColumns="repeat(2, 1fr)"
        gap={4}
        mx={{
          base: 4,
          lg: 0,
        }}
        mt={{
          base: 4,
          lg: 0,
        }}
      >
        <Box>
          <Box pos="relative">
            <Heading fontWeight={500}>{pageHeaderTitle}</Heading>

            {pageHeaderTitle !== "Dashboard" ? (
              <Badge
                shadow="md"
                colorScheme="blue"
                pos="absolute"
                top={0}
                right={0}
                fontSize={16}
                rounded={6}
              >
                {isLoading ? <Spinner size="xs" /> : amount}
              </Badge>
            ) : null}
          </Box>

          <Text color={gray["400-500"]}>{description}</Text>
        </Box>

        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={{
            base: 2,
            lg: 4,
          }}
          display="flex"
          justifyContent="end"
        >
          {pageHeaderTitle === "Reading" || pageHeaderTitle === "Finished" ? (
            <Search
              isLoading={isLoading}
              shelfSearch={shelfSearch}
              setShelfSearch={setShelfSearch}
            />
          ) : (
            ""
          )}

          <IconButton
            as={buttonIcon}
            isLoading={isLoading}
            text={buttonText}
            buttonProps={{
              shadow: "md",
              type: buttonType,
              disabled: isLoading,
              bgColor: blue["300-600"],
              _hover: {
                bgColor: isLoading ? "" : blue["200-800"],
              },
              w: {
                base: "max",
                lg: 40,
              },
              onClick: () =>
                router.push(
                  buttonText === "Add" ? `/${buttonText.toLowerCase()}` : ""
                ),
            }}
            textProps={{
              display: {
                base: "none",
                lg: "block",
              },
              ml: 4,
            }}
            iconProps={{
              w: 6,
              h: 6,
            }}
            tooltipProps={{
              display: {
                base: "block",
                lg: "none",
              },
              label: buttonText,
              children: null,
            }}
          />
        </Grid>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />

        <ModalContent
          bgColor={gray["100-800"]}
          shadow="md"
          rounded={16}
          m={4}
          userSelect="none"
        >
          <ModalHeader
            p={8}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Heading fontWeight={500} lineHeight={0}>
              What am I?
            </Heading>

            <IconButton
              as={Dismiss}
              iconProps={{
                w: 6,
                h: 6,
              }}
              buttonProps={{
                p: 0,
                variant: "ghost",
                _hover: {
                  bgColor: blue["300-600"],
                  shadow: "md",
                },
                onClick: onClose,
              }}
            />
          </ModalHeader>

          <ModalBody
            py={0}
            px={8}
            css={{
              "&::-webkit-scrollbar": {
                width: ".5rem",
                height: ".5rem",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: colorMode === "light" ? "#76E4F7" : "#00A3C4",
                borderRadius: "1rem",
              },
            }}
          >
            <UnorderedList>
              <ListItem>
                <Text display="inline" fontWeight="700">
                  Maca
                </Text>{" "}
                is a website application to keep a list of books are being read
                or have been read, and taken from the Sundanese language which
                means {`"\Read\"`}.
              </ListItem>
              <ListItem>
                The technology used is Next JS, Chakra UI, Formik, RTK Query.
              </ListItem>
              <ListItem>
                Features :
                <OrderedList>
                  <ListItem>
                    Add books to the bookshelf are being read or have been read
                    with details of title, author and published.
                  </ListItem>
                  <ListItem>
                    See all important overview of book activity.
                  </ListItem>
                  <ListItem>
                    See a list of books are being read or have been read on the
                    bookshelf.
                  </ListItem>
                  <ListItem>Search for book by title or author.</ListItem>
                  <ListItem>Change status and delete book.</ListItem>
                  <ListItem>Light or dark theme mode.</ListItem>
                  <ListItem>Responsive on any device.</ListItem>
                </OrderedList>
              </ListItem>
              <ListItem>
                Follow in tounch me :
                <List>
                  <ListItem
                    textDecor="underline"
                    onClick={() =>
                      router.push("https://github.com/muhammadfauzulhanif16")
                    }
                    _hover={{
                      cursor: "pointer",
                    }}
                  >
                    <ListIcon as={Github} />
                    @muhammadfauzulhanif16
                  </ListItem>
                </List>
              </ListItem>
            </UnorderedList>
          </ModalBody>

          <ModalFooter p={4} justifyContent="center">
            <Code colorScheme="blue" rounded={6} px={2} py={0.5} shadow="md">
              version 2.1
            </Code>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </GridItem>
  );
};
