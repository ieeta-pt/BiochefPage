import { motion } from 'framer-motion';
import { useState } from 'react';
import { colors } from '../utils/colors';

interface WorkflowNode {
  id: string;
  label: string;
  type: 'WASM' | 'Agent' | 'Remote/WES' | 'UI';
  description: string;
  col: number; // Column (0-4 for left-to-right flow)
  row: number; // Row (0=top, 1=middle, 2=bottom)
}

// Browser-only WASM pipeline (matches what ships today). The 'Agent' and
// 'Remote/WES' variants are still allowed by the type union for future use
// but are intentionally absent from `typeConfig` so the legend stays honest.
const nodes: WorkflowNode[] = [
  { id: 'input', label: 'Input FASTQ', type: 'UI', description: 'Drop or paste a FASTQ sequence', col: 0, row: 1 },
  { id: 'stats', label: 'fastq-stats', type: 'WASM', description: 'Statistics on the input sequence', col: 1, row: 0 },
  { id: 'tofasta', label: 'fastq2fasta', type: 'WASM', description: 'Convert FASTQ to FASTA', col: 1, row: 2 },
  { id: 'reverse', label: 'fasta-reverse', type: 'WASM', description: 'Reverse the resulting FASTA', col: 2, row: 2 },
  { id: 'output', label: 'Output', type: 'UI', description: 'Live results in the Output panel', col: 3, row: 1 }
];

const edges: Array<{ from: string; to: string }> = [
  { from: 'input', to: 'stats' },
  { from: 'input', to: 'tofasta' },
  { from: 'tofasta', to: 'reverse' },
  { from: 'stats', to: 'output' },
  { from: 'reverse', to: 'output' }
];

const typeConfig: Record<string, { color: string; bgColor: string }> = {
  WASM: { color: colors.brand, bgColor: colors.brandLight },
  UI: { color: colors.text, bgColor: '#F5F5F7' }
};

// Grid configuration
const GRID = {
  cols: 4,
  rows: 3,
  nodeWidth: 120,
  nodeHeight: 56,
  paddingX: 40,
  paddingY: 30,
  gapX: 60,
  gapY: 40
};

const SVG_WIDTH = GRID.paddingX * 2 + GRID.cols * GRID.nodeWidth + (GRID.cols - 1) * GRID.gapX;
const SVG_HEIGHT = GRID.paddingY * 2 + GRID.rows * GRID.nodeHeight + (GRID.rows - 1) * GRID.gapY;

