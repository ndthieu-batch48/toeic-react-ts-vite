export const CredentialType = {
  EMAIL: "email",
  PHONE: "phone",
  UNKNOWN: "",
} as const;

export type CredentialType = typeof CredentialType[keyof typeof CredentialType];

export const OtpPurpose = {
  RESET_PASSWORD: "reset_password",
  VERIFY_ACCOUNT: "verify_account",
  VERIFY_EMAIL: "verify_email",
  VERIFY_PHONE: "verify_phone",
  TWO_FACTOR_AUTH: "two_factor_auth",
  UNKNOWN: "",
} as const;

export type OtpPurpose = typeof OtpPurpose[keyof typeof OtpPurpose];