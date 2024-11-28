import { Link } from "react-router-dom";
import Sidebar from "../common/sidebar";
import BlogsTable from "../pageComponents/Blogs/table";
import { getBlogs } from "../../api";
import { useEffect, useState } from "react";

export default function Blogs() {
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
                <h1 className="text-center text-2xl">All Blogs</h1>
                <Link
                    className="block text-red-600 underline text-center mx-auto"
                    to="/addBlog/new"
                >
                    Add Blog
                </Link>
                <BlogsTable data={data} />
            </div>
        </div>
    );
}