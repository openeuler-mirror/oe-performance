declare namespace Comparison {
  interface EJob {
    [key: keyof Config_li.MapBase]: DictObject[]
  }

  type TJob = EJob

  interface FilterList {
    osv?: string[]
    arch?: string[]
    tbox_group?: string[]
    group_id?: string[]
    tags?: string[]
    pp?: string[]
    ss?: string[]
    [key: string]: any
  }

  interface FilterOptions {
    [key: keyof FilterList]: Set<string>
  }

  interface DimensionFilterCOnfig {
    dimension: string
    filterListData: FilterList
  }

  interface ManipulateData {
    tempColumn: Config_li.ColumnItem[]
    tempDataMap: DictObject
  }

  interface ResultTableConfigs {
    [key: string]: Config_li.CommonItem[]
  }
}

declare namespace ComparisonConfig {
  interface KPIItem {
    [key: string]: {
      kpi: string
      testcase: string
    }
  }

  interface KPI {
    [key: string]: KPIItem
  }

  type KpiMapFuncsItem = (kpi: string) => {
    kpi: string
    testcase: string
    testgroup?: string
  }

  interface KpiMapFuncs {
    [key: string]: KpiMapFuncsItem
  }

  interface AddtionalKpiMap {
    [key: string]: string[]
  }
}
