import { Link } from "react-router-dom";
import Sidebar from "../common/sidebar";
import NotificationsTable from "../pageComponents/Notifications/table";
import { useEffect, useState } from "react";
import { getAlerts } from "../../api";

export default function NotificationsPage() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const resp = await getAlerts();
            if (resp) setData(resp);
        }
        fetch();
    }, [])
    return (
        <div className="flex h-screen">

            <div className="w-2/12 border-r border-gray-300">
                <Sidebar />
            </div>

            <div className="mt-36 w-9/12 mx-auto">
                <h1 className="text-center text-2xl">All Notifications</h1>
                <Link
                    className="block text-red-600 underline text-center mx-auto"
                    to="/addNotification/new"
                >
                    Add Notification
                </Link>
                <NotificationsTable data={data} />
            </div>
        </div>
    );
}