// action: 'start' | 'work' | 'study' | 'chat' | 'finish' | 'other';

export type Action = 'start' | 'work' | 'study' | 'talk' | 'chat' | 'finish' | 'late' | 'other';

export function getValueToName(value: Action) {
  if (value === 'start') return '開始';
  else if (value === 'work') return '作業';
  else if (value === 'study') return '授業';
  else if (value === 'talk') return '雑談';
  else if (value === 'chat') return 'お喋り';
  else if (value === 'finish') return '終了';
  else if (value === 'late') return '遅刻';
  else if (value === 'other') return 'その他';
  else return '不明';
}
