import { useParams } from "react-router-dom";
import { getNotificationById } from "../../api";
import Sidebar from "../common/sidebar";
import NotificationForm from "../pageComponents/Notifications/form";
import { useEffect, useState } from "react";

export default function NotificationFormPage() {

    return (
        <div className="flex h-screen">

            {/* Sidebar: Take 1/4 of the width */}
            <div className="w-1/4 border-r border-gray-300">
                <Sidebar />
            </div>

            <div className="mt-10 w-2/3">
                <NotificationForm />
            </div>
        </div>
    );
}
