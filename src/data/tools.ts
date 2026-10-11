// One description per tool, shared by every tutorial that uses it, so the
// wording stays the same everywhere. Each link goes to the tool's own site.
export const TOOLS = {
  minimap2: {
    name: 'minimap2',
    role: 'Aligns DNA sequences, from short reads to whole genomes, against a reference. It writes SAM for downstream tools or PAF, a plain table of where each sequence matches.',
    url: 'https://github.com/lh3/minimap2'
  },
  samtools: {
    name: 'samtools',
    role: 'Works with alignment files (SAM, BAM): sorts them and reports mapping statistics, coverage and per-position read counts.',
    url: 'https://www.htslib.org/'
  },
  fastp: {
    name: 'fastp',
    role: 'Checks and cleans FASTQ reads: removes low-quality reads, trims adapters and, for paired reads, merges pairs that overlap.',
    url: 'https://github.com/OpenGene/fastp'
  },
  seqtk: {
    name: 'seqtk',
    role: 'A small toolkit for FASTA and FASTQ files: counts reads and bases, reports base composition, extracts regions and reverse-complements sequences.',
    url: 'https://github.com/lh3/seqtk'
  },
  viralconsensus: {
    name: 'ViralConsensus',
    role: 'Builds a consensus genome from reads mapped to a reference, writing <code>N</code> where the evidence is too thin to call a base.',
    url: 'https://github.com/niemasd/ViralConsensus'
  },
  muscle: {
    name: 'muscle',
    role: 'Aligns several sequences to one another, inserting gaps so that matching positions line up in columns.',
    url: 'https://www.drive5.com/muscle/'
  },
  fasttree: {
    name: 'FastTree',
    role: 'Infers an approximately maximum-likelihood phylogenetic tree from an alignment and writes it in Newick format with support values.',
    url: 'http://www.microbesonline.org/fasttree/'
  },
  tn93: {
    name: 'TN93',
    role: 'Computes pairwise genetic distances between aligned sequences with the Tamura–Nei 1993 model and lists the pairs closer than a threshold.',
    url: 'https://github.com/veg/tn93'
  },
  prodigal: {
    name: 'Prodigal',
    role: 'Finds protein-coding genes in bacterial and phage genomes and writes their coordinates and protein sequences.',
    url: 'https://github.com/hyattpd/Prodigal'
  },
  bcftools: {
    name: 'bcftools',
    role: 'Works with variant files (VCF, BCF): filters variants, extracts fields into tables and summarises them.',
    url: 'https://samtools.github.io/bcftools/'
  },
  bedtools: {
    name: 'bedtools',
    role: 'Compares genomic intervals, such as variants and genes, and reports where they overlap.',
    url: 'https://bedtools.readthedocs.io/'
  },
  fermilite: {
    name: 'fermi-lite',
    role: 'Assembles short reads into longer contiguous sequences (contigs) without a reference. Meant for small genomes and regions.',
    url: 'https://github.com/lh3/fermi-lite'
  },
  ivar: {
    name: 'iVar',
    role: 'Tools for amplicon sequencing, as used for SARS-CoV-2: trims primers from aligned reads, then calls variants and a consensus from a pileup.',
    url: 'https://andersen-lab.github.io/ivar/html/'
  },
  gawk: {
    name: 'gawk',
    role: 'GNU awk: a small language for filtering and summarising text tables line by line.',
    url: 'https://www.gnu.org/software/gawk/'
  },
  astral: {
    name: 'ASTRAL (ASTER)',
    role: 'Combines many gene trees into one species tree, coping with genes whose histories disagree. Support values are local posterior probabilities.',
    url: 'https://github.com/chaoszhang/ASTER'
  }
} as const;
