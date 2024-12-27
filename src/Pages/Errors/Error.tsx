import { VscDebugDisconnect } from "react-icons/vsc";
import Brand from "../../Components/Brand/Brand";
import Button from "../../Components/Button/Button";
import { IoReload } from "react-icons/io5";

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
            {/* <div>asdfa</div> */}
          </div>

          {/* message and take me home */}
          <div className="flex flex-col place-items-center gap-10">
            <div>We're sorry, something went wrong :(</div>
            <div className="flex justify-center place-items-center gap-7">
              <Button
                appearance="primary"
                bolded
                iconBefore={<IoReload strokeWidth={1} size={15} />}
                onClick={() => window.location.reload()}
              >
                Reload the page
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
