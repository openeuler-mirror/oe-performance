export const testParamsMap = {
  stream: [
    'pp.stream.nr_threads',
    'pp.stream.array_size',
    'pp.stream.omp'
  ],
  unixbench: [
    'pp.unixbench.nr_task'
  ],
  lmbench: [
    'pp.lmbench.mode',
    'pp.lmbench.nr_thread',
    'pp.lmbench.test_memory_size'
  ],
  netperf: [
    'pp.netperf.test',
    'pp.netperf.send_size'
  ]
}

export const kpiListMap = {
  stream: [
    'stream.copy_bandwidth_MBps',
    'stream.triad_bandwidth_MBps',
    'stream.add_bandwidth_MBps',
    'stream.scale_bandwidth_MBps'
  ],
  unixbench: [
    'unixbench.Dhrystone_2_using_register_variables',
    'unixbench.Double-Precision_Whetstone',
    'unixbench.Execl_Throughput',
    'unixbench.File_Copy_1024_bufsize_2000_maxblocks',
    'unixbench.File_Copy_256_bufsize_500_maxblocks',
    'unixbench.File_Copy_4096_bufsize_8000_maxblocks',
    'unixbench.Pipe_Throughput',
    'unixbench.Pipe-based_Context_Switching',
    'unixbench.Process_Creation',
    'unixbench.Shell_Scripts_(1_concurrent)',
    'unixbench.Shell_Scripts_(8_concurrent)',
    'unixbench.System_Call_Overhead',
    'unixbench.System_Benchmarks_Index_Score'
  ],
  lmbench: [
    'lmbench.syscall.syscall.latency.us',
    'lmbench.syscall.stat.latency.us',
    'lmbench.syscall.open/close.latency.us',
    'lmbench.null_io',
    'lmbench.Process.fork+exit.latency.us',
    'lmbench.Process.fork+execve.latency.us',
    'lmbench.Process.fork+/bin/sh.latency.us',
    'lmbench3.Select.100tcp.latency.us',
    'lmbench.sig_inst',
    'lmbench.sig_hndl',
    'lmbench.PIPE.latency.us',
    'lmbench.AF_UNIX.sock.stream.latency.us',
    'lmbench.UDP.usinglocalhost.latency.us',
    'lmbench.TCP.localhost.latency',
    'lmbench.CONNECT.localhost.latency.us',
    'lmbench.PIPE.bandwidth.MB/sec',
    'lmbench.AF_UNIX.sock.stream.bandwidth.MB/sec',
    'lmbench.TCP.socket.bandwidth.10MB.MB/sec',
    'lmbench.FILE.read.bandwidth.MB/sec',
    'lmbench.MMAP.read.bandwidth.MB/sec',
    'lmbench.BCOPY.libc.bandwidth.MB/sec',
    'lmbench.BCOPY.unrolled.bandwidth.MB/sec',
    'lmbench.BCOPY.memory_read.bandwidth.MB/sec',
    'lmbench.BCOPY.memory_write.bandwidth.MB/sec',
    'lmbench.CTX.2P.0K.latency.us',
    'lmbench.CTX.2P.16K.latency.us',
    'lmbench.CTX.2P.64K.latency.us',
    'lmbench.CTX.8P.16K.latency.us',
    'lmbench.CTX.8P.64K.latency.us',
    'lmbench.CTX.16P.16K.latency.us',
    'lmbench.CTX.16P.64K.latency.us',
    'lmbench.Mmap_Latency',
    'lmbench.Prot_Fault',
    'lmbench.Pagefaults.ms',
    'lmbench.Select.100fd.latency.us',
    'lmbench.L1_$',
    'lmbench.L2_$',
    'lmbench.Main_mem',
    'lmbench.Rand_mem'
  ],
  netperf: [
    'netperf.Throughput_tps'
  ]
}

