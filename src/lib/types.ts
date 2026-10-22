export type Step = {
  stepid: string;
  stepname: string;
  processref: string;
  [key: string]: any | Assignee;
  lastupdated: string;
  duedate: string;
  status: string;
  comment: string;
};
export type Assignee = {
  name: string;
  role: string;
};

export type Template = {
  templateid: string;
  templatename: string;
  [key: string]: any | Step;
};

export type ProcessItem = {
  processid: string;
  processname: string;
  [key: string]: any | Processmembers | Template;
};

export type Processmembers = {
  [key: string]: any | Member;
};

export type Member = {
  name: string;
  role: string;
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

// Your new root Database type
export type Database = {
  Allprocesses: Record<string, ProcessItem>;
  Admins: Record<string, AdminItem>;
  Users: Record<string, UserItem>;
};
