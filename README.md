# iNotebook

## An Online Notekeeping Application

**iNotebook** is a responsive online platform where users can manage their notes securely on the cloud. The application offers features like registration, login, note management, and a theme toggle between dark and light modes.

---

### Features

- **User Registration**: Create a personal account to manage your notes.
- **Note Management**: Add, edit, and delete notes. Each note includes:
  - A title
  - A description
  - A tag (default is "General")
- **Read Note**: You can also read a particular note with detail.
- **Daily Limit**: Each user can daily add only **50** notes.
- **Filter**: User can also filter notes by tags.
- **Account Sidebar**: User can easily see his profile details by opening that sidebar.
- **Update Profile**: User can also update his profile information (name, email).
- **404 Page Not Found**: Also shows 404 error incase of wrong page request.
- **Theme Switcher**: Toggle between light and dark themes.
- **Responsive Design**: The site is fully responsive across different screen sizes.
- **Authentication**: Login and logout functionality for secure access.

---

### Getting Started

#### Steps to run iNotebook on your local machine

1. **Clone the repository**  
   Open a terminal and run the following command:

   ```bash
   git clone https://github.com/Muhammad-Tayyab-Awan/inotebook
   ```

2. **Open the project**  
   Use your favorite code editor to open the cloned repository.

3. **Install dependencies**  
   Navigate to the project folder in your terminal and install the required Node.js dependencies:

   ```bash
   npm install
   ```

4. **Run the development server**  
   Start the frontend development server by running:

   ```bash
   npm run dev
   ```

   Make sure **npm** is installed on your system.

   After running the command, the frontend will be hosted locally, and a link to the app will appear in the terminal.

   **Access the frontend at:**

   ```https
   http://localhost:5173
   ```

### Backend Setup

To start the backend server, follow the instructions provided in the [Backend Guide](./backend/Backend.md).

---

### Technologies Used in **iNotebook**

#### Frontend

- **React.js**:

  - React Router DOM (for routing)
  - React Top Loading Bar (for progress indication)
  - React Hot Toast (for notifications)

- **Tailwind CSS**: For building the UI with responsive design.

#### Backend

- **Express.js**: For building the server-side logic.
- **Mongoose**: For managing MongoDB interactions.
