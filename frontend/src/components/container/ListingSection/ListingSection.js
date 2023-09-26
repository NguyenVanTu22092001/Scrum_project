import { useState } from 'react';
import useCookie from 'react-use-cookie';

import apiClient from '../../../services/apiClient';

import imageUpload from "../../../assets/images/upload_image.jpg";

import { Spinner } from '../..';

const ListingSection = (props) => {
    const [userToken] = useCookie('token','0');

    const type = props.type;
    const product = props.type === 'create' ? [] : props.product;

    const [error, setError] = useState({});
    const [successMsg, setSuccessMsg] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const [imagePreview, setImagePreview] = useState(props.type === 'update' && props.product.image !== 'default.jpg' ? `http://localhost:8000/storage/images/products/thumb/${props.product.image}` : imageUpload);
    
    const [title, setTitle] = useState(product.title || '');
    const [description, setDescription] = useState(product.description || '');
    const [price, setPrice] = useState((parseFloat(product.price) / 100).toFixed(2) || '');
    const [stockUnit, setStockUnit] = useState(product.stock_unit  || '');
    const [categoryId, setCategoryId] = useState(product.categories_id  || '');
    const [image, setImage] = useState('');
    
    const handleImagePreview = (e) => {
        let image_as_base64 = URL.createObjectURL(e.target.files[0]);
        let image_as_files = e.target.files[0];
        setImagePreview(image_as_base64);
        setImage(image_as_files);
    }

    const create = async (event) => {
        event.preventDefault();

        setIsProcessing(true);

        let createFormData = new FormData();

        createFormData.append('image',image);
        createFormData.append('title',title);
        createFormData.append('description',description);
        createFormData.append('categories_id',categoryId);
        createFormData.append('price',`${parseFloat(price) * 100}`);
        createFormData.append('stock_unit',stockUnit);

        const res = await apiClient.post('/product/create',
            createFormData,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${userToken}`,
                    "Content-Type": `multipart/form-data; boundary=${createFormData._boundary}`
                }
            }
        );

        if (res.data.status === 'success') {
            setTitle('');
            setDescription('');
            setPrice('');
            setCategoryId('');
            setStockUnit('');
            setError({});
            setSuccessMsg(<div className={"success"}>Product successfully added to listings</div>);

            setIsProcessing(false);
        } 
        
        if (res.data.status === 'fail' && res.data.data.error) {
            setError(res.data.data.error);
            setSuccessMsg(null);
            setIsProcessing(false);
        }
    }

    const update = async (event) => {
        event.preventDefault();

        setIsProcessing(true);

        const editFormData = new FormData();

        editFormData.append('image',image);
        editFormData.append('title',title);
        editFormData.append('description',description);
        editFormData.append('categories_id',categoryId);
        editFormData.append('price',`${parseFloat(price) * 100}`);
        editFormData.append('stock_unit',stockUnit);

        const res = await apiClient.post( `/product/update/${product.id}`,
            editFormData,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${userToken}`,
                    "Content-Type": "multipart/form-data"
                }
            }
        );
        
        if (res.data.status === 'success') {
            setIsProcessing(false);
            setSuccessMsg(<div className={"success"}>Product is successfully updated</div>);
            setError({});
        } else if (res.data.error) {
            setIsProcessing(false);
            setSuccessMsg(null);
            setError(res.data.error);
        } 
    }

    return (
        <main id={"listingPage"}>
            <section className="title">
                { type === 'create' ? <p>Add Listing</p> : <p>Edit Listing</p> }
            </section>
            
            <section className="main-container">
                {/* <img src="http://localhost:8000/storage/images/products/thumb/1234576579987.jpg" /> */}
                <section className="left">
                    { successMsg ?
                        <section>
                            {successMsg}
                        </section>
                        : null
                    }
                    <img id={"uploadImage"}
                        className="uploadImage"
                        src={imagePreview}
                        alt="Upload"
                    />
                    <input 
                        id={"imageLoad"} 
                        type="file"
                        onChange={handleImagePreview}
                    />
                    { error.image ? <div className={"error"}>{error.image}</div> : null }
                </section>
                <form id={"listingForm"}>
                    <input
                        type={"text"}
                        placeholder={"Title"}
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    { error.title ? <div className={"error"}>{error.title}</div> : null }

                    <input
                        type={"text"}
                        placeholder={"Price"}
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    { error.price ? <div className={"error"}>{error.price}</div> : null }

                    <select 
                       value={categoryId}
                       onChange={e => setCategoryId(e.target.value)}
                    >
                        <option value="">Choose a category</option>
                        <option value="1">Category 1</option>
                        <option value="2">Category 2</option>
                        <option value="3">Category 3</option>
                        <option value="4">Category 4</option>
                        <option value="5">Category 5</option>
                    </select>

                    <textarea 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder={"Product description"}
                    />
                    { error.description ? <div className={"error"}>{error.description}</div> : null }

                    <input
                        type={"text"}
                        placeholder={"Number of units available"}
                        value={stockUnit}
                        onChange={e => setStockUnit(e.target.value)}
                    />
                    {error.stock_unit ? <div className={"error"}>{error.stock_unit}</div> : null}

                    {type === 'create' ?
                        !isProcessing ? <button name={"addProduct"} className={"btn"}  onClick={create}>Add</button> : <Spinner size={40}/>
                        :
                        !isProcessing ? <button name={"editProduct"} className={"btn"}  onClick={update}>Submit changes</button> : <Spinner size={40}/>
                    }
                </form>
            </section>
        </main>
    )
}

export default ListingSection;