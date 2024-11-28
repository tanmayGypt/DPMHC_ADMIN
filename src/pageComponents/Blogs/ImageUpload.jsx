import { uploadImages } from "../../../api";

export const uploadToCloudinary = async (files) => {
    try {
        const formData = new FormData();
        files.forEach((file) => formData.append('files', file));

        const response = await uploadImages(formData);

        if (!response || response.length == 0) {
            const error = await response.json();
            throw new Error(error.message || 'Upload failed');
        }
        return await response;
    } catch (error) {
        console.error('Error uploading to backend:', error);
        throw error;
    }
};