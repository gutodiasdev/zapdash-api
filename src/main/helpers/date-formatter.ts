import dayjs from 'dayjs'

export interface DateProviderInterface {
  addDays(days: number): Date
}

export class DateProvider implements DateProviderInterface {
  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate()
  }
}