// 自主实践：消费记账小工具
// 流程：prompt 输入（项目:金额）→ 清洗非法值 → Console 输出记账报告

// 输入：弹窗采集"项目:金额"串，解析为对象数组 [{name, amount}]
const askExpenses = () => {
  const raw = prompt('请输入今日消费，格式 项目:金额，用逗号分隔（如 午饭:15,奶茶:12）', '午饭:15,奶茶:12,文具:8,电影:45,话费:-20');
  if (raw === null) return [];               // 用户取消：返回空数组，程序不崩溃
  return raw.split(',')
    .map(item => item.trim())
    .filter(item => item !== '')
    .map(item => {
      const [name, value] = item.split(':');
      return { name: (name || '').trim(), amount: Number(value) };
    });
};

// 清洗：只保留项目非空且金额大于 0 的记录（负数与乱码剔除）
const cleanExpenses = (list) =>
  list.filter(e => e.name !== '' && !Number.isNaN(e.amount) && e.amount > 0);

// 总支出：reduce 累加（空数组保护，避免 NaN）
const total = (list) => {
  const sum = list.reduce((acc, e) => acc + e.amount, 0);
  return list.length === 0 ? 0 : sum.toFixed(2);
};

// 最大单笔：reduce 找出金额最高的记录
const biggest = (list) => list.reduce((max, e) => (e.amount > max.amount ? e : max), list[0]);

// 报告：拼出总支出、平均、最大单笔与明细
const buildReport = (list) => {
  const lines = list.map(e => `${e.name} ${e.amount}元`).join('、');
  return `共${list.length}笔有效消费，合计${total(list)}元，平均每笔${(total(list) / list.length).toFixed(2)}元\n最大单笔：${biggest(list).name} ${biggest(list).amount}元\n明细：${lines}`;
};

// 主流程：输入 → 清洗 → 输出（非法值只剔除并提示，不中断程序）
const rawList = askExpenses();
const validList = cleanExpenses(rawList);
console.log('原始输入：', rawList);
console.log('有效记录：', validList);
console.log(validList.length ? buildReport(validList) : '没有有效消费记录，请检查输入（需为 项目:金额，金额大于0）');
