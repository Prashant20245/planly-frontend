export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export async function requireAuth() {
  const token = localStorage.getItem("accessToken");
  const result = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (result.status === 401) {
    localStorage.removeItem("accessToken");
    return null;
  }
  if (!result.ok) {
    throw new Error("Unable to verify authentication.");
  }
  const data = await result.json();
  return data.user;
}
