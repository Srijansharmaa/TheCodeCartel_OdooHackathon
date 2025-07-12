@echo off
echo 🚀 Setting up Skill Swap Platform...

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
call npm install
cd ..

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo ✅ Installation complete!
echo.
echo 🎯 Next steps:
echo 1. Copy backend/env.example to backend/.env and configure your environment variables
echo 2. Start the backend: cd backend ^&^& npm run dev
echo 3. Start the frontend: cd frontend ^&^& npm start
echo.
echo 🌐 Backend will run on: http://localhost:5000
echo 🌐 Frontend will run on: http://localhost:3000
pause 