export const tableMode = {
  stream: 'defualt',
  unixbench: 'index',
  lmbench: 'default',
  netperf: 'mix'
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
  ],
  unixbench: [
    {
      tableName: '单核',
      mode: 'byIndex',
      column: [
        {
          label: 'Dhrystone_2_using_register_variables',
          prop: 'unixbench.Dhrystone_2_using_register_variables'
        },
        {
          label: 'Double-Precision_Whetstone',
          prop: 'unixbench.Double-Precision_Whetstone'
        },
        {
          label: 'Execl_Throughput',
          prop: 'unixbench.Execl_Throughput'
        },
        {
          label: 'File_Copy_1024_bufsize_2000_maxblocks',
          prop: 'unixbench.File_Copy_1024_bufsize_2000_maxblocks'
        },
        {
          label: 'File_Copy_256_bufsize_500_maxblocks',
          prop: 'unixbench.File_Copy_256_bufsize_500_maxblocks'
        },
        {
          label: 'File_Copy_4096_bufsize_8000_maxblocks',
          prop: 'unixbench.File_Copy_4096_bufsize_8000_maxblocks'
        },
        {
          label: 'Pipe_Throughput',
          prop: 'unixbench.Pipe_Throughput'
        },
        {
          label: 'Pipe-based_Context_Switching',
          prop: 'unixbench.Pipe-based_Context_Switching'
        },
        {
          label: 'Process_Creation',
          prop: 'unixbench.Process_Creation'
        },
        {
          label: 'Shell_Scripts_(1_concurrent)',
          prop: 'unixbench.Shell_Scripts_(1_concurrent)'
        },
        {
          label: 'Shell_Scripts_(8_concurrent)',
          prop: 'unixbench.Shell_Scripts_(8_concurrent)'
        },
        {
          label: 'System_Call_Overhead',
          prop: 'unixbench.System_Call_Overhead'
        },
        {
          label: 'System_Benchmarks_Index_Score',
          prop: 'unixbench.System_Benchmarks_Index_Score'
        },
      ]
    }
  ],
  lmbench: [
    {
      tableName: 'Processor_Processes',
      column: [
        {
          label: 'syscall.syscall.latency.us',
          prop: 'lmbench.syscall.syscall.latency.us'
        },
        {
          label: 'syscall.stat.latency.us',
          prop: 'lmbench.syscall.stat.latency.us'
        },
        {
          label: 'syscall.open/close.latency.us',
          prop: 'lmbench.syscall.open/close.latency.us'
        },
        {
          label: 'null_io',
          prop: 'lmbench.null_io'
        },
        {
          label: 'Process.fork+exit.latency.us',
          prop: 'lmbench.Process.fork+exit.latency.us'
        },
        {
          label: 'Process.fork+execve.latency.us',
          prop: 'lmbench.Process.fork+execve.latency.us'
        },
        {
          label: 'Process.fork+/bin/sh.latency.us',
          prop: 'lmbench.Process.fork+/bin/sh.latency.us'
        },
        {
          label: 'Select.100tcp.latency.us',
          prop: 'lmbench3.Select.100tcp.latency.us'
        },
        {
          label: 'sig_inst',
          prop: 'lmbench.sig_inst'
        },
        {
          label: 'sig_hndl',
          prop: 'lmbench.sig_hndl'
        },
      ]
    },
    {
      tableName: 'local_latencies',
      column: [
        {
          label: 'PIPE.latency.us',
          prop: 'lmbench.PIPE.latency.us'
        },
        {
          label: 'AF_UNIX.sock.stream.latency.us',
          prop: 'lmbench.AF_UNIX.sock.stream.latency.us'
        },
        {
          label: 'UDP.usinglocalhost.latency.us',
          prop: 'lmbench.UDP.usinglocalhost.latency.us'
        },
        {
          label: 'TCP.localhost.latency',
          prop: 'lmbench.TCP.localhost.latency'
        },
        {
          label: 'CONNECT.localhost.latency.us',
          prop: 'lmbench.CONNECT.localhost.latency.us'
        },
      ]
    },
    {
      tableName: 'local_bandwidths',
      column: [
        {
          label: 'PIPE.bandwidth.MB/sec',
          prop: 'lmbench.PIPE.bandwidth.MB/sec'
        },
        {
          label: 'AF_UNIX.sock.stream.bandwidth.MB/sec',
          prop: 'lmbench.AF_UNIX.sock.stream.bandwidth.MB/sec'
        },
        {
          label: 'TCP.socket.bandwidth.10MB.MB/sec',
          prop: 'lmbench.TCP.socket.bandwidth.10MB.MB/sec'
        },
        {
          label: 'FILE.read.bandwidth.MB/sec',
          prop: 'lmbench.FILE.read.bandwidth.MB/sec'
        },
        {
          label: 'MMAP.read.bandwidth.MB/sec',
          prop: 'lmbench.MMAP.read.bandwidth.MB/sec'
        },
        {
          label: 'BCOPY.libc.bandwidth.MB/sec',
          prop: 'lmbench.BCOPY.libc.bandwidth.MB/sec'
        },
        {
          label: 'BCOPY.unrolled.bandwidth.MB/sec',
          prop: 'lmbench.BCOPY.unrolled.bandwidth.MB/sec'
        },
        {
          label: 'BCOPY.memory_read.bandwidth.MB/sec',
          prop: 'lmbench.BCOPY.memory_read.bandwidth.MB/sec'
        },
        {
          label: 'BCOPY.memory_write.bandwidth.MB/sec',
          prop: 'lmbench.BCOPY.memory_write.bandwidth.MB/sec'
        },
      ]
    },
    {
      tableName: 'Context_switching_ctxsw',
      column: [
        {
          label: 'CTX.2P.0K.latency.us',
          prop: 'lmbench.CTX.2P.0K.latency.us'
        },
        {
          label: 'CTX.2P.16K.latency.us',
          prop: 'lmbench.CTX.2P.16K.latency.us'
        },
        {
          label: 'CTX.2P.64K.latency.us',
          prop: 'lmbench.CTX.2P.64K.latency.us'
        },
        {
          label: 'CTX.8P.16K.latency.us',
          prop: 'lmbench.CTX.8P.16K.latency.us'
        },
        {
          label: 'CTX.8P.64K.latency.us',
          prop: 'lmbench.CTX.8P.64K.latency.us'
        },
        {
          label: 'CTX.16P.16K.latency.us',
          prop: 'lmbench.CTX.16P.16K.latency.us'
        },
        {
          label: 'CTX.16P.64K.latency.us',
          prop: 'lmbench.CTX.16P.64K.latency.us'
        },
      ]
    },
    {
      tableName: 'File_&_VM_latencies',
      column: [
        {
          label: 'Mmap_Latency',
          prop: 'lmbench.Mmap_Latency'
        },
        {
          label: 'Prot_Fault',
          prop: 'lmbench.Prot_Fault'
        },
        {
          label: 'Pagefaults.ms',
          prop: 'lmbench.Pagefaults.ms'
        },
        {
          label: 'Select.100fd.latency.us',
          prop: 'lmbench.Select.100fd.latency.us'
        },
      ]
    },
    {
      tableName: 'Memory_latencies',
      column: [
        {
          label: 'L1_$',
          prop: 'lmbench.L1_$'
        },
        {
          label: 'L2_$',
          prop: 'lmbench.L2_$'
        },
        {
          label: 'Main_mem',
          prop: 'lmbench.Main_mem'
        },
        {
          label: 'Rand_mem',
          prop: 'lmbench.Rand_mem'
        },
      ]
    }
  ],
  netperf: [
    {
      tableName: 'TCP_STREAM',
      mode: 'mixPP',
      mixPP: ['pp.netperf.test=TCP_STREAM'], // 除了某个pp以外，将其他pp作为属性合并到一条数据中
      column: [
        {label: '1', prop: 'pp.netperf.send_size=1'},
        {label: '64', prop: 'pp.netperf.send_size=64'},
        {label: '128', prop: 'pp.netperf.send_size=128'},
        {label: '256', prop: 'pp.netperf.send_size=256'},
        {label: '512', prop: 'pp.netperf.send_size=512'},
        {label: '1024', prop: 'pp.netperf.send_size=1024'},
        {label: '1500', prop: 'pp.netperf.send_size=1500'},
        {label: '2048', prop: 'pp.netperf.send_size=2048'},
        {label: '4096', prop: 'pp.netperf.send_size=4096'},
        {label: '9000', prop: 'pp.netperf.send_size=9000'},
        {label: '16384', prop: 'pp.netperf.send_size=16384'},
        {label: '32768', prop: 'pp.netperf.send_size=32768'},
      ]
    },
    {
      tableName: 'UDP_STREAM',
      mode: 'mixPP',
      mixPP: ['pp.netperf.test=TCP_STREAM'],
      column: [
        {label: '1', prop: 'pp.netperf.send_size=1'},
        {label: '64', prop: 'pp.netperf.send_size=64'},
        {label: '128', prop: 'pp.netperf.send_size=128'},
        {label: '256', prop: 'pp.netperf.send_size=256'},
        {label: '512', prop: 'pp.netperf.send_size=512'},
        {label: '1024', prop: 'pp.netperf.send_size=1024'},
        {label: '1500', prop: 'pp.netperf.send_size=1500'},
        {label: '2048', prop: 'pp.netperf.send_size=2048'},
        {label: '4096', prop: 'pp.netperf.send_size=4096'},
        {label: '9000', prop: 'pp.netperf.send_size=9000'},
        {label: '16384', prop: 'pp.netperf.send_size=16384'},
        {label: '32768', prop: 'pp.netperf.send_size=32768'},
      ]
    },
    {
      tableName: 'Protocol_kind',
      mode: 'mixPP',
      mixPP: [],
      column: [
        {label: 'TCP_RR', prop: 'pp.netperf.test=TCP_RR'},
        {label: 'UDP_RR', prop: 'pp.netperf.test=UDP_RR'},
        {label: 'TCP_CRR', prop: 'pp.netperf.test=TCP_CRR'}
      ]
    }
  ]
}