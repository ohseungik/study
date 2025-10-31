'use client';

/**
 * React Flow를 사용한 Fiber 트리 구조 시각화
 */

import { useCallback, useState } from 'react';
import ReactFlow, {
    Node,
    Edge,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    MarkerType,
    Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Link from 'next/link';

// Fiber 노드 타입 정의
interface FiberNodeData {
    label: string;
    type: 'HostRoot' | 'FunctionComponent' | 'ClassComponent' | 'HostComponent' | 'HostText';
    props?: Record<string, unknown>;
    state?: Record<string, unknown>;
    memoizedState?: unknown;
}

// 예제 1: 간단한 컴포넌트 트리
const simpleTreeNodes: Node<FiberNodeData>[] = [
    {
        id: '1',
        type: 'input',
        data: { label: 'HostRoot\n(FiberRoot)', type: 'HostRoot' },
        position: { x: 400, y: 0 },
        style: { 
            background: '#667eea', 
            color: 'white', 
            border: '2px solid #5a67d8',
            borderRadius: '8px',
            padding: '10px',
            fontWeight: 'bold',
        },
    },
    {
        id: '2',
        data: { label: 'App\n(FunctionComponent)', type: 'FunctionComponent' },
        position: { x: 400, y: 100 },
        style: { 
            background: '#48bb78', 
            color: 'white', 
            border: '2px solid #38a169',
            borderRadius: '8px',
            padding: '10px',
        },
    },
    {
        id: '3',
        data: { label: 'div\n(HostComponent)', type: 'HostComponent' },
        position: { x: 400, y: 200 },
        style: { 
            background: '#ed8936', 
            color: 'white', 
            border: '2px solid #dd6b20',
            borderRadius: '8px',
            padding: '10px',
        },
    },
    {
        id: '4',
        data: { label: 'Header\n(FunctionComponent)', type: 'FunctionComponent' },
        position: { x: 200, y: 300 },
        style: { 
            background: '#48bb78', 
            color: 'white', 
            border: '2px solid #38a169',
            borderRadius: '8px',
            padding: '10px',
        },
    },
    {
        id: '5',
        data: { label: 'Main\n(FunctionComponent)', type: 'FunctionComponent' },
        position: { x: 600, y: 300 },
        style: { 
            background: '#48bb78', 
            color: 'white', 
            border: '2px solid #38a169',
            borderRadius: '8px',
            padding: '10px',
        },
    },
    {
        id: '6',
        data: { label: 'h1\n(HostComponent)', type: 'HostComponent' },
        position: { x: 200, y: 400 },
        style: { 
            background: '#ed8936', 
            color: 'white', 
            border: '2px solid #dd6b20',
            borderRadius: '8px',
            padding: '10px',
        },
    },
    {
        id: '7',
        data: { label: '"Hello"\n(HostText)', type: 'HostText' },
        position: { x: 200, y: 500 },
        style: { 
            background: '#4299e1', 
            color: 'white', 
            border: '2px solid #3182ce',
            borderRadius: '8px',
            padding: '10px',
        },
    },
    {
        id: '8',
        data: { label: 'p\n(HostComponent)', type: 'HostComponent' },
        position: { x: 600, y: 400 },
        style: { 
            background: '#ed8936', 
            color: 'white', 
            border: '2px solid #dd6b20',
            borderRadius: '8px',
            padding: '10px',
        },
    },
    {
        id: '9',
        data: { label: '"Content"\n(HostText)', type: 'HostText' },
        position: { x: 600, y: 500 },
        style: { 
            background: '#4299e1', 
            color: 'white', 
            border: '2px solid #3182ce',
            borderRadius: '8px',
            padding: '10px',
        },
    },
];

const simpleTreeEdges: Edge[] = [
    { 
        id: 'e1-2', 
        source: '1', 
        target: '2', 
        label: 'child',
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#667eea', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#667eea' },
    },
    { 
        id: 'e2-3', 
        source: '2', 
        target: '3', 
        label: 'child',
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#48bb78', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#48bb78' },
    },
    { 
        id: 'e3-4', 
        source: '3', 
        target: '4', 
        label: 'child',
        type: 'smoothstep',
        style: { stroke: '#ed8936', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#ed8936' },
    },
    { 
        id: 'e4-5', 
        source: '4', 
        target: '5', 
        label: 'sibling',
        type: 'smoothstep',
        style: { stroke: '#9f7aea', strokeWidth: 2, strokeDasharray: '5 5' },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#9f7aea' },
    },
    { 
        id: 'e4-6', 
        source: '4', 
        target: '6', 
        label: 'child',
        type: 'smoothstep',
        style: { stroke: '#48bb78', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#48bb78' },
    },
    { 
        id: 'e6-7', 
        source: '6', 
        target: '7', 
        label: 'child',
        type: 'smoothstep',
        style: { stroke: '#ed8936', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#ed8936' },
    },
    { 
        id: 'e5-8', 
        source: '5', 
        target: '8', 
        label: 'child',
        type: 'smoothstep',
        style: { stroke: '#48bb78', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#48bb78' },
    },
    { 
        id: 'e8-9', 
        source: '8', 
        target: '9', 
        label: 'child',
        type: 'smoothstep',
        style: { stroke: '#ed8936', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#ed8936' },
    },
];

// 예제 2: State가 있는 복잡한 트리
const complexTreeNodes: Node<FiberNodeData>[] = [
    {
        id: '1',
        type: 'input',
        data: { label: 'HostRoot', type: 'HostRoot' },
        position: { x: 400, y: 0 },
        style: { 
            background: '#667eea', 
            color: 'white', 
            border: '2px solid #5a67d8',
            borderRadius: '8px',
            padding: '10px',
            fontWeight: 'bold',
        },
    },
    {
        id: '2',
        data: { 
            label: 'Counter\nstate: { count: 0 }', 
            type: 'FunctionComponent',
            state: { count: 0 },
        },
        position: { x: 400, y: 100 },
        style: { 
            background: '#48bb78', 
            color: 'white', 
            border: '2px solid #38a169',
            borderRadius: '8px',
            padding: '12px',
        },
    },
    {
        id: '3',
        data: { label: 'div', type: 'HostComponent' },
        position: { x: 400, y: 220 },
        style: { 
            background: '#ed8936', 
            color: 'white', 
            border: '2px solid #dd6b20',
            borderRadius: '8px',
            padding: '10px',
        },
    },
    {
        id: '4',
        data: { label: 'button', type: 'HostComponent', props: { onClick: '...' } },
        position: { x: 250, y: 320 },
        style: { 
            background: '#ed8936', 
            color: 'white', 
            border: '2px solid #dd6b20',
            borderRadius: '8px',
            padding: '10px',
        },
    },
    {
        id: '5',
        data: { label: 'span', type: 'HostComponent' },
        position: { x: 550, y: 320 },
        style: { 
            background: '#ed8936', 
            color: 'white', 
            border: '2px solid #dd6b20',
            borderRadius: '8px',
            padding: '10px',
        },
    },
    {
        id: '6',
        data: { label: '"Click me"', type: 'HostText' },
        position: { x: 250, y: 420 },
        style: { 
            background: '#4299e1', 
            color: 'white', 
            border: '2px solid #3182ce',
            borderRadius: '8px',
            padding: '10px',
        },
    },
    {
        id: '7',
        data: { label: '"Count: 0"', type: 'HostText' },
        position: { x: 550, y: 420 },
        style: { 
            background: '#4299e1', 
            color: 'white', 
            border: '2px solid #3182ce',
            borderRadius: '8px',
            padding: '10px',
        },
    },
];

const complexTreeEdges: Edge[] = [
    { 
        id: 'e1-2', 
        source: '1', 
        target: '2', 
        label: 'child',
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#667eea', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#667eea' },
    },
    { 
        id: 'e2-3', 
        source: '2', 
        target: '3', 
        label: 'child',
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#48bb78', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#48bb78' },
    },
    { 
        id: 'e3-4', 
        source: '3', 
        target: '4', 
        label: 'child',
        type: 'smoothstep',
        style: { stroke: '#ed8936', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#ed8936' },
    },
    { 
        id: 'e4-5', 
        source: '4', 
        target: '5', 
        label: 'sibling',
        type: 'smoothstep',
        style: { stroke: '#9f7aea', strokeWidth: 2, strokeDasharray: '5 5' },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#9f7aea' },
    },
    { 
        id: 'e4-6', 
        source: '4', 
        target: '6', 
        label: 'child',
        type: 'smoothstep',
        style: { stroke: '#ed8936', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#ed8936' },
    },
    { 
        id: 'e5-7', 
        source: '5', 
        target: '7', 
        label: 'child',
        type: 'smoothstep',
        style: { stroke: '#ed8936', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#ed8936' },
    },
];

export default function FiberTreeVisualizationPage() {
    const [selectedExample, setSelectedExample] = useState<'simple' | 'complex'>('simple');
    
    const [nodes, setNodes, onNodesChange] = useNodesState(
        selectedExample === 'simple' ? simpleTreeNodes : complexTreeNodes
    );
    const [edges, setEdges, onEdgesChange] = useEdgesState(
        selectedExample === 'simple' ? simpleTreeEdges : complexTreeEdges
    );

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const handleExampleChange = (example: 'simple' | 'complex') => {
        setSelectedExample(example);
        if (example === 'simple') {
            setNodes(simpleTreeNodes);
            setEdges(simpleTreeEdges);
        } else {
            setNodes(complexTreeNodes);
            setEdges(complexTreeEdges);
        }
    };

    return (
        <div className="h-screen flex flex-col">
            <div className="p-6 bg-white border-b">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold mb-2">Fiber 트리 구조 시각화</h1>
                    <Link href="/fiber" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
                        ← Fiber 예제로 돌아가기
                    </Link>
                    <p className="text-gray-600">
                        React Flow를 사용하여 Fiber 노드의 관계(child, sibling, return)를 시각적으로 탐색하세요.
                    </p>
                </div>
            </div>

            <div className="flex-1 relative">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                    attributionPosition="bottom-left"
                >
                    <Background />
                    <Controls />
                    
                    <Panel position="top-right" className="bg-white p-4 rounded-lg shadow-lg space-y-4">
                        <div>
                            <h3 className="font-semibold mb-2">예제 선택</h3>
                            <div className="space-y-2">
                                <button
                                    onClick={() => handleExampleChange('simple')}
                                    className={`w-full px-4 py-2 rounded text-sm font-medium transition-colors ${
                                        selectedExample === 'simple'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    간단한 트리
                                </button>
                                <button
                                    onClick={() => handleExampleChange('complex')}
                                    className={`w-full px-4 py-2 rounded text-sm font-medium transition-colors ${
                                        selectedExample === 'complex'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    State가 있는 트리
                                </button>
                            </div>
                        </div>

                        <div className="border-t pt-4">
                            <h3 className="font-semibold mb-2">노드 타입</h3>
                            <div className="space-y-2 text-xs">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded" style={{ background: '#667eea' }}></div>
                                    <span>HostRoot (루트)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded" style={{ background: '#48bb78' }}></div>
                                    <span>FunctionComponent</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded" style={{ background: '#ed8936' }}></div>
                                    <span>HostComponent (DOM)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded" style={{ background: '#4299e1' }}></div>
                                    <span>HostText (텍스트)</span>
                                </div>
                            </div>
                        </div>

                        <div className="border-t pt-4">
                            <h3 className="font-semibold mb-2">엣지 타입</h3>
                            <div className="space-y-2 text-xs">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-0.5 bg-blue-600"></div>
                                    <span>child (자식)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-0.5 bg-purple-600" style={{ borderTop: '2px dashed' }}></div>
                                    <span>sibling (형제)</span>
                                </div>
                            </div>
                        </div>
                    </Panel>
                </ReactFlow>
            </div>

            <div className="p-6 bg-gray-50 border-t">
                <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-3">
                    <div className="p-4 bg-white rounded-lg border">
                        <h4 className="font-semibold text-gray-900 mb-2">🔗 child 포인터</h4>
                        <p className="text-sm text-gray-600">
                            각 Fiber 노드는 첫 번째 자식을 가리키는 <code className="bg-gray-100 px-1 rounded">child</code> 포인터를 가집니다.
                            실선 화살표로 표시됩니다.
                        </p>
                    </div>
                    
                    <div className="p-4 bg-white rounded-lg border">
                        <h4 className="font-semibold text-gray-900 mb-2">↔️ sibling 포인터</h4>
                        <p className="text-sm text-gray-600">
                            형제 노드를 가리키는 <code className="bg-gray-100 px-1 rounded">sibling</code> 포인터로 
                            같은 부모의 자식들을 연결합니다. 점선으로 표시됩니다.
                        </p>
                    </div>
                    
                    <div className="p-4 bg-white rounded-lg border">
                        <h4 className="font-semibold text-gray-900 mb-2">↩️ return 포인터</h4>
                        <p className="text-sm text-gray-600">
                            부모 노드를 가리키는 <code className="bg-gray-100 px-1 rounded">return</code> 포인터로 
                            트리를 거슬러 올라갈 수 있습니다. (시각화에서는 생략)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
