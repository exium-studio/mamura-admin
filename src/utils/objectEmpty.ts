export function objectEmpty(obj: Record<string, any>): boolean {
  if (typeof obj !== "object" || obj === null) {
    throw new Error("Parameter harus berupa object non-null");
  }

  return Object.values(obj).every(
    (value) => value === "" || value === null || value === undefined
  );
}
