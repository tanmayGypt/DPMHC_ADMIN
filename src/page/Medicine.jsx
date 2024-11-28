import { Link } from "react-router-dom";
import Sidebar from "../common/sidebar";
import MedicineTable from "../pageComponents/Medicines/table";
import { useEffect, useState } from "react";
import { getBlogs } from "../../api";
export default function MedicinePage() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const resp = await getBlogs();
            if (resp) setData(resp);
        }
        fetch();
    }, [])
    return (
        <div className="flex h-screen">

            <div className="w-2/12">
                <Sidebar />
            </div>

            <div className="mt-36 w-9/12 mx-auto">
                <h1 className="text-center text-2xl">All Medicine </h1>
                <Link
                    className="block text-red-600 underline text-center mx-auto"
                    to="/addBlog/new"
                >
                    Add Medicine
                </Link>
                <MedicineTable data={data} />
            </div>
        </div>
    );
}