export function parseQueryStringTo2dArray(queryString: string){
  if (!queryString) return
  const resultArr: string[][] = []
  const tempArr = queryString.split('@')
  tempArr.forEach((row, idx) => {
    resultArr[idx] = row.split(',')
  })
  return resultArr
}
