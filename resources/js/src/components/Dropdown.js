import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Dropdown = ({ title, buttonClass, menuClass, linkClass, items }) => {
    const history = useHistory();
    const [stateDropdown, setStateDropdown] = useState(false);

    const checkTarget = event => {
        let { relatedTarget } = event;

        // selecting outside of dropdown
        if (relatedTarget === null) { 
            setStateDropdown(false);
            return;
        }

        let currentApp = relatedTarget.attributes.getNamedItem('data-href').nodeValue;

        // selecting current app from dropdown
        if (currentApp === location.pathname) {
            setStateDropdown(false);
            return;
        }
        
        // redirect to selected option
        if (relatedTarget.localName === 'a' && !!relatedTarget.attributes.getNamedItem('data-href')) {
            history.push(event.relatedTarget.dataset.href);
        } else {
            setStateDropdown(false);
        }
    }

    return (
        <div>
            <button className={`${buttonClass} focus:outline-none`} onClick={() => setStateDropdown(!stateDropdown)} onBlur={checkTarget}>{title}</button>
            <div className={`${menuClass} ${(stateDropdown) ? 'flex': 'hidden'}`}>
                {items.map((item, idx) => (
                    (!!item.link) 
                        ? <a href={item.link} data-href={item.link} className={linkClass} key={`${title}-${idx}`}>{item.name}</a>
                        : <Link to={item.routerLink} data-href={item.routerLink} className={linkClass} key={`${title}-${idx}`}>{item.name}</Link>
                ))}
            </div>
        </div>
    );
}

export default Dropdown;