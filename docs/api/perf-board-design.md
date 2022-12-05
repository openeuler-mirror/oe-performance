# 性能看板需求设计

## 数据库

核心数据来源是ES JSON数据库的两个表：jobs表和hosts表

### jobs表

其中的每个JSON代表一次测试运行，其不同字段包括了以下三类数据
- 测试环境 (hw/sw 软硬件环境描述字段)
- 测试参数 (multiple test params)
- 测试结果 (multiple KPIs)

概念数据：

	ES job JSON 
	{
		suite: 		# 测试套名称 一般suite设置为主program名
		id: 		# 全局唯一job id，一个id代表一次测试运行。完全相同参数测试的两次运行，会产生两个id，两个job
		submit_id: 	# 测试批次id
	
		# 软件环境
		os:
		kernel:
	
		# 硬件环境
		testbox:
		tbox_group:
	
		# 测试测试
		pp.$program.$test_param: # pp.测试脚本名.测试参数名
	
		# 测试结果
		stats.$program.$kpi:  # KPI = Key Performance Indicator
	}

实例数据：

	job-stream.yaml (local file)
	https://api.compass-ci.openeuler.org/result/stream/2022-11-08/vm-2p32g/openeuler-20.03-aarch64/10000000-128-false/z9.22773155/job.yaml

### hosts表

概念数据：

	ES host JSON
	{
		testbox:     # 物理机查询此字段，适用本项目
		tbox_group:  # 虚机、容器查询此字段，性能前端项目忽略之
	
		nr_cpu: 
		...
	}

实例数据： hosts表中的每个JSON代表一个测试机，会从以下两个YAML文件合并生成

	https://gitee.com/compass-ci/lab-z9/blob/master/hosts/taishan200-2280-2s48p-256g--a11
	https://gitee.com/compass-ci/lab-z9/blob/master/devices/taishan200-2280-2s48p-256g--a11

## 查询API

### 接口定义

gitee后端实现代码链接:

	https://gitee.com/openeuler/compass-ci/blob/master/container/data-api/data-api

输入JSON除了新增两个认证数据之外，与ES API完全一样。所以用法可以参考以下ES search API文档。

### 上游API文档链接

	https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html  
	https://opendistro.github.io/for-elasticsearch-docs/docs/sql/

## UI需求: 概览

本前端包含若干个Web页面，它们
- 有一组key=val过滤条件(硬编码或者用户从一组下拉框中选择)，用于从ES数据库搜索特定的jobs
- 将这组jobs做数据变换后，呈现为特定的tables或者charts

## 数据处理流程

### step1: 从ES搜索获得hosts清单

测试机数据量不多，全部查询到本地，存在allHosts变量即可。
查询时限定一下fields，只获取用得到的字段。

### step2: 从ES搜索获得jobs字段取值清单

查询方式及结果参见
- agg-request.sh
- agg-request.json
- agg-result.json

以上step1/step2动态查询得到的清单，叠加在jobModel.fields里的预置listValues, 得到比较完整的每个字段都可以取哪些值的先验知识，用于呈现给用户做选择，

### step3: UI search frame: 显示select等控件，供用户构造一系列字段搜索条件

UI需求点：
根据 data-model.js 里的 jobModel.fields.keys() 挨个创建控件。
要求可弹性伸缩 -- 以后只需要修改jobModel配制即可在界面上增加控件。

目前jobModel只包含jobs里的若干可搜索项（见下面的列表），以后会按需添加新的fields from hosts/jobs ES表.

搜索过滤字段, defined in jobModel.fields:

	suite
	osv
	os_arch
	testbox

推荐使用如下控件让用户灵活的组装自己需要的搜索过滤条件:
https://github.com/ukrbublik/react-awesome-query-builder

或者自行利用element-ui控件创建一组选择框：
https://element.eleme.cn/#/en-US/component/select#basic-multiple-select

### step4: 根据用户搜索条件，从ES搜索获得hosts/jobs

用户点击搜索后，触发ES搜索。

1. 先用硬件配置项搜索ES hosts表，获得testbox列表
2. 用testbox/osv/suite等job字段，搜索ES jobs表

### step5: 扩展本地jobs为ejobs

搜索结果存到本地jobs之后：

1. 对本地jobs, hosts两个多层级哈希结构做扁平化

	a:
	  b:
	    c
	=>
	a.b: c

成为单层哈希结构，方便后续处理。

参见:

	https://www.geeksforgeeks.org/flatten-javascript-objects-into-a-single-depth-object/

2. 对每个job对象，合入对应testbox的硬件host字段，加上hw前缀，方便后续统一图表展示

3. 对每个job对象，做一些必要的调整，添加一些必要字段，方便后续在图表中展示

比如
		testbox: vm-2p32g.taishan200-2280-2s48p-256g--a35-5
		=>
		testbox: vm-2p32g

jobs经过以上变换后，我们称之为ejobs。变换后，对象数量没有增加，但是每个对象的内部字段被重新组织和扩充。
ejobs建议按suite分类保存，方便高效遍历。
ejobs样例(类YAML伪代码):

	ejobs['stream'] =
		suite: stream
		category: benchmark
	
		pp.stream.nr_threads: 128
		pp.stream.array_size: 10000000
		pp.stream.omp: false
	
		os: openeuler
		os_version: "20.03"
		osv: openeuler@20.03
		arch: aarch64
	
		testbox: vm-2p32g
		hw.nr_node: 1
		hw.nr_cpu: 2
		hw.memory: 32G
	
		time: "2022-11-08T14:34:53+0800"
		stats.stream.copy_bandwidth_MBps: 13195.9
		stats.stream.scale_bandwidth_MBps: 12791.4
		stats.stream.add_bandwidth_MBps: 14703.4
		stats.stream.triad_bandwidth_MBps: 14651.1

