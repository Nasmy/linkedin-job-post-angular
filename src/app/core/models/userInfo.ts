export interface UserInfo {
  first_name?: string;
  last_name?: string;
  email?: string;
  mobile?: string;
  avatar?: string;
  tenantId?: string;
}

export const user: UserInfo[] = JSON.parse(localStorage.getItem("user_info"));
