import { Role } from "@/types/db/enums";
import { AuthenticatedUser } from "@/types/models/user";

export const initialMockUser: AuthenticatedUser = {
  auth_id: 1,
  email: "admin@example.com",
  role: "admin" as Role,
  profile_id: 1,
  full_name: "Site Admin",
  birthdate: null,
  sex: "male",
  address: "7339 Long Beach Island, California Garden, Mandaluyong City",
  contact_number: "555-0100",
  specialization: "",
};
