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
  ],
  speccpu2006: [
    'pp.speccpu2006.test_item',
    'pp.speccpu2006.num_type'
  ],
  speccpu2006: [
    'pp.speccpu2017.item',
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
    'netperf.Throughput_Mbps',
    'netperf.Throughput_tps'
  ],
  speccpu2006: [
    'speccpu2006.400.perlbench_Rate',
    'speccpu2006.401.bzip2_Rate',
    'speccpu2006.403.gcc_Rate',
    'speccpu2006.429.mcf_Rate',
    'speccpu2006.445.gobmk_Rate',
    'speccpu2006.456.hmmer_Rate',
    'speccpu2006.458.sjeng_Rate',
    'speccpu2006.462.libquantum_Rate',
    'speccpu2006.464.h264ref_Rate',
    'speccpu2006.471.omnetpp_Rate',
    'speccpu2006.473.astar_Rate',
    'speccpu2006.483.xalancbmk_Rate',
    'speccpu2006.Est.SPECint(R)_rate_base2006',
    'speccpu2006.400.perlbench_Ratio',
    'speccpu2006.401.bzip2_Ratio',
    'speccpu2006.403.gcc_Ratio',
    'speccpu2006.429.mcf_Ratio',
    'speccpu2006.445.gobmk_Ratio',
    'speccpu2006.456.hmmer_Ratio',
    'speccpu2006.458.sjeng_Ratio',
    'speccpu2006.462.libquantum_Ratio',
    'speccpu2006.464.h264ref_Ratio',
    'speccpu2006.471.omnetpp_Ratio',
    'speccpu2006.473.astar_Ratio',
    'speccpu2006.483.xalancbmk_Ratio',
    'speccpu2006.Est.SPECint(R)_base2006',
    'speccpu2006.410.bwaves_Ratio',
    'speccpu2006.416.gamess_Ratio',
    'speccpu2006.433.milc_Ratio',
    'speccpu2006.434.zeusmp_Ratio',
    'speccpu2006.435.gromacs_Ratio',
    'speccpu2006.436.cactusADM_Ratio',
    'speccpu2006.437.leslie3d_Ratio',
    'speccpu2006.444.namd_Ratio',
    'speccpu2006.447.dealII_Ratio',
    'speccpu2006.450.soplex_Ratio',
    'speccpu2006.453.povray_Ratio',
    'speccpu2006.454.calculix_Ratio',
    'speccpu2006.459.GemsFDTD_Ratio',
    'speccpu2006.465.tonto_Ratio',
    'speccpu2006.470.lbm_Ratio',
    'speccpu2006.481.wrf_Ratio',
    'speccpu2006.482.sphinx3_Ratio',
    'speccpu2006.Est.SPECfp(R)_base2006',
    'speccpu2006.410.bwaves_Rate',
    'speccpu2006.416.gamess_Rate',
    'speccpu2006.433.milc_Rate',
    'speccpu2006.434.zeusmp_Rate',
    'speccpu2006.435.gromacs_Rate',
    'speccpu2006.436.cactusADM_Rate',
    'speccpu2006.437.leslie3d_Rate',
    'speccpu2006.444.namd_Rate',
    'speccpu2006.447.dealII_Rate',
    'speccpu2006.450.soplex_Rate',
    'speccpu2006.453.povray_Rate',
    'speccpu2006.454.calculix_Rate',
    'speccpu2006.459.GemsFDTD_Rate',
    'speccpu2006.465.tonto_Rate',
    'speccpu2006.470.lbm_Rate',
    'speccpu2006.481.wrf_Rate',
    'speccpu2006.482.sphinx3_Rate',
    'speccpu2006.Est.SPECfp(R)_rate_base2006'
  ],
  speccpu2017: [
    'speccpu2017.500.perlbench_r',
    'speccpu2017.502.gcc_r',
    'speccpu2017.505.mcf_r',
    'speccpu2017.520.omnetpp_r',
    'speccpu2017.523.xalancbmk_r',
    'speccpu2017.525.x264_r',
    'speccpu2017.531.deepsjeng_r',
    'speccpu2017.541.leela_r',
    'speccpu2017.548.exchange2_r',
    'speccpu2017.557.xz_r',
    'speccpu2017.Est.SPECrate2017_int_base',
    'speccpu2017.600.perlbench_s',
    'speccpu2017.602.gcc_s',
    'speccpu2017.605.mcf_s',
    'speccpu2017.620.omnetpp_s',
    'speccpu2017.623.xalancbmk_s',
    'speccpu2017.625.x264_s',
    'speccpu2017.631.deepsjeng_s',
    'speccpu2017.641.leela_s',
    'speccpu2017.648.exchange2_s',
    'speccpu2017.657.xz_s',
    'speccpu2017.Est.SPECspeed2017_int_base',
    'speccpu2017.603.bwaves_s',
    'speccpu2017.607.cactuBSSN_s',
    'speccpu2017.619.lbm_s',
    'speccpu2017.621.wrf_s',
    'speccpu2017.627.cam4_s',
    'speccpu2017.628.pop2_s',
    'speccpu2017.638.imagick_s',
    'speccpu2017.644.nab_s',
    'speccpu2017.649.fotonik3d_s',
    'speccpu2017.654.roms_s',
    'speccpu2017.Est.SPECspeed2017_fp_base',
    'speccpu2017.503.bwaves_r',
    'speccpu2017.507.cactuBSSN_r',
    'speccpu2017.508.namd_r',
    'speccpu2017.510.parest_r',
    'speccpu2017.511.povray_r',
    'speccpu2017.519.lbm_r',
    'speccpu2017.521.wrf_r',
    'speccpu2017.526.blender_r',
    'speccpu2017.527.cam4_r',
    'peccpu-2017.538.imagick_r',
    'speccpu2017.544.nab_r',
    'speccpu2017.549.fotonik3d_r',
    'speccpu2017.554.roms_r',
    'speccpu2017.Est.SPECrate2017_fp_base',
  ]
}

