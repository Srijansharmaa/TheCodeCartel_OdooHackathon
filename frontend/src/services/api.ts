// Mock API service for development
// This simulates backend API calls without requiring a real backend

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface LoginResponse {
  success: boolean;
  user: User;
  token: string;
}

interface RegisterResponse {
  success: boolean;
  user: User;
  token: string;
}

// Mock users database
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    isAdmin: false
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    isAdmin: true
  }
];

// Mock swap requests
const mockSwapRequests = [
  {
    id: '1',
    type: 'received',
    from: 'John Doe',
    skill: 'React Development',
    message: 'I need help with React hooks and state management. Can you help me?',
    status: 'pending',
    date: '2 hours ago'
  },
  {
    id: '2',
    type: 'sent',
    to: 'Jane Smith',
    skill: 'Python Programming',
    message: 'I would like to learn Python basics and data structures.',
    status: 'accepted',
    date: '1 day ago'
  }
];

// Mock users for browse page
const mockBrowseUsers = [
  {
    id: 1,
    name: 'John Doe',
    location: 'New York, NY',
    rating: 4.8,
    skillsOffered: ['React', 'JavaScript', 'TypeScript'],
    skillsWanted: ['Python', 'Machine Learning'],
    bio: 'Frontend developer with 5 years of experience'
  },
  {
    id: 2,
    name: 'Jane Smith',
    location: 'San Francisco, CA',
    rating: 4.9,
    skillsOffered: ['Python', 'Data Science', 'Machine Learning'],
    skillsWanted: ['React', 'UI/UX Design'],
    bio: 'Data scientist passionate about AI and ML'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    location: 'Austin, TX',
    rating: 4.7,
    skillsOffered: ['UI/UX Design', 'Figma', 'Adobe Creative Suite'],
    skillsWanted: ['JavaScript', 'Web Development'],
    bio: 'Creative designer with expertise in user experience'
  }
];

class ApiService {
  private token: string | null = null;

  // Authentication
  async login(email: string, password: string): Promise<LoginResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers.find(u => u.email === email);
    
    if (!user || password !== 'password') {
      throw new Error('Invalid credentials');
    }

    const token = `mock-jwt-token-${user.id}`;
    this.token = token;

    return {
      success: true,
      user,
      token
    };
  }

  async register(name: string, email: string, password: string): Promise<RegisterResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    if (mockUsers.find(u => u.email === email)) {
      throw new Error('User already exists with this email');
    }

    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      name,
      email,
      isAdmin: false
    };

    mockUsers.push(newUser);
    const token = `mock-jwt-token-${newUser.id}`;
    this.token = token;

    return {
      success: true,
      user: newUser,
      token
    };
  }

  // User management
  async getUsers() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      success: true,
      count: mockBrowseUsers.length,
      data: mockBrowseUsers
    };
  }

  async getUserById(id: string) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const user = mockBrowseUsers.find(u => u.id.toString() === id);
    
    if (!user) {
      throw new Error('User not found');
    }

    return {
      success: true,
      data: user
    };
  }

  // Swap requests
  async getReceivedRequests() {
    await new Promise(resolve => setTimeout(resolve, 500));
    const received = mockSwapRequests.filter(req => req.type === 'received');
    
    return {
      success: true,
      count: received.length,
      data: received
    };
  }

  async getSentRequests() {
    await new Promise(resolve => setTimeout(resolve, 500));
    const sent = mockSwapRequests.filter(req => req.type === 'sent');
    
    return {
      success: true,
      count: sent.length,
      data: sent
    };
  }

  async sendSwapRequest(recipientId: string, skillOffered: string, skillWanted: string, message: string) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (!skillOffered.trim() || !skillWanted.trim() || !message.trim()) {
      throw new Error('Please fill in all fields');
    }
    
    const newRequest = {
      id: (mockSwapRequests.length + 1).toString(),
      type: 'sent',
      to: `User ${recipientId}`,
      skill: skillWanted,
      message,
      status: 'pending',
      date: 'Just now'
    };

    mockSwapRequests.push(newRequest);

    return {
      success: true,
      data: newRequest
    };
  }

  async acceptSwapRequest(id: string) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const request = mockSwapRequests.find(req => req.id === id);
    if (request) {
      request.status = 'accepted';
    }

    return {
      success: true,
      data: request
    };
  }

  async rejectSwapRequest(id: string) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const request = mockSwapRequests.find(req => req.id === id);
    if (request) {
      request.status = 'rejected';
    }

    return {
      success: true,
      data: request
    };
  }

  // Skills
  async getSkills() {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const allSkillsOffered = mockBrowseUsers.flatMap(user => user.skillsOffered);
    const allSkillsWanted = mockBrowseUsers.flatMap(user => user.skillsWanted);
    
    const uniqueSkillsOffered = Array.from(new Set(allSkillsOffered));
    const uniqueSkillsWanted = Array.from(new Set(allSkillsWanted));

    return {
      success: true,
      data: {
        offered: uniqueSkillsOffered,
        wanted: uniqueSkillsWanted
      }
    };
  }

  // Admin
  async getAdminStats() {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      data: {
        totalUsers: 1250,
        activeUsers: 1180,
        bannedUsers: 70,
        totalSwaps: 3400,
        completedSwaps: 2800
      }
    };
  }

  async getAllUsers() {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      count: mockUsers.length,
      data: mockUsers
    };
  }

  // Utility methods
  setToken(token: string) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  clearToken() {
    this.token = null;
  }
}

export const apiService = new ApiService(); 