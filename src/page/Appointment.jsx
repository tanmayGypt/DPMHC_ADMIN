import { Link } from "react-router-dom";
import Sidebar from "../common/sidebar";
import AppointmentTable from "../pageComponents/Appointments/table";
import { useEffect, useState } from "react";
import { getAppointments } from "../../api";
import * as XLSX from 'xlsx';

export default function Appointments() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const resp = await getAppointments();
            if (resp) setData(resp);
        }
        fetch();
    }, [])


    const downloadExcel = (e) => {
        e.preventDefault();
        if (!data || data.length === 0) {
            alert("No data available to download.");
            return;
        }

        const selectedFields = data.map(item => ({
            Patient_Name: item.name ? item.name : "Not Available",
            Date_Taken: item.date ? item.date : "Not Available",
            Time_taken: item.time ? item.time : "Not Available",
            Message: item.message ? item.message : "Not Available",
            Phone: item.phone ? item.phone : "Not Available",
            Statue: item.status ? item.status : "Not Available",
            Attended_Status: item.attended ? item.attended : "Not Available",
            Attached_Document: item.documentUrl ? item.documentUrl : "Not Available",
        }));

        const worksheet = XLSX.utils.json_to_sheet(selectedFields);

        // Create a workbook and add the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Appointments");

        // Trigger file download
        XLSX.writeFile(workbook, "appointments.xlsx");
    };
    return (
        <div className="flex h-screen">

            {/* Sidebar: Take 1/4 of the width */}
            <div className="w-2/12 ">
                <Sidebar />
            </div>

            <div className="mt-36 w-9/12 mx-auto">
                <h1 className="text-center text-2xl">All Appointments</h1>
                <div className="flex justify-center mt-4 text-red-600">
                    <button className="hover:underline" onClick={downloadExcel}>Download As Excel</button>

                </div>
                <AppointmentTable data={data} />
            </div>
        </div>
    );
}
