import { Column } from './config-file'
import { downloadBlobFile } from '@/utils/request/downloadBlobFile'

const exportCommonPart = (allColumn:Column[], selectedTableRows:any[]):string => {
  const data = []
  // 这里要深拷贝,不然影响列的字段
  const titleData:any[] = JSON.parse(JSON.stringify(allColumn))
  const extraColumns = [
    { label: '提交编号', prop: 'submit_id' },
    { label: '性能数据', prop: 'performanceVal' }
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
    tableInfo['column'].forEach((column:any) => {
      columnLabels.push(column['label'])
      columnValues.push(testDatas[tableInfo['tableName']][0][column['prop']])
    })
    const extraValues = [
      selectedTableRows[0]['submit_id'],
      `"${testDatas[tableInfo['tableName']][0]['li-testcase']}"`,
      testDatas[tableInfo['tableName']][0][`performanceVal_${tableInfo['tableName']}`]
    ]
    columnLabels.splice(0, 0, ...['提交编号', '测试参数', '性能值'])
    columnValues.splice(0, 0, ...extraValues)
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
    tableInfo['column'].forEach((column:any) => {
      columnLabels.push(column['label'])
      baseDatas.push(baseRecord[0]['tableDatas'][tableInfo['tableName']][0][column['prop']])
    })
    const extraBaseDatas = [
      baseRecord[0]['submit_id'],
      `"${baseRecord[0]['tableDatas'][tableInfo['tableName']][0]['li-testcase']}"`,
      baseRecord[0]['tableDatas'][tableInfo['tableName']][0][`performanceVal_${tableInfo['tableName']}`]
    ]
    columnLabels.splice(0, 0, ...['提交编号', '测试参数', '性能值'])
    baseDatas.splice(0,0,...extraBaseDatas)
    // 其他数据
    otherRecords.forEach(record => {
      const columnValues:any[] = []
      const diffDatas:any[] = ['提升情况','']
      tableInfo['column'].forEach((column:any,index:number) => {
        const val = record['tableDatas'][tableInfo['tableName']][0][column['prop']]
        columnValues.push(val)
        diffDatas.push(Number(val) - Number(baseDatas[index + 3]))
      })
      const extraValues = [
        record['submit_id'],
        `"${record['tableDatas'][tableInfo['tableName']][0]['li-testcase']}"`,
        record['tableDatas'][tableInfo['tableName']][0][`performanceVal_${tableInfo['tableName']}`]
      ]
      columnValues.splice(0, 0, ...extraValues)
      diffDatas.splice(2,0,Number(extraValues[2]) - Number(baseDatas[2]))
      commonPartData = commonPartData.concat(`${tableInfo['tableName']}\r\n`)
      commonPartData = commonPartData.concat(`${columnLabels.join(',')}\r\n`)
      commonPartData = commonPartData.concat(`${baseDatas.join(',')}\r\n`)
      commonPartData = commonPartData.concat(`${columnValues.join(',')}\r\n`)
      commonPartData = commonPartData.concat(`${diffDatas.join(',')}\r\n\r\n\r\n`)
    })
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