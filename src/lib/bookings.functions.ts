import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type AdminBooking = {
  id: string;
  reference: string | null;
  service: string | null;
  name: string | null;
  phone: string | null;
  email: string | null;
  pickup: string | null;
  dropoff: string | null;
  ride_date: string | null;
  ride_time: string | null;
  passengers: string | null;
  luggage: string | null;
  flight: string | null;
  admin_email_sent: boolean;
  admin_email_error: string | null;
  passenger_email_sent: boolean;
  passenger_email_error: string | null;
  created_at: string;
};

export const listBookings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc(
      "has_role",
      { _user_id: context.userId, _role: "admin" },
    );
    if (roleError) throw new Error("Could not verify admin access");
    if (!isAdmin) return { isAdmin: false as const, bookings: [] };

    const { data, error } = await context.supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) throw new Error(error.message);

    return { isAdmin: true as const, bookings: (data ?? []) as AdminBooking[] };
  });
