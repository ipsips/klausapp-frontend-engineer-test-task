export const formatRole = (role: string) =>
  (role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()).replace(
    /_/g,
    " "
  );
