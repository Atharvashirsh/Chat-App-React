import { Button, Fieldset, Input, Text } from "@chakra-ui/react";
import { Field } from "../ui/field";
import { FileUploadList, FileUploadRoot, FileUploadTrigger } from "../ui/file-upload";
import { useForm } from "react-hook-form";
import { HiUpload } from "react-icons/hi";
import { useState } from "react";

const Register = () => {
    const [file, setFile] = useState(null);
    // const [password, setPassword] = useState("");
    const {
        register,
        handleSubmit,
        reset,
        getValues,
        setValue,
        formState: { errors },
    } = useForm();

    const handleFileChange = (event) => {
        const filePath = event.target.value;
        setFile(filePath);

        if (filePath && filePath[0]) {
            setValue("file", filePath);
        }
    };

    const formSubmit = (data) => {
        data.file = getValues("file");
        console.table(data);

        setFile(null);
        reset();
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
                        <Text color="red.500" fontSize="sm" fontWeight={"bold"}>
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
                            // onChange={(e) => setPassword(e.target.value)}
                        />
                    </Field>
                    {errors.confirmPassword && (
                        <Text color="red.500" fontSize="sm" fontWeight={"bold"}>
                            {errors.confirmPassword.message}
                        </Text>
                    )}

                    <Field label="Upload Picture" color="white">
                        <FileUploadRoot maxFiles={1} accept={["image/png", "image/jpg", "image/jpeg"]} onChange={handleFileChange}>
                            <FileUploadTrigger asChild>
                                <Button variant="outline" w={"100%"} size="sm" color={"white"}>
                                    <HiUpload /> Click to upload image
                                </Button>
                            </FileUploadTrigger>
                            {file && <FileUploadList showSize clearable />}
                        </FileUploadRoot>
                    </Field>
                </Fieldset.Content>

                <Button type="submit" size={"lg"} width={"40%"} borderRadius={"2xl"} alignSelf="center">
                    Register New User
                </Button>
            </Fieldset.Root>
        </form>
    );
};

export default Register;
