import React, { useState } from "react";

import contactImg from "../assets/contact.jpg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { contactSchema } from "../validation/contactSchema.js";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const accessToken = localStorage.getItem("accessToken");

  // handle change
  const handleChange = async (e) => {
    const { name, value } = e.target;

    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);

    try {
      await contactSchema.validateAt(name, updatedForm);
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        [name]: err?.message || "Invalid input",
      }));
    }
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await contactSchema.validate(formData, { abortEarly: false });
      setErrors({});

      const res = await axios.post(
        `${import.meta.env.VITE_URL}/api/v1/contact/send`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (err) {
      const newErrors = {};

      if (err?.inner && Array.isArray(err.inner)) {
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
      } else {
        toast.error(err?.response?.data?.message || "Something went wrong");
      }

      setErrors(newErrors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-muted-foreground mt-2">
          We’d love to hear from you. Send us a message anytime.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <div>
          <img
            src={contactImg}
            alt="Contact"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <Input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <p className="text-red-500 text-sm">{errors.name}</p>
              </div>

              {/* Email */}
              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <p className="text-red-500 text-sm">{errors.email}</p>
              </div>

              {/* Message */}
              <div>
                <Textarea
                  name="message"
                  placeholder="Your Message..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                />
                <p className="text-red-500 text-sm">{errors.message}</p>
              </div>

              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    {" "}
                    <Loader2 className="animate-spin" /> Sending...{" "}
                  </>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
