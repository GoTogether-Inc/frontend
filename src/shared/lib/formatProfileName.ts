export const formatProfilName = (name: string | undefined): string => {
  if (!name) return '';
  return name.length > 2 ? name.slice(1, 3) : name.slice(0, 2);
};
