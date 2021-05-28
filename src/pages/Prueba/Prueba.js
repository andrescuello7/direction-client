import { useState } from 'react'
import axios from 'axios'
//import cloudinary from 'cloudinary'

const Prueba = () => {
  const [imagenSelected, setImagenSelected] = useState("");

  /*cloudinary.config({
    cloud_name: 'five-drive',
    api_key: '344281585379365',
    api_secret: 'XidhqoCaoPpBPkUmzG8G-y1lzjg',
  })*/

  const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imagenSelected);
    formData.append("upload_preset", "w8igzqq1");
    axios.post("https://api.cloudinary.com/v1_1/five-drive/image/upload", formData).then((response) => {console.log(response)})
  }
  return (
    <div>
      <div>
        <input type="file" onChange={(event) => {
          setImagenSelected(event.target.files[0]);
        }}/>
      </div>
      <div>
        <button onClick={uploadImage}>save</button>
      </div>
      <div>
        <img src="https://api.cloudinary.com/v1_1/five-drive/image/upload" alt="" />
      </div>
    </div>
  );
};
export default Prueba;
