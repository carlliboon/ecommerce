import React, { useContext } from "react";

const UserContext = React.createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = UserContext.Provider;

export default UserContext;
