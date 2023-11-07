export interface IUser {
  userId:                string;
  personalId:            number;
  username:              string;
  email:                 string;
  password:              string;
  name:                  string;
  lastname:              string;
  estudiante:            boolean;
  roles:                 IRole[];
  enabled:               boolean;
  accountNonExpired:     boolean;
  accountNonLocked:      boolean;
  credentialsNonExpired: boolean;
  // authorities:           IAuthority[];
}

export interface IAuthority {
  authority: string;
}

export interface IRole {
  roleId:      number;
  descripcion: string;
}
