export interface LoginResponse {
    token: string;
    userId?: string; // userId pode ser opcional
    id?: string; // id também pode ser opcional
    name: string;
  }
  
