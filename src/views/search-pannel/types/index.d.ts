declare namespace SearchPanel {
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
