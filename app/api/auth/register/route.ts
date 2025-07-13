import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { supabaseServerClient } from "@/lib/supabaseClient"

// Mock database - in real implementation, use proper database
const users: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone, password, role } = await request.json()

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !password || !role) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Check if user already exists
    const { data: existingUsers, error: fetchError } = await supabaseServerClient
      .from("users")
      .select("id")
      .or(`email.eq.${email},phone.eq.${phone}`)

    if (fetchError) {
      console.error("Supabase fetch error:", fetchError)
      return NextResponse.json({ error: "Database error during user check" }, { status: 500 })
    }

    if (existingUsers && existingUsers.length > 0) {
      return NextResponse.json({ error: "User already exists with this email or phone" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

   // Insert user into Supabase
    const { data: newUser, error: insertError } = await supabaseServerClient
      .from("users")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        password_hash: hashedPassword,
        role: role,
        verified: false, // Will be verified via OTP
        email_verified: false,
        phone_verified: false,
        status: "active",
      })
      .select("*") // Select all columns of the newly inserted row
      .single()

    if (insertError) {
      console.error("Supabase insert error:", insertError)
      return NextResponse.json({ error: "Failed to register user" }, { status: 500 })
    }

    // Remove password from response
    const { password: _, ...userResponse } = newUser

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: userResponse,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
