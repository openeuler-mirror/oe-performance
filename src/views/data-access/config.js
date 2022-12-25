export const jobModel = {
  kpis: {
    'stats.stream.bandwidth_MBps':                  { direction: 1,  label: '内存带宽(MBps)' },
    'stats.netperf.Throughput_Mbps':                { direction: 1,  label: '网络带宽(MBps)' },
    'stats.netperf.Throughput_tps':                 { direction: 1,  label: '请求转换率(应答次数/s)' },
    'stats.unixbench.score':                        { direction: 1,  label: '综合跑分' },
    'stats.lmbench.local_bandwidths':               { direction: 1,  label: '内存映射、拷贝及读写带宽(MB/s)' },
    'stats.lmbench.Processor_Processes.latency':    { direction: -1, label: 'CPU、进程常用操作延迟(us)' },
    'stats.lmbench.local_latencies':                { direction: -1, label: '本地通信延迟(us)' },
    'stats.lmbench.Context_switching_ctxsw':        { direction: -1, label: '进程上下文切换开销(us)' },
    'stats.lmbench.File_&_VM_latencies':            { direction: -1, label: '内存映射延迟(us)' },
    'stats.lmbench.Memory_latencies':               { direction: -1, label: '主存及缓存延迟(us)' },
    'stats.libmicro.usecs_per_call':                { direction: -1, label: '系统调用延迟(us)' },
  },
}

// suite中的键代表实际报出的各个结果；kpi代表这个结果归属的表格（名）；testcase对应表格的列
export const kpiMaps = {
  stream: {
    add_bandwidth_MBps:     { kpi: 'bandwidth_MBps', testcase: 'add'        },
    copy_bandwidth_MBps:    { kpi: 'bandwidth_MBps', testcase: 'copy'       },
    scale_bandwidth_MBps:   { kpi: 'bandwidth_MBps', testcase: 'scale'      },
    triad_bandwidth_MBps:   { kpi: 'bandwidth_MBps', testcase: 'triad'      },
  },
  lmbench: {
    'syscall.syscall.latency.us':       { kpi: 'Processor_Processes.latency', testcase: 'syscall.syscall'      },
    'syscall.stat.latency.us':          { kpi: 'Processor_Processes.latency', testcase: 'syscall.stat'         },
    'syscall.open/close.latency.us':    { kpi: 'Processor_Processes.latency', testcase: 'syscall.open/close'   },
    'null_io':                          { kpi: 'Processor_Processes.latency', testcase: 'null_io'              },
    'Process.fork+exit.latency.us':     { kpi: 'Processor_Processes.latency', testcase: 'Process.fork+exit'    },
    'Process.fork+execve.latency.us':   { kpi: 'Processor_Processes.latency', testcase: 'Process.fork+execve'  },
    'Process.fork+/bin/sh.latency.us':  { kpi: 'Processor_Processes.latency', testcase: 'Process.fork+/bin/sh' },
    'Select.100tcp.latency.us':         { kpi: 'Processor_Processes.latency', testcase: 'Select.100tcp'        },
    'sig_inst':                         { kpi: 'Processor_Processes.latency', testcase: 'sig_inst'             },
    'sig_hndl':                         { kpi: 'Processor_Processes.latency', testcase: 'sig_hndl'             },  
    'PIPE.latency.us':                  { kpi: 'local_latencies', testcase: 'PIPE'                      },
    'AF_UNIX.sock.stream.latency.us':   { kpi: 'local_latencies', testcase: 'AF_UNIX.sock.stream'       },
    'UDP.usinglocalhost.latency.us':    { kpi: 'local_latencies', testcase: 'UDP.usinglocalhost'        },
    'TCP.localhost.latency':            { kpi: 'local_latencies', testcase: 'TCP.localhost.latency'     },
    'CONNECT.localhost.latency.us':     { kpi: 'local_latencies', testcase: 'CONNECT.localhost'         },  
    'PIPE.bandwidth.MB/sec':                    { kpi: 'local_bandwidths', testcase: 'PIPE'                     },
    'AF_UNIX.sock.stream.bandwidth.MB/sec':     { kpi: 'local_bandwidths', testcase: 'AF_UNIX.sock.stream'      },
    'TCP.socket.bandwidth.10MB.MB/sec':         { kpi: 'local_bandwidths', testcase: 'TCP.socket'               },
    'FILE.read.bandwidth.MB/sec':               { kpi: 'local_bandwidths', testcase: 'FILE.read'                },
    'MMAP.read.bandwidth.MB/sec':               { kpi: 'local_bandwidths', testcase: 'MMAP.read'                },
    'BCOPY.libc.bandwidth.MB/sec':              { kpi: 'local_bandwidths', testcase: 'BCOPY.libc'               },
    'BCOPY.unrolled.bandwidth.MB/sec':          { kpi: 'local_bandwidths', testcase: 'BCOPY.unrolled'           },
    'BCOPY.memory_read.bandwidth.MB/sec':       { kpi: 'local_bandwidths', testcase: 'BCOPY.memory_read'        },
    'BCOPY.memory_write.bandwidth.MB/sec':      { kpi: 'local_bandwidths', testcase: 'BCOPY.memory_write'       },  
    'CTX.2P.0K.latency.us':     { kpi: 'Context_switching_ctxsw', testcase: 'CTX.2P.0K'         },
    'CTX.2P.16K.latency.us':    { kpi: 'Context_switching_ctxsw', testcase: 'CTX.2P.16K'        },
    'CTX.2P.64K.latency.us':    { kpi: 'Context_switching_ctxsw', testcase: 'CTX.2P.64K'        },
    'CTX.8P.16K.latency.us':    { kpi: 'Context_switching_ctxsw', testcase: 'CTX.8P.16K'        },
    'CTX.8P.64K.latency.us':    { kpi: 'Context_switching_ctxsw', testcase: 'CTX.8P.64K'        },
    'CTX.16P.16K.latency.us':   { kpi: 'Context_switching_ctxsw', testcase: 'CTX.16P.16K'       },
    'CTX.16P.64K.latency.us':   { kpi: 'Context_switching_ctxsw', testcase: 'CTX.16P.64K'       },  
    'Mmap_Latency':             { kpi: 'File_&_VM_latencies', testcase: 'Mmap'          },
    'Prot_Fault':               { kpi: 'File_&_VM_latencies', testcase: 'Prot_Fault'    },
    'Pagefaults.ms':            { kpi: 'File_&_VM_latencies', testcase: 'Pagefaults.ms' },
    'Select.100fd.latency.us':  { kpi: 'File_&_VM_latencies', testcase: 'Select.100fd'  },  
    'L1_$':             { kpi: 'Memory_latencies', testcase: 'L1_$'     },
    'L2_$':             { kpi: 'Memory_latencies', testcase: 'L2_$'     },
    'Main_mem':         { kpi: 'Memory_latencies', testcase: 'Main_mem' },
    'Rand_mem':         { kpi: 'Memory_latencies', testcase: 'Rand_mem' },
  }
}

