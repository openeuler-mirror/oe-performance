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
  'fio-basic': [
    'pp.fio-setup-basic.rw',
    'pp.fio-setup-basic.rwmixread',
    'pp.fio-setup-basic.bs',
  ],
  speccpu2006: [
    'pp.speccpu2006.test_item',
    'pp.speccpu2006.num_type'
  ],
  speccpu2006: [
    'pp.speccpu2017.item',
  ],
  libmicro: [
    'pp.libmicro'
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
  'fio-basic': [
    'fio.read_iops',
    'fio.read_bw_MBps',
    'fio.write_iops',
    'fio.write_bw_MBps'
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
  ],
  libmicro: [
    'libmicro.getpid',
    'libmicro.getenv',
    'libmicro.getenvT2',
    'libmicro.gettimeofday',
    'libmicro.log',
    'libmicro.exp',
    'libmicro.lrand48',
    'libmicro.memset_10',
    'libmicro.memset_256',
    'libmicro.memset_256_u',
    'libmicro.memset_1k',
    'libmicro.memset_4k',
    'libmicro.memset_4k_uc',
    'libmicro.memset_10k',
    'libmicro.memset_1m',
    'libmicro.memset_10m',
    'libmicro.memsetP2_10m',
    'libmicro.memrand',
    'libmicro.isatty_yes',
    'libmicro.isatty_no',
    'libmicro.malloc_10',
    'libmicro.malloc_100',
    'libmicro.malloc_1k',
    'libmicro.malloc_10k',
    'libmicro.malloc_100k',
    'libmicro.mallocT2_10',
    'libmicro.mallocT2_100',
    'libmicro.mallocT2_1k',
    'libmicro.mallocT2_10k',
    'libmicro.mallocT2_100k',
    'libmicro.close_bad',
    'libmicro.close_tmp',
    'libmicro.close_usr',
    'libmicro.close_zero',
    'libmicro.memcpy_10',
    'libmicro.memcpy_1k',
    'libmicro.memcpy_10k',
    'libmicro.memcpy_1m',
    'libmicro.memcpy_10m',
    'libmicro.strcpy_10',
    'libmicro.strchr_1k',
    'libmicro.strcmp_10',
    'libmicro.strcmp_1k',
    'libmicro.scasecmp_10',
    'libmicro.scasecmp_1k',
    'libmicro.strtol',
    'libmicro.getcontext',
    'libmicro.setcontext',
    'libmicro.mutex_st',
    'libmicro.mutex_mt',
    'libmicro.mutex_T2',
    'libmicro.longjmp',
    'libmicro.siglongjmp',
    'libmicro.getrusage',
    'libmicro.times',
    'libmicro.time',
    'libmicro.localtime_r',
    'libmicro.strftime',
    'libmicro.mktime',
    'libmicro.mktimeT2',
    'libmicro.c_mutex_1',
    'libmicro.c_mutex_10',
    'libmicro.c_mutex_200',
    'libmicro.c_cond_1',
    'libmicro.c_cond_10',
    'libmicro.c_cond_200',
    'libmicro.c_lockf_1',
    'libmicro.c_lockf_10',
    'libmicro.c_lockf_200',
    'libmicro.c_flock',
    'libmicro.c_flock_10',
    'libmicro.c_flock_200',
    'libmicro.c_fcntl_1',
    'libmicro.c_fcntl_10',
    'libmicro.c_fcntl_200',
    'libmicro.file_lock',
    'libmicro.getsockname',
    'libmicro.getpeername',
    'libmicro.chdir_tmp',
    'libmicro.chdir_usr',
    'libmicro.chgetwd_tmp',
    'libmicro.chgetwd_usr',
    'libmicro.realpath_tmp',
    'libmicro.realpath_usr',
    'libmicro.stat_tmp',
    'libmicro.stat_usr',
    'libmicro.fcntl_tmp',
    'libmicro.fcntl_usr',
    'libmicro.fcntl_ndelay',
    'libmicro.lseek_t8k',
    'libmicro.lseek_u8k',
    'libmicro.open_tmp',
    'libmicro.open_usr',
    'libmicro.open_zero',
    'libmicro.dup',
    'libmicro.socket_u',
    'libmicro.socket_i',
    'libmicro.socketpair',
    'libmicro.setsockopt',
    'libmicro.bind',
    'libmicro.listen',
    'libmicro.connection',
    'libmicro.poll_10',
    'libmicro.poll_100',
    'libmicro.poll_1000',
    'libmicro.poll_w10',
    'libmicro.poll_w100',
    'libmicro.poll_w1000',
    'libmicro.select_10',
    'libmicro.select_100',
    'libmicro.select_1000',
    'libmicro.select_w10',
    'libmicro.select_w100',
    'libmicro.select_w1000',
    'libmicro.semop',
    'libmicro.sigaction',
    'libmicro.signal',
    'libmicro.sigprocmask',
    'libmicro.pthread_8',
    'libmicro.pthread_32',
    'libmicro.pthread_128',
    'libmicro.pthread_512',
    'libmicro.fork_10',
    'libmicro.fork_100',
    'libmicro.fork_1000',
    'libmicro.exit_10',
    'libmicro.exit_100',
    'libmicro.exit_1000',
    'libmicro.exit_10_nolibc',
    'libmicro.exec',
    'libmicro.system',
    'libmicro.recurse',
    'libmicro.read_t1k',
    'libmicro.read_t10k',
    'libmicro.read_t100k',
    'libmicro.read_u1k',
    'libmicro.read_u10k',
    'libmicro.read_u100k',
    'libmicro.read_z1k',
    'libmicro.read_z10k',
    'libmicro.read_z100k',
    'libmicro.read_zw100k',
    'libmicro.write_t1k',
    'libmicro.write_t10k',
    'libmicro.write_t100k',
    'libmicro.write_u1k',
    'libmicro.write_u10k',
    'libmicro.write_u100k',
    'libmicro.write_n1k',
    'libmicro.write_n10k',
    'libmicro.write_n100k',
    'libmicro.writev_t1k',
    'libmicro.writev_t10k',
    'libmicro.writev_t100k',
    'libmicro.writev_u1k',
    'libmicro.writev_u10k',
    'libmicro.writev_u100k',
    'libmicro.writev_n1k',
    'libmicro.writev_n10k',
    'libmicro.writev_n100k',
    'libmicro.pread_t1k',
    'libmicro.pread_t10k',
    'libmicro.pread_t100k',
    'libmicro.pread_u1k',
    'libmicro.pread_u10k',
    'libmicro.pread_u100k',
    'libmicro.pread_z1k',
    'libmicro.pread_z10k',
    'libmicro.pread_z100k',
    'libmicro.pread_zw100k',
    'libmicro.pwrite_t1k',
    'libmicro.pwrite_t10k',
    'libmicro.pwrite_t100k',
    'libmicro.pwrite_u1k',
    'libmicro.pwrite_u10k',
    'libmicro.pwrite_u100k',
    'libmicro.pwrite_n1k',
    'libmicro.pwrite_n10k',
    'libmicro.pwrite_n100k',
    'libmicro.mmap_z8k',
    'libmicro.mmap_z128k',
    'libmicro.mmap_t8k',
    'libmicro.mmap_t128k',
    'libmicro.mmap_u8k',
    'libmicro.mmap_u128k',
    'libmicro.mmap_a8k',
    'libmicro.mmap_a128k',
    'libmicro.mmap_rz8k',
    'libmicro.mmap_rz128k',
    'libmicro.mmap_rt8k',
    'libmicro.mmap_rt128k',
    'libmicro.mmap_ru8k',
    'libmicro.mmap_ru128k',
    'libmicro.mmap_ra8k',
    'libmicro.mmap_ra128k',
    'libmicro.mmap_wz8k',
    'libmicro.mmap_wz128k',
    'libmicro.mmap_wt8k',
    'libmicro.mmap_wt128k',
    'libmicro.mmap_wu8k',
    'libmicro.mmap_wu128k',
    'libmicro.mmap_wa8k',
    'libmicro.mmap_wa128k',
    'libmicro.unmap_z8k',
    'libmicro.unmap_z128k',
    'libmicro.unmap_t8k',
    'libmicro.unmap_t128k',
    'libmicro.unmap_u8k',
    'libmicro.unmap_u128k',
    'libmicro.unmap_a8k',
    'libmicro.unmap_a128k',
    'libmicro.unmap_rz8k',
    'libmicro.unmap_rz128k',
    'libmicro.unmap_rt8k',
    'libmicro.unmap_rt128k',
    'libmicro.unmap_ru8k',
    'libmicro.unmap_ru128k',
    'libmicro.unmap_ra8k',
    'libmicro.unmap_ra128k',
    'libmicro.conn_connect',
    'libmicro.unmap_wz8k',
    'libmicro.unmap_wz128k',
    'libmicro.unmap_wt8k',
    'libmicro.unmap_wt128k',
    'libmicro.unmap_wu8k',
    'libmicro.unmap_wu128k',
    'libmicro.unmap_wa8k',
    'libmicro.unmap_wa128k',
    'libmicro.mprot_z8k',
    'libmicro.mprot_z128k',
    'libmicro.mprot_wz8k',
    'libmicro.mprot_wz128k',
    'libmicro.mprot_twz8k',
    'libmicro.mprot_tw128k',
    'libmicro.mprot_tw4m',
    'libmicro.pipe_pst1',
    'libmicro.pipe_pmt1',
    'libmicro.pipe_pmp1',
    'libmicro.pipe_pst4k',
    'libmicro.pipe_pmt4k',
    'libmicro.pipe_pmp4k',
    'libmicro.pipe_sst1',
    'libmicro.pipe_smt1',
    'libmicro.pipe_smp1',
    'libmicro.pipe_sst4k',
    'libmicro.pipe_smt4k',
    'libmicro.pipe_smp4k',
    'libmicro.pipe_tst1',
    'libmicro.pipe_tmt1',
    'libmicro.pipe_tmp1',
    'libmicro.pipe_tst4k',
    'libmicro.pipe_tmt4k',
    'libmicro.pipe_tmp4k',
    'libmicro.conn_accept',
    'libmicro.close_tcp'
  ]
}

