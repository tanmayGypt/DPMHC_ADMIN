import { Link } from "react-router-dom";
import Sidebar from "../common/sidebar";
import QuestionTable from "../pageComponents/Feedback/Table";
import { getFeedback } from "../../api";
import { useEffect, useState } from "react";
export default function Feedback() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const resp = await getFeedback();
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
                <h1 className="text-center text-2xl">All Feedbacks </h1>
                <QuestionTable data={data} />
            </div>
        </div>
    );
}

