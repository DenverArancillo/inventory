import React from 'react';
import Loader from 'react-loader-spinner';

const Loading = ({ state }) => {

    return (
        <div>
            <div className={`transition-opacity duration-100 fixed w-full h-full top-0 left-0 flex items-center justify-center z-50 ${(state) ? '' : 'opacity-0 pointer-events-none'}`}>
                <Loader 
                    type="Rings" 
                    color="Black" 
                    height={80} 
                    width={80}
                />
                <div className="absolute w-full h-full bg-gray-600 opacity-50"></div>
            </div>
        </div>
    )

}

export default Loading;