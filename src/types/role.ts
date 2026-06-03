export interface Role {
  id: number;
  subject: string;
}

export interface ApiEnvelope<T> {
  message: string;
  data: T;
}