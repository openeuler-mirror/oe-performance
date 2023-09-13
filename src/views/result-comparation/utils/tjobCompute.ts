export interface stringIndexedObject {
  [key: string]: any
}

// 支持的suite类型，根据本字段获取数据这里可以指定表格顺序
export const supportedSuiteList = [
  'stream',
  'netperf',
  'lmbench',
  'unixbench',
  'libmicro'
]

// 从tjob中返回当前维度值
export const getDimensionValue = (
  tjob: stringIndexedObject,
  dimension: string
) => {
  let dim = dimension
  if (dimension === 'pp' || dimension === 'ss') {
    dim = `${dimension}Params`
  }
  return tjob[dim]
}

export const getDimensionLabel = (dimension: string) => {
  let dim = dimension
  if (dimension === 'pp') {
    dim = 'program and parameter'
  } else if (dimension === 'ss') {
    dim = 'software stack'
  }
  return dim
}

// 检查当期那tjob是否能通过tableConfig（data-modal）中的filter
export const isTjobPassedFilterCheck = (
  tjob: stringIndexedObject,
  suite: string,
  tableConfig: stringIndexedObject
) => {
  // 如果当前表格有filters的话，需要通过filters来判断是否要获取当前数据的值。
  if (tableConfig.filters) {
    const filterKey = Object.keys(tableConfig.filters)[0]
    let filteredValue = tjob[`pp.${suite}.${filterKey}`]
    // unixbench过滤器的值需要特殊处理，除了nr_task=1的，都为100%
    if (filteredValue && suite === 'unixbench') {
      filteredValue = filteredValue === 1 ? '1' : '100%'
    }
    if (filteredValue !== tableConfig.filters[filterKey]) {
      return false // tableConfig中有filter时进行过滤，如果不匹配则忽略当前数据
    }
    return true
  }
  return true
}

/**
 * ppParams排序,对param=n类型字段进行特殊处理，如果n可以转换为数字的话，根据n排序。
 * @param pairPrev
 * @param pairNext
 * @returns
 */
export const paramSorter = (pairPrev: string, pairNext: string) => {
  if (pairPrev.indexOf('=') < 0) return pairPrev > pairNext ? 1 : -1
  const prevArr = pairPrev.split('=')
  const nextArr = pairNext.split('=')
  if (prevArr[0] === nextArr[0]) {
    return Number(prevArr[1]) > Number(nextArr[1]) ? 1 : -1
  } else {
    return pairPrev > pairNext ? 1 : -1
  }
}

/**
 * 通过filterListData过滤tjob。针对pp参数做特殊处理
 * @param dimensionVal
 * @param filterListData
 */
export const checkTjobDimensionVal = (
  tjob: JobObject,
  filterListData: JobObject
) => {
  let passedFlag = true
  Object.keys(filterListData).forEach((dim: string) => {
    if (filterListData[dim].length <= 0) return
    if (dim === 'pp') {
      let paramMatched = false
      filterListData[dim].forEach((param: string) => {
        if (getDimensionValue(tjob, dim).indexOf(param) > -1)
          paramMatched = true
      })
      if (!paramMatched) passedFlag = false
    } else {
      if (filterListData[dim].indexOf(getDimensionValue(tjob, dim)) < 0)
        passedFlag = false
    }
  })
  return passedFlag
}

/**
 * 通过filterListData过滤tjob，获取到当前tjob匹配到的filter参数列表。
 * @param tjob
 * @param filterListData
 */
export const getMatchedFilterValList = (
  tjob: JobObject,
  filterListData: JobObject
) => {
  const tempSet = new Set()
  // 特殊情况，filterListData为空或者全obj[dim]为空时，返回[]。

  Object.keys(filterListData).forEach((dim: string) => {
    if (filterListData[dim].length <= 0) return
    const testVal = getDimensionValue(tjob, dim)
    if (dim === 'pp') {
      filterListData[dim].forEach((param: string) => {
        if (testVal.indexOf(param) > -1) {
          tempSet.add(`pp:${param}`)
        }
      })
    } else {
      const matchedIdx = filterListData[dim].indexOf(testVal)
      if (matchedIdx > -1) {
        tempSet.add(`${dim}:${filterListData[dim][matchedIdx]}`)
      }
    }
  })

  return Array.from(tempSet)
}
