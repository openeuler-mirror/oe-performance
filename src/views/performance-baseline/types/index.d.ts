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

  type TableInfoItem = Pick<CommonItem, 'tableName' | 'tableLabel' | 'column'>

  type TableInfo = TableInfoItem[]

  type NoNameMapItem =
    | string
    | string[]
    | Pick<CommonItem, 'tableName' | 'column'>[]

  type CommonMapItem =
    | string
    | string[]
    | Pick<CommonItem, 'tableLabel' | 'column' | 'tableName'>[]

  type fio_basic =
    | string
    | string[]
    | Pick<CommonItem, 'tableName' | 'column' | 'kpi'>[]

  type Block = Pick<CommonItem, 'tableName' | 'column'>[]

  interface MapBase {
    stream: CommonMapItem
    unixbench: CommonMapItem
    lmbench: NoNameMapItem
    netperf: NoNameMapItem
    speccpu2006: NoNameMapItem
    speccpu2017: NoNameMapItem
    libmicro: NoNameMapItem
    'fio-basic': fio_basic
    [key: string]: any
  }

  type testParamsMap = MapBase

  type KpiListMap = MapBase

  type TableMode = MapBase

  interface tableColumnMap extends MapBase {
    Spark: NoNameMapItem
    Hive: NoNameMapItem
    Hbase: NoNameMapItem
    'MySQL-OLTP': NoNameMapItem
    block: Block
    [key: string]: any
  }
}

declare namespace BaseLine {
  interface SearchParams {
    group_id?: string[]
    my_account?: string[]
    os_arch?: string[]
    submit_id?: string[]
    suite?: string[]
    tags?: string[]
    testbox?: string[]
    osv?: string[] | string[][]
  }

  interface SubmitId {
    submit_id: string
  }
  type SubmitIdList = SubmitId[]

  type SubmitItem = {
    submitId: string
    jobList: DictObject[]
  }

  type SubmitList = SubmitItem[]
}
