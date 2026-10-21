import Link from "next/link";
import Recent_Templates from "./home-components/recent_templates";

const RightSplitScreenHome = () => {
  return (
    /* Changed to min-h-full to force layout expansion and cleaned up overlapping styles */
    <div className="bg-white overflow-x-auto flex flex-col pt-20 w-full min-h-full rounded-2xl p-16">
      <div>
        <p className="font-medium text-lg pb-6 text-black">Recent Templates</p>
        <Recent_Templates />
      </div>

      <div className="py-20">
        <p className="font-medium text-lg pb-6 text-black">
          Create a New Template
        </p>
        <Link href={`/newtask`}>
          <div className="h-26 w-60 rounded-lg bg-white outline outline-gray-300 items-center gap-2 py-3 ml-5 px-2 shadow-md hover:shadow-blue-300 cursor-pointer">
            <p className="flex h-full text-3xl font-bold justify-center items-center">
              +
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RightSplitScreenHome;
