import type { CascaderOption } from 'element-plus'

declare namespace JobModel {
  interface ListValue {
    value: string
  }

  interface FieldSettings {
    listValues: CascaderOption[]
  }

  interface Fields {
    [key: string]: {
      label: string
      type: string
      origin: string
      valueSources: string[]
      fieldSettings: FieldSettings
    }
  }

  interface KPIItem {
    direction: number
    label: string
  }

  interface KPIS {
    [key: string]: KPIItem
  }

  interface ParamItem {
    [key: string]: string
  }

  interface Params {
    [key: string]: ParamItem
  }

  // Job在把data-model修改为ts文件后是可以适配jobModel的
  interface Job {
    fields: Fields
    kpis: KPIS
    params: Params
  }
}
