
[TOC]

## 1. 需求分析：

### 1.1 需求链接

https://r.huaweistatic.com/s/kunpengstatic/lst/files/pdf/ecosystem/ecology_remit/20220630170008.pdf

### 1.2 功能描述
> 性能基线/性能测试页面：用户在网页左侧导航栏上选择基础性能（CPU/内存/存储/网络/基础库）中一个特性，右侧实现某个测试组件所有的测试数据展示
> 对比检索页面：

### 1.3 功能原型设计

https://modao.cc/app/IUs90Nvri8odsTP3U18oR#screen=sl82p1aoqxqf18o

## 2. 方案设计

### 2.1 整体方案分析

![](../api.assets/方案分析.png)

### 2.2 详细设计

#### 2.2.1 新增、修改、删除点分析
> web-backend: 新增用于标准化POST数据的模块，前端只选择suite名称，会展示全部的数据
> es-server: 新增专门用于存储数据的表单
> web-backend：基于新增的存储性能数据的表单，修改query_field数据筛选按钮的反馈
> web-backend: 修改原有对比检索页面，反馈的数据格式，新增对单个表单的几何平均值的数据反馈

#### 2.2.2 API设计

|序号|接口|页面模块|说明|
|:----    |:---|:----- |-----   |
| 1|数据上传申请的列表接口（用户看自己的，管理员看相关的）| 用户中心-我的申请-待审批(待审批/已发布/已驳回) | 查看我的申请的所有待审批的数据 |
| 2|删除数据上传申请| 用户中心-我的申请-待审批 | 删除数据上传申请 |
| 3|数据上传申请提交接口| 用户中心-我的审批-待审批(待审批/已发布/已驳回) | 审批通过待审批通过的数据 |
| 4|数据上传申请审核接口| 性能测试-测试组件-上传 | 数据上传需要绑定审核人，增加数据描述 |
| 5| 测试任务列表数据接口，可条件查询 | 测试任务 | 页面等同性能基线(一个task_id=submit_id, 一个submit_id=group of job_id) + 动态数据：总计/成功/失败 |
| 6| 测试任务详情接口 | 测试任务-详情 | 对search到的job进行全部展开 |
| 7| 删除测试任务接口 | 测试任务 | 调用接口对后端的job 进行cancel， 对于已经消费的job，无法调用该接口|
| 8| 重新运行测试任务接口 | 测试任务 | 调用接口对后端的job 进行重新提交，重跑重新跳转到任务提交页面，进行任务提交，配置复用，重新分配submit_id|
| 9| 提交测试接口 | 提交测试 | 根据前端post上来的数据，在后端组成job.yaml文件，进行任务提交 |
| 10| 获取测试套件下有哪些测试用例的接口（提交测试时要选择测试用例） | 提交测试 | 根据每个测试组件的yaml文件进行划分 |
| 11| OS版本数据接口| 提交测试 | 提交测试时选择OS版本 |
| 12| 提交测试时的硬件 | 提交测试 | 提交测试时选择硬件配置 |

##### 简要描述（数据上传申请的列表接口）

-数据上传申请的列表接口（用户看自己的，管理员看相关的）,页面模块：用户中心-所有审批，该接口用于查询当前所在的数据对象的操作权限，包括是否可编辑，删除等

######  请求URL
- ` /data-api/search`
  
######  请求方式
- GET

###### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
| token|是  | string | 判断账号信息 |

###### 返回示例 

