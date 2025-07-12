# 🎯 Skill Swap Platform - Demo Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TheCodeCartel_OdooHackathon
   ```

2. **Run the installation script**
   ```bash
   # On Windows
   install.bat
   
   # On macOS/Linux
   chmod +x install.sh
   ./install.sh
   ```

3. **Configure environment variables**
   ```bash
   cd backend
   cp env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   ```

4. **Start the application**
   ```bash
   # Terminal 1 - Start backend
   cd backend
   npm run dev
   
   # Terminal 2 - Start frontend
   cd frontend
   npm start
   ```

## 🎨 Features Demo

### 1. User Registration & Authentication
- **Register**: Create a new account with name, email, and password
- **Login**: Authenticate with email and password
- **Profile Management**: Update personal information, location, and bio

### 2. Skill Management
- **Add Skills Offered**: List skills you can teach others
- **Add Skills Wanted**: List skills you want to learn
- **Skill Categories**: Organize skills by categories (Programming, Design, Languages, etc.)

### 3. User Discovery
- **Browse Users**: View all public profiles
- **Search by Skill**: Find users who offer specific skills
- **Filter by Location**: Find users in your area
- **Filter by Availability**: Find users available during your preferred times

### 4. Swap Request System
- **Send Request**: Request a skill swap with another user
- **Accept/Reject**: Respond to incoming swap requests
- **Track Status**: Monitor pending, accepted, and completed swaps
- **Delete Requests**: Cancel unaccepted requests

### 5. Rating & Feedback
- **Rate Completed Swaps**: Provide 1-5 star ratings
- **Leave Feedback**: Write detailed reviews
- **View Ratings**: See your average rating and feedback

### 6. Admin Panel
- **User Management**: View all users, ban/unban accounts
- **Content Moderation**: Review and moderate skill descriptions
- **Platform Statistics**: View user activity and swap statistics
- **Reports**: Generate platform reports

## 🎭 Demo Scenarios

### Scenario 1: New User Journey
1. **Register** as "Alice" (alice@example.com)
2. **Add Skills Offered**: JavaScript, React, UI/UX Design
3. **Add Skills Wanted**: Python, Machine Learning, Photography
4. **Set Availability**: Weekends and evenings
5. **Make Profile Public**

### Scenario 2: Skill Swap Request
1. **Register** as "Bob" (bob@example.com)
2. **Add Skills Offered**: Python, Machine Learning, Data Analysis
3. **Add Skills Wanted**: JavaScript, Web Development
4. **Browse Users** and find Alice
5. **Send Swap Request**: Offer Python in exchange for JavaScript
6. **Alice accepts** the request
7. **Complete the swap** and provide ratings

### Scenario 3: Admin Moderation
1. **Create Admin User** (modify database or use admin flag)
2. **Access Admin Panel**
3. **Review User Reports**
4. **Ban problematic users**
5. **View Platform Statistics**

## 🎨 UI/UX Features

### Modern Design
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Dark/Light Mode**: Toggle between themes
- **Smooth Animations**: Framer Motion for delightful interactions
- **Loading States**: Skeleton loaders and progress indicators

### User Experience
- **Intuitive Navigation**: Clear menu structure
- **Real-time Notifications**: Socket.io for instant updates
- **Form Validation**: Client and server-side validation
- **Error Handling**: User-friendly error messages

## 🔧 Technical Features

### Backend
- **RESTful API**: Clean, documented endpoints
- **Authentication**: JWT-based security
- **Database**: MongoDB with Mongoose ODM
- **File Upload**: Profile photo upload with Cloudinary
- **Real-time**: Socket.io for notifications
- **Validation**: Express-validator for input validation
- **Rate Limiting**: Protect against abuse
- **Error Handling**: Comprehensive error management

### Frontend
- **React 18**: Latest React features
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations
- **React Query**: Server state management
- **React Hook Form**: Form handling
- **Zustand**: Client state management
- **Socket.io Client**: Real-time communication

## 📊 Database Schema

### User Model
```typescript
{
  name: string,
  email: string,
  password: string (hashed),
  location?: string,
  bio?: string,
  profilePhoto?: string,
  skillsOffered: string[],
  skillsWanted: string[],
  availability: {
    weekdays: boolean,
    weekends: boolean,
    evenings: boolean,
    mornings: boolean
  },
  isPublic: boolean,
  rating: number,
  totalRatings: number,
  isAdmin: boolean,
  isBanned: boolean
}
```

### Swap Request Model
```typescript
{
  requester: ObjectId,
  recipient: ObjectId,
  requestedSkill: string,
  offeredSkill: string,
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled',
  message?: string,
  requesterRating?: number,
  recipientRating?: number,
  requesterFeedback?: string,
  recipientFeedback?: string,
  completedAt?: Date
}
```

## 🚀 Deployment

### Backend Deployment
- **Platform**: Heroku, Railway, or AWS
- **Database**: MongoDB Atlas
- **Environment Variables**: Configure production settings

### Frontend Deployment
- **Platform**: Vercel, Netlify, or GitHub Pages
- **Build**: `npm run build`
- **Environment**: Configure API endpoints

## 🧪 Testing

### Manual Testing
1. **User Registration/Login**
2. **Profile Management**
3. **Skill Management**
4. **User Discovery**
5. **Swap Request Flow**
6. **Rating System**
7. **Admin Functions**

### API Testing
Use tools like Postman or curl to test endpoints:
```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 🎯 Success Metrics

### User Engagement
- User registration rate
- Profile completion rate
- Swap request frequency
- User retention rate

### Platform Health
- Successful swap completion rate
- Average user ratings
- Response time to swap requests
- User satisfaction scores

## 🔮 Future Enhancements

### Planned Features
- **Video Calls**: Integrated video chat for skill sessions
- **Calendar Integration**: Schedule skill swap sessions
- **Payment System**: Premium features and skill marketplace
- **Mobile App**: Native iOS and Android applications
- **AI Matching**: Smart skill matching algorithm
- **Community Features**: Forums and skill groups

### Technical Improvements
- **Performance**: Database optimization and caching
- **Security**: Enhanced authentication and authorization
- **Scalability**: Microservices architecture
- **Monitoring**: Application performance monitoring
- **Analytics**: User behavior analytics

---

## 🏆 Team: The Code Cartel

This project was created for the Odoo Hackathon by The Code Cartel team.

**Features Implemented:**
✅ User authentication and profiles  
✅ Skill management system  
✅ User discovery and search  
✅ Swap request system  
✅ Rating and feedback system  
✅ Admin panel and moderation  
✅ Real-time notifications  
✅ Modern, responsive UI  
✅ Comprehensive API  
✅ Security features  

**Tech Stack:**
- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, TypeScript, MongoDB
- **Real-time**: Socket.io
- **Authentication**: JWT
- **File Upload**: Cloudinary
- **State Management**: Zustand, React Query