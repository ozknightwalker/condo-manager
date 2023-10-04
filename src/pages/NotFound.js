import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    const goBackToHome = () => {
        navigate("/", { replace: true })
    }

    return (
        <Box textAlign="center" py={10} px={6}>
          <Heading
            display="inline-block"
            as="h2"
            size="2xl"
            bgGradient="linear(to-r, primary.400, primary.600)"
            backgroundClip="text">
            404
          </Heading>
          <Text fontSize="18px" mt={3} mb={2}>
            Page Not Found
          </Text>
          <Text color={'gray.500'} mb={6}>
            The page you&apos;re looking for does not seem to exist
          </Text>
    
          <Button
            colorScheme="primary"
            bgGradient="linear(to-r, brand.400, brand.500, brand.600)"
            color="white"
            variant="solid"
            onClick={goBackToHome}>
            Go to Home
          </Button>
        </Box>
      )
};

export default NotFound;
