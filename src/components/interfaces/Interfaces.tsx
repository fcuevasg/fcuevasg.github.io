export interface IGridBreakpoints {
  lg: number;
  md: number;
  sm: number;
  xs: number;
  xxs: number;

  [P: string]: number;
}

export enum DAILYSTATES {
  none = 0,
  OK = 1,
  NEEDSHELP = 2,
  BLOCKED = 3
}

export interface DailyData {
  status: DAILYSTATES,
  time: number
}

export interface TeamMember {
  name: string,
  email?: string,
  dailyData: {
    [key: number]: DailyData;
  }
}

export interface User {
  _id?: {
    $oid: string
  },
  name: string,
  email: string,
}

export interface Team {
  name: string,
  users: Array<User>
}
