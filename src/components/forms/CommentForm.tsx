"use client";

import { useState, FormEvent } from "react";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import DOMPurify from "dompurify";
import { commentSchema, type CommentFormData } from "@/lib/validations";
import { useCreateCommentMutation } from "@/store/api/commentsApi";

export default function CommentForm() {
  const [formData, setFormData] = useState<CommentFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CommentFormData, string>>>({});
  const [success, setSuccess] = useState(false);
  const [createComment, { isLoading }] = useCreateCommentMutation();

  const validateField = (field: keyof CommentFormData, value: string) => {
    const result = commentSchema.shape[field].safeParse(value);
    if (!result.success) {
      setErrors((prev) => ({
        ...prev,
        [field]: result.error.issues[0]?.message || "Invalid value",
      }));
    } else {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleChange = (field: keyof CommentFormData, value: string) => {
    const sanitized = DOMPurify.sanitize(value);
    setFormData((prev) => ({ ...prev, [field]: sanitized }));
    if (errors[field]) {
      validateField(field, sanitized);
    }
  };

  const handleBlur = (field: keyof CommentFormData) => {
    validateField(field, formData[field]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    // Validate all fields
    const result = commentSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof CommentFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof CommentFormData;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      await createComment({
        name: DOMPurify.sanitize(formData.name),
        email: DOMPurify.sanitize(formData.email),
        message: DOMPurify.sanitize(formData.message),
      }).unwrap();

      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setErrors({});

      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      setErrors({
        message: "Failed to submit comment. Please try again later.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {success && (
        <div className="flex items-center gap-2 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm">
          <CheckCircle size={18} />
          <span>Thank you! Your message has been sent successfully.</span>
        </div>
      )}

      {errors.message && !success && (
        <div className="flex items-center gap-2 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
          <AlertCircle size={18} />
          <span>{errors.message}</span>
        </div>
      )}

      <div>
        <label
          htmlFor="comment-name"
          className="block text-sm font-medium mb-1.5 text-muted"
        >
          Name
        </label>
        <input
          id="comment-name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          className={`w-full px-3 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
            errors.name
              ? "border-red-500 focus:ring-red-500"
              : "border-border"
          }`}
          placeholder="Your name"
          required
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="comment-email"
          className="block text-sm font-medium mb-1.5 text-muted"
        >
          Email
        </label>
        <input
          id="comment-email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          className={`w-full px-3 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
            errors.email
              ? "border-red-500 focus:ring-red-500"
              : "border-border"
          }`}
          placeholder="your@email.com"
          required
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="comment-message"
          className="block text-sm font-medium mb-1.5 text-muted"
        >
          Message
        </label>
        <textarea
          id="comment-message"
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          onBlur={() => handleBlur("message")}
          rows={4}
          className={`w-full px-3 py-2.5 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-colors resize-none ${
            errors.message
              ? "border-red-500 focus:ring-red-500"
              : "border-border"
          }`}
          placeholder="Share your thoughts or feedback..."
          required
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500">{errors.message}</p>
        )}
        <p className="mt-1 text-xs text-muted text-right">
          {formData.message.length}/2000
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send size={18} />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}