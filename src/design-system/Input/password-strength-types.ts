export enum PasswordStrengthEnum {
  Weak = 'weak',
  Medium = 'medium',
  Strong = 'strong',
}

export type PasswordStrengthTypes =
  | PasswordStrengthEnum.Weak
  | PasswordStrengthEnum.Medium
  | PasswordStrengthEnum.Strong
  | undefined;
