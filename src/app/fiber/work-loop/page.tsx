'use client';

import { useState, useEffect } from 'react';
import ReactFlow, { Node, Edge, Controls, Background, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import Link from 'next/link';

type WorkPhase = 'idle' | 'beginWork' | 'completeWork' | 'commitWork' | 'interrupted';

const fiberNodes = [
    { id: '1', name: 'App', type: 'div', priority: 'normal' },
    { id: '2', name: 'Header', type: 'div', priority: 'low' },
    { id: '3', name: 'UserInput', type: 'div', priority: 'high' },
    { id: '4', name: 'Content', type: 'div', priority: 'normal' },
];

export default function WorkLoopVisualization() {
    const [currentFiberIndex, setCurrentFiberIndex] = useState(0);
    const [workPhase, setWorkPhase] = useState<WorkPhase>('idle');
    const [isRunning, setIsRunning] = useState(false);
    const [completedWork, setCompletedWork] = useState<Set<string>>(new Set());
    const [timeRemaining, setTimeRemaining] = useState(5);

    const nodes: Node[] = [
        {
            id: 'idle',
            data: { label: ' Idle\n대기 중' },
            position: { x: 100, y: 100 },
            style: {
                background: workPhase === 'idle' ? '#4299e1' : '#f7fafc',
                color: workPhase === 'idle' ? 'white' : '#2d3748',
                border: workPhase === 'idle' ? '3px solid #2c5282' : '2px solid #e2e8f0',
                borderRadius: '12px',
                padding: '20px',
                width: 180,
                fontSize: '14px',
                fontWeight: workPhase === 'idle' ? 'bold' : 'normal',
                textAlign: 'center',
            },
        },
        {
            id: 'beginWork',
            data: { label: ' Begin Work\n작업 시작' },
            position: { x: 400, y: 100 },
            style: {
                background: workPhase === 'beginWork' ? '#4299e1' : '#f7fafc',
                color: workPhase === 'beginWork' ? 'white' : '#2d3748',
                border: workPhase === 'beginWork' ? '3px solid #2c5282' : '2px solid #e2e8f0',
                borderRadius: '12px',
                padding: '20px',
                width: 180,
                fontSize: '14px',
                fontWeight: workPhase === 'beginWork' ? 'bold' : 'normal',
                textAlign: 'center',
            },
        },
        {
            id: 'completeWork',
            data: { label: ' Complete Work\n작업 완료' },
            position: { x: 700, y: 100 },
            style: {
                background: workPhase === 'completeWork' ? '#4299e1' : '#f7fafc',
                color: workPhase === 'completeWork' ? 'white' : '#2d3748',
                border: workPhase === 'completeWork' ? '3px solid #2c5282' : '2px solid #e2e8f0',
                borderRadius: '12px',
                padding: '20px',
                width: 180,
                fontSize: '14px',
                fontWeight: workPhase === 'completeWork' ? 'bold' : 'normal',
                textAlign: 'center',
            },
        },
        {
            id: 'commitWork',
            data: { label: ' Commit Work\nDOM 업데이트' },
            position: { x: 700, y: 350 },
            style: {
                background: workPhase === 'commitWork' ? '#4299e1' : '#f7fafc',
                color: workPhase === 'commitWork' ? 'white' : '#2d3748',
                border: workPhase === 'commitWork' ? '3px solid #2c5282' : '2px solid #e2e8f0',
                borderRadius: '12px',
                padding: '20px',
                width: 180,
                fontSize: '14px',
                fontWeight: workPhase === 'commitWork' ? 'bold' : 'normal',
                textAlign: 'center',
            },
        },
        {
            id: 'interrupted',
            data: { label: ' Interrupted\n작업 중단' },
            position: { x: 400, y: 350 },
            style: {
                background: workPhase === 'interrupted' ? '#f56565' : '#fff5f5',
                color: workPhase === 'interrupted' ? 'white' : '#c53030',
                border: workPhase === 'interrupted' ? '3px solid #c53030' : '2px solid #feb2b2',
                borderRadius: '12px',
                padding: '20px',
                width: 180,
                fontSize: '14px',
                fontWeight: workPhase === 'interrupted' ? 'bold' : 'normal',
                textAlign: 'center',
            },
        },
        ...fiberNodes.map((fiber, index) => {
            const isCompleted = completedWork.has(fiber.id);
            const isCurrent = currentFiberIndex === index && isRunning;
            const priorityEmoji = fiber.priority === 'high' ? '' : fiber.priority === 'normal' ? '' : '';
            
            return {
                id: `fiber-${fiber.id}`,
                data: { label: `${priorityEmoji} ${fiber.name}\n(${fiber.type})` },
                position: { x: 150 + index * 220, y: 600 },
                style: {
                    background: isCurrent ? '#fef5e7' : isCompleted ? '#d4edda' : '#e6fffa',
                    border: isCurrent ? '3px solid #f39c12' : isCompleted ? '2px solid #28a745' : '2px solid #81e6d9',
                    borderRadius: '12px',
                    padding: '15px',
                    width: 160,
                    fontSize: '13px',
                    fontWeight: isCurrent ? 'bold' : 'normal',
                    textAlign: 'center' as const,
                },
            };
        }),
    ];

    const edges: Edge[] = [
        {
            id: 'e1',
            source: 'idle',
            target: 'beginWork',
            label: '작업 시작',
            type: 'smoothstep',
            animated: workPhase === 'idle',
            markerEnd: { type: MarkerType.ArrowClosed },
        },
        {
            id: 'e2',
            source: 'beginWork',
            target: 'completeWork',
            label: '처리 완료',
            type: 'smoothstep',
            animated: workPhase === 'beginWork',
            markerEnd: { type: MarkerType.ArrowClosed },
        },
        {
            id: 'e3',
            source: 'completeWork',
            target: 'commitWork',
            label: '모든 작업 완료',
            type: 'smoothstep',
            animated: workPhase === 'completeWork',
            markerEnd: { type: MarkerType.ArrowClosed },
        },
        {
            id: 'e4',
            source: 'commitWork',
            target: 'idle',
            label: '대기',
            type: 'smoothstep',
            animated: workPhase === 'commitWork',
            markerEnd: { type: MarkerType.ArrowClosed },
        },
        {
            id: 'e5',
            source: 'beginWork',
            target: 'interrupted',
            label: 'Time Slice 초과',
            type: 'smoothstep',
            style: { stroke: '#f56565' },
            markerEnd: { type: MarkerType.ArrowClosed, color: '#f56565' },
        },
        {
            id: 'e6',
            source: 'interrupted',
            target: 'idle',
            label: '재스케줄링',
            type: 'smoothstep',
            style: { stroke: '#f56565' },
            markerEnd: { type: MarkerType.ArrowClosed, color: '#f56565' },
        },
    ];

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setTimeRemaining(prev => Math.max(0, prev - 1));

            if (workPhase === 'idle') {
                if (currentFiberIndex < fiberNodes.length) {
                    setWorkPhase('beginWork');
                    setTimeRemaining(5);
                }
            } else if (workPhase === 'beginWork') {
                setWorkPhase('completeWork');
            } else if (workPhase === 'completeWork') {
                setCompletedWork(prev => new Set([...prev, fiberNodes[currentFiberIndex].id]));
                
                if (currentFiberIndex === fiberNodes.length - 1) {
                    setWorkPhase('commitWork');
                } else {
                    setCurrentFiberIndex(prev => prev + 1);
                    setWorkPhase('idle');
                }
            } else if (workPhase === 'commitWork') {
                setIsRunning(false);
                setWorkPhase('idle');
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, workPhase, currentFiberIndex]);

    const handleReset = () => {
        setIsRunning(false);
        setCurrentFiberIndex(0);
        setWorkPhase('idle');
        setCompletedWork(new Set());
        setTimeRemaining(5);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <div className="p-6 bg-white border-b">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold mb-2">Work Loop 동작 시각화</h1>
                    <p className="text-gray-600 mb-4">
                        React Fiber의 Work Loop가 어떻게 동작하고 Time Slicing과 인터럽트를 처리하는지 확인하세요.
                    </p>
                    <Link href="/fiber" className="text-blue-600 hover:text-blue-800"> Fiber 예제로 돌아가기</Link>
                </div>
            </div>

            <div className="flex-1 flex">
                <div className="w-80 p-6 bg-white border-r overflow-y-auto">
                    <h2 className="text-xl font-bold mb-4">Work Loop 개념</h2>
                    
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-lg mb-2"> Work Loop란?</h3>
                            <p className="text-sm text-gray-600">
                                Work Loop는 React가 Fiber 트리를 순회하면서 각 노드를 처리하는 핵심 메커니즘입니다.
                                작업을 작은 단위로 나누어 브라우저가 다른 작업을 처리할 시간을 확보합니다.
                            </p>
                        </div>

                        <div className="pt-4 border-t">
                            <h3 className="font-semibold mb-2"> 처리 단계</h3>
                            <ul className="text-sm space-y-2">
                                <li className="pl-3 border-l-2 border-gray-300">
                                    <strong>1. Begin Work:</strong> Fiber 노드 처리 시작
                                </li>
                                <li className="pl-3 border-l-2 border-green-300">
                                    <strong>2. Complete Work:</strong> 현재 노드 처리 완료
                                </li>
                                <li className="pl-3 border-l-2 border-blue-300">
                                    <strong>3. Commit Work:</strong> DOM 업데이트
                                </li>
                            </ul>
                        </div>

                        <div className="pt-4 border-t">
                            <h3 className="font-semibold mb-2"> Time Slicing</h3>
                            <p className="text-sm text-gray-600 mb-2">
                                약 5ms 단위로 작업을 수행하고 시간이 소진되면 브라우저에 제어권을 반환합니다.
                            </p>
                            <div className="bg-blue-50 p-3 rounded text-xs">
                                <code>
                                    while (workInProgress && !shouldYield()) {'{'}
                                    <br />
                                    &nbsp;&nbsp;performUnitOfWork(workInProgress);
                                    <br />
                                    {'}'}
                                </code>
                            </div>
                        </div>

                        <div className="pt-4 border-t">
                            <h3 className="font-semibold mb-2"> 우선순위 시스템</h3>
                            <ul className="text-sm space-y-1">
                                <li> <strong>High:</strong> 사용자 입력</li>
                                <li> <strong>Normal:</strong> 일반 업데이트</li>
                                <li> <strong>Low:</strong> 백그라운드 작업</li>
                            </ul>
                        </div>

                        <div className="pt-4 border-t">
                            <h3 className="font-semibold mb-2"> Interruptible Rendering</h3>
                            <p className="text-sm text-gray-600">
                                우선순위가 높은 작업이 들어오면 현재 작업을 중단하고 중요한 작업을 먼저 처리합니다.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 relative">
                    <ReactFlow 
                        nodes={nodes} 
                        edges={edges} 
                        fitView
                        fitViewOptions={{ padding: 0.3, minZoom: 0.5, maxZoom: 1 }}
                        nodesDraggable={false}
                        nodesConnectable={false}
                        elementsSelectable={false}
                    >
                        <Background />
                        <Controls />
                        
                        <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg w-80 z-10">
                            <h3 className="font-semibold mb-3">재생 제어</h3>
                            
                            <button 
                                onClick={() => setIsRunning(!isRunning)} 
                                className={`w-full px-4 py-2 rounded mb-2 font-semibold text-white ${
                                    isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                                }`}
                            >
                                {isRunning ? ' 일시정지' : ' 시작'}
                            </button>
                            
                            <button 
                                onClick={handleReset} 
                                className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded font-semibold mb-4"
                            >
                                 리셋
                            </button>

                            <div className="space-y-3 pt-3 border-t">
                                <div>
                                    <div className="text-xs text-gray-600 mb-1">현재 단계</div>
                                    <div className="font-semibold text-sm">
                                        {workPhase === 'idle' && ' 대기 중'}
                                        {workPhase === 'beginWork' && ' 작업 시작'}
                                        {workPhase === 'completeWork' && ' 작업 완료'}
                                        {workPhase === 'commitWork' && ' 커밋 중'}
                                        {workPhase === 'interrupted' && ' 인터럽트'}
                                    </div>
                                </div>

                                {isRunning && currentFiberIndex < fiberNodes.length && (
                                    <div>
                                        <div className="text-xs text-gray-600 mb-1">처리 중인 Fiber</div>
                                        <div className="bg-yellow-50 p-2 rounded text-sm">
                                            <div className="font-semibold">{fiberNodes[currentFiberIndex].name}</div>
                                            <div className="text-xs text-gray-600">
                                                Type: {fiberNodes[currentFiberIndex].type} | 
                                                Priority: {fiberNodes[currentFiberIndex].priority}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <div className="text-xs text-gray-600 mb-1">Time Slice 남은 시간</div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className={`h-2 rounded-full transition-all ${
                                                timeRemaining > 3 ? 'bg-green-600' : 
                                                timeRemaining > 1 ? 'bg-yellow-600' : 'bg-red-600'
                                            }`}
                                            style={{ width: `${(timeRemaining / 5) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="text-xs text-gray-600 mt-1">
                                        {timeRemaining}ms / 5ms
                                    </div>
                                </div>

                                <div>
                                    <div className="text-xs text-gray-600 mb-1">진행 상황</div>
                                    <div className="text-sm font-semibold">
                                        {completedWork.size} / {fiberNodes.length} Fiber 완료
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                        <div 
                                            className="bg-blue-600 h-2 rounded-full transition-all"
                                            style={{ width: `${(completedWork.size / fiberNodes.length) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow w-64 z-10">
                            <div className="text-xs font-semibold mb-2">범례</div>
                            <div className="space-y-1 text-xs">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-yellow-100 border-2 border-yellow-600 rounded"></div>
                                    <span>현재 처리 중</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-green-100 border-2 border-green-600 rounded"></div>
                                    <span>처리 완료</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-teal-100 border-2 border-teal-400 rounded"></div>
                                    <span>대기 중</span>
                                </div>
                            </div>
                        </div>
                    </ReactFlow>
                </div>
            </div>
        </div>
    );
}
