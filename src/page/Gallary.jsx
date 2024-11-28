import { Link } from "react-router-dom";
import Sidebar from "../common/sidebar";
import GallaryTable from "../pageComponents/Gallary/Table";
import { useEffect, useState } from "react";
import { getGallary } from "../../api";
export default function GallaryPage() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const resp = await getGallary();
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
                <h1 className="text-center text-2xl">All Images </h1>
                <Link
                    className="block text-red-600 underline text-center mx-auto"
                    to="/addImage/new"
                >
                    Add Image
                </Link>
                <GallaryTable data={data} />
            </div>
        </div>
    );
}