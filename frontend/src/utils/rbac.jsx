const roles = {
  user: ["view_posts"],
  admin: ["view_posts", "add_post"],
  superadmin: ["view_posts", "add_post", "delete_post"],
};

export const checkPermission = (role, action) => {
  return roles[role]?.includes(action);
};
