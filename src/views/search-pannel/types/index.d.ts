declare namespace SearchPanel {
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

  interface suiteName {
    suiteName: string
    unavailable?: boolean
  }

  type SuiteList = suiteName[]

  interface SuiteItem {
    suiteList: SuiteList
  }

  interface SuiteConfig {
    [key: string]: SuiteItem
  }

  interface OSVListValue {
    value: string
    label?: string
    children?: OSVListValue[]
  }

  type OSVListValues = OSVListValue[]
}
