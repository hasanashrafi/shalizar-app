export function formatToman(amount: number) {
  return new Intl.NumberFormat("fa-IR").format(amount);
}

export function formatKg(amount: number) {
  return `${new Intl.NumberFormat("fa-IR", {
    maximumFractionDigits: 1,
  }).format(amount)} کیلو`;
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export function isValidIranPhone(phone: string) {
  return /^09\d{9}$/.test(phone.replace(/\s/g, ""));
}
