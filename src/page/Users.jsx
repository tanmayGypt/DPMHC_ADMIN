import { Link } from "react-router-dom";
import Sidebar from "../common/sidebar";
import UsersTable from "../pageComponents/Users/table";
import { useEffect, useState } from "react";
import { getUsers } from "../../api";

export default function Users() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const resp = await getUsers();
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
                <h1 className="text-center text-2xl">All Users</h1>

                <UsersTable data={data} />
            </div>
        </div>
    );
}