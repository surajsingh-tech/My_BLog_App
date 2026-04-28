import { StoreContext } from "@/context/storeContext";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";

export default function SingleBlog() {
  const { id } = useParams();
  const { blogData } = useContext(StoreContext);
  const blog = blogData?.find(blog=>blog_id === id)
  
  return <div>

  </div>;
}
