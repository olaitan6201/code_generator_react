import { createContext } from "react";

export const context_roles = {
    user: "user",
    admin: "admin"
};

export const RoleContext = createContext({
    role: localStorage.getItem('APP_CURRENT_ROLE') || context_roles.user,
    changeRole: (role: string) => { if (!role) return; },
});