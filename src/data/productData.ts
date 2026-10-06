import { Plan, FAQItem, TeamMember, FeatureDeepDive } from '../types';

export const PLANS: Plan[] = [
  {
    id: 'developer',
    name: 'Developer',
    tagline: 'For individual engineers and research teams prototyping distributed state.',
    priceMonthly: 0,
    priceAnnual: 0,
    description: 'Local development runtime, single-node deterministic log, and public edge testbench.',
    features: [
      'Single-cluster deterministic state log',
      'Up to 1,000,000 state mutations / month',
      'eBPF local kernel runtime (Linux/Darwin Wasm)',
      'Time-travel replay up to 24 hours',
      'Community Zulip & GitHub Discussions',
      'TypeScript, Rust & Go client SDKs',
    ],
    limitations: [
      'Multi-region consensus limited to testnet',
      'Self-hosted snapshot retention: 1 day',
    ],
    ctaText: 'Start Building Free',
    highlighted: false,
  },
  {
    id: 'team',
    name: 'Production',
    badge: 'Most Deployed',
    tagline: 'For fast-scaling engineering teams operating multi-region live applications.',
    priceMonthly: 149,
    priceAnnual: 119,
    description: 'Full multi-region causal consensus, sub-4ms global convergence, and automated snapshots.',
    features: [
      'Up to 25,000,000 state mutations / month',
      '3-region synchronized consensus mesh',
      'Sub-4ms cross-regional causal convergence',
      'Deterministic time-travel rewind up to 30 days',
      'Automated zero-copy snapshot compaction',
      'SOC2 Type II compliant audit logging',
      'Priority SLA with <1hr engineering response',
      'Dedicated Slack/Discord private channel',
    ],
    ctaText: 'Deploy Production Cluster',
    highlighted: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise Grid',
    tagline: 'For mission-critical infrastructure requiring dedicated hardware and custom quorums.',
    priceMonthly: 799,
    priceAnnual: 649,
    description: 'Custom topological routing, air-gapped on-premise licensing, and dedicated edge clusters.',
    features: [
      'Unlimited state throughput with custom sharding',
      'Dedicated edge compute clusters (12+ global nodes)',
      'Air-gapped VPC and on-premise bare metal licensing',
      'Sub-millisecond custom kernel bypass modules',
      '99.999% uptime SLA with financial backing',
      'Custom TLA+ verification of your state schema',
      'Direct line to principal distributed systems architects',
      'Bespoke security & compliance reviews (HIPAA / FINRA)',
    ],
    ctaText: 'Consult Solutions Architect',
    highlighted: false,
  },
];

