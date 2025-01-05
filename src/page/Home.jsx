import { useEffect, useState } from "react";
import Sidebar from "../common/sidebar";
import Card from "../pageComponents/Home/Card";
import { getStatistics } from "../../api";

export default function Home() {
    const [data, setData] = useState({});
    // useEffect(() => {
    //     const fetch = async () => {
    //         const resp = await getStatistics();
    //         if (resp) setData(resp);
    //     }
    //     fetch();
    // }, [])
    const sectionStyles =
        "text-2xl font-semibold mb-4 transition-colors hover:text-blue-500 my-4 mt-10";
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-2/12">
                <Sidebar />
            </div>

            <div className="mt-12 mx-auto w-9/12">
                <h1 className="text-center text-4xl font-extrabold text-gray-800 mt-8 mb-6 tracking-wide bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text shadow-lg">
                    Dashboard
                </h1>                <div className="p-5">
                    {/* Notification Section */}
                    <h2 className={sectionStyles}>User Statistics</h2>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                        <Card
                            title="Total Users"
                            dataPoint="Total Users"
                            dataValue={data?.totalUsers || 0}
                        />
                        <Card
                            title="Verified Users"
                            dataPoint="Verified Users"
                            dataValue={data?.verifiedUsers || 0}
                        />
                        <Card
                            title="Last Signup"
                            dataPoint="Last Signup"
                            dataValue={
                                data?.lastSignup
                                    ? new Date(data.lastSignup).toLocaleString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                    })
                                    : "N/A"
                            }
                        />

                    </div>
                    <h2 className={sectionStyles}>Appointment Statistics</h2>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                        <Card
                            title="Total Appointments"
                            dataPoint="Total Appointments"
                            dataValue={data?.totalAppointment || 0}
                        />
                        <Card
                            title="Attended Appointments"
                            dataPoint="Attended Appointments"
                            dataValue={data?.attendedAppointment || 0}
                        />
                        <Card
                            title="Completed Appointments"
                            dataPoint="Completed Appointments"
                            dataValue={data?.completedAppointment || 0}
                        />
                        <Card
                            title="Pending Appointments"
                            dataPoint="Pending Appointments"
                            dataValue={data?.pendingAppointments || 0}
                        />
                        <Card
                            title="Last Added Appointment"
                            dataPoint="Last Added Appointment"
                            dataValue={
                                data?.lastAddedAppointment
                                    ? new Date(data.lastAddedAppointment).toLocaleString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                    })
                                    : "N/A"
                            }
                        />

                    </div>

                    <h2 className={sectionStyles}>Notifications</h2>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                        <Card
                            title="Total Notifications"
                            dataPoint="Total Notifications"
                            dataValue={data?.totalNotifications || 0}
                        />
                        <Card
                            title="Web Visible"
                            dataPoint="Web Visible Notifications"
                            dataValue={data?.webVisible || 0}
                        />
                        <Card
                            title="App Visible"
                            dataPoint="App Visible Notifications"
                            dataValue={data?.appVisible || 0}
                        />
                        <Card
                            title="Active Notifications"
                            dataPoint="Active Notifications"
                            dataValue={data?.activeNotifications || 0}
                        />
                        <Card
                            title="Last Added Notification"
                            dataPoint="Last Added Notification"
                            dataValue={
                                data?.lastAddedNotification
                                    ? new Date(data.lastAddedNotification).toLocaleString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                    })
                                    : "N/A"
                            }
                        />

                    </div>

                    {/* Appointment Section */}

                    {/* Blog Section */}
                    <h2 className={sectionStyles}>Blogs Statistics</h2>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                        <Card
                            title="Total Blogs"
                            dataPoint="Total Blogs"
                            dataValue={data?.totalBlogs || 0}
                        />
                        <Card
                            title="Published Blogs"
                            dataPoint="Published Blogs"
                            dataValue={data?.publishedBlogs || 0}
                        />
                        <Card
                            title="Unpublished Blogs"
                            dataPoint="Unpublished Blogs"
                            dataValue={data?.unPublishedBlogs || 0}
                        />
                        <Card
                            title="Last Added Blog"
                            dataPoint="Last Added Blog"
                            dataValue={
                                data?.lastAddedBlog
                                    ? new Date(data.lastAddedBlog).toLocaleString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                    })
                                    : "N/A"
                            }
                        />

                    </div>

                    {/* Medicine Section */}
                    <h2 className={sectionStyles}>Medicine Statistics</h2>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                        <Card
                            title="Total Medicine"
                            dataPoint="Total Medicine"
                            dataValue={data?.totalMedicine || 0}
                        />
                        <Card
                            title="Published Medicine"
                            dataPoint="Published Medicine"
                            dataValue={data?.publishedMedicine || 0}
                        />
                        <Card
                            title="Unpublished Medicine"
                            dataPoint="Unpublished Medicine"
                            dataValue={data?.unPublishedMedicine || 0}
                        />
                        <Card
                            title="Last Added Medicine"
                            dataPoint="Last Added Medicine"
                            dataValue={
                                data?.lastAddedMedicine
                                    ? new Date(data.lastAddedMedicine).toLocaleString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                    })
                                    : "N/A"
                            }
                        />

                    </div>

                    {/* Users Section */}

                    <h2 className={sectionStyles}>Categories Statistics</h2>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                        <Card
                            title="Total Categories"
                            dataPoint="Blog Categories"
                            dataValue={data?.totalCategory || 0}
                        />
                        <Card
                            title="Blog Categories"
                            dataPoint="Blog Categories"
                            dataValue={data?.blogCategory || 0}
                        />
                        <Card
                            title="Medicine Categories"
                            dataPoint="App Visible Notifications"
                            dataValue={data?.medicineCategory || 0}
                        />
                        <Card
                            title="Others"
                            dataPoint="Active Notifications"
                            dataValue={data?.others || 0}
                        />

                        <Card
                            title="Last Added Category"
                            dataPoint="Active Notifications"
                            dataValue={
                                data?.lastAddedCategory
                                    ? new Date(data.lastAddedCategory).toLocaleString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                    })
                                    : "N/A"
                            }
                        />

                    </div>
                    <h2 className={sectionStyles}>Comment Statistics</h2>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                        <Card
                            title="Total Comments"
                            dataPoint="Blog Categories"
                            dataValue={data?.totalComments || 0}
                        />
                        <Card
                            title="Last Comment"
                            dataPoint="Blog Categories"
                            dataValue={
                                data?.lastComment
                                    ? new Date(data.lastComment).toLocaleString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                    })
                                    : 0
                            }
                        />

                    </div>

                    <h2 className={sectionStyles}>Feedback Statistics</h2>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                        <Card
                            title="Total Feedback"
                            dataPoint="Blog Categories"
                            dataValue={data?.totalFeedback || 0}
                        />
                        <Card
                            title="Answered Feedbacks"
                            dataPoint="Blog Categories"
                            dataValue={data?.answered || 0}
                        />
                        <Card
                            title="Unnswered Feedbacks"
                            dataPoint="Blog Categories"
                            dataValue={data?.unAnswered || 0}
                        />
                        <Card
                            title="Last Feedback"
                            dataPoint="Blog Categories"
                            dataValue={
                                data?.lastFeedback
                                    ? new Date(data.lastFeedback).toLocaleString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                    })
                                    : 0
                            }
                        />

                    </div>

                    <h2 className={sectionStyles}>Website Gallary Statistics</h2>
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                        <Card
                            title="Total Images"
                            dataPoint="Blog Categories"
                            dataValue={data?.totalImages || 0}
                        />
                        <Card
                            title="Active Images"
                            dataPoint="Blog Categories"
                            dataValue={data?.activeImages || 0}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
