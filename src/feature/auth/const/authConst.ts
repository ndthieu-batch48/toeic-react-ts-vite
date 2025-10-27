// Auth Form Text Constants
export const AUTH_FORM_TEXTS = {
  // Login Form
  LOGIN_WELCOME_TITLE: "Welcome back",
  LOGIN_SUBTITLE: "Login to your TMA TOEIC account",
  LOGIN_BUTTON_TEXT: "Login",
  LOGIN_BUTTON_LOADING_TEXT: "Logging in...",
  LOGIN_FORGOT_PASSWORD_TEXT: "Forgot your password?",
  LOGIN_NO_ACCOUNT_TEXT: "Don't have an account?",
  LOGIN_CREATE_ACCOUNT_TEXT: "Create one",

  // Register Form
  REGISTER_TITLE: "Create Account",
  REGISTER_SUBTITLE: "Join TMA TOEIC today",
  REGISTER_BUTTON_TEXT: "Create account",
  REGISTER_BUTTON_LOADING_TEXT: "Creating account...",
  REGISTER_ALREADY_HAVE_ACCOUNT_TEXT: "Already have an account?",
  REGISTER_LOG_IN_TEXT: "Log in",

  // Forgot Password Form
  FORGOT_PASSWORD_TITLE: "Reset your password",
  FORGOT_PASSWORD_DESCRIPTION: "Enter your account's verified email or username and we'll send you an OTP.",
  FORGOT_PASSWORD_BUTTON_TEXT: "Send OTP",

  // Reset Password Form
  RESET_PASSWORD_TITLE: "Change your password",
  RESET_PASSWORD_DESCRIPTION: "Enter your new password below. Make sure it's strong and something only you know.",
  RESET_PASSWORD_BUTTON_TEXT: "Update Password",

  // Verify OTP Form
  VERIFY_OTP_TITLE: "Verify OTP Code",
  VERIFY_OTP_DESCRIPTION: "Enter the 6-digit OTP sent to your email.",
  VERIFY_OTP_RESEND_TEXT: "Didn't receive the code?",
  VERIFY_OTP_RESEND_BUTTON_TEXT: "Resend",

  // Common OAuth Text
  OAUTH_SEPARATOR_TEXT: "Or continue with",
  GOOGLE_LOGIN_SR_TEXT: "Login with Google",
  FACEBOOK_LOGIN_SR_TEXT: "Login with Facebook",
  GOOGLE_REGISTER_SR_TEXT: "Register with Google",
  FACEBOOK_REGISTER_SR_TEXT: "Register with Facebook",
} as const;

// Form Field Labels
export const FORM_FIELD_LABELS = {
  EMAIL_OR_USERNAME: "Email or Username",
  EMAIL: "Email",
  USERNAME: "User name",
  PASSWORD: "Password",
  NEW_PASSWORD: "New Password",
  CONFIRM_PASSWORD: "Confirm Password",
  CREDENTIAL: "Email or Username",
} as const;

// Form Field Placeholders
export const FORM_FIELD_PLACEHOLDERS = {
  EMAIL_EXAMPLE: "m@example.com",
  EMAIL_PLACEHOLDER: "example@example.com",
  USERNAME_PLACEHOLDER: "Your user name",
  PASSWORD_PLACEHOLDER: "******",
  PASSWORD_ASTERISKS: "********",
} as const;

// Validation Messages
export const VALIDATION_MESSAGES = {
  EMAIL_OR_USERNAME_REQUIRED: "Email or username is required",
  PASSWORD_REQUIRED: "Password is required",
  EMAIL_REQUIRED: "Email is required",
  USERNAME_REQUIRED: "User name is required",
} as const;

// Route Paths
export const AUTH_ROUTES = {
  FORGOT_PASSWORD: "/password/forgot",
} as const;

// Configuration Constants
export const AUTH_CONFIG = {
  OTP_MAX_LENGTH: 6,
  MINIMUM_FIELD_LENGTH: 1,
} as const;

// Form Status Types
export const FORM_STATUS = {
  ERROR: "error",
  IDLE: "idle",
  SUCCESS: "success",
  PENDING: "pending",
} as const;