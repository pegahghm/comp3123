// src/services/authService.js
export const authenticateUser = (username, password) => {
    // Mock JWT
    if (username === "admin" && password === "password") {
      return {
        token: "mock-jwt-token",
        user: {
          username: "admin",
          role: "admin",
        },
      };
    }
    throw new Error("Invalid credentials");
  };
  