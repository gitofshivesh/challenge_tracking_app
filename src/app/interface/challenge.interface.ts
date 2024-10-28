export interface Challenge {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    frequency: 'daily' | 'weekly' | 'monthly';
  }

  interface ChallengeDetail {
    challenge_description: string;
    challenge_title: string;
    created_at: string;
    end_date: string;
    frequency: string;
    id: string;
    is_active: string;
    start_date: string;
    updated_at: string;
    user_id: string;
  }
  
  export interface ChallengeResponse {
    message: string;
    data?: {
        challenge: ChallengeDetail
    };
  }