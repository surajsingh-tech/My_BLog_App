import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenitcated.js";
import { contactData } from "../controller/contact.controller.js";
const router = express.Router();
router.route("/send").post(isAuthenticated,contactData);
export default router;
