declare namespace Config_li {
  interface ColumnItem {
    label: string
    prop: string
  }

  interface CommonItem {
    tableName: string
    column: ColumnItem[]
    tableLabel?: string
    kpi?: string
  }

  type CommonItemList = CommonItem[]

  type CommonMapItem = string | string[] | CommonItemList

  type MapBaseKey =
    | 'stream'
    | 'unixbench'
    | 'lmbench'
    | 'netperf'
    | 'speccpu2006'
    | 'speccpu2017'
    | 'libmicro'
    | 'fio-basic'

  type ColumnBaseKey = 'Spark' | 'Hive' | 'Hbase' | 'MySQL-OLTP'

  type testParamsMap = Record<MapBaseKey, CommonMapItem>
  type KpiListMap = Record<MapBaseKey, CommonMapItem>
  type tableColumnMap = Record<ColumnBaseKey | MapBaseKey, CommonMapItem> & {
    [key: string]: any
  }
}

declare namespace PerformanceBaseline {
  interface SubmitId {
    submit_id: string
  }
  type SubmitIdList = SubmitId[]

  type SubmitItem = {
    submitId: string
    jobList: JobObject[]
  }

  type SubmitList = SubmitItem[]
}
