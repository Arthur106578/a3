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
