import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { BRAND_NAME } from "../../constants";
import Button from "../Button/Button";
import TextField from "../ui/TextField/TextField";
import React, { useState } from "react";
import { FiLink } from "react-icons/fi";

function HeroSection() {
  const [url, setUrl] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);

  function shortenURL() {
    console.log("shorten url");
    alert("submitted");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("handle submit");
    console.log({ url }, url.trim().length == 0);
    const _isInvalid = url.trim().length === 0;
    setIsInvalid(_isInvalid);
    if (_isInvalid) {
      return;
    }
    shortenURL();
  }
  return (
    <div className="w-full h-dvh p-1 flex flex-col gap-3 place-items-center">
      <h1 className="mt-5 text-primary-dark text-5xl font-semibold">
        Make every connection count
      </h1>
      <h3 className="w-[50%] text-pretty text-center text-gray-500 text-lg ">
        Create Short links, QR Codes, share them anywhere. Track what's working
        and what's not. All inside{" "}
        <span className="font-medium text-gray-600">{BRAND_NAME}</span> platform
      </h3>
      <form
        onSubmit={handleSubmit}
        className="w-[70%] h-10 flex justify-center place-items-center gap-5 my-10"
      >
        <div className="w-[80%] h-full">
          <TextField
            key="URL"
            iconBefore={<FiLink className="text-gray-400 text-lg" />}
            type="text"
            placeholder="ex: https://super-long-url.com/shorten-it"
            value={url}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const _value = event.target.value;
              setIsInvalid(_value.trim().length === 0);
              setUrl(_value);
            }}
            isInvalid={isInvalid}
            errorMessage={
              url.trim().length === 0
                ? "This field cannot be empty"
                : "invalid url"
            }
            messageAppearance="default"
            onInvalid={() => {
              console.log("on invalid");
            }}
          />
        </div>
        <Button
          type="submit"
          className="h-full"
          appearance="primary"
          iconAfter={<LiaLongArrowAltRightSolid strokeWidth={1} />}
        >
          Shorten URL
        </Button>
      </form>
    </div>
  );
}

export default HeroSection;
