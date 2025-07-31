export default async function validateApiKey(apiKey: string): Promise<boolean> {
  try {
    const res = await fetch("localhost:3000/api/v1/validate-api-key", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({ apiKey }),
    });

    if (!res.ok) return false;

    return true;
  } catch (err) {
    return false;
  }
}
