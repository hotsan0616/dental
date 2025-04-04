import { AiOutlineSchedule } from "react-icons/ai";
import React from "react";
import RootLayout from "@/layouts/RootLayout";
import MultistepForm from "@/components/multistepform/MultistepForm";

import styles from "./GetAppointment.module.css";
const GetAppointment: React.FC = () => {
  return (
    <RootLayout>
      <section>
        <div className={`${styles.appointmentContainer} container`}>
          <AiOutlineSchedule />
          <h2>Online Randevu</h2>
          <MultistepForm />
        </div>
      </section>
    </RootLayout>
  );
};

export default GetAppointment;
