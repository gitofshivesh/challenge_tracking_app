export interface OtpResponse {
    message: string;    
    data?: {
        user_id?: string;
        token?: string;
      };
  }
  