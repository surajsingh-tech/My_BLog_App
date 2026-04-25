import { createContext, useState } from "react";
import { blogData } from "@/assets/blogData";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const contextValue = {
    blogData,
    user,
    setUser,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
