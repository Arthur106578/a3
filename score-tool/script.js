// 自主实践：成绩统计小工具
// 流程：prompt 输入（科目:分数）→ 清洗非法值 → Console 输出统计报告

// 输入：弹窗采集"科目:分数"串，解析为对象数组 [{name, score}]
const askScores = () => {
  const raw = prompt('请输入各科成绩，格式 科目:分数，用逗号分隔（如 语文:92,数学:45）', '语文:92,数学:45,英语:77,体育:59,音乐:105');
  if (raw === null) return [];               // 用户取消：返回空数组，程序不崩溃
  return raw.split(',')
    .map(item => item.trim())
    .filter(item => item !== '')
    .map(item => {
      const [name, value] = item.split(':');
      return { name: (name || '').trim(), score: Number(value) };
    });
};

// 清洗：只保留科目非空且分数在 0~100 之间的记录
const cleanScores = (list) =>
  list.filter(s => s.name !== '' && !Number.isNaN(s.score) && s.score >= 0 && s.score <= 100);

// 平均分：reduce 求和后取平均（空数组保护，避免 NaN）
const average = (list) => {
  if (list.length === 0) return '0.00';
  const total = list.reduce((sum, s) => sum + s.score, 0);
  return (total / list.length).toFixed(2);
};

// 等级判定：单值进单值出
const toGrade = (score) => {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
};

// 报告：统计等级分布与最高分，拼出结果文本
const buildReport = (list) => {
  const dist = { A: 0, B: 0, C: 0, D: 0, F: 0 };
  list.forEach(s => { dist[toGrade(s.score)]++; });
  const best = list.reduce((max, s) => (s.score > max.score ? s : max), list[0]);
  return `共${list.length}科有效，平均${average(list)}分，最高${best.score}分（${best.name}）\n等级分布：A${dist.A} B${dist.B} C${dist.C} D${dist.D} F${dist.F}`;
};

// 主流程：输入 → 清洗 → 输出（非法值只剔除并提示，不中断程序）
const rawList = askScores();
const validList = cleanScores(rawList);
console.log('原始输入：', rawList);
console.log('有效成绩：', validList);
console.log(validList.length ? buildReport(validList) : '没有有效成绩，请检查输入（需为 科目:分数，分数0~100）');
