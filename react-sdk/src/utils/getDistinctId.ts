export function getOrCreateDistinctId() {
  let id = localStorage.getItem("distinctId");
  if (!id) {
    id = "user_" + crypto.randomUUID();
    localStorage.setItem("distinctId", id);
  }
  return id;
}
