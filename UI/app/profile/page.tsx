import { auth } from "../_lib/auth";
import { getGuest, Guest } from "../_lib/data-service";
import Form from "next/form";

type pageProps = {
  // guest: Guest;
};

async function page(_props: pageProps) {
  const session = await auth();

  const guest = await getGuest(session!.user!.email!);

  const { fullName, email } = guest;

  return (
    <div>
      <h2 className="font-semibold text-3xl">Update your profile</h2>

      <Form action="" className="form space-y-2 py-3">
        <div className="form-field">
          <label htmlFor="fullName" className="form-field-label">
            Full name
          </label>
          <input
            disabled
            type="text"
            name="fullName"
            defaultValue={fullName}
            className="form-field-value"
          />
        </div>

        <div className="form-field">
          <label htmlFor="email" className="form-field-label">
            Email address
          </label>
          <input
            disabled
            type="text"
            name="email"
            defaultValue={email}
            className="form-field-value"
          />
        </div>

        <div className="form-field">
          <label htmlFor="whereYouFrom" className="form-field-label">
            Where are you from?
          </label>
          <input
            name="whereYouFrom"
            defaultValue={email}
            className="form-field-value"
          />
        </div>

        <div className="w-full flex items-center mt-3">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3 w-full">
            <button
              type="submit"
              className="bg-primary-container text-on-primary-container px-2 py-1 rounded-lg font-bold tracking-wider text-xl w-full md:w-auto"
            >
              Submit
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default page;
