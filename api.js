import axios from 'axios';
import Cookies from "js-cookie";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const UNBLOCKED_ROUTES = [
  '/auth/login',
  '/auth/register',
  '/auth/getOtp',
  '/auth/verifyOtp',
  '/auth/resetPassword',
  '/api/upload/images'
];

api.interceptors.request.use((config) => {
  const token = Cookies.get("jwt");

  if (token && !UNBLOCKED_ROUTES.some(route => config.url.includes(route))) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export const getCategoties = async () => {
  try {
    const response = await api.get('/category');
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

export const createCategory = async (data) => {
  try {
    const response = await api.post('/category', data);
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

export const getFeedback = async () => {
  try {
    const response = await api.get('/feedback');
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

export const getGallary = async () => {
  try {
    const response = await api.get('/Gallary');
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

export const getStatistics = async () => {
  try {
    const response = await api.get('/statistics');
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get('/auth/allUsers');
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};


export const registerUser = async (userData, otp) => {
  try {
    console.log('Sending OTP:', otp);
    console.log('User Data:', userData);

    const response = await api.post(`/auth/register/${otp}`, {
      email: userData.email,
      fullName: userData.fullName,
      password: userData.password,
      isVerified: userData.isVerified,
      dob: userData.dob,
      country: userData.country,
      state: userData.state,
      address: userData.address,
      phoneNumber: userData.phoneNumber
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      console.error('Error request:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await api.post('/auth/login', { username: loginData.email, password: loginData.password });


    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const getAlerts = async () => {
  try {
    const response = await api.get('/alerts');
    return response.data;
  } catch (error) {
    console.error('Error fetching alerts:', error);
    throw error;
  }
};
export const getProducts = async () => {
  try {
    const response = await api.get('/Blogs');
    return response.data;
  } catch (error) {
    console.error('Error fetching alerts:', error);
    throw error;
  }
};


export const createAlert = async (alertData) => {
  try {
    const response = await api.post('/alerts', alertData);
    return response.data;
  } catch (error) {
    console.error('Error creating alert:', error);
    throw error;
  }
};

// Appointment APIs
export const getAppointments = async () => {
  try {
    const response = await api.get('/Appointment');
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

export const createAppointment = async (appointmentData) => {
  try {
    const response = await api.post('/Appointment', appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

export const getAppointmentById = async (id) => {
  try {
    const response = await api.get(`/Appointment/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching appointment by ID (${id}):`, error);
    throw error;
  }
};

export const getBlogs = async () => {
  try {
    const response = await api.get('/Blogs');
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

export const createBlog = async (blogData) => {
  try {
    const response = await api.post('/Blogs', blogData);
    return response;
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await api.get(`/Blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog by ID (${id}):`, error);
    throw error;
  }
};

export const getComments = async () => {
  try {
    const response = await api.get('/comment');
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};


export const getImageById = async (id) => {
  try {
    const response = await api.get(`/Gallary/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Image:', error);
    throw error;
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await api.get(`/category/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Image:', error);
    throw error;
  }
};

export const uploadImages = async (formData) => {
  try {
    const response = await api.post(`/api/upload/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error uploading:', error);
    throw error;
  }
};

export const getFeedbackById = async (id) => {
  try {
    const response = await api.get(`/feedback/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Feedback:', error);
    throw error;
  }
};

export const getNotificationById = async (id) => {
  try {
    const response = await api.get(`/alerts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Notification:', error);
    throw error;
  }
};

export const uploadImage = async (gallaryData) => {
  try {
    const response = await api.post('/Gallary', gallaryData);
    return response.data;
  } catch (error) {
    console.error('Error Saving image:', error);
    throw error;
  }
};

export const getCommentsForPost = async (targetBlogId) => {
  try {
    const response = await api.get(`/comment/post?targetBlogId=${encodeURIComponent(targetBlogId)}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};

export const createComment = async (commentData) => {
  try {
    const response = await api.post('/comment', commentData);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

export const generateOTP = async ({ name, email }) => {
  try {
    const url = `https://dpmhc-backend-24id.onrender.com/auth/getOtp?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`;
    const response = await api.get(url);
    return response;
  } catch (error) {
    console.error('Error generating OTP:', error);
    throw error;
  }
};


export const verifyOtp = async ({ otp, email }) => {
  try {
    const url = `https://dpmhc-backend-24id.onrender.com/auth/verifyOtp?otp=${otp}&email=${email}`;

    const response = await api.get(url);

    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

export const resetPassword = async ({ otp, email, password }) => {
  console.log(otp, email, password)
  try {
    const url = `https://dpmhc-backend-24id.onrender.com/auth/resetPassword?otp=${otp}&email=${email}&password=${password}`;

    const response = await api.get(url);

    return response;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};

