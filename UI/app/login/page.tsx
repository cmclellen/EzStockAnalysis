import SignInButton from "../_components/SignInButton";

type pageProps = {
  //children: React.ReactNode;
};

function page(_props: pageProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-30 backdrop-blur-xs">
      <div className="bg-primary-container text-on-primary-container shadow-lg rounded-xl p-5 space-y-3">
        <h2 className="text-xs sm:text-sm font-semibold text-center duration-300">
          Sign in to access your stocks
        </h2>
        <SignInButton />
      </div>
    </div>
  );
}

export default page;
