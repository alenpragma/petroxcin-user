// import { cookies } from "next/headers";

// export async function getData(endpoint: string) {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("yeldoToken")?.value;
//   const res = await fetch(`${process.env.BASE_URL}/${endpoint}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     // next: {
//     //   revalidate: 60,
//     // },
//   });
//   if (!res.ok) {
//     throw new Error("Something went wrong");
//   }

//   return res.json();
// }

// import { GetServerSideProps } from 'next'

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const token = context.req.cookies['auth-token']

//   if (!token) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     }
//   }


import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getData(endpoint: string) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("yeldoToken")?.value;

    const url = `${process.env.BASE_URL}/${endpoint}`;
    console.log(`Fetching from: ${url}`);

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (res.status === 401 || res.status === 403) {
      redirect("/logout");
    }
    if (!res.ok) {
      const contentType = res.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        const errorData = await res.json();
        throw new Error(
          `API error (${res.status}): ${JSON.stringify(errorData)}`
        );
      } else {
        const text = await res.text();
        const preview = text.substring(0, 100);
        throw new Error(
          `API returned non-JSON response (${res.status}): ${preview}...`
        );
      }
    }

    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const text = await res.text();
      const preview = text.substring(0, 100);
      throw new Error(
        `Expected JSON but got: ${contentType}, preview: ${preview}...`
      );
    }

    return await res.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}
