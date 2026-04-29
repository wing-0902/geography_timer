export const ACTIONS = [
  'start',
  'work',
  'study',
  'talk',
  'chat',
  'finish',
  'late',
  'test',
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
  else if (value === 'other') return 'その他';
  else return '不明';
}
