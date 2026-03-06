export const ROLE_PERMISSIONS = {
  admin: ["*"], // The admin role can access everything
  chef: ["/", "/chef"],
  supervisor: ["/", "/pedidos"],
  gerente: [
    "/",
    "/inventario",
    "/menu",
    "/administracion",
    "/administracion/nomina",
  ],
};

export const hasAccess = (userRole, path) => {
  if (!userRole) return false;
  const normalizedRole = userRole.toString().toLowerCase().trim();

  if (ROLE_PERMISSIONS.admin.includes("*") && normalizedRole === "admin")
    return true;

  const permissions = ROLE_PERMISSIONS[normalizedRole] || [];

  return permissions.some((p) => {
    if (p === path) return true;
    if (p !== "/" && path.startsWith(p + "/")) return true;
    if (path !== "/" && p.startsWith(path + "/")) return true;
    return false;
  });
};
