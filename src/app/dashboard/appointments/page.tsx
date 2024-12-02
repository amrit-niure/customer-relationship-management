"use client";import PageHeaderWithForm from "@/components/headers/page-header-with-form";
import React from "react";

const page = () => {
  return (
    <div>
      <PageHeaderWithForm
        description="This is description"
        header="Header"
        formType="APPOINTMENT"
        buttonText="New Appointment"
      />{" "}
    </div>
  );
};

export default page;
