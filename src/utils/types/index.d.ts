import { DataObject } from '@/api/performance'

declare namespace Utils {
  interface perfPrevCur {
    jobs: DataObject[]
    kpi: string
    params: string
    [key: string]: any
  }
}
