import React, { useState } from 'react';
import usePostRequest from "../../customHooks/usePostRequest";

const UpdateProfilePicture = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    setSelectedFile(event.dataTransfer.files[0]);
  };

  const handleFileUpload = async () => {
    setErrorMsg(null);

    if (selectedFile && !uploading) {
      setUploading(true);

      const formData = new FormData();
      formData.append('file', selectedFile);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const { data, error, status } = await usePostRequest("http://localhost:8080/api/users/profilePicture", formData, config);

      if (error) {
        setErrorMsg(error);
      }

      setUploading(false);
    }

    if (!selectedFile) {
      setErrorMsg("Please, select a file.")
    }
  };

  return (
    <form enctype="multipart/form-data">
      <input type="file" name="file" onChange={handleFileSelect} />
      <div
        onDrop={handleFileDrop}
        onDragOver={(event) => event.preventDefault()}
        style={{
          width: '300px',
          height: '150px',
          border: '1px dashed #000',
          margin: '10px 0',
        }}
      >
        Arrastra y suelta un archivo aquí
      </div>
      {errorMsg && (
        <div>{errorMsg}</div>
      )}
      <button onClick={handleFileUpload} disabled={!selectedFile || uploading}>
        {uploading ? 'Subiendo...' : 'Subir archivo'}
      </button>
    </form>
  );
};

export default UpdateProfilePicture;