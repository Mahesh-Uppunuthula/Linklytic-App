import { useState } from "react";
import TextField from "../components/ui/TextField/TextField";
import Field from "../components/ui/Field/Field";
import Brand from "../components/ui/Brand/Brand";
import { useNavigate } from "react-router-dom";
import { PATH_CONSTANTS } from "../routes/pathConstants";
import useAuth from "../hooks/useAuth";
import Button from "@components/ui/Button/Button";
import Link from "@components/ui/Button/Link";

const FIELDS = {
  EMAIL: "email",
  password: "password",
};

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const canSubmit =
    formData.email.trim().length !== 0 && formData.password.trim().length !== 0;

  function loginUser() {
    // axios post request
    login();
    navigate(PATH_CONSTANTS.DASHBOARD);
  }

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;
    loginUser();
  };

  const handleOnChange = (field: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <div className="w-full h-full flex flex-col justify-center place-items-center gap-[5%] ">
      <div className="w-full flex flex-col place-items-center gap-2">
        {/* TODO add brand and layouting in auth layout and outlet should be just the form */}
        <Brand showText={false} size={32} />
        <p className="text-3xl font-medium">Welcome back 👋</p>
        <p className="text-center text-sm text-balance text-gray-600">
          Login into your account.
        </p>
      </div>

      <form
        className="w-1/2 flex flex-col p-1 gap-2 "
        onSubmit={handleFormSubmit}
      >
        <Field isRequired name="Email" />
        <TextField
          className="mb-1"
          id="Email"
          type="email"
          placeholder="Example@abc.xyz"
          value={formData.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(FIELDS.EMAIL, e.target.value)
          }
          errorMessage="Enter a valid email"
        />
        <Field isRequired name="Password" />
        <TextField
          className="mb-1"
          id="Password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(FIELDS.password, e.target.value)
          }
        />
        <div className="flex place-items-center gap-2 mb-7">
          <span className="text-gray-600 text-sm">
            <Link
              to={PATH_CONSTANTS.FORGOT_PASSWORD}
              className="text-primary-regular font-medium"
            >
              Forgot password ?
            </Link>
          </span>
        </div>
        <Button
          disabled={!canSubmit}
          className="w-[90%] flex justify-center place-items-center mx-auto"
          appearance="primary"
          type="submit"
        >
          Login
        </Button>
      </form>

      <div className="text-gray-600 text-sm">
        <span>Don't have an account?</span>
        <span className="text-primary-regular mx-1 font-medium">
          <Link to={PATH_CONSTANTS.SIGNUP}>Sign Up for free !!</Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
