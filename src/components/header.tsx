import { BsGrid3X3GapFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoIosNotificationsOutline } from "react-icons/io";

const HeaderComp = () => {
  return (
    <div className="flex flex-row items-center justify-between py-4 px-4">
      <div className="flex gap-2 items-center justify-center">
        <BsGrid3X3GapFill className="mt-1 cursor-pointer" size={18} />
        <p className="font-bold text-2xl mr-5 pt-0.5 text-purple-800">BPMS</p>
      </div>

      <div className="flex flex-row items-center ">
        <IoIosNotificationsOutline className="cursor-pointer ml-5" size={22} />
        <CgProfile className="ml-5 cursor-pointer" size={22} />
      </div>
    </div>
  );
};

export default HeaderComp;
