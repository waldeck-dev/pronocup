export function getAuthHeaders() {
  return new Headers({
    "Authorization": `Bearer ${Deno.env.get("STRAPI_TOKEN")}`,
    "Accept": "application/json",
    "Content-Type": "application/json",
  });
}
