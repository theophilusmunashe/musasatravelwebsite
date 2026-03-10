import React from "react";
import Hero from "../services/components/Hero";
import Stats from "../about/components/Stats";

import type { Metadata } from "next";
import FormComponent from "../../../components/FormComponent";
import Header from "../projects/components/Header";

export const metadata: Metadata = {
  title: "Contact Us - Capture",
  description:
    "Feel free to reach out! Whether you have a project idea, a question, or just want to connect. Drop me a message using the form below or shoot an email to info@ycaptureprojects.com.au I look forward to hearing from you and exploring potential collaborations.",
};

function Page() {
  return (
    <div className="pt-16">
      <FormComponent />
      {/* <Hero /> */}
      <Stats />
    </div>
  );
}

export default Page;
