import { ChangeEvent, useState } from "react";
import Button from "../Components/Button/Button";
import TextField from "../Components/TextField/TextField";
import Field from "../Components/Field/Field";
import Brand from "../Components/Brand/Brand";
import { PASSWORD_REGEX } from "../constants";
import Link from "../Components/Button/Link";
import { useNavigate } from "react-router-dom";

const FIELDS = {
  NAME: "name",
  EMAIL: "email",
  password: "password",
  confirmPassword: "confirmPassword",
  AGREED_TO_TERMS_CONDITIONS: "agreedToTermAndConditions",
};

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreedToTermAndConditions: false,
  });

  const isPasswordMatching =
    formData.password.length !== 0 &&
    formData.confirmPassword.length !== 0 &&
    formData.password === formData.confirmPassword;

  const canSubmit =
    formData.name.trim().length !== 0 &&
    formData.email.trim().length !== 0 &&
    formData.password.trim().length !== 0 &&
    formData.confirmPassword.trim().length !== 0 &&
    formData.agreedToTermAndConditions &&
    isPasswordMatching;

  function signupUser() {
    // axios post request
    navigate("/welcome-page");
  }

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSubmit) return;
    signupUser();
  };

  const handleOnChange = (field: string, value: String | boolean) => {
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
        <p className="text-3xl font-medium">Sign up</p>
        <p className="text-center text-sm text-balance text-gray-600">
          Enter your details below to create your account and get started
        </p>
      </div>

      <form
        className="w-1/2 flex flex-col p-1 gap-2 "
        onSubmit={handleFormSubmit}
      >
        <Field isRequired name="Name" />
        <TextField
          className="mb-1"
          id="Name"
          type="text"
          placeholder="John Doe"
          value={formData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(FIELDS.NAME, e.target.value)
          }
        />
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
          pattern={PASSWORD_REGEX}
          errorMessage="Password must be minimum of 8 characters with atleast one capital, one small & one special character"
          // messageAppearance="danger"
        />
        <Field isRequired name="Confirm password" />
        <TextField
          className="mb-1"
          id="Confirm-Password"
          type="password"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(FIELDS.confirmPassword, e.target.value)
          }
          isInvalid={!isPasswordMatching && !!formData.confirmPassword}
          // helperMessage={
          //   isPasswordMatching
          //     ? "Passwords match"
          //     : !!formData.confirmPassword.length && !!formData.password.length
          //     ? "Please make sure your passwords match"
          //     : ""
          // }
          errorMessage="Please make sure your passwords match"
          // messageAppearance={isPasswordMatching ? "success" : "default"}
        />
        <div className="flex place-items-center gap-2 mb-7">
          <input
            type="checkbox"
            name=""
            id=""
            checked={formData.agreedToTermAndConditions}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              console.log(event.target.checked, event.target.value);

              handleOnChange(
                FIELDS.AGREED_TO_TERMS_CONDITIONS,
                event.target.checked
              );
            }}
          />
          <span className="text-gray-600 text-sm">
            I agree to all{" "}
            <Link
              to={"/terms-conditions"}
              className="text-primary-regular font-medium"
            >
              terms & conditions
            </Link>
          </span>
        </div>
        <Button
          disabled={!canSubmit}
          className="w-[90%] flex justify-center place-items-center mx-auto"
          appearance="primary"
          type="submit"
        >
          Sign up
        </Button>
      </form>

      <div className="text-gray-600 text-sm">
        <span>Already have an account?</span>
        <span className="text-primary-regular mx-1 font-medium">
          <Link to={"/login"}>Login here</Link>
        </span>
      </div>
    </div>
  );
}

export default Signup;
