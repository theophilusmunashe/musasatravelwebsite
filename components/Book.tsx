"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { sendEmail } from "../actions/sendEmail";
import toast from "react-hot-toast";

const Book = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className=" bg-neutral-900/90 p-4 md:p-8 space-y-4 flex flex-col justify-center ">
      <h4 className="pt-12 text-lg sm:text-xl md:text-2xl font-medium">
        Book our complimentary free consultation
      </h4>
      <form
        className="mt-10 flex flex-col dark:text-black"
        action={async (formData) => {
          const { data, error } = await sendEmail(formData);
          if (error) {
            toast.error(error);
            return;
          }
          toast.success("Email sent successfully!");
          window.location.reload();
        }}
      >
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="">First Name:</label>
              <Input name="firstName" required maxLength={500} />
            </div>
            <div>
              <label htmlFor="">Last Name:</label>
              <Input name="lastName" required maxLength={500} />
            </div>
          </div>

          <div>
            <label htmlFor="">Email:</label>
            <Input name="senderEmail" type="email" required maxLength={500} />
          </div>
          <div>
            <label htmlFor="">Phone Number:</label>
            <Input name="phoneNumber" type="tel" required maxLength={500} />
          </div>
          <div>
            <label htmlFor="">Message</label>
            <textarea
              className="h-16 w-full input border bg-[#fff]"
              name="message"
              required
              maxLength={5000}
            />
          </div>
        </div>
        <div className="">
          <Button
            disabled={isLoading}
            className=" text-[#24246B] rounded-3xl mt-4"
            type="submit"
            variant={"outline"}
          >
            Contact Us
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Book;
