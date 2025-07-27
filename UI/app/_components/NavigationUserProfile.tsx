import Image from "next/image";
import { UserProfileInfo } from "../_lib/types";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

type NavigationUserProfileProps = {
  userProfile: UserProfileInfo | null;
};

function NavigationUserProfile({ userProfile }: NavigationUserProfileProps) {
  return (
    <div className="relative group">
      <div className="hidden sm:flex items-center justify-center space-x-2 cursor-pointer">
        <div className="relative size-8 rounded-full outline-2 outline-on-primary-container/50 outline-offset-2">
          <Image
            src={userProfile!.imageUrl!}
            alt={userProfile!.username!}
            fill
            sizes="100%"
            className="object-cover rounded-full aspect-square"
          ></Image>
        </div>
        <span>{userProfile!.username}</span>
        <div className="size-6 relative">
          <FaChevronDown className="absolute top-1 left-0 opacity-100 group-hover:opacity-0 duration-300 ease-linear" />
          <FaChevronUp className="absolute top-1 left-0 opacity-0 group-hover:opacity-100 duration-300 ease-linear" />
        </div>
      </div>
      <div className="sm:absolute sm:top-8 sm:left-0 sm:hidden sm:group-hover:block w-full duration-300">
        <ul className="w-full sm:shadow-xl rounded-b-xl sm:mt-2 sm:py-2 bg-primary-container">
          <li className="">
            <a href="/profile" className="px-2 py-2 block text-center">
              Profile
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavigationUserProfile;
