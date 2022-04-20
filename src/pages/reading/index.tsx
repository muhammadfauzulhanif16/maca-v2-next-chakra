import { FC } from "react";
import { Shelf } from "../../components/Shelf";

const Reading: FC<{}> = () => {
  return (
    <Shelf
      titlePage="Reading"
      description="List of all books being read"
      status="false"
    />
  );
};

export default Reading;

export { getServerSideProps } from "../../Chakra";
