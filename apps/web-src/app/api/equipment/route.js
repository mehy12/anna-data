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
      return Response.json({ error: 'Only farmers can add equipment' }, { status: 403 });
    }

    const { equipment_name, equipment_type, price_per_day, sale_price, listing_type, location, description } = await request.json();

    if (!equipment_name || !equipment_type || !listing_type || !location) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!['rent', 'sale', 'both'].includes(listing_type)) {
      return Response.json({ error: 'Invalid listing type' }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO equipment (owner_id, equipment_name, equipment_type, price_per_day, sale_price, listing_type, location, description)
      VALUES (${userResult[0].id}, ${equipment_name}, ${equipment_type}, ${price_per_day || null}, ${sale_price || null}, ${listing_type}, ${location}, ${description || ''})
      RETURNING id, owner_id, equipment_name, equipment_type, price_per_day, sale_price, listing_type, location, description, is_available, created_at
    `;

    return Response.json({ equipment: result[0] });
  } catch (error) {
    console.error('Error creating equipment:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const owner_only = url.searchParams.get('owner_only');
    
    const session = await auth();
    if (!session?.user?.email) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let query;
    
    if (owner_only === 'true') {
      // Get equipment for the current farmer only
      const userResult = await sql`
        SELECT id FROM users WHERE email = ${session.user.email}
      `;
      
      if (userResult.length === 0) {
        return Response.json({ equipment: [] });
      }

      query = sql`
        SELECT e.*, u.name as owner_name, u.location as owner_location
        FROM equipment e
        JOIN users u ON e.owner_id = u.id
        WHERE e.owner_id = ${userResult[0].id}
        ORDER BY e.created_at DESC
      `;
    } else {
      // Get all equipment for marketplace
      query = sql`
        SELECT e.*, u.name as owner_name, u.location as owner_location
        FROM equipment e
        JOIN users u ON e.owner_id = u.id
        WHERE e.is_available = true
        ORDER BY e.created_at DESC
      `;
    }

    const result = await query;
    return Response.json({ equipment: result });
  } catch (error) {
    console.error('Error fetching equipment:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}


