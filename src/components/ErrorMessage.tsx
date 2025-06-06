import React from 'react';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <div className="mt-12">
            <div className="max-w-md mx-auto bg-gray-600/20 backdrop-blur-sm text-white px-8 py-3 rounded-lg">
                <p className="font-medium">Error</p>
                <p className="text-sm text-gray-300">{message}</p>
            </div>
        </div>
    );
};

export default ErrorMessage;