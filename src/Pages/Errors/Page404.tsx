import { FiMinus } from "react-icons/fi";
import Brand from "../../components/ui/Brand/Brand";
import Link from "../../components/Button/Link";
import Button from "../../components/Button/Button";
import { GoArrowLeft } from "react-icons/go";

function Page404() {
  return (
    <div className="w-full h-fit flex flex-col place-items-center justify-between gap-10">
      {/* brand */}
      {/* <div> */}
      <Brand size={21} />
      {/* </div> */}

      <div className="w-full h-fit mt-5  flex flex-col place-items-center gap-1">
        {/* 404 heading */}
        <div>
          <div className="w-full h-full  text-9xl flex place-items-center gap-5 font-medium text-primary-regular ">
            <span>4</span>
            <div className="flex flex-col place-items-center">
              <div>
                <FiMinus className="text-5xl" />
              </div>
              <div className="motion-safe:animate-bounce flex justify-center place-items-center text-5xl">
                <div>🤐</div>
              </div>
              <div>
                <FiMinus className="text-5xl" />
              </div>
            </div>
            <span>4</span>
          </div>
        </div>
        {/* 404 message */}
        <div className="w-1/2 font-medium text-lg text-center text-balance text-gray-400 my-5">
          Looks like the page you're are trying to access that either has been
          deleted or never existed...
        </div>
        {/* take me home */}
        <Link to={"/"}>
          <Button appearance="warning" iconBefore={<GoArrowLeft />}>Go home</Button>
        </Link>
      </div>
    </div>
  );
}

export default Page404;
