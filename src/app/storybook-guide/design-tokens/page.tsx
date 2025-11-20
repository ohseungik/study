import Link from 'next/link';

export default function DesignTokensPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto p-6">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Design Tokens 통합</h1>
                    <p className="text-gray-600 mb-4">
                        디자인 토큰을 Storybook에서 시각화하고 문서화합니다.
                    </p>
                    <Link href="/storybook-guide" className="text-blue-600 hover:text-blue-800">
                        ← Storybook 가이드로 돌아가기
                    </Link>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-bold mb-3 text-blue-900">🎨 Design Tokens란?</h2>
                    <p className="text-blue-800 mb-3">
                        디자인 시스템의 시각적 속성(색상, 타이포그래피, 간격 등)을 
                        재사용 가능한 변수로 정의한 것입니다.
                    </p>
                    <div className="grid md:grid-cols-3 gap-3 text-sm">
                        <div className="bg-white p-3 rounded">
                            <strong className="text-blue-900">일관성</strong>
                            <p className="text-gray-600">모든 플랫폼 동일</p>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <strong className="text-blue-900">확장성</strong>
                            <p className="text-gray-600">중앙 관리</p>
                        </div>
                        <div className="bg-white p-3 rounded">
                            <strong className="text-blue-900">협업</strong>
                            <p className="text-gray-600">디자인-개발 동기화</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <h3 className="font-semibold mb-4">🏗️ Token 구조 정의</h3>
                    <div className="bg-gray-50 p-4 rounded font-mono text-xs overflow-x-auto">
                        <pre>{`// tokens/colors.ts
export const colors = {
  // Primary Palette
  primary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6', // Main
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },
  
  // Secondary Palette
  secondary: {
    50: '#F5F3FF',
    500: '#8B5CF6',
    900: '#4C1D95',
  },
  
  // Semantic Colors
  semantic: {
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
  
  // Neutral Colors
  neutral: {
    white: '#FFFFFF',
    black: '#000000',
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },
};

// tokens/typography.ts
export const typography = {
  fontFamily: {
    sans: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"Fira Code", Consolas, Monaco, "Courier New", monospace',
  },
  
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
  },
  
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// tokens/spacing.ts
export const spacing = {
  0: '0',
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  5: '1.25rem',  // 20px
  6: '1.5rem',   // 24px
  8: '2rem',     // 32px
  10: '2.5rem',  // 40px
  12: '3rem',    // 48px
  16: '4rem',    // 64px
};

// tokens/borderRadius.ts
export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  full: '9999px',
};

// tokens/shadows.ts
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};`}</pre>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <h3 className="font-semibold mb-4">📚 Storybook에서 Tokens 문서화</h3>
                    <div className="bg-gray-50 p-4 rounded font-mono text-xs overflow-x-auto">
                        <pre>{`// tokens.stories.mdx
import { Meta, ColorPalette, ColorItem, Typeset } from '@storybook/blocks';
import { colors, typography, spacing } from '../tokens';

<Meta title="Design System/Tokens" />

# Design Tokens

디자인 시스템의 핵심 토큰들입니다.

## Colors

### Primary Colors
<ColorPalette>
  <ColorItem
    title="Primary"
    subtitle="브랜드 메인 컬러"
    colors={{
      50: colors.primary[50],
      100: colors.primary[100],
      200: colors.primary[200],
      300: colors.primary[300],
      400: colors.primary[400],
      500: colors.primary[500],
      600: colors.primary[600],
      700: colors.primary[700],
      800: colors.primary[800],
      900: colors.primary[900],
    }}
  />
</ColorPalette>

### Semantic Colors
<ColorPalette>
  <ColorItem
    title="Success"
    subtitle="성공 상태"
    colors={{ Success: colors.semantic.success }}
  />
  <ColorItem
    title="Warning"
    subtitle="경고 상태"
    colors={{ Warning: colors.semantic.warning }}
  />
  <ColorItem
    title="Error"
    subtitle="오류 상태"
    colors={{ Error: colors.semantic.error }}
  />
  <ColorItem
    title="Info"
    subtitle="정보 상태"
    colors={{ Info: colors.semantic.info }}
  />
</ColorPalette>

## Typography

<Typeset
  fontFamily={typography.fontFamily.sans}
  fontSizes={[
    Number(typography.fontSize.xs.replace('rem', '')) * 16,
    Number(typography.fontSize.sm.replace('rem', '')) * 16,
    Number(typography.fontSize.base.replace('rem', '')) * 16,
    Number(typography.fontSize.lg.replace('rem', '')) * 16,
    Number(typography.fontSize.xl.replace('rem', '')) * 16,
  ]}
  fontWeight={typography.fontWeight.normal}
  sampleText="The quick brown fox jumps over the lazy dog"
/>

## Spacing Scale

| Token | Value | Example |
|-------|-------|---------|
| spacing.1 | 4px | □ |
| spacing.2 | 8px | □□ |
| spacing.4 | 16px | □□□□ |
| spacing.8 | 32px | □□□□□□□□ |

## Border Radius

| Token | Value | Preview |
|-------|-------|---------|
| none | 0 | ▪️ |
| sm | 2px | ▫️ |
| base | 4px | ◽ |
| lg | 8px | ◻️ |
| full | 9999px | ⚪ |`}</pre>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-3">🎨 Token Visualizer 컴포넌트</h3>
                        <div className="bg-gray-50 p-3 rounded font-mono text-xs overflow-x-auto">
                            <pre>{`// ColorGrid.tsx
interface ColorGridProps {
  colors: Record<string, string>;
  title: string;
}

export const ColorGrid: React.FC<ColorGridProps> = ({ 
  colors, 
  title 
}) => (
  <div className="mb-6">
    <h3 className="font-bold mb-3">{title}</h3>
    <div className="grid grid-cols-5 gap-2">
      {Object.entries(colors).map(([key, value]) => (
        <div key={key} className="text-center">
          <div
            className="w-full h-16 rounded-lg shadow-sm mb-2"
            style={{ backgroundColor: value }}
          />
          <div className="text-xs font-mono">
            <div className="font-semibold">{key}</div>
            <div className="text-gray-600">{value}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// TokenTable.tsx
interface TokenTableProps {
  tokens: Record<string, any>;
  category: string;
}

export const TokenTable: React.FC<TokenTableProps> = ({ 
  tokens, 
  category 
}) => (
  <div className="overflow-x-auto">
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 text-left">Token</th>
          <th className="p-2 text-left">Value</th>
          <th className="p-2 text-left">Usage</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(tokens).map(([key, value]) => (
          <tr key={key} className="border-t">
            <td className="p-2 font-mono text-sm">
              {category}.{key}
            </td>
            <td className="p-2 font-mono text-sm text-gray-600">
              {String(value)}
            </td>
            <td className="p-2 text-sm">
              Example usage description
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);`}</pre>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-3">📖 Token Story 예제</h3>
                        <div className="bg-gray-50 p-3 rounded font-mono text-xs overflow-x-auto">
                            <pre>{`// tokens.stories.tsx
import type { Meta } from '@storybook/react';
import { ColorGrid, TokenTable } from './components';
import { colors, spacing, typography } from './tokens';

const meta: Meta = {
  title: 'Design System/Tokens',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Colors = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-8">
      Color Tokens
    </h1>
    
    <ColorGrid 
      title="Primary" 
      colors={colors.primary} 
    />
    
    <ColorGrid 
      title="Semantic" 
      colors={colors.semantic} 
    />
  </div>
);

export const Spacing = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-8">
      Spacing Tokens
    </h1>
    
    <TokenTable 
      tokens={spacing} 
      category="spacing" 
    />
  </div>
);

export const Typography = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-8">
      Typography Tokens
    </h1>
    
    <TokenTable 
      tokens={typography.fontSize} 
      category="typography.fontSize" 
    />
  </div>
);`}</pre>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <h3 className="font-semibold mb-4">🔄 Figma → Storybook 자동 동기화</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-medium mb-2 text-gray-700">1. Style Dictionary 설정</h4>
                            <div className="bg-gray-50 p-3 rounded font-mono text-xs">
                                <pre>{`// style-dictionary.config.js
module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    ts: {
      transformGroup: 'js',
      buildPath: 'src/tokens/',
      files: [{
        destination: 'index.ts',
        format: 'javascript/es6',
      }]
    },
    css: {
      transformGroup: 'css',
      buildPath: 'src/styles/',
      files: [{
        destination: 'variables.css',
        format: 'css/variables',
      }]
    }
  }
};`}</pre>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2 text-gray-700">2. Figma Tokens Plugin</h4>
                            <div className="bg-gray-50 p-3 rounded font-mono text-xs">
                                <pre>{`// tokens/colors.json
{
  "color": {
    "primary": {
      "500": {
        "value": "#3B82F6",
        "type": "color",
        "description": "Main brand color"
      }
    }
  }
}

// 빌드 스크립트
{
  "scripts": {
    "build:tokens": "style-dictionary build",
    "sync:figma": "figma-tokens sync"
  }
}`}</pre>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-3">🎯 Token 사용 예제</h3>
                        <div className="bg-gray-50 p-3 rounded font-mono text-xs overflow-x-auto">
                            <pre>{`// Button.tsx
import { colors, spacing, borderRadius } from '@/tokens';

export const Button = styled.button\`
  background-color: \${colors.primary[500]};
  padding: \${spacing[3]} \${spacing[6]};
  border-radius: \${borderRadius.lg};
  
  &:hover {
    background-color: \${colors.primary[600]};
  }
  
  &:disabled {
    background-color: \${colors.neutral.gray[300]};
  }
\`;

// CSS Variables 사용
const Button = () => (
  <button style={{
    backgroundColor: 'var(--color-primary-500)',
    padding: 'var(--spacing-3) var(--spacing-6)',
    borderRadius: 'var(--border-radius-lg)',
  }}>
    Click me
  </button>
);

// Tailwind 통합
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: colors,
      spacing: spacing,
      borderRadius: borderRadius,
    }
  }
};`}</pre>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm border p-6">
                        <h3 className="font-semibold mb-3">📱 다크모드 Token</h3>
                        <div className="bg-gray-50 p-3 rounded font-mono text-xs overflow-x-auto">
                            <pre>{`// tokens/themes.ts
export const lightTheme = {
  background: {
    primary: colors.neutral.white,
    secondary: colors.neutral.gray[50],
    tertiary: colors.neutral.gray[100],
  },
  text: {
    primary: colors.neutral.gray[900],
    secondary: colors.neutral.gray[600],
  },
};

export const darkTheme = {
  background: {
    primary: colors.neutral.gray[900],
    secondary: colors.neutral.gray[800],
    tertiary: colors.neutral.gray[700],
  },
  text: {
    primary: colors.neutral.white,
    secondary: colors.neutral.gray[300],
  },
};

// Storybook에서 테마 전환
export const parameters = {
  backgrounds: {
    values: [
      { name: 'Light', value: lightTheme.background.primary },
      { name: 'Dark', value: darkTheme.background.primary },
    ],
  },
};`}</pre>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <h3 className="font-semibold text-green-900 mb-3">✅ Best Practices</h3>
                        <ul className="space-y-2 text-sm text-green-800">
                            <li>✓ 의미 있는 토큰 이름</li>
                            <li>✓ 계층 구조로 조직화</li>
                            <li>✓ Semantic 토큰 활용</li>
                            <li>✓ 문서에 사용 예제</li>
                            <li>✓ 접근성 기준 준수</li>
                            <li>✓ 버전 관리</li>
                        </ul>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h3 className="font-semibold text-blue-900 mb-3">🔧 도구 추천</h3>
                        <ul className="space-y-2 text-sm text-blue-800">
                            <li>• Style Dictionary</li>
                            <li>• Figma Tokens Plugin</li>
                            <li>• Theo (Salesforce)</li>
                            <li>• Design Tokens W3C</li>
                            <li>• Token Studio</li>
                        </ul>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                        <h3 className="font-semibold text-purple-900 mb-3">📊 Token 카테고리</h3>
                        <ul className="space-y-2 text-sm text-purple-800">
                            <li>• Colors</li>
                            <li>• Typography</li>
                            <li>• Spacing</li>
                            <li>• Border Radius</li>
                            <li>• Shadows</li>
                            <li>• Z-Index</li>
                            <li>• Breakpoints</li>
                            <li>• Animations</li>
                        </ul>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                    <h3 className="font-semibold mb-4">🚀 Token 관리 워크플로우</h3>
                    <div className="grid md:grid-cols-4 gap-3 text-sm">
                        <div className="bg-blue-50 p-4 rounded border-2 border-blue-200">
                            <div className="font-bold text-blue-900 mb-2">1. 정의</div>
                            <p className="text-blue-800">Figma에서 디자인 토큰 정의</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded border-2 border-green-200">
                            <div className="font-bold text-green-900 mb-2">2. 추출</div>
                            <p className="text-green-800">Tokens Plugin으로 JSON 추출</p>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded border-2 border-yellow-200">
                            <div className="font-bold text-yellow-900 mb-2">3. 변환</div>
                            <p className="text-yellow-800">Style Dictionary로 빌드</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded border-2 border-purple-200">
                            <div className="font-bold text-purple-900 mb-2">4. 문서화</div>
                            <p className="text-purple-800">Storybook에 시각화</p>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="font-semibold text-yellow-900 mb-3">💡 실전 팁</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-800">
                        <div>
                            <strong>Semantic vs Primitive</strong>
                            <p className="mt-1">Primitive 토큰(blue-500)보다 Semantic 토큰(primary-color)을 사용하면 테마 변경이 쉬움</p>
                        </div>
                        <div>
                            <strong>Token 네이밍</strong>
                            <p className="mt-1">일관된 네이밍 규칙 사용: category-property-variant-state</p>
                        </div>
                        <div>
                            <strong>문서화 자동화</strong>
                            <p className="mt-1">CI/CD에서 토큰 변경 시 자동으로 Storybook 재빌드</p>
                        </div>
                        <div>
                            <strong>버전 관리</strong>
                            <p className="mt-1">Breaking change 시 Major 버전 업데이트 (Semver)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
