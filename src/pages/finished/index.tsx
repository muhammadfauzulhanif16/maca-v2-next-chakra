import { FC } from "react";
import { Shelf } from "../../components/Shelf";

const Finished: FC<{}> = (): JSX.Element => {
  return (
    <Shelf
      titlePage="Finished"
      description="List of all books have been read"
      status="true"
    />
  );
};

export default Finished;

export { getServerSideProps } from "../../Chakra";
