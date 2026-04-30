import { Contact } from "../models/contact.model.js";
export const contactData = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, email, message } = req.body;
    if ([name, email, message].some((field) => !field?.trim())) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required",
      });
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }
    await Contact.create({
      contactUserId: userId,
      name,
      email,
      message,
    });
    return res.status(201).json({
      success: true,
      message: "Your query successfully submitted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
