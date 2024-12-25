import { Box, Container, Text, Tabs } from "@chakra-ui/react";
import Login from "../components/authentication/Login";
import Register from "../components/authentication/Register";

const AuthPage = () => {
    return (
        <Container maxW="2xl" centerContent>
            <Box display="flex" justifyContent="center" p="3" bg="#2C3E50" w="100%" m="40px 0 15px 0" borderRadius="lg">
                <Text fontSize={"4xl"} fontFamily={"Work Sans"} color={"white"}>
                    Chatify
                </Text>
            </Box>

            <Box p="4" w="100%" bg={"#2C3E50"} m="15px 0 15px 0" borderRadius="lg">
                <Tabs.Root defaultValue="login" justify={"center"} fitted variant="plain" colorPalette={"purple"} size={"lg"}>
                    <Tabs.List bg="" rounded="1" p="2">
                        <Tabs.Trigger value="login" color={"black"}>
                            Login
                        </Tabs.Trigger>
                        <Tabs.Trigger value="register" color={"black"}>
                            Register
                        </Tabs.Trigger>
                        <Tabs.Indicator rounded="4xl" />
                    </Tabs.List>
                    <Tabs.Content value="login">
                        <Login />
                    </Tabs.Content>

                    <Tabs.Content value="register">
                        <Register />
                    </Tabs.Content>
                </Tabs.Root>
            </Box>
        </Container>
    );
};

export default AuthPage;