``` 
{
    "count": 1,
    "next": null,
    "previous": null,
    "results": [
        {
            "guid": "AF20221126169651",
            "histories": [
                {
                    "guid": 88,
                    "who": "",
                    "when": "2022-11-26T02:49:19.519740Z",
                    "do_what": "Review",
                    "comment": "test",
                    "flow": "AF20221126169651"
                }
            ],
            "created_date": "2022-11-26T02:49:19.501471Z",
            "committed_date": "2022-11-26T02:49:19.519508Z",
            "state": "OnReview",
            "secret_level": "benchmark_performance_data",
            "data_type": "core_casedata",
            "data_description": "test",
            "data_ids": [
                "888012a6-8db0-45ac-ad73-5bfbaeb93293",
                "d9f24f62-510a-49b5-aa93-ab24f9213751",
                "cba6307e-5f13-40b2-8e06-48d3ff891054",
                "46ae558d-171b-4a2e-9e64-62673085adc4",
                "e3778a70-07f0-4c12-8162-e8af177715b0",
                "3c260c26-e43e-4d1a-865f-5062d1f7751c",
                "38b0ce72-ea14-47db-af6a-b7f5f5548a60",
                "6d8761ff-dc65-4d1d-9095-70aef9bd310d",
                "b828f655-b3c7-4f24-92ed-678a3382bf95",
                "a7bcc5ec-ae21-49b0-9933-fbcc8cf36a09"
            ],
            "publish_type": "performance_baseline_data", (等同于版本特性)
            "committed_by": "",
            "reviewer": "",
            "approvable_data": {
                "domain_type": "OPENEULER_BASIC",
                "test_model": "unixbench"
            }
        }
    ]
}
```

###### 返回参数说明 


|参数名|类型|说明|
|:-----  |:-----|-----                           |
|guid | string  |申请单号  |
|histories | string  |申请单的创建记录 |
|created_date | date  | 创建时间  |
|committed_date | date  | 提交时间 |
|state | string | 状态 |
|secret_level | string | 发布秘级 (枚举) |
|data_type | string | 被审批的数据类型 |
|data_description | string | 被审批的数据描述 |
|data_ids | list | 审批数据的submit_id，一般会提交多条数据 |
|publish_type | string | 数据发布类型 |
|committed_by | string | 提交人 |
|reviewer | string | 审批人 |
|approvable_data | hash | 提交数据可合入范围|
|domain_type | strting| 数据可合入领域(领域是团队的概念，先不划分领域)|
|test_model | string | 数据合入哪个测试组件|



##### 简要描述（删除数据上传申请）

- 删除数据上传申请,页面模块：用户中心-我的申请-待审批，该接口用于删除待审批的申请单。

######  请求URL
- ` /data-api/search`
  
######  请求方式
- POST

###### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
| guid|是  | string | 需要删除的数据的guid列表 |

###### 返回示例 

``` 
{
  "success": 0,
  "fail": 0,
  "message": "string"
}
```

###### 返回参数说明 


|参数名|类型|说明|
|:-----  |:-----|-----                           |
|success | int  | 操作成功的数据量 |
|fail | int  |操作失败的数据量 |
|message | string | 操作失败的原因  |

##### 简要描述（数据上传申请提交接口）

- 数据上传申请提交接口,页面模块：用户中心-我的审批-待审批，该接口用于审批通过申请单

######  请求URL
- ` /data-api/search`
  
######  请求方式
- POST

###### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
| guid|是  | string | 需要审批发布的数据的guid列表 |

###### 返回示例 

``` 
{
  "success": 0,
  "fail": 0,
  "message": "string"
}
```

###### 返回参数说明 


|参数名|类型|说明|
|:-----  |:-----|-----                           |
|success | int  | 操作成功的数据量 |
|fail | int  |操作失败的数据量 |
|message | string | 操作失败的原因  |

##### 简要描述（数据上传申请审核接口）

- 数据上传申请审核接口，页面模块：性能测试-测试组件-上传，该接口用于上传数据并自动提交申请单

######  请求URL
- ` /data-api/upload`
  
######  请求方式
- POST

###### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
| test_data_file|是  | excel文件 | 上传的文件 |
| reviewer|是  | string | 审批人 |
| data_type|是  | string | 申请单类型 |
| publish_type|是  | string | 发布类型 |
| data_description|是  | string | 数据描述 |

