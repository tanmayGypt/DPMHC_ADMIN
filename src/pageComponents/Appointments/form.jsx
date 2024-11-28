import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { createAppointment, getAppointmentById } from '../../../api';

const AppointmentForm = () => {
    const [remarks, setRemarks] = useState([]);
    const [newRemark, setNewRemark] = useState('');
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false); // New state for submission loading

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const resp = await getAppointmentById(id);
                setRemarks(resp.remarks || []); // Initialize remarks
                setData(resp);
            } catch (error) {
                console.error("Error fetching appointment data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [id]);

    const formik = useFormik({
        initialValues: {
            id: data?.id,
            name: data?.name || '',
            phone: data?.phone || '',
            emailAddress: data?.emailAddress || '',
            date: data?.date || '',
            time: data?.time || '',
            message: data?.message || '',
            userId: data?.userId || 'dummy',
            documentUrl: data?.documentUrl || '',
            attended: data?.attended || false,
            status: data?.status || '',
            remarks: data?.remarks || [],
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            phone: Yup.string()
                .matches(/^\d{10}$/, 'Phone number must be 10 digits')
                .required('Phone is required'),
            emailAddress: Yup.string()
                .email('Invalid email address')
                .required('Email Address is required'),
            date: Yup.date().required('Date is required'),
            time: Yup.string().required('Time is required'),
            message: Yup.string().required('Message is required'),
            documentUrl: Yup.string()
        }),
        onSubmit: async (values, { resetForm }) => {
            setSubmitting(true); // Set submitting state to true
            if (id) {
                values.id = id;
                values.remarks = remarks;
            }
            else return;
            try {
                const resp = await createAppointment(values);
                if (resp) {
                    setData(resp);
                    alert('Appointment Updated');
                    resetForm();
                } else {
                    alert('Error Updating Appointment. Please try again later.');
                }
            } catch (err) {
                alert('Something went wrong while submitting the form.');
            } finally {
                setSubmitting(false); // Reset submitting state
            }
        },
    });

    const handleAddRemark = () => {
        if (newRemark.trim() !== '') {
            const updatedRemarks = [...remarks, newRemark];
            setRemarks(updatedRemarks);
            setNewRemark('');
        }
    };

    if (loading || submitting) {
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
                    {loading ? "Loading..." : "Submitting..."}
                </div>
            </div>
        );
    }
    return (
        <form
            onSubmit={formik.handleSubmit}
            className="p-8 bg-white rounded-lg shadow-lg space-y-6 flex flex-col justify-center"
        >

            <div className="mb-4 ">
                <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    {...formik.getFieldProps('name')}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {formik.touched.name && formik.errors.name && (
                    <div className="text-sm text-red-600">{formik.errors.name}</div>
                )}
            </div>

            <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-600">Phone</label>
                <input
                    type="text"
                    name="phone"
                    id="phone"
                    {...formik.getFieldProps('phone')}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {formik.touched.phone && formik.errors.phone && (
                    <div className="text-sm text-red-600">{formik.errors.phone}</div>
                )}
            </div>

            <div className="mb-4">
                <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-600">Email Address</label>
                <input
                    type="email"
                    name="emailAddress"
                    id="emailAddress"
                    {...formik.getFieldProps('emailAddress')}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {formik.touched.emailAddress && formik.errors.emailAddress && (
                    <div className="text-sm text-red-600">{formik.errors.emailAddress}</div>
                )}
            </div>

            <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-600">Date</label>
                <input
                    type="date"
                    name="date"
                    id="date"
                    {...formik.getFieldProps('date')}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {formik.touched.date && formik.errors.date && (
                    <div className="text-sm text-red-600">{formik.errors.date}</div>
                )}
            </div>

            <div className="mb-4">
                <label htmlFor="time" className="block text-sm font-medium text-gray-600">Time</label>
                <input
                    type="time"
                    name="time"
                    id="time"
                    {...formik.getFieldProps('time')}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {formik.touched.time && formik.errors.time && (
                    <div className="text-sm text-red-600">{formik.errors.time}</div>
                )}
            </div>

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


            <div className="mb-4">
                <label htmlFor="documentUrl" className="block text-sm font-medium text-gray-600">Document URL</label>
                <input
                    type="text"
                    name="documentUrl"
                    id="documentUrl"
                    {...formik.getFieldProps('documentUrl')}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {formik.touched.documentUrl && formik.errors.documentUrl && (
                    <div className="text-sm text-red-600">{formik.errors.documentUrl}</div>
                )}
            </div>
            <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-600">Status</label>
                <select
                    name="status"
                    id="status"
                    {...formik.getFieldProps('status')}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="">Select Status</option>
                    <option value="Done">Done</option>
                    <option value="Attended">Attended</option>
                    <option value="Not responding">Not responding</option>
                    <option value="Fake appointment">Fake appointment</option>
                </select>
                {formik.touched.status && formik.errors.status && (
                    <div className="text-sm text-red-600">{formik.errors.status}</div>
                )}
            </div>

            <div className="mb-4 flex items-center space-x-4">
                <label htmlFor="attended" className="text-sm font-medium text-gray-600">
                    Attended
                </label>
                <input
                    type="checkbox"
                    name="attended"
                    id="attended"
                    checked={formik.values.attended}
                    onChange={formik.handleChange}
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded-md focus:ring-indigo-500"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="remarks" className="block text-sm font-medium text-gray-600 mb-2">Remarks</label>
                <div className="flex space-x-4">
                    <input
                        type="text"
                        value={newRemark}
                        onChange={(e) => setNewRemark(e.target.value)}
                        className="mt-2 flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Add a new remark..."
                    />
                    <button
                        type="button"
                        onClick={handleAddRemark}
                        className="mt-2 px-4 py-2 bg-green-600 text-white font-medium rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Add Remark
                    </button>
                </div>

                {remarks.length > 0 ? (
                    <ul className="mt-4 space-y-2">
                        {remarks.map((remark, index) => (
                            <li
                                key={index}
                                className={`p-4 border rounded-md shadow-sm ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                    } flex justify-between items-start`}
                            >
                                <div>
                                    <p className="text-xs text-gray-500 mt-1">Remark {index + 1}</p>
                                    <p className="text-sm text-gray-800">{remark}</p>

                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="mt-4 text-sm text-gray-500">No remarks yet. Add one above!</p>
                )}
            </div>


            <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                Submit
            </button>
        </form>


    );
};

export default AppointmentForm;
