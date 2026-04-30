# 📝 MERN Blog Application

🚀 Live Demo:
👉 https://my-blog-app-pearl-psi.vercel.app

📂 GitHub Repository:
👉 https://github.com/surajsingh-tech/My_BLog_App

---

## 📌 Overview

This is a full-stack **MERN Blog Application** where users can create, read, update, and delete blog posts with secure authentication and email verification.

The application follows best practices like JWT authentication, protected routes, OTP-based password recovery, and cloud-based image storage.

---

## ✨ Features

### 🔐 Authentication & Security

- User Signup & Login
- Email Verification (Token-based)
- JWT Authentication (Access + Refresh Token)
- Session Management
- Protected Routes
- Logout functionality

---

### 📝 Blog Features

- Create Blog (with Image Upload)
- Read All Blogs
- Read Single Blog
- Update Blog (only own blogs)
- Delete Blog (only own blogs)
- User-specific Blogs (Dashboard view)

---

### 👤 User Features

- Update Profile (username + profile image)
- Upload profile image (Cloudinary)
- Create and manage personal blogs
- Access personal dashboard
- Only allowed to modify their own content

---

### 🔑 Password Recovery

- Forgot Password
- OTP Verification (Email-based)
- Change Password securely

---

### 📬 Contact System

- Contact form with validation
- Stores user queries in database

---

## 🔑 Demo Access

You can test the application using:

**Option 1:** Create your own account using Signup

**Option 2:** Use demo account

Email: bangarisuraj7579@gmail.com
Password: Suraj@123

---

## 🛠️ Tech Stack

### Frontend:

- React.js
- React Router DOM
- Tailwind CSS
- shadcn/ui
- Axios
- React Toastify

---

### Backend:

- Node.js
- Express.js
- MongoDB + Mongoose

---

### Other Tools:

- Cloudinary (Image Upload)
- JWT (Authentication)
- bcrypt (Password Hashing)
- Nodemailer (Email / OTP)
- Multer (File Upload)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash id="azq9d0"
git clone https://github.com/surajsingh-tech/My_BLog_App.git
cd My_BLog_App
```

---

### 2️⃣ Install dependencies

#### Backend:

```bash id="u9pssr"
cd backend
npm install
```

#### Frontend:

```bash id="gmbw9t"
cd frontend
npm install
```

---

### 4️⃣ Run the project

#### Backend

#### Backend (Development):

npm run dev

#### Backend (Production):

npm start

#### Frontend:

npm run dev

## 🔗 API Base URL

https://my-blog-app-m6dr.onrender.com/api

---

## 🔒 Protected Routes (Frontend)

- /dashboard
- /profile
- /readblog/:id

---

## 🔗 API Endpoints

### 🧑‍💻 User Routes

| Method | Endpoint                         | Description     | Auth |
| ------ | -------------------------------- | --------------- | ---- |
| POST   | /api/user/register               | Register user   | ❌   |
| POST   | /api/user/login                  | Login user      | ❌   |
| POST   | /api/user/verify                 | Verify email    | ❌   |
| POST   | /api/user/logout                 | Logout user     | ✅   |
| POST   | /api/user/forget-password        | Send OTP        | ❌   |
| POST   | /api/user/verify-otp/:email      | Verify OTP      | ❌   |
| POST   | /api/user/change-password/:email | Change password | ❌   |
| POST   | /api/user/profile-update         | Update profile  | ✅   |

---

### 📝 Blog Routes

| Method | Endpoint                     | Description     | Auth |
| ------ | ---------------------------- | --------------- | ---- |
| GET    | /api/blog/all                | Get all blogs   | ❌   |
| GET    | /api/blog/singleBlog/:blogId | Get single blog | ✅   |
| GET    | /api/blog/userblogs          | Get user blogs  | ✅   |
| POST   | /api/blog/create             | Create blog     | ✅   |
| PUT    | /api/blog/update/:blogId     | Update own blog | ✅   |
| DELETE | /api/blog/delete/:blogId     | Delete own blog | ✅   |

---

### 📬 Contact Routes

| Method | Endpoint          | Description          | Auth |
| ------ | ----------------- | -------------------- | ---- |
| POST   | /api/contact/send | Send contact message | ✅   |

---

## 🔐 Authentication Note

- ✅ = Requires JWT token (Protected route)
- ❌ = Public route

Users can only update or delete their own blogs (authorization applied).

## 🧠 Key Learnings

- Built a full-stack MERN application
- Implemented secure authentication using JWT
- Designed OTP-based password recovery system
- Integrated Cloudinary for image handling
- Implemented role-based data control (users can only manage their own blogs)
- Created protected routes in React
- Followed REST API best practices

---

## 📸 Screenshots

### 🏠 Home Page
![Home](./screenshots/home_page.png)

### 🔐 Login Page
![Login](./screenshots/login_page.png)

### 📊 Dashboard
![Dashboard](./screenshots/dashboard.png)

### 📝 User Blogs
![User Blogs](./screenshots/dashboard_user_blogs.png)


## 🚀 Future Improvements

- Add comments system
- Like & bookmark feature
- Admin dashboard
- Blog search & filtering
- Pagination

---

## 👨‍💻 Author

**Suraj Singh (Web Tech)**

---

## ⭐ Conclusion

This project demonstrates a production-ready MERN stack application with authentication, authorization, cloud integrations, and real-world features like blog management and user-specific access control.

---
