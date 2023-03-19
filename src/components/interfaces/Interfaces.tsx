export interface IGridBreakpoints {
  lg: number;
  md: number;
  sm: number;
  xs: number;
  xxs: number;

  [P: string]: number;
}

export enum DAILYSTATES{
  none=0,
  OK=1,
  NEEDSHELP=2,
  BLOCKED=3
}

export enum EMOTIONALSTATES{
  none=0,
  GOOD=1,
  BAD=2,
  SICK=3,
  APATHETIC=4,
  PLETHORIC=5,
  DOWN=6
}

export interface DailyData{
  emotionalStatus: EMOTIONALSTATES;
  status:DAILYSTATES,
  time:number
}

export interface TeamMember{
  name:string,
  email?:string,
  dailyData:{
    [key: number]: DailyData;
  }
}
