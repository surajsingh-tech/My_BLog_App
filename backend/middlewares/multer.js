import multer from "multer";
const storage = multer.memoryStorage();

//Single upload
export const singleUpload = multer({ storage }).single("image");
