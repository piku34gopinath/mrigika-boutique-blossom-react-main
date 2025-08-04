
import React from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdminDashboardPage = () => {
    const isAdmin = localStorage.getItem("admin") === "true";

    if (!isAdmin) {
        return <Navigate to="/admin/login" />;
    }

    const handleLogout = () => {
        localStorage.removeItem("admin");
        window.location.href = "/admin/login";
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <Button onClick={handleLogout}>Logout</Button>
            </div>
            <p>Welcome to the admin dashboard. Here you can manage your store.</p>
        </div>
    );
};

export default AdminDashboardPage;
