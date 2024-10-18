import { FC } from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";
import { FiRefreshCw, FiDownload } from "react-icons/fi";
import { exportToExcel } from "../utils/excelExport";
import { ProcessedTokenData } from "../types";

interface HeaderProps {
  onRefresh: () => void;
  data: ProcessedTokenData[];
}

const Header: FC<HeaderProps> = ({ onRefresh, data }) => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      marginBottom={30}
      w="full"
    >
      <Heading paddingLeft={10} size="lg">
        Trending Tokens
      </Heading>
      <Flex paddingRight={20}>
        <Button leftIcon={<FiRefreshCw />} onClick={onRefresh} mr={2}>
          Refresh
        </Button>
        <Button leftIcon={<FiDownload />} onClick={() => exportToExcel(data)}>
          Export
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