export const tableMode = {
  stream: 'default',
  unixbench: 'unixbench',
  lmbench: 'default',
  netperf: 'netperf',
  speccpu2006: 'speccpu2006',
  speccpu2017: 'speccpu2017'
}

export const tableColumnMap = {
  stream: [
    {
      tableName: 'Bandwidth_MBps',
      tableLabel: '内存带宽测试(单位：MB/s 越大越好)',
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
      tableName: 'single',
      tableLabel: '单核',
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
    },
    {
      tableName: 'multiple',
      tableLabel: '多核',
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
      column: [
        {label: 'TCP_RR', prop: 'pp.netperf.test=TCP_RR'},
        {label: 'UDP_RR', prop: 'pp.netperf.test=UDP_RR'},
        {label: 'TCP_CRR', prop: 'pp.netperf.test=TCP_CRR'}
      ]
    }
  ],
  speccpu2006: [
    {
      tableName: 'intrate',
      column: [
        {
          label: '400.perlbench_Rate',
          prop: 'speccpu2006.400.perlbench_Rate'
        },
        {
          label: '401.bzip2_Rate',
          prop: 'speccpu2006.401.bzip2_Rate'
        },
        {
          label: '403.gcc_Rate',
          prop: 'speccpu2006.403.gcc_Rate'
        },
        {
          label: '429.mcf_Rate',
          prop: 'speccpu2006.429.mcf_Rate'
        },
        {
          label: '445.gobmk_Rate',
          prop: 'speccpu2006.445.gobmk_Rate'
        },
        {
          label: '456.hmmer_Rate',
          prop: 'speccpu2006.456.hmmer_Rate'
        },
        {
          label: '458.sjeng_Rate',
          prop: 'speccpu2006.458.sjeng_Rate'
        },
        {
          label: '462.libquantum_Rate',
          prop: 'speccpu2006.462.libquantum_Rate'
        },
        {
          label: '464.h264ref_Rate',
          prop: 'speccpu2006.464.h264ref_Rate'
        },
        {
          label: '471.omnetpp_Rate',
          prop: 'speccpu2006.471.omnetpp_Rate'
        },
        {
          label: '473.astar_Rate',
          prop: 'speccpu2006.473.astar_Rate'
        },
        {
          label: '483.xalancbmk_Rate',
          prop: 'speccpu2006.483.xalancbmk_Rate'
        },
        {
          label: 'Est.SPECint(R)_rate_base2006',
          prop: 'speccpu2006.Est.SPECint(R)_rate_base2006'
        }
      ]
    },
    {
      tableName: 'intspeed',
      column: [
        {
          label: '400.perlbench_Ratio',
          prop: 'speccpu2006.400.perlbench_Ratio'
        },
        {
          label: '401.bzip2_Ratio',
          prop: 'speccpu2006.401.bzip2_Ratio'
        },
        {
          label: '403.gcc_Ratio',
          prop: 'speccpu2006.403.gcc_Ratio'
        },
        {
          label: '429.mcf_Ratio',
          prop: 'speccpu2006.429.mcf_Ratio'
        },
        {
          label: '445.gobmk_Ratio',
          prop: 'speccpu2006.445.gobmk_Ratio'
        },
        {
          label: '456.hmmer_Ratio',
          prop: 'speccpu2006.456.hmmer_Ratio'
        },
        {
          label: '458.sjeng_Ratio',
          prop: 'speccpu2006.458.sjeng_Ratio'
        },
        {
          label: '462.libquantum_Ratio',
          prop: 'speccpu2006.462.libquantum_Ratio'
        },
        {
          label: '464.h264ref_Ratio',
          prop: 'speccpu2006.464.h264ref_Ratio'
        },
        {
          label: '471.omnetpp_Ratio',
          prop: 'speccpu2006.471.omnetpp_Ratio'
        },
        {
          label: '473.astar_Ratio',
          prop: 'speccpu2006.473.astar_Ratio'
        },
        {
          label: '483.xalancbmk_Ratio',
          prop: 'speccpu2006.483.xalancbmk_Ratio'
        },
        {
          label: 'Est.SPECint(R)_base2006',
          prop: 'speccpu2006.Est.SPECint(R)_base2006'
        }
      ]
    },
    {
      tableName: 'fprate',
      column: [
        {
          label: '410.bwaves_Rate',
          prop: 'speccpu2006.410.bwaves_Rate'
        },
        {
          label: '416.gamess_Rate',
          prop: 'speccpu2006.416.gamess_Rate'
        },
        {
          label: '433.milc_Rate',
          prop: 'speccpu2006.433.milc_Rate'
        },
        {
          label: '434.zeusmp_Rate',
          prop: 'speccpu2006.434.zeusmp_Rate'
        },
        {
          label: '435.gromacs_Rate',
          prop: 'speccpu2006.435.gromacs_Rate'
        },
        {
          label: '436.cactusADM_Rate',
          prop: 'speccpu2006.436.cactusADM_Rate'
        },
        {
          label: '437.leslie3d_Rate',
          prop: 'speccpu2006.437.leslie3d_Rate'
        },
        {
          label: '444.namd_Rate',
          prop: 'speccpu2006.444.namd_Rate'
        },
        {
          label: '447.dealII_Rate',
          prop: 'speccpu2006.447.dealII_Rate'
        },
        {
          label: '450.soplex_Rate',
          prop: 'speccpu2006.450.soplex_Rate'
        },
        {
          label: '453.povray_Rate',
          prop: 'speccpu2006.453.povray_Rate'
        },
        {
          label: '454.calculix_Rate',
          prop: 'speccpu2006.454.calculix_Rate'
        },
        {
          label: '459.GemsFDTD_Rate',
          prop: 'speccpu2006.459.GemsFDTD_Rate'
        },
        {
          label: '465.tonto_Rate',
          prop: 'speccpu2006.465.tonto_Rate'
        },
        {
          label: '470.lbm_Rate',
          prop: 'speccpu2006.470.lbm_Rate'
        },
        {
          label: '481.wrf_Rate',
          prop: 'speccpu2006.481.wrf_Rate'
        },
        {
          label: '482.sphinx3_Rate',
          prop: 'speccpu2006.482.sphinx3_Rate'
        },
        {
          label: 'Est.SPECfp(R)_rate_base2006',
          prop: 'speccpu2006.Est.SPECfp(R)_rate_base2006'
        }
      ]
    },
    {
      tableName: 'fpspeed',
      column: [
        {
          label: '410.bwaves_Ratio',
          prop: 'speccpu2006.410.bwaves_Ratio'
        },
        {
          label: '416.gamess_Ratio',
          prop: 'speccpu2006.416.gamess_Ratio'
        },
        {
          label: '433.milc_Ratio',
          prop: 'speccpu2006.433.milc_Ratio'
        },
        {
          label: '434.zeusmp_Ratio',
          prop: 'speccpu2006.434.zeusmp_Ratio'
        },
        {
          label: '435.gromacs_Ratio',
          prop: 'speccpu2006.435.gromacs_Ratio'
        },
        {
          label: '436.cactusADM_Ratio',
          prop: 'speccpu2006.436.cactusADM_Ratio'
        },
        {
          label: '437.leslie3d_Ratio',
          prop: 'speccpu2006.437.leslie3d_Ratio'
        },
        {
          label: '444.namd_Ratio',
          prop: 'speccpu2006.444.namd_Ratio'
        },
        {
          label: '447.dealII_Ratio',
          prop: 'speccpu2006.447.dealII_Ratio'
        },
        {
          label: '450.soplex_Ratio',
          prop: 'speccpu2006.450.soplex_Ratio'
        },
        {
          label: '453.povray_Ratio',
          prop: 'speccpu2006.453.povray_Ratio'
        },
        {
          label: '454.calculix_Ratio',
          prop: 'speccpu2006.454.calculix_Ratio'
        },
        {
          label: '459.GemsFDTD_Ratio',
          prop: 'speccpu2006.459.GemsFDTD_Ratio'
        },
        {
          label: '465.tonto_Ratio',
          prop: 'speccpu2006.465.tonto_Ratio'
        },
        {
          label: '470.lbm_Ratio',
          prop: 'speccpu2006.470.lbm_Ratio'
        },
        {
          label: '481.wrf_Ratio',
          prop: 'speccpu2006.481.wrf_Ratio'
        },
        {
          label: '482.sphinx3_Ratio',
          prop: 'speccpu2006.482.sphinx3_Ratio'
        },
        {
          label: 'Est.SPECfp(R)_base2006',
          prop: 'speccpu2006.Est.SPECfp(R)_base2006'
        }
      ]
    }
  ],
  speccpu2017: [
    {
      tableName: 'intrate',
      column: [
        {
          label: '500.perlbench_r',
          prop: 'speccpu2017.500.perlbench_r'
        },
        {
          label: '502.gcc_r',
          prop: 'speccpu2017.502.gcc_r'
        },
        {
          label: '505.mcf_r',
          prop: 'speccpu2017.505.mcf_r'
        },
        {
          label: '520.omnetpp_r',
          prop: 'speccpu2017.520.omnetpp_r'
        },
        {
          label: '523.xalancbmk_r',
          prop: 'speccpu2017.523.xalancbmk_r'
        },
        {
          label: '525.x264_r',
          prop: 'speccpu2017.525.x264_r'
        },
        {
          label: '531.deepsjeng_r',
          prop: 'speccpu2017.531.deepsjeng_r'
        },
        {
          label: '541.leela_r',
          prop: 'speccpu2017.541.leela_r'
        },
        {
          label: '548.exchange2_r',
          prop: 'speccpu2017.548.exchange2_r'
        },
        {
          label: '557.xz_r',
          prop: 'speccpu2017.557.xz_r'
        },
        {
          label: 'Est.SPECrate2017_int_base',
          prop: 'speccpu2017.Est.SPECrate2017_int_base'
        }
      ]
    },
    {
      tableName: 'intspeed',
      column: [
        {
          label: '600.perlbench_s',
          prop: 'speccpu2017.600.perlbench_s'
        },
        {
          label: '602.gcc_s',
          prop: 'speccpu2017.602.gcc_s'
        },
        {
          label: '605.mcf_s',
          prop: 'speccpu2017.605.mcf_s'
        },
        {
          label: '620.omnetpp_s',
          prop: 'speccpu2017.620.omnetpp_s'
        },
        {
          label: '623.xalancbmk_s',
          prop: 'speccpu2017.623.xalancbmk_s'
        },
        {
          label: '625.x264_s',
          prop: 'speccpu2017.625.x264_s'
        },
        {
          label: '631.deepsjeng_s',
          prop: 'speccpu2017.631.deepsjeng_s'
        },
        {
          label: '641.leela_s',
          prop: 'speccpu2017.641.leela_s'
        },
        {
          label: '648.exchange2_s',
          prop: 'speccpu2017.648.exchange2_s'
        },
        {
          label: '657.xz_s',
          prop: 'speccpu2017.657.xz_s'
        },
        {
          label: 'Est.SPECspeed2017_int_base',
          prop: 'speccpu2017.Est.SPECspeed2017_int_base'
        }
      ]
    },
    {
      tableName: 'fpspeed',
      column: [
        {
          label: '603.bwaves_s',
          prop: 'speccpu2017.603.bwaves_s'
        },
        {
          label: '607.cactuBSSN_s',
          prop: 'speccpu2017.607.cactuBSSN_s'
        },
        {
          label: '619.lbm_s',
          prop: 'speccpu2017.619.lbm_s'
        },
        {
          label: '621.wrf_s',
          prop: 'speccpu2017.621.wrf_s'
        },
        {
          label: '627.cam4_s',
          prop: 'speccpu2017.627.cam4_s'
        },
        {
          label: '628.pop2_s',
          prop: 'speccpu2017.628.pop2_s'
        },
        {
          label: '638.imagick_s',
          prop: 'speccpu2017.638.imagick_s'
        },
        {
          label: '644.nab_s',
          prop: 'speccpu2017.644.nab_s'
        },
        {
          label: '649.fotonik3d_s',
          prop: 'speccpu2017.649.fotonik3d_s'
        },
        {
          label: '654.roms_s',
          prop: 'speccpu2017.654.roms_s'
        },
        {
          label: 'Est.SPECspeed2017_fp_base',
          prop: 'speccpu2017.Est.SPECspeed2017_fp_base'
        }
      ]
    },
    {
      tableName: 'fprate',
      column: [
        {
          label: '503.bwaves_r',
          prop: 'speccpu2017.503.bwaves_r'
        },
        {
          label: '507.cactuBSSN_r',
          prop: 'speccpu2017.507.cactuBSSN_r'
        },
        {
          label: '508.namd_r',
          prop: 'speccpu2017.508.namd_r'
        },
        {
          label: '510.parest_r',
          prop: 'speccpu2017.510.parest_r'
        },
        {
          label: '511.povray_r',
          prop: 'speccpu2017.511.povray_r'
        },
        {
          label: '519.lbm_r',
          prop: 'speccpu2017.519.lbm_r'
        },
        {
          label: '521.wrf_r',
          prop: 'speccpu2017.521.wrf_r'
        },
        {
          label: '526.blender_r',
          prop: 'speccpu2017.526.blender_r'
        },
        {
          label: '527.cam4_r',
          prop: 'speccpu2017.527.cam4_r'
        },
        {
          label: '538.imagick_r',
          prop: 'speccpu2017.538.imagick_r'
        },
        {
          label: '544.nab_r',
          prop: 'speccpu2017.544.nab_r'
        },
        {
          label: '549.fotonik3d_r',
          prop: 'speccpu2017.549.fotonik3d_r'
        },
        {
          label: '554.roms_r',
          prop: 'speccpu2017.554.roms_r'
        },
        {
          label: 'Est.SPECrate2017_fp_base',
          prop: 'speccpu2017.Est.SPECrate2017_fp_base'
        }
      ]
    }
  ]
}