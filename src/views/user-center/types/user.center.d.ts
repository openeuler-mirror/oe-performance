declare namespace UserCenter {
  interface ApplicationDataItem {
    approver: string
    date: string
    describe: string
    progress: string
    requestCode: string
    secretLevel: string
    submitter: string
    type: string
    [key: string]: any
  }

  type ApplicationData = ApplicationDataItem[]

  interface ApplicationState {
    data: ApplicationData
  }
}
