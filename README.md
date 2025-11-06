# LinkedIn Clone - Professional Social Media Platform

A full-stack LinkedIn clone built with the MERN stack, featuring real-time messaging, post interactions, and a professional UI.

![LinkedIn Clone](https://img.shields.io/badge/MERN-Stack-blue) ![React](https://img.shields.io/badge/React-18.2-green) ![Node.js](https://img.shields.io/badge/Node.js-Express-brightgreen) ![MongoDB](https://img.shields.io/badge/MongoDB-Database-green) ![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📋 Project Overview

This is a fully functional LinkedIn clone that replicates core features of the professional social networking platform. Built with modern technologies and best practices for scalable full-stack development.

Deployed links:
Frontend: https://linkedin-clone-rust-three.vercel.app/
Backend: https://linkedin-clone-nijg.onrender.com/

---

## ✨ Features Implemented

### ✅ Core Requirements
- **User Authentication** - Secure JWT-based login/signup
- **Post Management** - Create, read, update, and delete posts
- **Feed System** - View all posts with latest first
- **Responsive Design** - Mobile-first professional UI

### 🎯 Bonus Features
- **Post Interactions** - Like and comment on posts
- **Post Management** - Edit and delete your own posts
- **Real-time Chat** - Socket.io powered messaging
- **Profile Management** - Editable user profiles
- **User Search** - Find and connect with other users
- **Image Upload** - Cloudinary integration for media
- **Static Pages** - Network, Jobs, Notifications pages

---

## 🛠 Tech Stack

### **Frontend**
| Technology | Purpose |
|------------|---------|
| React.js | UI framework |
| Vite | Build tool |
| Tailwind CSS | Styling |
| Axios | HTTP client |
| Socket.io-client | Real-time communication |
| Lucide React | Icons |

### **Backend**
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| Socket.io | Real-time features |
| Cloudinary | Image storage |
| bcryptjs | Password hashing |
| CORS | Cross-origin requests |

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js (v14 or higher)
- MongoDB Atlas account
- Cloudinary account

### **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/linkedin-clone.git
cd linkedin-clone
```

2. **Backend Setup**
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Add your environment variables
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install
```

### **Environment Variables**

**Backend (.env)**
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5001
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

### **Run the Application**

**Start Backend**
```bash
cd backend
npm start
# Server runs on http://localhost:5001
```

**Start Frontend**
```bash
cd frontend
npm run dev
# Client runs on http://localhost:5173
```

---

## 🔧 Key Features Deep Dive

### 🔐 Authentication & Security
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes
- Token expiration handling

### 💬 Real-time Chat
- Socket.io for real-time messaging
- Online/offline status
- Typing indicators
- Read receipts
- Message persistence

### 📝 Post System
- Rich text posts with images
- Like and comment functionality
- Edit and delete own posts
- Real-time post updates
- Image upload with Cloudinary

### 👤 User Profiles
- Editable profile information
- Professional headline
- Skills and experience
- Profile picture upload
- User search functionality

### 🎨 UI/UX Features
- LinkedIn-inspired design
- Fully responsive layout
- Smooth animations
- Professional color scheme
- Mobile-first approach

---

## 🤝 Contributing

1. **Fork the project**
2. **Create your feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

---

## 📝 Future Enhancements

- [ ] Video call integration
- [ ] Push notifications
- [ ] Advanced search filters
- [ ] Post analytics
- [ ] Group chats
- [ ] Job posting feature
- [ ] Email notifications

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Ashmit Rawat**

- Email: ashmitrawat44@gmail.com

---

## 🙏 Acknowledgments

- **LinkedIn** for design inspiration
- **MongoDB Atlas** for database hosting
- **Cloudinary** for image storage
- **Vercel/Netlify** for hosting
- The **React and Node.js** communities

---

<div align="center">

## ⭐ Don't forget to star this repository if you found it helpful!

### Built with ❤️ using the MERN Stack

</div>

---

### 📞 **Connect with Me**

<p align="center">
  <a href="https://github.com/Ashmit-A-Rawat">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />
  </a>
  <a href="https://www.linkedin.com/in/ashmit-rawat-2718a0320/">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" />
  </a>
  <a href="mailto:ashmitrawat44@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" />
  </a>
</p>
