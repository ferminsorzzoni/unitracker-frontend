type Role = "USER" | "ADMIN";

interface User {
    id: string,
    role: Role,
    email: string,
}

export type { User };