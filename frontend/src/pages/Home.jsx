import Hero from "@/components/Hero";
import LatestBlog from "@/components/LatestBlog";
import { StoreContext } from "@/context/storeContext";
import React, { useContext, useEffect } from "react";

export default function Home() {
  const { getBlogData } = useContext(StoreContext);
  useEffect(() => {
    getBlogData();
  }, []);
  return (
    <>
      <Hero />
      <LatestBlog />
    </>
  );
}
