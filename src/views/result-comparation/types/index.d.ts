import { DataObject } from '@/api/performance'
import { Config_li } from '@/views/performance-baseline/types'

declare namespace Comparison {
  interface EJob {
    [key: keyof Config_li.MapBase]: DataObject[]
  }

  type TJob = EJob
}
