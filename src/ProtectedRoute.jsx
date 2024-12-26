import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
    const token = Cookies.get("jwt"); // Fetch the JWT token

    // Debugging: Log the token value
    console.log("JWT Token:", token);

    // Redirect to login if token is missing
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Render protected content
    return children;
};

export default ProtectedRoute;
