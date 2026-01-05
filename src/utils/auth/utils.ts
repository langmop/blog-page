import bcrypt from "bcrypt";

export function getHashedPassword(password: string, saltRounds: number = 12) {
  return bcrypt.hash(password, saltRounds);
}

export function isPasswordSame(newPassword: string, oldPassword: string) {
  return bcrypt.compare(newPassword, oldPassword);
}
