# fastapi-todo-app
# FastAPI To-Do List App

A simple To-Do List application built using FastAPI for the backend and React with Material UI for the frontend. It allows users to create and delete notes, with data stored in a MongoDB database.

## Features

- Add and delete notes
- FastAPI backend with MongoDB
- React frontend using Material UI
- CORS enabled for API requests

## Prerequisites

Make sure you have the following installed:

- [Python 3.8+](https://www.python.org/downloads/)
- Node.js and npm
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Git](https://git-scm.com/)

## Installation

### Backend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/fastapi-todo-app.git
   cd fastapi-todo-app
   ```
2. Create a virtual environment and activate it:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
4. Start MongoDB (ensure it is running on `mongodb://localhost:27017`).
5. Run the FastAPI server:
   ```sh
   uvicorn main:app --reload
   ```
6. API will be available at `http://localhost:8000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React app:
   ```sh
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser.

## API Endpoints

| Method | Endpoint      | Description         |
| ------ | ------------- | ------------------- |
| GET    | `/notes/`     | Fetch all notes     |
| POST   | `/notes/`     | Add a new note      |
| DELETE | `/notes/{id}` | Delete a note by ID |



## License

This project is licensed under the MIT License.

---

Feel free to update this README as needed!

