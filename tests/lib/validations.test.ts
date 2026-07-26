import { describe, expect, it } from "vitest";
import { commentSchema, loginSchema } from "@/lib/validations";

describe("validation schemas", () => {
  it("normalizes a valid comment", () => {
    const result = commentSchema.parse({
      name: "  Mihir  ",
      email: "MIHIR@EXAMPLE.COM ",
      message: "  This is a valid portfolio comment.  ",
    });

    expect(result).toEqual({
      name: "Mihir",
      email: "mihir@example.com",
      message: "This is a valid portfolio comment.",
    });
  });

  it("rejects comments that do not meet minimum requirements", () => {
    const result = commentSchema.safeParse({ name: "M", email: "invalid", message: "short" });

    expect(result.success).toBe(false);
  });

  it("normalizes login emails and rejects short passwords", () => {
    expect(loginSchema.parse({ email: " ADMIN@EXAMPLE.COM ", password: "secret1" }).email).toBe("admin@example.com");
    expect(loginSchema.safeParse({ email: "admin@example.com", password: "123" }).success).toBe(false);
  });
});
