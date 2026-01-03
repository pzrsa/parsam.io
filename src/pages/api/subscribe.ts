export const prerender = false;

import type { APIRoute } from "astro";

const BUTTONDOWN_API_URL = "https://api.buttondown.com/v1/subscribers";
const API_KEY = import.meta.env.BUTTONDOWN_API_KEY;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return json({ error: "Valid email address is required" }, 400);
    }

    const res = await fetch(BUTTONDOWN_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Token ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        type: "regular",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      if (data.code === "email_already_exists") {
        return json({ success: true });
      }

      return json({ error: "Failed to subscribe" }, res.status);
    }

    return json({ success: true });
  } catch (error) {
    return json({ error: "Something went wrong" }, 500);
  }
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
