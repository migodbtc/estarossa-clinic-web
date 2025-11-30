import { AuthUser, UserProfile } from "@/types/db/tables";

export interface AuthenticatedUser {
  auth_id: AuthUser["auth_id"];
  email: AuthUser["email"];
  role: AuthUser["role"];
  profile_id: UserProfile["profile_id"];
  full_name: UserProfile["full_name"];
  birthdate: UserProfile["birthdate"];
  sex: UserProfile["sex"];
  address: UserProfile["address"];
  contact_number: UserProfile["contact_number"];
  specialization?: UserProfile["specialization"];
}