const libmicroGroups = [
  'c_', 'get', 'malloc', 'memcpy', 'memset', 'mmap', 'mprot', 'pipe', 'poll',
  'pread', 'pwrite', 'read', 'select', 'str', 'unmap', 'write', 'writev',
  'Miscellaneous' // all the others, keep it the last element
]

export const kpiMapFuncs = {
  // unixbench raw output:
  //              System Benchmarks Index Values               BASELINE       RESULT    INDEX
  //   Dhrystone 2 using register variables         116700.0 1216141306.0 104210.9
  //   Double-Precision Whetstone                       55.0     247738.4  45043.4
  //   Execl Throughput                                 43.0      45776.0  10645.6
  //   File Copy 1024 bufsize 2000 maxblocks          3960.0     750537.5   1895.3
  //   File Copy 256 bufsize 500 maxblocks            1655.0     206575.3   1248.2
  //   File Copy 4096 bufsize 8000 maxblocks          5800.0    2118991.9   3653.4
  //   Pipe Throughput                               12440.0   23957030.6  19258.1
  //   Pipe-based Context Switching                   4000.0    5894570.6  14736.4
  //   Process Creation                                126.0     110733.5   8788.4
  //   Shell Scripts (1 concurrent)                     42.4     127791.1  30139.4
  //   Shell Scripts (8 concurrent)                      6.0      17638.5  29397.5
  //   System Call Overhead                          15000.0    3657597.3   2438.4
  //                                                                      ========
  //   System Benchmarks Index Score                                       10729.3
  //
  // unixbench stats:
  //   stats.unixbench.Dhrystone_2_using_register_variables
  //   stats.unixbench.Double-Precision_Whetstone
  //   stats.unixbench.Execl_Throughput
  //   stats.unixbench.File_Copy_1024_bufsize_2000_maxblocks
  //   stats.unixbench.File_Copy_256_bufsize_500_maxblocks
  //   stats.unixbench.File_Copy_4096_bufsize_8000_maxblocks
  //   stats.unixbench.Pipe-based_Context_Switching
  //   stats.unixbench.Pipe_Throughput
  //   stats.unixbench.Process_Creation
  //   stats.unixbench.Shell_Scripts_(1_concurrent)
  //   stats.unixbench.Shell_Scripts_(8_concurrent)
  //   stats.unixbench.System_Call_Overhead
  unixbench: function (kpi) {
    return {
      kpi: 'score',
      testcase: kpi,  // can do this in caller: .replace('stats.unixbench.', '')
    }
  },
  libmicro: function (kpi) {
    // https://github.com/rzezeski/libMicro/blob/master/bench.sh has the group info
    let testgroup = libmicroGroups[libmicroGroups.length - 1]
    for (const group of libmicroGroups) {
      if (kpi.startsWith(group)) {
        testgroup = group
        break
      }
    }
    return {
      // testgroup is not test param that impacts test result,
      // but merely a way to break up the too many test cases,
      // so that they can be shown in multiple talbes,
      // as described in suiteTables.libmicro
      testgroup: testgroup,
      testcase: kpi,
      kpi: 'usecs_per_call',
    }
  },
}

