import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, type, price_per_day, location, description } = await request.json();

    if (!name || !type || !price_per_day) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Get user profile
    const user = await sql`
      SELECT * FROM users WHERE auth_user_id = ${session.user.id}
    `;

    if (user.length === 0 || user[0].role !== 'farmer') {
      return Response.json({ error: "Only farmers can list equipment" }, { status: 403 });
    }

    const result = await sql`
      INSERT INTO equipment (farmer_id, name, type, price_per_day, location, description)
      VALUES (${user[0].id}, ${name}, ${type}, ${price_per_day}, ${location || null}, ${description || null})
      RETURNING *
    `;

    return Response.json({ equipment: result[0] });
  } catch (error) {
    console.error('Error creating equipment:', error);
    return Response.json({ error: "Failed to create equipment listing" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const farmer_only = url.searchParams.get('farmer_only');
    
    const session = await auth();
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    let equipment;
    
    if (farmer_only === 'true') {
      // Get equipment for current farmer only
      const user = await sql`
        SELECT * FROM users WHERE auth_user_id = ${session.user.id}
      `;

      if (user.length === 0) {
        return Response.json({ equipment: [] });
      }

      equipment = await sql`
        SELECT e.*, u.name as farmer_name, u.location as farmer_location
        FROM equipment e
        JOIN users u ON e.farmer_id = u.id
        WHERE e.farmer_id = ${user[0].id}
        ORDER BY e.created_at DESC
      `;
    } else {
      // Get all available equipment for rental
      equipment = await sql`
        SELECT e.*, u.name as farmer_name, u.location as farmer_location
        FROM equipment e
        JOIN users u ON e.farmer_id = u.id
        WHERE e.status = 'available'
        ORDER BY e.created_at DESC
      `;
    }

    return Response.json({ equipment });
  } catch (error) {
    console.error('Error fetching equipment:', error);
    return Response.json({ error: "Failed to fetch equipment" }, { status: 500 });
  }
}
