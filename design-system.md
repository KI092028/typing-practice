# デザインシステム仕様書

**プロジェクト**: タイピングの森 改修プロジェクト
**作成日**: 2026年2月12日
**バージョン**: 1.0
**対象**: 小学生（6-12歳）向けタイピング練習サイト

---

## 目次

1. [概要](#概要)
2. [デザイン原則](#デザイン原則)
3. [カラーシステム](#カラーシステム)
4. [タイポグラフィ](#タイポグラフィ)
5. [スペーシング](#スペーシング)
6. [コンポーネント](#コンポーネント)
7. [アニメーション](#アニメーション)
8. [アクセシビリティ](#アクセシビリティ)
9. [レスポンシブデザイン](#レスポンシブデザイン)

---

## 概要

本デザインシステムは、小学生が「楽しく、わかりやすく、長く使い続けられる」タイピング練習サイトの実現を目指します。WCAG 2.1 AA準拠を基本とし、ニューロダイバーシティへの配慮を組み込んだ包括的なデザイン言語を定義します。

### ターゲットユーザー

- **主要ユーザー**: 小学生（6-12歳）
- **副次ユーザー**: 保護者、教師

### デザイン哲学

1. **子供らしさと機能性の両立**: 楽しいビジュアルと学習効果を同時に実現
2. **認知負荷の軽減**: シンプルで直感的なインターフェース
3. **包括性**: すべての子供が利用できるアクセシビリティ
4. **成長の可視化**: 進捗と達成感を常に感じられるデザイン

---

## デザイン原則

### 1. シンプルさ (Simplicity)

- 一度に表示する情報を最小限に
- 明確な視覚的階層
- 余白を十分に確保
- 不要な装飾を排除

**実装指針**:
- 1画面につき1つの主要タスク
- 3階層以内の情報構造
- 最小タップ/クリックエリア: 44×44px

### 2. 楽しさ (Joyfulness)

- 明るく親しみやすいカラーパレット
- 達成時のセレブレーション演出
- ゲーム的要素の組み込み
- キャラクター・バッジの活用

**実装指針**:
- マイクロインタラクションの積極的活用
- アニメーションで喜びを表現
- ポジティブなフィードバック

### 3. わかりやすさ (Clarity)

- 視覚的フィードバックの即座提供
- アイコン + テキストの併用
- 色だけに依存しない情報伝達
- 小学生が理解できる言葉遣い

**実装指針**:
- 正解: 緑 + ○ + 「せいかい！」
- 誤答: 赤 + × + 「まちがい」
- 漢字にはひらがなルビ（P1実装は不要、P2で検討）

### 4. 包括性 (Inclusivity)

- WCAG 2.1 AA完全準拠
- 色覚異常対応
- キーボードナビゲーション
- カスタマイズ可能な設定

**実装指針**:
- コントラスト比4.5:1以上
- 複数の感覚モダリティ（視覚・聴覚）
- フォーカス表示の強化

---

## カラーシステム

### 基本方針

- **ライトモード・ダークモード両対応**: ユーザーが選択可能
- **色覚異常対応**: 色+形状+テキストで情報伝達
- **WCAG 2.1 AA準拠**: コントラスト比4.5:1以上

### ライトモードパレット

#### プライマリーカラー

```css
/* メインカラー（青系） */
--primary-50: #E3F2FD;   /* 背景・ホバー */
--primary-100: #BBDEFB;  /* 非アクティブ状態 */
--primary-400: #42A5F5;  /* ホバー状態 */
--primary-500: #2196F3;  /* 通常状態 */
--primary-600: #1E88E5;  /* アクティブ状態 */
--primary-700: #1976D2;  /* フォーカス状態 */
```

#### セカンダリーカラー

```css
/* アクセント（ティール） */
--secondary-400: #26A69A;
--secondary-500: #009688;
--secondary-600: #00897B;

/* サポート（オレンジ） */
--accent-400: #FFA726;
--accent-500: #FF9800;
--accent-600: #FB8C00;
```

#### セマンティックカラー

```css
/* 成功（緑） */
--success-50: #E8F5E9;
--success-500: #4CAF50;
--success-700: #388E3C;

/* エラー（赤） */
--error-50: #FFEBEE;
--error-500: #EF5350;
--error-700: #D32F2F;

/* 警告（黄色） */
--warning-50: #FFF3E0;
--warning-500: #FFC107;
--warning-700: #FFA000;

/* 情報（青） */
--info-50: #E1F5FE;
--info-500: #03A9F4;
--info-700: #0288D1;
```

#### ニュートラルカラー

```css
/* グレースケール */
--gray-50: #FAFAFA;    /* 背景 */
--gray-100: #F5F5F5;   /* カード背景 */
--gray-200: #EEEEEE;   /* ボーダー */
--gray-400: #BDBDBD;   /* 非アクティブテキスト */
--gray-600: #757575;   /* セカンダリテキスト */
--gray-800: #424242;   /* プライマリテキスト */
--gray-900: #212121;   /* 見出し */

/* 基本背景・テキスト */
--bg-primary: #FFFFFF;
--bg-secondary: #F8F9FA;
--text-primary: #212121;
--text-secondary: #757575;
--text-disabled: #BDBDBD;
```

### ダークモードパレット

#### プライマリーカラー

```css
/* メインカラー（青系・明度調整） */
--primary-dark-400: #64B5F6;
--primary-dark-500: #42A5F5;
--primary-dark-600: #2196F3;
```

#### セカンダリーカラー

```css
/* アクセント（ティール・明度調整） */
--secondary-dark-400: #4DB6AC;
--secondary-dark-500: #26A69A;

/* サポート（オレンジ・明度調整） */
--accent-dark-400: #FFB74D;
--accent-dark-500: #FFA726;
```

#### セマンティックカラー

```css
/* 成功（緑・明度調整） */
--success-dark-500: #66BB6A;
--success-dark-700: #4CAF50;

/* エラー（赤・明度調整） */
--error-dark-500: #EF5350;
--error-dark-700: #E53935;

/* 警告（黄色・明度調整） */
--warning-dark-500: #FFCA28;
--warning-dark-700: #FFC107;

/* 情報（青・明度調整） */
--info-dark-500: #29B6F6;
--info-dark-700: #03A9F4;
```

#### ニュートラルカラー

```css
/* ダークグレースケール */
--gray-dark-800: #424242;
--gray-dark-700: #616161;
--gray-dark-600: #757575;
--gray-dark-400: #BDBDBD;
--gray-dark-200: #E0E0E0;
--gray-dark-100: #F5F5F5;

/* 基本背景・テキスト */
--bg-dark-primary: #121212;     /* Material Design Dark推奨値 */
--bg-dark-secondary: #1E1E1E;   /* カード背景 */
--bg-dark-tertiary: #2C2C2C;    /* 強調背景 */
--text-dark-primary: #FFFFFF;
--text-dark-secondary: #B0B0B0;
--text-dark-disabled: #6B6B6B;
```

### 色覚異常対応パレット

Protanopia（1型色覚）、Deuteranopia（2型色覚）、Tritanopia（3型色覚）に配慮した補助カラーセット。

```css
/* 安全な色の組み合わせ */
--safe-blue: #0173B2;      /* 青 - すべてのタイプで認識可能 */
--safe-orange: #DE8F05;    /* オレンジ - 青とのコントラスト */
--safe-vermilion: #D55E00; /* 朱色 - 赤の代替 */
--safe-sky: #56B4E9;       /* 空色 - 明るい青 */
--safe-green: #009E73;     /* 緑 - 黄緑寄り */
--safe-yellow: #F0E442;    /* 黄色 - 明るさ重視 */
--safe-purple: #CC79A7;    /* 紫 - 青とピンクの中間 */
```

### CSS変数定義（実装例）

```css
:root {
  /* ライトモード */
  --color-primary: var(--primary-500);
  --color-secondary: var(--secondary-500);
  --color-accent: var(--accent-500);
  --color-success: var(--success-500);
  --color-error: var(--error-500);
  --color-warning: var(--warning-500);
  --color-info: var(--info-500);

  --color-bg-primary: var(--bg-primary);
  --color-bg-secondary: var(--bg-secondary);
  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);

  /* シャドウ */
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.12);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.16);

  /* ボーダー */
  --border-color: var(--gray-200);
  --border-radius-sm: 8px;
  --border-radius-md: 12px;
  --border-radius-lg: 16px;
  --border-radius-full: 9999px;
}

/* ダークモード */
body.dark-mode {
  --color-primary: var(--primary-dark-500);
  --color-secondary: var(--secondary-dark-500);
  --color-accent: var(--accent-dark-500);
  --color-success: var(--success-dark-500);
  --color-error: var(--error-dark-500);
  --color-warning: var(--warning-dark-500);
  --color-info: var(--info-dark-500);

  --color-bg-primary: var(--bg-dark-primary);
  --color-bg-secondary: var(--bg-dark-secondary);
  --color-text-primary: var(--text-dark-primary);
  --color-text-secondary: var(--text-dark-secondary);

  /* シャドウ（ダークモードでは控えめに） */
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.5);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.6);

  --border-color: var(--gray-dark-700);
}

/* システム設定に追従 */
@media (prefers-color-scheme: dark) {
  :root:not(.light-mode) {
    /* ダークモードの変数定義と同じ */
  }
}
```

---

## タイポグラフィ

### フォントファミリー

#### 日本語

```css
--font-ja:
  "Hiragino Sans",
  "Hiragino Kaku Gothic ProN",
  "Yu Gothic UI",
  "Noto Sans JP",
  "Meiryo",
  sans-serif;
```

**選定理由**:
- 視認性の高い角ゴシック
- 小学生が読みやすい文字形状
- 主要OSでの標準フォント

#### 英語・数字

```css
--font-en:
  "Inter",
  "Segoe UI",
  "Roboto",
  -apple-system,
  BlinkMacSystemFont,
  sans-serif;
```

**選定理由**:
- モダンで読みやすい
- 数字の視認性が高い
- Webフォント（Inter）は軽量版を使用

#### 等幅フォント（タイピング表示用）

```css
--font-mono:
  "SF Mono",
  "Consolas",
  "Monaco",
  "Courier New",
  monospace;
```

**使用箇所**:
- タイピング入力中のプロンプト表示
- コード的な表現が必要な箇所

### フォントサイズスケール

基本サイズ16px（1rem）を基準に、Major Third（1.25）スケールを採用。

```css
/* フォントサイズ */
--text-xs: 0.75rem;    /* 12px - キャプション、注釈 */
--text-sm: 0.875rem;   /* 14px - 小さめのボディテキスト */
--text-base: 1rem;     /* 16px - 標準ボディテキスト */
--text-lg: 1.125rem;   /* 18px - 大きめのボディテキスト */
--text-xl: 1.25rem;    /* 20px - 小見出し */
--text-2xl: 1.5rem;    /* 24px - 見出しH3 */
--text-3xl: 1.875rem;  /* 30px - 見出しH2 */
--text-4xl: 2.25rem;   /* 36px - 見出しH1 */
--text-5xl: 3rem;      /* 48px - ヒーロー見出し */

/* タイピング専用サイズ */
--text-prompt: 2rem;   /* 32px - 問題表示（ひらがな・ローマ字） */
--text-hint: 1.25rem;  /* 20px - ヒント表示 */
```

### フォントウェイト

```css
--font-normal: 400;    /* 通常テキスト */
--font-medium: 500;    /* やや強調 */
--font-semibold: 600;  /* 見出し */
--font-bold: 700;      /* 強調見出し */
--font-black: 900;     /* 超強調（スコア表示など） */
```

### 行間・文字間

```css
/* 行間 */
--leading-tight: 1.25;   /* 見出し用 */
--leading-normal: 1.5;   /* 標準テキスト */
--leading-relaxed: 1.75; /* ゆったり */
--leading-loose: 2;      /* 読みやすさ重視（小学校低学年向け） */

/* 文字間 */
--tracking-tight: -0.02em;  /* 見出し用 */
--tracking-normal: 0;       /* 標準 */
--tracking-wide: 0.05em;    /* ひらがな表示用（読みやすさ向上） */
```

### テキストスタイル定義

```css
/* 見出し */
.text-h1 {
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
}

.text-h2 {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
}

.text-h3 {
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  line-height: var(--leading-normal);
}

/* ボディテキスト */
.text-body {
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
}

.text-body-large {
  font-size: var(--text-lg);
  font-weight: var(--font-normal);
  line-height: var(--leading-relaxed);
}

/* 小さいテキスト */
.text-caption {
  font-size: var(--text-sm);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
  color: var(--color-text-secondary);
}

/* タイピング専用 */
.text-prompt {
  font-size: var(--text-prompt);
  font-weight: var(--font-black);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-wide);
}

.text-hint {
  font-size: var(--text-hint);
  font-weight: var(--font-medium);
  line-height: var(--leading-normal);
  color: var(--color-text-secondary);
}
```

### アクセシビリティ考慮事項

1. **最小フォントサイズ**: 12px以上（--text-xs）
2. **コントラスト比**:
   - 本文テキスト: 4.5:1以上
   - 大きなテキスト（18pt/24px以上）: 3:1以上
3. **行間**: 1.5以上（WCAG 1.4.12）
4. **文字間**: 0.12em以上のカスタマイズ可能性を確保

---

## スペーシング

### スペーシングスケール

8pxベースのスペーシングシステム。一貫性と予測可能性を確保。

```css
--space-0: 0;
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
--space-20: 5rem;    /* 80px */
```

### 使用ガイドライン

| スペース | 用途 |
|---------|------|
| space-1 (4px) | アイコンとテキストの間隔 |
| space-2 (8px) | ボタン内パディング（小） |
| space-3 (12px) | カード内要素間の最小間隔 |
| space-4 (16px) | 標準パディング、マージン |
| space-6 (24px) | セクション内要素間の間隔 |
| space-8 (32px) | セクション間の間隔 |
| space-12 (48px) | 大きなセクション間の間隔 |
| space-16 (64px) | ページトップ・ボトムの余白 |

### レイアウトルール

1. **カード内パディング**: space-4 (16px)
2. **ボタンパディング**: space-3 (12px) × space-4 (16px)
3. **要素間マージン**: space-4 (16px) 基本
4. **セクション間マージン**: space-8 (32px) 以上

---

## コンポーネント

### 1. ボタン (Button)

#### バリエーション

```css
/* プライマリボタン */
.btn-primary {
  padding: var(--space-3) var(--space-5);
  border-radius: var(--border-radius-md);
  background: var(--color-primary);
  color: #FFFFFF;
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);
}

.btn-primary:hover {
  background: var(--primary-600);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

/* セカンダリボタン */
.btn-secondary {
  padding: var(--space-3) var(--space-5);
  border-radius: var(--border-radius-md);
  background: transparent;
  color: var(--color-primary);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  border: 2px solid var(--color-primary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: var(--primary-50);
}

/* 危険ボタン（リセット等） */
.btn-danger {
  padding: var(--space-3) var(--space-5);
  border-radius: var(--border-radius-md);
  background: var(--error-50);
  color: var(--error-700);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  border: 2px solid var(--error-500);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-danger:hover {
  background: var(--error-500);
  color: #FFFFFF;
}

/* チップボタン（プリセット等） */
.btn-chip {
  padding: var(--space-2) var(--space-4);
  border-radius: var(--border-radius-full);
  background: var(--gray-100);
  color: var(--color-text-primary);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-chip:hover {
  background: var(--gray-200);
}

.btn-chip.active {
  background: var(--primary-500);
  color: #FFFFFF;
  border-color: var(--primary-500);
}
```

#### サイズバリエーション

```css
.btn-sm { padding: var(--space-2) var(--space-3); font-size: var(--text-sm); }
.btn-md { padding: var(--space-3) var(--space-5); font-size: var(--text-base); }
.btn-lg { padding: var(--space-4) var(--space-6); font-size: var(--text-lg); }
```

#### アクセシビリティ

- 最小サイズ: 44×44px
- フォーカス表示: 3px solid outline + 4px offset
- キーボード操作: Tab（フォーカス）、Enter/Space（実行）
- aria-label: テキストのないボタンには必須

### 2. カード (Card)

```css
.card {
  background: var(--color-bg-primary);
  border-radius: var(--border-radius-lg);
  padding: var(--space-4);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: var(--shadow-lg);
}

/* カード内要素 */
.card-header {
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--border-color);
}

.card-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
}

.card-body {
  margin-bottom: var(--space-4);
}

.card-footer {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-4);
  padding-top: var(--space-3);
  border-top: 1px solid var(--border-color);
}
```

### 3. バッジ (Badge)

```css
/* 獲得バッジカード */
.badge-card {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--border-radius-md);
  border: 2px solid var(--border-color);
  background: var(--color-bg-secondary);
  transition: all 0.3s ease;
}

.badge-card.unlocked {
  border-color: var(--color-success);
  background: var(--success-50);
}

.badge-card.locked {
  opacity: 0.5;
  filter: grayscale(1);
}

/* バッジアイコン */
.badge-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--border-radius-full);
  background: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-2xl);
  flex-shrink: 0;
}

/* バッジ情報 */
.badge-info {
  flex: 1;
}

.badge-name {
  font-size: var(--text-base);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
}

.badge-desc {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin-top: var(--space-1);
}
```

### 4. プログレスバー (Progress Bar)

```css
.progress-bar {
  width: 100%;
  height: 12px;
  background: var(--gray-200);
  border-radius: var(--border-radius-full);
  overflow: hidden;
  position: relative;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
  border-radius: var(--border-radius-full);
  transition: width 0.5s ease;
  position: relative;
  overflow: hidden;
}

/* アニメーション効果 */
.progress-bar-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

### 5. 入力フィールド (Input)

```css
.input-field {
  padding: var(--space-3) var(--space-4);
  border-radius: var(--border-radius-md);
  border: 2px solid var(--border-color);
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-size: var(--text-lg);
  font-family: var(--font-mono);
  transition: all 0.2s ease;
  outline: none;
}

.input-field:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(33, 150, 243, 0.15);
}

.input-field::placeholder {
  color: var(--color-text-disabled);
}

/* タイピング専用入力（大きめ） */
.input-typing {
  padding: var(--space-4) var(--space-5);
  font-size: var(--text-xl);
  text-align: center;
  letter-spacing: var(--tracking-wide);
}
```

### 6. トースト通知 (Toast)

```css
.toast {
  position: fixed;
  bottom: var(--space-6);
  left: 50%;
  transform: translateX(-50%);
  padding: var(--space-3) var(--space-5);
  border-radius: var(--border-radius-md);
  background: rgba(0, 0, 0, 0.85);
  color: #FFFFFF;
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  box-shadow: var(--shadow-lg);
  backdrop-filter: blur(8px);
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.toast.success {
  background: rgba(76, 175, 80, 0.9);
}

.toast.error {
  background: rgba(239, 83, 80, 0.9);
}

.toast.info {
  background: rgba(3, 169, 244, 0.9);
}
```

### 7. モーダル (Modal)

```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;
}

.modal {
  background: var(--color-bg-primary);
  border-radius: var(--border-radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-lg);
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  transform: scale(0.9);
  animation: scaleIn 0.3s ease forwards;
}

@keyframes fadeIn {
  to { opacity: 1; }
}

@keyframes scaleIn {
  to { transform: scale(1); }
}

.modal-header {
  margin-bottom: var(--space-4);
}

.modal-title {
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
}

.modal-body {
  margin-bottom: var(--space-6);
}

.modal-footer {
  display: flex;
  gap: var(--space-3);
  justify-content: flex-end;
}
```

### 8. キーボードビジュアル (Keyboard Visual)

```css
.keyboard {
  padding: var(--space-4);
  border-radius: var(--border-radius-md);
  background: var(--gray-100);
  border: 1px solid var(--border-color);
}

.keyboard-row {
  display: flex;
  gap: var(--space-2);
  justify-content: center;
  margin-bottom: var(--space-2);
}

.keyboard-row:last-child {
  margin-bottom: 0;
}

.key {
  min-width: 40px;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--border-radius-sm);
  background: var(--color-bg-primary);
  border: 2px solid var(--border-color);
  text-align: center;
  font-size: var(--text-base);
  font-weight: var(--font-bold);
  transition: all 0.2s ease;
}

.key.active {
  background: var(--color-primary);
  color: #FFFFFF;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(33, 150, 243, 0.2);
  transform: scale(1.1);
}

.key.wide {
  min-width: 80px;
}
```

### 9. 統計カード (Stats Card)

```css
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-4);
}

.stat-card {
  padding: var(--space-4);
  border-radius: var(--border-radius-md);
  background: var(--color-bg-secondary);
  border: 1px solid var(--border-color);
  text-align: center;
}

.stat-label {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-2);
}

.stat-value {
  font-size: var(--text-4xl);
  font-weight: var(--font-black);
  color: var(--color-primary);
}

.stat-change {
  font-size: var(--text-sm);
  margin-top: var(--space-2);
}

.stat-change.positive {
  color: var(--color-success);
}

.stat-change.negative {
  color: var(--error-500);
}
```

---

## アニメーション

### 基本原則

1. **パフォーマンス重視**: transform と opacity のみアニメート
2. **60fps維持**: 16.67ms/フレーム以下
3. **ユーザー制御**: prefers-reduced-motion への対応必須
4. **適切な時間**: 短すぎず長すぎず（150-500ms）

### イージング関数

```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
--ease-elastic: cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

### アニメーション時間

```css
--duration-fast: 150ms;    /* ホバー、フォーカス */
--duration-base: 300ms;    /* 標準トランジション */
--duration-slow: 500ms;    /* ページ遷移 */
--duration-slower: 800ms;  /* セレブレーション */
```

### マイクロインタラクション

#### ボタンホバー

```css
.btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  transition: all var(--duration-fast) var(--ease-out);
}
```

#### ボタンクリック

```css
.btn:active {
  transform: translateY(0) scale(0.98);
  transition: all 100ms var(--ease-in);
}
```

#### カード浮き上がり

```css
.card {
  transition: transform var(--duration-base) var(--ease-out),
              box-shadow var(--duration-base) var(--ease-out);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
```

### セレブレーションアニメーション

#### 正解時

```css
@keyframes successPulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
}

.prompt.success {
  animation: successPulse 0.4s var(--ease-out);
}
```

#### 不正解時（振動）

```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-8px); }
  75% { transform: translateX(8px); }
}

.prompt.error {
  animation: shake 0.4s var(--ease-in-out);
}
```

#### バッジ獲得

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
  animation: badgeAppear 0.8s var(--ease-bounce);
}
```

#### レベルアップ

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

.level-up-message {
  animation: levelUp 0.8s var(--ease-out);
}
```

### ページ遷移

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
  animation: fadeInUp var(--duration-slow) var(--ease-out);
}
```

### ローディングアニメーション

```css
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  border: 3px solid var(--gray-200);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 0.8s linear infinite;
}
```

### アクセシビリティ対応

```css
/* アニメーション無効化設定 */
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

---

## アクセシビリティ

### WCAG 2.1 AA 準拠チェックリスト

#### 知覚可能 (Perceivable)

- [ ] **1.1.1 非テキストコンテンツ**: すべての画像・アイコンに代替テキスト
- [ ] **1.3.1 情報と関係性**: セマンティックHTML使用
- [ ] **1.4.1 色の使用**: 色だけで情報を伝えない
- [ ] **1.4.3 コントラスト**: 最低4.5:1（テキスト）、3:1（大きなテキスト）
- [ ] **1.4.4 テキストのリサイズ**: 200%拡大でもレイアウト維持
- [ ] **1.4.11 非テキストコントラスト**: UI要素は3:1以上

#### 操作可能 (Operable)

- [ ] **2.1.1 キーボード**: すべての機能がキーボードで操作可能
- [ ] **2.1.2 キーボードトラップなし**: フォーカスが閉じ込められない
- [ ] **2.2.1 タイミング調整可能**: タイムアウトなし、または調整可能
- [ ] **2.4.3 フォーカス順序**: 論理的なTab順序
- [ ] **2.4.7 フォーカスの可視化**: 明確なフォーカス表示
- [ ] **2.5.5 ターゲットサイズ**: 最低44×44px

#### 理解可能 (Understandable)

- [ ] **3.1.1 ページの言語**: lang属性設定
- [ ] **3.2.1 フォーカス時**: フォーカスで予期せぬ変化を起こさない
- [ ] **3.3.1 エラー特定**: エラー箇所を明確に指摘
- [ ] **3.3.2 ラベル/説明**: すべての入力欄にラベル

#### 堅牢 (Robust)

- [ ] **4.1.2 名前・役割・値**: ARIA属性の適切な使用
- [ ] **4.1.3 ステータスメッセージ**: aria-live使用

### フォーカス表示

```css
/* グローバルフォーカススタイル */
*:focus {
  outline: none; /* デフォルトを無効化 */
}

*:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: 4px;
}

/* ボタン用 */
button:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
  box-shadow: 0 0 0 6px rgba(33, 150, 243, 0.2);
}

/* 入力欄用 */
input:focus-visible,
select:focus-visible {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(33, 150, 243, 0.15);
  outline: none;
}
```

### ARIAラベル実装例

```html
<!-- セクション -->
<section aria-label="コース選択">
  <!-- コンテンツ -->
</section>

<!-- ボタン（アイコンのみ） -->
<button aria-label="バッジを表示">
  <span class="icon">🏅</span>
</button>

<!-- プログレスバー -->
<div role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar-fill" style="width: 75%"></div>
</div>

<!-- ライブリージョン（スコア更新等） -->
<div role="status" aria-live="polite" aria-atomic="true">
  残り10問、正解5、ミス2
</div>

<!-- 警告 -->
<div role="alert" aria-live="assertive">
  まちがい！
</div>
```

### キーボードナビゲーション

| キー | 機能 |
|------|------|
| Tab | 次の要素へフォーカス移動 |
| Shift+Tab | 前の要素へフォーカス移動 |
| Enter | ボタン実行、リンク遷移 |
| Space | ボタン実行、チェックボックストグル |
| Esc | モーダル閉じる、練習中断 |
| 矢印キー | リスト内移動（将来実装） |

---

## レスポンシブデザイン

### ブレークポイント

```css
/* モバイル優先 */
--breakpoint-sm: 640px;   /* スマートフォン横向き */
--breakpoint-md: 768px;   /* タブレット縦向き */
--breakpoint-lg: 1024px;  /* タブレット横向き、小型PC */
--breakpoint-xl: 1280px;  /* デスクトップ */
```

### レイアウトパターン

#### コンテナ

```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

@media (min-width: 768px) {
  .container {
    padding: 0 var(--space-6);
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 var(--space-8);
  }
}
```

#### グリッドシステム

```css
.grid {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .grid-2 { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 768px) {
  .grid-3 { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 1024px) {
  .grid-4 { grid-template-columns: repeat(4, 1fr); }
}
```

### タッチ対応

```css
/* タップターゲットサイズ */
@media (pointer: coarse) {
  .btn {
    min-height: 44px;
    min-width: 44px;
  }

  .key {
    min-width: 48px;
    padding: var(--space-3);
  }
}
```

---

## 実装優先順位

### フェーズ1（P1: 最優先）

1. **ライト/ダークモード切り替え**
   - CSS変数でテーマ定義
   - LocalStorageに設定保存
   - トグルボタン実装

2. **色覚異常対応強化**
   - 安全なカラーパレット適用
   - 色+形状+テキストの3重表示

3. **フォーカス表示強化**
   - :focus-visible スタイル
   - すべてのインタラクティブ要素に適用

4. **コントラスト比確認**
   - すべてのテキストで4.5:1確保
   - DevToolsで検証

### フェーズ2（P2: 高優先）

1. **アニメーション実装**
   - 正解/不正解フィードバック
   - バッジ獲得演出
   - ページ遷移

2. **コンポーネントライブラリ構築**
   - 再利用可能なパーツ化
   - 一貫したスタイル適用

3. **レスポンシブ最適化**
   - モバイル・タブレットでの快適な操作
   - タッチ対応強化

---

## まとめ

本デザインシステムは、「タイピングの森」が小学生にとって最高の学習体験を提供するための基盤です。実装チームは以下の点を常に意識してください。

1. **一貫性**: すべてのページ・コンポーネントで統一感を保つ
2. **アクセシビリティ**: 誰もが使えるデザイン
3. **パフォーマンス**: 軽快な動作
4. **拡張性**: 将来の機能追加に対応できる柔軟性

実装時の不明点は本ドキュメントを参照し、必要に応じてデザインレビューを実施してください。