// ==================================
// kpi 代表table某个table
export const suiteTables = {
  netperf: [
    { kpi: 'Throughput_Mbps', x_param: 'send_size', filters: { test: 'TCP_STREAM' }         },
    { kpi: 'Throughput_Mbps', x_param: 'send_size', filters: { test: 'UDP_STREAM' }         },
    { kpi: 'Throughput_tps',  x_param: 'test'                                               },
  ],
  stream: [{
    kpi: 'bandwidth_MBps',
    x_param: 'testcase',
  }],
  unixbench: [
    { kpi: 'score', x_param: 'testcase', filters: { nr_task: '1' }          },
    { kpi: 'score', x_param: 'testcase', filters: { nr_task: '100%' }       },
  ],
  lmbench: [
    { kpi: 'local_bandwidths',              x_param: 'testcase' },
    { kpi: 'Processor_Processes.latency',   x_param: 'testcase' },
    { kpi: 'local_latencies',               x_param: 'testcase' },
    { kpi: 'Context_switching_ctxsw',       x_param: 'testcase' },
    { kpi: 'File_&_VM_latencies',           x_param: 'testcase' },
    { kpi: 'Memory_latencies',              x_param: 'testcase' },
  ],
  libmicro: [
  ],
}

for (const group of libmicroGroups) {
  suiteTables.libmicro.push ({
    kpi: 'usecs_per_call',
    x_param: 'testcase',
    filters: { testgroup: group }
  })
}

