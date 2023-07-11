import React, { useState } from 'react';

const UpdateProfilePicture = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    setSelectedFile(event.dataTransfer.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile && !uploading) {
      setUploading(true);

      const formData = new FormData();
      formData.append('file', selectedFile);

      fetch('/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          // Manejar la respuesta del servidor
          console.log(data);
        })
        .catch((error) => {
          // Manejar errores
          console.error(error);
        })
        .finally(() => {
          setUploading(false);
        });
    }
  };

  return (
    <div>
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
      <button onClick={handleFileUpload} disabled={!selectedFile || uploading}>
        {uploading ? 'Subiendo...' : 'Subir archivo'}
      </button>
    </div>
  );
};

export default UpdateProfilePicture;