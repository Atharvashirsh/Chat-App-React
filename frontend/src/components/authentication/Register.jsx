import { Fieldset, Input, Text } from "@chakra-ui/react";
import { Button } from "../ui/button";
import { Field } from "../ui/field";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios, { AxiosError } from "axios";

const Register = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        getValues,
        setError,
        formState: { errors },
    } = useForm();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
        }
    };

    const formSubmit = async (data) => {
        setLoading(true);
        try {
            if (file) {
                const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
                const uploadPreset = import.meta.env.VITE_CLOUDINARY_PRESET;

                const image_upload_url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
                const imageForm = new FormData();
                imageForm.append("file", file);
                imageForm.append("upload_preset", uploadPreset);
                imageForm.append("cloud_name", cloudName);

                const imageResponse = await axios.post(image_upload_url, imageForm);
                const imageUrl = imageResponse.data.url;

                data.pic = imageUrl;
            }

            const response = await axios.post("http://localhost:3000/api/user", data);

            alert(response.data.message);
        } catch (error) {
            if (error instanceof AxiosError) {
                alert(error.response.data.message);
            }
            alert(error.message ?? "An error occured");
        } finally {
            setLoading(false);
            setFile(null);
            reset();
        }
    };

    const handlePasswordChange = (event) => {
        const confirmPassword = event.target.value;
        const password = getValues("password");

        if (confirmPassword !== password) {
            setError("password", {
                type: "manual",
                message: "Passwords do not match",
            });
        } else {
            setError("password", null);
        }
    };

    return (
        <form onSubmit={handleSubmit(formSubmit)}>
            <Fieldset.Root size="lg" maxW="100%">
                <Fieldset.Content>
                    <Field label="Name" color="white">
                        <Input
                            {...register("name", {
                                required: "Name is required",
                            })}
                            type="text"
                            fontSize={"md"}
                            color={"black"}
                            backgroundColor={"white"}
                            placeholder="Enter your name"
                            autoComplete="off"
                        />
                        {errors.name && (
                            <Text color="red.500" fontSize="sm" fontWeight={"bold"}>
                                {errors.name.message}
                            </Text>
                        )}
                    </Field>
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
                            type="password"
                            fontSize={"md"}
                            color={"black"}
                            backgroundColor={"white"}
                            placeholder="Enter your password"
                        />
                    </Field>
                    {errors.password && (
                        <Text color="red" fontSize="sm" fontWeight={"bold"}>
                            {errors.password.message}
                        </Text>
                    )}
                    <Field label="Confirm Password" color="white">
                        <Input
                            {...register("confirmPassword", {
                                required: "This field is required",
                            })}
                            type="password"
                            fontSize={"md"}
                            color={"black"}
                            backgroundColor={"white"}
                            placeholder="Confirm your password"
                            onChange={handlePasswordChange}
                        />
                    </Field>
                    {errors.password && (
                        <Text color="red" fontSize="sm" fontWeight={"bold"}>
                            {errors.password.message}
                        </Text>
                    )}

                    <Field label="Upload Picture" color="white">
                        <Input
                            padding={"1.5"}
                            paddingLeft={"2"}
                            onChange={handleFileChange}
                            type="file"
                            accept="image/*"
                            css={{
                                "::fileSelectorButton": {
                                    height: "10px",
                                    padding: "0",
                                    margin: "100px 16px",
                                    background: "none",
                                    border: "none",
                                    fontWeight: "bold",
                                },
                                cursor: "pointer",
                            }}
                        />
                    </Field>
                </Fieldset.Content>

                <Button type="submit" loading={loading} loadingText="Saving..." size={"lg"} width={"40%"} borderRadius={"2xl"} alignSelf="center">
                    Register New User
                </Button>
            </Fieldset.Root>
        </form>
    );
};

export default Register;
