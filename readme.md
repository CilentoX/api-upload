# API Documentation

This document provides an overview of the available endpoints for the file management API. The API allows you to upload, view, and delete files. It also comes with a frontend for testing the endpoints.

## Base URL

```
http://localhost:3000/api/v1
```

## Endpoints

### 1. Ping

**Endpoint:** `/ping`  
**Method:** `GET`  
**Description:** Checks the status of the API.  
**Response:**

```text
pong
```

### 2. Upload File

**Endpoint:** `/upload`  
**Method:** `POST`  
**Description:** Uploads a file to the server.  
**Request:**
- **Content-Type:** `multipart/form-data`
- **Body:**
  - `file`: The file to be uploaded (required).
  - `description`: Optional description for the file.

**Example Request:**

```http
POST /upload
Content-Type: multipart/form-data

file: [file]
description: [optional description]
```

**Response:**

```json
{
  "filename": "uploaded_file_name.ext"
}
```

### 3. Get All Files

**Endpoint:** `/files`  
**Method:** `GET`  
**Description:** Retrieves a list of all files stored in the database.  
**Response:**

```json
[
  {
    "filename": "file_name.ext",
    "originalname": "original_file_name.ext",
    "size": 123456,
    "description": "File description",
    "mimetype": "file/mimetype"
  },
  ...
]
```

### 4. Get File by Filename

**Endpoint:** `/files/:filename`  
**Method:** `GET`  
**Description:** Retrieves a specific file by its filename.  
**Path Parameter:**
- `filename`: The name of the file to retrieve.

**Response:** The file is served directly as a response. The content type will be determined based on the file's MIME type.

### 5. Delete File by Filename

**Endpoint:** `/files/:filename`  
**Method:** `DELETE`  
**Description:** Deletes a specific file by its filename.  
**Path Parameter:**
- `filename`: The name of the file to delete.

**Response:**

```json
{
  "message": "File deleted"
}
```

### 6. Delete All Files

**Endpoint:** `/files`  
**Method:** `DELETE`  
**Description:** Deletes all files from the database and the file system.  
**Response:**

```json
{
  "message": "All files deleted"
}
```

## Frontend for Testing

The API includes a frontend application that allows you to interact with the endpoints for testing purposes. You can use this frontend to:

- Upload files
- View file details
- Preview uploaded files
- Delete specific files
- Clear all files

To start the frontend application, follow these steps:

1. **Install Dependencies:**

   Navigate to the frontend directory and install the required dependencies:

   ```bash
   npm install
   ```

2. **Run the Frontend:**

   Start the frontend development server:

   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000`.

## Configuration

### Environment Variables

Ensure that the following environment variables are set:

- `PORT`: Port on which the server will listen (optional, defaults to 3000).
- `MONGO_USER`: MongoDB username.
- `MONGO_PASS`: MongoDB password.

**Example `.env` File:**

```
PORT=3000
MONGO_USER=your_mongo_user
MONGO_PASS=your_mongo_password
```

## Getting Started

To start the server, run:

```bash
npm start
```

The server will be available at `http://localhost:3000`.

## Dependencies

The following dependencies are required:

- `express`
- `body-parser`
- `cors`
- `multer`
- `mongoose`
- `dotenv`

Install them using:

```bash
npm install
```

## License

This project is licensed under the [MIT License](LICENSE).

---

For any questions or issues, please open an issue on the project's repository.
