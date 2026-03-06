import React from "react";
import { Outlet } from "react-router-dom";
import { GlobalProvider } from "../hooks/useGlobalReducer";

export const Layout = () => {
    return (
        <GlobalProvider>
            <div className="min-vh-100 d-flex flex-column bg-white">
                <main className="flex-grow-1">
                    <Outlet /> 
                </main>
            </div>
        </GlobalProvider>
    );
};