import React, { useMemo } from "react";
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
  Text,
} from "@chakra-ui/react";
import { ProcessedTokenData } from "../types";
import { FiCopy, FiExternalLink } from "react-icons/fi";
import { FaTrophy } from "react-icons/fa";

interface EnhancedTableProps {
  data: ProcessedTokenData[];
}

const EnhancedTable: React.FC<EnhancedTableProps> = ({ data }) => {
  const toast = useToast();

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => b._volume24h - a._volume24h);
  }, [data]);

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
      bsc: "https://cryptologos.cc/logos/bnb-bnb-logo.png?v=035",
      solana: "https://cryptologos.cc/logos/solana-sol-logo.png?v=035",
      tron: "https://cryptologos.cc/logos/tron-trx-logo.png?v=035",
      sui: "https://cryptologos.cc/logos/sui-sui-logo.png",
    };
    return logos[network.toLowerCase()] || "";
  };

  const renderLinkButton = (url: string, label: string) => {
    if (url && url !== "N/A") {
      return (
        <Link href={url} isExternal mr={2}>
          <Button
            size="sm"
            leftIcon={<FiExternalLink />}
            variant="outline"
            colorScheme="gray"
          >
            {label}
          </Button>
        </Link>
      );
    }
    return null;
  };

  const getTrophyIcon = (index: number) => {
    if (index < 3) {
      const colors = ["#FFD700", "#C0C0C0", "#CD7F32"];
      return <Icon as={FaTrophy} color={colors[index]} mr={2} />;
    }
    return null;
  };

  const getVolumeColor = (index: number) => {
    if (index === 0) return "orange.500";
    if (index === 1) return "gray.500";
    if (index === 2) return "orange.300";
    return "black";
  };

  return (
    <Box overflowX="auto" borderRadius="lg" boxShadow="xl" bg="white">
      <Table variant="simple">
        <Thead>
          <Tr bg="gray.50">
            <Th>Rank</Th>
            <Th>Name</Th>
            <Th>Network</Th>
            <Th isNumeric>Price</Th>
            <Th isNumeric>24h Change</Th>
            <Th isNumeric>FDV</Th>
            <Th isNumeric>24h Volume</Th>
            <Th isNumeric>Liquidity</Th>
            <Th>Contract Address</Th>
            <Th>Links</Th>
          </Tr>
        </Thead>
        <Tbody>
          {sortedData.map((token, index) => (
            <Tr key={token["Contract Address"]} _hover={{ bg: "gray.50" }}>
              <Td>{index + 1}</Td>
              <Td>
                <Flex align="center">
                  <Image
                    src={token["Logo URL"]}
                    alt={token.Name}
                    boxSize="40px"
                    mr={2}
                    borderRadius="full"
                  />
                  <Text fontWeight="medium">{token.Name}</Text>
                </Flex>
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
              <Td isNumeric fontWeight="medium">
                {token.Price}
              </Td>
              <Td
                isNumeric
                color={
                  parseFloat(token["24h PriceChange"]) >= 0
                    ? "green.500"
                    : "red.500"
                }
                fontWeight="medium"
              >
                {token["24h PriceChange"]}
              </Td>
              <Td isNumeric>{token.FDV}</Td>
              <Td isNumeric fontWeight="medium" color={getVolumeColor(index)}>
                <Flex align="center" justify="flex-end">
                  {getTrophyIcon(index)}
                  <Text>{token["24h Volume"]}</Text>
                </Flex>
              </Td>
              <Td isNumeric>{token.Liquidity}</Td>
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
