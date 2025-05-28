import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-blue-900 text-center mb-8">
          Weather App
        </h1>
        
        {/* Test Card to verify Tailwind is working */}
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Setup Status
            </div>
            <p className="mt-2 text-gray-500">
              ✅ React with TypeScript is configured
            </p>
            <p className="mt-1 text-gray-500">
              ✅ TailwindCSS v3 is working
            </p>
            <p className="mt-1 text-gray-500">
              ✅ Ready to build your weather app!
            </p>
          </div>
        </div>

        {/* Gradient test */}
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center rounded-lg max-w-md mx-auto">
          If you see this gradient, Tailwind is properly configured!
        </div>
      </div>
    </div>
  );
}

export default App;