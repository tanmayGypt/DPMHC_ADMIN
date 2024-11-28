import { useEffect, useState } from "react";
import { getCategoties } from "../../api";
import Sidebar from "../common/sidebar";

import CategoryTable from "../pageComponents/Category/Table";
import { Link } from "react-router-dom";
export default function Categories() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const resp = await getCategoties();
            if (resp) setData(resp);
        }
        fetch();
    }, [])
    return (
        <div className="flex h-screen">

            {/* Sidebar: Take 1/4 of the width */}
            <div className="w-2/12 h-screen">
                <Sidebar />
            </div>

            <div className="mt-36 w-9/12 mx-auto">
                <h1 className="text-center text-2xl">All Categories</h1>
                <Link
                    className="block text-red-600 underline text-center mx-auto"
                    to="/addCategory/new"
                >
                    Add Category
                </Link>
                <CategoryTable data={data} />
            </div>
        </div>
    );
}
