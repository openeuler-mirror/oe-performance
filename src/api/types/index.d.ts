declare namespace PerformanceApi {
  // 该命名空间中的类型, 前缀***Query为同一个查询组

  interface SimpleQueryConstant {
    constant_score: {
      filter: {
        terms: {
          submit_id: string[]
        }
      }
    }
  }

  // 性能基线中单个suite的查询
  interface SimpleQuery {
    query: SimpleQueryConstant
    size?: number
    _source: string[]
  }

  interface MulQueryTerms {
    terms: {
      [key in keyof BaseLine.SearchParams]: string[]
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

  // 性能基线中多个suite查询
  interface MulQuery {
    size?: number
    aggs: MulQueryAggs
    query: {
      bool: {
        must: MulQueryMust
      }
    }
  }

  interface DetailQueryContent {
    term: {
      submit_id: string
    }
  }

  // 任务详细中的查询
  interface DetailQuery {
    size?: number
    _source: string[]
    query: DetailQueryContent
  }

  // 任务对比的查询
  interface ComparisonQuery {
    size?: number
    _source: string[]
    query: {
      bool: {
        must: MulQueryMust
      }
    }
  }

  interface TestTaskQueryWildcard {
    wildcard: {
      submit_id: string
    }
  }

  type TestTaskQueryMust = Array<
    MulQueryTerms | MulQueryMatch | MulQueryRange | TestTaskQueryWildcard
  >

  interface TestTaskQueryBool {
    must?: TestTaskQueryMust
    must_not?: {
      terms: {
        job_state: string[]
      }
    }[]
  }

  // 测试任务的查询
  interface TestTaskQuery {
    size?: number
    query: {
      bool: TestTaskQueryBool
    }
    aggs: MulQueryAggs
  }

  // 所有param都需要指定的最基本的参数
  interface BaseQuery {
    index: string
    size?: number
  }

  interface PerformanceDataParams extends BaseQuery {
    query:
      | SimpleQuery
      | MulQuery
      | DetailQuery
      | ComparisonQuery
      | TestTaskQuery
  }

  interface JobValueListParams {
    byScene?: string[]
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
