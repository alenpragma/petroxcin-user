import { cookies } from "next/headers";

export async function getData(endpoint: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get("yeldoToken")?.value;
  const res = await fetch(`${process.env.BASE_URL}/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // next: {
    //   revalidate: 60,
    // },
  });
  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json();
}
