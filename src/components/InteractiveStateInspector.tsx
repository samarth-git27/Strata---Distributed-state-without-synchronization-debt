import React, { useState } from 'react';
import { Play, RotateCcw, AlertTriangle, CheckCircle2, Zap, ShieldCheck, Activity, Globe2, Radio } from 'lucide-react';

interface ClusterNode {
  id: string;
  region: string;
  location: string;
  vector: number;
  lastOp: string;
  latencyMs: number;
  status: 'synced' | 'committing' | 'isolated';
  x: number;
  y: number;
}

interface LogEntry {
  id: string;
  opId: string;
  origin: string;
  payload: string;
  causalVector: string;
  timestamp: string;
  verified: boolean;
}

export const InteractiveStateInspector: React.FC = () => {
  const [partitionActive, setPartitionActive] = useState(false);
  const [selectedOp, setSelectedOp] = useState<string>('cursor');
  const [activePulse, setActivePulse] = useState<string | null>(null);

  const [nodes, setNodes] = useState<ClusterNode[]>([
    { id: 'us-west', region: 'us-west-2', location: 'Oregon', vector: 42, lastOp: 'INIT_STATE_LATTICE', latencyMs: 0.8, status: 'synced', x: 22, y: 35 },
    { id: 'eu-central', region: 'eu-central-1', location: 'Frankfurt', vector: 42, lastOp: 'INIT_STATE_LATTICE', latencyMs: 3.4, status: 'synced', x: 50, y: 70 },
    { id: 'ap-east', region: 'ap-northeast-1', location: 'Tokyo', vector: 42, lastOp: 'INIT_STATE_LATTICE', latencyMs: 3.9, status: 'synced', x: 78, y: 35 },
  ]);

  const [logs, setLogs] = useState<LogEntry[]>([
    { id: 'log-1', opId: '0x9E21', origin: 'us-west-2', payload: 'INIT_STATE_LATTICE (Merkle root 0x4a8f)', causalVector: '<42, 42, 42>', timestamp: '12:04:19.102', verified: true },
    { id: 'log-2', opId: '0x9E20', origin: 'eu-central-1', payload: 'QUORUM_HEARTBEAT_ACK (Peer health 100%)', causalVector: '<41, 42, 41>', timestamp: '12:04:18.891', verified: true },
    { id: 'log-3', opId: '0x9E1F', origin: 'ap-northeast-1', payload: 'DELTA_COMPACT_MERKLE_ROOT', causalVector: '<41, 41, 41>', timestamp: '12:04:18.234', verified: true },
  ]);

  const [isSimulating, setIsSimulating] = useState(false);

  const dispatchMutation = () => {
    if (isSimulating) return;
    setIsSimulating(true);

    const origins = ['us-west-2', 'eu-central-1', 'ap-northeast-1'];
    const chosenOrigin = selectedOp === 'transfer' ? 'us-west-2' : origins[Math.floor(Math.random() * origins.length)];
    const hexId = '0x' + Math.floor(Math.random() * 0xffff).toString(16).toUpperCase().padStart(4, '0');

    let payloadDesc = '';
    if (selectedOp === 'cursor') payloadDesc = `SET_CURSOR_VECTOR { user: 'lead-arch', x: ${Math.floor(Math.random() * 800)}, y: ${Math.floor(Math.random() * 600)} }`;
    else if (selectedOp === 'transfer') payloadDesc = `ATOMIC_LATTICE_JOIN { balance: 4280.50, seq: ${hexId} }`;
    else payloadDesc = `APPEND_DELTA_BRANCH { channel: 'sys_ring_0', state: 'VALID' }`;

    setActivePulse(chosenOrigin);

    // Step 1: Commit locally to origin node
    setNodes((prev) =>
      prev.map((node) => {
        if (node.region === chosenOrigin) {
          return {
            ...node,
            vector: node.vector + 1,
            lastOp: payloadDesc.split(' ')[0],
            status: 'committing',
          };
        }
        if (partitionActive && (node.region === 'ap-northeast-1' || chosenOrigin === 'ap-northeast-1')) {
          return { ...node, status: 'isolated' };
        }
        return node;
      })
    );

    // Step 2: Causal propagation across quorum
    setTimeout(() => {
      setNodes((prev) =>
        prev.map((node) => {
          if (partitionActive && node.region === 'ap-northeast-1') {
            return { ...node, status: 'isolated' };
          }
          return {
            ...node,
            vector: prev.find((n) => n.region === chosenOrigin)!.vector,
            lastOp: payloadDesc.split(' ')[0],
            status: 'synced',
          };
        })
      );

      const targetVector = nodes.find((n) => n.region === chosenOrigin)!.vector + 1;
      const newVectorStr = partitionActive
        ? `<${targetVector}, ${targetVector}, ${nodes.find((n) => n.region === 'ap-northeast-1')!.vector}>`
        : `<${targetVector}, ${targetVector}, ${targetVector}>`;

      const newLog: LogEntry = {
        id: `log-${Date.now()}`,
        opId: hexId,
        origin: chosenOrigin,
        payload: payloadDesc,
        causalVector: newVectorStr,
        timestamp: new Date().toISOString().substring(11, 23),
        verified: true,
      };

      setLogs((prev) => [newLog, ...prev.slice(0, 4)]);
      setActivePulse(null);
      setIsSimulating(false);
    }, 450);
  };

  const togglePartition = () => {
    const nextState = !partitionActive;
    setPartitionActive(nextState);

    if (nextState) {
      setNodes((prev) =>
        prev.map((node) =>
          node.region === 'ap-northeast-1' ? { ...node, status: 'isolated' } : node
        )
      );
    } else {
      // Heal partition with deterministic state join
      setIsSimulating(true);
      setTimeout(() => {
        const highestVector = Math.max(...nodes.map((n) => n.vector));
        setNodes((prev) =>
          prev.map((node) => ({
            ...node,
            vector: highestVector,
            status: 'synced',
            lastOp: 'LATTICE_JOIN_HEALED',
          }))
        );

        const healLog: LogEntry = {
          id: `log-${Date.now()}`,
          opId: '0xCAFE',
          origin: 'mesh-coordinator',
          payload: 'PARTITION_RESOLVED: 0 dropped ops. Deterministic LUB converged.',
          causalVector: `<${highestVector}, ${highestVector}, ${highestVector}>`,
          timestamp: new Date().toISOString().substring(11, 23),
          verified: true,
        };

        setLogs((prev) => [healLog, ...prev.slice(0, 4)]);
        setIsSimulating(false);
      }, 500);
    }
  };

  const resetSimulation = () => {
    setPartitionActive(false);
    setActivePulse(null);
    setNodes([
      { id: 'us-west', region: 'us-west-2', location: 'Oregon', vector: 42, lastOp: 'INIT_STATE_LATTICE', latencyMs: 0.8, status: 'synced', x: 22, y: 35 },
      { id: 'eu-central', region: 'eu-central-1', location: 'Frankfurt', vector: 42, lastOp: 'INIT_STATE_LATTICE', latencyMs: 3.4, status: 'synced', x: 50, y: 70 },
      { id: 'ap-east', region: 'ap-northeast-1', location: 'Tokyo', vector: 42, lastOp: 'INIT_STATE_LATTICE', latencyMs: 3.9, status: 'synced', x: 78, y: 35 },
    ]);
  };

  return (
    <div className="w-full bg-[#0B0D14] rounded-2xl border border-white/[0.08] overflow-hidden shadow-2xl">
      {/* Console Top Masthead */}
      <div className="bg-[#10131E] px-4 sm:px-6 py-3 border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20 inline-block" />
          </div>
          <span className="text-xs font-mono text-neutral-300 font-semibold tracking-tight">
            Strata Mesh Console :: Causal Vector Quorum
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-neutral-400">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Quorum Status: {partitionActive ? 'Degraded (Split Isolated)' : 'Healthy (Full Quorum)'}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-neutral-400">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Invariants: 100% Satisfied</span>
          </div>
        </div>
      </div>

      {/* Control Surface */}
      <div className="p-4 sm:p-5 bg-[#0D0F17] border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
        {/* Mutation Selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="inspector-mutation-select" className="text-xs text-neutral-400 font-medium">State Mutation:</label>
          <select
            id="inspector-mutation-select"
            value={selectedOp}
            onChange={(e) => setSelectedOp(e.target.value)}
            className="text-xs font-mono bg-[#141724] border border-white/10 rounded-lg px-3 py-1.5 text-neutral-200 focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="cursor">Spatial Cursor Delta (CRDT Vector)</option>
            <option value="transfer">Atomic Ledger Settlement (Financial Lattice)</option>
            <option value="delta">Kernel eBPF Ring Buffer Append</option>
          </select>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={dispatchMutation}
            disabled={isSimulating}
            className="cursor-pointer text-xs font-semibold px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Dispatch Mutation
          </button>

          <button
            onClick={togglePartition}
            className={`cursor-pointer text-xs font-medium px-3.5 py-2 rounded-lg border transition-all flex items-center gap-1.5 ${
              partitionActive
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-400 hover:bg-amber-500/20'
                : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            {partitionActive ? 'Heal Partition (Join Lattice)' : 'Simulate WAN Partition'}
          </button>

          <button
            onClick={resetSimulation}
            className="cursor-pointer p-2 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-white/5 border border-white/5 transition-colors"
            title="Reset sandbox state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* TOPOLOGICAL MESH VISUALIZER CANVAS */}
      <div className="relative p-6 sm:p-8 bg-[#090B12] overflow-hidden border-b border-white/[0.06]">
        {/* Architectural grid background */}
        <div className="absolute inset-0 bg-grid-subtle opacity-40 pointer-events-none" />

        {/* SVG Inter-Region Causal Links */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minHeight: '180px' }}>
          {/* Link 1: Oregon to Frankfurt */}
          <line
            x1="22%"
            y1="50%"
            x2="50%"
            y2="75%"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1.5"
            strokeDasharray={activePulse ? '4 4' : 'none'}
          />
          {/* Link 2: Frankfurt to Tokyo */}
          <line
            x1="50%"
            y1="75%"
            x2="78%"
            y2="50%"
            stroke={partitionActive ? '#F59E0B' : 'rgba(255,255,255,0.15)'}
            strokeWidth="1.5"
            strokeDasharray={partitionActive ? '4 4' : activePulse ? '4 4' : 'none'}
          />
          {/* Link 3: Oregon to Tokyo (Trans-Pacific) */}
          <line
            x1="22%"
            y1="50%"
            x2="78%"
            y2="50%"
            stroke={partitionActive ? '#F59E0B' : 'rgba(255,255,255,0.1)'}
            strokeWidth="1.5"
            strokeDasharray={partitionActive ? '4 4' : 'none'}
          />
        </svg>

        {/* Three Node Anchors */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {nodes.map((node) => {
            const isCommitting = node.status === 'committing';
            const isIsolated = node.status === 'isolated';

            return (
              <div
                key={node.id}
                className={`relative rounded-xl p-5 border transition-all duration-300 ${
                  isIsolated
                    ? 'bg-amber-950/20 border-amber-500/30 shadow-lg shadow-amber-950/20'
                    : isCommitting
                    ? 'bg-blue-950/30 border-blue-500/60 shadow-xl shadow-blue-500/10'
                    : 'bg-[#111420]/80 backdrop-blur-sm border-white/[0.08]'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-xs font-mono font-bold text-white tracking-wider">
                      {node.region}
                    </div>
                    <div className="text-[11px] text-neutral-400 font-sans">{node.location} Edge Cluster</div>
                  </div>

                  <div>
                    {isIsolated ? (
                      <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        ISOLATED
                      </span>
                    ) : isCommitting ? (
                      <span className="text-[10px] font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 animate-pulse">
                        LOCAL COMMIT
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                        SYNCHRONIZED
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/[0.06] text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400 text-[11px] font-sans">Causal Sequence:</span>
                    <span className="text-white font-semibold tabular-nums">#{node.vector}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400 text-[11px] font-sans">Local Latency:</span>
                    <span className="text-neutral-300 tabular-nums">{node.latencyMs}ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400 text-[11px] font-sans">Last Transition:</span>
                    <span className="text-blue-400 text-[11px] truncate max-w-[140px]">{node.lastOp}</span>
                  </div>
                </div>

                <div className="mt-3.5 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isIsolated ? 'bg-amber-500 w-1/3' : 'bg-blue-500 w-full'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Append-Only State Log Journal */}
      <div className="bg-[#090A0F] p-4 sm:p-6">
        <div className="flex items-center justify-between mb-3 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-white font-medium">Deterministic Merkle Log Journal (Live)</span>
          </div>
          <span className="text-[11px]">Auto-Compaction: Enabled</span>
        </div>

        <div className="space-y-2 font-mono text-xs">
          {logs.map((log) => (
            <div
              key={log.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 p-2.5 rounded-lg bg-[#111420]/70 border border-white/[0.04] hover:border-white/10 transition-colors"
            >
              <div className="flex items-center gap-2.5 overflow-hidden">
                <span className="text-[11px] text-neutral-500 tabular-nums shrink-0">
                  {log.timestamp}
                </span>
                <span className="text-[11px] text-blue-400 font-semibold shrink-0">
                  [{log.opId}]
                </span>
                <span className="text-[11px] text-neutral-400 shrink-0">
                  {log.origin} →
                </span>
                <span className="text-neutral-200 text-[11px] truncate">
                  {log.payload}
                </span>
              </div>

              <div className="flex items-center gap-3 shrink-0 text-[10px] text-neutral-400 self-end sm:self-auto">
                <span className="text-neutral-400">Vector: {log.causalVector}</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  VERIFIED
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
