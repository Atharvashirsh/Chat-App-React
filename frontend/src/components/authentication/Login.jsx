import { Input, Button, Fieldset, Text } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";

const Login = () => {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const formSubmit = async (data) => {
        console.log("Form data:");
        console.table(data);
        try {
            const response = await axios.post("http://localhost:3000/api/user/login", data);
            console.log(response.data);
            alert(response.data.message);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response.data);
                alert(error.response.data.message);
            }
        } finally {
            reset();
        }
    };

    return (
        <form onSubmit={handleSubmit(formSubmit)}>
            <Fieldset.Root size="lg" maxW="100%">
                <Fieldset.Content>
                    <Field label="Email address" color="white">
                        <Input
                            {...register("email", {
                                required: "Email is required",
                            })}
                            type="email"
                            // value={email}
                            fontSize={"md"}
                            color={"black"}
                            backgroundColor={"white"}
                            placeholder="Enter your email"
                            autoComplete="off"
                            // onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                            <Text color="red.500" fontSize="sm" fontWeight={"bold"}>
                                {errors.email.message}
                            </Text>
                        )}
                    </Field>

                    <Field label="Password" color="white">
                        <Input
                            {...register("password", {
                                required: "Password is required",
                            })}
                            type="password"
                            // value={password}
                            fontSize={"md"}
                            color={"black"}
                            backgroundColor={"white"}
                            placeholder="Enter your password"
                            // onChange={(e) => setPassword(e.target.value)}
                        />
                    </Field>
                    {errors.password && (
                        <Text color="red.500" fontSize="sm" fontWeight={"bold"}>
                            {errors.password.message}
                        </Text>
                    )}
                </Fieldset.Content>

                <Button type="submit" size={"lg"} width={"30%"} borderRadius={"2xl"} alignSelf="center">
                    Login
                </Button>
            </Fieldset.Root>
        </form>
    );
};

export default Login;
