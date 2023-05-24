import { Column } from './config-file'
import { invalidNumberSymbol } from './utils'
import { downloadBlobFile } from '@/utils/request/downloadBlobFile'

const exportCommonPart = (allColumn:Column[], selectedTableRows:any[]):string => {
  const data = []
  // 这里要深拷贝,不然影响列的字段
  const titleData:any[] = JSON.parse(JSON.stringify(allColumn))
  const extraColumns = [
    { label: '提交编号', prop: 'submit_id' },
    { label: '总体几何平均值', prop: 'performanceVal' }
  ]
  titleData.splice(0, 0, ...extraColumns)
  const title = titleData.map<string>((item: any) => item.label)
  const keys = titleData.map<string>((item: any) => item.prop)
  data.push(`${title.join(',')}\r\n`)
  // 数据
  const values:any[] = []
  selectedTableRows.forEach((record: any) => {
    const temp:string[] = []
    keys.forEach((key: string) => {
      temp.push(getProperty(record,key))
    })
    values.push(temp)
  })
  if (selectedTableRows[0]['suite'] === 'lmbench') {
    selectedTableRows.forEach((item,index) => {
      values[index][1] = `"Bandwidth=${item['performanceVal_local_bandwidths']},Latency=${item['performanceVal']}"`
    })
  }
  values.forEach(val => {
    data.push(`${val.join(',')}\r\n`)
  })
  return data.join('').concat('\r\n\r\n')
}

export const exportSingle = (allColumn:Column[], selectedTableRows:any[], tableColumnMap:any) => {
  let commonPartData = exportCommonPart(allColumn,selectedTableRows)
  const testDatas = selectedTableRows[0]['tableDatas']
  const tableInfos:any[] = tableColumnMap[selectedTableRows[0]['suite']]
  tableInfos.forEach(tableInfo => {
    const columnLabels:string[] = []
    const columnValues:any[] = []
    if (testDatas[tableInfo['tableName']]) {
      tableInfo['column'].forEach((column:any) => {
        columnLabels.push(column['label'])
        const columnVal = testDatas[tableInfo['tableName']][0][column['prop']]
        columnValues.push(columnVal === invalidNumberSymbol ? '暂无数据' : columnVal)
      })
      const extraValues = [
        selectedTableRows[0]['submit_id'],
        `"${testDatas[tableInfo['tableName']][0]['li-testcase']}"`,
        testDatas[tableInfo['tableName']][0][`performanceVal_${tableInfo['tableName']}`]
      ]
      columnLabels.splice(0, 0, ...['提交编号', '测试参数', '几何平均值'])
      columnValues.splice(0, 0, ...extraValues)
    } else {
      // 有的数据中可能缺少某些表格的数据
      columnLabels.splice(0, 0, ...['提交编号', '测试参数', '几何平均值'])
      columnValues.splice(0, 0, ...[selectedTableRows[0]['submit_id'],'N/A','N/A'])
    }

    commonPartData = commonPartData.concat(`${tableInfo['tableName']}\r\n`)
    commonPartData = commonPartData.concat(`${columnLabels.join(',')}\r\n`)
    commonPartData = commonPartData.concat(`${columnValues.join(',')}\r\n\r\n`)
  })
  doDownload(commonPartData)
}

export const exportMultiple = (allColumn:Column[], selectedTableRows:any[], tableColumnMap:any, currentRow:any) => {
  let commonPartData = exportCommonPart(allColumn, selectedTableRows)
  const baseRecord = selectedTableRows.filter(record => record['submit_id'] === currentRow['submit_id'])
  const otherRecords = selectedTableRows.filter(record => record['submit_id'] !== currentRow['submit_id'])
  const { suite } = selectedTableRows[0]
  tableColumnMap[suite].forEach((tableInfo:any) => {
    // 表头和基准数据
    const columnLabels:string[] = []
    const baseDatas:any[] = []
    generateBaseDatasAndColumn(tableInfo, columnLabels, baseDatas, baseRecord)
    // 其他数据
    commonPartData = generateOtherDataAndCompareTable(tableInfo, columnLabels, baseDatas, otherRecords, commonPartData)
  })
  doDownload(commonPartData)
}

