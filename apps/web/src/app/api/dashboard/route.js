import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";

export async function GET(request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user profile
    const user = await sql`
      SELECT * FROM users WHERE auth_user_id = ${session.user.id}
    `;

    if (user.length === 0) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const userId = user[0].id;
    const userRole = user[0].role;

    if (userRole === 'farmer') {
      // Get farmer dashboard data
      const [crops, equipment, sales, rentals] = await sql.transaction([
        sql`SELECT COUNT(*) as count FROM crops WHERE farmer_id = ${userId}`,
        sql`SELECT COUNT(*) as count FROM equipment WHERE farmer_id = ${userId}`,
        sql`
          SELECT COALESCE(SUM(sale_price), 0) as total_earnings
          FROM sales s
          JOIN crops c ON s.crop_id = c.id
          WHERE c.farmer_id = ${userId}
        `,
        sql`
          SELECT COALESCE(SUM(total_price), 0) as total_earnings
          FROM equipment_rentals er
          JOIN equipment e ON er.equipment_id = e.id
          WHERE e.farmer_id = ${userId}
        `
      ]);

      const totalEarnings = parseFloat(sales[0].total_earnings) + parseFloat(rentals[0].total_earnings);
      const totalListings = parseInt(crops[0].count) + parseInt(equipment[0].count);
      
      // Mock costs for demo
      const mockCosts = totalEarnings * 0.3; // 30% of earnings as costs
      const netProfit = totalEarnings - mockCosts;

      return Response.json({
        role: 'farmer',
        stats: {
          totalEarnings: totalEarnings.toFixed(2),
          totalListings,
          netProfit: netProfit.toFixed(2),
          cropListings: parseInt(crops[0].count),
          equipmentListings: parseInt(equipment[0].count)
        }
      });
    } else {
      // Get distributor/buyer dashboard data
      const [purchases, equipmentRentals] = await sql.transaction([
        sql`SELECT COUNT(*) as count FROM sales WHERE buyer_id = ${userId}`,
        sql`SELECT COUNT(*) as count FROM equipment_rentals WHERE renter_id = ${userId}`
      ]);

      return Response.json({
        role: 'distributor',
        stats: {
          totalPurchases: parseInt(purchases[0].count),
          totalRentals: parseInt(equipmentRentals[0].count)
        }
      });
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return Response.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
  }
}