### step6: 扩展本地ejobs为tjobs

根据data-model.js kpiMaps/kpiMapFuncs的kpi映射，从kpi中抽取testcase，并对kpi名进行分类规整

	for each suite:
	for ejob in ejobs[suite]:
		copy ejob to a new job
		job.testcase = job.test

		delete all kpis from ejob
		for each matching kpi in kpiMaps/kpiMapFuncs:
			copy job to a new tjob
			tjob.testcase = map($kpi).testcase
			tjob["pp.$suite.$(map($kpi).kpi)"] = ejob["pp.$suite.$kpi"]
			tjobs[suite] += tjob

以上映射之后的tjobs所含对象数量会比ejobs多
ejob.test会被转为tjob.testcase
后续的各页面呈现，统一使用tjobs。

## UI需求: URL可分享

需求：搜索条件显性化为URL参数，要让当前视图可拷贝黏贴URL分享给他人，让他人看到一样的页面视图，方便协作

## UI search frame

每个页面顶部都要有search frame, 详见上面的 step3 小节。

## UI page: 性能对比图表系列

需使用data-model.js中的如下预置数据:
- jobModel的fields/kpis/params名字映射，用于将原始数据显示为用户友好名字
- suiteTables的per-suite图表定义，每一个底层数据字典代表一个图表

本页面UI输入1：

	要比较的维度: [osv] testbox tags		存入y_param.name
	要比较的值：在osv列表中选择2+个item		存入y_param.values

本页面UI输出1：

	遍历suiteTables，从tjobs找到值来填充一个个表格，逐个显示table+chart

填充其中一个表格的数据来源：

	table 标题: 
				suiteTables[suite].filters里的k=v 经过 jobModel.params.. 映射为用户友好名字
				+
				suiteTables[suite].kpi 经过 jobModel.kpis..label 映射为用户友好名字
				+
				jobModel.kpis..direction > 0 ?  '(越大越好)' : '(越小越好)'
	table 第一行:		x_param.values
	table 第一列:		y_param.values
	table (0,0)单元格:	kpi
	table (x,y)单元格:	遍历tjobs[suite]，填入所有匹配项的值; 然后取平均值

在每个图表之前，显示

Conditional per-table UI输入2：

	x_param: [param1] param2 param3 ...

其中param1是当前使用的`x_param`，param2/param3/...是在填充(x,y)过程中发现的多个参数值被折叠到同一个单元格的参数。
这样允许用户选择对比那些被折叠的参数维度。

## UI page: 开发者性能比较大表


UI输入1：

	与上一页相同，存入`y_param`。

UI输入2:

可折叠的param及其values checkbox:

	param1.name: [] hide [x] ALL []param1.value1 []param1.value2
	param2.name: [] hide [x] ALL []param1.value1 []param1.value2 ...

UI输出1：

	遍历tjobs，输出一个大表 以2个y_param.values为例，各列数据如下

	col 1: y_param.values[0]
	col 2: stddev%

	col 3: change% compared to col 1
	col 4: y_param.values[1]
	col 5: stddev%

	(如果有更多y_param.values，则重复3-5)

	col 6: kpi
	col 7: params
	col 8: jobs url
	
样例： `y_param.name=osv y_param.values=['openeuler@20.03', 'openeuler@22.03']`

| openeuler@20.03 | %stddev | %change | openeuler@22.03 | %stddev | kpi                       | params                                                     | jobs   |
| --------------: | ------: | ------: | --------------: | ------: | ------------------------- | ---------------------------------------------------------- | ------ |
|            3974 |         |  -21.2% |            3131 |      4% | `blogbench.write_score`   |                                                            | urls   |
|         1608428 |      2% |   +9.7% |         1764811 |      6% | `blogbench.read_score`    |                                                            | urls   |
|         1608428 |      2% |   +9.7% |         1764811 |      6% | `netperf.Throughput_Mbps` | `test=TCP_STREAM,send_size=4096,nr_threads=1,runtime=300s` | urls   |

本页的典型用法，是开发者比较优化前后的两组数据，对%change倒排序，察看性能劣化最严重的case，点击urls察看测试job详情，进行问题排查。

## UI suite tab: p1

显示tjobs[suite]为一个表格

UI输入1:

可选展开的pp param及其values checkbox:

	param1.name: [x] hide [] ALL []param1.value1 []param1.value2
	param2.name: [x] hide [] ALL []param1.value1 []param1.value2 ...

UI输出1:
common params: hw/os/pp中有参数对所有jobs取值完全一样的，在此处显示其key=val

UI输出2:
table columns:
- 序号
- jobModel.fields里的每一项
- kpis
- 详情按扭

p1与p2的差别，在于
- p1默认展开hw/os/批次参数，不展开test/testcase以外的pp参数；
- p2展开所有pp参数。

## UI suite tab: p2

数据来源：p1中的一行
遍历suiteTables[suite]，从tjobs[suite]找到值来填充一个个表格，忽略其中的`x_param`，逐个显示table

UI输出1:
common params: hw/os/pp中有参数对所有jobs取值完全一样的，在此处显示其key=val

UI输出2:
table columns:
- 序号
- 每一个hw/os/pp参数
- kpi
