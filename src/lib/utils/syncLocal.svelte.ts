import localforage from 'localforage';
import type { Action } from './getValueToName';

export type Activity = {
  time: number;
  action: Action;
};

class HistoryStore {
  // 1. # を使わず、明示的に $state を割り当てる
  items = $state<Activity[]>([]);
  // 読み込み完了状態を管理すると、UI側で「ロード中」を表示できて便利です
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
}

export const historyStore = new HistoryStore();
