import { signInAction } from "@/app/_lib/actions";
import Image from "next/image";

type SignInButtonProps = {
  //children: React.ReactNode;
};

function SignInButton(_props: SignInButtonProps) {
  return (
    <form action={signInAction} className="flex items-center justify-center">
      <button className="text-xs md:text-lg cursor-pointer flex items-center border border-on-primary-container px-5 py-2 font-medium rounded-xl duration-300 hover:bg-primary hover:text-on-primary ">
        <Image
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span className="hidden sm:inline px-2 duration-300">
          Continue with Google
        </span>
      </button>
    </form>
  );
}

export default SignInButton;
