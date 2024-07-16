import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserDataProvider, UserContext };
