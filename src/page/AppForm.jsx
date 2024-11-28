import { useEffect, useState } from "react";
import Sidebar from "../common/sidebar";
import AppointmentForm from "../pageComponents/Appointments/form";
import { getAppointmentById } from "../../api";
import { useParams } from "react-router-dom";

export default function AppForm() {

    return (
        <div className="flex h-screen">
            <div className="w-1/4 ">
                <Sidebar />
            </div>
            <div className="mt-10 w-2/4 mx-auto">
                <h1 className="text-center text-2xl">Appointment Form</h1>
                < AppointmentForm />
            </div>
        </div>
    );
}
