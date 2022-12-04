import dayjs from 'dayjs'

export interface DateProviderInterface {
  addDays(days: number): Date
  isExpired(date: Date): boolean
}

export class DateProvider implements DateProviderInterface {
  addDays(days: number): Date {
    return dayjs().add(days, 'days').toDate()
  }

  isExpired(date: Date): boolean {
    return dayjs().isAfter(date)
  }
}