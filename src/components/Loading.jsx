import React from 'react';
const Loading = () => {
    return <div className='flex justify-center item-center h-full'>
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
        <p className='text-gray-600 mt-4'>Loading...</p>
    </div>
};

export default Loading;
