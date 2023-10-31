// /* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import {useDispatch} from "react-redux";
import {login_user} from "./UserSlice.ts";
import {useToggle, upperFirst} from "@mantine/hooks";
import {useForm} from "@mantine/form";
import {gql, useMutation} from "@apollo/client";
import {TextInput, PasswordInput, Text, Paper, Group, PaperProps, Button, Stack} from "@mantine/core";
import {useNavigate} from "react-router-dom";
import {Anchor} from "@mantine/core";
import {useEffect, useRef} from "react";
import {useLocation} from "react-router-dom";

interface AuthFormWithType extends PaperProps {
  formtype: string;
}

const loginQuery = gql`
  mutation Login($loginInput: LoginInputType) {
    Login(LoginInput: $loginInput)
  }
`;

const registerMutation = gql`
  mutation CreateUser($userInput: UserInputType) {
    CreateUser(UserInput: $userInput) {
      Email
      UserId
      Username
    }
  }
`;

export default function AuthFormWithType(props: AuthFormWithType) {
  // const nameRef = useRef();
  // const emailRef = useRef();
  // const password = useRef();

  let location = useLocation();
  const formType = props.formtype;
  const navigate = useNavigate();
  let [type, toggle] = useToggle(["login", "register"]);
  const [loginUser, {data: loginData, loading: loginLoading, error: loginError}] = useMutation(loginQuery);
  const [registerUser, {data: registerData, loading: registerLoading, error: registerError}] = useMutation(registerMutation);
  const dispatch = useDispatch();
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    // validate: {
    //   email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
    //   password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    // },
  });
  useEffect(() => {
    if (formType === "register") {
      toggle("register");
    }
  }, [formType, toggle, location]);

  const handleSubmit = async (e: any) => {
    if (formType === "login") {
      const {email, password} = e;
      let input = {
        Email: email || "",
        Password: password || "",
      };

      try {
        console.log("INSIDE TRY");
        const final_data = await loginUser({variables: {loginInput: input}});
        try {
          dispatch(login_user({token: final_data.data["Login"], email: input.Email}));
          // navigate("/home");
          navigate("/app/home");
        } catch (e) {
          console.log(e);
        }
      } catch (e: any) {
        console.log("INSIDE CATCH");
        console.log("ERROR OCCURRED ==>", e);
        for (const subError of e.graphQLErrors) {
          console.log(subError.message);
        }
      }
    } else {
      console.log(e);
      const {email, name, password} = e;
      let input = {
        Email: email || "",
        Password: password || "",
        Username: name || "",
      };

      try {
        const final_data = await registerUser({
          variables: {
            userInput: input,
          },
        });

        console.log(final_data);
        console.log(registerData);
      } catch (err) {
        console.log("Some Error occured while registering the user ==>", err);
      }

      console.log(registerError);

      toggle("login");
      navigate("/login", {replace: true});
      form.reset();
    }
  };

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" fw={500}>
        Welcome to Mantine, {type} with
      </Text>

      <form
        id="AuthForm"
        onSubmit={form.onSubmit(values => {
          handleSubmit(values);
        })}
      >
        <Stack>
          {type === "register" && <TextInput required label="Username" placeholder="Your Username" value={form.values.name} onChange={event => form.setFieldValue("name", event.currentTarget.value)} radius="md" />}

          <TextInput required label="Email" placeholder="hello@mantine.dev" value={form.values.email} onChange={event => form.setFieldValue("email", event.currentTarget.value)} error={form.errors.email && "Invalid email"} radius="md" />

          <PasswordInput required label="Password" placeholder="Your password" value={form.values.password} onChange={event => form.setFieldValue("password", event.currentTarget.value)} error={form.errors.password && "Password should include at least 6 characters"} radius="md" />
        </Stack>

        <Group justify="center" mt="xl">
          <Stack>
            <Text size="sm" c="teal.4" ta="center" fw={800}>
              {(() => {
                if (formType === "register" && !registerError && registerData != null) {
                  return "Registered Successfully";
                } else if (formType === "login" && !Error && loginData != null) {
                  return "Logged In Successfully";
                }
              })()}
            </Text>
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              onClick={() => {
                form.reset();
                toggle();
                navigate(formType === "login" ? "/register" : "/login");
              }}
              size="xs"
            >
              {type === "register" ? "Already have an account? Login" : "Don't have an account? Register"}
            </Anchor>
          </Stack>
        </Group>
      </form>
    </Paper>
  );
}
