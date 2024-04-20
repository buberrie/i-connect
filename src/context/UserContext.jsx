import { createContext, useContext, useState } from 'react';

// Create a context to hold the user information
const UserContext = createContext();

// Create a provider component to wrap your app and provide the user context
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access the user context
export const useUser = () => useContext(UserContext);
