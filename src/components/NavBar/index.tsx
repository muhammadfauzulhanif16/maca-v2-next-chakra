import {
  Grid,
  Flex,
  Box,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useColorMode,
  Heading,
  ListItem,
  OrderedList,
  UnorderedList,
  Text,
  ModalOverlay,
  ListIcon,
  List,
  Code,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC } from "react";
import { IconButton } from "../IconButton";
import { Logo } from "../Logo";
import { NavList, NavListState } from "./NavList";
import { MacaMenu } from "../Menu";
import {
  Dismiss,
  LineHorizontal3,
} from "@emotion-icons/fluentui-system-regular";
import { Github } from "@emotion-icons/boxicons-logos";

interface NavBarProps {
  titlePage: string;
}

export const NavBar: FC<NavBarProps> = ({
  titlePage,
}: NavBarProps): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure(),
    router = useRouter(),
    { colorMode, toggleColorMode } = useColorMode();

  const blue = {
      "300-600": useColorModeValue("blue.300", "blue.600"),
    },
    neutral = {
      "100-800": useColorModeValue("neutral.100", "neutral.800"),
      "50-900": useColorModeValue("neutral.50", "neutral.900"),
    };

  return (
    <Box
      bgColor={neutral["50-900"]}
      h={{
        base: "max",
        lg: "100vh",
      }}
      borderRight={{
        base: "none",
        lg: `2px solid ${colorMode === "light" ? "#edf2f7" : "#1a202c"}`,
      }}
      borderTop={{
        base: `2px solid ${colorMode === "light" ? "#edf2f7" : "#1a202c"}`,
        lg: "none",
      }}
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
      <Grid
        h="full"
        templateRows="repeat(3, 1fr)"
        display={{
          base: "none",
          lg: "grid",
        }}
      >
        <Logo />

        <Flex justifyContent="center" direction="column" gap={2}>
          {NavList.map(
            ({ icon, title }: NavListState, id: number): JSX.Element => (
              <IconButton
                key={id}
                as={icon}
                iconProps={{
                  w: 6,
                  h: 6,
                }}
                buttonProps={{
                  shadow: title === titlePage ? "md" : "",
                  variant: "ghost",
                  _hover: {
                    bgColor: blue["300-600"],
                    shadow: "md",
                  },
                  bgColor: title === titlePage ? blue["300-600"] : "",
                  onClick: () =>
                    router.push(
                      `/${
                        title === "Dashboard" ? "" : `${title.toLowerCase()}`
                      }`
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
            )
          )}
        </Flex>

        <Flex justifyContent="center" direction="column" gap={2}>
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
              placement: "right",
            }}
            menuListProps={{
              p: 0,
            }}
          />
        </Flex>
      </Grid>

      <Flex
        w="full"
        display={{
          base: "flex",
          lg: "none",
        }}
        gap={2}
      >
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
              shadow: title === titlePage ? "md" : "",
              w: title === titlePage ? "full" : 0,
              variant: "ghost",
              _hover: {
                shadow: "md",
                bgColor: blue["300-600"],
              },
              bgColor: title === titlePage ? blue["300-600"] : "",
              onClick: () =>
                router.push(
                  title === "Dashboard" ? "/" : `/${title.toLowerCase()}`
                ),
            }}
          />
        ))}
      </Flex>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        scrollBehavior="inside"
      >
        <ModalOverlay />

        <ModalContent
          bgColor={neutral["100-800"]}
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
    </Box>
  );
};
