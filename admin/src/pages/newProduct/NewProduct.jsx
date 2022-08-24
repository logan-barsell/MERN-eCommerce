import "./newProduct.css";

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';
import { addProduct } from "../../redux/apiCalls";

export default function NewProduct() {
const [inputs, setInputs] = useState({});
const [file, setFile] = useState(null);
const [cat, setCat] = useState([]);
const dispatch = useDispatch();

const handleChange = (e) => {
  setInputs(prev => {
    return {...prev, [e.target.name]: e.target.value};
  });
};

const handleCategories = (e) => {
  setCat(e.target.value.split(','));
};

const handleSubmit = (e) => {
  e.preventDefault();
  const fileName = new Date().getTime() + file.name;
  const storage = getStorage(app);
  const metadata = {
    contentType: 'image/jpeg'
  };
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, 
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        const product = {...inputs, img: downloadURL, categories: cat};
        addProduct(product, dispatch);
      });
    }
  );
};


  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={e => setFile(e.target.files[0])}/>
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input name="title" type="text" placeholder="Apple Airpods" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input name="desc" type="text" placeholder="Tell us about the product..." onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input name="price" type="number" placeholder="100" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="jeans, skirts" onChange={handleCategories}/>
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button onClick={handleSubmit} className="addProductButton">Create</button>
      </form>
    </div>
  );
}
