import Form from "next/form";
import PageHeader from "../_components/PageHeader";
import SelectCountry from "../_components/SelectCountry";
import { auth } from "../_lib/auth";
import { getGuest } from "../_lib/data-service";
import { updateGuest } from "../_lib/actions";
import Image from "next/image";

type pageProps = {
  // guest: Guest;
};

async function page(_props: pageProps) {
  const session = await auth();

  const guest = await getGuest(session!.user!.email!);

  console.log("guest", guest);

  const { fullName, email, nationality, countryFlag } = guest;

  return (
    <div>
      <PageHeader>Update your profile</PageHeader>

      <Form action={updateGuest} className="form space-y-2 py-3">
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
          <label htmlFor="nationality" className="form-field-label">
            Where are you from?
          </label>
          <SelectCountry
            name="nationality"
            id="nationality"
            defaultCountry={nationality}
            className="form-field-value"
          />
          <div className="hidden md:block w-1/12 h-6">
            <div className="h-full relative drop-shadow-lg">
              <Image
                src={countryFlag}
                alt="Country flag"
                fill
                className="object-contain object-left px-2"
              />
            </div>
          </div>
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
