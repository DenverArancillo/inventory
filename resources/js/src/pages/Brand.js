import React, { Fragment, useState, useRef } from 'react';

import Page from '../components/Page';
import Loading from '../components/Loading';
import Table from '../components/Table';
import AddButton from '../components/AddButton';
import Dialog from '../components/Dialog';

import useFetch from '../utils/useFetch';
import fetchApi from '../utils/fetchApi';

const Brand = ({ match }) => {
    // match.params.id

    const { data: brands, isPending, error, setData: setStateBrands } = useFetch("/api/brands");
    const [addDialogErrorMessage, setStateAddDialogErrorMessage] = useState('');

    const [editDialogData, setStateEditDialogData] = useState({ open: false });
    const [editDialogErrorMessage, setStateEditDialogErrorMessage] = useState('');


    // add brand dialog input
    const brandRef = useRef();
    
    // edir brand dialog input
    const editDialogBrandNameRef = useRef();

    const addDialogContent = handleDialog => {
        const submitNewBrand = async event => {
            event.preventDefault();

            if (brandRef.current.value === '') {
                setStateAddDialogErrorMessage('Brand Name is required.');
                return;
            } 

            let brandName = brandRef.current.value;
            let response = await fetchApi('post', '/api/brands', { brand_name: brandName });

            if (response.data.status) {
                brandRef.current.form.reset();
                setStateBrands(response.data.brands);
                handleDialog(false);
                setStateAddDialogErrorMessage('');
            } else {
                setStateAddDialogErrorMessage('Brand already exists.')
            }
        }

        return (
            <form>
                <div className={`text-sm text-red-500 mb-2 ${!addDialogErrorMessage ? 'hidden': ''}`}>{addDialogErrorMessage}</div>
                <div className="flex flex-col mb-3">
                    <label>Brand Name</label>
                    <input required className="my-2 p-1 bg-gray-200 rounded border-2 border-gray-200 focus:outline-none focus:border-blue-400" type="text" id="brandName" ref={brandRef}/>
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
                content={addDialogContent}
            />
        );
    }

    const editDialogEvent = (event, data) => {
        event.preventDefault();

        console.log(data);

        editDialogBrandNameRef.current.value = data.brand_name;

        setStateEditDialogData({
            open: true,
            content: { ...data }
        });
    }

    const editDialogContent = (handleDialog) => {

        const submitEditBrand = async event => {
            event.preventDefault();

            if (editDialogBrandNameRef.current.value === editDialogData.content.brand_name) return;
            if (editDialogBrandNameRef.current.value === '') {
                setStateEditDialogErrorMessage('Brand Name is required.');
                return;
            }

            let brandName = editDialogBrandNameRef.current.value
            let response = await fetchApi('put', `/api/brands/${editDialogData.content.id}`, { brand_name: brandName });

            if (response.data.status) {
                editDialogBrandNameRef.current.form.reset();
                setStateBrands(response.data.brands);
                handleDialog(false);
                setStateEditDialogErrorMessage('');
            } else {
                setStateEditDialogErrorMessage(response.data.message);
            }
        }

        return (
            <form>
                <div className={`text-sm text-red-500 mb-2 ${!editDialogErrorMessage ? 'hidden': ''}`}>{editDialogErrorMessage}</div>
                <div className="flex flex-col mb-3">
                    <label>Brand Name</label>
                    <input required ref={editDialogBrandNameRef} className="my-2 p-1 bg-gray-200 rounded border-2 border-gray-200 focus:outline-none focus:border-blue-400" type="text" id="brandName"/>
                </div>
                <div className="flex items-center justify-end">
                    <button className="bg-blue-400 rounded-md border-2 border-blue-400 text-white p-1 text-base focus:outline-none" type="submit" onClick={submitEditBrand}>Submit</button>
                </div>
            </form>
        )
    }

    return (
        <Fragment>
            <Dialog
                title="Edit Brand"
                content={editDialogContent}
                state={editDialogData.open}
                handleDialog={setStateEditDialogData}
            />
            {
                isPending && !error
                ? <Loading/>
                : <Page
                    title="Brand"
                    headerAction={HeaderActionContent}
                    content={(
                        <Table
                            rows={brands}
                            columns={[
                                { title: 'ID', id: 'id', style: "" },
                                { title: 'Name', id: 'brand_name', style: "" }
                            ]}
                            actions={[
                                { title: "Edit", icon: "", event: editDialogEvent },
                                { title: "Delete", icon: "", event: (event, data) => { console.log(data) } },
                            ]}
                        />
                    )}
                />
            }
        </Fragment>
    );
}

export default Brand;