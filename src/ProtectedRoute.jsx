import React from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const ProtectedRoute = ({ children }) => {
    const [cookies] = useCookies(["jwt"]);

    if (!cookies?.jwt) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;
