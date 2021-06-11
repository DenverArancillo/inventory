import { Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Cookies from './Cookies';
import Dropdown from './Dropdown';
import Dialog from './Dialog';
import axios from 'axios';

const Header = ({ }) => {
    const [isLogin, setStateisLogin] = useState(!!Cookies.get('access_token'));
    const [didLogout, setStatedidLogout] = useState(false);
    const [dialog, setStateDialog] = useState(false);
    const history = useHistory();

    const logout = async event => {
        event.preventDefault();
        let config = {
            method: 'post',
            url: "/api/logout",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${Cookies.get('access_token')}`
            }
        };

        try {
            let { data } = await axios(config);
            if (data.logout) {
                Cookies.remove('access_token')
                setStateDialog(true);
                setStatedidLogout(true);
                setStateisLogin(false);

                history.push('/');
            } else {
                console.log('did not logout');
            }

        } catch (thrown) {
            console.log(thrown);
        }
    };

    const dialogcontent = handleDialog => {
        return (
            <div>
                Successfully logged out.
                <div className="flex items-center justify-end">
                    <button className="bg-blue-400 rounded-md border-2 border-blue-400 text-white px-3 py-1 text-base focus:outline-none" type="submit" onClick={() => handleDialog(false)}>Ok</button>
                </div>
            </div>
        )
    }

    return (
        <Fragment>
            {
                didLogout
                ? <Dialog
                    title="Alert"
                    content={dialogcontent}
                    state={dialog}
                    handleDialog={setStateDialog}        
                />
                : null
            }
            <div className="bg-blue-500 p-2 flex items-center justify-between">
                <div className="flex items-center">
                    {/* <img src="https://cdn2.iconfinder.com/data/icons/icontober/64/Inkcontober_Trail-512.png" width="50" alt="Logo" className="mx-4"/> */}
                    <img src="/img/logo.png" width="50" alt="Logo" className="mx-4"/>
                
                    <Link to="/" className="text-gray-100 px-4">Home</Link>
                    <Dropdown
                        title="Menu"
                        buttonClass="text-gray-100 px-4"
                        menuClass="rounded-md absolute z-10 p-2 mt-2 flex-col shadow-lg bg-white text-base w-32 ring-black ring-opacity-5 focus:outline-none"
                        linkClass="rounded float-none px-2 py-1 text-left text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                        items={[
                            { routerLink: "/brands", name: "Brand" },
                            { link: "#", name: "Profile" },
                            { link: "#", name: "Settings" }
                        ]}
                    />
                    <Dropdown
                        title="Menu2"
                        buttonClass="text-gray-100 px-4"
                        menuClass="rounded-md absolute z-10 p-2 mt-2 flex-col shadow-lg bg-white text-base w-32 ring-black ring-opacity-5 focus:outline-none"
                        linkClass="rounded float-none px-2 py-1 text-left text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                        items={[
                            { link: "#", name: "Posts" },
                            { link: "#", name: "Profile" },
                            { link: "#", name: "Settings" }
                        ]}
                    />
                </div>
                <div className="mr-4">
                    {
                        !isLogin
                        ? <Link to="/login" className="text-lg leading-6 font-medium text-gray-100">Login</Link>
                        : <a href="#" className="text-lg leading-6 font-medium text-gray-100" onClick={logout}>Logout</a>
                    }
                </div>
            </div>
        </Fragment>        
    );
}

export default Header;