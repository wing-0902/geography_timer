export const ACTIONS = [
  'start',
  'work',
  'study',
  'talk',
  'chat',
  'finish',
  'late',
  'test',
  'break',
  'table',
  '自慢話',
  '謝罪',
  '下ネタ',
  '演習',
  '調査',
  '悪口',
  '無言',
  '退室',
  'other'
] as const;

export type Action = (typeof ACTIONS)[number];

export function getValueToName(value: Action) {
  if (value === 'start') return '開始';
  else if (value === 'work') return '作業';
  else if (value === 'study') return '授業';
  else if (value === 'talk') return '雑談';
  else if (value === 'chat') return 'お喋り';
  else if (value === 'finish') return '終了';
  else if (value === 'late') return '遅刻';
  else if (value === 'test') return 'テスト';
  else if (value === 'break') return '休憩';
  else if (value === 'table') return '机間巡視';
  else if (value === '自慢話') return '自慢話';
  else if (value === '謝罪') return '謝罪';
  else if (value === '下ネタ') return '下ネタ';
  else if (value === '演習') return '演習';
  else if (value === '調査') return '調査';
  else if (value === 'other') return 'その他';
  else return value;
}

export function getColor(value: Action) {
  if (value === 'start') return '#d1d1d1';
  else if (value === 'work') return '#5cd179';
  else if (value === 'study') return '#4595ff';
  else if (value === 'talk') return '#5b4af0';
  else if (value === 'chat') return '#d44af0';
  else if (value === 'finish') return '#000000';
  else if (value === 'late') return '#ff0000';
  else if (value === 'test') return '#fffb00';
  else if (value === 'break') return '#b3ff00';
  else if (value === 'table') return '#da33a2';
  else if (value === '自慢話') return '#ff9100';
  else if (value === 'other') return '#777777';
  else if (value === '謝罪') return '#b8bf35';
  else if (value === '下ネタ') return '#ff618b';
  else if (value === '演習') return '#00bbff';
  else if (value === '調査') return '#35bf7c';
  else return '#777777';
}
