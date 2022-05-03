import { Company } from "@/types/company";

export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: Company;
};
