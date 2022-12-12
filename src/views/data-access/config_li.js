export const testParamsMap = {
  stream: [
    'pp.stream.nr_threads',
    'pp.stream.array_size',
    'pp.stream.omp'
  ]
}

export const kpiListMap = {
  stream: [
    'stream.copy_bandwidth_MBps',
    'stream.triad_bandwidth_MBps',
    'stream.add_bandwidth_MBps',
    'stream.scale_bandwidth_MBps'
  ]
}

export const tableColumnMap = {
  stream: [
    {
      tableName: 'Function',
      column: [
        {
          label: 'copy',
          prop: 'stream.copy_bandwidth_MBps'
        },
        {
          label: 'triad',
          prop: 'stream.triad_bandwidth_MBps'
        },
        {
          label: 'add',
          prop: 'stream.add_bandwidth_MBps'
        },
        {
          label: 'scale',
          prop: 'stream.scale_bandwidth_MBps'
        },
      ]
    }
  ]
}