import React from 'react';

const Loading = () => {

    return (
        <div className="container w-screen">
            <div className="absolute top-1/2 w-full text-center text-black text-lg">Loading . . .</div>
            <div className="rounded-t-lg bg-gray-800 opacity-10"></div>
        </div>
    );
}

export default Loading;