import { Metadata } from "next";
import PageHeader from "../_components/PageHeader";
import SelectCountry from "../_components/SelectCountry";
import UpdateProfileForm from "../_components/UpdateProfileForm";
import { auth } from "../_lib/auth";
import { getGuest } from "../_lib/data-service";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Profile",
};

type pageProps = {
  // guest: Guest;
};

async function page(_props: pageProps) {
  const session = await auth();

  const guest = await getGuest(session!.user!.email!);

  return (
    <div>
      <PageHeader>Update your profile</PageHeader>

      <UpdateProfileForm guest={guest}>
        <SelectCountry
          name="nationality"
          id="nationality"
          defaultCountry={guest.nationality}
          className="form-field-value"
        />
      </UpdateProfileForm>
    </div>
  );
}

export default page;