###### 返回示例 

``` 
{
  "success": 0,
  "fail": 0,
  "message": "string"
}
```

###### 返回参数说明 


|参数名|类型|说明|
|:-----  |:-----|-----                           |
|success | int  | 操作成功的数据量 |
|fail | int  |操作失败的数据量 |
|message | string | 操作失败的原因  |

##### 简要描述（测试任务列表数据接口）

- 测试任务列表数据接口，可条件查询，页面模块：测试任务，该接口页面等同性能基线(一个task_id=submit_id, 一个submit_id=group of job_id) + 动态数据：总计/成功/失败。
在性能基线页面，一个测试组件(suite: stream/unixbench/fio/lmbench/libmicro/speccpu), 数据组合流程(以stream为例)：
1、获取suite=stream 的10个不同submit_id的一组job
2、由于同一个submit_id的一组任务的硬件配置都是一样的，且存在另一个表单machine_info，需要根据testbox字段去获取这些详细的硬件配置

######  请求URL
- ` /data-api/search`
  
######  请求方式
- POST

###### 请求示例（就是根据ES的查询语句来获取就行）
- 查询一个测试组件 10 条不同submit_id不同的数据,使用数据库的去重查询语法
```
export const getsubmitidAxios = (param) => http({
    url: '/data-api/search',
    method: 'POST',
    data: {
        index: 'jobs',
        query: {
            size: 0,
            _source: ['submit_id'],
            query: {
                bool: {
                    must: [
                        {
                            match: {
                                suite: "stream"
                            },
                            exists: {
                                field: "submit_id"
                            }
                        }
                    ]
                },
                aggs: {
                    uid_aggs: {
                        terms: {
                            field: "submit_id",
                            size: 10 
                        }
                    },
                    aggs: {
                        my_top_hits: {
                            top_hits: {
                                _source: {
                                    includes: ['suite', 'submit_id', 'os', 'os_version', 'nr_cpu', 'testbox', 'kernel_version', 'nr_node', "job_stage", "job_health"]
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});
```


###### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
| index|是  | 要查询的es表单名 | jobs这个表单中包含了后台消费的所有任务 |
| query |是  | hash | es数据库的查询语句 |
| size| 否 | int | 要返回的数据量 |
| _source | 否 | list | 要返回的字段 |
|match | 是  | hash | es数据库中的匹配查询语句 |
|aggs | 是  | hash | es数据库中的聚合查询语句 |
|terms | 是  | hash | 根据结果分类 |
|field | 是  | string | 筛选字段 |
|submit_id | 是  | string | 需要分类的字段 |

###### 返回示例 

``` 
{
    "_shards": {
        "failed": 0,
        "skipped": 0,
        "successful": 23,
        "total": 23
    },
    "aggregations": {
        "uid_aggs": {
            "buckets": [
                {
                    "doc_count": 12,
                    "key": "01a1601b-a096-488c-a00c-42f19b332a9b", # submit_id
                    "my_top_hits": {
                        "hits":{
                            "hits": [
                                {
                                    "_id": "crystal.3513587",
                                    "_index": "jobs8",
                                    "_score": 8.205667,
                                    "_source": {
                                        "suite": "stream", # 这些submit_id对应的suite都是stream
                                        "submit_id": "",
                                        "os": "openeuler",
                                        "os_version": "xxx", # os+os_version=os_release
                                        "nr_cpu": "",
                                        "testbox": "taishan200-2280-2s48p-284g--a1006",
                                        "kernel_version": "",
                                        "nr_node": 4,
                                        "job_stage": "finish",
                                        "job_health": "success"
                                    },
                                    "_type": "_doc"
                                },
                                ......
                        }
                },
                ......
            ],
            "doc_count_error_upper_bound": 12,
            "sum_other_doc_count": 1366
        }
    },
    "hits": {
        "hits": [
            ......
        ],
        "max_score": 12.896866,
        "total": {
            "relation": "eq",
            "value": 1486
        }
    },
    "timed_out": false,
    "took": 175
}

```

