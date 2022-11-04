export interface message {
  message: string;
  timestamp: number;
  user: string;
  photoURL: string;
}
export type messages = { [index: string]: string | number };
