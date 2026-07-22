import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function transformComment(comment: Record<string, unknown>) {
  return {
    id: comment.id,
    name: comment.name,
    email: comment.email,
    message: comment.message,
    status: comment.status,
    createdAt: comment.created_at,
    repliedAt: comment.replied_at ?? null,
    replyMessage: comment.reply_message ?? null,
  };
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { replyMessage } = await request.json();

    if (!id || !replyMessage?.trim()) {
      return NextResponse.json(
        { error: "Comment ID and reply message are required" },
        { status: 400 }
      );
    }

    // Fetch the original comment to get the commenter's email
    const { data: comment, error: fetchError } = await supabase
      .from("comments")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !comment) {
      console.error("Error fetching comment:", fetchError);
      return NextResponse.json(
        { error: "Comment not found" },
        { status: 404 }
      );
    }

    // Update the comment with reply
    const { data, error } = await supabase
      .from("comments")
      .update({
        reply_message: replyMessage.trim(),
        replied_at: new Date().toISOString(),
        status: "replied",
      })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating comment:", error);
      return NextResponse.json(
        { error: "Failed to reply to comment" },
        { status: 500 }
      );
    }

    // Send email notification to the commenter via Gmail SMTP
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: comment.email,
        subject: `Re: Comment from ${comment.name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Reply to your comment</h2>
            <div style="background: #f5f5f5; padding: 16px; border-radius: 8px; margin: 16px 0;">
              <p style="margin: 0; color: #666; font-size: 14px;"><strong>Your message:</strong></p>
              <p style="margin: 8px 0;">${comment.message}</p>
            </div>
            <div style="background: #e3f2fd; padding: 16px; border-radius: 8px; margin: 16px 0;">
              <p style="margin: 0; color: #1565c0; font-size: 14px;"><strong>My reply:</strong></p>
              <p style="margin: 8px 0;">${replyMessage}</p>
            </div>
            <p style="color: #999; font-size: 12px; margin-top: 24px;">
              This is an automated reply from Mihir's portfolio website.
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Error sending reply email:", emailError);
      // Don't fail the request if email fails
    }

    const transformed = data.map(transformComment);
    return NextResponse.json({ message: "Reply sent successfully", data: transformed });
  } catch (error) {
    console.error("Error in PATCH /api/comments/reply/[id]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}