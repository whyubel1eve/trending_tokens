// components/EnhancedTable.tsx
import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Button,
  useToast,
  Link,
  Box,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { ProcessedTokenData } from "../types";
import { FiCopy, FiExternalLink } from "react-icons/fi";

interface EnhancedTableProps {
  data: ProcessedTokenData[];
}

const EnhancedTable: React.FC<EnhancedTableProps> = ({ data }) => {
  const toast = useToast();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Address copied to clipboard",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const getNetworkLogo = (network: string) => {
    const logos: { [key: string]: string } = {
      ethereum: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=035",
      bnb: "https://cryptologos.cc/logos/bnb-bnb-logo.png?v=035",
      solana: "https://cryptologos.cc/logos/solana-sol-logo.png?v=035",
      tron: "https://cryptologos.cc/logos/tron-trx-logo.png?v=035",
    };
    return logos[network.toLowerCase()] || "";
  };

  const renderLinkButton = (url: string, label: string) => {
    if (url && url !== "N/A") {
      return (
        <Link href={url} isExternal mr={2}>
          <Button size="sm" leftIcon={<FiExternalLink />}>
            {label}
          </Button>
        </Link>
      );
    }
    return null;
  };

  return (
    <Box overflowX="auto">
      <Table variant="simple" bg="white" boxShadow="sm" borderRadius="md">
        <Thead>
          <Tr>
            <Th>Rank</Th>
            <Th>Name</Th>
            <Th>Network</Th>
            <Th>Price</Th>
            <Th>24h Change</Th>
            <Th>FDV</Th>
            <Th>24h Volume</Th>
            <Th>Liquidity</Th>
            <Th>Contract Address</Th>
            <Th>Links</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((token, index) => (
            <Tr key={token["Contract Address"]}>
              <Td>{index + 1}</Td>
              <Td>
                <Image
                  src={token["Logo URL"]}
                  alt={token.Name}
                  boxSize="40px"
                  mr={2}
                  display="inline"
                />
                {token.Name}
              </Td>
              <Td>
                <Flex align="center">
                  <Image
                    src={getNetworkLogo(token.Network)}
                    alt={token.Network}
                    boxSize="20px"
                    mr={2}
                  />
                  {token.Network}
                </Flex>
              </Td>
              <Td>{token.Price}</Td>
              <Td>{token["24h PriceChange"]}</Td>
              <Td>{token.FDV}</Td>
              <Td>{token["24h Volume"]}</Td>
              <Td>{token.Liquidity}</Td>
              <Td>
                <Flex align="center">
                  <Box
                    as="span"
                    cursor="pointer"
                    onClick={() => handleCopy(token["Contract Address"])}
                    _hover={{ textDecoration: "underline" }}
                    mr={2}
                  >
                    {formatAddress(token["Contract Address"])}
                  </Box>
                  <Icon
                    as={FiCopy}
                    cursor="pointer"
                    onClick={() => handleCopy(token["Contract Address"])}
                    _hover={{ color: "blue.500" }}
                  />
                </Flex>
              </Td>
              <Td>
                <Flex>
                  {renderLinkButton(token.Website, "Website")}
                  {renderLinkButton(token.Twitter, "Twitter")}
                  {renderLinkButton(token["DexScreener Url"], "DexScreener")}
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default EnhancedTable;
