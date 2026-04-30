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
  else if (value === 'other') return 'その他';
  else return '不明';
};

export function getColor(value: Action) {
  if (value === 'start') return '';
  else if (value === 'work') return '';
  else if (value === 'study') return '';
  else if (value === 'talk') return '';
  else if (value === 'chat') return '';
  else if (value === 'finish') return '';
  else if (value === 'late') return '';
  else if (value === 'test') return '';
  else if (value === 'break') return '';
  else if (value === 'table') return '';
  else if (value === '自慢話') return '';
  else if (value === 'other') return '';
  else return 'gray';

};
