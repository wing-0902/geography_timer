import localforage from 'localforage';
import type { Action } from './getValueToName';

export type Activity = {
  time: number;
  action: Action;
};

class HistoryStore {
  items = $state<Activity[]>([]);

  // Action型の文字列だけ取得
  actionStr = $derived(this.items.map(item => item.action));

  // 読み込み状態
  isLoaded = $state(false);

  constructor() {
    // サーバーサイドレンダリング(SSR)対策
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  private async init() {
    await this.load();
    this.isLoaded = true;
  }

  // 2. getter を経由してリアクティブに取得
  get allItems() {
    return this.items;
  }

  public exportAll(filename: string = 'export.json') {
    const exportData = this.items;

    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log('書き出し完了');
  }

  public async importFromJson(): Promise<void> {
    try {
      const file = await this.pickFile();

      const text = await file.text();

      const parsedData = JSON.parse(text);
      this.items = parsedData;

      console.log('読み込み完了');
    } catch (error) {
      console.error('インポートに失敗しました:', error);
    }
  }

  private pickFile(): Promise<File> {
    return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';

      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) resolve(file);
        else reject(new Error('ファイルが選択されませんでした'));
      };

      input.click();
    });
  }

  async add(action: Action) {
    const newItem: Activity = {
      time: Date.now(),
      action
    };

    // 配列の再代入（確実なリアクティビティのため）
    this.items = [...this.items, newItem];
    await this.save();
  }

  async clear() {
    this.items = [];
    await localforage.removeItem('user-history');
  }

  private async save() {
    // $state.snapshot で Proxy を剥がして保存するのは正解です！
    const rawData = $state.snapshot(this.items);
    await localforage.setItem('user-history', rawData);
  }

  private async load() {
    try {
      const saved = await localforage.getItem<Activity[]>('user-history');
      if (saved) {
        // ここでも再代入
        this.items = saved;
      }
    } catch (e) {
      console.error('Failed to load history:', e);
    }
  }

  get lastAction() {
    return this.items.at(-1) ?? null;
  }

  get lastActionStr() {
    return this.actionStr.at(-1) ?? null;
  }
}

export const historyStore = new HistoryStore();
