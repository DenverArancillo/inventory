import React, { Fragment, useState, useEffect, useRef } from 'react';

import Page from '../components/Page';
import Loading from '../components/Loading';
import Table from '../components/Table';
import AddButton from '../components/AddButton';
import Dialog from '../components/Dialog';

import useFetch from '../utils/useFetch';
import fetchApi from '../utils/fetchApi';

import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';

const ProductTypes = ({ match }) => {
    // match.params.id

    const { data: productTypes, isPending, error, setData: setStateProductTypes } = useFetch("/api/product-types");

    const [loading, setStateLoading] = useState(true);

    const [addDialogErrorMessage, setStateAddDialogErrorMessage] = useState('');

    const [editDialogData, setStateEditDialogData] = useState({ open: false });
    const [editDialogErrorMessage, setStateEditDialogErrorMessage] = useState('');

    const [deleteDialogData , setStateDeleteDialogData] = useState({ open: false });

    useEffect(() => {
        if (!isPending) setStateLoading(false);
    }, [isPending]);

    // add brand dialog input
    const productType = useRef();
    // edit brand dialog input
    const editDialogProductTypeRef = useRef();

    const addDialogContent = handleDialog => {
        const submitNewBrand = async event => {
            event.preventDefault();

            if (productType.current.value === '') {
                setStateAddDialogErrorMessage('Product type is required.');
                return;
            } 

            setStateLoading(true);

            let type = productType.current.value;
            let response = await fetchApi('post', '/api/product-types', { type });

            if (response.data.status) {
                productType.current.form.reset();
                setStateProductTypes(response.data.productTypes);
                handleDialog(false);
                setStateLoading(false);
                setStateAddDialogErrorMessage('');
            } else {
                setStateLoading(false);
                setStateAddDialogErrorMessage('Product type already exists.')
            }
        }

        return (
            <form>
                <div className={`text-sm text-red-500 mb-2 ${!addDialogErrorMessage ? 'hidden': ''}`}>{addDialogErrorMessage}</div>
                <div className="flex flex-col mb-3">
                    <label>Product type</label>
                    <input required className="my-2 p-1 bg-gray-200 rounded border-2 border-gray-200 focus:outline-none focus:border-blue-400" type="text" id="productType" ref={productType}/>
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
                title="Add Product type"
                content={addDialogContent}
            />
        );
    }

    const editDialogEvent = (event, data) => {
        editDialogProductTypeRef.current.value = data.type;

        setStateEditDialogData({
            open: true,
            content: { ...data }
        });
    }

    const editDialogContent = (handleDialog) => {
        const submitEditBrand = async event => {
            event.preventDefault();

            if (editDialogProductTypeRef.current.value === editDialogData.content.type) return;
            if (editDialogProductTypeRef.current.value === '') {
                setStateEditDialogErrorMessage('Brand Name is required.');
                return;
            }

            setStateLoading(true);

            let type = editDialogProductTypeRef.current.value;
            let response = await fetchApi('put', `/api/product-types/${editDialogData.content.id}`, { type });

            if (response.data.status) {
                editDialogProductTypeRef.current.form.reset();
                setStateProductTypes(response.data.productTypes);
                handleDialog(false);
                setStateLoading(false);
                setStateEditDialogErrorMessage('');
            } else {
                setStateLoading(false);
                setStateEditDialogErrorMessage(response.data.message);
            }
        }

        return (
            <form>
                <div className={`text-sm text-red-500 mb-2 ${!editDialogErrorMessage ? 'hidden': ''}`}>{editDialogErrorMessage}</div>
                <div className="flex flex-col mb-3">
                    <label>Product type</label>
                    <input required ref={editDialogProductTypeRef} className="my-2 p-1 bg-gray-200 rounded border-2 border-gray-200 focus:outline-none focus:border-blue-400" type="text" id="productType"/>
                </div>
                <div className="flex items-center justify-end">
                    <button className="bg-blue-400 rounded-md border-2 border-blue-400 text-white p-1 text-base focus:outline-none" type="submit" onClick={submitEditBrand}>Submit</button>
                </div>
            </form>
        )
    }

    const deleteDialogEvent = (event, data) => {
        setStateDeleteDialogData({
            open: true,
            content: { ...data }
        })
    }

    const deleteDialogContent = (handleDialog) => {
        const deleteBrand = async event => {
            event.preventDefault();

            setStateLoading(true);

            let response = await fetchApi('delete', `/api/product-types/${deleteDialogData.content.id}`);

            if (response.data.status) {
                setStateProductTypes(response.data.productTypes);
                handleDialog(false);
                setStateLoading(false);
            }
        }

        const cancelDialog = (event) => {
            event.preventDefault();
            handleDialog(false);
        }

        return (
            <form>
                <div className="flex flex-col mb-5">
                    {/* optional chaining, content property is not set on state */}
                    Delete brand {deleteDialogData?.content?.type}?
                </div>
                <div className="flex items-center justify-center">
                    <button className="bg-blue-400 rounded-md border-2 border-blue-400 text-white p-1 text-base focus:outline-none mr-2" type="submit" onClick={deleteBrand}>Delete</button>
                    <button className="rounded-md border-2 p-1 text-base focus:outline-none ml-2" type="submit" onClick={cancelDialog}>Cancel</button>
                </div>
            </form>
        )
    }

    return (
        <Fragment>
            {/* dialogs */}
            <Dialog
                title="Edit Product type"
                content={editDialogContent}
                state={editDialogData.open}
                handleDialog={setStateEditDialogData}
            />
            <Dialog
                title="Delete Product type"
                content={deleteDialogContent}
                state={deleteDialogData.open}
                handleDialog={setStateDeleteDialogData}
            />

            <Loading state={loading}/>
            <Page
                title="Product types"
                headerAction={HeaderActionContent}
                content={(
                    <Table
                        isLoading={loading}
                        rows={productTypes}
                        columns={[
                            { title: 'ID', id: 'id', style: "" },
                            { title: 'Name', id: 'type', style: "" }
                        ]}
                        actions={[
                            { title: "Edit", icon: () => <PencilAltIcon className="h-4 w-4 focus:outline-none"/>, event: editDialogEvent },
                            { title: "Delete", icon: () => <TrashIcon className="h-4 w-4 focus:outline-none"/> , event: deleteDialogEvent },
                        ]}
                    />
                )}
            />
        </Fragment>
    );
}

export default ProductTypes;