###### 返回参数说明 

|参数名|类型|说明|
|:-----  |:-----|-----                           |
|buckets| hash | 桶，类似于关系型数据库中的group_by |
|key | string  | 查询时所用的用于分类筛选的field |
|my_top_hits | hash | 筛选到的结果  |
|os os_version | string | 这两个字段加在一起就是os_release, 表头显示为操作系统  |
|nr_cpu | int | 等同于cpus，表头显示为CPU总核数  |
|testbox | string | 测试机名称，通过这个字段可以获取测试机的更多参数 |
|kernel_version | string | 等同于os_kernel,表头显示为系统内核 |
|nr_node | int | 表头显示为操作系统页表大小 |
|job_stage | string | 任务所处阶段，有submit(提交)，finish（完成） |
|job_health | string | 任务状况，有failed， success |

##### 简要描述（根据testbox获取测试机的更多参数）
- 根据testbox即测试机名称，获取测试机的更多参数

######  请求URL
- ` /data-api/search`
  
######  请求方式
- POST

###### 请求示例（就是根据ES的查询语句来获取就行）
- 根据testbox，去获取testbox的信息
```
export const getsubmitidAxios = (param) => http({
    url: '/data-api/search',
    method: 'POST',
    data: {
        index: 'machine_info',
        query: {
            size: 1,
            query: {
                bool: {
                    must: [
                        {
                            match: {"testbox": "taishan200-2280-2s48p-284g--a1006"}
                        }
                    ]
                }
            }
        }
    }
 }
                        
```

###### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
| index|是  | 要查询的es表单名 | machine_info这个表单中保存了所有测试机的详细信息 |
| query |是  | hash | es数据库的查询语句 |
| size| 否 | int | 要返回的数据量 |
| _source | 否 | list | 要返回的字段 |
|match | 是  | hash | es数据库中的匹配查询语句 |

###### 返回示例 

``` 
{
    "_shards": {
        "failed": 0,
        "skipped": 0,
        "successful": 1,
        "total": 1
    },
    "hits": {
        "hits": [
            {
                "_id": "9Fjzx4QBo5nFGu9ethdR",
                "_index": "machine_info",
                "_score": 1.0,
                "_source": {
                    "bios": {
                        "version": "1.7"
                    },
                    "cpu": {
                        "model": "Kunpeng 920-4826",
                        "num": "2"
                    },
                    "disk": {
                        "device_port": "SAS (SPL-3)",
                        "num": "9",
                        "size": "1.09 TiB",
                        "type": "hdd"
                    },
                    "memory": {
                        "num": "12",
                        "rank": "2",
                        "speed": "2666MT/s",
                        "type": "DDR4"
                    },
                    "ports": {
                        "device_num": "e51922a2e5195404",
                        "num": "2"
                    },
                    "server": {
                        "product": "TaiShan 200 (Model 2280)"
                    },
                    "testbox":"" "taishan200-2280-2s48p-384g--a1006"""
                },
                "_type": "_doc"
            }
        ],
        "max_score": 1.0,
        "total": {
            "relation": "eq",
            "value": 5
        }
    },
    "timed_out": false,
    "took": 0
}
```

###### 返回参数说明 

|参数名|类型|说明|
|:-----  |:-----|-----      |
|bios| hash | BIOS版本 |
|cpu | hash | num*model = CPU配置 |
|disk| hash | num*size device_port type = 硬盘配置 |
|memory | hash | num*32GB rankR type speed = 内存配置 |
|ports | hash |   |
|server | hash | product = 服务器型号 |

##### 简要描述（测试任务详情接口）
- 测试任务详情接口，测试任务-详情，对search到的job进行全部展开

######  请求URL
- ` /data-api/search`
  
######  请求方式
- POST

