
// unixbench 的测试用例列表。
// 在submit数据组装时，需根据这个配置信息去拼装测试用例的值。然后根据测试用例的值来给jobs分组
// => pp.unixbench.nr_task=1
const unixbenchTestParams = [
  'pp.unixbench.nr_task'
]

const unixbenchKpiList = [
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
]
// 拼装后在每个submit下生成这样的结构：
/*
{
    pp.fio-setup-basic.rw=randrw,pp.fio-setup-basic.rwmixread=70,pp.fio-setup-basic.bs=4k: {
        fio.read_iops: ["34325", "7264"],  // 这部分数据项通过unixbenchKpiList 配置去获取
        fio.read_bw_MBps: [],
        fio.write_bw_MBps: [],
        fio.write_iops: [],
    },
    pp.fio-setup-basic.rw=randrw,pp.fio-setup-basic.rwmixread=70,pp.fio-setup-basic.bs=16k: {
        fio.read_iops: ["34325", "7264"]
        fio.read_bw_MBps: []
        fio.write_bw_MBps: []
        fio.write_iops: []
    },
    ....
} 
*/

// 对象中的键对应数据表格，每个表都会对应不同的param的值
const unixbenchTableRelationWithParams = {
  'single': 'pp.unixbench.nr_task=1',
  'multiple': 'pp.unixbench.nr_task=96'
}

// lmbench
// => pp.lmbench.mode=all,pp.lmbench.nr_thread=1,pp.lmbench.test_memory_size=4096
const lmbenchTestParams = [
  'pp.lmbench.mode',
  'pp.lmbench.nr_thread',
  'pp.lmbench.test_memory_size',
]