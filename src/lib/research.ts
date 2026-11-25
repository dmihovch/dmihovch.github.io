export const publication = {
	title: 'Benchmarking LLM Inference on Desktop-Scale NVIDIA Grace Blackwell Clusters',
	authors: [
		'Kevin Bhimani',
		'Christian Escobar',
		'Daniel Mihovch',
		'Rudolf Eigenmann',
		'Sunita Chandrasekaran'
	],
	equalContributors: ['Kevin Bhimani', 'Christian Escobar', 'Daniel Mihovch'],
	status: 'arXiv preprint',
	date: 'November 15, 2026',
	publicationDate: '2026/11/15',
	year: 2026,
	arxivId: '2611.20289',
	arxivUrl: 'https://arxiv.org/abs/2611.20289',
	doiUrl: 'https://doi.org/10.48550/arXiv.2611.20289',
	pdfSrc: '/research/dgx-spark-llm-inference/paper.pdf',
	citationSrc: '/research/dgx-spark-llm-inference/citation.bib',
	figureSrc: '/research/dgx-spark-llm-inference/performance-gains.webp',
	codeUrl: 'https://github.com/kevinhbhimani/dgx-spark-llm-serving-benchmark',
	dataUrl:
		'https://github.com/kevinhbhimani/dgx-spark-llm-serving-benchmark/tree/main/results/RDMA-Betelgeuse-Suite-benchmark-2026-10-30-001',
	summary:
		'We benchmark 17 language-model checkpoints on one and two DGX Sparks, comparing tensor parallelism, pipeline parallelism, and replication across throughput, latency, and GPU energy use.',
	contribution:
		'I modified the existing benchmark harness to enable RDMA, oversaw the experiments that produced the paper’s data, and edited the manuscript.',
	abstract: [
		'Two NVIDIA DGX Spark GB10 systems connect directly over 200 GbE to serve larger language models and increase inference capacity, but the benefits depend on how they are deployed. We benchmark 17 open-weight checkpoints spanning dense and mixture-of-experts architectures, 8B to 235B parameters and four weight precisions on one and two RDMA-connected systems.',
		'Using vLLM, we compare tensor parallelism (TP=2), pipeline parallelism (PP=2) and a two-replica baseline at concurrency 1 to 64, with three independent launches per configuration. TP=2 delivers a median 1.59× peak-throughput gain over one Spark, versus 1.39× for PP=2 and has higher throughput in 93 of 96 matched comparisons with separated 95% Welch intervals. It reduces unloaded inter-token latency to 0.52× to 0.73× of one Spark, whereas PP=2 provides little reduction.',
		'TP=2 also achieves the highest goodput under a strict 100 ms inter-token latency objective wherever both strategies are supported and the objective is met. For models fitting on one Spark, TP=2 generally favors low-concurrency serving, while replication offers higher throughput at high concurrency. One Spark uses less GPU energy per output token at matched concurrency. Across three precision ladders, NVFP4 reduces unloaded latency more than adding a second Spark at BF16.',
		'NCCL microbenchmarks and comparisons with an earlier TCP campaign suggest that collective communication overhead contributes to the advantage of TP=2. These results provide deployment guidance for desktop-scale inference.'
	],
	bibtex: `@misc{bhimani2026dgxspark,
  title = {Benchmarking {LLM} Inference on Desktop-Scale {NVIDIA} Grace Blackwell Clusters},
  author = {Bhimani, Kevin and Escobar, Christian and Mihovch, Daniel and Eigenmann, Rudolf and Chandrasekaran, Sunita},
  year = {2026},
  eprint = {2611.20289},
  archivePrefix = {arXiv},
  primaryClass = {cs.DC},
  doi = {10.48550/arXiv.2611.20289},
  url = {https://arxiv.org/abs/2611.20289}
}`
};

type ResearchPoster = {
	id: string;
	title: string;
	topic: string;
	summary: string;
	pdfSrc: string;
	previewSrc: string;
	previewWidth: number;
	previewHeight: number;
	event?: string;
	date?: string;
	codeUrl?: string;
	relatedPublication?: boolean;
};

export const posters: ResearchPoster[] = [
	{
		id: 'multi-spark-llm-inference',
		title: 'Multi-Spark LLM Inference: Tensor and Pipeline Parallelism over ConnectX-7 RoCEv2',
		topic: 'LLM inference',
		summary:
			'A single-checkpoint study of throughput and latency on two RDMA-connected DGX Sparks. This preliminary experiment precedes the paper’s broader benchmark.',
		pdfSrc: '/research/posters/multi-spark-llm-inference.pdf',
		previewSrc: '/research/posters/multi-spark-llm-inference.webp',
		previewWidth: 1200,
		previewHeight: 675,
		event: 'Supercomputing',
		date: 'November 2026',
		relatedPublication: true
	},
	{
		id: 'vit-activation-profiling',
		title:
			'Outliers by Design: Activation Structure and Ablation Sensitivity in Vision Transformers',
		topic: 'ML profiling',
		summary:
			'Profiling ViT-B/16 activations on ImageNet-1k and comparing global and per-channel outlier ablation to study the role of channel means and variance in accuracy loss.',
		pdfSrc: '/research/posters/vit-activation-profiling.pdf',
		previewSrc: '/research/posters/vit-activation-profiling.webp',
		previewWidth: 1200,
		previewHeight: 887,
		event: 'UD Summer Scholars Symposium',
		date: 'August 2026',
		codeUrl: 'https://github.com/dmihovch/ViT-Quantization-Summer-Scholars'
	},
	{
		id: 'decentralized-drone-swarming',
		title: 'Decentralized Multi-Agent Control of Automated Aerial Systems',
		topic: 'Drone swarming',
		summary:
			'A reproducible multi-drone simulation environment using Gazebo, ROS, and Docker, with a bridge between DJI commands and simulated drones for testing swarm control.',
		pdfSrc: '/research/posters/decentralized-drone-swarming.pdf',
		previewSrc: '/research/posters/decentralized-drone-swarming.webp',
		previewWidth: 1200,
		previewHeight: 887,
		event: 'UD VIP Conference',
		date: 'April 2026'
	}
];
