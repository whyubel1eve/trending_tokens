"use client";

import { useState, useEffect } from "react";
import {
  ChakraProvider,
  Container,
  Box,
  Spinner,
  Center,
  Text,
} from "@chakra-ui/react";
import { fetchTrendingPools } from "./utils/api";
import Header from "./components/Header";
import EnhancedTable from "./components/Table";
import { ProcessedTokenData } from "./types";

export default function Home() {
  const [data, setData] = useState<ProcessedTokenData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setData([]);
    setError(null);

    try {
      const generator = fetchTrendingPools();
      for await (const item of generator) {
        setData((prevData) => [...prevData, item]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("An error occurred while fetching data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ChakraProvider>
      <Box bg="gray.50" minHeight="100vh" py={5}>
        <Container maxW="container.2xl">
          <Header onRefresh={fetchData} data={data} />
          {isLoading && data.length === 0 ? (
            <Center>
              <Spinner size="xl" />
            </Center>
          ) : error ? (
            <Center>
              <Text color="red.500">{error}</Text>
            </Center>
          ) : (
            <>
              <EnhancedTable data={data} />
              {isLoading && (
                <Center mt={4}>
                  <Spinner size="md" />
                  <Text ml={2}>Loading more data...</Text>
                </Center>
              )}
            </>
          )}
        </Container>
      </Box>
    </ChakraProvider>
  );
}
