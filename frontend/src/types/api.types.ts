export type registerType = {
  name: string;
  email: string;
  password: string;
};

export type loginType = {
  email: string;
  password: string;
};

export type UserType = {
  _id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};



export type verifyEmailType = { code: string };