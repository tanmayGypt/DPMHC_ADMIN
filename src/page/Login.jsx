import React, { useState } from "react";
import { loginUser } from "../../api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true); // Show loader

        loginUser({ email, password })
            .then((response) => {
                Cookies.set("jwt", response);
                setMessage({ type: "success", text: "Login successful!" });
                setTimeout(() => {
                    navigate("/");
                }, 2000); // Redirect after 2 seconds
            })
            .catch((error) => {
                setMessage({ type: "error", text: "Login failed. Please try again." });
            })
            .finally(() => {
                setLoading(false); // Hide loader
            });
    };

    return (
        <div className="h-screen flex flex-col gap-y-8 items-center justify-center bg-gray-50 px-6">
            {/* Header Section */}
            <div className="relative overflow-hidden whitespace-nowrap">
                <div className="animate-marquee inline-block text-gray-900 text-center font-bold tracking-wide text-lg">
                    Welcome to the DP Memorial Admin Portal – Your gateway to seamless management and control. Please sign in to continue and access your administrative dashboard.
                </div>
            </div>
            <img
                alt="DPMHC"
                src="/logo.png"
                className="mx-auto max-w-32 min-w-20 w-auto mt-12"
            />
            <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
                Sign in to your account
            </h2>
            {/* Form Section */}
            <div className="mt-20 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </button>
                    </div>
                </form>
            </div>

            {/* Loader */}
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="loader border-t-4 border-indigo-600 rounded-full w-12 h-12 animate-spin"></div>
                </div>
            )}

            {/* Popup Message */}
            {message && (
                <div
                    className={`fixed bottom-5 right-5 px-4 py-2 rounded-md text-white z-50 ${message.type === "success" ? "bg-green-500" : "bg-red-500"
                        }`}
                >
                    {message.text}
                </div>
            )}
        </div>
    );
}
