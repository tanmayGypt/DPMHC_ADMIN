import { useEffect, useState } from "react";

export default function Card({ title, dataValue }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Dynamic styles for cards
    const colors = {
        // Notifications Section
        "Total Notifications": "bg-blue-100 text-blue-600",
        "Web Visible": "bg-green-100 text-green-600",
        "App Visible": "bg-purple-100 text-purple-600",
        "Active Notifications": "bg-red-100 text-red-600",
        "Last Added Notification": "bg-yellow-100 text-yellow-600",

        // Appointments Section
        "Total Appointments": "bg-teal-100 text-teal-600",
        "Attended Appointments": "bg-indigo-100 text-indigo-600",
        "Completed Appointments": "bg-orange-100 text-orange-600",
        "Pending Appointments": "bg-cyan-100 text-cyan-600",
        "Last Added Appointment": "bg-pink-100 text-pink-600",

        // Blogs Section
        "Total Blogs": "bg-sky-100 text-sky-600",
        "Published Blogs": "bg-lime-100 text-lime-600",
        "Unpublished Blogs": "bg-amber-100 text-amber-600",
        "Last Added Blog": "bg-fuchsia-100 text-fuchsia-600",

        // Medicine Section
        "Total Medicine": "bg-rose-100 text-rose-600",
        "Published Medicine": "bg-gray-100 text-gray-600",
        "Unpublished Medicine": "bg-violet-100 text-violet-600",
        "Last Added Medicine": "bg-emerald-100 text-emerald-600",

        // Users Section
        "Total Users": "bg-blue-200 text-blue-700",
        "Verified Users": "bg-green-200 text-green-700",
        "Last Signup": "bg-purple-200 text-purple-700",

        // Categories Section
        "Total Categories": "bg-yellow-200 text-yellow-700",
        "Blog Categories": "bg-orange-200 text-orange-700",
        "Medicine Categories": "bg-teal-200 text-teal-700",
        "Others": "bg-pink-200 text-pink-700",
        "Last Added Category": "bg-indigo-200 text-indigo-700",

        // Comments Section
        "Total Comments": "bg-red-200 text-red-700",
        "Last Comment": "bg-cyan-200 text-cyan-700",

        // Feedback Section
        "Total Feedback": "bg-emerald-200 text-emerald-700",
        "Answered Feedbacks": "bg-blue-300 text-blue-800",
        "Unnswered Feedbacks": "bg-lime-300 text-lime-800",
        "Last Feedback": "bg-fuchsia-300 text-fuchsia-800",

        // Website Gallery Section
        "Total Images": "bg-gray-300 text-gray-800",
        "Active Images": "bg-sky-300 text-sky-800",
    };

    return (
        <div
            className={`max-w-xs w-full p-5 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl ${colors[title] || "bg-gray-100 text-gray-600"
                } ${isVisible ? "animate-card" : ""}`}
        >
            <div className="flex flex-col justify-center text-center gap-y-4">
                <h3 className="text-xl font-semibold">{title}</h3>
                <span className="text-lg font-bold">{dataValue}</span>
            </div>
        </div>
    );
}
