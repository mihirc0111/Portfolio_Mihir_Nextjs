import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Insert comment into Supabase
    const { data, error } = await supabase
      .from("comments")
      .insert([
        {
          name,
          email,
          message,
          status: "pending",
        },
      ])
      .select();

    if (error) {
      console.error("Error inserting comment:", error);
      return NextResponse.json(
        { error: "Failed to submit comment" },
        { status: 500 }
      );
    }

    const transformedData = data.map(transformComment);
    return NextResponse.json(
      { message: "Comment submitted successfully", data: transformedData },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/comments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "5", 10);

    let query = supabase
      .from("comments")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    // Filter by status if provided
    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    // Filter by search term if provided
    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,message.ilike.%${search}%`);
    }

    // Paginate
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) {
      console.error("Error fetching comments:", error);
      return NextResponse.json(
        { error: "Failed to fetch comments" },
        { status: 500 }
      );
    }

    const transformed = data.map(transformComment);
    return NextResponse.json({ comments: transformed, total: count ?? 0 });
  } catch (error) {
    console.error("Error in GET /api/comments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
