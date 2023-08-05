declare namespace PerformanceApi {
  interface SimpleQueryConstant {
    constant_score: {
      filter: {
        terms: {
          submit_id: string[]
        }
      }
    }
  }

  interface SimpleQuery {
    query: SimpleQueryConstant
    size?: number
    _source: string[]
  }

  interface MulQueryTerms {
    terms: {
      suite: string[]
    }
  }

  interface MulQueryMatch {
    match: {
      job_state: string
    }
  }

  interface MulQueryRange {
    range: {
      time: {
        gte: string
      }
    }
  }

  type MulQueryMust = (MulQueryTerms | MulQueryMatch | MulQueryRange)[]

  interface MulQueryAggs {
    jobs_terms: {
      terms: {
        field: string
        size: number
      }
    }
  }

  interface MulQuery {
    size?: number
    aggs: MulQueryAggs
    query: {
      bool: {
        must: MulQueryMust
      }
    }
  }

  interface BaseQuery {
    index: string
    size?: number
  }

  interface PerformanceDataParams extends BaseQuery {
    query: SimpleQuery | MulQuery
  }

  interface JobValueListParams {
    byScene: string[]
    jobFieldList: string[]
    searchParams: BaseLine.SearchParams
    searchTime: number
    searchTotal: number
  }

  interface jobFieldListAggsItem {
    terms: {
      filed: string
      size: number
    }
  }
}
