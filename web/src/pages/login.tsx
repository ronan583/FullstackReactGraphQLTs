import React from "react";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "../gql/generated";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const route = useRouter();
  const [, login] = useLoginMutation();
  return (
    <Wrapper variant="small">
      <Formik
        // initialValues={{ username: "", password: "" }}
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, {setErrors}) => {
          const response = await login({options: values});
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else {
            console.log(route);
            route.push("/");
            console.log(route);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </Box>
            <Box mt={4}>
              <Button type="submit" colorScheme="teal" isLoading={isSubmitting}>
                Register
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;