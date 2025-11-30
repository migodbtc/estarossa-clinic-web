import { AuthenticatedUser } from "@/types/custom";
import { Role } from "@/types/db/enums";

export const initialMockUser: AuthenticatedUser = {
  auth_id: 1,
  email: "admin@example.com",
  role: "admin" as Role,
  created_at: "",
  updated_at: "",
  profile_id: 1,
  full_name: "Site Admin",
  birthdate: null,
  sex: null,
  address: null,
  contact_number: "555-0100",
  specialization: "",
};
