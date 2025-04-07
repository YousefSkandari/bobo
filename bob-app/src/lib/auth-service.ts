import { users } from './mock-data';

// Simple auth service without database dependency
const authService = {
  // Login function
  login: (email: string, password: string) => {
    // In a real app, we would verify the password hash
    // For demo purposes, any password works for existing users
    const user = users.find(u => u.email === email);
    
    if (user) {
      // Return user without password
      const { id, email, username, name, avatar } = user;
      return { id, email, username, name, avatar };
    }
    
    return null;
  },
  
  // Get current user (in a real app this would use a session)
  getCurrentUser: () => {
    // For demo purposes, return the first user
    const user = users[0];
    if (user) {
      const { id, email, username, name, avatar } = user;
      return { id, email, username, name, avatar };
    }
    
    return null;
  },
  
  // Register function (in a real app this would create a new user)
  register: (email: string, username: string, password: string, name?: string) => {
    // In a real app, we would create a new user in the database
    // For demo purposes, just return a success message
    return {
      success: true,
      message: "Registration successful! (This is a mock implementation)",
      user: {
        id: "new-user-id",
        email,
        username,
        name: name || username,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name || username)}`
      }
    };
  }
};

export default authService; 