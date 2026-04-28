import * as yup from "yup";

export const blogSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
  image: yup.mixed().required("Image is required"),
});
