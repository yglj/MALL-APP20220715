
var Mock = require('mockjs')
var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }],
    'key|1-10': '★'
})
// 输出结果
console.log(JSON.stringify(data, null, 4))
/*
数据模板定义规范（Data Template Definition，DTD）
数据占位符定义规范（Data Placeholder Definition，DPD）

模板语法：
'name|rule': value

占位符语法：
@占位符
@占位符(参数 [, 参数])
*/
