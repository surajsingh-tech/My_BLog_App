import React from "react";
import contactImg from "../assets/contact.jpg";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Contact() {
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

          <CardContent className="space-y-4">
            <Input placeholder="Your Name" />
            <Input type="email" placeholder="Your Email" />
            <Textarea placeholder="Your Message..." rows={5} />

            <Button className="w-full">Send Message</Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}