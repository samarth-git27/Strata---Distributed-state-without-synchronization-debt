import React, { useState } from 'react';
import { GitCommit, GitMerge, CheckCircle, ShieldCheck, Terminal, Layers } from 'lucide-react';

interface DAGNode {
  id: string;
  label: string;
  region: string;
  vector: string;
  merkleHash: string;
  operation: string;
  resolvedConflict: string;
  invariantStatus: string;
}

export const CausalDAGVisualizer: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-3');

  const dagNodes: DAGNode[] = [
    {
      id: 'node-0',
      label: '00 · Genesis State Log',
      region: 'Coordinator',
      vector: '<0, 0, 0>',
      merkleHash: '0x3F91A8...01C',
      operation: 'INIT_LATTICE_REGISTRY { schema_version: 2 }',
      resolvedConflict: 'Initial root checkpoint; linear base.',
      invariantStatus: 'TLA+ Monotonic Origin Invariant Satisfied',
    },
    {
      id: 'node-1',
      label: '01 · Concurrent Mutation A',
      region: 'us-west-2 (Oregon)',
      vector: '<1, 0, 0>',
      merkleHash: '0x8B44CE...92F',
      operation: 'SET_CURSOR { doc_id: "doc-8", cursor: [412, 108] }',
      resolvedConflict: 'Local commit committed in 0.72ms without cross-region roundtrip.',
      invariantStatus: 'Causal Monotonicity Invariant Verified',
    },
    {
      id: 'node-2',
      label: '02 · Concurrent Mutation B',
      region: 'eu-central-1 (Frankfurt)',
      vector: '<0, 1, 0>',
      merkleHash: '0x1C22FA...44E',
      operation: 'SET_CURSOR { doc_id: "doc-8", cursor: [620, 240] }',
      resolvedConflict: 'Local commit committed in 0.81ms during transatlantic network jitter.',
      invariantStatus: 'Causal Independence Invariant Verified',
    },
    {
      id: 'node-3',
      label: '03 · Deterministic Semi-Lattice Join',
      region: 'Mesh Quorum',
      vector: '<1, 1, 0>',
      merkleHash: '0x7E99DC...10A',
      operation: 'JOIN_LUB(Node_1, Node_2) // Least Upper Bound convergence',
      resolvedConflict: 'Zero split-brain: both concurrent writes merged into deterministic state lattice in 1.2ms without manual intervention.',
      invariantStatus: 'Strong Eventual Consistency (SEC) Proven',
    },
  ];

  const selectedNode = dagNodes.find((n) => n.id === selectedNodeId) || dagNodes[3];

  return (
    <div className="bg-[#0A0C14] rounded-2xl border border-white/[0.08] p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-5">
        <div>
          <div className="text-xs font-mono text-blue-400 uppercase tracking-wider font-semibold">
            Interactive State Verification
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Causal Vector Directed Acyclic Graph (DAG)
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            Click any transition node to inspect its causal vector clock, Merkle hash, and mathematical invariant proof.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/20 border border-emerald-500/20 px-3 py-1.5 rounded-lg self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>Strong Eventual Consistency (SEC)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive DAG Node Flow */}
        <div className="lg:col-span-6 space-y-3">
          {dagNodes.map((node) => {
            const isSelected = node.id === selectedNodeId;
            return (
              <button
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  isSelected
                    ? 'bg-blue-600/15 border-blue-500/60 shadow-lg shadow-blue-500/10'
                    : 'bg-[#10131E] border-white/[0.06] hover:bg-white/[0.03] hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      node.id === 'node-3'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/5 text-neutral-400'
                    }`}
                  >
                    {node.id === 'node-3' ? <GitMerge className="w-4 h-4" /> : <GitCommit className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white tracking-tight">{node.label}</div>
                    <div className="text-[11px] text-neutral-400 font-mono mt-0.5">{node.region}</div>
                  </div>
                </div>

                <div className="text-right font-mono text-xs">
                  <div className="text-blue-400 text-[11px] font-semibold">{node.vector}</div>
                  <div className="text-neutral-500 text-[10px]">{node.merkleHash.substring(0, 10)}...</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: State Inspector Card */}
        <div className="lg:col-span-6 bg-[#0E111C] rounded-xl border border-white/[0.08] p-5 sm:p-6 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Terminal className="w-4 h-4 text-blue-400" />
              <span>Inspector: {selectedNode.label}</span>
            </div>
            <span className="text-[11px] text-emerald-400 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              Verified
            </span>
          </div>

          <div className="space-y-3 text-[11px]">
            <div>
              <span className="text-neutral-500 block">Causal Vector Clock:</span>
              <span className="text-white text-xs font-bold">{selectedNode.vector}</span>
            </div>

            <div>
              <span className="text-neutral-500 block">Cryptographic Merkle Root:</span>
              <span className="text-blue-400">{selectedNode.merkleHash}</span>
            </div>

            <div>
              <span className="text-neutral-500 block">State Transition Mutation:</span>
              <pre className="p-2.5 rounded bg-black/40 border border-white/[0.04] text-neutral-200 text-[11px] mt-1 overflow-x-auto">
                <code>{selectedNode.operation}</code>
              </pre>
            </div>

            <div className="pt-2 border-t border-white/[0.06]">
              <span className="text-neutral-500 block">Conflict Resolution Invariant:</span>
              <p className="text-neutral-300 font-sans text-xs leading-relaxed mt-0.5">
                {selectedNode.resolvedConflict}
              </p>
            </div>

            <div className="p-2.5 rounded bg-emerald-950/20 border border-emerald-500/20 text-emerald-400 text-[11px] font-sans flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{selectedNode.invariantStatus}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
