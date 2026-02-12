# UI改善提案書

**プロジェクト**: タイピングの森 改修プロジェクト
**作成日**: 2026年2月12日
**バージョン**: 1.0
**対象**: 小学生向けタイピング練習サイト

---

## 目次

1. [概要](#概要)
2. [現状分析](#現状分析)
3. [改善提案の全体像](#改善提案の全体像)
4. [詳細改善提案](#詳細改善提案)
5. [Before/Afterビジュアル](#beforeafterビジュアル)
6. [実装優先順位](#実装優先順位)
7. [期待効果](#期待効果)

---

## 概要

### 目的

現状の「タイピングの森」UIを2026年の競合水準に引き上げ、小学生が直感的に使えて、楽しく継続できるインターフェースに改善する。

### 改善の方向性

1. **視覚的階層の明確化**: 重要な情報が一目でわかる
2. **色覚異常対応**: 色+形状+テキストで情報伝達
3. **ライト/ダークモード**: ユーザーの好みに対応
4. **アニメーション強化**: 達成感と楽しさを増幅
5. **レスポンシブ最適化**: モバイル・タブレットでも快適

---

## 現状分析

### 強み（維持すべき点）

1. **シンプルなデザイン**: 認知負荷が低い
2. **カード型UI**: 情報がグルーピングされている
3. **ダークテーマ**: モダンで集中しやすい
4. **レスポンシブ対応**: モバイルでも使える
5. **学年別プリセット**: 小学生に配慮した設計

### 課題（改善すべき点）

#### 1. ライト/ダークモード非対応

**問題点**:
- ダークモードのみ提供
- ライトモード希望者が使いにくい
- 2026年の標準機能として必須

**影響**:
- 明るい環境（教室など）での視認性低下
- ユーザー選択肢の欠如

#### 2. 色覚異常対応不足

**問題点**:
- 正解/不正解が色のみで判別
- 赤×緑の組み合わせ（色覚異常で区別困難）

**影響**:
- 男性の約8%が色覚異常
- 正解/不正解が判別しにくい

#### 3. 視覚的フィードバック不足

**問題点**:
- 正解/不正解時のアニメーション無し
- バッジ獲得時の演出が控えめ
- 達成感が薄い

**影響**:
- モチベーション低下
- 継続率への悪影響

#### 4. 統計表示の弱さ

**問題点**:
- 最近の平均値のみ表示（数値3つ）
- 推移グラフなし
- 苦手な文字の可視化なし

**影響**:
- 学習効果が見えにくい
- 保護者・教師の満足度低下

#### 5. フォーカス表示不足

**問題点**:
- デフォルトのoutlineのみ
- キーボード操作時に現在位置がわかりにくい

**影響**:
- アクセシビリティ低下
- キーボードナビゲーションの使いにくさ

#### 6. コンテンツ量不足

**問題点**:
- レベル数は十分だが、バリエーション不足
- 飽きやすい

**影響**:
- 長期継続率低下

---

## 改善提案の全体像

### 改善の優先順位

#### P1（最優先: 1-2週間）

1. ライト/ダークモード切り替え
2. 色覚異常対応強化
3. フォーカス表示強化
4. アニメーション強化
5. バッジ拡充（7→20種類）

#### P2（高優先: 3-4週間）

1. 統計ダッシュボード
2. レベル・XPシステム
3. デイリーチャレンジUI
4. コンテンツ追加
5. レスポンシブ最適化

#### P3（中優先: 5-8週間）

1. 設定画面（アバター/カスタマイズ）
2. 音声ガイダンスUI
3. クラウド同期UI

---

## 詳細改善提案

### 1. ヘッダーの改善

#### 現状

```
+-----------------------------------------------+
| タイピングの森                                 |
| バッジ 5  きょう: 2                            |
+-----------------------------------------------+
```

**課題**:
- レベル・XP表示なし
- テーマ切り替えボタンなし
- 設定画面へのリンクなし

#### 改善案

```
+---------------------------------------------------------------+
| 🌲 タイピングの森                     🌙 ダーク  🏅 5/20  ⚙️ |
| ⭐ レベル 12  ████████████░░░░░░░░ 4,500/10,000 XP          |
+---------------------------------------------------------------+
```

**追加要素**:
1. **テーマ切り替えボタン**: 🌙/☀️ アイコン + ラベル
2. **バッジカウンター**: 獲得数/総数（5/20）
3. **設定ボタン**: ⚙️ アイコン
4. **レベル・XPバー**: 視覚的に進捗を表示

**HTMLイメージ**:
```html
<header class="container">
  <div class="header-top">
    <h1>🌲 タイピングの森</h1>
    <div class="header-actions">
      <button id="themeToggle" class="btn-chip" aria-label="テーマ切り替え">
        <span class="icon">🌙</span>
        <span>ダーク</span>
      </button>
      <button id="badgesBtn" class="btn-chip" aria-label="バッジ">
        <span class="icon">🏅</span>
        <span>バッジ <strong>5</strong>/<span>20</span></span>
      </button>
      <button id="settingsBtn" class="btn-icon" aria-label="設定">
        <span class="icon">⚙️</span>
      </button>
    </div>
  </div>

  <div class="level-display">
    <span class="level-icon">⭐</span>
    <span class="level-text">レベル <strong>12</strong></span>
    <div class="xp-bar" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">
      <div class="xp-fill" style="width: 45%"></div>
    </div>
    <span class="xp-text">4,500 / 10,000 XP</span>
  </div>
</header>
```

**CSSスタイル**:
```css
.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
}

.header-actions {
  display: flex;
  gap: var(--space-2);
  align-items: center;
}

.level-display {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  background: var(--color-bg-secondary);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--border-color);
}

.xp-bar {
  flex: 1;
  height: 8px;
  background: var(--gray-200);
  border-radius: var(--border-radius-full);
  overflow: hidden;
}

.xp-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  transition: width 0.5s ease;
}

@media (max-width: 768px) {
  .header-top {
    flex-direction: column;
    align-items: flex-start;
  }

  .level-display {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
  }

  .xp-bar {
    width: 100%;
  }
}
```

---

### 2. デイリーチャレンジカードの追加

#### 追加位置

設定カードの上部に挿入。

#### デザイン

```
+---------------------------------------------------------------+
| 🎯 きょうの チャレンジ                                          |
| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ |
| スピードチャレンジ                                             |
| WPM 25 いじょうで 1かい クリア                                 |
|                                                               |
| 🏆 +200 XP                             ⏳ のこり 8じかん      |
|                                                               |
| [▶ チャレンジする]                                            |
+---------------------------------------------------------------+
```

**HTMLイメージ**:
```html
<section class="card daily-challenge-card">
  <div class="challenge-header">
    <h2 class="challenge-title">🎯 きょうの チャレンジ</h2>
    <span class="challenge-timer">⏳ のこり 8じかん</span>
  </div>

  <div class="challenge-body">
    <h3 class="challenge-name">スピードチャレンジ</h3>
    <p class="challenge-desc">WPM 25 いじょうで 1かい クリア</p>
  </div>

  <div class="challenge-footer">
    <div class="challenge-reward">
      <span class="icon">🏆</span>
      <span class="text">+200 XP</span>
    </div>
    <button class="btn-primary" id="startChallengeBtn">
      ▶ チャレンジする
    </button>
  </div>
</section>
```

**達成済み状態**:
```
+---------------------------------------------------------------+
| 🎯 きょうの チャレンジ                              ✅ たっせい |
| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ |
| スピードチャレンジ                                             |
| WPM 25 いじょうで 1かい クリア                                 |
|                                                               |
| 🏆 +200 XP かくとく！                                         |
+---------------------------------------------------------------+
```

**CSSスタイル**:
```css
.daily-challenge-card {
  background: linear-gradient(135deg, var(--primary-50), var(--secondary-50));
  border: 2px solid var(--color-primary);
  margin-bottom: var(--space-4);
}

.challenge-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-3);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--border-color);
}

.challenge-title {
  margin: 0;
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
}

.challenge-timer {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.challenge-body {
  margin-bottom: var(--space-4);
}

.challenge-name {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  margin: 0 0 var(--space-2) 0;
}

.challenge-desc {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  margin: 0;
}

.challenge-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: var(--space-3);
  border-top: 1px solid var(--border-color);
}

.challenge-reward {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  color: var(--color-primary);
}

/* 達成済み状態 */
.daily-challenge-card.completed {
  background: linear-gradient(135deg, var(--success-50), var(--success-100));
  border-color: var(--color-success);
}

.daily-challenge-card.completed .challenge-title::after {
  content: ' ✅ たっせい';
  font-size: var(--text-base);
  color: var(--color-success);
}

.daily-challenge-card.completed .btn-primary {
  background: var(--gray-200);
  color: var(--gray-600);
  cursor: not-allowed;
  pointer-events: none;
}
```

---

### 3. ゲーム画面の改善

#### 現状

```
+---------------------------------------------------------------+
| もんだい                                      のこり 20        |
| あ                                            せいかい 5       |
| ヒント: a                                     ミス 2          |
|                                                               |
| [入力欄                    ] [やめる]                         |
+---------------------------------------------------------------+
```

**課題**:
- 正解/不正解のフィードバックが弱い
- プログレスバーなし
- アニメーションなし

#### 改善案

```
+---------------------------------------------------------------+
| もんだい 5/20  ████████░░░░░░░░░░░░░░░░░░░░ 25%              |
| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ |
|                                                               |
|                          あ                                   |
|                                                               |
|                      ヒント: a                                |
|                                                               |
| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ |
| [               入力欄                    ] [やめる]          |
|                                                               |
|  ✅ せいかい 5    ❌ ミス 2    ⚡ 28 WPM    🎯 95%           |
+---------------------------------------------------------------+
```

**追加要素**:
1. **プログレスバー**: 問題の進捗を視覚化
2. **問題番号表示**: 5/20
3. **リアルタイム統計**: WPM、正確率をライブ表示
4. **アイコン追加**: ✅、❌、⚡、🎯 で視覚的にわかりやすく

**HTMLイメージ**:
```html
<section class="card game-card" id="gameCard">
  <!-- プログレスバー -->
  <div class="game-progress">
    <div class="progress-header">
      <span class="progress-label">もんだい <strong>5</strong>/<span>20</span></span>
      <span class="progress-percent">25%</span>
    </div>
    <div class="progress-bar" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
      <div class="progress-bar-fill" style="width: 25%"></div>
    </div>
  </div>

  <!-- 問題表示 -->
  <div class="prompt-area">
    <div class="prompt-label">もんだい</div>
    <div class="prompt" id="prompt">あ</div>
    <div class="meaning" id="meaning"></div>
    <div class="hint" id="hint">ヒント: a</div>
  </div>

  <!-- 入力欄 -->
  <div class="input-row">
    <input id="typeInput" type="text" class="input-typing" placeholder="ここにうつ" />
    <button id="giveUpBtn" class="btn-secondary">やめる</button>
  </div>

  <!-- リアルタイム統計 -->
  <div class="live-stats">
    <div class="stat-item">
      <span class="icon">✅</span>
      <span class="label">せいかい</span>
      <span class="value" id="liveCorrect">5</span>
    </div>
    <div class="stat-item">
      <span class="icon">❌</span>
      <span class="label">ミス</span>
      <span class="value" id="liveMiss">2</span>
    </div>
    <div class="stat-item">
      <span class="icon">⚡</span>
      <span class="label">WPM</span>
      <span class="value" id="liveWPM">28</span>
    </div>
    <div class="stat-item">
      <span class="icon">🎯</span>
      <span class="label">せいかくりつ</span>
      <span class="value" id="liveAcc">95%</span>
    </div>
  </div>

  <!-- キーボード表示 -->
  <div class="keyboard" id="keyboard" hidden>
    <!-- ... -->
  </div>
</section>
```

**CSSスタイル**:
```css
.game-progress {
  margin-bottom: var(--space-4);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.progress-label strong,
.progress-percent {
  font-size: var(--text-base);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
}

.prompt-area {
  text-align: center;
  padding: var(--space-8) var(--space-4);
  margin-bottom: var(--space-4);
  background: var(--color-bg-secondary);
  border-radius: var(--border-radius-lg);
  border: 2px solid var(--border-color);
}

.prompt {
  font-size: 4rem;
  font-weight: var(--font-black);
  line-height: 1.2;
  margin: var(--space-4) 0;
  letter-spacing: var(--tracking-wide);
}

.hint {
  font-size: var(--text-xl);
  color: var(--color-text-secondary);
  margin-top: var(--space-3);
}

.live-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: var(--space-3);
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--border-color);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
}

.stat-item .icon {
  font-size: var(--text-2xl);
}

.stat-item .label {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
}

.stat-item .value {
  font-size: var(--text-xl);
  font-weight: var(--font-black);
  color: var(--color-text-primary);
}

/* 正解時のアニメーション */
.prompt.success {
  animation: successPulse 0.4s ease-out;
}

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

/* 不正解時のアニメーション */
.prompt.error {
  animation: shake 0.4s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
  20%, 40%, 60%, 80% { transform: translateX(6px); }
}
```

---

### 4. 結果画面の改善

#### 現状

```
+---------------------------------------------------------------+
| けっか                                                         |
|                                                               |
| せいかいりつ: 95%                                             |
| WPM: 28                                                       |
| スコア: 2500                                                  |
| じかん: 45s                                                   |
|                                                               |
| [もういっかい]  [もどる]                                      |
+---------------------------------------------------------------+
```

**課題**:
- 達成感が薄い
- バッジ獲得通知が控えめ
- 前回との比較なし

#### 改善案

```
+---------------------------------------------------------------+
|                        🎉 おつかれさま！                       |
| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ |
|                                                               |
|  🎯 せいかいりつ  95%  ⬆ +5%                                |
|  ⚡ WPM          28   ⬆ +3                                   |
|  ⭐ スコア       2500  ⬆ +200                                |
|  ⏱ じかん        45s                                         |
|                                                               |
|  🏆 かくとくXP: +150 XP                                      |
|                                                               |
| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ |
|                                                               |
|              🏅 バッジGET！ せいかく名人                      |
|                                                               |
| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ |
|                                                               |
|           [▶ もういっかい]  [📊 とうけい]  [🏠 もどる]       |
+---------------------------------------------------------------+
```

**追加要素**:
1. **おつかれさまメッセージ**: 達成感を演出
2. **前回比較**: ⬆⬇アイコンで増減を表示
3. **獲得XP表示**: レベルシステムと連動
4. **バッジ獲得通知**: 大きく目立つように
5. **統計ボタン**: 詳細統計へのリンク

**HTMLイメージ**:
```html
<section class="card result-card" id="resultCard">
  <!-- ヘッダー -->
  <div class="result-header">
    <h2 class="result-title">🎉 おつかれさま！</h2>
  </div>

  <!-- 統計グリッド -->
  <div class="result-stats">
    <div class="result-stat">
      <span class="icon">🎯</span>
      <span class="label">せいかいりつ</span>
      <div class="value-row">
        <span class="value" id="rAcc">95</span><span class="unit">%</span>
        <span class="change positive">⬆ +5%</span>
      </div>
    </div>

    <div class="result-stat">
      <span class="icon">⚡</span>
      <span class="label">WPM</span>
      <div class="value-row">
        <span class="value" id="rWpm">28</span>
        <span class="change positive">⬆ +3</span>
      </div>
    </div>

    <div class="result-stat">
      <span class="icon">⭐</span>
      <span class="label">スコア</span>
      <div class="value-row">
        <span class="value" id="rScore">2500</span>
        <span class="change positive">⬆ +200</span>
      </div>
    </div>

    <div class="result-stat">
      <span class="icon">⏱</span>
      <span class="label">じかん</span>
      <div class="value-row">
        <span class="value" id="rTime">45</span><span class="unit">s</span>
      </div>
    </div>
  </div>

  <!-- XP獲得 -->
  <div class="xp-earned">
    <span class="icon">🏆</span>
    <span class="text">かくとくXP: <strong>+150 XP</strong></span>
  </div>

  <!-- バッジ獲得（条件付き表示） -->
  <div class="badge-earned" id="badgeEarned" hidden>
    <div class="badge-icon">🏅</div>
    <div class="badge-text">
      <h3>バッジGET！</h3>
      <p id="badgeName">せいかく名人</p>
    </div>
  </div>

  <!-- アクションボタン -->
  <div class="result-actions">
    <button class="btn-primary" id="againBtn">▶ もういっかい</button>
    <button class="btn-secondary" id="statsBtn">📊 とうけい</button>
    <button class="btn-secondary" id="backBtn">🏠 もどる</button>
  </div>
</section>
```

**CSSスタイル**:
```css
.result-header {
  text-align: center;
  margin-bottom: var(--space-6);
}

.result-title {
  font-size: var(--text-4xl);
  font-weight: var(--font-black);
  margin: 0;
}

.result-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.result-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-4);
  background: var(--color-bg-secondary);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--border-color);
}

.result-stat .icon {
  font-size: var(--text-3xl);
  margin-bottom: var(--space-2);
}

.result-stat .label {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-2);
}

.value-row {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
}

.result-stat .value {
  font-size: var(--text-4xl);
  font-weight: var(--font-black);
  color: var(--color-primary);
}

.result-stat .unit {
  font-size: var(--text-xl);
  color: var(--color-text-secondary);
}

.result-stat .change {
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
}

.result-stat .change.positive {
  color: var(--color-success);
}

.result-stat .change.negative {
  color: var(--error-500);
}

.xp-earned {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-4);
  background: linear-gradient(90deg, var(--primary-50), var(--secondary-50));
  border-radius: var(--border-radius-md);
  border: 2px solid var(--color-primary);
  font-size: var(--text-lg);
  margin-bottom: var(--space-6);
}

.xp-earned .icon {
  font-size: var(--text-3xl);
}

.xp-earned strong {
  color: var(--color-primary);
}

.badge-earned {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4);
  background: linear-gradient(135deg, var(--warning-50), var(--warning-100));
  border-radius: var(--border-radius-md);
  border: 2px solid var(--color-warning);
  margin-bottom: var(--space-6);
  animation: badgeAppear 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes badgeAppear {
  0% {
    transform: scale(0) rotate(-180deg);
    opacity: 0;
  }
  70% {
    transform: scale(1.05) rotate(10deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

.badge-icon {
  font-size: 4rem;
  flex-shrink: 0;
}

.badge-text h3 {
  margin: 0 0 var(--space-1) 0;
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
}

.badge-text p {
  margin: 0;
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
}

.result-actions {
  display: flex;
  gap: var(--space-3);
  justify-content: center;
  flex-wrap: wrap;
}
```

---

### 5. 統計ダッシュボードの追加

#### 新規画面

メニューに「とうけい」リンクを追加。

#### レイアウト

```
+---------------------------------------------------------------+
|                          📊 とうけい                          |
| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ |
|                                                               |
| [そうれんしゅう50かい] [そうじかん320ぷん] [へいきんWPM 28]  |
| [へいきんせいかくりつ 92%]                                    |
|                                                               |
| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ |
|                                                               |
|                    📈 WPMのすいい                             |
| [折れ線グラフ]                                                |
|                                                               |
| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ |
|                                                               |
|                 📈 せいかくりつのすいい                       |
| [折れ線グラフ]                                                |
|                                                               |
| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ |
|                                                               |
|                  🔥 にがてなもじ TOP10                        |
| [テーブル: もじ、ミスかいすう、ミスりつ]                       |
|                                                               |
| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ |
|                                                               |
|                 📅 ひべつれんしゅうかいすう                    |
| [棒グラフ: さいきん30にち]                                    |
|                                                               |
+---------------------------------------------------------------+
```

**HTMLイメージ**:
```html
<section class="stats-page">
  <header class="stats-header">
    <h1>📊 とうけい</h1>
  </header>

  <!-- 全体統計カード -->
  <div class="stats-overview">
    <div class="stat-card">
      <div class="stat-icon">🏋️</div>
      <div class="stat-label">そうれんしゅう</div>
      <div class="stat-value">50</div>
      <div class="stat-unit">かい</div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">⏱</div>
      <div class="stat-label">そうじかん</div>
      <div class="stat-value">320</div>
      <div class="stat-unit">ぷん</div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">⚡</div>
      <div class="stat-label">へいきんWPM</div>
      <div class="stat-value">28</div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">🎯</div>
      <div class="stat-label">へいきんせいかくりつ</div>
      <div class="stat-value">92</div>
      <div class="stat-unit">%</div>
    </div>
  </div>

  <!-- WPM推移グラフ -->
  <div class="card chart-card">
    <h2 class="chart-title">📈 WPMのすいい</h2>
    <canvas id="wpmChart" role="img" aria-label="WPM推移グラフ"></canvas>
  </div>

  <!-- 正確率推移グラフ -->
  <div class="card chart-card">
    <h2 class="chart-title">📈 せいかくりつのすいい</h2>
    <canvas id="accChart" role="img" aria-label="正確率推移グラフ"></canvas>
  </div>

  <!-- 苦手な文字テーブル -->
  <div class="card weak-chars-card">
    <h2 class="chart-title">🔥 にがてなもじ TOP10</h2>
    <table class="weak-chars-table">
      <thead>
        <tr>
          <th scope="col">もじ</th>
          <th scope="col">ミスかいすう</th>
          <th scope="col">ミスりつ</th>
        </tr>
      </thead>
      <tbody id="weakCharsBody">
        <tr>
          <td>し</td>
          <td>12</td>
          <td>26.7%</td>
        </tr>
        <!-- ... -->
      </tbody>
    </table>
  </div>

  <!-- 日別練習回数グラフ -->
  <div class="card chart-card">
    <h2 class="chart-title">📅 ひべつれんしゅうかいすう</h2>
    <canvas id="dailyChart" role="img" aria-label="日別練習回数グラフ"></canvas>
  </div>
</section>
```

**CSSスタイル**:
```css
.stats-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-6) var(--space-4);
}

.stats-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.stats-header h1 {
  font-size: var(--text-5xl);
  font-weight: var(--font-black);
  margin: 0;
}

.stats-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-8);
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-5);
  background: var(--color-bg-primary);
  border-radius: var(--border-radius-lg);
  border: 2px solid var(--border-color);
  box-shadow: var(--shadow-md);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.stat-card .stat-icon {
  font-size: var(--text-5xl);
  margin-bottom: var(--space-2);
}

.stat-card .stat-label {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-2);
}

.stat-card .stat-value {
  font-size: var(--text-5xl);
  font-weight: var(--font-black);
  color: var(--color-primary);
}

.stat-card .stat-unit {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
}

.chart-card {
  margin-bottom: var(--space-6);
  padding: var(--space-5);
}

.chart-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  margin: 0 0 var(--space-4) 0;
}

.weak-chars-table {
  width: 100%;
  border-collapse: collapse;
}

.weak-chars-table th,
.weak-chars-table td {
  padding: var(--space-3);
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.weak-chars-table th {
  font-weight: var(--font-semibold);
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
}

.weak-chars-table td {
  font-size: var(--text-base);
}

.weak-chars-table tr:hover {
  background: var(--color-bg-secondary);
}
```

---

### 6. バッジダイアログの改善

#### 現状

```
+---------------------------------------------------------------+
| バッジ                                                         |
|                                                               |
| [はじめての一歩] [せいかく名人] [3れんしょう]                 |
| [まいにち] [母音マスター] [拗音クリア] [ローマ字たんけん]     |
|                                                               |
| [とじる]                                                      |
+---------------------------------------------------------------+
```

**課題**:
- 未獲得バッジが区別しにくい
- 達成条件が見えにくい
- アイコンなし

#### 改善案

```
+---------------------------------------------------------------+
|                       🏅 バッジコレクション                     |
|                        5/20 かくとく                          |
| ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ |
|                                                               |
| [✅ はじめての一歩]                 [🔒 スピード入門]         |
| はじめて れんしゅうした             タイピングが はやく...    |
|                                    (WPM 20 たっせいで かいじょ)|
|                                                               |
| [✅ せいかく名人]                   [🔒 スピードスター]       |
| せいかいりつ 95% いじょう           かなり はやく うてる...    |
|                                    (WPM 30 たっせいで かいじょ)|
|                                                               |
| ...                                                           |
|                                                               |
| [とじる]                                                      |
+---------------------------------------------------------------+
```

**追加要素**:
1. **カウンター**: 5/20 かくとく
2. **アイコン**: ✅（獲得済み）、🔒（未獲得）
3. **アンロック条件**: 未獲得バッジに表示
4. **カテゴリ分け**: 速度、精度、継続、達成（将来実装）

**HTMLイメージ**:
```html
<dialog id="badgesDialog">
  <div class="dialog badges-dialog">
    <header class="dialog-header">
      <h2 class="dialog-title">🏅 バッジコレクション</h2>
      <p class="badge-count"><span id="badgeUnlocked">5</span>/<span id="badgeTotal">20</span> かくとく</p>
    </header>

    <div class="badges-grid" id="badgesGrid">
      <!-- 獲得済みバッジ -->
      <div class="badge-card unlocked">
        <div class="badge-icon">✅</div>
        <div class="badge-info">
          <h3 class="badge-name">はじめての一歩</h3>
          <p class="badge-desc">はじめて れんしゅうした</p>
        </div>
      </div>

      <!-- 未獲得バッジ -->
      <div class="badge-card locked">
        <div class="badge-icon">🔒</div>
        <div class="badge-info">
          <h3 class="badge-name">スピード入門</h3>
          <p class="badge-desc">タイピングが はやく なってきた！</p>
          <p class="badge-unlock">WPM 20 たっせいで かいじょ</p>
        </div>
      </div>

      <!-- ... 他のバッジ ... -->
    </div>

    <footer class="dialog-footer">
      <button class="btn-primary" type="button" onclick="badgesDialog.close()">とじる</button>
    </footer>
  </div>
</dialog>
```

**CSSスタイル**:
```css
.badges-dialog {
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
}

.dialog-header {
  text-align: center;
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--border-color);
}

.dialog-title {
  font-size: var(--text-4xl);
  font-weight: var(--font-black);
  margin: 0 0 var(--space-2) 0;
}

.badge-count {
  font-size: var(--text-xl);
  color: var(--color-text-secondary);
  margin: 0;
}

.badge-count span {
  font-weight: var(--font-bold);
  color: var(--color-primary);
}

.badges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.badge-card {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--border-radius-md);
  border: 2px solid var(--border-color);
  background: var(--color-bg-secondary);
  transition: all 0.3s ease;
}

.badge-card.unlocked {
  border-color: var(--color-success);
  background: linear-gradient(135deg, var(--success-50), var(--success-100));
}

.badge-card.locked {
  opacity: 0.6;
  filter: grayscale(0.8);
}

.badge-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.badge-icon {
  font-size: var(--text-5xl);
  flex-shrink: 0;
}

.badge-info {
  flex: 1;
}

.badge-name {
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  margin: 0 0 var(--space-1) 0;
}

.badge-desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-1) 0;
}

.badge-unlock {
  font-size: var(--text-xs);
  color: var(--color-text-disabled);
  font-style: italic;
  margin: 0;
}

.dialog-footer {
  text-align: center;
  padding-top: var(--space-4);
  border-top: 1px solid var(--border-color);
}
```

---

## Before/Afterビジュアル

### ホーム画面

#### Before

- ダークテーマのみ
- レベル・XP表示なし
- デイリーチャレンジなし
- バッジカウンター簡素

#### After

- ライト/ダークモード切り替え
- レベル・XPバー表示
- デイリーチャレンジカード
- バッジカウンター詳細（5/20）
- 視覚的階層が明確

### ゲーム画面

#### Before

- プログレスバーなし
- スコアのみ表示
- フィードバック弱い

#### After

- プログレスバー + パーセント表示
- リアルタイム統計（WPM、正確率）
- 正解/不正解アニメーション
- アイコン追加で視認性向上

### 結果画面

#### Before

- 統計のみ表示
- 達成感薄い
- 前回比較なし

#### After

- おつかれさまメッセージ
- 前回比較（⬆⬇アイコン）
- 獲得XP表示
- バッジ獲得演出
- 紙吹雪エフェクト（高得点時）

---

## 実装優先順位

### フェーズ1（P1: 1-2週間）

#### 必須項目

1. **ライト/ダークモード切り替え**
   - ヘッダーにトグルボタン追加
   - CSS変数でテーマ定義
   - LocalStorage保存

2. **色覚異常対応強化**
   - 正解に✅、不正解に❌追加
   - プログレスバーにパーセンテージ併記

3. **フォーカス表示強化**
   - :focus-visible スタイル追加
   - すべてのインタラクティブ要素に適用

4. **アニメーション強化**
   - 正解時: successPulse
   - 不正解時: shake
   - バッジ獲得時: badgeAppear
   - 高得点時: confetti

5. **バッジ拡充（7→20種類）**
   - 速度系4種
   - 精度系3種
   - 継続系3種
   - 達成系3種
   - バッジダイアログの改善

#### 期待効果

- アクセシビリティ大幅向上
- 達成感・楽しさ増幅
- 即座にユーザー体験向上

---

### フェーズ2（P2: 3-4週間）

#### 必須項目

1. **ヘッダーにレベル・XPバー追加**
   - 視覚的進捗表示
   - レベルアップ演出

2. **デイリーチャレンジカード追加**
   - ホーム画面に配置
   - 達成時の演出

3. **ゲーム画面の改善**
   - プログレスバー追加
   - リアルタイム統計表示

4. **結果画面の改善**
   - 前回比較表示
   - 獲得XP表示
   - バッジ獲得演出

5. **統計ダッシュボード追加**
   - 全体統計カード
   - WPM・正確率推移グラフ
   - 苦手な文字テーブル
   - 日別練習回数グラフ

#### 期待効果

- エンゲージメント向上
- 学習効果の可視化
- 長期継続率向上

---

### フェーズ3（P3: 5-8週間）

#### オプション項目

1. **設定画面追加**
   - アバター選択
   - テーマカラー選択
   - 音声ガイダンス設定

2. **クラウド同期UI**
   - ログインボタン
   - 同期ステータス表示

3. **アバター表示**
   - ヘッダーに表示
   - カスタマイズ反映

#### 期待効果

- パーソナライゼーション向上
- 複数デバイス利用促進
- 個性表現の場を提供

---

## 期待効果

### 定量的効果（目標KPI）

#### ユーザーエンゲージメント

| 指標 | 現状（想定） | 目標（3ヶ月後） | 改善率 |
|-----|-------------|----------------|--------|
| 7日後継続率 | 30% | 50% | +67% |
| 30日後継続率 | 15% | 30% | +100% |
| 平均セッション時間 | 5分 | 10分 | +100% |
| 週あたりセッション数 | 2回 | 3回 | +50% |

#### 学習効果

| 指標 | 現状（想定） | 目標（1ヶ月後） | 改善率 |
|-----|-------------|----------------|--------|
| WPM向上率 | +10% | +20% | +100% |
| 平均正確率 | 75% | 85% | +13% |

#### アクセシビリティ

| 指標 | 現状 | 目標 |
|-----|------|------|
| Lighthouse Accessibility | 80点 | 95点以上 |
| WCAG 2.1 AA準拠率 | 80% | 100% |

---

### 定性的効果

#### ユーザー体験の向上

1. **楽しさの増幅**
   - アニメーション・エフェクトで達成感UP
   - バッジコレクション性でモチベーションUP
   - デイリーチャレンジで毎日の目標明確化

2. **わかりやすさの向上**
   - 色+形状+テキストで誰でも理解可能
   - 視覚的階層が明確
   - プログレスバーで進捗が一目瞭然

3. **成長の実感**
   - レベル・XPシステムで成長を可視化
   - 統計グラフで上達を実感
   - 前回比較で改善点を認識

4. **個性の表現**
   - アバター・テーマカラーで自分らしさ
   - カスタマイズでサイトへの愛着UP

#### 保護者・教師の満足度向上

1. **学習効果の可視化**
   - 詳細統計で成長を確認
   - 苦手な文字を特定
   - 印刷可能なレポート（将来実装）

2. **継続性のサポート**
   - 連続日数の可視化
   - デイリーチャレンジで習慣化
   - バッジで達成感を保護者と共有

---

## まとめ

本UI改善提案は、「タイピングの森」を2026年の競合水準に引き上げ、小学生が楽しく継続的に学習できるサイトに進化させるための具体的な施策です。

### 実装の鍵

1. **優先順位を守る**: P1→P2→P3の順で確実に実装
2. **ユーザーテスト**: 各フェーズ後に小学生での使用感確認
3. **アクセシビリティ**: WCAG 2.1 AA準拠を常に意識
4. **パフォーマンス**: 60fps維持、100KB以下のファイルサイズ

### 成功の指標

- 継続率の向上
- 学習効果の改善
- 保護者・教師からの高評価
- アクセシビリティスコア95点以上

実装チームは本ドキュメント、design-system.md、requirements.md を参照しながら、段階的に改善を進めてください。各フェーズ完了後、必ずユーザーテストとパフォーマンス測定を実施し、品質を担保してください。
