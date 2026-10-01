export type TaskProps = {
  id: string;
  completed: boolean;
  created: Date;
  updated: Date;
  description: string;
};

export type UserData = {
  uid: string;
  email: string;
};