export const FAQS: FAQItem[] = [
  {
    question: 'How does Strata differ from running Redis Pub/Sub with PostgreSQL CDC?',
    answer: 'Traditional stacks require you to maintain three distinct representations of truth: relational tables in Postgres, ephemeral cache channels in Redis, and offset streams in Kafka. Under network partition or heavy concurrency, these out-of-band layers desynchronize, causing ghost writes and split-brains. Strata provides a singular, causal-ordered state log where all mutations are deterministic state transition functions. No synchronization glue is required.',
    category: 'architecture',
  },
  {
    question: 'Does Strata use standard Raft or Paxos consensus?',
    answer: 'No. Raft forces all writes through a single elected leader, creating a geographic bottleneck that induces 120ms+ latency across multi-region clusters. Strata implements Causal Vector Quorums (CVQ)—a leaderless, partially-ordered consensus protocol formally verified in TLA+. Mutations are committed locally within 0.8ms and converge causally across edge regions in under 4ms.',
    category: 'architecture',
  },
  {
    question: 'How does Strata achieve sub-millisecond memory-mapped throughput?',
    answer: 'Strata’s core runtime compiles down to eBPF kernel modules and WebAssembly micro-kernels. When state mutations enter the network interface, eBPF filters process conflict-free causal merges directly within the Linux socket buffer, bypassing user-space memory copies and context switching entirely.',
    category: 'architecture',
  },
  {
    question: 'Can we run Strata entirely inside our own AWS, GCP, or bare-metal VPC?',
    answer: 'Yes. While Strata Cloud provides a managed global mesh, the Strata Core binary is 100% self-contained with zero external dependencies (no ZooKeeper, no JVM, no external database). You can deploy it as a single static binary or Kubernetes DaemonSet inside your private VPC or air-gapped infrastructure.',
    category: 'deployment',
  },
  {
    question: 'How does time-travel state debugging work in production?',
    answer: 'Because Strata records deterministic state transitions rather than ad-hoc database states, any production anomaly can be rewound tick-by-tick. You can export a cryptographic snapshot of the exact causal state log at timestamp T, load it into your local terminal, and replay the execution deterministically down to the instruction level.',
    category: 'deployment',
  },
  {
    question: 'What happens when a network partition occurs across regions?',
    answer: 'Strata’s causal lattice guarantees that local clusters continue accepting writes with monotonic progress. When the partition heals, Strata’s deterministic merge functions resolve any concurrent concurrent branches deterministically according to your defined algebraic semi-lattice rules—with mathematically zero data loss and zero manual conflict resolution.',
    category: 'architecture',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Dr. Elena Rostova',
    role: 'Co-Founder & Chief Scientist',
    bio: 'Former principal researcher at MIT Computer Science and Distributed Systems Group. Specializes in formal methods, TLA+ verification, and leaderless consensus protocols.',
    contribution: 'Authored the formal TLA+ proofs for Strata’s Causal Vector Quorum protocol.',
    prior: 'Ex-MIT CSAIL, Distributed Systems Lab',
  },
  {
    name: 'Marcus Vance',
    role: 'Co-Founder & CEO',
    bio: 'Systems software veteran who spent 11 years architecting high-frequency financial matching engines and low-latency exchange protocols.',
    contribution: 'Designed Strata’s memory-mapped zero-copy log architecture and deterministic snapshot format.',
    prior: 'Ex-Principal Systems Architect, LMAX Exchange',
  },
  {
    name: 'Kaelen Thorne',
    role: 'VP of Kernel Engineering',
    bio: 'Linux kernel contributor and eBPF pioneer. Led networking optimization groups building sub-microsecond packet steering infrastructures.',
    contribution: 'Engineered Strata’s eBPF kernel socket layer and zero-overhead memory ring buffer.',
    prior: 'Linux Kernel Contributor, Cloudflare Systems',
  },
  {
    name: 'Siddharth Rao',
    role: 'Head of Developer Experience',
    bio: 'Compiler and runtime engineer obsessed with ergonomics. Built multi-language WASM toolchains and developer tooling used by hundreds of thousands of developers.',
    contribution: 'Maintains Strata’s polyglot SDK bindings for Rust, TypeScript, Go, and Python.',
    prior: 'Ex-Fastly Wasm Tooling, Rust Lang Working Group',
  },
];

