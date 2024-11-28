import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { createBlog, getBlogById, getCategoties } from '../../../api';
import { useParams } from 'react-router-dom';
import { uploadToCloudinary } from './ImageUpload';
import SimpleImageSlider from "react-simple-image-slider";

const BlogsForm = () => {
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState(null); // Ensure data is null initially
    const [loading, setLoading] = useState(false); // Add loading state for fetching data
    const [submitting, setSubmitting] = useState(false); // Add loading state for form submission
    const [imageUrls, setImageUrls] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true); // Start loader
            try {
                if (id !== 'new') {
                    const resp = await getBlogById(id);
                    setData(resp || {});
                }
            } catch (err) {
                console.error('Error fetching blog data:', err);
            } finally {
                setLoading(false); // End loader
            }
        };
        fetchBlog();
    }, [id]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const resp = await getCategoties();
                setCategories(resp || []);
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        };
        fetchCategories();
    }, []);
    const handleFileUpload = async (event) => {
        const files = Array.from(event.target.files);
        try {
            const uploadedUrls = await uploadToCloudinary(files);
            formik.setFieldValue('images', [
                ...(formik.values.images || []),
                ...uploadedUrls,
            ]);
            console.log(uploadedUrls)
            setImageUrls(uploadedUrls);
        } catch (error) {
            alert('Error uploading images. Please try again.', error);
        }
    };
    const formik = useFormik({
        initialValues: {
            id: data?.id,
            title: data?.title || '',
            description: data?.description || '',
            author: data?.author || '',
            modelCategory: data?.modelCategory || 0,
            category: data?.category || '',
            images: data?.images || [''],
            body: data?.body || '',
            published: data?.published || false,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required'),
            author: Yup.string().required('Author is required'),
            modelCategory: Yup.number()
                .oneOf([0, 1], 'Model Category must be 0 (Blog) or 1 (Medicine)')
                .required('Model Category is required'),
            category: Yup.string().default(data?.category),
            images: Yup.array().of(Yup.string().url('Must be a valid URL')),
            body: Yup.string().required('Body content is required'),
            published: Yup.boolean()
        }),
        onSubmit: async (values, { resetForm }) => {
            setSubmitting(true); // Start loader for submission
            const blogData = {
                ...values,
                images: values.images.filter((img) => img), // Filter out empty strings
            };

            try {
                const resp = await createBlog(blogData);
                if (resp?.data) {
                    setData(resp)
                    if (id !== "new") {
                        alert('New Blog Added'); resetForm();
                    }
                } else {
                    alert('Error creating blog. Please try again later.');
                }
            } catch (err) {
                alert('Something went wrong while submitting the form.');
            } finally {
                setSubmitting(false); // Stop loader for submission
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
        <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4">
            <form
                onSubmit={formik.handleSubmit}
                className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-lg space-y-6"
            >
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        {...formik.getFieldProps('title')}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {formik.touched.title && formik.errors.title && (
                        <div className="text-sm text-red-500 mt-1">{formik.errors.title}</div>
                    )}
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        {...formik.getFieldProps('description')}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {formik.touched.description && formik.errors.description && (
                        <div className="text-sm text-red-500 mt-1">{formik.errors.description}</div>
                    )}
                </div>

                {/* Author */}
                <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
                    <input
                        type="text"
                        name="author"
                        id="author"
                        {...formik.getFieldProps('author')}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {formik.touched.author && formik.errors.author && (
                        <div className="text-sm text-red-500 mt-1">{formik.errors.author}</div>
                    )}
                </div>

                {/* Model Category */}
                <div>
                    <label htmlFor="modelCategory" className="block text-sm font-medium text-gray-700">Model Category</label>
                    <select
                        name="modelCategory"
                        id="modelCategory"
                        {...formik.getFieldProps('modelCategory')}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value={0}>Blog</option>
                        <option value={1}>Medicine</option>
                        <option value={1}>Others</option>
                    </select>
                    {formik.touched.modelCategory && formik.errors.modelCategory && (
                        <div className="text-sm text-red-500 mt-1">{formik.errors.modelCategory}</div>
                    )}
                </div>

                {/* Category */}
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        name="category"
                        id="category"
                        {...formik.getFieldProps('category')}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="" disabled>
                            Choose Category
                        </option>
                        {categories?.map((category) => (
                            <option key={category.categoryName} value={category.categoryName}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>
                    {formik.touched.category && formik.errors.category && (
                        <div className="text-sm text-red-500 mt-1">{formik.errors.category}</div>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="images" className="block text-sm font-medium text-gray-600">Upload Images</label>
                    <input
                        type="file"
                        id="images"
                        name="images"
                        multiple
                        accept="image/*"
                        onChange={handleFileUpload} // Handle file uploads
                        className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    {formik.values.images && formik.values.images.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 gap-4">
                            {formik.values.images.map((url, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={url}
                                        alt={`Uploaded ${index + 1}`}
                                        className="w-full h-auto border border-gray-300 rounded-md shadow"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            // Remove the image URL from Formik state
                                            formik.setFieldValue(
                                                'images',
                                                formik.values.images.filter((_, i) => i !== index)
                                            );
                                        }}
                                        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}


                </div>

                {/* Body */}
                <div>
                    <label htmlFor="body" className="block text-sm font-medium text-gray-700">Body</label>
                    <ReactQuill
                        theme="snow"
                        value={formik.values.body}
                        onChange={(content) => formik.setFieldValue('body', content)}
                        className="mt-1 w-full border border-gray-300 rounded-md shadow-sm"
                    />
                    {formik.touched.body && formik.errors.body && (
                        <div className="text-sm text-red-500 mt-1">{formik.errors.body}</div>
                    )}
                </div>
                <div>
                    <label htmlFor="published" className="block text-sm font-medium text-gray-700">Publish Status</label>
                    <select
                        name="published"
                        id="published"
                        value={formik.values.published}
                        onChange={(e) => formik.setFieldValue('published', e.target.value === 'true')}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                    {formik.touched.published && formik.errors.published && (
                        <div className="text-sm text-red-500 mt-1">{formik.errors.published}</div>
                    )}
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

export default BlogsForm;
