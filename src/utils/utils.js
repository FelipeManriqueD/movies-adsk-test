export function validateEmail(email = "") {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function truncateText(text) {
  return text.length > 100 ? text.substring(0, 100) + "..." : text;
}