###### 请求示例（就是根据ES的查询语句来获取就行）
- 根据submit_id，拿到一组job的信息
```
export const getsubmitidAxios = (param) => http({
    url: '/data-api/search',
    method: 'POST',
    data: {
        index: jobs
        query: {
            size: 10000，#取到这个submit中的所有的job
            query: {
                bool: {
                    must: [
                        {
                            term: {
                                submit_id: param.submit_id
                            }
                        }
                    ]
                }
            }
        },
        sort: [
            submit_time: {
                order: desc
            }
        ],
        _source: ["suite", "submit_id", "my_account", "submit_time", "boot_time", "close_time", "job_stage", "job_health", "testbox", "category", "result_root"]
    }
})
                        
```

###### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
| index|是  | 要查询的es表单名 | machine_info这个表单中保存了所有测试机的详细信息 |
| query |是  | hash | es数据库的查询语句 |
| size| 否 | int | 要返回的数据量 |
| sort| 否 | hash | 用来排序的字段 |
| _source | 否 | list | 要返回的字段 |

###### 返回示例 

``` 
{
    "_shards": {
        "failed": 0,
        "skipped": 0,
        "successful": 1,
        "total": 1
    },
    "hits": {
        "hits": [
            {
                "_id": "9Fjzx4QBo5nFGu9ethdR",
                "_index": "machine_info",
                "_score": 1.0,
                "_source": {
                   "suite": "stream",
                   "submit_id": "",
                   "my_account": "",
                   "submit_time": "",
                   "boot_time": "",
                   "close_time": "",
                   "job_stage": "",
                   "job_health": "",
                   "testbox": "",
                   "category": "",
                   "result_root": "",    
                },
                "_type": "_doc"
            }
        ],
        "max_score": 1.0,
        "total": {
            "relation": "eq",
            "value": 5
        }
    },
    "timed_out": false,
    "took": 0
}
```

###### 返回参数说明 

|参数名|类型|说明|
|:-----  |:-----|-----      |
|suite| string | Test Suite |
|submit_id | string | 详情页索id|
|my_account | string | 任务提交人|
|submit_time| string | 任务提交时间 |
|boot_time | string | 任务开始时间 |
|close_time | string | 任务完成时间 |
|job_stage | string | 任务所处阶段，有submit(提交)，finish（完成） |
|job_health | string | 任务状况，有failed， success |
|testbox | string | 机器|
|category | string | 测试类型（benchmark表示性能测试） |
|result_root | string | 结果日志的下载路径 |

