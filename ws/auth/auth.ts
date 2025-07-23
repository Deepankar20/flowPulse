import fetch from "node-fetch"; // remove if using native fetch (Node 18+)

export default async function authenticateApiKey(
  apiKey: string
): Promise<string | null> {
  try {
    const res = await fetch("http://localhost:3000/api/auth/validate-api-key", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey, // or send in body, per your backend's spec
      },
      body: JSON.stringify({ apiKey }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    // Adjust to your backend's response structure
    if (!data) {
      return null;
    }

    if (data.valid) {
      return apiKey;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}
