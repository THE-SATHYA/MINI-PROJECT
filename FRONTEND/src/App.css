document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("fileInput");
    const uploadButton = document.getElementById("uploadButton");
    const resultContainer = document.getElementById("resultContainer");

    fileInput.addEventListener("change", function () {
        uploadButton.disabled = !fileInput.files.length;
    });

    uploadButton.addEventListener("click", function () {
        if (!fileInput.files.length) {
            alert("Please select a file to upload.");
            return;
        }

        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append("file", file);

        resultContainer.innerHTML = "Uploading...";

        fetch("/upload", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            resultContainer.innerHTML = `<strong>Upload Successful!</strong><br>File Name: ${data.fileName}<br>Size: ${data.fileSize} bytes`;
        })
        .catch(error => {
            console.error("Error uploading file:", error);
            resultContainer.innerHTML = "<strong>Error uploading file. Please try again.</strong>";
        });
    });
});
