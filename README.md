# **MERN Chat Application**

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue)  
![Socket.io](https://img.shields.io/badge/Socket.io-RealTime-green)  
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)  
![Material-UI](https://img.shields.io/badge/Material--UI-Design-yellow)

A real-time chat application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) with **Socket.io** for real-time communication. The application features user authentication using **JSON Web Tokens (JWT)** and a modern UI powered by **Material-UI**.

---


Features
Real-time messaging using Socket.io.

User authentication (login/signup) with JWT.

Protected routes for authenticated users.

Material-UI for a clean and responsive user interface.

Backend API built with Express.js and Node.js.

MongoDB for database storage.

State management using React Context API or Redux (optional).

Responsive design for mobile and desktop.

Technologies Used
Frontend: React.js, Material-UI, Socket.io Client.

Backend: Node.js, Express.js, Socket.io, JWT.

Database: MongoDB (with Mongoose for schema modeling).

Authentication: JSON Web Tokens (JWT).

Real-time Communication: Socket.io.

Deployment: (Optional) Heroku, Netlify, Vercel, or AWS.

Project Structure
Copy
``` mern-chat-app/
├── frontend/                  # Frontend (React.js)
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # React Context for state management
│   │   ├── pages/           # Application pages (Login, Signup, Chat)
│   │   ├── App.js           # Main application component
│   │   ├── index.js         # Entry point
│   ├── package.json
│
├── backend/                  # Backend (Node.js + Express.js)
│   ├── config/              # Configuration files (e.g., database, JWT)
│   ├── controllers/         # Route controllers
│   ├── models/              # MongoDB models (Mongoose)
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions (e.g., JWT, validation)
│   ├── app.js               # Express application setup
│   ├── server.js            # Server entry point
│   ├── package.json
│
├── .gitignore               # Git ignore file
├── README.md                # Project documentation
```


Setup Instructions
Prerequisites
Node.js and npm installed on your machine.

MongoDB Atlas account or a local MongoDB instance.

1. Clone the Repository
bash
Copy
git clone https://github.com/vishnu-13-97/ChatApp.git
cd ChatApp
2. Set Up the Backend
Navigate to the server folder:

bash
Copy
cd server
Install dependencies:

bash
Copy
npm install
Create a .env file in the server folder and add the following environment variables:

env
Copy
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/chat-app?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
Start the backend server:

bash
Copy
npm start
3. Set Up the Frontend
Navigate to the client folder:

bash
Copy
cd ../client
Install dependencies:

bash
Copy
npm install
Start the React development server:

bash
Copy
npm start
4. Run the Application
The backend will run on http://localhost:5000.

The frontend will run on http://localhost:3000.

Open your browser and navigate to http://localhost:3000 to use the application.

API Endpoints
Authentication
POST /api/auth/register - Register a new user.

POST /api/auth/login - Log in an existing user.

Chat
GET /api/chat/messages - Fetch all messages.

POST /api/chat/messages - Send a new message.



Contributing
Contributions are welcome! If you'd like to contribute:

Fork the repository.

Create a new branch (git checkout -b feature/YourFeatureName).

Commit your changes (git commit -m 'Add some feature').

Push to the branch (git push origin feature/YourFeatureName).

Open a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments
Socket.io for real-time communication.

Material-UI for UI components.

JWT for authentication.
