"use client";

import { useState, useEffect } from "react";
import {
  ChakraProvider,
  Container,
  Box,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { fetchTrendingPools } from "./utils/api";
import Header from "./components/Header";
import EnhancedTable from "./components/Table";
import { ProcessedTokenData } from "./types";

export default function Home() {
  const [data, setData] = useState<ProcessedTokenData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await fetchTrendingPools();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ChakraProvider>
      <Box bg="gray.50" minHeight="100vh" py={5}>
        <Container maxW="container.2xl">
          <Header onRefresh={fetchData} data={data} />
          {isLoading ? (
            <Center>
              <Spinner size="xl" />
            </Center>
          ) : (
            <EnhancedTable data={data} />
          )}
        </Container>
      </Box>
    </ChakraProvider>
  );
}
