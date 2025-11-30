import { AuthUser, UserProfile } from "@/types/db/tables";

export type AuthenticatedUser = Partial<AuthUser> & Partial<UserProfile>;
