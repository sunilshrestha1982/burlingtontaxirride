import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type ContactMessage = {
  id: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  service: string | null;
  pickup: string | null;
  dropoff: string | null;
  message: string | null;
  handled: boolean;
  notes: string | null;
  created_at: string;
};

async function isAdminUser(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error) throw new Error("Could not verify admin access");
  return Boolean(data);
}

export const listMessages = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    if (!(await isAdminUser(context)))
      return { isAdmin: false as const, messages: [] as ContactMessage[] };

    const { data, error } = await (context.supabase as any)
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(300);
    if (error) throw new Error(error.message);
    return { isAdmin: true as const, messages: (data ?? []) as ContactMessage[] };
  });

export const updateMessage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        handled: z.boolean().optional(),
        notes: z.string().max(2000).nullable().optional(),
      })
      .parse(data),
  )
  .handler(async ({ context, data }) => {
    if (!(await isAdminUser(context))) throw new Error("Admin access required");
    const { id, ...fields } = data;
    const { error } = await (context.supabase as any)
      .from("contact_messages")
      .update(fields)
      .eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
