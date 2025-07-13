import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { supabaseServerClient } from "@/lib/supabaseClient" // Import the server-side client

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user in Supabase by email
    const { data: user, error: fetchError } = await supabaseServerClient
      .from("users")
      .select("*") // Select all user data, including password_hash
      .eq("email", email)
      .single()

    if (fetchError || !user) {
      console.error("Supabase fetch error or user not found:", fetchError)
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash) // Compare with stored password_hash
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Generate JWT token
    // Ensure JWT_SECRET is set in your environment variables
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "your-secret-key", // Use a strong secret in production
      { expiresIn: "7d" },
    )

    // Remove password_hash from response for security
    const { password_hash: _, ...userResponse } = user

    return NextResponse.json({
      message: "Login successful",
      user: userResponse,
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
