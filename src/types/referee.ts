// types/referee.ts
export interface RefereeCore {
  id: number;
  degree: string;
  specification: string;
  status: boolean;
  AFCNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserCore {
  id: number;
  userName: string;
  email: string;
  password?: string;
  phoneNumber: string;
  birthDate: string;
  address: string;
  photo?: string;
  RoleId: number;
  RefereeId?: number;
  createdAt: string;
  updatedAt: string;
}

export interface RefereeWithUser extends UserCore {
  Referee?: RefereeCore; // included via Sequelize include
}

export interface ApiEnvelope<T> {
  message: string;
  data: T;
}

export interface CreateRefereePayload {
  userName: string;
  email: string;
  password: string;
  phoneNumber: string;
  RoleId: number;
  birthDate: string;
  address: string;
  degree: string;
  specification: string;
  AFCNumber: string;
  status: boolean;
  photo?: string;
}