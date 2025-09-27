export interface User {
    _id: string;
    name: string;
    _creationTime?: number;
}

export const getUserFromLocalStorage = (): User | null => {
    const user = localStorage?.getItem("user");
    if (!user) return null;
    try {
        return JSON.parse(user) as User;
    } catch (e) {
        console.error("Error parsing user from localStorage", e);
        return null;
    }
}

export const getUserNameFromLocalStorage = (): string | null => {
    return getUserFromLocalStorage()?.name ?? null;
}