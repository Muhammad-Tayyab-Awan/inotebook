### How to Run Backend

1. **Frontend Setup**: Once you have completed the frontend setup, open a terminal and navigate to the backend folder.

2. **Install Dependencies**: Run the following command to install all necessary Node.js dependencies:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:

   - Create a new file named `.env` in the backend folder.
   - Add the following environment variables to the `.env` file:
     ```plaintext
     JWT_SECRET=C0D1GIS8ES7
     DB_URL=<Your MongoDB URL>
     ```
     - Replace `<Your MongoDB URL>` with the link to your MongoDB database (either MongoDB Atlas or your local MongoDB).

4. **Run the Backend Server**: To start the development environment, use the following command:

   ```bash
   npm run dev
   ```

   This will start the backend server on your local machine at:

   ```plaintext
   https://localhost:8080
   ```

---

## API Documentation

### Authentication Routes

|        Route        |                   Description                    | Method |
| :-----------------: | :----------------------------------------------: | :----: |
| `/api/auth/signup`  |               Register a new user                |  POST  |
|  `/api/auth/login`  |             Log in an existing user              |  POST  |
| `/api/auth/getuser` | Retrieve specific user data (excluding password) |  POST  |

### Notes Routes

|          Route           |             Description              | Method |
| :----------------------: | :----------------------------------: | :----: |
| `/api/notes/getallnotes` | Get all notes for the logged-in user |  GET   |
|   `/api/notes/addnote`   |            Add a new note            |  POST  |
| `/api/notes/update/:id`  |     Update a specific note by ID     |  PUT   |
| `/api/notes/delete/:id`  |     Delete a specific note by ID     | DELETE |

---

This version improves clarity, structure, and consistency while providing all the necessary information for setting up and running the backend server.
