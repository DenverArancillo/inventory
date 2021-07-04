const Dialog = ({ title, content, state, handleDialog }) => {

    return (
        <div>
            <div className={`transition-opacity duration-100 fixed w-full h-full top-0 left-0 flex items-center justify-center ${(state) ? '' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
                
                <div className="bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-10 overflow-y-auto">
                    <div className="px-4 py-3 flex items-center justify-between">
                        <div className="text-left text-lg leading-6 font-medium text-gray-900">
                            {title}
                        </div>
                        <button className="focus:outline-none text-gray-600" onClick={() => handleDialog(false)}>X</button>
                    </div>
                    <div className="p-4 border-t border-gray-200">
                        {content(handleDialog)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialog;