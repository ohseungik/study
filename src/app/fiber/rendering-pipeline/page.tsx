'use client';

import { useState, useEffect } from 'react';
import ReactFlow, { Node, Edge, Controls, Background, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import Link from 'next/link';

const steps = [
    { id: '1', label: '1. 업데이트 트리거\n(setState, props 변경)', color: '#f56565' },
    { id: '2', label: '2. 스케줄링\n(우선순위 할당)', color: '#ed8936' },
    { id: '3', label: '3. Reconciliation\n(가상 DOM 비교)', color: '#ecc94b' },
    { id: '4', label: '4. Effects 표시\n(변경사항 기록)', color: '#48bb78' },
    { id: '5', label: '5. Work 완료\n(Render Phase 종료)', color: '#38b2ac' },
    { id: '6', label: '6. Before Mutation\n(DOM 변경 전)', color: '#4299e1' },
    { id: '7', label: '7. Mutation\n(실제 DOM 업데이트)', color: '#667eea' },
    { id: '8', label: '8. Layout Effects\n(useLayoutEffect)', color: '#9f7aea' },
    { id: '9', label: '9. Passive Effects\n(useEffect)', color: '#ed64a6' },
    { id: '10', label: '10. 완료\n(화면 업데이트)', color: '#38a169' },
];

export default function RenderingPipelineVisualization() {
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (!isPlaying) return;
        const interval = setInterval(() => {
            setCurrentStep((prev) => (prev >= steps.length - 1 ? 0 : prev + 1));
        }, 1500);
        return () => clearInterval(interval);
    }, [isPlaying]);

    const nodes: Node[] = steps.map((step, index) => ({
        id: step.id,
        type: 'default',
        data: { label: step.label },
        position: { x: 500, y: index * 150 + 50 },
        style: {
            background: index === currentStep ? step.color : index < currentStep ? '#cbd5e0' : '#f7fafc',
            color: index <= currentStep ? 'white' : '#4a5568',
            border: index === currentStep ? '3px solid #000' : '2px solid #e2e8f0',
            borderRadius: '12px',
            padding: '20px',
            width: 300,
            fontSize: '14px',
            fontWeight: index === currentStep ? 'bold' : 'normal',
            textAlign: 'center',
        },
    }));

    const edges: Edge[] = steps.slice(0, -1).map((step, index) => ({
        id: `e${index}`,
        source: step.id,
        target: steps[index + 1].id,
        type: 'smoothstep',
        animated: index === currentStep,
        label: index === currentStep ? '진행 중' : index === 4 ? 'Phase 전환' : '',
        style: {
            stroke: index === currentStep ? '#000' : index < currentStep ? '#718096' : '#e2e8f0',
            strokeWidth: index === currentStep ? 4 : 2,
            strokeDasharray: index === 4 ? '5,5' : '0',
        },
        markerEnd: {
            type: MarkerType.ArrowClosed,
            color: index === currentStep ? '#000' : index < currentStep ? '#718096' : '#e2e8f0',
        },
    }));

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <div className="p-6 bg-white border-b">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold mb-2">렌더링 파이프라인 시각화</h1>
                    <p className="text-gray-600 mb-4">
                        React Fiber의 렌더링 과정을 단계별로 시각화합니다. 
                        자동 재생 기능을 통해 각 단계의 흐름을 확인할 수 있습니다.
                    </p>
                    <Link href="/fiber" className="text-blue-600 hover:text-blue-800">← Fiber 예제로 돌아가기</Link>
                </div>
            </div>

            <div className="flex-1 flex">
                <div className="w-80 p-6 bg-white border-r overflow-y-auto">
                    <h2 className="text-xl font-bold mb-4">렌더링 파이프라인 단계</h2>
                    
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-lg mb-2 text-red-600">🔴 Render Phase (1-5단계)</h3>
                            <p className="text-sm text-gray-600 mb-3">
                                비동기적으로 실행되며 중단 가능한 단계입니다. 
                                실제 DOM에 영향을 주지 않으므로 언제든 멈추거나 재시작할 수 있습니다.
                            </p>
                            <ul className="text-sm space-y-2">
                                <li className="pl-3 border-l-2 border-red-300">
                                    <strong>1. 업데이트 트리거:</strong> setState, props 변경 등으로 리렌더링 시작
                                </li>
                                <li className="pl-3 border-l-2 border-orange-300">
                                    <strong>2. 스케줄링:</strong> 업데이트 우선순위 할당 (긴급/일반)
                                </li>
                                <li className="pl-3 border-l-2 border-yellow-300">
                                    <strong>3. Reconciliation:</strong> 가상 DOM 비교로 변경사항 계산
                                </li>
                                <li className="pl-3 border-l-2 border-green-300">
                                    <strong>4. Effects 표시:</strong> 변경이 필요한 노드 마킹
                                </li>
                                <li className="pl-3 border-l-2 border-teal-300">
                                    <strong>5. Work 완료:</strong> Render Phase 종료, Commit 준비
                                </li>
                            </ul>
                        </div>

                        <div className="pt-4 border-t">
                            <h3 className="font-semibold text-lg mb-2 text-blue-600">🔵 Commit Phase (6-10단계)</h3>
                            <p className="text-sm text-gray-600 mb-3">
                                동기적으로 실행되며 중단 불가능한 단계입니다. 
                                실제 DOM을 변경하고 사이드 이펙트를 실행합니다.
                            </p>
                            <ul className="text-sm space-y-2">
                                <li className="pl-3 border-l-2 border-blue-300">
                                    <strong>6. Before Mutation:</strong> DOM 변경 전 스냅샷 저장
                                </li>
                                <li className="pl-3 border-l-2 border-indigo-300">
                                    <strong>7. Mutation:</strong> 실제 DOM에 변경사항 적용
                                </li>
                                <li className="pl-3 border-l-2 border-purple-300">
                                    <strong>8. Layout Effects:</strong> useLayoutEffect 훅 실행 (DOM 측정)
                                </li>
                                <li className="pl-3 border-l-2 border-pink-300">
                                    <strong>9. Passive Effects:</strong> useEffect 훅 실행 (비동기)
                                </li>
                                <li className="pl-3 border-l-2 border-green-400">
                                    <strong>10. 완료:</strong> 화면 업데이트 완료, 다음 렌더링 대기
                                </li>
                            </ul>
                        </div>

                        <div className="pt-4 border-t">
                            <h3 className="font-semibold mb-2">💡 주요 특징</h3>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li>• Render Phase는 중단 가능 (interruptible)</li>
                                <li>• Commit Phase는 중단 불가능 (non-interruptible)</li>
                                <li>• 5단계와 6단계 사이에 Phase 전환</li>
                                <li>• useLayoutEffect는 DOM 변경 직후 동기 실행</li>
                                <li>• useEffect는 화면 업데이트 후 비동기 실행</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex-1 relative">
                    <ReactFlow nodes={nodes} edges={edges} fitView nodesDraggable={false} nodesConnectable={false} elementsSelectable={false}>
                        <Background />
                        <Controls />
                        <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg w-80 z-10">
                            <h3 className="font-semibold mb-3">재생 제어</h3>
                            <button 
                                onClick={() => setIsPlaying(!isPlaying)} 
                                className={`w-full px-4 py-2 rounded mb-2 ${isPlaying ? 'bg-red-600' : 'bg-green-600'} text-white font-semibold`}
                            >
                                {isPlaying ? '⏸ 일시정지' : '▶ 자동 재생'}
                            </button>
                            <button 
                                onClick={() => setCurrentStep(0)} 
                                className="w-full px-4 py-2 bg-gray-600 text-white rounded font-semibold"
                            >
                                ↺ 처음부터
                            </button>
                            <div className="mt-4 pt-4 border-t">
                                <div className="text-sm mb-2 font-semibold">
                                    Step {currentStep + 1} / {steps.length}
                                </div>
                                <div className="text-xs text-gray-600 mb-2">
                                    {currentStep < 5 ? '🔴 Render Phase' : '🔵 Commit Phase'}
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-blue-600 h-2 rounded-full transition-all" 
                                        style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </ReactFlow>
                </div>
            </div>
        </div>
    );
}
