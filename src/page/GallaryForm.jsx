import { useParams } from "react-router-dom";
import { getImageById } from "../../api";
import Sidebar from "../common/sidebar";
import GallaryForm from "../pageComponents/Gallary/Form";
import { useEffect, useState } from "react";

export default function GallaryFormPage() {

    return (
        <div className="flex h-screen">

            {/* Sidebar: Take 1/4 of the width */}
            <div className="w-1/4 border-r border-gray-300">
                <Sidebar />
            </div>

            <div className="mt-10 w-2/3">
                <GallaryForm />
            </div>
        </div>
    );
}
