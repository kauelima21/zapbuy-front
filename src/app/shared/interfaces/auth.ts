export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignInResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface SignUpRequest {
  email: string;
  given_name: string;
  family_name: string;
  password: string;
  password_confirm: string;
}

export interface SignUpResponse {
  user_id: string;
}

export interface AccountConfirmRequest {
  confirmation_code: string;
  email: string;
}

export interface ResetPasswordRequest {
  confirmation_code: string;
  email: string;
  password: string;
}

export interface ProfileResponse {
  user: {
    user_id: string;
    email: string;
    given_name: string;
    family_name: string;
  }
}
