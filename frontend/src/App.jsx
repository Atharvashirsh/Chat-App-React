import "./App.css";
import { Button, Center, Heading } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ChatApp from "./pages/ChatApp";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/chats",
        element: <ChatApp />,
    },
]);

function App() {
    return (
        <div>
            <Heading size="4xl">I&apos;m a Heading</Heading>
            <Button>Hello</Button>
            <Center bg="blue.focusRing" h="100px" color="white">
                <RouterProvider router={router} />
            </Center>
        </div>
    );
}

export default App;
