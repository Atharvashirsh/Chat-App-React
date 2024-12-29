import { Input, Fieldset, Text } from "@chakra-ui/react";
import { Button } from "../ui/button";
import { Field } from "../ui/field";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    const handleGuestCredentials = () => {
        setValue("email", "guest@chatapp.com");
        setValue("password", "Password@123");
    };

    const formSubmit = async (data) => {
        setLoading(true);
        console.table(data);
        try {
            const response = await axios.post("http://localhost:3000/api/user/login", data);
            localStorage.setItem("user-info", response.data.data.token);
            alert(response.data.message);

            navigate("home");
        } catch (error) {
            if (error instanceof AxiosError) {
                alert(error.response.data.message);
            }
        } finally {
            setLoading(false);
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
                            fontSize={"md"}
                            color={"black"}
                            backgroundColor={"white"}
                            placeholder="Enter your email"
                            autoComplete="off"
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
                            type="text"
                            fontSize={"md"}
                            color={"black"}
                            backgroundColor={"white"}
                            placeholder="Enter your password"
                        />
                    </Field>
                    {errors.password && (
                        <Text color="red.500" fontSize="sm" fontWeight={"bold"}>
                            {errors.password.message}
                        </Text>
                    )}
                </Fieldset.Content>

                <Button type="submit" loading={loading} loadingText="Logging in..." size={"lg"} fontSize={"lg"} width={"100%"} borderRadius={"2xl"} alignSelf="center">
                    Login
                </Button>

                <Button type="button" variant="outline" size={"sm"} marginTop={"10px"} width={"100%"} borderRadius={"2xl"} alignSelf="center" color="white" onClick={handleGuestCredentials}>
                    Login using Guest Credentials
                </Button>
            </Fieldset.Root>
        </form>
    );
};

export default Login;
