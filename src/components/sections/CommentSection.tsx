"use client";

import { MessageSquare } from "lucide-react";
import CommentForm from "@/components/forms/CommentForm";

export default function CommentSection() {
  return (
    <section className="section">
      <div className="container max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <MessageSquare size={32} className="mx-auto text-primary mb-3" />
          <h2 className="text-3xl font-bold mb-2">Get In Touch</h2>
          <p className="text-muted max-w-md mx-auto">
            Have a question, want to collaborate, or just want to say hi? Drop me a message!
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-semibold mb-4">Send a Message</h3>
          <CommentForm />
        </div>
      </div>
    </section>
  );
}
