import { Box, Image, Text, VStack, HStack, IconButton, useClipboard, useToast } from '@chakra-ui/react';
import { FiCopy, FiStar } from 'react-icons/fi';
import { ProcessedTokenData } from '../types';

interface TokenCardProps {
  token: ProcessedTokenData;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const TokenCard: React.FC<TokenCardProps> = ({ token, index, isFavorite, onToggleFavorite }) => {
  const { onCopy } = useClipboard(token["Contract Address"]);
  const toast = useToast();

  const handleCopy = () => {
    onCopy();
    toast({
      title: "Address copied",
      status: "success",
      duration: 2000,
    });
  };

  return (
    <Box
      borderWidth={1}
      borderRadius="lg"
      p={4}
      bg="white"
      boxShadow="md"
      transition="all 0.2s"
      _hover={{ transform: 'translateY(-4px)', boxShadow: 'lg' }}
    >
      <HStack justify="space-between" mb={2}>
        <HStack>
          <Text fontWeight="bold" fontSize="lg">#{index}</Text>
          <Image src={token["Logo URL"]} alt={token.Name} boxSize="30px" borderRadius="full" />
          <Text fontWeight="bold">{token.Name}</Text>
        </HStack>
        <IconButton
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          icon={<FiStar />}
          onClick={onToggleFavorite}
          colorScheme={isFavorite ? "yellow" : "gray"}
        />
      </HStack>
      <VStack align="stretch" spacing={2}>
        <Text>Price: {token.Price}</Text>
        <Text>24h Change: {token["24h PriceChange"]}</Text>
        <Text>FDV: {token.FDV}</Text>
        <HStack>
          <Text isTruncated>Address: {token["Contract Address"].slice(0, 10)}...</Text>
          <IconButton
            aria-label="Copy address"
            icon={<FiCopy />}
            size="sm"
            onClick={handleCopy}
          />
        </HStack>
      </VStack>
    </Box>
  );
};

export default TokenCard;