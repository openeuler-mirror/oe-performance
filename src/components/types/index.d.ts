declare namespace RePoUploader {
  interface Form {
    region: string[]
    description: string
  }

  interface Option {
    value: string
    label: string
    children: Option | Option[]
  }

  type Options = Option[]
}
