// 全局类型声明在这里
declare module 'js-cookie' {
  export function set(key: string, data: any, opt: object): void
  export function get(key: string): string
  export function remove(key: string): void
}

declare interface DictObject {
  [key: string]: any
}

declare interface JobObject {
  [key: string]: any
}