export const CORE_FEATURES: FeatureDeepDive[] = [
  {
    id: 'consensus',
    title: 'Causal Vector Quorums',
    headline: 'Leaderless multi-region consensus without geographic latency penalties.',
    summary: 'Raft and Paxos force all mutations through a single bottlenecked leader node. Strata replaces leader election with a partially-ordered causal lattice, delivering instantaneous local commits and sub-4ms continental convergence.',
    metrics: [
      { label: 'Local Commit Latency', value: '0.8', unit: 'ms' },
      { label: 'Global Cross-Region Convergence', value: '3.8', unit: 'ms' },
      { label: 'Formal TLA+ Verification', value: '100', unit: '%' },
    ],
    codeSnippet: `// Define a deterministic state schema with causal invariants
import { defineState, LatticeRegister } from '@strata/runtime';

export const CollaborativeDocument = defineState({
  id: 'doc-alpha',
  invariants: [
    (state) => state.versionVector.isMonotonic(),
    (state) => state.cursorPositions.size <= 256
  ],
  resolveConflict: (local, remote) => {
    // Mathematically bounded LUB (Least Upper Bound) join
    return LatticeRegister.merge(local, remote);
  }
});`,
    invariants: [
      'Strict causal consistency without monotonic clock synchronization vulnerabilities',
      'Zero leader failover downtime during node partition or crash',
      'Mathematically bounded memory footprint via automatic delta pruning',
    ],
  },
  {
    id: 'ebpf',
    title: 'Kernel-Bypass eBPF State Bus',
    headline: 'Process state transitions directly inside the Linux network stack.',
    summary: 'Traditional distributed brokers waste up to 70% of CPU cycles copying buffers between kernel space, user space, and runtime runtimes. Strata attaches eBPF filters directly to incoming network sockets for zero-copy state execution.',
    metrics: [
      { label: 'Throughput Per Node', value: '1.8M', unit: 'writes/s' },
      { label: 'Zero-Copy CPU Overhead', value: '< 2.4', unit: '%' },
      { label: 'Context Switching Latency', value: '0', unit: 'hops' },
    ],
    codeSnippet: `// Strata eBPF Socket Program [simplified schematic]
SEC("sockops")
int strata_rx_filter(struct bpf_sock_ops *skops) {
    if (skops->op == BPF_SOCK_OPS_PASSIVE_ESTABLISHED_CB) {
        // Direct memory mapping into Strata shared memory ring
        bpf_sock_ops_state_map(skops, &strata_shm_ring);
    }
    return 0;
}`,
    invariants: [
      'Sub-microsecond memory ring buffer dispatch',
      'No garbage collection pauses or thread contention',
      'Hardware-accelerated CRC64 state integrity checksums',
    ],
  },
  {
    id: 'timetravel',
    title: 'Deterministic Time-Travel & Snapshot Log',
    headline: 'Reproduce any production race condition down to the exact CPU cycle.',
    summary: 'Never guess what happened during a transient 3 AM outage. Strata captures an append-only cryptographic state journal that can be rewound, branched, and simulated in complete isolation without impacting live traffic.',
    metrics: [
      { label: 'Snapshot Restoration', value: '< 12', unit: 'ms' },
      { label: 'Log Compression Ratio', value: '14.2', unit: ':1' },
      { label: 'Cryptographic Integrity', value: 'SHA-256', unit: 'Merkle' },
    ],
    codeSnippet: `$ strata-cli log inspect --cluster us-east-1
State Merkle Root: 0x8f3c7a21...
[T-00:04:12] Mutation #40921 committed (Node us-east-1a)
[T-00:04:13] Partition detected on link us-east -> eu-central
[T-00:04:15] Local quorum maintained. 8,421 ops in branch
[T-00:04:22] Partition healed. Merged 8,421 ops in 1.4ms
[Result] 0 dropped writes. Invariants preserved.`,
    invariants: [
      'Cryptographically signed Merkle state roots for tamper-proof audit trails',
      'Instant parallel snapshot compaction without locking read/write paths',
      'Deterministic branch sandboxing for local regression testing',
    ],
  },
  {
    id: 'topology',
    title: 'Edge-to-Core Mesh Topology',
    headline: 'Run the exact same runtime in browser Wasm, edge workers, and bare-metal nodes.',
    summary: 'No separate client synchronization library. The Strata micro-kernel compiles to a single 180KB WebAssembly binary that runs in browsers and edge workers, maintaining identical semantics with the core server cluster.',
    metrics: [
      { label: 'Wasm Binary Footprint', value: '184', unit: 'KB' },
      { label: 'Offline Queue Capacity', value: 'Infinite', unit: 'local disk' },
      { label: 'Multi-Language SDKs', value: '6', unit: 'first-party' },
    ],
    codeSnippet: `import { createStrataClient } from '@strata/web';

const client = await createStrataClient({
  meshEndpoint: 'wss://edge.strata.systems/v1',
  storage: 'indexeddb', // Local persistent log buffer
  offlineFallback: 'optimistic-commit'
});

// Immediate local state write with causal vector guarantee
const mutation = client.mutate('fleet-state', (draft) => {
  draft.activeUnits.set('drone-08', { lat: 37.7749, lng: -122.4194 });
});`,
    invariants: [
      'Offline-first execution with guaranteed eventual convergence',
      'Unified type safety across frontend, edge, and backend clusters',
      'Zero serialization penalty with FlatBuffers memory layouts',
    ],
  },
];
