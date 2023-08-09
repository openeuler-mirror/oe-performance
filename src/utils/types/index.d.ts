import { DataObject } from '@/api/performance'

declare namespace Utils {
  interface perfSortPrevCur {
    jobs: DataObject[]
    kpi: string
    params: string
    [key: string]: any
  }
}
