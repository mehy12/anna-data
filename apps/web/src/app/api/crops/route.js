import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, quantity, asking_price, location, description } = await request.json();

    if (!name || !quantity || !asking_price) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Get user profile
    const user = await sql`
      SELECT * FROM users WHERE auth_user_id = ${session.user.id}
    `;

    if (user.length === 0 || user[0].role !== 'farmer') {
      return Response.json({ error: "Only farmers can list crops" }, { status: 403 });
    }

    const result = await sql`
      INSERT INTO crops (farmer_id, name, quantity, asking_price, location, description)
      VALUES (${user[0].id}, ${name}, ${quantity}, ${asking_price}, ${location || null}, ${description || null})
      RETURNING *
    `;

    return Response.json({ crop: result[0] });
  } catch (error) {
    console.error('Error creating crop:', error);
    return Response.json({ error: "Failed to create crop listing" }, { status: 500 });
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

    let crops;
    
    if (farmer_only === 'true') {
      // Get crops for current farmer only
      const user = await sql`
        SELECT * FROM users WHERE auth_user_id = ${session.user.id}
      `;

      if (user.length === 0) {
        return Response.json({ crops: [] });
      }

      crops = await sql`
        SELECT c.*, u.name as farmer_name, u.location as farmer_location
        FROM crops c
        JOIN users u ON c.farmer_id = u.id
        WHERE c.farmer_id = ${user[0].id}
        ORDER BY c.created_at DESC
      `;
    } else {
      // Get all available crops for marketplace
      crops = await sql`
        SELECT c.*, u.name as farmer_name, u.location as farmer_location
        FROM crops c
        JOIN users u ON c.farmer_id = u.id
        WHERE c.status = 'available'
        ORDER BY c.created_at DESC
      `;
    }

    return Response.json({ crops });
  } catch (error) {
    console.error('Error fetching crops:', error);
    return Response.json({ error: "Failed to fetch crops" }, { status: 500 });
  }
}
