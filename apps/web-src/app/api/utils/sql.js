import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { role, name, location } = await request.json();

    if (!role || !name || !location) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!['farmer', 'buyer'].includes(role)) {
      return Response.json({ error: 'Invalid role' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${session.user.email}
    `;

    if (existingUser.length > 0) {
      return Response.json({ error: 'User already exists' }, { status: 400 });
    }

    // Create new user
    const result = await sql`
      INSERT INTO users (email, role, name, location)
      VALUES (${session.user.email}, ${role}, ${name}, ${location})
      RETURNING id, email, role, name, location, created_at
    `;

    return Response.json({ user: result[0] });
  } catch (error) {
    console.error('Error creating user:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await sql`
      SELECT id, email, role, name, location, created_at
      FROM users 
      WHERE email = ${session.user.email}
    `;

    if (result.length === 0) {
      return Response.json({ user: null });
    }

    return Response.json({ user: result[0] });
  } catch (error) {
    console.error('Error fetching user:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}


