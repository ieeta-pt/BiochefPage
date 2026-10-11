// Every hands-on tutorial under /workflows/tutorials, with the three ways the
// Workflows page can group them. Each tutorial belongs to exactly one group per
// grouping, so no card appears twice in the same view.

export interface Tutorial {
  slug: string;
  title: string;
  summary: string;
  tools: string;
  time: string;
  /** How the workflow is built. */
  shape: keyof typeof SHAPES;
  /** Who it is most useful for. */
  community: keyof typeof COMMUNITIES;
  /** What it is about. */
  subject: keyof typeof SUBJECTS;
}

export const SHAPES = {
  single: { label: 'One tool', note: 'One input, one tool: the simplest workflow.' },
  chain: { label: 'A chain of tools', note: 'Each tool feeds the next.' },
  branches: { label: 'Branches', note: 'One input feeds several tools, so you compare results side by side.' },
  inputs: { label: 'Several inputs', note: 'Two or more files meet in one tool.' }
} as const;

export const COMMUNITIES = {
  teaching: { label: 'Getting started and teaching', note: 'No prior knowledge needed; good for a class.' },
  sequencing: { label: 'Sequencing labs and core facilities', note: 'Checking and preparing sequencing data.' },
  virology: { label: 'Virology and public health', note: 'Viral genomes and genomic surveillance.' },
  clinical: { label: 'Clinical and human genetics', note: 'Working with variants.' },
  microbiology: { label: 'Microbiology and genomics research', note: 'Genes, assemblies and genome comparison.' },
  evolution: { label: 'Evolution and phylogenetics', note: 'How sequences and species are related.' }
} as const;

export const SUBJECTS = {
  reads: { label: 'Reads and quality', note: 'Raw sequencing reads.' },
  mapping: { label: 'Mapping and coverage', note: 'Reads placed on a reference.' },
  variants: { label: 'Variants and consensus', note: 'Where a sample differs from the reference.' },
  genomes: { label: 'Genomes and genes', note: 'Whole sequences, their genes and assemblies.' },
  phylogenetics: { label: 'Phylogenetics', note: 'Alignments and trees.' }
} as const;

export const TUTORIALS: Tutorial[] = [
  {
    slug: 'sequence-basics',
    title: 'First steps with DNA sequences',
    summary: 'Count bases, cut a gene out of a genome and read it from the other strand.',
    tools: 'seqtk',
    time: '15 min',
    shape: 'branches',
    community: 'teaching',
    subject: 'genomes'
  },
  {
    slug: 'map-reads',
    title: 'Map reads to a reference',
    summary: 'Align reads with minimap2, sort them with samtools and count how many mapped. Every move in the editor is shown.',
    tools: 'minimap2 · samtools',
    time: '20 min',
    shape: 'chain',
    community: 'teaching',
    subject: 'mapping'
  },
  {
    slug: 'read-qc',
    title: 'Check and clean reads',
    summary: 'Filter low-quality reads with fastp and count what is left, before and after.',
    tools: 'fastp · seqtk',
    time: '15 min',
    shape: 'branches',
    community: 'sequencing',
    subject: 'reads'
  },
  {
    slug: 'paired-end',
    title: 'Clean and merge paired-end reads',
    summary: 'Filter read pairs and merge the ones that overlap into single longer reads.',
    tools: 'fastp · seqtk',
    time: '15 min',
    shape: 'inputs',
    community: 'sequencing',
    subject: 'reads'
  },
  {
    slug: 'coverage',
    title: 'Find where coverage drops',
    summary: 'Measure how much of a genome is covered and list the regions where an amplicon failed.',
    tools: 'minimap2 · samtools · gawk',
    time: '20 min',
    shape: 'branches',
    community: 'sequencing',
    subject: 'mapping'
  },
  {
    slug: 'viral-consensus',
    title: 'Build a viral consensus genome',
    summary: 'Call a sample’s consensus with ViralConsensus and check that it finds the mutations you know are there.',
    tools: 'minimap2 · samtools · ViralConsensus',
    time: '25 min',
    shape: 'chain',
    community: 'virology',
    subject: 'variants'
  },
  {
    slug: 'amplicon',
    title: 'Amplicon sequencing of a virus',
    summary: 'Trim primers, call variants and build a consensus with iVar, as in SARS-CoV-2 surveillance.',
    tools: 'minimap2 · samtools · iVar',
    time: '30 min',
    shape: 'chain',
    community: 'virology',
    subject: 'variants'
  },
  {
    slug: 'explore-variants',
    title: 'Explore and filter variants',
    summary: 'Summarise a VCF, keep the variants with enough quality and depth, and turn them into a table.',
    tools: 'bcftools',
    time: '15 min',
    shape: 'branches',
    community: 'clinical',
    subject: 'variants'
  },
  {
    slug: 'variants-in-genes',
    title: 'Which genes do the variants fall in?',
    summary: 'Overlap variants with gene coordinates and see why one variant can land in two genes.',
    tools: 'bcftools · bedtools',
    time: '15 min',
    shape: 'inputs',
    community: 'clinical',
    subject: 'variants'
  },
  {
    slug: 'find-genes',
    title: 'Find the genes in a genome',
    summary: 'Predict a phage’s genes with Prodigal, act on its error message and compare with the annotation.',
    tools: 'Prodigal',
    time: '15 min',
    shape: 'single',
    community: 'microbiology',
    subject: 'genomes'
  },
  {
    slug: 'assemble-genome',
    title: 'Assemble a small genome from reads',
    summary: 'Put a phage genome back together without a reference, then check it against the known genome.',
    tools: 'fermi-lite · minimap2',
    time: '20 min',
    shape: 'chain',
    community: 'microbiology',
    subject: 'genomes'
  },
  {
    slug: 'compare-genomes',
    title: 'Compare two related genomes',
    summary: 'Align two phage genomes, measure how similar they are and see why a circle aligns in two pieces.',
    tools: 'minimap2',
    time: '15 min',
    shape: 'inputs',
    community: 'microbiology',
    subject: 'genomes'
  },
  {
    slug: 'phylogeny',
    title: 'Align sequences and build a tree',
    summary: 'Align eight sequences with muscle, infer their tree with FastTree and compare them with TN93.',
    tools: 'muscle · FastTree · TN93',
    time: '20 min',
    shape: 'chain',
    community: 'evolution',
    subject: 'phylogenetics'
  },
  {
    slug: 'species-tree',
    title: 'Build a species tree from gene trees',
    summary: 'Combine 15 gene trees that disagree into one species tree with ASTRAL.',
    tools: 'ASTRAL',
    time: '15 min',
    shape: 'single',
    community: 'evolution',
    subject: 'phylogenetics'
  }
];

export const GROUPINGS = [
  { key: 'shape', label: 'Workflow type', groups: SHAPES },
  { key: 'community', label: 'Community', groups: COMMUNITIES },
  { key: 'subject', label: 'Subject', groups: SUBJECTS }
] as const;
