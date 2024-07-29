document.addEventListener("DOMContentLoaded", () => {
  const dropArea = document.getElementById("dropArea");
  const fileInput = document.getElementById("fileInput");
  const filePreview = document.getElementById("filePreview");
  const uploadButton = document.getElementById("uploadButton");
  const loadFilesButton = document.getElementById("loadFilesButton");
  const filesList = document.getElementById("filesList");
  const dropAreaTitle = document.querySelector(".drop-area p");
  const body = document.querySelector("body");

  body.style.height = "100vh";

  dropArea.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropArea.classList.add("dragover");
  });

  dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("dragover");
  });

  dropArea.addEventListener("drop", (event) => {
    event.preventDefault();
    dropArea.classList.remove("dragover");

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      handleFiles(files);
      dropAreaTitle.style.display = "none";
      fileInput.files = files;
    }
  });

  dropArea.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      handleFiles(files);
    }
  });

  function handleFiles(files) {
    const file = files[0];
    filePreview.textContent = `Tamanho: ${(file.size / (1024 * 1024)).toFixed(
      2
    )} MB`;
    uploadButton.disabled = false;
    previewFile(file);

    body.style.height = "100%";
  }

  function previewFile(file) {
    filePreview.innerHTML = "";

    const fileContainer = document.createElement("div");
    fileContainer.classList.add("file-container");

    const fileDetails = document.createElement("ul");
    fileDetails.classList.add("file-details");
    fileDetails.innerHTML = `
            <li><strong>Nome:</strong> ${file.name}</li>
            <li><strong>Tamanho:</strong> ${(file.size / (1024 * 1024)).toFixed(
              2
            )} MB</li>
        `;
    fileContainer.appendChild(fileDetails);

    if (file.type.startsWith("image/")) {
      const image = document.createElement("img");
      image.src = URL.createObjectURL(file);
      image.alt = "Imagem do arquivo";
      image.style.maxWidth = "100%";
      fileContainer.appendChild(image);
    } else if (file.type.startsWith("video/")) {
      const video = document.createElement("video");
      video.src = URL.createObjectURL(file);
      video.controls = true;
      video.style.maxWidth = "100%";
      fileContainer.appendChild(video);
    }

    filePreview.appendChild(fileContainer);
  }

  document
    .getElementById("uploadForm")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const descriptionInput = document.getElementById("descriptionInput");

      const formData = new FormData();
      formData.append("file", fileInput.files[0]);
      formData.append("description", descriptionInput.value);

      try {
        const response = await fetch("http://localhost:3000/api/v1/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Erro no upload do arquivo");
        }

        const result = await response.json();
        console.log("Arquivo enviado com sucesso:", result);
      } catch (error) {
        console.error("Erro:", error);
      }
    });

  loadFilesButton.addEventListener("click", async () => {
    if (loadFilesButton.textContent === "Descarregar arquivos") {
      filesList.innerHTML = "";
      loadFilesButton.textContent = "Carregar arquivos";

      body.style.height = "100vh";
    } else {
      try {
        const response = await fetch("http://localhost:3000/api/v1/files", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Erro ao carregar os arquivos");
        }

        const files = await response.json();
        filesList.innerHTML = "";

        files.forEach((file) => {
          const fileContainer = document.createElement("div");
          fileContainer.classList.add("file-container");
          fileContainer.style.marginBottom = "20px";
          fileContainer.style.border = "1px solid rgba(240, 248, 255, 0.3)";

          const fileDetails = document.createElement("ul");
          fileDetails.classList.add("file-details");
          fileDetails.innerHTML = `
                        <li><strong>Nome:</strong> ${file.originalname}</li>
                        <li><strong>Tamanho:</strong> ${(
                          file.size /
                          (1024 * 1024)
                        ).toFixed(2)} MB</li>
                        <li><strong>Descrição:</strong> ${file.description}</li>
                    `;
          fileContainer.appendChild(fileDetails);

          if (file.mimetype.startsWith("image/")) {
            const image = document.createElement("img");
            image.src = `http://localhost:3000/api/v1/files/${file.filename}`;
            image.alt = "Imagem do arquivo";
            image.style.maxWidth = "100%";
            fileContainer.appendChild(image);
          } else if (file.mimetype.startsWith("video/")) {
            const video = document.createElement("video");
            video.src = `http://localhost:3000/api/v1/files/${file.filename}`;
            video.controls = true;
            video.style.maxWidth = "100%";
            fileContainer.appendChild(video);
          }

          filesList.appendChild(fileContainer);
        });

        body.style.height = "100%";
        loadFilesButton.textContent = "Descarregar arquivos";
      } catch (error) {
        console.error("Erro:", error);
      }
    }
  });
});
