import Mock from 'mock2js';
import { createResponseBody } from '../util.js';

const responseObj = {
  'count': 12,
  'results': [
    {
      'guid': '$submit_id',
      'created_by': '$my_account', 
      'tested_by': '', 
      'task_belongs_type': null,
      'task_belongs_id': null,
      'product': {
        'product_id': '',
        'model': 'Kunpeng-Taishan 200', 
        'cpu_brief': '', 
        'frequency_mhz': 2500,
        'cpus': 80, 
        'threads': 80,
        'series': null,
        'memory_brief': '', 
        'memory_model': '',
        'disk_brief': '',
        'disk_model': '',
        'raid_brief': '',
        'nic_brief': '',
        'psu_brief': '',
        'board_brief': '',
        'cpu_detail': {
          param1:'',
          param2:'',
          param3:'',
          param4:'',
          param5:'',
          param6:'',
        },
        'memory_detail': {
          param1:'',
          param2:'',
          param3:'',
          param4:'',
          param5:'',
          param6:'',
        },
        'disk_detail': {
          param1:'',
          param2:'',
          param3:'',
          param4:'',
          param5:'',
          param6:'',
        },
        'nic_detail': {
          param1:'',
          param2:'',
          param3:'',
          param4:'',
          param5:'',
          param6:'',
        },
        'psu_detail': {
          param1:'',
          param2:'',
          param3:'',
          param4:'',
          param5:'',
          param6:'',
        },
        'board_detail': {
          param1:'',
          param2:'',
          param3:'',
          param4:'',
          param5:'',
          param6:'',
        },
        'bios_version': '7.55 (U47)',
        'bmc_version': '',
        'bios_version': '',
        'bios_detail': {
          'NUMA': 'Enable',
          'Power': 'Custom',
          'Custom Refresh': 'Disabled',
          'Hardware Prefetcher': 'Enable',
          'Adjacent Cache Prefetch': 'Enable'
        }
      }, 
      'os': {
        'os_release': '$os-$os_version',
        'os_kernel': '',
        'compiler_version': '',
        'glibc_version': '',
        'jdk_version': null,
        'kernel_parameters': null,
        'numa': null,
        'cmdline': null,
        'file_system': null
      },
      'case_result': {
        'case_result_id': '',
        'selinux': '',
        'result_publish_type': 'performance_baseline_data',
        'source': 'openEuler' ,
        'batch_uid': '2022-09-22 09:13:12.045408_027',
        'os_pagesize': '',
        'tool_version': '',
        'cmc_version': '',
        'config_files': null,
        'testcase_name': '', 
        'workload_data': {},
        'performance_data': 1231, 
        'unit': null,
        'metrics': null,
        'flow': ''
      },
      'publish_type': 'performance_baseline_data',
      'public_state': 'Untracked/tracked',
      'create_date': '$submit_time',
      'secret_level': 'process_data',
      'system_info': null,
      'micro_file': null,
      'macro_file': null,
      'power_file': null,
      'container_file': null

    }
  ]
}

const getDetail = () => {
  return createResponseBody(
    responseObj,
    '获取详情数据成功',
    200,
    {'Custom-Header': Mock.mock('@guid')}
  );
};

Mock.mock(/\/performance_result\/unixbench/, 'get', getDetail);
