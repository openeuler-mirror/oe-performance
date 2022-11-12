
export interface BaselineDetail {
    'guid': string,
    'created_by': string,
    'tested_by': string,
    'task_belongs_type': null,
    'task_belongs_id': null,
    'product': {
        'product_id': string,
        'model': string,
        'cpu_brief': string,
        'frequency_mhz': number,
        'cpus': number,
        'threads': number,
        'series': null,
        'memory_brief': string,
        'memory_model': string,
        'disk_brief': string,
        'disk_model': string,
        'raid_brief': string,
        'nic_brief': string,
        'psu_brief': string,
        'board_brief': string,
        'cpu_detail': {
        },
        'memory_detail': {
        },
        'disk_detail': {
        },
        'nic_detail': {
        },
        'psu_detail': {
        },
        'board_detail': {
        },
        'bios_version': string,
        'bmc_version': string,
        'bios_detail': {
            'NUMA': string,
            'Power': string,
            'Custom Refresh': string,
            'Hardware Prefetcher': string,
            'Adjacent Cache Prefetch': string
        }
    },
    'os': {
        'os_release': string,
        'os_kernel': string,
        'compiler_version': string,
        'glibc_version': '',
        'jdk_version': null,
        'kernel_parameters': null,
        'numa': null,
        'cmdline': null,
        'file_system': null
    },
    'case_result': {
        'case_result_id': string,
        'selinux': string,
        'result_publish_type': string,
        'source': string,
        'batch_uid': string,
        'os_pagesize': '',
        'tool_version': '',
        'cmc_version': '',
        'config_files': null,
        'testcase_name': '',
        'workload_data': {},
        'performance_data': number,
        'unit': null,
        'metrics': null,
        'flow': string
    },
    'publish_type': string,
    'public_state': string,
    'create_date': string,
    'secret_level': string,
    'system_info': null,
    'micro_file': null,
    'macro_file': null,
    'power_file': null,
    'container_file': null

}

export interface tableInfo {
    id: number,
    leftAttribute: string,
    leftName: string,
    leftValue: string,
    rightAttribute?: string,
    rightName?: string,
    rightValue?: string,
    leftIconInfo?: string,
    isDetail?: boolean,
    collapse?: number
}