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
