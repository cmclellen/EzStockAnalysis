"use client";

import Form from "next/form";
import Image from "next/image";
import { ReactNode } from "react";
import { updateGuest } from "../_lib/actions";
import { Guest } from "../_lib/data-service";
import SubmitButton from "./SubmitButton";
import toast from "react-hot-toast";

type UpdateProfileFormProps = {
  guest: Guest;
  children: ReactNode;
};

function UpdateProfileForm({ guest, children }: UpdateProfileFormProps) {
  const { fullName, email, countryFlag } = guest;

  async function handleUpdateGuest(formData: FormData) {
    await updateGuest(formData);
    toast("Profile updated successfully");
  }

  return (
    <Form action={handleUpdateGuest} className="form space-y-2 py-3">
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
        {children}
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
          <SubmitButton pendingLabel="Updating...">Submit</SubmitButton>
        </div>
      </div>
    </Form>
  );
}

export default UpdateProfileForm;
