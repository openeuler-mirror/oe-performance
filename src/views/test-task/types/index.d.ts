declare namespace TestTask {
  interface DoughnutStateItem {
    value: number
    name: string
  }

  type DoughnutStateList = DoughnutStateItem[]

  interface CaseDrawerDataItem {
    id: number
    label: string
    children?: CaseDrawerDataItem[]
  }

  type CaseDrawerData = CaseDrawerDataItem[]

  interface TaskState {
    [key: string]: number
  }

  interface TaskAmountItem {
    key: string
    doc_count: number
  }

  type TaskAmount = TaskAmountItem[]
}
