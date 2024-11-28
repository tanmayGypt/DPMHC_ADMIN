import { useParams } from "react-router-dom";
import Sidebar from "../common/sidebar";
import CategoryForm from "../pageComponents/Category/Form";
import { useEffect, useState } from "react";

export default function CategoryFormPage() {

    return (
        <div className="flex h-screen">

            {/* Sidebar: Take 1/4 of the width */}
            <div className="w-1/4 border-r border-gray-300">
                <Sidebar />
            </div>

            <div className="mt-10 w-2/3">
                <CategoryForm />
            </div>
        </div>
    );
}
