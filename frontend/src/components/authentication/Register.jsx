import { Fieldset, Input, Text } from "@chakra-ui/react";
import { Button } from "../ui/button";
import { Field } from "../ui/field";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios, { AxiosError } from "axios";
// import dotenv from "dotenv";
// dotenv.config({ path: ".env" });

const Register = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    // const [password, setPassword] = useState("");
    const {
        register,
        handleSubmit,
        reset,
        getValues,
        setError,
        formState: { errors },
    } = useForm();

    const handleFileChange = (event) => {
        // const filePath = event.target.value;
        // setFile(filePath);

        // if (filePath && filePath[0]) {
        //     setValue("file", filePath);
        //     setValue("file", filePath);
        // }
        const file = event.target.files[0];
        if (file) {
            setFile(file);
            // setSelectedFile(file);
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
                console.log(imageForm, image_upload_url);
                console.log(cloudName, uploadPreset);

                const imageResponse = await axios.post(image_upload_url, imageForm);
                const imageUrl = imageResponse.data.url;
                console.log(imageUrl);
                data.pic = imageUrl;
            }

            console.log("Form data:");
            console.table(data);
            const response = await axios.post("http://localhost:3000/api/user", data);
            console.log(response.data);

            alert(response.data.message);
        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error.response.data);
                alert(error.response.data.message);
            }
            alert(error.message ?? "An error occured");
        } finally {
            setLoading(false);
            setFile(null);
            reset();
        }
        // setFile(null);
        // reset();
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
                            // value={email}
                            fontSize={"md"}
                            color={"black"}
                            backgroundColor={"white"}
                            placeholder="Enter your name"
                            autoComplete="off"
                            // onChange={(e) => setEmail(e.target.value)}
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
                            // value={password}
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
                        {/* <FileUploadRoot maxFiles={1} accept={["image/png", "image/jpg", "image/jpeg"]} onChange={handleFileChange}>
                            <FileUploadTrigger asChild>
                                <Button variant="outline" w={"100%"} size="sm" color={"white"}>
                                    <HiUpload /> Click to upload image
                                </Button>
                            </FileUploadTrigger>
                            {file && <FileUploadList showSize clearable />}
                        </FileUploadRoot> */}
                        {/* <Input
                            {...register("file", {
                                required: "This field is required",
                            })}
                            type="file"
                            // value={password}
                            fontSize={"md"}
                            color={"black"}
                            backgroundColor={"white"}
                            placeholder="Confirm your password"
                            // onChange={(e) => setPassword(e.target.value)}
                        /> */}
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
