interface AgeOptions {
  format?: "year" | "month" | "day";
}

export const age = (isoDate: string, options?: AgeOptions): number => {
  const birthDate = new Date(isoDate);
  const today = new Date();

  const diffMs = today.getTime() - birthDate.getTime();

  switch (options?.format) {
    case "day":
      return Math.floor(diffMs / (1000 * 60 * 60 * 24));
    case "month":
      return (
        (today.getFullYear() - birthDate.getFullYear()) * 12 +
        (today.getMonth() - birthDate.getMonth()) -
        (today.getDate() < birthDate.getDate() ? 1 : 0)
      );
    case "year":
    default:
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age;
  }
};