```
web-backend:
输入：网页上选中某个测试组件（例如：unixbench）
/performance_result/unixbench/?limit=10
输出：
{
    "count": 12,
    "results": [
        {
            "guid": "$submit_id",
            # 测试人 
            "created_by": "$my_account", # 指标
            # 审核人
            "tested_by": "", # 当数据未经过审核时，不进行展示
            "task_belongs_type": null,
            "task_belongs_id": null,
            # 硬件配置
            "product": {
                "product_id": "",
                # 服务器型号
                "model": "Kunpeng-Taishan 200", # 指标
                # 处理器
                "cpu_brief": "", # 指标：CPU配置
                # CPU频率(MHz) 
                "frequency_mhz": 2500,
                "cpus": 80, 
                "threads": 80,
                "series": null,
                # 内存规格
                "memory_brief": "", # 指标： 内存配置
                # 内存型号
                "memory_model": "",
                # 硬盘规格
                "disk_brief": "", # 指标： 硬盘配置
                # 硬盘型号
                "disk_model": "",
                # RAID卡
                "raid_brief": "",
                # 网卡
                "nic_brief": "",
                # 电源
                "psu_brief": "",
                # 单板
                "board_brief": "",
                # 处理器$cpu_brief的详细信息(点击弹窗显示)
                "cpu_detail": {},
                "memory_detail": {},
                "disk_detail": {},
                "nic_detail": {},
                "psu_detail": {},
                "board_detail": {},
                "bios_version": "7.55 (U47)",
                # BMC版本
                "bmc_version": "",
                # BIOS版本
                "bios_version": "",
                # BIOS配置
                "bios_detail": {
                    "NUMA": "Enable",
                    "Power": "Custom",
                    "Custom Refresh": "Disabled",
                    "Hardware Prefetcher": "Enable",
                    "Adjacent Cache Prefetch": "Enable"
                }
            }, 
            # 软件配置（详情页）
            "os": {
                # 操作系统
                "os_release": "$os-$os_version", # 指标
                # 系统内核
                "os_kernel": "",
                # 编译器版本
                "compiler_version": "",
                # GLIBC版本
                "glibc_version": "",
                # JDK版本
                "jdk_version": null,
                # 内核参数
                "kernel_parameters": null,
                # NUMA
                "numa": null,
                # 命令行
                "cmdline": null,
                # 文件系统
                "file_system": null
            },
            # 用例信息（详情页）
            "case_result": {
                "case_result_id": "",
                # selinux
                "selinux": "",
                # result_publish_type
                "result_publish_type": "performance_baseline_data",
                # source
                "source": "openEuler" # 指标：数据来源
                "batch_uid": "2022-09-22 09:13:12.045408_027"
                # 操作系统页表大小
                "os_pagesize": "",
                # 测试工具版本
                "tool_version": "",
                # CMC版本号
                "cmc_version": "",
                # 配置文件
                "config_files": null,
                # 测试用例名称 
                "testcase_name": "", # 指标：测试用例名称
                # Workload性能值
                "workload_data": {},
                # 性能值
                "performance_data": 1231, # 指标：性能数据
                # 单位(描述)
                "unit": null,
                # 指标
                "metrics": null,
                "flow": ""
            },
            "publish_type": "performance_baseline_data",
            # 数据状态： 未审核，已审核
            "public_state": "Untracked/tracked"
            "create_date": "$submit_time",
            "secret_level": "process_data",
            "system_info": null,
            "micro_file": null,
            "macro_file": null,
            "power_file": null,
            "container_file": null

        }
    ]
}
```

```
web-backend:
输入：确认某个测试组件的测试用例名称，只有在测试用例一致的情况下，可以进行详情数据对比(例如： unixbench)
/performance_result/unixbench/?distinct=unixbench_testcase_name
输出：
["单核"， "多核"]
```

```
web-backend：
输入：确认不少于两组以上的测试数据
输出：
{
    # 技术规格表格信息
    "specification": {
        # 技术规格表格的表头
        "table_header": [
            "CPU型号"，
            "操作系统",
            "内核版本",
            "selinux",
            "页表大小",
            "GCC编译器版本",
            "glibc版本",
            "文件系统"
        ],
        "data": [[], []] 
    }
    "charts": [
        {
            # 柱状图的x轴指标
            "xAxisData": [ 
                "Dhrystone_"
            ],
            # y值
            "seriesData":[
                {
                    # 其中一个os版本
                    "os_release": ""
                    performance_data: 123,
                    "data": [
                        "1893"
                    ]
                }，
                {
                    # 另一个os版本
                    "os_release": ""
                    performance_data: 123,
                    "data": [
                        "1893"
                    ]
                }
            ]
            # 柱状图上鼠标滑过显示每一项的性能提升率
            "x_ratio_table": {
                "table_header": [
                    "操作系统",
                    "性能值",
                    "性能比"
                ],
                "data": [[],[]]
            },
            # 图片名称
            # 单位
            "title": "",
            "unit": "",
        }
    ]，
    # 总比表格信息
    "total_ratio_table": {
        "table_header": [
            "",
            "openEuler-20.03",
            "openEuler-20.09",
            "openEuler-20.03 vs openEuler-20.09"
        ],
        "data": [[],[]]
    }
}

```
