'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

// Web Vitals 타입 정의
interface WebVitalsMetric {
    name: string;
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
    description: string;
}

// 성능 메트릭 평가 함수
function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    const thresholds: Record<string, { good: number; poor: number }> = {
        LCP: { good: 2500, poor: 4000 },
        FID: { good: 100, poor: 300 },
        CLS: { good: 0.1, poor: 0.25 },
        FCP: { good: 1800, poor: 3000 },
        TTFB: { good: 800, poor: 1800 },
    };

    const threshold = thresholds[name];
    if (!threshold) return 'good';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
}

// Web Vitals 모니터링 컴포넌트
function WebVitalsMonitor() {
    const [metrics, setMetrics] = useState<WebVitalsMetric[]>([]);

    useEffect(() => {
        // Web Vitals API 사용
        if (typeof window !== 'undefined' && 'performance' in window) {
            // Navigation Timing API로 기본 메트릭 수집
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    console.log('Performance entry:', entry);
                }
            });

            observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] });

            // 시뮬레이션 메트릭 (실제로는 web-vitals 패키지 사용)
            setTimeout(() => {
                const simulatedMetrics: WebVitalsMetric[] = [
                    {
                        name: 'LCP',
                        value: 2200,
                        rating: getRating('LCP', 2200),
                        description: 'Largest Contentful Paint - 가장 큰 콘텐츠 렌더링 시간',
                    },
                    {
                        name: 'FID',
                        value: 80,
                        rating: getRating('FID', 80),
                        description: 'First Input Delay - 첫 입력 지연 시간',
                    },
                    {
                        name: 'CLS',
                        value: 0.05,
                        rating: getRating('CLS', 0.05),
                        description: 'Cumulative Layout Shift - 누적 레이아웃 이동',
                    },
                    {
                        name: 'FCP',
                        value: 1500,
                        rating: getRating('FCP', 1500),
                        description: 'First Contentful Paint - 첫 콘텐츠 렌더링',
                    },
                    {
                        name: 'TTFB',
                        value: 600,
                        rating: getRating('TTFB', 600),
                        description: 'Time to First Byte - 첫 바이트까지의 시간',
                    },
                ];
                setMetrics(simulatedMetrics);
            }, 1000);
        }
    }, []);

    const getRatingColor = (rating: string) => {
        switch (rating) {
            case 'good':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'needs-improvement':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'poor':
                return 'bg-red-100 text-red-800 border-red-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const getRatingEmoji = (rating: string) => {
        switch (rating) {
            case 'good':
                return '✅';
            case 'needs-improvement':
                return '⚠️';
            case 'poor':
                return '❌';
            default:
                return '⭐';
        }
    };

    const formatValue = (name: string, value: number) => {
        if (name === 'CLS') return value.toFixed(3);
        return `${Math.round(value)}ms`;
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                🔬 Web Vitals 실시간 모니터링
            </h2>

            {metrics.length === 0 ? (
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">성능 데이터 수집 중...</p>
                    </div>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {metrics.map((metric) => (
                        <div
                            key={metric.name}
                            className={`border-2 rounded-lg p-4 ${getRatingColor(metric.rating)}`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-2xl font-bold">{metric.name}</span>
                                <span className="text-2xl">{getRatingEmoji(metric.rating)}</span>
                            </div>
                            <div className="text-3xl font-bold mb-2">
                                {formatValue(metric.name, metric.value)}
                            </div>
                            <div className="text-sm opacity-80">{metric.description}</div>
                            <div className="mt-3 text-xs font-semibold uppercase">
                                {metric.rating === 'good' && 'Good'}
                                {metric.rating === 'needs-improvement' && 'Needs Improvement'}
                                {metric.rating === 'poor' && 'Poor'}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">📦 패키지 설치</h3>
                <pre className="bg-blue-100 p-2 rounded text-sm text-blue-900">
                    npm install web-vitals
                </pre>
            </div>
        </div>
    );
}

// Lighthouse 점수 시각화
function LighthouseScore() {
    const scores = [
        { name: 'Performance', score: 92, color: 'text-green-600' },
        { name: 'Accessibility', score: 95, color: 'text-green-600' },
        { name: 'Best Practices', score: 87, color: 'text-yellow-600' },
        { name: 'SEO', score: 100, color: 'text-green-600' },
    ];

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'bg-green-500';
        if (score >= 50) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                🚦 Lighthouse 성능 점수
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {scores.map((item) => (
                    <div key={item.name} className="text-center">
                        <div className="relative w-32 h-32 mx-auto mb-3">
                            <svg className="transform -rotate-90 w-32 h-32">
                                <circle
                                    cx="64"
                                    cy="64"
                                    r="56"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="transparent"
                                    className="text-gray-200"
                                />
                                <circle
                                    cx="64"
                                    cy="64"
                                    r="56"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="transparent"
                                    strokeDasharray={`${2 * Math.PI * 56}`}
                                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - item.score / 100)}`}
                                    className={item.color}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-3xl font-bold">{item.score}</span>
                            </div>
                        </div>
                        <div className="font-semibold text-gray-900">{item.name}</div>
                    </div>
                ))}
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">💡 Lighthouse 실행 방법</h3>
                <div className="space-y-2 text-sm text-gray-700">
                    <div>1. Chrome DevTools → Lighthouse 탭</div>
                    <div>2. 측정 항목 선택 (Performance, Accessibility 등)</div>
                    <div>3. "Analyze page load" 클릭</div>
                    <div className="mt-3 p-2 bg-white rounded border">
                        <code className="text-xs">
                            # CLI로 실행<br />
                            npm install -g lighthouse<br />
                            lighthouse https://your-site.com --view
                        </code>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Bundle Analyzer 시각화
function BundleAnalyzer() {
    const bundles = [
        { name: 'main.js', size: 245, color: 'bg-blue-500' },
        { name: 'vendor.js', size: 850, color: 'bg-purple-500' },
        { name: 'chunks/*.js', size: 120, color: 'bg-green-500' },
        { name: 'styles.css', size: 45, color: 'bg-yellow-500' },
    ];

    const totalSize = bundles.reduce((sum, b) => sum + b.size, 0);

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                📦 Bundle Size Analysis
            </h2>

            {/* 번들 크기 바 차트 */}
            <div className="mb-6">
                <div className="flex h-16 rounded-lg overflow-hidden border-2 border-gray-200">
                    {bundles.map((bundle) => (
                        <div
                            key={bundle.name}
                            className={`${bundle.color} flex items-center justify-center text-white text-xs font-semibold`}
                            style={{ width: `${(bundle.size / totalSize) * 100}%` }}
                        >
                            {bundle.size}KB
                        </div>
                    ))}
                </div>
                <div className="text-right mt-2 text-sm text-gray-600">
                    Total: <span className="font-bold">{totalSize}KB</span>
                </div>
            </div>

            {/* 번들 상세 정보 */}
            <div className="space-y-2 mb-6">
                {bundles.map((bundle) => (
                    <div key={bundle.name} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded ${bundle.color}`}></div>
                            <span className="font-mono text-sm">{bundle.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">
                                {((bundle.size / totalSize) * 100).toFixed(1)}%
                            </span>
                            <span className="font-bold">{bundle.size}KB</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* 설정 방법 */}
            <div className="bg-indigo-50 rounded-lg p-4">
                <h3 className="font-semibold text-indigo-900 mb-2">⚙️ Bundle Analyzer 설정</h3>
                <div className="space-y-3">
                    <div>
                        <p className="text-sm text-indigo-800 mb-2">1. 패키지 설치</p>
                        <pre className="bg-indigo-100 p-2 rounded text-xs text-indigo-900">
                            npm install -D @next/bundle-analyzer
                        </pre>
                    </div>
                    <div>
                        <p className="text-sm text-indigo-800 mb-2">2. next.config.js 설정</p>
                        <pre className="bg-indigo-100 p-2 rounded text-xs text-indigo-900 overflow-x-auto">
{`const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // your next config
})`}
                        </pre>
                    </div>
                    <div>
                        <p className="text-sm text-indigo-800 mb-2">3. 분석 실행</p>
                        <pre className="bg-indigo-100 p-2 rounded text-xs text-indigo-900">
                            ANALYZE=true npm run build
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function PerformanceAnalysisPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white p-8">
            <div className="max-w-6xl mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center text-cyan-600 hover:text-cyan-700 mb-6"
                >
                    ← 홈으로 돌아가기
                </Link>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    📊 성능 분석 & 최적화
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    Lighthouse, Web Vitals, Bundle Analyzer를 활용한 성능 모니터링
                </p>

                {/* 개요 */}
                <div className="bg-cyan-50 border-l-4 border-cyan-500 p-6 mb-8">
                    <h2 className="text-lg font-semibold text-cyan-900 mb-3">
                        ✨ 성능 분석의 3가지 축
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4 text-cyan-800">
                        <div>
                            <h3 className="font-semibold mb-2">🚦 Lighthouse</h3>
                            <ul className="space-y-1 text-sm">
                                <li>• 종합 성능 점수</li>
                                <li>• 접근성, SEO 평가</li>
                                <li>• 개선 권장사항</li>
                                <li>• CI/CD 통합 가능</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">🔬 Web Vitals</h3>
                            <ul className="space-y-1 text-sm">
                                <li>• 실사용자 경험 측정</li>
                                <li>• LCP, FID, CLS</li>
                                <li>• 실시간 모니터링</li>
                                <li>• Google 검색 순위</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">📦 Bundle Analyzer</h3>
                            <ul className="space-y-1 text-sm">
                                <li>• 번들 크기 시각화</li>
                                <li>• 불필요한 의존성 발견</li>
                                <li>• Code splitting 최적화</li>
                                <li>• Tree shaking 확인</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Web Vitals 모니터 */}
                <WebVitalsMonitor />

                {/* Lighthouse 점수 */}
                <LighthouseScore />

                {/* Bundle Analyzer */}
                <BundleAnalyzer />

                {/* 코드 예제 1: Web Vitals 측정 */}
                <div className="bg-gray-900 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">1️⃣ Web Vitals 측정 코드</h3>
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`// app/layout.tsx
import { Suspense } from 'react';
import { WebVitals } from './web-vitals';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Suspense>
          <WebVitals />
        </Suspense>
      </body>
    </html>
  );
}

// web-vitals.tsx
'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    console.log(metric);
    
    // Analytics로 전송
    if (window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(
          metric.name === 'CLS' ? metric.value * 1000 : metric.value
        ),
        event_label: metric.id,
        non_interaction: true,
      });
    }
    
    // 커스텀 API로 전송
    fetch('/api/analytics', {
      method: 'POST',
      body: JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
      }),
    });
  });
  
  return null;
}

// 또는 web-vitals 패키지 직접 사용
import { onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  const body = JSON.stringify(metric);
  const url = '/api/analytics';
  
  // Navigator.sendBeacon 사용 (페이지 종료 시에도 전송 보장)
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
  } else {
    fetch(url, { body, method: 'POST', keepalive: true });
  }
}

onCLS(sendToAnalytics);
onFID(sendToAnalytics);
onLCP(sendToAnalytics);
onFCP(sendToAnalytics);
onTTFB(sendToAnalytics);`}
                    </pre>
                </div>

                {/* 코드 예제 2: Lighthouse CI */}
                <div className="bg-gray-900 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">2️⃣ Lighthouse CI 설정</h3>
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`// .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli
          lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: \${{ secrets.LHCI_GITHUB_APP_TOKEN }}

// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      staticDistDir: './out',
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/about',
      ],
      numberOfRuns: 3,
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.95 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};`}
                    </pre>
                </div>

                {/* 코드 예제 3: Performance API */}
                <div className="bg-gray-900 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-white mb-4">3️⃣ Performance API 활용</h3>
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`// 커스텀 성능 측정
function measurePerformance() {
  // 1. Navigation Timing
  const perfData = performance.getEntriesByType('navigation')[0];
  console.log('DNS Lookup:', perfData.domainLookupEnd - perfData.domainLookupStart);
  console.log('TCP Connection:', perfData.connectEnd - perfData.connectStart);
  console.log('Time to First Byte:', perfData.responseStart - perfData.requestStart);
  console.log('DOM Interactive:', perfData.domInteractive - perfData.fetchStart);
  console.log('DOM Complete:', perfData.domComplete - perfData.fetchStart);
  console.log('Load Complete:', perfData.loadEventEnd - perfData.fetchStart);
  
  // 2. Resource Timing
  const resources = performance.getEntriesByType('resource');
  resources.forEach((resource) => {
    console.log(\`\${resource.name}: \${resource.duration}ms\`);
  });
  
  // 3. User Timing (커스텀 측정)
  performance.mark('api-fetch-start');
  
  fetch('/api/data')
    .then(response => response.json())
    .then(data => {
      performance.mark('api-fetch-end');
      performance.measure('api-fetch', 'api-fetch-start', 'api-fetch-end');
      
      const measure = performance.getEntriesByName('api-fetch')[0];
      console.log('API Fetch Time:', measure.duration);
    });
  
  // 4. Long Tasks 감지
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.warn('Long Task detected:', entry.duration);
      // 50ms 이상 걸리는 작업 추적
      if (entry.duration > 50) {
        // Analytics로 전송
      }
    }
  });
  
  observer.observe({ entryTypes: ['longtask'] });
  
  // 5. Layout Shift 감지
  const layoutShiftObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        console.log('Layout Shift:', entry.value);
      }
    }
  });
  
  layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });
}

// React 컴포넌트에서 사용
function MyComponent() {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      console.log('Component lifetime:', endTime - startTime);
    };
  }, []);
  
  return <div>...</div>;
}`}
                    </pre>
                </div>

                {/* 최적화 체크리스트 */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                        ✅ 성능 최적화 체크리스트
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3">번들 최적화</h4>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600">✓</span>
                                    <span>Dynamic Import로 Code Splitting</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600">✓</span>
                                    <span>Tree Shaking 활용</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600">✓</span>
                                    <span>불필요한 라이브러리 제거</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600">✓</span>
                                    <span>Minification & Compression</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3">이미지 최적화</h4>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600">✓</span>
                                    <span>Next.js Image 컴포넌트 사용</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600">✓</span>
                                    <span>WebP/AVIF 포맷 사용</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600">✓</span>
                                    <span>Lazy Loading 적용</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600">✓</span>
                                    <span>적절한 크기와 해상도</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3">렌더링 최적화</h4>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600">✓</span>
                                    <span>React.memo로 불필요한 리렌더링 방지</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600">✓</span>
                                    <span>useMemo, useCallback 활용</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600">✓</span>
                                    <span>Virtualization (react-window)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600">✓</span>
                                    <span>Suspense & Streaming SSR</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3">네트워크 최적화</h4>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600">✓</span>
                                    <span>CDN 사용</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600">✓</span>
                                    <span>HTTP/2 & HTTP/3</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600">✓</span>
                                    <span>Preload & Prefetch</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-600">✓</span>
                                    <span>캐싱 전략 (SWR, React Query)</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 성능 목표 */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border-2 border-green-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                        🎯 성능 목표 기준
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white rounded p-4">
                            <h4 className="font-semibold text-gray-900 mb-3">Web Vitals 목표</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex justify-between">
                                    <span>LCP (Largest Contentful Paint)</span>
                                    <span className="font-bold text-green-600">&lt; 2.5s</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>FID (First Input Delay)</span>
                                    <span className="font-bold text-green-600">&lt; 100ms</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>CLS (Cumulative Layout Shift)</span>
                                    <span className="font-bold text-green-600">&lt; 0.1</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-white rounded p-4">
                            <h4 className="font-semibold text-gray-900 mb-3">Bundle Size 목표</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex justify-between">
                                    <span>First Load JS</span>
                                    <span className="font-bold text-blue-600">&lt; 200KB</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Page JS</span>
                                    <span className="font-bold text-blue-600">&lt; 50KB</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>Total Size</span>
                                    <span className="font-bold text-blue-600">&lt; 1MB</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
