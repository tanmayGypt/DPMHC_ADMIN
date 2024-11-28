import { getBlogById } from "../../api";
import Sidebar from "../common/sidebar";
import BlogsForm from "../pageComponents/Blogs/form";

export default function BlogForm() {

    return (
        <div className="flex h-screen">

            {/* Sidebar: Take 1/4 of the width */}
            <div className="w-1/4  h-screen">
                <Sidebar />
            </div>

            <div className="mt-36 w-2/3">
                <h1 className="text-center text-2xl">Blog Form</h1>
                <BlogsForm />
            </div>
        </div>
    );
}
