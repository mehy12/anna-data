import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, role, location } = await request.json();

    if (!name || !role || !['farmer', 'distributor'].includes(role)) {
      return Response.json({ error: "Invalid data" }, { status: 400 });
    }

    // Create user profile
    const result = await sql`
      INSERT INTO users (auth_user_id, email, name, role, location)
      VALUES (${session.user.id}, ${session.user.email}, ${name}, ${role}, ${location || null})
      RETURNING *
    `;

    return Response.json({ user: result[0] });
  } catch (error) {
    console.error('Error creating user:', error);
    return Response.json({ error: "Failed to create user" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await sql`
      SELECT * FROM users WHERE auth_user_id = ${session.user.id}
    `;

    if (user.length === 0) {
      return Response.json({ user: null });
    }

    return Response.json({ user: user[0] });
  } catch (error) {
    console.error('Error fetching user:', error);
    return Response.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}
