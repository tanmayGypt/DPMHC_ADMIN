import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createAlert, getNotificationById } from '../../../api';
import { useParams } from 'react-router-dom';

const NotificationForm = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            try {
                const resp = await getNotificationById(id);
                setData(resp); // Set fetched data
            } catch (error) {
                console.error('Error fetching data:', error);
                setData(null);
            }
        };
        if (id !== "new") {
            fetch(); // Fetch data only if id is not "new"
        } else {
            setData({
                title: '',
                message: '',
                showOnWeb: true,
                showOnApp: true,
                active: true
            }); // Initialize data for new notification
        }
    }, [id]);

    // If data is not yet loaded, show loading state


    const formik = useFormik({
        initialValues: {
            id: data?.id,
            title: data?.title || '',
            message: data?.message || '',
            showOnWeb: data?.showOnWeb || false,
            showOnApp: data?.showOnApp || false,
            active: data?.active || false,
        },
        enableReinitialize: true, // Reinitialize when `data` changes
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            message: Yup.string().required('Message is required'),
            showOnWeb: Yup.boolean(),
            showOnApp: Yup.boolean(),
            active: Yup.boolean(),
        }),
        onSubmit: async (values, { resetForm }) => {
            console.log('Submitting:', values); // Debug values
            if (id !== "new") values.id = id;
            try {
                const resp = await createAlert(values);
                setData(resp)
                console.log('API Response:', resp); // Debug response
                if (resp) {
                    alert('New Alert Added');
                    resetForm();
                } else {
                    alert('Error creating Alert. Please try again later.');
                }
            } catch (err) {
                console.error('Error:', err); // Log error details
                alert('Something went wrong while submitting the form.');
            }
        },
    });
    if (data === null) {
        return (
            <div className="w-full h-screen flex justify-center items-center bg-gray-50">
                <div className="text-xl text-gray-600 flex flex-col items-center">
                    <svg
                        className="animate-spin h-10 w-10 text-indigo-500 mb-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                    </svg>
                    {!data ? "Fetching Data..." : "Uploading..."}
                </div>
            </div>
        );
    }
    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-100">
            <form
                onSubmit={formik.handleSubmit}
                className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg space-y-6"
            >
                <h2 className="text-2xl font-semibold text-gray-800">Notification Form</h2>

                {/* Title */}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-600">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        {...formik.getFieldProps('title')}
                        className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {formik.touched.title && formik.errors.title && (
                        <div className="text-sm text-red-600">{formik.errors.title}</div>
                    )}
                </div>

                {/* Message */}
                <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-600">Message</label>
                    <textarea
                        name="message"
                        id="message"
                        {...formik.getFieldProps('message')}
                        className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {formik.touched.message && formik.errors.message && (
                        <div className="text-sm text-red-600">{formik.errors.message}</div>
                    )}
                </div>

                {/* Show on Web */}
                <div className="mb-4 flex items-center">
                    <input
                        type="checkbox"
                        name="showOnWeb"
                        id="showOnWeb"
                        checked={formik.values.showOnWeb}
                        onChange={formik.handleChange}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor="showOnWeb" className="ml-2 text-sm text-gray-600">Show on Web</label>
                </div>

                {/* Show on App */}
                <div className="mb-4 flex items-center">
                    <input
                        type="checkbox"
                        name="showOnApp"
                        id="showOnApp"
                        checked={formik.values.showOnApp}
                        onChange={formik.handleChange}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor="showOnApp" className="ml-2 text-sm text-gray-600">Show on App</label>
                </div>

                {/* Active Status */}
                <div className="mb-4 flex items-center">
                    <input
                        type="checkbox"
                        name="active"
                        id="active"
                        checked={formik.values.active}
                        onChange={formik.handleChange}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor="active" className="ml-2 text-sm text-gray-600">Active Status</label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default NotificationForm;
