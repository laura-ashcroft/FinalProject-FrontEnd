import React, { useState } from "react";

//styling
import style from "./upload.module.css";
import cn from "classnames";

// Font-awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";

export default function UploadImage({ setImageSelected }) {
  // const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const [uploaded, setUploaded] = useState(false);

  function fileInput(e) {
    const file = e.target.files[0];
    const FileSize = e.target.files[0].size;

    if (FileSize > 9777777) {
      alert(
        "File is too large, please upload an image that's less than 10 MiB"
      );
      return;
    }

    previewFile(file);
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const submitImage = (e) => {
    e.preventDefault();
    if (!previewSource) {
      return alert("please select an image to upload");
    }
    setImageSelected(previewSource);
    setUploaded(true);
    // uploadImage(previewSource);
  };

  // const uploadImage = async (base64EncodedImage) => {
  //   console.log(base64EncodedImage);

  //   await fetch(`http://localhost:3000/users/imageupload`, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       image: base64EncodedImage,
  //     }),
  //     headers: { "content-type": "application/json" },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log("this is the image upload data: ", data))
  //     .catch((error) => console.log("image upload error: ", error));
  // };

  return (
    <div>
      <label for="fileUpload">
        <div
          style={{ width: "auto" }}
          className={cn(style.uploadButton, "button-blue", "marginBottom")}
        >
          <FontAwesomeIcon icon={faCloudUploadAlt} /> Choose Event Image
        </div>
      </label>
      <input
        type="file"
        onChange={fileInput}
        value={selectedFile}
        className={cn(style.inputButton)}
        id="fileUpload"
      />
      {previewSource && (
        <img
          src={previewSource}
          alt="user uploaded document"
          className={style.img}
        />
      )}

      {!uploaded && (
        <button onClick={submitImage} className="button maxWidth">
          Upload Image
        </button>
      )}

      {uploaded && (
        <button
          onClick={submitImage}
          className={cn(style.buttonComplete, "maxWidth")}
        >
          <i class="fas fa-check"></i> Upload Successful
        </button>
      )}
    </div>
  );
}

// import React, { useState } from "react";
// const axios = require("axios");

// function ReactUploadImage() {
//   const [image, setImage] = useState({ file: null });

//   function onFormSubmit(e) {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("myImage", image.file);

//     console.log(formData);
//     console.log(image);

//     const config = {
//       headers: {
//         "content-type": "multipart/form-data",
//       },
//     };
//     axios
//       .post(
//         "https://falcon5ives.herokuapp.com/users/upload",
//         formData,
//         config,
//         console.log(config)
//       )
//       .then((response) => {
//         alert("The file is successfully uploaded", console.log(response));
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   function onChange(e) {
//     console.log("e.target.value", e.target.value);
//     setImage(e.target.files[0].name);
//     console.log(
//       "e.target.files[0]): ",
//       setImage({ file: e.target.files[0].name })
//     );
//     console.log("image: ", image);
//   }

//   return (
//     <form onSubmit={onFormSubmit}>
//       <h1>File Upload</h1>
//       <input type="file" name="myImage" onChange={onChange} />
//       <button type="submit">Upload</button>
//     </form>
//   );
// }

// export default ReactUploadImage;
