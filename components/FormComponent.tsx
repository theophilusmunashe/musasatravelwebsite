"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { sendEmail } from "../actions/sendEmail";
import toast from "react-hot-toast";
import Reveal from "./Reveal";

import "../app/globals.scss";

const WA_NUMBER = "263776093268";

const FormComponent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const firstName = formData.get("firstName") as string;
    const senderEmail = formData.get("senderEmail") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const message = formData.get("message") as string;

    const { error } = await sendEmail(formData);
    if (error) {
      toast.error(error);
      setIsLoading(false);
      return;
    }

    toast.success("Message sent successfully!");

    const waMessage = [
      "🌍 *New Enquiry – Musasa Travel & Tours*",
      "━━━━━━━━━━━━━━━━━━━━━━",
      `👤 *Name:* ${firstName}`,
      `📧 *Email:* ${senderEmail}`,
      `📱 *Phone:* ${phoneNumber}`,
      "",
      `💬 *Message:*\n${message}`,
    ].join("\n");

    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`,
      "_blank"
    );

    form.reset();
    setIsLoading(false);
  };

  return (
    <Reveal width="100%">
      <div className="h-full contact-hero">
        <div className=" bg-neutral-900/70 text-white h-screen w-full py-20">
          <div className="max-w-6xl mx-auto h-full w-full flex flex-col justify-center p-2 md:p-4 ">
            <div className="max-w-3xl mx-auto text-center">
              <span className="subtitle">GET IN TOUCH</span>
              <h2 className="content-title heading-md mb-4">
                Contact our support team to explore new packages
              </h2>
            </div>
            <form
              className="flex flex-col text-white"
              onSubmit={handleSubmit}
            >
              <div className="row gutter-y-default">
                <div className="grid grid-cols-1  md:grid-cols-2   gap-4">
                  <div className="col-lg-12">
                    <label htmlFor="">Name:</label>
                    <Input
                      name="firstName"
                      className="form-control  text-white"
                      required
                      maxLength={500}
                    />
                  </div>
                  <div className="col-lg-12">
                    <label htmlFor="">Email:</label>
                    <Input
                      name="senderEmail"
                      type="email"
                      className="form-control  text-white"
                      required
                      maxLength={500}
                    />
                  </div>
                  <div className="col-lg-12">
                    <label htmlFor="">Phone Number:</label>
                    <Input
                      name="phoneNumber"
                      type="tel"
                      required
                      maxLength={500}
                      className="form-control  text-white"
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <label htmlFor="">Message</label>
                  <textarea
                    className="form-control border-white text-white"
                    name="message"
                    required
                    maxLength={5000}
                  />
                </div>
              </div>
              <br />
              <div className="max-w-xl mx-auto">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-white btn btn-white hvr-white-primary disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </button>
              </div>{" "}
              <br />
              <br />
            </form>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export default FormComponent;
