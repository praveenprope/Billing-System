// Save multiple users data
export const saveToLocalStorage = (key, newUserData) => {
    const users = JSON.parse(localStorage.getItem(key)) || [];
  
    // Check if user already exists (you can use email or shopName as a unique identifier)
    const existingUserIndex = users.findIndex(user => user.email === newUserData.email);
  
    if (existingUserIndex !== -1) {
      // Update existing user
      users[existingUserIndex] = newUserData;
    } else {
      // Add new user to the array
      users.push(newUserData);
    }
  
    localStorage.setItem(key, JSON.stringify(users));
  };
  
  // Get user from localStorage by email
  export const getFromLocalStorage = (key, email) => {
    const users = JSON.parse(localStorage.getItem(key)) || [];
    return users.find(user => user.email === email); // Find user by email
  };
  