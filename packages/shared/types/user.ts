import { LoginProvider } from "./auth";

export class UserDto {
  readonly idx!: number;
  readonly name!: string;
  readonly email!: string;
  readonly picture?: string;
  readonly provider!: LoginProvider;
  readonly maxSessions?: number;
}
