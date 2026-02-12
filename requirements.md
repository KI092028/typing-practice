# 機能要件定義書

**プロジェクト**: タイピングの森 改修プロジェクト
**作成日**: 2026年2月12日
**バージョン**: 1.0
**対象**: 小学生向けタイピング練習サイト

---

## 目次

1. [概要](#概要)
2. [システム全体要件](#システム全体要件)
3. [P1機能（最優先）](#p1機能最優先)
4. [P2機能（高優先）](#p2機能高優先)
5. [P3機能（中優先）](#p3機能中優先)
6. [非機能要件](#非機能要件)
7. [データ設計](#データ設計)
8. [技術仕様](#技術仕様)

---

## 概要

### 目的

現状の「タイピングの森」を2026年の競合水準に引き上げ、小学生が楽しく継続的に学習できるサイトに改修する。

### 改修の方向性

1. **UI/UXの現代化**: ライト/ダークモード、アクセシビリティ強化
2. **エンゲージメント向上**: バッジ拡充、レベルシステム、デイリーチャレンジ
3. **学習効果の可視化**: 統計ダッシュボード、進捗グラフ
4. **保護者・教師サポート**: 進捗管理、エクスポート機能

### 実装フェーズ

- **フェーズ1（1-2週間）**: P1機能（クイックウィン）
- **フェーズ2（3-4週間）**: P2機能（機能拡張）
- **フェーズ3（5-8週間）**: P3機能（高度な機能）

---

## システム全体要件

### 現状の機能（維持）

#### 学習コース

1. **ひらがな**: 母音〜拗音・促音・長音（15レベル）
2. **アルファベット**: ホームポジション、A-Z（2レベル）
3. **ローマ字**: 単語、文章（2レベル）

#### 学年別プリセット

- 小1〜小6の推奨設定（コース・レベル・問題数）

#### 学習機能

- 重み付けロジック（苦手な文字を優先出題）
- 複数入力許容（shi/si、tsu/tu等）
- リアルタイムヒント表示
- 音声フィードバック（Web Audio API）

#### データ管理

- LocalStorageでの統計保存
- バッジシステム（7種類）
- 最近の成績（最大20件）
- 日別練習回数

### 削除・非推奨機能

なし（現状機能はすべて維持）

---

## P1機能（最優先）

### 1. ライト/ダークモード切り替え

**優先度**: P1（最優先）
**実装工数**: 小（1-2日）
**ユーザー価値**: 高

#### 機能概要

ユーザーが好みに応じてライトモード・ダークモードを切り替えられる機能。2026年の標準機能として必須。

#### 詳細仕様

##### UIコンポーネント

**配置場所**: ヘッダー右上（バッジボタンの隣）

**デザイン**:
```html
<button id="themeToggle" class="btn-chip" aria-label="テーマ切り替え">
  <span class="theme-icon">🌙</span>
  <span class="theme-label">ダーク</span>
</button>
```

**状態**:
- ライトモード時: アイコン=☀️、ラベル=「ライト」
- ダークモード時: アイコン=🌙、ラベル=「ダーク」

##### 動作フロー

1. ユーザーがトグルボタンをクリック
2. `<body>`に`.dark-mode`クラスを付与/削除
3. CSS変数が自動的に切り替わる
4. LocalStorageに設定を保存（キー: `typingPractice:theme`）
5. アイコン・ラベルが更新される

##### 初期状態の決定

優先順位:
1. LocalStorage の保存値
2. システム設定（`prefers-color-scheme`）
3. デフォルト: ダークモード（現状維持）

```javascript
function getInitialTheme() {
  // 1. LocalStorage
  const saved = localStorage.getItem('typingPractice:theme');
  if (saved === 'light' || saved === 'dark') return saved;

  // 2. システム設定
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }

  // 3. デフォルト
  return 'dark';
}
```

##### CSS実装

design-system.md のカラーシステムに従う。

```css
:root {
  /* ライトモード変数 */
  --color-bg-primary: #FFFFFF;
  --color-text-primary: #212121;
  /* ... 他の変数 ... */
}

body.dark-mode {
  /* ダークモード変数 */
  --color-bg-primary: #121212;
  --color-text-primary: #FFFFFF;
  /* ... 他の変数 ... */
}

/* システム設定に追従（クラスがない場合） */
@media (prefers-color-scheme: light) {
  :root:not(.dark-mode) {
    /* ライトモード変数 */
  }
}
```

##### アクセシビリティ

- `aria-label`: 「テーマ切り替え」
- キーボード操作: Enter/Spaceで切り替え
- フォーカス表示: 明確なアウトライン

##### テスト項目

- [ ] トグルボタンでモードが切り替わる
- [ ] LocalStorageに保存される
- [ ] ページリロード後も設定が維持される
- [ ] システム設定（prefers-color-scheme）が反映される
- [ ] すべてのページで一貫した表示
- [ ] コントラスト比が両モードで4.5:1以上

---

### 2. バッジシステム拡充（7→20種類）

**優先度**: P1（最優先）
**実装工数**: 小〜中（2-3日）
**ユーザー価値**: 高

#### 機能概要

バッジを7種類から20種類に増やし、コレクション性と達成動機を向上。

#### 現状のバッジ（7種類）

1. はじめての一歩（初回練習）
2. せいかく名人（95%以上）
3. 3れんしょう（95%以上を3回連続）
4. まいにち（2日連続）
5. 母音マスター（母音95%以上）
6. 拗音クリア（拗音95%以上）
7. ローマ字たんけん（ローマ字完了）

#### 追加バッジ（13種類）

##### 速度系（4種類）

| ID | 名前 | 条件 | 説明 |
|----|------|------|------|
| `wpm_20` | スピード入門 | WPM 20達成 | タイピングが はやく なってきた！ |
| `wpm_30` | スピードスター | WPM 30達成 | かなり はやく うてるように なった！ |
| `wpm_40` | 光速タイパー | WPM 40達成 | すごい スピード！ |
| `wpm_50` | 神速の指 | WPM 50達成 | もう プロ レベル！ |

##### 精度系（3種類）

| ID | 名前 | 条件 | 説明 |
|----|------|------|------|
| `perfect` | パーフェクト | 100%達成 | ミスなし！ かんぺき！ |
| `acc95_5` | 精密機械 | 95%以上を5回 | いつも せいかく に うてる！ |
| `acc98_3` | 正確王 | 98%以上を3回 | ほぼ かんぺき！ |

##### 継続系（3種類）

| ID | 名前 | 条件 | 説明 |
|----|------|------|------|
| `days7` | 週間チャンピオン | 7日連続 | 1しゅうかん つづけた！ |
| `days30` | 月間マスター | 30日連続 | 1か月 つづけた！ すごい！ |
| `sessions50` | 練習の鬼 | 合計50回練習 | たくさん れんしゅう した！ |

##### レベル別達成系（3種類）

| ID | 名前 | 条件 | 説明 |
|----|------|------|------|
| `all_kana` | ひらがな博士 | すべてのひらがなレベルで95%以上 | ひらがな マスター！ |
| `all_alpha` | アルファベット名人 | すべてのアルファベットレベルで95%以上 | アルファベット マスター！ |
| `all_romaji` | ローマ字マスター | すべてのローマ字レベルで95%以上 | ローマ字 マスター！ |

#### データ構造

```javascript
const BADGES = [
  // 既存7種類 + 追加13種類
  {
    id: 'wpm_20',
    name: 'スピード入門',
    desc: 'タイピングが はやく なってきた！',
    category: 'speed', // speed, accuracy, streak, achievement
    icon: '⚡',
    checkCondition: (stats, session) => session.wpm >= 20,
  },
  // ... 他のバッジ ...
];
```

#### バッジ獲得判定タイミング

1. **セッション終了時**: 速度、精度、レベル別達成
2. **統計更新時**: 継続系、合計回数系

#### UI表示

##### バッジダイアログ

- 2列グリッド（モバイルは1列）
- 未獲得バッジは半透明+グレースケール
- 獲得済みバッジはカラー+アイコン表示

##### バッジ獲得通知

- トースト通知で表示（2秒間）
- 「バッジGET！ ○○」
- 複数同時獲得時は最初の1つのみ表示

##### ヘッダー表示

```html
<button id="badgesBtn" class="btn-chip">
  🏅 バッジ <span id="badgeCount">5</span>/<span id="badgeTotal">20</span>
</button>
```

#### アクセシビリティ

- バッジカードに`role="article"`
- 獲得状態を`aria-label`で説明
- キーボードでダイアログ内をナビゲーション可能

#### テスト項目

- [ ] 全20種類のバッジが定義されている
- [ ] 各バッジの獲得条件が正しく判定される
- [ ] バッジダイアログに全バッジが表示される
- [ ] 未獲得バッジが視覚的に区別できる
- [ ] バッジ獲得時にトースト通知が表示される
- [ ] LocalStorageに保存される
- [ ] ページリロード後も獲得状態が維持される

---

### 3. アニメーション強化

**優先度**: P1（最優先）
**実装工数**: 中（3-4日）
**ユーザー価値**: 中〜高

#### 機能概要

正解/不正解時の視覚的フィードバック、バッジ獲得演出などを追加し、達成感と楽しさを増幅。

#### 実装するアニメーション

##### 1. 正解時（成功フィードバック）

**アニメーション**: パルス + 緑の光

```css
@keyframes successPulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 20px 10px rgba(76, 175, 80, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
  }
}

.prompt.success {
  animation: successPulse 0.4s ease-out;
}
```

**トリガー**: 正解判定時に`.success`クラスを一時的に付与

##### 2. 不正解時（エラーフィードバック）

**アニメーション**: 横振動（shake）

```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
  20%, 40%, 60%, 80% { transform: translateX(6px); }
}

.prompt.error {
  animation: shake 0.4s ease-in-out;
}
```

**トリガー**: 不正解判定時に`.error`クラスを一時的に付与

##### 3. バッジ獲得演出

**アニメーション**: 回転しながら拡大出現

```css
@keyframes badgeAppear {
  0% {
    transform: scale(0) rotate(-180deg);
    opacity: 0;
  }
  70% {
    transform: scale(1.2) rotate(10deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

.badge-card.new {
  animation: badgeAppear 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

**トリガー**: バッジ獲得時、ダイアログ表示時に`.new`クラスを付与

##### 4. レベル完了セレブレーション

**アニメーション**: 紙吹雪エフェクト

**実装方法**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) ライブラリ使用（6KB）

```javascript
// セッション終了時、高得点（95%以上）でトリガー
if (acc >= 95) {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}
```

**CDN読み込み**:
```html
<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js"></script>
```

##### 5. プログレスバーのスムーズアニメーション

**実装**:
```css
.progress-bar-fill {
  width: 0%;
  transition: width 0.5s ease-out;
}
```

**トリガー**: JavaScript で width を更新

```javascript
progressFill.style.width = `${percentage}%`;
```

##### 6. ページ遷移（フェードイン）

**アニメーション**: 下から浮き上がり

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-enter {
  animation: fadeInUp 0.5s ease-out;
}
```

**トリガー**: カード表示時に`.page-enter`クラスを付与

#### パフォーマンス考慮

1. **GPU加速**: `transform`と`opacity`のみアニメート
2. **will-change**: アニメーション開始時に設定、終了後に削除
3. **60fps維持**: アニメーション時間を最適化（150-500ms）

```javascript
element.style.willChange = 'transform, opacity';
// アニメーション実行
setTimeout(() => {
  element.style.willChange = 'auto';
}, 500);
```

#### アクセシビリティ

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

#### テスト項目

- [ ] 正解時にパルスアニメーションが表示される
- [ ] 不正解時に振動アニメーションが表示される
- [ ] バッジ獲得時に回転演出が表示される
- [ ] 高得点時に紙吹雪が表示される
- [ ] プログレスバーがスムーズに伸びる
- [ ] ページ遷移がスムーズ
- [ ] prefers-reduced-motion で無効化される
- [ ] 60fps を維持（DevTools Performance パネルで確認）

---

### 4. 色覚異常対応強化

**優先度**: P1（最優先）
**実装工数**: 小（1日）
**ユーザー価値**: 高（アクセシビリティ）

#### 機能概要

色だけでなく、形状・テキストを併用して情報を伝達。色覚異常（Protanopia、Deuteranopia）のユーザーも快適に利用可能に。

#### 現状の課題

- 正解/不正解が色のみで判別
- 赤緑の組み合わせ（色覚異常で区別困難）

#### 改善策

##### 1. 正解表示

**変更前**: 緑色のみ
**変更後**: 緑色 + ○アイコン + 「せいかい！」テキスト

```html
<div class="feedback success">
  <span class="icon">✓</span>
  <span class="text">せいかい！</span>
</div>
```

```css
.feedback.success {
  color: var(--color-success);
  background: var(--success-50);
  border: 2px solid var(--color-success);
}

.feedback.success .icon::before {
  content: '✓';
  font-size: 24px;
}
```

##### 2. 不正解表示

**変更前**: 赤色のみ
**変更後**: 赤色 + ×アイコン + 「まちがい」テキスト

```html
<div class="feedback error">
  <span class="icon">✗</span>
  <span class="text">まちがい</span>
</div>
```

```css
.feedback.error {
  color: var(--color-error);
  background: var(--error-50);
  border: 2px solid var(--color-error);
}

.feedback.error .icon::before {
  content: '✗';
  font-size: 24px;
}
```

##### 3. プログレスバー

**変更前**: 色のみ
**変更後**: パーセンテージテキストを併記

```html
<div class="progress-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar-fill" style="width: 75%">
    <span class="progress-text">75%</span>
  </div>
</div>
```

##### 4. カラーパレットの見直し

design-system.md の「色覚異常対応パレット」を使用。

**安全な色の組み合わせ**:
- 青 (#0173B2) × オレンジ (#DE8F05)
- 避けるべき: 赤 × 緑

#### テスト方法

1. **Chrome DevTools**: Rendering > Emulate vision deficiencies
   - Protanopia（1型色覚）
   - Deuteranopia（2型色覚）
   - Tritanopia（3型色覚）
2. **スクリーンショット**: 各モードでキャプチャして視覚的に確認

#### テスト項目

- [ ] 正解に ✓ アイコンが表示される
- [ ] 不正解に ✗ アイコンが表示される
- [ ] プログレスバーにパーセンテージが表示される
- [ ] Protanopia で正解/不正解が判別できる
- [ ] Deuteranopia で正解/不正解が判別できる
- [ ] すべての重要情報が色+形状+テキストで伝わる

---

## P2機能（高優先）

### 1. 統計ダッシュボード

**優先度**: P2（高優先）
**実装工数**: 中〜大（5-7日）
**ユーザー価値**: 非常に高

#### 機能概要

学習効果を可視化するダッシュボード。WPM・正確率の推移グラフ、苦手な文字の分析など。

#### 表示項目

##### 1. 全体統計（カード表示）

- 総練習回数
- 総学習時間（分）
- 平均WPM
- 平均正確率
- 連続日数（現在）
- 最高連続日数

##### 2. WPM推移グラフ（折れ線グラフ）

**X軸**: 日付（最近20セッション）
**Y軸**: WPM
**ライブラリ**: [Chart.js](https://www.chartjs.org/)（軽量、13KB gzip）

```javascript
const ctx = document.getElementById('wpmChart').getContext('2d');
new Chart(ctx, {
  type: 'line',
  data: {
    labels: stats.recent.map(r => new Date(r.at).toLocaleDateString('ja-JP')),
    datasets: [{
      label: 'WPM',
      data: stats.recent.map(r => r.wpm),
      borderColor: '#2196F3',
      backgroundColor: 'rgba(33, 150, 243, 0.1)',
      tension: 0.4,
      fill: true,
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: (context) => {
            const date = new Date(stats.recent[context[0].dataIndex].at);
            return date.toLocaleDateString('ja-JP', { month: 'short', day: 'numeric' });
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'WPM' }
      }
    }
  }
});
```

##### 3. 正確率推移グラフ（折れ線グラフ）

WPMグラフと同様の形式。

##### 4. 苦手な文字ヒートマップ

**表示形式**: テーブル形式

| 文字 | ミス回数 | 出現回数 | ミス率 |
|------|----------|----------|--------|
| し   | 12       | 45       | 26.7%  |
| つ   | 8        | 32       | 25.0%  |
| ...  | ...      | ...      | ...    |

**ソート**: ミス率降順

**データソース**: `stats.missMap`

```javascript
// missMapの構造: { 'kana:し': 12, 'kana:つ': 8, ... }
const weakChars = Object.entries(stats.missMap)
  .map(([key, missCount]) => {
    const [mode, char] = key.split(':');
    // 出現回数は別途計算（セッションデータから集計）
    const totalCount = calculateTotalCount(char);
    const missRate = (missCount / totalCount) * 100;
    return { char, missCount, totalCount, missRate };
  })
  .sort((a, b) => b.missRate - a.missRate)
  .slice(0, 10); // 上位10件
```

##### 5. 学習時間カレンダー

**表示形式**: GitHub風ヒートマップ（将来実装、P3で検討）

**簡易版（P2）**: 日別練習回数の棒グラフ

```javascript
const dailyData = Object.entries(stats.daily)
  .sort((a, b) => a[0].localeCompare(b[0]))
  .slice(-30); // 最近30日

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: dailyData.map(d => d[0]),
    datasets: [{
      label: 'れんしゅう回数',
      data: dailyData.map(d => d[1]),
      backgroundColor: '#4CAF50',
    }]
  }
});
```

#### UI配置

**新規ページ**: 統計ページ（ヘッダーにリンク追加）

```html
<nav>
  <a href="#stats">とうけい</a>
</nav>
```

**レイアウト**:
```
+-----------------------------------+
| [全体統計カード×4]                 |
+-----------------------------------+
| [WPM推移グラフ]                    |
+-----------------------------------+
| [正確率推移グラフ]                 |
+-----------------------------------+
| [苦手な文字テーブル]               |
+-----------------------------------+
| [日別練習回数グラフ]               |
+-----------------------------------+
```

#### データ更新

- リアルタイム: セッション終了時に統計を再集計
- グラフ: DOMが表示されたタイミングで描画

#### アクセシビリティ

- グラフに`role="img"`と`aria-label`（グラフの要約説明）
- テーブルに適切な`<th>`と`scope`属性
- カラーだけでなく数値も併記

#### テスト項目

- [ ] 統計ページが表示される
- [ ] 全体統計カードに正しい値が表示される
- [ ] WPM推移グラフが描画される
- [ ] 正確率推移グラフが描画される
- [ ] 苦手な文字テーブルが表示される
- [ ] 日別練習回数グラフが表示される
- [ ] セッション終了後、統計が更新される
- [ ] グラフがレスポンシブ対応

---

### 2. レベル・経験値（XP）システム

**優先度**: P2（高優先）
**実装工数**: 中（4-5日）
**ユーザー価値**: 高

#### 機能概要

総合レベル（1〜50）と経験値システムを導入。練習するほどレベルが上がり、達成感とモチベーションを向上。

#### レベル設計

##### レベル範囲

- **最低レベル**: 1
- **最高レベル**: 50

##### 必要XP計算式

```javascript
function getRequiredXP(level) {
  return Math.floor(level * level * 100);
}

// 例:
// レベル1→2: 100 XP
// レベル10→11: 10,000 XP
// レベル20→21: 40,000 XP
// レベル50→MAX: レベル50で終了
```

##### XP獲得源

| 行動 | 獲得XP | 条件 |
|------|--------|------|
| 正解1問 | 10 XP | 基本報酬 |
| 連続正解 | +5 XP | 連続5問ごと |
| 高精度ボーナス | +50 XP | 正確率95%以上 |
| スピードボーナス | +30 XP | WPM 30以上 |
| パーフェクトボーナス | +100 XP | 正確率100% |
| デイリーチャレンジ | +200 XP | チャレンジ達成時（P2で実装） |

```javascript
function calculateXP(session) {
  let xp = 0;

  // 基本報酬
  xp += session.correct * 10;

  // 連続正解ボーナス（仮定: 全問正解なら連続）
  const comboCount = Math.floor(session.correct / 5);
  xp += comboCount * 5;

  // 高精度ボーナス
  if (session.acc >= 95) xp += 50;

  // スピードボーナス
  if (session.wpm >= 30) xp += 30;

  // パーフェクトボーナス
  if (session.acc === 100) xp += 100;

  return xp;
}
```

#### UI表示

##### ヘッダー表示

```html
<div class="level-display">
  <span class="level-icon">⭐</span>
  <span class="level-text">レベル <strong>12</strong></span>
  <div class="xp-bar">
    <div class="xp-fill" style="width: 45%"></div>
  </div>
  <span class="xp-text">4,500 / 10,000 XP</span>
</div>
```

**スタイル**: 小さめ、邪魔にならないデザイン

##### レベルアップ演出

**トリガー**: セッション終了時、XPが必要値を超えた場合

**アニメーション**:
```css
@keyframes levelUp {
  0% {
    transform: translateY(20px) scale(0.8);
    opacity: 0;
  }
  50% {
    transform: translateY(-10px) scale(1.1);
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

.level-up-modal {
  animation: levelUp 0.8s ease-out;
}
```

**モーダル内容**:
```html
<div class="level-up-modal">
  <h2>🎉 レベルアップ！</h2>
  <p class="level-number">レベル <span>13</span></p>
  <p class="message">おめでとう！ つぎも がんばろう！</p>
  <button>OK</button>
</div>
```

**効果音**: 高音のビープ（beep(1200, 200, 'sine', 0.08)）

##### 統計ページでの表示

- 現在レベル・XP
- レベル推移グラフ（折れ線）
- 次のレベルまでの進捗

#### データ構造

```javascript
// stats に追加
stats.level = {
  current: 1,        // 現在レベル
  currentXP: 0,      // 現在レベル内のXP
  totalXP: 0,        // 累積XP
};
```

#### テスト項目

- [ ] ヘッダーにレベル表示される
- [ ] XPバーが正しい割合で表示される
- [ ] セッション終了時にXPが加算される
- [ ] レベルアップ時にモーダルが表示される
- [ ] レベル50で停止する
- [ ] LocalStorageに保存される

---

### 3. デイリーチャレンジ

**優先度**: P2（高優先）
**実装工数**: 中（3-4日）
**ユーザー価値**: 高

#### 機能概要

毎日0時に更新される特別な課題。達成するとボーナスXP（+200XP）と専用バッジを獲得。

#### チャレンジ内容（ランダム選出）

| ID | 名前 | 条件 | ボーナスXP |
|----|------|------|------------|
| `daily_speed` | スピードチャレンジ | WPM 25以上で1回クリア | 200 XP |
| `daily_accuracy` | 精度チャレンジ | 正確率98%以上で1回クリア | 200 XP |
| `daily_combo` | コンボチャレンジ | 10問連続正解 | 200 XP |
| `daily_level` | レベルチャレンジ | 特定レベル（ランダム）をクリア | 200 XP |
| `daily_volume` | ボリュームチャレンジ | 3回練習する | 200 XP |

```javascript
const DAILY_CHALLENGES = [
  {
    id: 'daily_speed',
    name: 'スピードチャレンジ',
    desc: 'WPM 25 いじょうで 1かい クリア',
    check: (session) => session.wpm >= 25,
    xp: 200,
  },
  // ... 他のチャレンジ ...
];

function getDailyChallenge(date) {
  // 日付からシード生成（同じ日なら同じチャレンジ）
  const seed = parseInt(date.replace(/-/g, ''), 10);
  const index = seed % DAILY_CHALLENGES.length;
  return DAILY_CHALLENGES[index];
}
```

#### UI表示

##### ホーム画面（設定カード上部）

```html
<div class="daily-challenge-card">
  <h3>きょうの チャレンジ 🎯</h3>
  <p class="challenge-name">スピードチャレンジ</p>
  <p class="challenge-desc">WPM 25 いじょうで 1かい クリア</p>
  <p class="challenge-reward">+200 XP</p>
  <div class="challenge-progress">
    <span class="status">みたっせい</span>
  </div>
</div>
```

**状態表示**:
- 未達成: 「みたっせい」（グレー）
- 達成済み: 「たっせい！」（緑、チェックマーク）

##### 達成時の演出

**トリガー**: セッション終了時、条件を満たした場合

**モーダル**:
```html
<div class="challenge-complete-modal">
  <h2>🎉 チャレンジ たっせい！</h2>
  <p class="challenge-name">スピードチャレンジ</p>
  <p class="xp-bonus">+200 XP</p>
  <button>OK</button>
</div>
```

**紙吹雪エフェクト**: confetti()

#### データ構造

```javascript
// stats に追加
stats.dailyChallenge = {
  '2026-02-12': {
    id: 'daily_speed',
    completed: true,
    completedAt: 1707703200000,
  },
  // ... 他の日付 ...
};
```

#### 更新タイミング

- 0時（JST）にリセット
- ページロード時、日付が変わっていたら新しいチャレンジを表示

```javascript
function checkDailyChallengeReset() {
  const today = yyyymmdd();
  const lastChallenge = stats.dailyChallenge?.[today];
  if (!lastChallenge) {
    // 新しい日、チャレンジをリセット
    const challenge = getDailyChallenge(today);
    return challenge;
  }
  return lastChallenge;
}
```

#### テスト項目

- [ ] ホーム画面にデイリーチャレンジが表示される
- [ ] チャレンジが日付ごとに変わる
- [ ] 条件達成時にモーダルが表示される
- [ ] ボーナスXPが加算される
- [ ] 達成状態がLocalStorageに保存される
- [ ] 翌日にリセットされる

---

### 4. コンテンツ追加

**優先度**: P2（高優先）
**実装工数**: 中（3-4日）
**ユーザー価値**: 高

#### 機能概要

練習素材を増やし、飽きずに長く続けられるように。小学校教科書頻出語彙、季節テーマ、興味別カテゴリを追加。

#### 追加コンテンツ

##### 1. 小学校教科書頻出語彙（ローマ字コース）

**レベル追加**: `romaji-vocab`

**単語数**: 50語（段階的に追加可能）

**データ例**:
```javascript
const VOCAB_WORDS = [
  // 学習関連
  { en: 'benkyou', ja: 'べんきょう' },
  { en: 'kyoushitsu', ja: 'きょうしつ' },
  { en: 'jugyou', ja: 'じゅぎょう' },

  // 日常生活
  { en: 'asa', ja: 'あさ' },
  { en: 'hiru', ja: 'ひる' },
  { en: 'yoru', ja: 'よる' },
  { en: 'gohan', ja: 'ごはん' },

  // 季節
  { en: 'haru', ja: 'はる' },
  { en: 'natsu', ja: 'なつ' },
  { en: 'aki', ja: 'あき' },
  { en: 'fuyu', ja: 'ふゆ' },

  // 動物
  { en: 'inu', ja: 'いぬ' },
  { en: 'neko', ja: 'ねこ' },
  { en: 'tori', ja: 'とり' },

  // ... 計50語 ...
];
```

##### 2. 季節テーマ（ローマ字コース）

**レベル追加**: `romaji-spring`, `romaji-summer`, `romaji-autumn`, `romaji-winter`

**各季節10語**:
```javascript
const SEASON_WORDS = {
  spring: [
    { en: 'sakura', ja: 'さくら' },
    { en: 'hanami', ja: 'はなみ' },
    { en: 'nyuugaku', ja: 'にゅうがく' },
    // ...
  ],
  summer: [
    { en: 'umi', ja: 'うみ' },
    { en: 'natsuyasumi', ja: 'なつやすみ' },
    { en: 'hanabi', ja: 'はなび' },
    // ...
  ],
  // ... autumn, winter ...
};
```

##### 3. 興味別カテゴリ（ローマ字コース）

**レベル追加**: `romaji-animals`, `romaji-sports`, `romaji-food`

**各カテゴリ10語**:
```javascript
const CATEGORY_WORDS = {
  animals: [
    { en: 'zou', ja: 'ぞう' },
    { en: 'kirin', ja: 'きりん' },
    { en: 'raiion', ja: 'らいおん' },
    // ...
  ],
  sports: [
    { en: 'sakka-', ja: 'サッカー' },
    { en: 'yakyuu', ja: 'やきゅう' },
    { en: 'suiei', ja: 'すいえい' },
    // ...
  ],
  food: [
    { en: 'ringo', ja: 'りんご' },
    { en: 'banana', ja: 'バナナ' },
    { en: 'ocha', ja: 'おちゃ' },
    // ...
  ],
};
```

#### コース選択UIの更新

```html
<select id="level">
  <!-- 既存レベル -->
  <option value="words">たんご（やさしい）</option>
  <option value="sentences">ぶんしょう（かんたん）</option>

  <!-- 新規レベル -->
  <optgroup label="きょうかしょ">
    <option value="vocab">ひんしゅつごい（50語）</option>
  </optgroup>

  <optgroup label="きせつ">
    <option value="spring">はる</option>
    <option value="summer">なつ</option>
    <option value="autumn">あき</option>
    <option value="winter">ふゆ</option>
  </optgroup>

  <optgroup label="テーマ">
    <option value="animals">どうぶつ</option>
    <option value="sports">スポーツ</option>
    <option value="food">たべもの</option>
  </optgroup>
</select>
```

#### テスト項目

- [ ] 新しいレベルが選択できる
- [ ] 各レベルで適切な単語が出題される
- [ ] ローマ字入力が正しく判定される
- [ ] 統計に正しく記録される

---

## P3機能（中優先）

### 1. クラウド同期（オプション）

**優先度**: P3（中優先）
**実装工数**: 大（10-15日）
**ユーザー価値**: 中（特定ユーザーには高）

#### 機能概要

任意でアカウントを作成し、学習データを複数デバイスで同期。学校と自宅で継続利用可能に。

#### 技術スタック

- **Firebase Authentication**: 無料枠で十分（匿名ログインも対応）
- **Firestore**: ユーザーデータ保存（無料枠: 1日50,000読み取り、20,000書き込み）

#### 実装方針

**Phase A（P3前半）**: 匿名ログイン + Firestore同期
**Phase B（将来）**: メール/Google認証、保護者・教師向けダッシュボード

#### データ構造（Firestore）

```javascript
// Collection: users
// Document ID: Firebase UID
{
  createdAt: Timestamp,
  lastSyncAt: Timestamp,
  stats: {
    sessions: 50,
    recent: [...],
    daily: {...},
    missMap: {...},
    badges: {...},
    level: {...},
    dailyChallenge: {...},
  }
}
```

#### 同期タイミング

1. **ログイン時**: サーバーデータを読み込み、LocalStorageとマージ
2. **セッション終了時**: サーバーに書き込み
3. **定期同期**: 5分ごと（バックグラウンド）

#### UIフロー

1. ホーム画面に「データをほぞんする」ボタン
2. クリックで匿名ログイン実行
3. 「ほぞんしました！」トースト表示
4. 以降、自動同期

#### テスト項目

- [ ] 匿名ログインが実行される
- [ ] LocalStorageデータがFirestoreにアップロードされる
- [ ] 別ブラウザ/デバイスでログインすると同じデータが読み込まれる
- [ ] セッション終了時に自動同期される
- [ ] オフライン時はLocalStorageのみ使用

---

### 2. アバター/カスタマイズ

**優先度**: P3（中優先）
**実装工数**: 中（5-7日）
**ユーザー価値**: 中〜高

#### 機能概要

動物アバター10種類とテーマカラー8色を選択可能。バッジ/レベルでアンロック。

#### アバター一覧

| ID | 名前 | アンロック条件 |
|----|------|----------------|
| `rabbit` | うさぎ | 初期解放 |
| `bear` | くま | レベル5 |
| `cat` | ねこ | レベル10 |
| `dog` | いぬ | レベル15 |
| `elephant` | ぞう | レベル20 |
| `giraffe` | きりん | レベル25 |
| `penguin` | ぺんぎん | レベル30 |
| `lion` | らいおん | レベル35 |
| `panda` | ぱんだ | レベル40 |
| `tiger` | とら | レベル50（最高レベル） |

#### テーマカラー一覧

| ID | 名前 | 色 | アンロック条件 |
|----|------|----|----------------|
| `blue` | あお | #2196F3 | 初期解放 |
| `green` | みどり | #4CAF50 | レベル3 |
| `orange` | オレンジ | #FF9800 | レベル6 |
| `purple` | むらさき | #9C27B0 | レベル9 |
| `pink` | ピンク | #E91E63 | レベル12 |
| `red` | あか | #F44336 | レベル15 |
| `teal` | ティール | #009688 | レベル18 |
| `indigo` | インディゴ | #3F51B5 | レベル21 |

#### UI実装

##### 設定画面（新規）

```html
<section class="settings-page">
  <h2>せってい</h2>

  <div class="setting-group">
    <h3>アバター</h3>
    <div class="avatar-grid">
      <div class="avatar-option" data-id="rabbit">
        <span class="avatar-icon">🐰</span>
        <span class="avatar-name">うさぎ</span>
      </div>
      <!-- ... 他のアバター ... -->
      <div class="avatar-option locked" data-id="lion">
        <span class="avatar-icon">🦁</span>
        <span class="avatar-name">らいおん</span>
        <span class="unlock-hint">レベル50でかいじょ</span>
      </div>
    </div>
  </div>

  <div class="setting-group">
    <h3>テーマカラー</h3>
    <div class="color-grid">
      <div class="color-option" data-id="blue" style="background: #2196F3"></div>
      <!-- ... 他の色 ... -->
    </div>
  </div>
</section>
```

##### アバター表示（ヘッダー）

```html
<div class="user-avatar">
  <span class="avatar-icon">🐰</span>
</div>
```

#### データ構造

```javascript
// stats に追加
stats.customization = {
  avatar: 'rabbit',
  themeColor: 'blue',
};
```

#### テスト項目

- [ ] 設定画面が表示される
- [ ] アバター/カラーが選択できる
- [ ] 選択が保存される
- [ ] ヘッダーにアバターが表示される
- [ ] 未解放アイテムがロック表示される
- [ ] レベルアップで新アイテムがアンロックされる

---

### 3. 音声ガイダンス

**優先度**: P3（中優先）
**実装工数**: 中（3-5日）
**ユーザー価値**: 中（低学年・読字障害対応）

#### 機能概要

Web Speech APIを使用し、問題文・ヒントを音声で読み上げ。小学校低学年や読字障害のある子供をサポート。

#### 実装方針

```javascript
const synth = window.speechSynthesis;

function speak(text, options = {}) {
  if (!synth) return;

  // 既存の読み上げを停止
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';
  utterance.rate = options.rate || 0.9; // ゆっくり
  utterance.pitch = options.pitch || 1.0;
  utterance.volume = options.volume || 1.0;

  synth.speak(utterance);
}
```

#### 読み上げタイミング

1. **問題表示時**: 「あ を うってね」
2. **正解時**: 「せいかい！」
3. **不正解時**: 「まちがい。ただしくは し です」
4. **ヒント表示時**: 「ヒント: shi または si」

#### UI実装

**設定トグル**:
```html
<label class="switch">
  <input id="voiceToggle" type="checkbox" />
  <span>おんせいガイド</span>
</label>
```

**保存場所**: `settings.voice`（LocalStorage）

#### アクセシビリティ

- `aria-live="polite"`: 読み上げ対象の要素に設定
- ユーザーが無効化できる

#### ブラウザ対応

- Chrome/Edge: 対応
- Safari: 対応（iOS Safari も対応）
- Firefox: 対応

#### テスト項目

- [ ] 音声ガイドトグルが表示される
- [ ] 有効時に問題文が読み上げられる
- [ ] 正解/不正解時に音声フィードバック
- [ ] 無効時は読み上げられない
- [ ] 設定がLocalStorageに保存される

---

## 非機能要件

### パフォーマンス要件

#### キー入力遅延

**目標**: 最大50ms（人間が知覚しない限界）

**対策**:
1. 軽い処理のみ同期実行
2. 重い処理（統計計算等）は非同期実行
3. DOM操作の最小化

```javascript
input.addEventListener('input', (e) => {
  // 軽い処理: UI更新（同期）
  updatePromptDisplay();

  // 重い処理: 統計計算（非同期）
  setTimeout(() => {
    updateStatistics();
  }, 0);
});
```

#### アニメーション

**目標**: 60fps維持（16.67ms/フレーム以下）

**対策**:
1. `transform`と`opacity`のみアニメート
2. `will-change`の適切な使用
3. `requestAnimationFrame`の活用

#### ファイルサイズ

**目標**: 合計100KB以下（gzip圧縮後）

**内訳**:
- HTML: < 10KB
- CSS: < 20KB
- JavaScript: < 50KB
- 外部ライブラリ: < 20KB（Chart.js, canvas-confetti）

**対策**:
1. 未使用コードの削除
2. Minify + Uglify
3. 動的インポート（コード分割）

#### Lighthouse Performance

**目標**: 90点以上

**主要指標**:
- FCP（First Contentful Paint）: < 1.8秒
- LCP（Largest Contentful Paint）: < 2.5秒
- TTI（Time to Interactive）: < 3.8秒
- TBT（Total Blocking Time）: < 200ms
- CLS（Cumulative Layout Shift）: < 0.1

---

### アクセシビリティ要件

#### WCAG 2.1 AA 準拠

design-system.md の「アクセシビリティ」セクション参照。

**チェックリスト**:
- [ ] コントラスト比4.5:1以上
- [ ] キーボードのみで全操作可能
- [ ] フォーカス表示明確
- [ ] ARIAラベル適切
- [ ] 色だけで情報を伝えない
- [ ] テキストリサイズ200%対応

#### 色覚異常対応

- Protanopia（1型色覚）
- Deuteranopia（2型色覚）
- Tritanopia（3型色覚）

**テスト方法**: Chrome DevTools > Rendering > Emulate vision deficiencies

#### スクリーンリーダー対応

**基本方針**: タイピングは視覚依存が強いため、完全対応は困難。最低限の情報提供。

**実装**:
- セマンティックHTML
- ARIAラベル
- `role="status"`, `aria-live="polite"`

---

### セキュリティ要件

#### LocalStorage

**脅威**: XSS攻撃によるデータ改ざん

**対策**:
1. 入力値のサニタイズ（現状実装済み）
2. Content Security Policy（CSP）の設定

```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline';">
```

#### 個人情報保護

**収集データ**: 練習統計のみ（氏名・メールアドレス等は収集しない）

**方針**:
- LocalStorageのみ使用（サーバーに送信しない）
- クラウド同期はオプション（ユーザーの明示的同意）
- Firebase匿名認証（個人情報不要）

---

### ブラウザ対応

#### 対応ブラウザ

- Chrome/Edge: 最新版
- Safari: 最新版（iOS Safari含む）
- Firefox: 最新版

#### 非対応ブラウザ

- IE11以下（2022年サポート終了）

#### Polyfill

必要に応じて以下のPolyfillを検討:
- `Array.prototype.includes`（古いブラウザ用）
- `Object.assign`（古いブラウザ用）

---

## データ設計

### LocalStorage構造

#### キー: `typingPractice:v1`

```javascript
{
  sessions: 50,           // 総練習回数
  recent: [               // 最近のセッション（最大20件）
    {
      at: 1707703200000,  // タイムスタンプ
      mode: 'kana',       // コース
      level: 'vowels',    // レベル
      acc: 95.5,          // 正確率
      wpm: 28.3,          // WPM
      score: 2500,        // スコア
      xp: 150,            // 獲得XP（P2で追加）
    },
    // ...
  ],
  daily: {                // 日別練習回数
    '2026-02-12': 3,
    '2026-02-11': 2,
    // ...
  },
  missMap: {              // 苦手な文字
    'kana:し': 12,
    'kana:つ': 8,
    'alpha:Q': 5,
    // ...
  },
  badges: {               // バッジ獲得状況
    'first_play': { at: 1707703200000 },
    'acc95': { at: 1707706800000 },
    // ...
  },
  level: {                // レベル・XP（P2で追加）
    current: 12,
    currentXP: 4500,
    totalXP: 54500,
  },
  dailyChallenge: {       // デイリーチャレンジ（P2で追加）
    '2026-02-12': {
      id: 'daily_speed',
      completed: true,
      completedAt: 1707710000000,
    },
    // ...
  },
  customization: {        // カスタマイズ（P3で追加）
    avatar: 'rabbit',
    themeColor: 'blue',
  },
}
```

#### キー: `typingPractice:settings:v1`

```javascript
{
  sound: true,            // 音声フィードバック
  voice: false,           // 音声ガイダンス（P3で追加）
  theme: 'dark',          // テーマ（P1で追加）
  fontSize: 'medium',     // フォントサイズ（将来実装）
}
```

### Firestore構造（P3: クラウド同期）

#### Collection: `users`

```javascript
// Document ID: Firebase UID
{
  createdAt: Timestamp,
  lastSyncAt: Timestamp,
  stats: {
    // LocalStorageと同じ構造
  }
}
```

---

## 技術仕様

### 開発環境

- **エディタ**: VS Code推奨
- **ブラウザ**: Chrome DevTools
- **バージョン管理**: Git

### 使用技術

#### フロントエンド

- HTML5（セマンティックマークアップ）
- CSS3（CSS Grid、Flexbox、CSS Variables）
- Vanilla JavaScript（ES6+）

#### 外部ライブラリ

| ライブラリ | 用途 | サイズ | 読み込み方法 |
|-----------|------|--------|------------|
| Chart.js | グラフ描画 | 13KB (gzip) | CDN |
| canvas-confetti | 紙吹雪エフェクト | 6KB (gzip) | CDN |
| Firebase | クラウド同期（P3） | 30KB (gzip) | CDN |

#### CDN読み込み

```html
<!-- Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>

<!-- canvas-confetti -->
<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js"></script>

<!-- Firebase (P3) -->
<script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore-compat.js"></script>
```

### デプロイ

#### 静的ホスティング

- GitHub Pages（推奨）
- Netlify
- Vercel

#### CI/CD

GitHub Actionsで自動デプロイ:

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

---

## まとめ

本要件定義書に基づき、以下の優先順位で実装を進めてください。

### フェーズ1（1-2週間）: P1機能

1. ライト/ダークモード切り替え
2. バッジシステム拡充
3. アニメーション強化
4. 色覚異常対応強化

**目標**: UI/UXの現代化、即座にユーザー体験向上

### フェーズ2（3-4週間）: P2機能

1. 統計ダッシュボード
2. レベル・XPシステム
3. デイリーチャレンジ
4. コンテンツ追加

**目標**: エンゲージメント向上、長期継続利用促進

### フェーズ3（5-8週間）: P3機能

1. クラウド同期（オプション）
2. アバター/カスタマイズ
3. 音声ガイダンス

**目標**: 高度な機能、差別化

各機能の詳細仕様は本ドキュメントを参照し、実装時は必ずテスト項目をすべてクリアしてください。
