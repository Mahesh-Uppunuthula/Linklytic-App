import { VscDebugDisconnect } from "react-icons/vsc";
import Brand from "../../components/ui/Brand/Brand";
import { IoReload } from "react-icons/io5";
import { PATH_CONSTANTS } from "../../routes/pathConstants";
import { BiSupport } from "react-icons/bi";
import Button from "@components/ui/Button/Button";
import Link from "@components/ui/Button/Link";

const Error = () => {
  return (
    <div className="w-dvw h-dvh">
      <div className="w-full h-full max-h-[5%] flex justify-center place-items-center">
        <Brand />
      </div>
      <div className="w-full h-full max-h-[95%] flex justify-center place-items-center">
        <div className="flex flex-col place-items-center gap-3">
          {/* ooops ! */}
          <div className="w-full h-full text-center flex justify-center place-items-center gap-2">
            <VscDebugDisconnect className="p-1 rounded text-5xl bg-warning-regular" />
            <span className="font-bold text-6xl ">Oooops!</span>
          </div>

          {/* message and take me home */}
          <div className="flex flex-col place-items-center gap-1">
            {/* <div>We're sorry, something went wrong :(</div> */}
            <p>Brace yourself till we get the error fixed.</p>
            <p>You may also refresh the page or try again later</p>
          </div>
          <div className="flex justify-center place-items-center my-4 gap-10">
            <Button
              appearance="primary"
              bolded
              iconBefore={<IoReload strokeWidth={1} size={21} />}
              onClick={() => window.location.reload()}
            >
              Reload the page
            </Button>
            <Button
              appearance="primary"
              variant="text"
              bolded
              iconBefore={<BiSupport size={21} />}
            >
              <Link to={PATH_CONSTANTS.HELP_CENTER}>visit our help center</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
