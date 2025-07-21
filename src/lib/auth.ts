import { cookies } from "next/headers";

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("access-token");

  if (tokenCookie?.value) {
    return true;
  }
  return false;
}
