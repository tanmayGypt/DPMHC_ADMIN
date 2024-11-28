import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { createCategory, getCategoryById } from '../../../api';

const CategoryForm = () => {
    const { id } = useParams();
    const [data, setData] = useState(null); // Use null to ensure the form does not render prematurely
    const [loading, setLoading] = useState(false); // Loading state for fetching data
    const [submitting, setSubmitting] = useState(false); // Loading state for form submission

    useEffect(() => {
        const fetch = async () => {
            setLoading(true); // Start loader for fetching
            if (id !== "new") {
                try {
                    const resp = await getCategoryById(id);
                    setData(resp); // Set data once it is fetched
                } catch (err) {
                    console.error('Error fetching category:', err);
                }
            }
            setLoading(false); // Stop loader after fetching
        };
        fetch();
    }, [id]);

    const formik = useFormik({
        initialValues: {
            id: data?.id,
            categoryName: data?.categoryName || '',
            subCategory: data?.subCategory || '',
        },
        enableReinitialize: true, // Reinitialize values when data changes
        validationSchema: Yup.object({
            categoryName: Yup.string().required('Category name is required'),
            subCategory: Yup.string().required('Sub-category is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            setSubmitting(true); // Start loader for form submission
            if (id !== "new") values.id = id;
            try {
                const resp = await createCategory(values);
                if (resp) {
                    alert('New Category Added');
                    resetForm();
                } else {
                    alert('Error creating Category. Please try again later.');
                }
            } catch (err) {
                alert('Something went wrong while submitting the form.');
            } finally {
                setSubmitting(false); // Stop loader after form submission
            }
        },
    });

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
        <div className="w-full h-screen flex justify-center items-center bg-gray-100">
            <form
                onSubmit={formik.handleSubmit}
                className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-lg space-y-6"
            >
                <h2 className="text-2xl font-semibold text-gray-800">Category Form</h2>

                {/* Category Name */}
                <div className="mb-4">
                    <label htmlFor="categoryName" className="block text-sm font-medium text-gray-600">Category Name</label>
                    <input
                        type="text"
                        name="categoryName"
                        id="categoryName"
                        {...formik.getFieldProps('categoryName')}
                        className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {formik.touched.categoryName && formik.errors.categoryName && (
                        <div className="text-sm text-red-600">{formik.errors.categoryName}</div>
                    )}
                </div>

                <div className="mb-4"> <label htmlFor="subCategory" className="block text-sm font-medium text-gray-600">Sub-category</label> <select name="subCategory" id="subCategory" {...formik.getFieldProps('subCategory')} className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" > <option value="">Select Sub-category</option> <option value="Blog">Blog</option> <option value="Medicine">Medicine</option> <option value="Others">Others</option> </select> {formik.touched.subCategory && formik.errors.subCategory && (<div className="text-sm text-red-600">{formik.errors.subCategory}</div>)} </div>

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

export default CategoryForm;
