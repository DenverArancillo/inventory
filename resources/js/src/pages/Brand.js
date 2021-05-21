import React, { Fragment, useState, useRef } from 'react';

import Cookies from '../components/Cookies';

import WarningDialog from '../components/WarningDialog';
import Page from '../components/Page';
import Loading from '../components/Loading';
import Table from '../components/Table';
import AddButton from '../components/AddButton';

import useFetch from '../utils/useFetch';
import fetchApi from '../utils/fetchApi';

const Brand = ({ match }) => {
    // match.params.id

    const { data: brands, isPending, error, setData: setStateBrands } = useFetch("/api/brands");
    const [dialogErrorMessage, setStatedialogErrorMessage] = useState('');

    // add brand dialog inputs
    const brandRef = useRef();

    const DialogContent = handleDialog => {
        const submitNewBrand = async event => {
            event.preventDefault();

            if (brandRef.current.value === '') {
                setStatedialogErrorMessage('Brand Name is required.');
                return;
            } 

            let brandName = brandRef.current.value;
            let response = await fetchApi('post', '/api/brands', { brand_name: brandName });
            console.log(response);

            if (response.data.status) {
                brandRef.current.form.reset();
                setStateBrands(response.data.brands);
                handleDialog(false);
                setStatedialogErrorMessage('');
            } else {
                setStatedialogErrorMessage('Brand already exists.')
            }
        }

        return (
            <form>
                <div className={`text-sm text-red-500 mb-2 ${!dialogErrorMessage ? 'hidden': ''}`}>{dialogErrorMessage}</div>
                <div className="flex flex-col mb-3">
                    <label>Brand Name</label>
                    <input required className="bg-gray-200 rounded focus:outline-none my-2 p-1" type="text" id="brandName" ref={brandRef}/>
                </div>
                <div className="flex items-center justify-end">
                    <button className="bg-blue-400 rounded-md border-2 border-blue-400 text-white p-1 text-base focus:outline-none" type="submit" onClick={submitNewBrand}>Submit</button>
                </div>
            </form>
        );
    }

    const HeaderActionContent = () => {
        return (
            <AddButton
                title="Add Brand"
                content={DialogContent}
            />
        );
    }

    return (
        <Fragment>
            {
                !Cookies.get('access_token') 
                ? <WarningDialog/>
                : isPending && !error
                    ? <Loading/>
                    : <Page
                        title="Brand"
                        headerAction={HeaderActionContent}
                        content={(
                            <Table
                                columns={[
                                    { title: 'ID', id: 'id'},
                                    { title: 'Name', id: 'brand_name'}
                                ]}
                                rows={brands}
                            />
                        )}
                    />
            }
        </Fragment>
    );
}

export default Brand;