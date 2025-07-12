# Team Name: The Code Cartel
# Topic: Skill Swap Platform

## 🚀 Skill Swap Platform

A modern web application that enables users to list their skills and request skill swaps with others in the community.

### ✨ Features

#### Core Features
- **User Profiles**: Name, location, profile photo, skills offered/wanted, availability
- **Skill Management**: List skills you can teach and skills you want to learn
- **Privacy Controls**: Make profiles public or private
- **Search & Browse**: Find users by skills, location, or availability
- **Swap Requests**: Send, accept, reject, and manage skill swap requests
- **Rating System**: Provide feedback after completed swaps
- **Admin Panel**: Content moderation and platform management

#### User Experience
- Modern, responsive UI with beautiful design
- Real-time notifications for swap requests
- Advanced search and filtering capabilities
- Rating and feedback system
- Profile customization options

### 🛠 Tech Stack

- **Frontend**: React.js with TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js with Express, TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens
- **File Upload**: Multer for profile photos
- **Real-time**: Socket.io for notifications

### 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TheCodeCartel_OdooHackathon
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Backend environment variables
   cd backend
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   ```

4. **Run the application**
   ```bash
   # Start backend server (from backend directory)
   npm run dev

   # Start frontend (from frontend directory)
   npm start
   ```

### 🎯 API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

#### Users & Profiles
- `GET /api/users` - Get all public users
- `GET /api/users/:id` - Get specific user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/upload-photo` - Upload profile photo

#### Skills
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Add skill to user profile
- `DELETE /api/skills/:id` - Remove skill from profile

#### Swap Requests
- `POST /api/swaps/request` - Send swap request
- `GET /api/swaps/received` - Get received requests
- `GET /api/swaps/sent` - Get sent requests
- `PUT /api/swaps/:id/accept` - Accept swap request
- `PUT /api/swaps/:id/reject` - Reject swap request
- `DELETE /api/swaps/:id` - Delete swap request

#### Admin
- `GET /api/admin/users` - Get all users (admin only)
- `PUT /api/admin/users/:id/ban` - Ban user (admin only)
- `GET /api/admin/reports` - Get platform reports (admin only)

### 🏗 Project Structure

```
TheCodeCartel_OdooHackathon/
├── backend/                 # Backend API server
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── utils/          # Utility functions
│   │   └── app.ts          # Main server file
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom hooks
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   └── App.tsx        # Main app component
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

### 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark/Light Mode**: Toggle between themes
- **Smooth Animations**: Framer Motion for delightful interactions
- **Loading States**: Skeleton loaders and progress indicators
- **Error Handling**: User-friendly error messages
- **Accessibility**: WCAG compliant design

### 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting on API endpoints
- CORS configuration
- File upload security

### 📊 Database Schema

#### User Model
- Basic info (name, email, location, bio)
- Profile photo URL
- Skills offered and wanted arrays
- Availability settings
- Privacy settings
- Rating and feedback

#### Swap Request Model
- Requester and recipient IDs
- Requested and offered skills
- Status (pending, accepted, rejected, completed)
- Timestamps
- Messages

#### Skill Model
- Skill name and category
- Description
- Difficulty level

### 🚀 Deployment

The application can be deployed to:
- **Backend**: Heroku, Railway, or AWS
- **Frontend**: Vercel, Netlify, or GitHub Pages
- **Database**: MongoDB Atlas

### 👥 Team Members

- The Code Cartel Team

### 📝 License

This project is created for the Odoo Hackathon.
