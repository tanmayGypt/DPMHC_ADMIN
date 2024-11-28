import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { getImageById, uploadImage } from '../../../api';
import { useParams } from 'react-router-dom';
import { uploadToCloudinary } from '../Blogs/ImageUpload';

const GallaryForm = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false); // State for image upload loading
    const { id } = useParams();
    const [data, setData] = useState(null); // Default to null for proper loading state
    const [loading, setLoading] = useState(false); // State for fetching data loading

    useEffect(() => {
        const fetch = async () => {
            setLoading(true); // Start loader for fetching
            if (id !== "new") {
                try {
                    const resp = await getImageById(id);
                    setData(resp);
                } catch (err) {
                    console.error("Error fetching image data:", err);
                }
            }
            setLoading(false); // End loader for fetching
        };
        fetch();
    }, [id]);

    const handleUpload = async () => {
        if (!file) {
            return null;
        }

        setUploading(true); // Show the uploading state

        try {
            const response = await uploadToCloudinary([file]);

            if (response && response.length > 0) {
                const uploadedUrl = response[0]; // Get the image URL from the response
                console.log('Image uploaded:', uploadedUrl);
                return uploadedUrl; // Return the image URL from the upload response
            } else {
                alert('No URL returned from upload');
                return null;
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('File upload failed.');
            return null;
        } finally {
            setUploading(false); // End the uploading state
        }
    };


    const formik = useFormik({
        initialValues: {
            id: data?.id,
            imageUrl: data?.imageUrl || '', // Use existing image URL or empty string
            title: data?.title || '',
            active: data?.active || false,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            imageUrl: Yup.string(),
            title: Yup.string().required('Title is required'),
            active: Yup.boolean().required('Active status is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            const uploadedUrl = await handleUpload(); // Get the uploaded image URL
            if (!uploadedUrl && id === 'new') {
                alert('Please upload an image before submitting.');
                return;
            }

            // Set the uploaded image URL (if any)
            if (uploadedUrl) {
                values.imageUrl = uploadedUrl;
            }

            try {
                // Submit the form data including the imageUrl
                const resp = await uploadImage(values); // Ensure your API can handle this request
                if (resp) {
                    alert('Image Uploaded Successfully');
                    setData(resp);
                    resetForm();
                } else {
                    alert('Something went wrong.');
                }
            } catch (err) {
                console.error('Error during form submission:', err);
                alert('Something went wrong while submitting the form.');
            }
        },
    });




    // Show loader when either loading or uploading is true
    if (loading || uploading) {
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
                    {loading ? "Fetching Data..." : "Uploading..."}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-100">
            <form
                onSubmit={formik.handleSubmit}
                className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg space-y-6"
            >
                <h2 className="text-2xl font-semibold text-gray-800">Image Form</h2>

                {/* Image Preview */}
                {data?.imageUrl && (
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-600">
                            Current Image:
                        </label>
                        <img
                            src={data?.imageUrl}
                            alt="Current"
                            className="w-full h-64 object-cover rounded-md mt-2 border border-gray-300"
                        />
                    </div>
                )}

                {/* File Input */}
                <div className="mb-4">
                    <div className="mb-4">
                        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-600">
                            Upload New Image
                        </label>
                        <input
                            type="file"
                            id="imageUrl"
                            onChange={(e) => setFile(e.target.files[0])} // Only use the first file
                            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {uploading && (
                            <div className="text-sm text-blue-600">Uploading...</div> // Show upload loader
                        )}
                    </div>
                </div>

                {/* Title */}
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                        Title
                    </label>
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

                {/* Active Status */}
                <div className="mb-4">
                    <label htmlFor="isActive" className="block text-sm font-medium text-gray-600">
                        Active Status
                    </label>
                    <select
                        name="active"
                        id="isActive"
                        {...formik.getFieldProps('active')}
                        className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                    </select>
                    {formik.touched.active && formik.errors.active && (
                        <div className="text-sm text-red-600">{formik.errors.active}</div>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    disabled={uploading}
                >
                    {uploading ? 'Uploading...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default GallaryForm;
