// vim: set et:

jobModel = {
        // 以下fields字段的格式参见
        // https://www.npmjs.com/package/react-awesome-query-builder
        // https://github.com/ukrbublik/react-awesome-query-builder/blob/HEAD/CONFIG.adoc
        //
        // In addition, we add this to track where the data come from
        // origin: hosts|jobs|ejobs
        //
        // fields 下的各字段来源于
        // - origin=hosts: 可ES搜索的hosts字段列表，参考 https://gitee.com/compass-ci/lab-z9/blob/master/devices/taishan200-2280-2s48p-256g--a11
        // - origin=jobs: 可ES搜索的jobs字段列表，参考 https://gitee.com/openeuler/compass-ci/blob/master/sbin/es-jobs-mapping.sh
        // - origin=ejobs: jobs取到本地后，在JS代码里加的新增字段
        fields: {
                suite: {
                        label: '测试套',
                        type: 'select',
                        origin: 'jobs',
                        valueSources: ['value'],
                        fieldSettings: {
                                listValues: [
                                        { value: 'fio' },
                                        { value: 'lmbench' },
                                        { value: 'netperf' },
                                        { value: 'stream' },
                                        { value: 'unixbench' },
                                ]
                        },
                },
                submit_id: {
                        label: '提交id',
                        type: 'select',
                        origin: 'jobs',
                        valueSources: ['value'],
                        fieldSettings: {
                                listValues: // 查询jobs后动态赋值
                        },
                },
                group_id: {
                        label: '批次id',
                        type: 'select',
                        origin: 'jobs',
                        valueSources: ['value'],
                        fieldSettings: {
                                listValues: // 查询jobs后动态赋值
                        },
                },
                tags: {
                        label: '标记',
                        type: 'select',
                        origin: 'jobs',
                        valueSources: ['value'],
                        fieldSettings: {
                                listValues: // 查询jobs后动态赋值
                        },
                },
                osv: {
                        label: '操作系统',
                        type: 'select',
                        origin: 'jobs',
                        valueSources: ['value'],
                        fieldSettings: {
                                // 查询jobs后，进一步追加可能的值
                                // 可按特定规则动态生成 lable: 字段
                                listValues: [
                                        { value: 'openeuler@20.03' },
                                        { value: 'openeuler@22.03' },
                                        { value: 'openeuler@22.09' },
                                        { value: 'anolis@7.7' },
                                        { value: 'anolis@8.6' },
                                        { value: 'archlinux' },
                                        { value: 'centos@7' },
                                        { value: 'centos@8' },
                                        { value: 'debian@11' },
                                        { value: 'debian@11' },
                                        { value: 'debian@sid' },
                                        { value: 'fedora@32' },
                                        { value: 'fedora@33' },
                                        { value: 'fedora@35' },
                                        { value: 'fedora@36' },
                                        { value: 'kylin-deb@v10',       label: '麒麟桌面版 V10' },
                                        { value: 'kylin-rpm@V10',       label: '麒麟服务器版 V10' },
                                        { value: 'opensuse-leap@15.2',  label: 'openSUSE Leap 15.2' },
                                        { value: 'oracle@7' },
                                        { value: 'oracle@8' },
                                        { value: 'rocky@8.6' },
                                        { value: 'ubuntu@18.04' },
                                        { value: 'ubuntu@20.04' },
                                        { value: 'ubuntu@22.04' },
                                        { value: 'uos-deb@20',          label: 'UOS桌面版 V20' },
                                        { value: 'uos-rpm-e@20',        label: 'UOS服务器版 V20' },
                        },
                },
                os_arch: {
                        label: '架构',
                        type: 'select',
                        origin: 'jobs',
                        valueSources: ['value'],
                        fieldSettings: {
                                listValues: [
                                        { value: 'x86_64' },
                                        { value: 'aarch64' },
                                        { value: 'riscv' },
                                ]
                        },
                },
                testbox: {
                        label: '测试机',
                        type: 'select',
                        origin: 'jobs',
                        valueSources: ['value'],
                        fieldSettings: {
                                listValues: // 查询hosts后动态赋值
                        },
                },
                hw.nr_cpu: {
                        label: '逻辑CPU数',
                        type: 'select',
                        origin: 'hosts',
                        valueSources: ['value'],
                        fieldSettings: {
                                listValues: // 查询hosts后动态赋值
                        },
                },
                hw.nr_node: {
                        label: '物理CPU数',
                        type: 'select',
                        origin: 'hosts',
                        valueSources: ['value'],
                        fieldSettings: {
                                listValues: // 查询hosts后动态赋值
                        },
                },
                hw.memory: {
                        label: '内存大小',
                        type: 'select',
                        origin: 'hosts',
                        valueSources: ['value'],
                        fieldSettings: {
                                listValues: // 查询hosts后动态赋值
                        },
                },
        },

        kpis: {
                'stats.stream.bandwidth_MBps':                  { direction: 1,  label: '内存带宽(MBps)' },
                'stats.netperf.Throughput_Mbps':                { direction: 1,  label: '网络带宽(MBps)' },
                'stats.netperf.Throughput_Tps':                 { direction: 1,  label: '请求转换率(应答次数/s)' },
                'stats.unixbench.score':                        { direction: 1,  label: '综合跑分' },
                'stats.lmbench.local_bandwidths':               { direction: 1,  label: '内存映射、拷贝及读写带宽(MB/s)' },
                'stats.lmbench.Processor_Processes.latency':    { direction: -1, label: 'CPU、进程常用操作延迟(us)' },
                'stats.lmbench.local_latencies':                { direction: -1, label: '本地通信延迟(us)' },
                'stats.lmbench.Context_switching_ctxsw':        { direction: -1, label: '进程上下文切换开销(us)' },
                'stats.lmbench.File_&_VM_latencies':            { direction: -1, label: '内存映射延迟(us)' },
                'stats.lmbench.Memory_latencies':               { direction: -1, label: '主存及缓存延迟(us)' },
        },

        // 查询方法：先查询suite.param, 再查询公共param
        params: {
                // 公共param，去掉前缀pp.$program.后与之匹配
                nr_task: {
                        '1':    '单核',
                        '100%': '多核',
                },
                nr_threads: {
                        '1':    '单核',
                        '100%': '多核',
                },

                // 测试套特定param，以pp.打头
                'pp.fio.rw': {
                        'read':         '顺序读',
                        'write':        '顺序写',
                        'rw':           '顺序混合读写',
                        'readwrite':    '顺序混合读写',
                        'randwrite':    '随机写',
                        'randread':     '随机读',
                        'randrw':       '随机读写',
                },
        },
}

// suite => function(kpi) => Map with keys (testcase, kpi)
kpiMapFuncs = {
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
}
// debug:
// console.log(kpiMapFuncs.unixbench('Process_Creation'))
// output:
// { testcase: 'Process_Creation', kpi: 'score' }

// suite => Map with keys (testcase, kpi)
kpiMaps = {
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
        },

}

suiteTables = {
        netperf: [
                { kpi: 'Throughput_Mbps', x_param: 'send_size', filters: { test: 'TCP_STREAM' }         },
                { kpi: 'Throughput_Mbps', x_param: 'send_size', filters: { test: 'UDP_STREAM' }         },
                { kpi: 'Throughput_Tps',  x_param: 'test'                                               },
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
}
