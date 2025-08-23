import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user profile
    const userResult = await sql`
      SELECT id, role FROM users WHERE email = ${session.user.email}
    `;

    if (userResult.length === 0 || userResult[0].role !== 'farmer') {
      return Response.json({ error: 'Only farmers can add crops' }, { status: 403 });
    }

    const { crop_name, quantity_kg, price_per_kg, location } = await request.json();

    if (!crop_name || !quantity_kg || !price_per_kg || !location) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO crops (farmer_id, crop_name, quantity_kg, price_per_kg, location)
      VALUES (${userResult[0].id}, ${crop_name}, ${quantity_kg}, ${price_per_kg}, ${location})
      RETURNING id, farmer_id, crop_name, quantity_kg, price_per_kg, location, created_at, is_sold
    `;

    return Response.json({ crop: result[0] });
  } catch (error) {
    console.error('Error creating crop:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const farmer_only = url.searchParams.get('farmer_only');
    
    const session = await auth();
    if (!session?.user?.email) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let query;
    
    if (farmer_only === 'true') {
      // Get crops for the current farmer only
      const userResult = await sql`
        SELECT id FROM users WHERE email = ${session.user.email}
      `;
      
      if (userResult.length === 0) {
        return Response.json({ crops: [] });
      }

      query = sql`
        SELECT c.*, u.name as farmer_name, u.location as farmer_location
        FROM crops c
        JOIN users u ON c.farmer_id = u.id
        WHERE c.farmer_id = ${userResult[0].id}
        ORDER BY c.created_at DESC
      `;
    } else {
      // Get all crops for marketplace
      query = sql`
        SELECT c.*, u.name as farmer_name, u.location as farmer_location
        FROM crops c
        JOIN users u ON c.farmer_id = u.id
        WHERE c.is_sold = false
        ORDER BY c.created_at DESC
      `;
    }

    const result = await query;
    return Response.json({ crops: result });
  } catch (error) {
    console.error('Error fetching crops:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}


