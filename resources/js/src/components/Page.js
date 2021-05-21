import React, { Fragment } from 'react';
import Header from './Header';

const Page = ({ title, headerAction, content }) => {

    return (
		<Fragment>
			<Header/>
			<div className="container w-screen mx-auto p-9 mt-4">
				<div className="bg-white p-4 border-t border-gray-200 rounded-t-lg shadow overflow-hidden flex items-center justify-between">
					<h3 className="text-lg leading-6 font-medium text-gray-900">{(!!title) ? title : ''}</h3>
					{(!!headerAction) ? headerAction() : null}
				</div>
				{(!!content) ? content : null}
			</div>
		</Fragment>
    );
}

export default Page;