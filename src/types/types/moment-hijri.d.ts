declare module 'moment-hijri' {
  import { Moment } from 'moment';
  
  interface MomentHijri extends Moment {
    iYear(): number;
    iYear(year: number): MomentHijri;
    iMonth(): number;
    iMonth(month: number): MomentHijri;
    iDate(): number;
    iDate(date: number): MomentHijri;
    iDay(): number;
    iWeek(): number;
    iWeek(week: number): MomentHijri;
    iWeekYear(): number;
    iWeekYear(year: number): MomentHijri;
    iDayOfYear(): number;
    iDayOfYear(day: number): MomentHijri;
    startOf(unit: string): MomentHijri;
    endOf(unit: string): MomentHijri;
  }
  
  interface MomentHijriStatic {
    (): MomentHijri;
    (date: Date): MomentHijri;
    (date: string): MomentHijri;
    (date: number): MomentHijri;
    (date: Moment): MomentHijri;
    unix(timestamp: number): MomentHijri;
    utc(): MomentHijri;
  }
  
  const moment: MomentHijriStatic;
  export = moment;
}