export const tableMode = {
  stream: 'default',
  unixbench: 'unixbench',
  lmbench: 'default',
  netperf: 'netperf',
  'fio-basic': 'fio-basic',
  speccpu2006: 'speccpu2006',
  speccpu2017: 'speccpu2017',
  libmicro: 'libmicro'
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
        {label: '65536', prop: 'pp.netperf.send_size=65536'}
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
  'fio-basic': [
    {
      tableName: 'randrwread_iops_blocksize',
      kpi: 'fio.read_iops',
      column: [
        {label: '4k', prop: 'pp.fio-setup-basic.bs=4k'},
        {label: '16k', prop: 'pp.fio-setup-basic.bs=16k'},
        {label: '32k', prop: 'pp.fio-setup-basic.bs=32k'},
        {label: '64k', prop: 'pp.fio-setup-basic.bs=64k'},
        {label: '128k', prop: 'pp.fio-setup-basic.bs=128k'},
        {label: '256k', prop: 'pp.fio-setup-basic.bs=256k'},
        {label: '512k', prop: 'pp.fio-setup-basic.bs=512k'},
        {label: '1024k', prop: 'pp.fio-setup-basic.bs=1024k'},
      ]
    },
    {
      tableName: 'randrwread_bw_blocksize',
      kpi: 'fio.read_bw_MBps',
      column: [
        {label: '4k', prop: 'pp.fio-setup-basic.bs=4k'},
        {label: '16k', prop: 'pp.fio-setup-basic.bs=16k'},
        {label: '32k', prop: 'pp.fio-setup-basic.bs=32k'},
        {label: '64k', prop: 'pp.fio-setup-basic.bs=64k'},
        {label: '128k', prop: 'pp.fio-setup-basic.bs=128k'},
        {label: '256k', prop: 'pp.fio-setup-basic.bs=256k'},
        {label: '512k', prop: 'pp.fio-setup-basic.bs=512k'},
        {label: '1024k', prop: 'pp.fio-setup-basic.bs=1024k'},
      ]
    },
    {
      tableName: 'randrwwrite_iops_blocksize',
      kpi: 'fio.write_iops',
      column: [
        {label: '4k', prop: 'pp.fio-setup-basic.bs=4k'},
        {label: '16k', prop: 'pp.fio-setup-basic.bs=16k'},
        {label: '32k', prop: 'pp.fio-setup-basic.bs=32k'},
        {label: '64k', prop: 'pp.fio-setup-basic.bs=64k'},
        {label: '128k', prop: 'pp.fio-setup-basic.bs=128k'},
        {label: '256k', prop: 'pp.fio-setup-basic.bs=256k'},
        {label: '512k', prop: 'pp.fio-setup-basic.bs=512k'},
        {label: '1024k', prop: 'pp.fio-setup-basic.bs=1024k'},
      ]
    },
    {
      tableName: 'randrwwrite_bw_blocksize',
      kpi: 'fio.write_bw_MBps',
      column: [
        {label: '4k', prop: 'pp.fio-setup-basic.bs=4k'},
        {label: '16k', prop: 'pp.fio-setup-basic.bs=16k'},
        {label: '32k', prop: 'pp.fio-setup-basic.bs=32k'},
        {label: '64k', prop: 'pp.fio-setup-basic.bs=64k'},
        {label: '128k', prop: 'pp.fio-setup-basic.bs=128k'},
        {label: '256k', prop: 'pp.fio-setup-basic.bs=256k'},
        {label: '512k', prop: 'pp.fio-setup-basic.bs=512k'},
        {label: '1024k', prop: 'pp.fio-setup-basic.bs=1024k'},
      ]
    },
    {
      tableName: 'read_iops_blocksize',
      kpi: 'fio.read_iops',
      column: [
        {label: '4k', prop: 'pp.fio-setup-basic.bs=4k'},
        {label: '16k', prop: 'pp.fio-setup-basic.bs=16k'},
        {label: '32k', prop: 'pp.fio-setup-basic.bs=32k'},
        {label: '64k', prop: 'pp.fio-setup-basic.bs=64k'},
        {label: '128k', prop: 'pp.fio-setup-basic.bs=128k'},
        {label: '256k', prop: 'pp.fio-setup-basic.bs=256k'},
        {label: '512k', prop: 'pp.fio-setup-basic.bs=512k'},
        {label: '1024k', prop: 'pp.fio-setup-basic.bs=1024k'},
      ]
    },
    {
      tableName: 'read_bw_blocksize',
      kpi: 'fio.read_bw_MBps',
      column: [
        {label: '4k', prop: 'pp.fio-setup-basic.bs=4k'},
        {label: '16k', prop: 'pp.fio-setup-basic.bs=16k'},
        {label: '32k', prop: 'pp.fio-setup-basic.bs=32k'},
        {label: '64k', prop: 'pp.fio-setup-basic.bs=64k'},
        {label: '128k', prop: 'pp.fio-setup-basic.bs=128k'},
        {label: '256k', prop: 'pp.fio-setup-basic.bs=256k'},
        {label: '512k', prop: 'pp.fio-setup-basic.bs=512k'},
        {label: '1024k', prop: 'pp.fio-setup-basic.bs=1024k'},
      ]
    },
    {
      tableName: 'randread_iops_blocksize',
      kpi: 'fio.read_iops',
      column: [
        {label: '4k', prop: 'pp.fio-setup-basic.bs=4k'},
        {label: '16k', prop: 'pp.fio-setup-basic.bs=16k'},
        {label: '32k', prop: 'pp.fio-setup-basic.bs=32k'},
        {label: '64k', prop: 'pp.fio-setup-basic.bs=64k'},
        {label: '128k', prop: 'pp.fio-setup-basic.bs=128k'},
        {label: '256k', prop: 'pp.fio-setup-basic.bs=256k'},
        {label: '512k', prop: 'pp.fio-setup-basic.bs=512k'},
        {label: '1024k', prop: 'pp.fio-setup-basic.bs=1024k'},
      ]
    },
    {
      tableName: 'randread_bw_blocksize',
      kpi: 'fio.read_bw_MBps',
      column: [
        {label: '4k', prop: 'pp.fio-setup-basic.bs=4k'},
        {label: '16k', prop: 'pp.fio-setup-basic.bs=16k'},
        {label: '32k', prop: 'pp.fio-setup-basic.bs=32k'},
        {label: '64k', prop: 'pp.fio-setup-basic.bs=64k'},
        {label: '128k', prop: 'pp.fio-setup-basic.bs=128k'},
        {label: '256k', prop: 'pp.fio-setup-basic.bs=256k'},
        {label: '512k', prop: 'pp.fio-setup-basic.bs=512k'},
        {label: '1024k', prop: 'pp.fio-setup-basic.bs=1024k'},
      ]
    },
    {
      tableName: 'write_iops_blocksize',
      kpi: 'fio.write_iops',
      column: [
        {label: '4k', prop: 'pp.fio-setup-basic.bs=4k'},
        {label: '16k', prop: 'pp.fio-setup-basic.bs=16k'},
        {label: '32k', prop: 'pp.fio-setup-basic.bs=32k'},
        {label: '64k', prop: 'pp.fio-setup-basic.bs=64k'},
        {label: '128k', prop: 'pp.fio-setup-basic.bs=128k'},
        {label: '256k', prop: 'pp.fio-setup-basic.bs=256k'},
        {label: '512k', prop: 'pp.fio-setup-basic.bs=512k'},
        {label: '1024k', prop: 'pp.fio-setup-basic.bs=1024k'},
      ]
    },
    {
      tableName: 'write_bw_blocksize',
      kpi: 'fio.write_bw_MBps',
      column: [
        {label: '4k', prop: 'pp.fio-setup-basic.bs=4k'},
        {label: '16k', prop: 'pp.fio-setup-basic.bs=16k'},
        {label: '32k', prop: 'pp.fio-setup-basic.bs=32k'},
        {label: '64k', prop: 'pp.fio-setup-basic.bs=64k'},
        {label: '128k', prop: 'pp.fio-setup-basic.bs=128k'},
        {label: '256k', prop: 'pp.fio-setup-basic.bs=256k'},
        {label: '512k', prop: 'pp.fio-setup-basic.bs=512k'},
        {label: '1024k', prop: 'pp.fio-setup-basic.bs=1024k'},
      ]
    },
    {
      tableName: 'randwrite_iops_blocksize',
      kpi: 'fio.write_iops',
      column: [
        {label: '4k', prop: 'pp.fio-setup-basic.bs=4k'},
        {label: '16k', prop: 'pp.fio-setup-basic.bs=16k'},
        {label: '32k', prop: 'pp.fio-setup-basic.bs=32k'},
        {label: '64k', prop: 'pp.fio-setup-basic.bs=64k'},
        {label: '128k', prop: 'pp.fio-setup-basic.bs=128k'},
        {label: '256k', prop: 'pp.fio-setup-basic.bs=256k'},
        {label: '512k', prop: 'pp.fio-setup-basic.bs=512k'},
        {label: '1024k', prop: 'pp.fio-setup-basic.bs=1024k'},
      ]
    },
    {
      tableName: 'randwrite_bw_blocksize',
      kpi: 'fio.write_bw_MBps',
      column: [
        {label: '4k', prop: 'pp.fio-setup-basic.bs=4k'},
        {label: '16k', prop: 'pp.fio-setup-basic.bs=16k'},
        {label: '32k', prop: 'pp.fio-setup-basic.bs=32k'},
        {label: '64k', prop: 'pp.fio-setup-basic.bs=64k'},
        {label: '128k', prop: 'pp.fio-setup-basic.bs=128k'},
        {label: '256k', prop: 'pp.fio-setup-basic.bs=256k'},
        {label: '512k', prop: 'pp.fio-setup-basic.bs=512k'},
        {label: '1024k', prop: 'pp.fio-setup-basic.bs=1024k'},
      ]
    },
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
  ],
  libmicro: [
    {
      tableName: 'Function',
      column: [
        {
          label: 'getpid',
          prop: 'libmicro.getpid',
        },
        {
          label: 'getenv',
          prop: 'libmicro.getenv',
        },
        {
          label: 'getenvT2',
          prop: 'libmicro.getenvT2',
        },
        {
          label: 'gettimeofday',
          prop: 'libmicro.gettimeofday',
        },
        {
          label: 'log',
          prop: 'libmicro.log',
        },
        {
          label: 'exp',
          prop: 'libmicro.exp',
        },
        {
          label: 'lrand48',
          prop: 'libmicro.lrand48',
        },
        {
          label: 'memset_10',
          prop: 'libmicro.memset_10',
        },
        {
          label: 'memset_256',
          prop: 'libmicro.memset_256',
        },
        {
          label: 'memset_256_u',
          prop: 'libmicro.memset_256_u',
        },
        {
          label: 'memset_1k',
          prop: 'libmicro.memset_1k',
        },
        {
          label: 'memset_4k',
          prop: 'libmicro.memset_4k',
        },
        {
          label: 'memset_4k_uc',
          prop: 'libmicro.memset_4k_uc',
        },
        {
          label: 'memset_10k',
          prop: 'libmicro.memset_10k',
        },
        {
          label: 'memset_1m',
          prop: 'libmicro.memset_1m',
        },
        {
          label: 'memset_10m',
          prop: 'libmicro.memset_10m',
        },
        {
          label: 'memsetP2_10m',
          prop: 'libmicro.memsetP2_10m',
        },
        {
          label: 'memrand',
          prop: 'libmicro.memrand',
        },
        {
          label: 'isatty_yes',
          prop: 'libmicro.isatty_yes',
        },
        {
          label: 'isatty_no',
          prop: 'libmicro.isatty_no',
        },
        {
          label: 'malloc_10',
          prop: 'libmicro.malloc_10',
        },
        {
          label: 'malloc_100',
          prop: 'libmicro.malloc_100',
        },
        {
          label: 'malloc_1k',
          prop: 'libmicro.malloc_1k',
        },
        {
          label: 'malloc_10k',
          prop: 'libmicro.malloc_10k',
        },
        {
          label: 'malloc_100k',
          prop: 'libmicro.malloc_100k',
        },
        {
          label: 'mallocT2_10',
          prop: 'libmicro.mallocT2_10',
        },
        {
          label: 'mallocT2_100',
          prop: 'libmicro.mallocT2_100',
        },
        {
          label: 'mallocT2_1k',
          prop: 'libmicro.mallocT2_1k',
        },
        {
          label: 'mallocT2_10k',
          prop: 'libmicro.mallocT2_10k',
        },
        {
          label: 'mallocT2_100k',
          prop: 'libmicro.mallocT2_100k',
        },
        {
          label: 'close_bad',
          prop: 'libmicro.close_bad',
        },
        {
          label: 'close_tmp',
          prop: 'libmicro.close_tmp',
        },
        {
          label: 'close_usr',
          prop: 'libmicro.close_usr',
        },
        {
          label: 'close_zero',
          prop: 'libmicro.close_zero',
        },
        {
          label: 'memcpy_10',
          prop: 'libmicro.memcpy_10',
        },
        {
          label: 'memcpy_1k',
          prop: 'libmicro.memcpy_1k',
        },
        {
          label: 'memcpy_10k',
          prop: 'libmicro.memcpy_10k',
        },
        {
          label: 'memcpy_1m',
          prop: 'libmicro.memcpy_1m',
        },
        {
          label: 'memcpy_10m',
          prop: 'libmicro.memcpy_10m',
        },
        {
          label: 'strcpy_10',
          prop: 'libmicro.strcpy_10',
        },
        {
          label: 'strchr_1k',
          prop: 'libmicro.strchr_1k',
        },
        {
          label: 'strcmp_10',
          prop: 'libmicro.strcmp_10',
        },
        {
          label: 'strcmp_1k',
          prop: 'libmicro.strcmp_1k',
        },
        {
          label: 'scasecmp_10',
          prop: 'libmicro.scasecmp_10',
        },
        {
          label: 'scasecmp_1k',
          prop: 'libmicro.scasecmp_1k',
        },
        {
          label: 'strtol',
          prop: 'libmicro.strtol',
        },
        {
          label: 'getcontext',
          prop: 'libmicro.getcontext',
        },
        {
          label: 'setcontext',
          prop: 'libmicro.setcontext',
        },
        {
          label: 'mutex_st',
          prop: 'libmicro.mutex_st',
        },
        {
          label: 'mutex_mt',
          prop: 'libmicro.mutex_mt',
        },
        {
          label: 'mutex_T2',
          prop: 'libmicro.mutex_T2',
        },
        {
          label: 'longjmp',
          prop: 'libmicro.longjmp',
        },
        {
          label: 'siglongjmp',
          prop: 'libmicro.siglongjmp',
        },
        {
          label: 'getrusage',
          prop: 'libmicro.getrusage',
        },
        {
          label: 'times',
          prop: 'libmicro.times',
        },
        {
          label: 'time',
          prop: 'libmicro.time',
        },
        {
          label: 'localtime_r',
          prop: 'libmicro.localtime_r',
        },
        {
          label: 'strftime',
          prop: 'libmicro.strftime',
        },
        {
          label: 'mktime',
          prop: 'libmicro.mktime',
        },
        {
          label: 'mktimeT2',
          prop: 'libmicro.mktimeT2',
        },
        {
          label: 'c_mutex_1',
          prop: 'libmicro.c_mutex_1',
        },
        {
          label: 'c_mutex_10',
          prop: 'libmicro.c_mutex_10',
        },
        {
          label: 'c_mutex_200',
          prop: 'libmicro.c_mutex_200',
        },
        {
          label: 'c_cond_1',
          prop: 'libmicro.c_cond_1',
        },
        {
          label: 'c_cond_10',
          prop: 'libmicro.c_cond_10',
        },
        {
          label: 'c_cond_200',
          prop: 'libmicro.c_cond_200',
        },
        {
          label: 'c_lockf_1',
          prop: 'libmicro.c_lockf_1',
        },
        {
          label: 'c_lockf_10',
          prop: 'libmicro.c_lockf_10',
        },
        {
          label: 'c_lockf_200',
          prop: 'libmicro.c_lockf_200',
        },
        {
          label: 'c_flock',
          prop: 'libmicro.c_flock',
        },
        {
          label: 'c_flock_10',
          prop: 'libmicro.c_flock_10',
        },
        {
          label: 'c_flock_200',
          prop: 'libmicro.c_flock_200',
        },
        {
          label: 'c_fcntl_1',
          prop: 'libmicro.c_fcntl_1',
        },
        {
          label: 'c_fcntl_10',
          prop: 'libmicro.c_fcntl_10',
        },
        {
          label: 'c_fcntl_200',
          prop: 'libmicro.c_fcntl_200',
        },
        {
          label: 'file_lock',
          prop: 'libmicro.file_lock',
        },
        {
          label: 'getsockname',
          prop: 'libmicro.getsockname',
        },
        {
          label: 'getpeername',
          prop: 'libmicro.getpeername',
        },
        {
          label: 'chdir_tmp',
          prop: 'libmicro.chdir_tmp',
        },
        {
          label: 'chdir_usr',
          prop: 'libmicro.chdir_usr',
        },
        {
          label: 'chgetwd_tmp',
          prop: 'libmicro.chgetwd_tmp',
        },
        {
          label: 'chgetwd_usr',
          prop: 'libmicro.chgetwd_usr',
        },
        {
          label: 'realpath_tmp',
          prop: 'libmicro.realpath_tmp',
        },
        {
          label: 'realpath_usr',
          prop: 'libmicro.realpath_usr',
        },
        {
          label: 'stat_tmp',
          prop: 'libmicro.stat_tmp',
        },
        {
          label: 'stat_usr',
          prop: 'libmicro.stat_usr',
        },
        {
          label: 'fcntl_tmp',
          prop: 'libmicro.fcntl_tmp',
        },
        {
          label: 'fcntl_usr',
          prop: 'libmicro.fcntl_usr',
        },
        {
          label: 'fcntl_ndelay',
          prop: 'libmicro.fcntl_ndelay',
        },
        {
          label: 'lseek_t8k',
          prop: 'libmicro.lseek_t8k',
        },
        {
          label: 'lseek_u8k',
          prop: 'libmicro.lseek_u8k',
        },
        {
          label: 'open_tmp',
          prop: 'libmicro.open_tmp',
        },
        {
          label: 'open_usr',
          prop: 'libmicro.open_usr',
        },
        {
          label: 'open_zero',
          prop: 'libmicro.open_zero',
        },
        {
          label: 'dup',
          prop: 'libmicro.dup',
        },
        {
          label: 'socket_u',
          prop: 'libmicro.socket_u',
        },
        {
          label: 'socket_i',
          prop: 'libmicro.socket_i',
        },
        {
          label: 'socketpair',
          prop: 'libmicro.socketpair',
        },
        {
          label: 'setsockopt',
          prop: 'libmicro.setsockopt',
        },
        {
          label: 'bind',
          prop: 'libmicro.bind',
        },
        {
          label: 'listen',
          prop: 'libmicro.listen',
        },
        {
          label: 'connection',
          prop: 'libmicro.connection',
        },
        {
          label: 'poll_10',
          prop: 'libmicro.poll_10',
        },
        {
          label: 'poll_100',
          prop: 'libmicro.poll_100',
        },
        {
          label: 'poll_1000',
          prop: 'libmicro.poll_1000',
        },
        {
          label: 'poll_w10',
          prop: 'libmicro.poll_w10',
        },
        {
          label: 'poll_w100',
          prop: 'libmicro.poll_w100',
        },
        {
          label: 'poll_w1000',
          prop: 'libmicro.poll_w1000',
        },
        {
          label: 'select_10',
          prop: 'libmicro.select_10',
        },
        {
          label: 'select_100',
          prop: 'libmicro.select_100',
        },
        {
          label: 'select_1000',
          prop: 'libmicro.select_1000',
        },
        {
          label: 'select_w10',
          prop: 'libmicro.select_w10',
        },
        {
          label: 'select_w100',
          prop: 'libmicro.select_w100',
        },
        {
          label: 'select_w1000',
          prop: 'libmicro.select_w1000',
        },
        {
          label: 'semop',
          prop: 'libmicro.semop',
        },
        {
          label: 'sigaction',
          prop: 'libmicro.sigaction',
        },
        {
          label: 'signal',
          prop: 'libmicro.signal',
        },
        {
          label: 'sigprocmask',
          prop: 'libmicro.sigprocmask',
        },
        {
          label: 'pthread_8',
          prop: 'libmicro.pthread_8',
        },
        {
          label: 'pthread_32',
          prop: 'libmicro.pthread_32',
        },
        {
          label: 'pthread_128',
          prop: 'libmicro.pthread_128',
        },
        {
          label: 'pthread_512',
          prop: 'libmicro.pthread_512',
        },
        {
          label: 'fork_10',
          prop: 'libmicro.fork_10',
        },
        {
          label: 'fork_100',
          prop: 'libmicro.fork_100',
        },
        {
          label: 'fork_1000',
          prop: 'libmicro.fork_1000',
        },
        {
          label: 'exit_10',
          prop: 'libmicro.exit_10',
        },
        {
          label: 'exit_100',
          prop: 'libmicro.exit_100',
        },
        {
          label: 'exit_1000',
          prop: 'libmicro.exit_1000',
        },
        {
          label: 'exit_10_nolibc',
          prop: 'libmicro.exit_10_nolibc',
        },
        {
          label: 'exec',
          prop: 'libmicro.exec',
        },
        {
          label: 'system',
          prop: 'libmicro.system',
        },
        {
          label: 'recurse',
          prop: 'libmicro.recurse',
        },
        {
          label: 'read_t1k',
          prop: 'libmicro.read_t1k',
        },
        {
          label: 'read_t10k',
          prop: 'libmicro.read_t10k',
        },
        {
          label: 'read_t100k',
          prop: 'libmicro.read_t100k',
        },
        {
          label: 'read_u1k',
          prop: 'libmicro.read_u1k',
        },
        {
          label: 'read_u10k',
          prop: 'libmicro.read_u10k',
        },
        {
          label: 'read_u100k',
          prop: 'libmicro.read_u100k',
        },
        {
          label: 'read_z1k',
          prop: 'libmicro.read_z1k',
        },
        {
          label: 'read_z10k',
          prop: 'libmicro.read_z10k',
        },
        {
          label: 'read_z100k',
          prop: 'libmicro.read_z100k',
        },
        {
          label: 'read_zw100k',
          prop: 'libmicro.read_zw100k',
        },
        {
          label: 'write_t1k',
          prop: 'libmicro.write_t1k',
        },
        {
          label: 'write_t10k',
          prop: 'libmicro.write_t10k',
        },
        {
          label: 'write_t100k',
          prop: 'libmicro.write_t100k',
        },
        {
          label: 'write_u1k',
          prop: 'libmicro.write_u1k',
        },
        {
          label: 'write_u10k',
          prop: 'libmicro.write_u10k',
        },
        {
          label: 'write_u100k',
          prop: 'libmicro.write_u100k',
        },
        {
          label: 'write_n1k',
          prop: 'libmicro.write_n1k',
        },
        {
          label: 'write_n10k',
          prop: 'libmicro.write_n10k',
        },
        {
          label: 'write_n100k',
          prop: 'libmicro.write_n100k',
        },
        {
          label: 'writev_t1k',
          prop: 'libmicro.writev_t1k',
        },
        {
          label: 'writev_t10k',
          prop: 'libmicro.writev_t10k',
        },
        {
          label: 'writev_t100k',
          prop: 'libmicro.writev_t100k',
        },
        {
          label: 'writev_u1k',
          prop: 'libmicro.writev_u1k',
        },
        {
          label: 'writev_u10k',
          prop: 'libmicro.writev_u10k',
        },
        {
          label: 'writev_u100k',
          prop: 'libmicro.writev_u100k',
        },
        {
          label: 'writev_n1k',
          prop: 'libmicro.writev_n1k',
        },
        {
          label: 'writev_n10k',
          prop: 'libmicro.writev_n10k',
        },
        {
          label: 'writev_n100k',
          prop: 'libmicro.writev_n100k',
        },
        {
          label: 'pread_t1k',
          prop: 'libmicro.pread_t1k',
        },
        {
          label: 'pread_t10k',
          prop: 'libmicro.pread_t10k',
        },
        {
          label: 'pread_t100k',
          prop: 'libmicro.pread_t100k',
        },
        {
          label: 'pread_u1k',
          prop: 'libmicro.pread_u1k',
        },
        {
          label: 'pread_u10k',
          prop: 'libmicro.pread_u10k',
        },
        {
          label: 'pread_u100k',
          prop: 'libmicro.pread_u100k',
        },
        {
          label: 'pread_z1k',
          prop: 'libmicro.pread_z1k',
        },
        {
          label: 'pread_z10k',
          prop: 'libmicro.pread_z10k',
        },
        {
          label: 'pread_z100k',
          prop: 'libmicro.pread_z100k',
        },
        {
          label: 'pread_zw100k',
          prop: 'libmicro.pread_zw100k',
        },
        {
          label: 'pwrite_t1k',
          prop: 'libmicro.pwrite_t1k',
        },
        {
          label: 'pwrite_t10k',
          prop: 'libmicro.pwrite_t10k',
        },
        {
          label: 'pwrite_t100k',
          prop: 'libmicro.pwrite_t100k',
        },
        {
          label: 'pwrite_u1k',
          prop: 'libmicro.pwrite_u1k',
        },
        {
          label: 'pwrite_u10k',
          prop: 'libmicro.pwrite_u10k',
        },
        {
          label: 'pwrite_u100k',
          prop: 'libmicro.pwrite_u100k',
        },
        {
          label: 'pwrite_n1k',
          prop: 'libmicro.pwrite_n1k',
        },
        {
          label: 'pwrite_n10k',
          prop: 'libmicro.pwrite_n10k',
        },
        {
          label: 'pwrite_n100k',
          prop: 'libmicro.pwrite_n100k',
        },
        {
          label: 'mmap_z8k',
          prop: 'libmicro.mmap_z8k',
        },
        {
          label: 'mmap_z128k',
          prop: 'libmicro.mmap_z128k',
        },
        {
          label: 'mmap_t8k',
          prop: 'libmicro.mmap_t8k',
        },
        {
          label: 'mmap_t128k',
          prop: 'libmicro.mmap_t128k',
        },
        {
          label: 'mmap_u8k',
          prop: 'libmicro.mmap_u8k',
        },
        {
          label: 'mmap_u128k',
          prop: 'libmicro.mmap_u128k',
        },
        {
          label: 'mmap_a8k',
          prop: 'libmicro.mmap_a8k',
        },
        {
          label: 'mmap_a128k',
          prop: 'libmicro.mmap_a128k',
        },
        {
          label: 'mmap_rz8k',
          prop: 'libmicro.mmap_rz8k',
        },
        {
          label: 'mmap_rz128k',
          prop: 'libmicro.mmap_rz128k',
        },
        {
          label: 'mmap_rt8k',
          prop: 'libmicro.mmap_rt8k',
        },
        {
          label: 'mmap_rt128k',
          prop: 'libmicro.mmap_rt128k',
        },
        {
          label: 'mmap_ru8k',
          prop: 'libmicro.mmap_ru8k',
        },
        {
          label: 'mmap_ru128k',
          prop: 'libmicro.mmap_ru128k',
        },
        {
          label: 'mmap_ra8k',
          prop: 'libmicro.mmap_ra8k',
        },
        {
          label: 'mmap_ra128k',
          prop: 'libmicro.mmap_ra128k',
        },
        {
          label: 'mmap_wz8k',
          prop: 'libmicro.mmap_wz8k',
        },
        {
          label: 'mmap_wz128k',
          prop: 'libmicro.mmap_wz128k',
        },
        {
          label: 'mmap_wt8k',
          prop: 'libmicro.mmap_wt8k',
        },
        {
          label: 'mmap_wt128k',
          prop: 'libmicro.mmap_wt128k',
        },
        {
          label: 'mmap_wu8k',
          prop: 'libmicro.mmap_wu8k',
        },
        {
          label: 'mmap_wu128k',
          prop: 'libmicro.mmap_wu128k',
        },
        {
          label: 'mmap_wa8k',
          prop: 'libmicro.mmap_wa8k',
        },
        {
          label: 'mmap_wa128k',
          prop: 'libmicro.mmap_wa128k',
        },
        {
          label: 'unmap_z8k',
          prop: 'libmicro.unmap_z8k',
        },
        {
          label: 'unmap_z128k',
          prop: 'libmicro.unmap_z128k',
        },
        {
          label: 'unmap_t8k',
          prop: 'libmicro.unmap_t8k',
        },
        {
          label: 'unmap_t128k',
          prop: 'libmicro.unmap_t128k',
        },
        {
          label: 'unmap_u8k',
          prop: 'libmicro.unmap_u8k',
        },
        {
          label: 'unmap_u128k',
          prop: 'libmicro.unmap_u128k',
        },
        {
          label: 'unmap_a8k',
          prop: 'libmicro.unmap_a8k',
        },
        {
          label: 'unmap_a128k',
          prop: 'libmicro.unmap_a128k',
        },
        {
          label: 'unmap_rz8k',
          prop: 'libmicro.unmap_rz8k',
        },
        {
          label: 'unmap_rz128k',
          prop: 'libmicro.unmap_rz128k',
        },
        {
          label: 'unmap_rt8k',
          prop: 'libmicro.unmap_rt8k',
        },
        {
          label: 'unmap_rt128k',
          prop: 'libmicro.unmap_rt128k',
        },
        {
          label: 'unmap_ru8k',
          prop: 'libmicro.unmap_ru8k',
        },
        {
          label: 'unmap_ru128k',
          prop: 'libmicro.unmap_ru128k',
        },
        {
          label: 'unmap_ra8k',
          prop: 'libmicro.unmap_ra8k',
        },
        {
          label: 'unmap_ra128k',
          prop: 'libmicro.unmap_ra128k',
        },
        {
          label: 'conn_connect',
          prop: 'libmicro.conn_connect',
        },
        {
          label: 'unmap_wz8k',
          prop: 'libmicro.unmap_wz8k',
        },
        {
          label: 'unmap_wz128k',
          prop: 'libmicro.unmap_wz128k',
        },
        {
          label: 'unmap_wt8k',
          prop: 'libmicro.unmap_wt8k',
        },
        {
          label: 'unmap_wt128k',
          prop: 'libmicro.unmap_wt128k',
        },
        {
          label: 'unmap_wu8k',
          prop: 'libmicro.unmap_wu8k',
        },
        {
          label: 'unmap_wu128k',
          prop: 'libmicro.unmap_wu128k',
        },
        {
          label: 'unmap_wa8k',
          prop: 'libmicro.unmap_wa8k',
        },
        {
          label: 'unmap_wa128k',
          prop: 'libmicro.unmap_wa128k',
        },
        {
          label: 'mprot_z8k',
          prop: 'libmicro.mprot_z8k',
        },
        {
          label: 'mprot_z128k',
          prop: 'libmicro.mprot_z128k',
        },
        {
          label: 'mprot_wz8k',
          prop: 'libmicro.mprot_wz8k',
        },
        {
          label: 'mprot_wz128k',
          prop: 'libmicro.mprot_wz128k',
        },
        {
          label: 'mprot_twz8k',
          prop: 'libmicro.mprot_twz8k',
        },
        {
          label: 'mprot_tw128k',
          prop: 'libmicro.mprot_tw128k',
        },
        {
          label: 'mprot_tw4m',
          prop: 'libmicro.mprot_tw4m',
        },
        {
          label: 'pipe_pst1',
          prop: 'libmicro.pipe_pst1',
        },
        {
          label: 'pipe_pmt1',
          prop: 'libmicro.pipe_pmt1',
        },
        {
          label: 'pipe_pmp1',
          prop: 'libmicro.pipe_pmp1',
        },
        {
          label: 'pipe_pst4k',
          prop: 'libmicro.pipe_pst4k',
        },
        {
          label: 'pipe_pmt4k',
          prop: 'libmicro.pipe_pmt4k',
        },
        {
          label: 'pipe_pmp4k',
          prop: 'libmicro.pipe_pmp4k',
        },
        {
          label: 'pipe_sst1',
          prop: 'libmicro.pipe_sst1',
        },
        {
          label: 'pipe_smt1',
          prop: 'libmicro.pipe_smt1',
        },
        {
          label: 'pipe_smp1',
          prop: 'libmicro.pipe_smp1',
        },
        {
          label: 'pipe_sst4k',
          prop: 'libmicro.pipe_sst4k',
        },
        {
          label: 'pipe_smt4k',
          prop: 'libmicro.pipe_smt4k',
        },
        {
          label: 'pipe_smp4k',
          prop: 'libmicro.pipe_smp4k',
        },
        {
          label: 'pipe_tst1',
          prop: 'libmicro.pipe_tst1',
        },
        {
          label: 'pipe_tmt1',
          prop: 'libmicro.pipe_tmt1',
        },
        {
          label: 'pipe_tmp1',
          prop: 'libmicro.pipe_tmp1',
        },
        {
          label: 'pipe_tst4k',
          prop: 'libmicro.pipe_tst4k',
        },
        {
          label: 'pipe_tmt4k',
          prop: 'libmicro.pipe_tmt4k',
        },
        {
          label: 'pipe_tmp4k',
          prop: 'libmicro.pipe_tmp4k',
        },
        {
          label: 'conn_accept',
          prop: 'libmicro.conn_accept',
        },
        {
          label: 'close_tcp',
          prop: 'libmicro.close_tcp',
        },
      ]
    }
  ],
  // mock大数据表格
  'Spark': [
    {
      tableName: 'spark hibench',
      column: [
        {
          label: 'Wrodcount',
          prop: 'Wrodcount'
        },
        {
          label: 'Terasort',
          prop: 'Terasort'
        },
        {
          label: 'Kmeans',
          prop: 'Kmeans'
        }
      ]
    },
    {
      tableName: 'spark sql',
      column: [
        {
          label: 'sql1',
          prop: 'sql1'
        },
        {
          label: 'sql2',
          prop: 'sql2'
        },
        {
          label: 'sql3',
          prop: 'sql3'
        },
        {
          label: 'sql4',
          prop: 'sql4'
        },
        {
          label: 'sql5',
          prop: 'sql5'
        },
        {
          label: 'sql6',
          prop: 'sql6'
        },
        {
          label: 'sql7',
          prop: 'sql7'
        },
        {
          label: 'sql8',
          prop: 'sql8'
        },
        {
          label: 'sql9',
          prop: 'sql9'
        },
        {
          label: 'sql10',
          prop: 'sql10'
        },
      ]
    }
  ],
  'Hive': [
    {
      tableName: 'hive sql',
      column: [
        {
          label: 'sql1',
          prop: 'sql1'
        },
        {
          label: 'sql2',
          prop: 'sql2'
        },
        {
          label: 'sql3',
          prop: 'sql3'
        },
        {
          label: 'sql4',
          prop: 'sql4'
        },
        {
          label: 'sql5',
          prop: 'sql5'
        },
        {
          label: 'sql6',
          prop: 'sql6'
        },
        {
          label: 'sql7',
          prop: 'sql7'
        },
        {
          label: 'sql8',
          prop: 'sql8'
        },
        {
          label: 'sql9',
          prop: 'sql9'
        },
        {
          label: 'sql10',
          prop: 'sql10'
        },
      ]
    }
  ],
  'Hbase': [
    {
      tableName: 'hbase',
      column: [
        {
          label: '1T-randwrite',
          prop: '1T-randwrite'
        },
        {
          label: 'Terasort',
          prop: '100G-randread'
        },
        {
          label: '1TBulkload',
          prop: '1TBulkload'
        }
      ]
    }
  ],
  'MySQL-OLTP': [
    {
      tableName: 'benchmarksql',
      column: []
    }
  ],
  'block': [
    {
      tableName: '容量型',
      column: [
        {
          label: '1M-randrw',
          prop: '1M-randrw'
        },
        {
          label: '4K-randwrite',
          prop: '4K-randwrite'
        },
        {
          label: '4k-randrw',
          prop: '4K-randrw'
        }
      ]
    },
    {
      tableName: '缓存型',
      column: [
        {
          label: '1M-randrw',
          prop: '1M-randrw'
        },
        {
          label: '4K-randwrite',
          prop: '4K-randwrite'
        },
        {
          label: '4k-randrw',
          prop: '4K-randrw'
        }
      ]
    }
  ]
  // mock-end
}