function doDownload (dataString:string):void {
  const blob = new Blob([`\uFEFF${dataString}`], {
    type: 'text/csv;charset=utf-8'
  })
  downloadBlobFile(blob, '导出.csv')
}

const getProperty = (item:any, key:string):string => {
  const index = key.split('.')
  index.forEach(e => {
    item = item[e] || ''
  })
  return item
}

const generateBaseDatasAndColumn = (tableInfo: any, columnLabels: string[], baseDatas:any[], baseRecord:any[]) => {
  const recordDataByTable = baseRecord[0]['tableDatas'][tableInfo['tableName']]
  tableInfo['column'].forEach((column:any) => {
    columnLabels.push(column['label'])
    if (recordDataByTable) { // 对应表格有数据时才获取
      const columnVal = baseRecord[0]['tableDatas'][tableInfo['tableName']][0][column['prop']]
      baseDatas.push(columnVal === invalidNumberSymbol ? '暂无数据' : columnVal)
    }
  })
  if (recordDataByTable) {
    const extraBaseDatas = [
      baseRecord[0]['submit_id'],
      `"${baseRecord[0]['tableDatas'][tableInfo['tableName']][0]['li-testcase']}"`,
      baseRecord[0]['tableDatas'][tableInfo['tableName']][0][`performanceVal_${tableInfo['tableName']}`]
    ]
    columnLabels.splice(0, 0, ...['提交编号', '测试参数', '几何平均值'])
    baseDatas.splice(0,0,...extraBaseDatas)
  } else {
    columnLabels.splice(0, 0, ...['提交编号', '测试参数', '几何平均值'])
    baseDatas.splice(0,0,...[baseRecord[0]['submit_id'], '暂无数据', '暂无数据'])
  }
}

const generateOtherDataAndCompareTable = (
  tableInfo: any, columnLabels: string[], baseDatas: any[], otherRecords: any[], commonPartData:string
) => {
  otherRecords.forEach((record: any) => {
    const recordDataByTable = record['tableDatas'][tableInfo['tableName']]
    const columnValues:any[] = []
    const diffDatas:any[] = [`较${baseDatas[0]}提升情况`,'']
    tableInfo['column'].forEach((column:any,index:number) => {
      if (recordDataByTable) {
        const val = record['tableDatas'][tableInfo['tableName']][0][column['prop']]
        columnValues.push(val === invalidNumberSymbol ? '暂无数据' : val)
        if (!val || val === invalidNumberSymbol || !baseDatas[index + 3] || isNaN(baseDatas[index + 3])) {
          diffDatas.push('N/A')
        } else {
          diffDatas.push(`${(Number(val) - Number(baseDatas[index + 3]))/Number(baseDatas[index + 3])*100}%`)
        }
      } else {
        columnValues.push('N/A')
        diffDatas.push('N/A')
      }
    })
    if (recordDataByTable && baseDatas[2] && !isNaN(baseDatas[2])) {
      const extraValues = [
        record['submit_id'],
        `"${record['tableDatas'][tableInfo['tableName']][0]['li-testcase']}"`,
        record['tableDatas'][tableInfo['tableName']][0][`performanceVal_${tableInfo['tableName']}`]
      ]
      columnValues.splice(0, 0, ...extraValues)
      diffDatas.splice(2,0,`${(Number(extraValues[2]) - Number(baseDatas[2]))/Number(baseDatas[2])*100}%`)
    } else {
      columnValues.splice(0, 0, ...[record['submit_id'], 'N/A', 'N/A'])
      diffDatas.splice(2,0, 'N/A')
    }

    commonPartData = commonPartData.concat(`${tableInfo['tableName']}\r\n`)
      .concat(`${columnLabels.join(',')}\r\n`)
      .concat(`${baseDatas.join(',')}\r\n`)
      .concat(`${columnValues.join(',')}\r\n`)
      .concat(`${diffDatas.join(',')}\r\n\r\n\r\n`)
  })
  return commonPartData
}