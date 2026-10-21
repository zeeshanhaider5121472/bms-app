export type Step = {
  stepname: string;
  processref: string;
  assignees: Record<string, string>;
  lastupdated: string;
  status: string;
  comment: string;
};

export type Template = {
  templatename: string;
  [key: string]: any | Step;
};

export type ProcessItem = {
  processname: string;
  [key: string]: any | Template;
};

export type AdminItem = {
  adminname: string;
  role: string;
  lastlogin: string;
  status: string;
};

export type UserItem = {
  username: string;
  role: string;
  lastlogin: string;
  status: string;
};

// Your new root Database type
export type Database = {
  Allprocesses: Record<string, ProcessItem>;
  Admins: Record<string, AdminItem>;
  Users: Record<string, UserItem>;
};
