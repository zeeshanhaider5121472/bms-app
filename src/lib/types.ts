export type StepItem = {
  itemid: string;
  type: string;
  label: string;
  placeholder?: string;
  options?: string[];
  userValue?: any;
};

export type Step = {
  stepid: string;
  stepname: string;
  processref: string;
  required: boolean;
  owner: string;
  duedate: string;
  status: string;
  comment: string;
  items?: Record<string, StepItem>;
  [key: string]: any;
};

export type Template = {
  templateid: string;
  templatename: string;
  [key: string]: any | Step;
};

export type ProcessItem = {
  processid: string;
  processname: string;
  processmembers: Record<string, { name: string; role: string }>;
  [key: string]: any;
};

export type AdminItem = {
  adminid: string;
  adminname: string;
  role: string;
  lastlogin: string;
  status: string;
};

export type UserItem = {
  userid: string;
  username: string;
  role: string;
  lastlogin: string;
  status: string;
};

export type Database = {
  Allprocesses: Record<string, ProcessItem>;
  Admins: Record<string, AdminItem>;
  Users: Record<string, UserItem>;
};
