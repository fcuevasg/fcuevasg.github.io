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
export interface DailyData{
  date:Date,
  status:DAILYSTATES,
  time:number

}
export interface TeamMember{
  name:string,
  email?:string,
  dailyData:DailyData
}
