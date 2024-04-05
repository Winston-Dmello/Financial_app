import React, { useState } from "react";

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  let userId = localStorage.getItem("UserID");
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `http://localhost:8000/${userId}/upload_file/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.status == 200) {
        setUploadSuccess(true);
      } else {
        console.error("Upload failed");
      }
    } catch (error) {
      console.error("Error occurred during upload:", error);
    }
  };

  return (
    <div>
      <h2>Upload CSV File</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {uploadSuccess && <p>File uploaded successfully</p>}
    </div>
  );
};

export default FileUploader;
