import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../utils/AuthProvider";
import { Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";

import { useCurrentUser } from "../store/database";


const Login = props => {

  const [showPassword, setShowPassword] = React.useState(false);

  const { setCurrentUser } = useCurrentUser();

  document.title = "Login | Guwahati SDA Church ";

  const { currentUser } = React.useContext(AuthContext);


  console.log("currentUser", currentUser);

  //const error = useSelector((state) => state.login.error);

  //const loading = useSelector((state) => state.login.loading);

  const loading = false;
  const error = null;

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      console.log("values", values);
      //dispatch(loginUser(values, props.router.navigate));
      setCurrentUser(values);
    },
  });

  if (currentUser) {
    return <Navigate to="/" />;
  }
  return (
    <React.Fragment>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-red-600">
        <div className="container mx-auto ">
          <form className="flex max-w-md flex-col gap-4 bg-[#DDDFE1B7] p-6 rounded-lg shadow-md mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
            }
            }>
            <div className="flex justify-center">
              <p className="text-red-500 text-sm font-medium">
                {error ? (error.substring(error.indexOf("(") + 1, error.indexOf(")"))).replace('auth/', '').replace('-', ' ').toUpperCase() : ""}
              </p>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput id="email" type="email" placeholder="name@gmail.com" required
                onChange={validation.handleChange}
                value={validation.values.email}
                name="email"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput id="password" type={showPassword ? "text" : "password"} required
                onChange={validation.handleChange}
                value={validation.values.password}
                name="password"
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" onClick={() => { setShowPassword(!showPassword) }} defaultChecked={showPassword} />
              <Label htmlFor="remember"  >Show Password</Label>
            </div>
            <Button type="submit" disabled={loading} > {loading ? <Spinner className="mx-auto" /> : 'Login'}</Button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login