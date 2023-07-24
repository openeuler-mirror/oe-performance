declare namespace PerformanceApi {
  interface GetPerformanceDataParams {
    index: string
    query: {
      aggs: {
        jobs_terms: {
          terms: {
            field: string
            size: number
          }
        }
      }
      query: {
        bool: {
          must: []
        }
      }
    }
    size: number
  }
}
