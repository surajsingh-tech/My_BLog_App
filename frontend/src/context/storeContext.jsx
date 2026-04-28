import { createContext, useState, useEffect } from "react";
import { blogData } from "@/assets/blogData";
import { toast } from "react-toastify";
import axios from "axios";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [userBlogs, setUserBlogs] = useState([]);
  const [blogData, setBlogData] = useState([]);

  const accessToken = localStorage.getItem("accessToken");

  const login = (data) => {
    setUser(data.user);
    localStorage.setItem("accessToken", data.accessToken);
  };

  const userBlog = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/blog/userblogs`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        setUserBlogs(res.data?.userblog);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
  };

  const getBlogData = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/blog/all`);
      if (res.data.success) {
        setBlogData(res.data?.allBlogs);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error(error.message);
      }
    }
  };
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    getBlogData();
  }, []);

  useEffect(() => {
  if (accessToken) {
    userBlog();
  }
}, [accessToken]);

  const contextValue = {
    blogData,
    user,
    login,
    logout,
    getBlogData,
    setBlogData,
    userBlogs,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