// ========================
// 部分使用kpiMapFuncs 映射的数据，没有提供kpi列表，目前暂时通过这个数据来给出kpi
export const addtionalKpiMaps = {
  unixbench: [
    'Dhrystone_2_using_register_variables',
    'Double-Precision_Whetstone',
    'Execl_Throughput',
    'File_Copy_1024_bufsize_2000_maxblocks',
    'File_Copy_256_bufsize_500_maxblocks',
    'File_Copy_4096_bufsize_8000_maxblocks',
    'Pipe-based_Context_Switching',
    'Pipe_Throughput',
    'Process_Creation',
    'Shell_Scripts_(1_concurrent)',
    'Shell_Scripts_(8_concurrent)',
    'System_Call_Overhead'
  ],
  libmicro: [
    'getpid',
    'getenv',
    'getenvT2',
    'gettimeofday',
    'log',
    'exp',
    'lrand48',
    'memset_10',
    'memset_256',
    'memset_256_u',
    'memset_1k',
    'memset_4k',
    'memset_4k_uc',
    'memset_10k',
    'memset_1m',
    'memset_10m',
    'memsetP2_10m',
    'memrand',
    'isatty_yes',
    'isatty_no',
    'malloc_10',
    'malloc_100',
    'malloc_1k',
    'malloc_10k',
    'malloc_100k',
    'mallocT2_10',
    'mallocT2_100',
    'mallocT2_1k',
    'mallocT2_10k',
    'mallocT2_100k',
    'close_bad',
    'close_tmp',
    'close_usr',
    'close_zero',
    'memcpy_10',
    'memcpy_1k',
    'memcpy_10k',
    'memcpy_1m',
    'memcpy_10m',
    'strcpy_10',
    'strchr_1k',
    'strcmp_10',
    'strcmp_1k',
    'scasecmp_10',
    'scasecmp_1k',
    'strtol',
    'getcontext',
    'setcontext',
    'mutex_st',
    'mutex_mt',
    'mutex_T2',
    'longjmp',
    'siglongjmp',
    'getrusage',
    'times',
    'time',
    'localtime_r',
    'strftime',
    'mktime',
    'mktimeT2',
    'c_mutex_1',
    'c_mutex_10',
    'c_mutex_200',
    'c_cond_1',
    'c_cond_10',
    'c_cond_200',
    'c_lockf_1',
    'c_lockf_10',
    'c_lockf_200',
    'c_flock',
    'c_flock_10',
    'c_flock_200',
    'c_fcntl_1',
    'c_fcntl_10',
    'c_fcntl_200',
    'file_lock',
    'getsockname',
    'getpeername',
    'chdir_tmp',
    'chdir_usr',
    'chgetwd_tmp',
    'chgetwd_usr',
    'realpath_tmp',
    'realpath_usr',
    'stat_tmp',
    'stat_usr',
    'fcntl_tmp',
    'fcntl_usr',
    'fcntl_ndelay',
    'lseek_t8k',
    'lseek_u8k',
    'open_tmp',
    'open_usr',
    'open_zero',
    'dup',
    'socket_u',
    'socket_i',
    'socketpair',
    'setsockopt',
    'bind',
    'listen',
    'connection',
    'poll_10',
    'poll_100',
    'poll_1000',
    'poll_w10',
    'poll_w100',
    'poll_w1000',
    'select_10',
    'select_100',
    'select_1000',
    'select_w10',
    'select_w100',
    'select_w1000',
    'semop',
    'sigaction',
    'signal',
    'sigprocmask',
    'pthread_8',
    'pthread_32',
    'pthread_128',
    'pthread_512',
    'fork_10',
    'fork_100',
    'fork_1000',
    'exit_10',
    'exit_100',
    'exit_1000',
    'exit_10_nolibc',
    'exec',
    'system',
    'recurse',
    'read_t1k',
    'read_t10k',
    'read_t100k',
    'read_u1k',
    'read_u10k',
    'read_u100k',
    'read_z1k',
    'read_z10k',
    'read_z100k',
    'read_zw100k',
    'write_t1k',
    'write_t10k',
    'write_t100k',
    'write_u1k',
    'write_u10k',
    'write_u100k',
    'write_n1k',
    'write_n10k',
    'write_n100k',
    'writev_t1k',
    'writev_t10k',
    'writev_t100k',
    'writev_u1k',
    'writev_u10k',
    'writev_u100k',
    'writev_n1k',
    'writev_n10k',
    'writev_n100k',
    'pread_t1k',
    'pread_t10k',
    'pread_t100k',
    'pread_u1k',
    'pread_u10k',
    'pread_u100k',
    'pread_z1k',
    'pread_z10k',
    'pread_z100k',
    'pread_zw100k',
    'pwrite_t1k',
    'pwrite_t10k',
    'pwrite_t100k',
    'pwrite_u1k',
    'pwrite_u10k',
    'pwrite_u100k',
    'pwrite_n1k',
    'pwrite_n10k',
    'pwrite_n100k',
    'mmap_z8k',
    'mmap_z128k',
    'mmap_t8k',
    'mmap_t128k',
    'mmap_u8k',
    'mmap_u128k',
    'mmap_a8k',
    'mmap_a128k',
    'mmap_rz8k',
    'mmap_rz128k',
    'mmap_rt8k',
    'mmap_rt128k',
    'mmap_ru8k',
    'mmap_ru128k',
    'mmap_ra8k',
    'mmap_ra128k',
    'mmap_wz8k',
    'mmap_wz128k',
    'mmap_wt8k',
    'mmap_wt128k',
    'mmap_wu8k',
    'mmap_wu128k',
    'mmap_wa8k',
    'mmap_wa128k',
    'unmap_z8k',
    'unmap_z128k',
    'unmap_t8k',
    'unmap_t128k',
    'unmap_u8k',
    'unmap_u128k',
    'unmap_a8k',
    'unmap_a128k',
    'unmap_rz8k',
    'unmap_rz128k',
    'unmap_rt8k',
    'unmap_rt128k',
    'unmap_ru8k',
    'unmap_ru128k',
    'unmap_ra8k',
    'unmap_ra128k',
    'conn_connect',
    'unmap_wz8k',
    'unmap_wz128k',
    'unmap_wt8k',
    'unmap_wt128k',
    'unmap_wu8k',
    'unmap_wu128k',
    'unmap_wa8k',
    'unmap_wa128k',
    'mprot_z8k',
    'mprot_z128k',
    'mprot_wz8k',
    'mprot_wz128k',
    'mprot_twz8k',
    'mprot_tw128k',
    'mprot_tw4m',
    'pipe_pst1',
    'pipe_pmt1',
    'pipe_pmp1',
    'pipe_pst4k',
    'pipe_pmt4k',
    'pipe_pmp4k',
    'pipe_sst1',
    'pipe_smt1',
    'pipe_smp1',
    'pipe_sst4k',
    'pipe_smt4k',
    'pipe_smp4k',
    'pipe_tst1',
    'pipe_tmt1',
    'pipe_tmp1',
    'pipe_tst4k',
    'pipe_tmt4k',
    'pipe_tmp4k',
    'conn_accept',
    'close_tcp'
  ]
}