export default function WorkflowMock() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Calculate node position from grid coordinates
  const getNodePosition = (node: WorkflowNode) => {
    const x = GRID.paddingX + node.col * (GRID.nodeWidth + GRID.gapX);
    const y = GRID.paddingY + node.row * (GRID.nodeHeight + GRID.gapY);
    return { x, y };
  };

  // Get center point of a node for edge connections
  const getNodeCenter = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return { x: 0, y: 0 };
    const pos = getNodePosition(node);
    return {
      x: pos.x + GRID.nodeWidth / 2,
      y: pos.y + GRID.nodeHeight / 2
    };
  };

  // Calculate edge path with proper curves
  const getEdgePath = (fromId: string, toId: string) => {
    const from = getNodeCenter(fromId);
    const to = getNodeCenter(toId);

    const fromNode = nodes.find(n => n.id === fromId);
    const toNode = nodes.find(n => n.id === toId);
    if (!fromNode || !toNode) return '';

    // Exit from right edge of source node
    const startX = from.x + GRID.nodeWidth / 2;
    const startY = from.y;

    // Enter from left edge of target node
    const endX = to.x - GRID.nodeWidth / 2;
    const endY = to.y;

    // Calculate control points for smooth bezier curve
    const dx = endX - startX;
    const controlOffset = Math.max(dx * 0.4, 30);

    return `M ${startX} ${startY} C ${startX + controlOffset} ${startY}, ${endX - controlOffset} ${endY}, ${endX} ${endY}`;
  };

  const isNodeHighlighted = (nodeId: string) => {
    if (!hoveredNode && !selectedNode) return true;
    const activeNode = hoveredNode || selectedNode;
    if (nodeId === activeNode) return true;
    return edges.some(e =>
      (e.from === activeNode && e.to === nodeId) ||
      (e.to === activeNode && e.from === nodeId)
    );
  };

  const isEdgeHighlighted = (edge: { from: string; to: string }) => {
    if (!hoveredNode && !selectedNode) return true;
    const activeNode = hoveredNode || selectedNode;
    return edge.from === activeNode || edge.to === activeNode;
  };

  return (
    <div className="card card-padding" aria-label="Workflow builder demonstration">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="badge">Workflow builder</div>
          {selectedNode && (
            <button
              onClick={() => setSelectedNode(null)}
              className="text-xs text-text-secondary hover:text-text transition-colors"
            >
              Clear selection
            </button>
          )}
        </div>

        {/* Legend - compact inline */}
        <div className="flex flex-wrap gap-2 text-xs">
          {Object.entries(typeConfig).map(([label, config]) => (
            <span key={label} className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md" style={{ backgroundColor: config.bgColor }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: config.color }} />
              <span style={{ color: config.color }} className="font-medium">{label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Workflow Canvas - SVG based for precise control */}
      <div className="relative overflow-hidden rounded-xl bg-background border border-border">
        <svg
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="w-full h-auto"
          style={{ minHeight: 220, maxHeight: 320 }}
        >
          <defs>
            <marker
              id="workflow-arrow"
              markerWidth="8"
              markerHeight="6"
              refX="7"
              refY="3"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path d="M0,0 L8,3 L0,6 L2,3 Z" fill={colors.border} />
            </marker>
            <marker
              id="workflow-arrow-active"
              markerWidth="8"
              markerHeight="6"
              refX="7"
              refY="3"
              orient="auto"
              markerUnits="userSpaceOnUse"
            >
              <path d="M0,0 L8,3 L0,6 L2,3 Z" fill={colors.brand} />
            </marker>

            {/* Subtle grid pattern */}
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="0.5" fill={colors.border} opacity="0.3" />
            </pattern>
          </defs>

          {/* Background grid */}
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Edges - rendered first so nodes appear on top */}
          {edges.map((edge) => {
            const highlighted = isEdgeHighlighted(edge);
            return (
              <path
                key={`${edge.from}-${edge.to}`}
                d={getEdgePath(edge.from, edge.to)}
                stroke={highlighted ? colors.brand : colors.border}
                strokeWidth={highlighted ? 2 : 1.5}
                fill="none"
                opacity={highlighted ? 1 : 0.4}
                markerEnd={highlighted ? 'url(#workflow-arrow-active)' : 'url(#workflow-arrow)'}
                style={{ transition: 'all 0.2s ease' }}
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const config = typeConfig[node.type];
            const pos = getNodePosition(node);
            const highlighted = isNodeHighlighted(node.id);
            const isActive = hoveredNode === node.id || selectedNode === node.id;

            return (
              <g
                key={node.id}
                transform={`translate(${pos.x}, ${pos.y})`}
                style={{
                  cursor: 'pointer',
                  opacity: highlighted ? 1 : 0.4,
                  transition: 'opacity 0.2s ease'
                }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
              >
                {/* Node background */}
                <rect
                  x={0}
                  y={0}
                  width={GRID.nodeWidth}
                  height={GRID.nodeHeight}
                  rx={10}
                  fill={colors.surface}
                  stroke={config.color}
                  strokeWidth={isActive ? 2.5 : 2}
                  style={{
                    filter: isActive ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.08))',
                    transition: 'all 0.2s ease'
                  }}
                />

                {/* Type label */}
                <text
                  x={GRID.nodeWidth / 2}
                  y={18}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="700"
                  fill={config.color}
                  style={{ fontFamily: 'system-ui, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                >
                  {node.type}
                </text>

                {/* Node label */}
                <text
                  x={GRID.nodeWidth / 2}
                  y={38}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="600"
                  fill={colors.text}
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Help text */}
        <div className="absolute bottom-2 left-2 text-[10px] text-text-tertiary bg-surface/80 backdrop-blur-sm px-2 py-1 rounded border border-border/50">
          Click nodes to explore connections
        </div>
      </div>

      {/* Selected node details */}
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-xl bg-brand-50 border border-brand-200"
        >
          {(() => {
            const node = nodes.find(n => n.id === selectedNode);
            if (!node) return null;
            const config = typeConfig[node.type];

            return (
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: config.bgColor }}
                >
                  <span className="text-base font-bold" style={{ color: config.color }}>
                    {node.label.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-text text-sm">{node.label}</h4>
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase"
                      style={{ backgroundColor: config.bgColor, color: config.color }}
                    >
                      {node.type}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary">{node.description}</p>
                  {edges.filter(e => e.from === selectedNode).length > 0 && (
                    <div className="mt-2 flex gap-2">
                      <span className="text-xs text-text-tertiary">Next:</span>
                      {edges.filter(e => e.from === selectedNode).map(e => {
                        const target = nodes.find(n => n.id === e.to);
                        return target ? (
                          <button
                            key={e.to}
                            onClick={() => setSelectedNode(e.to)}
                            className="text-xs text-brand hover:text-brand-dark font-medium transition-colors"
                          >
                            {target.label} →
                          </button>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </motion.div>
      )}
    </div>
  );
}
