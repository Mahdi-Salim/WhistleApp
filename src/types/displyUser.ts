import { WAT } from "./WAT";

export interface DisplayUser {
  id: number;
  username: string;
}

export type EventWithUsers = WAT & { User: DisplayUser[] };