import { Link } from "react-router-dom";
import Sidebar from "../common/sidebar";
import CommentTable from "../pageComponents/Comments/Table";
import { useEffect, useState } from "react";
import { getComments } from "../../api";
export default function CommentsPage() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const resp = await getComments();
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
                <h1 className="text-center text-2xl">All Comments </h1>
                <CommentTable data={data} />
            </div>
        </div>
    );
}