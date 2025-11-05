LinkedIn Clone - Professional Social Media Platform
A full-stack LinkedIn clone built with the MERN stack, featuring real-time messaging, post interactions, and a professional UI.

https://img.shields.io/badge/LinkedIn-Clone-blue https://img.shields.io/badge/MERN-Stack-green https://img.shields.io/badge/Real--time-Chat-orange

📋 Project Overview
This is a fully functional LinkedIn clone that replicates core features of the professional social networking platform. Built with modern technologies and best practices.

✨ Features Implemented
✅ Core Requirements
User Authentication - Secure JWT-based login/signup

Post Management - Create, read, update, and delete posts

Feed System - View all posts with latest first

Responsive Design - Mobile-first professional UI

🎯 Bonus Features
Post Interactions - Like and comment on posts

Post Management - Edit and delete your own posts

Real-time Chat - Socket.io powered messaging

Profile Management - Editable user profiles

User Search - Find and connect with other users

Image Upload - Cloudinary integration for media

Static Pages - Network, Jobs, Notifications pages

🛠 Tech Stack
Frontend
React.js - UI framework

Vite - Build tool

Tailwind CSS - Styling

Axios - HTTP client

Socket.io-client - Real-time communication

Lucide React - Icons

Backend
Node.js - Runtime environment

Express.js - Web framework

MongoDB - Database

Mongoose - ODM

JWT - Authentication

Socket.io - Real-time features

Cloudinary - Image storage

bcryptjs - Password hashing

CORS - Cross-origin requests

🚀 Quick Start
Prerequisites
Node.js (v14 or higher)

MongoDB Atlas account

Cloudinary account

Installation
Clone the repository

git clone https://github.com/yourusername/linkedin-clone.git
cd linkedin-clone
Backend Setup

cd backend
npm install

# Create .env file
cp .env.example .env
# Add your environment variables
Frontend Setup

cd ../frontend
npm install
Environment Variables

Backend (.env)

env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5001
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
Run the Application

Start Backend

cd backend
npm start
# Server runs on http://localhost:5001
Start Frontend

cd frontend
npm run dev
# Client runs on http://localhost:5173
🔧 Key Features Deep Dive
🔐 Authentication & Security
JWT-based authentication

Password hashing with bcrypt

Protected routes

Token expiration handling

💬 Real-time Chat
Socket.io for real-time messaging

Online/offline status

Typing indicators

Read receipts

Message persistence

📝 Post System
Rich text posts with images

Like and comment functionality

Edit and delete own posts

Real-time post updates

Image upload with Cloudinary

👤 User Profiles
Editable profile information

Professional headline

Skills and experience

Profile picture upload

User search functionality

🎨 UI/UX Features
LinkedIn-inspired design

Fully responsive layout

Smooth animations

Professional color scheme

Mobile-first approach

🤝 Contributing
Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📝 Future Enhancements
Video call integration

Push notifications

Advanced search filters

Post analytics

Group chats

Job posting feature

Email notifications

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

👨‍💻 Author
Ashmit Rawat

GitHub: @ashmitrawat44

Email: ashmitsinghrawat44@gmail.com

🙏 Acknowledgments
LinkedIn for design inspiration

MongoDB Atlas for database hosting

Cloudinary for image storage

Vercel/Netlify for hosting

The React and Node.js communities

<div align="center">
⭐ Don't forget to star this repository if you found it helpful!
Built with ❤️ using the MERN Stack

</div>
