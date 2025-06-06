import React from "react";

// TODO: Resolve component not displaying
const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex justify-center items-center pt-12">
            <div className="animate-spin rounded-full h-12 w-12 border b-2 border-gray-300"></div>
        </div>
    );
};

export default LoadingSpinner;