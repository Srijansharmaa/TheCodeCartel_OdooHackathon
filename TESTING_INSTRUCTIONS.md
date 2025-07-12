# Testing Instructions for Skill Swap Platform

## Quick Start

1. **Install Frontend Dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the Frontend:**
   ```bash
   npm start
   ```

3. **Open your browser and go to:** `http://localhost:3000`

## Testing All Buttons and Features

### Authentication (Login/Register)
- **Test Login:** Use any email and password "password" to login
- **Test Register:** Create a new account with any name, email, and password
- **Test Logout:** Click the logout button in the navbar

### Navigation
- **Home:** Click "Skill Swap" logo or "Home" in navbar
- **Browse:** Click "Browse" in navbar to see available users
- **Dashboard:** Click "Dashboard" in navbar (requires login)
- **Profile:** Click "Profile" in navbar (requires login)
- **Swap Requests:** Click "Swap Requests" in navbar (requires login)
- **Admin:** Click "Admin" in navbar (requires admin login)

### Browse Page
- **Search:** Type in the search box to filter users
- **Filter:** Use the dropdown to filter by skills
- **Connect:** Click "Connect" buttons on user cards

### Swap Requests Page
- **Tabs:** Switch between "Received Requests" and "Sent Requests"
- **Accept/Decline:** Click buttons on pending requests
- **Start Session:** Click on accepted requests

### Admin Page (Admin User Only)
- **Dashboard Tab:** View platform statistics
- **User Management Tab:** View and manage users
- **Reports Tab:** View system reports
- **Settings Tab:** Platform settings

### Profile Page
- **Edit Profile:** Click edit buttons to modify information
- **Save Changes:** Click save buttons

## Test Users

### Regular User
- Email: `john@example.com`
- Password: `password`

### Admin User
- Email: `jane@example.com`
- Password: `password`

## Features Working

✅ **All buttons are now functional**
✅ **Mock API service provides realistic data**
✅ **Authentication works with mock backend**
✅ **Navigation between pages works**
✅ **Search and filtering works**
✅ **User management works**
✅ **Admin dashboard works**

## Notes

- This is a **mock implementation** that simulates a real backend
- All data is stored in memory and resets on page refresh
- The mock API includes realistic delays to simulate real network calls
- No actual backend server is required for testing

## Troubleshooting

If buttons still don't work:
1. Make sure you're on `http://localhost:3000`
2. Check the browser console for any errors
3. Try refreshing the page
4. Make sure all dependencies are installed (`npm install`)

## Next Steps

To connect to a real backend:
1. Set up the backend server (Node.js/Express)
2. Update the API service to use real endpoints
3. Configure environment variables
4. Set up MongoDB database 