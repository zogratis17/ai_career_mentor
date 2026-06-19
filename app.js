/**
 * AEGIS - Agentic AI Career Mentor & Job Recommendation Engine
 * Core Application Script - High Interactivity Update
 */

// ==========================================
// 1. DATASETS & CONFIGURATIONS
// ==========================================

// Curriculum Tracks
const TRACKS_DATA = {
  genai: {
    title: "Generative AI & LLM Systems",
    totalHours: 120,
    steps: [
      {
        id: "genai_s1",
        title: "Deep Learning Foundations",
        desc: "Master matrix operations, gradients, backpropagation, and multilayer perceptrons (MLP) in PyTorch.",
        hours: 20,
        resources: [
          { name: "3Blue1Brown Neural Networks", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi" },
          { name: "Karpathy's micrograd", url: "https://github.com/karpathy/micrograd" }
        ],
        skillImpacts: { math: 15, frameworks: 20 },
        challenge: {
          name: "Forward Pass of a Dense Neuron",
          desc: "Calculate the dense output 'y' given weight matrix 'W', inputs 'x', and bias 'b' using numpy dot product.",
          filename: "forward.py",
          initialCode: "import numpy as np\n\ndef forward(W, x, b):\n    # Calculate Wx + b\n    return _____",
          solutionRegex: /return\s+np\.(dot\s*\(\s*W\s*,\s*x\s*\)|dot\s*\(\s*x\s*,\s*W\s*\))\s*\+\s*b|return\s+(W\s*@\s*x|x\s*@\s*W)\s*\+\s*b/
        }
      },
      {
        id: "genai_s2",
        title: "Transformer Architectures",
        desc: "Implement Self-Attention, Multi-Head Attention, positional encoding, and building GPT from scratch.",
        hours: 30,
        resources: [
          { name: "Attention Is All You Need Paper", url: "https://arxiv.org/abs/1706.03762" },
          { name: "Karpathy's Let's Build GPT", url: "https://youtu.be/kCc8FmEb1nY" }
        ],
        skillImpacts: { math: 15, frameworks: 30, llms: 20 },
        challenge: {
          name: "Scaled Dot-Product Attention Score",
          desc: "Calculate the attention scores before softmax: Q K^T / sqrt(d_k) using numpy operations.",
          filename: "attention.py",
          initialCode: "import numpy as np\n\ndef attention_score(Q, K, d_k):\n    # Calculate Q * K.T / sqrt(d_k)\n    return _____",
          solutionRegex: /return\s+np\.dot\(\s*Q\s*,\s*K\.T\s*\)\s*\/\s*np\.sqrt\(\s*d_k\s*\)|return\s+\(\s*Q\s*@\s*K\.T\s*\)\s*\/\s*np\.sqrt\(\s*d_k\s*\)/
        }
      },
      {
        id: "genai_s3",
        title: "Vector Databases & RAG Systems",
        desc: "Design Retrieval Augmented Generation pipelines, chunking strategies, embeddings, FAISS/Pinecone indexing, and metadata filtering.",
        hours: 20,
        resources: [
          { name: "Pinecone RAG Handbook", url: "https://www.pinecone.io/learn/retrieval-augmented-generation/" },
          { name: "LangChain RAG Tutorial", url: "https://python.langchain.com/docs/tutorials/rag/" }
        ],
        skillImpacts: { llms: 40, operations: 15 }
      },
      {
        id: "genai_s4",
        title: "Fine-Tuning & Alignment",
        desc: "Execute Parameter-Efficient Fine-Tuning (PEFT) using LoRA/QLoRA on consumer GPUs. Implement RLHF, DPO, and model quantization.",
        hours: 30,
        resources: [
          { name: "Hugging Face PEFT Library", url: "https://huggingface.co/docs/peft/index" },
          { name: "QLoRA Paper", url: "https://arxiv.org/abs/2305.14314" }
        ],
        skillImpacts: { math: 10, frameworks: 25, llms: 25 }
      },
      {
        id: "genai_s5",
        title: "Multi-Agent Orchestration",
        desc: "Develop stateful, multi-agent cooperative workflows using LangGraph and CrewAI. Audit agent behavior and tooling loops.",
        hours: 20,
        resources: [
          { name: "LangGraph Documentation", url: "https://langchain-ai.github.io/langgraph/" },
          { name: "CrewAI Framework", url: "https://www.crewai.com/" }
        ],
        skillImpacts: { llms: 30, operations: 25 }
      }
    ],
    targetSkills: { dev: 95, math: 75, frameworks: 85, llms: 90, operations: 70 }
  },
  nlp: {
    title: "Natural Language Processing (NLP)",
    totalHours: 120,
    steps: [
      {
        id: "nlp_s1",
        title: "Text Representation & Classical NLP",
        desc: "Understand word embeddings (Word2Vec, GloVe), tokenization algorithms, tf-idf, and sequence learning with LSTMs.",
        hours: 20,
        resources: [
          { name: "Stanford CS224n Lecture 1", url: "https://web.stanford.edu/class/cs224n/" },
          { name: "Spacy Tokenization", url: "https://spacy.io/usage/linguistic-features#tokenization" }
        ],
        skillImpacts: { math: 15, frameworks: 15 }
      },
      {
        id: "nlp_s2",
        title: "BERT, Encoder Models & Masking",
        desc: "Master bidirectional attention models, masked language modeling (MLM), fine-tuning BERT for classification and NER.",
        hours: 25,
        resources: [
          { name: "BERT Paper (Devlin et al.)", url: "https://arxiv.org/abs/1810.04805" },
          { name: "Hugging Face Course", url: "https://huggingface.co/learn/nlp-course/chapter1/1" }
        ],
        skillImpacts: { math: 15, frameworks: 30, llms: 15 }
      },
      {
        id: "nlp_s3",
        title: "Decoder Models & Text Generation",
        desc: "Analyze autoregressive decoding strategies: greedy search, beam search, nucleus sampling, temperature tuning, and Repetition Penalty.",
        hours: 15,
        resources: [
          { name: "HF Generation Strategies", url: "https://huggingface.co/blog/how-to-generate" }
        ],
        skillImpacts: { llms: 30, math: 10 }
      },
      {
        id: "nlp_s4",
        title: "Semantic Search & Vector Embeddings",
        desc: "Train bi-encoders using SentenceTransformers. Build cross-encoders for re-ranking search result pipelines.",
        hours: 30,
        resources: [
          { name: "SentenceTransformers Documentation", url: "https://www.sbert.net/" }
        ],
        skillImpacts: { frameworks: 25, llms: 30 }
      },
      {
        id: "nlp_s5",
        title: "NLP Evaluation & Alignment Diagnostics",
        desc: "Evaluate language models using GLUE, SuperGLUE, ROUGE, BLEU, and audit pipelines for semantic drift and toxicity.",
        hours: 30,
        resources: [
          { name: "HELM Benchmark", url: "https://crfm.stanford.edu/helm/latest/" }
        ],
        skillImpacts: { math: 15, llms: 25, operations: 20 }
      }
    ],
    targetSkills: { dev: 90, math: 75, frameworks: 80, llms: 85, operations: 65 }
  },
  cv: {
    title: "Computer Vision & Robotics",
    totalHours: 120,
    steps: [
      {
        id: "cv_s1",
        title: "Convolutions & Feature Extraction",
        desc: "Learn Spatial Convolution, kernel architectures, pooling layers, ResNet skip-connections, and PyTorch CNN blocks.",
        hours: 20,
        resources: [
          { name: "PyTorch CNN Tutorial", url: "https://pytorch.org/tutorials/beginner/blitz/cifar10_tutorial.html" },
          { name: "ResNet Paper", url: "https://arxiv.org/abs/1512.03385" }
        ],
        skillImpacts: { math: 20, frameworks: 25 }
      },
      {
        id: "cv_s2",
        title: "Object Detection & Segmentation",
        desc: "Configure boundary box predictors. Build YOLOv8 pipelines and deploy Mask R-CNN models for pixel segmentation.",
        hours: 30,
        resources: [
          { name: "YOLOv8 Docs", url: "https://docs.ultralytics.com/" }
        ],
        skillImpacts: { math: 10, frameworks: 35 },
        challenge: {
          name: "Intersection over Union (IoU) Fraction",
          desc: "Complete the fraction logic to compute bounding box overlap IoU: intersection area divided by union area.",
          filename: "iou.py",
          initialCode: "def calculate_iou(intersection, union):\n    # Calculate IoU fraction\n    return _____",
          solutionRegex: /return\s+intersection\s*\/\s*union/
        }
      },
      {
        id: "cv_s3",
        title: "Vision Transformers (ViT) & Multi-modal",
        desc: "Implement patch embeddings, learn how Vision Transformers process visual sequences, and work with OpenAI CLIP models.",
        hours: 25,
        resources: [
          { name: "ViT Paper", url: "https://arxiv.org/abs/2010.11929" },
          { name: "CLIP Paper & Code", url: "https://github.com/openai/CLIP" }
        ],
        skillImpacts: { math: 15, frameworks: 25, llms: 20 }
      },
      {
        id: "cv_s4",
        title: "Generative Vision Models",
        desc: "Understand Diffusion Models, noise schedules, U-Net, Stable Diffusion architectures, and Neural Radiance Fields (NeRF).",
        hours: 25,
        resources: [
          { name: "Hugging Face Diffusion models", url: "https://huggingface.co/docs/diffusers/index" }
        ],
        skillImpacts: { math: 20, frameworks: 15, llms: 25 }
      },
      {
        id: "cv_s5",
        title: "Edge Deployment & Hardware Optimization",
        desc: "Quantize models to INT8. Export architectures via ONNX, compile using NVIDIA TensorRT, and integrate with ROS controllers.",
        hours: 20,
        resources: [
          { name: "NVIDIA TensorRT Tutorial", url: "https://developer.nvidia.com/tensorrt" }
        ],
        skillImpacts: { operations: 45, frameworks: 10 }
      }
    ],
    targetSkills: { dev: 90, math: 85, frameworks: 90, llms: 55, operations: 75 }
  },
  llmops: {
    title: "LLMOps & Production AI",
    totalHours: 120,
    steps: [
      {
        id: "llmops_s1",
        title: "Containers & GPU Virtualization",
        desc: "Configure Docker containers with CUDA, leverage NVIDIA Container Toolkit, and schedule jobs inside Kubernetes.",
        hours: 15,
        resources: [
          { name: "NVIDIA Container Toolkit Guide", url: "https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/index.html" }
        ],
        skillImpacts: { operations: 40 }
      },
      {
        id: "llmops_s2",
        title: "High-Performance LLM Serving",
        desc: "Configure inference servers using vLLM, Hugging Face TGI, and Triton. Implement continuous batching and PagedAttention.",
        hours: 30,
        resources: [
          { name: "vLLM Engine", url: "https://github.com/vllm-project/vllm" },
          { name: "PagedAttention Paper", url: "https://arxiv.org/abs/2309.06180" }
        ],
        skillImpacts: { operations: 35, llms: 15, frameworks: 10 },
        challenge: {
          name: "Model FP16 Quantization Serving",
          desc: "Convert a PyTorch transformer model to 16-bit precision to fit on standard inference GPU memory pools.",
          filename: "quant.py",
          initialCode: "import torch\n\ndef serving_quantize(model):\n    # Convert model to float16 weights\n    return _____",
          solutionRegex: /return\s+model\.half\(\s*\)|return\s+model\.to\(\s*torch\.float16\s*\)/
        }
      },
      {
        id: "llmops_s3",
        title: "Vector DB Clustering & Semantic Caching",
        desc: "Cluster vector engines. Deploy Redis caches for high-frequency semantic queries, and manage shards under heavy load.",
        hours: 20,
        resources: [
          { name: "Milvus Clustering Guide", url: "https://milvus.io/docs/v2.0.x/scaleout.md" },
          { name: "GPTCache Library", url: "https://github.com/zilliztech/GPTCache" }
        ],
        skillImpacts: { operations: 25, llms: 25 }
      },
      {
        id: "llmops_s4",
        title: "AI Experiment Tracking & Pipelines",
        desc: "Integrate MLflow and Weights & Biases inside pipeline loops. Configure evaluations using Arize or LangSmith.",
        hours: 30,
        resources: [
          { name: "Weights & Biases Docs", url: "https://docs.wandb.ai/" },
          { name: "Arize AI Monitoring", url: "https://docs.arize.com/arize/" }
        ],
        skillImpacts: { operations: 30, math: 10 }
      },
      {
        id: "llmops_s5",
        title: "Guardrails & Prompt Defense",
        desc: "Deploy validation pipelines using NeMo Guardrails and Llama Guard. Defend APIs from jailbreaks and prompt injection.",
        hours: 25,
        resources: [
          { name: "NVIDIA NeMo Guardrails", url: "https://github.com/NVIDIA/NeMo-Guardrails" }
        ],
        skillImpacts: { operations: 20, llms: 30 }
      }
    ],
    targetSkills: { dev: 95, math: 60, frameworks: 70, llms: 80, operations: 95 }
  }
};

// Simulated Jobs Database (LinkedIn & Naukri)
const JOBS_DATABASE = [
  {
    id: "job_1",
    title: "AI Integrations Developer",
    company: "HexaScale Technologies",
    location: "Bengaluru, India (Hybrid)",
    platform: "naukri",
    salary: "₹10L - ₹14L / year",
    unlockProgress: 0,
    matchBase: 65,
    skills: ["Python", "API integration", "LangChain", "VectorDB"],
    track: "genai",
    desc: "Deploy API-wrapped generative intelligence modules. Implement RAG connectors with corporate databases and maintain vector index integrity.",
    interview: [
      {
        q: "What data structure is optimized for semantic similarity search of embeddings?",
        options: ["B-Tree Index", "Vector Index (e.g. HNSW, IVF)", "Hash Table", "Binary Search Tree"],
        correctIndex: 1
      },
      {
        q: "In LangChain, what is a 'Chain' responsible for?",
        options: ["Encrypting user credentials", "Chaining multiple prompt layers, models, and tools sequentially", "Running parallel API fetching tasks"],
        correctIndex: 1
      },
      {
        q: "What does RAG stand for?",
        options: ["Random Adversarial Generation", "Retrieval Augmented Generation", "Recurrent Attention Gate"],
        correctIndex: 1
      }
    ],
    resumeInjections: [
      "+ Designed semantic search nodes using Pinecone HNSW indexing",
      "+ Implemented prompt sequential loops in LangChain for multi-agent calls"
    ]
  },
  {
    id: "job_2",
    title: "Associate NLP Engineer",
    company: "OmniAI Insights",
    location: "Noida, India (Onsite)",
    platform: "naukri",
    salary: "₹8L - ₹12L / year",
    unlockProgress: 20,
    matchBase: 60,
    skills: ["Python", "PyTorch", "NLTK", "HuggingFace"],
    track: "nlp",
    desc: "Maintain tokenization microservices, train sentence encoders, and perform fine-tuning setups on custom BERT and classifier models.",
    interview: [
      {
        q: "Which sub-word tokenization algorithm is natively used by the BERT tokenizer?",
        options: ["WordPiece", "Byte-Pair Encoding (BPE)", "SentencePiece"],
        correctIndex: 0
      },
      {
        q: "What is the primary role of the Self-Attention mechanism in NLP?",
        options: ["Evaluating text sentiment", "Computing correlation of each token against all other tokens in a sequence", "Performing character mapping"],
        correctIndex: 1
      },
      {
        q: "Which metric is standard for evaluating text summarization quality?",
        options: ["GLUE Score", "BLEU Score", "ROUGE Score"],
        correctIndex: 2
      }
    ],
    resumeInjections: [
      "+ Finetuned BERT token classifiers using PyTorch training wrappers",
      "+ Audited text generation token sequences with ROUGE metrics"
    ]
  },
  {
    id: "job_3",
    title: "Generative AI Specialist",
    company: "NeuraLink Systems",
    location: "Hyderabad, India (Remote)",
    platform: "linkedin",
    salary: "₹18L - ₹24L / year",
    unlockProgress: 40,
    matchBase: 55,
    skills: ["PyTorch", "Transformer Architecture", "RAG", "LoRA"],
    track: "genai",
    desc: "Design domain-specific fine-tuning pipelines. Quantize transformer architectures for Edge execution and configure custom attention layers.",
    interview: [
      {
        q: "Which parameter controls nucleus sampling by restricting predictions to a cumulative probability threshold?",
        options: ["Temperature", "Top-P", "Frequency Penalty"],
        correctIndex: 1
      },
      {
        q: "How does LoRA reduce fine-tuning memory footprint?",
        options: ["Freezing base layers and injecting low-rank parameter decomposition matrices", "Quantizing optimizer states to float8", "Using CPU swapping"],
        correctIndex: 0
      },
      {
        q: "Which alignment method optimizes models directly from human ranking without a standalone reward model?",
        options: ["PPO RLHF", "DPO (Direct Preference Optimization)", "Supervised Tuning (SFT)"],
        correctIndex: 1
      }
    ],
    resumeInjections: [
      "+ Configured LoRA adapter injections on Llama models to optimize local training memory",
      "+ Optimized alignment paths using DPO preference frameworks"
    ]
  },
  {
    id: "job_4",
    title: "Computer Vision Research Engineer",
    company: "AeroVision AI",
    location: "Pune, India (Hybrid)",
    platform: "naukri",
    salary: "₹14L - ₹20L / year",
    unlockProgress: 40,
    matchBase: 50,
    skills: ["Python", "C++", "PyTorch", "OpenCV", "YOLO"],
    track: "cv",
    desc: "Optimize spatial boundary-box prediction models. Train and fine-tune convolutional neural networks and deploy custom vision transformers.",
    interview: [
      {
        q: "What algebraic formulation represents skip-connections in ResNet blocks?",
        options: ["y = F(x) * x", "y = F(x) + x", "y = F(x) / x"],
        correctIndex: 1
      },
      {
        q: "Which model suite is optimized for boundary box segmentation tasks in real-time vision loops?",
        options: ["YOLOv8-Seg", "ViT", "AlexNet"],
        correctIndex: 0
      },
      {
        q: "What does Vision Transformer (ViT) split input images into to process them as sequences?",
        options: ["Fuzzy coordinates", "Non-overlapping patches", "Pixel grids"],
        correctIndex: 1
      }
    ],
    resumeInjections: [
      "+ Trained custom ResNet skip-architectures for object segmentation tasks",
      "+ Compiled YOLOv8-Seg modules to compile Edge detection pipelines"
    ]
  },
  {
    id: "job_5",
    title: "LLMOps & Infrastructure Engineer",
    company: "DataScale Solutions",
    location: "Bengaluru, India (Hybrid)",
    platform: "linkedin",
    salary: "₹22L - ₹30L / year",
    unlockProgress: 60,
    matchBase: 45,
    skills: ["Kubernetes", "Docker", "Triton Inference", "MLflow"],
    track: "llmops",
    desc: "Architect GPU scheduling pipelines inside Kubernetes cluster loops. Configure Triton inference engines with PagedAttention and monitor telemetry logs.",
    interview: [
      {
        q: "What technique improves serving throughput by caching keys and values of tokens?",
        options: ["Dynamic quantizing", "KV Caching (e.g. PagedAttention)", "Lazy weights loading"],
        correctIndex: 1
      },
      {
        q: "Which engine is optimized for high-throughput serving of LLMs via continuous batching?",
        options: ["vLLM", "Flask / WSGI", "Triton CPU Server"],
        correctIndex: 0
      },
      {
        q: "What is a main advantage of Triton Inference Server?",
        options: ["Translating code between Python and C++", "Hosting multiple framework models concurrently with dynamic batching support", "Writing SQL connectors"],
        correctIndex: 1
      }
    ],
    resumeInjections: [
      "+ Integrated vLLM serving runtimes with dynamic PagedAttention support",
      "+ Automated GPU scaling scripts in Kubernetes pipelines"
    ]
  },
  {
    id: "job_6",
    title: "Principal AI Architect",
    company: "Cognitive Enterprise",
    location: "Bengaluru, India (Onsite)",
    platform: "naukri",
    salary: "₹35L - ₹48L / year",
    unlockProgress: 80,
    matchBase: 40,
    skills: ["RLHF", "DPO", "Custom Tokenizers", "Scale LLM Serving"],
    track: "genai",
    desc: "Lead custom foundation model training initiatives. Architect RLHF/DPO loops, manage high-density supercomputer clusters, and deploy safety guardrails.",
    interview: [
      {
        q: "Which module checks incoming/outgoing prompts for toxic content and safety policy violations?",
        options: ["MLflow", "Llama Guard / NeMo Guardrails", "Triton Engine"],
        correctIndex: 1
      },
      {
        q: "What GPU architecture represents standard high-bandwidth hardware for foundation model training?",
        options: ["NVIDIA H100/A100 Tensor Core GPUs", "NVIDIA RTX 4090", "Apple M3 Max"],
        correctIndex: 0
      },
      {
        q: "In RLHF, what is the role of the Reward Model?",
        options: ["Sampling new prompt questions", "Predicting scalar rewards representing human preference alignment for outputs", "Quantizing target weights"],
        correctIndex: 1
      }
    ],
    resumeInjections: [
      "+ Coordinated LLM safety loops using Llama Guard validation checks",
      "+ Managed cluster nodes on H100 systems to perform model updates"
    ]
  }
];

// Initial User Profile (Coding expert but AI beginner)
const INITIAL_SKILLS = {
  dev: 85,        // Strong background in software dev (JS, Python, API, DB)
  math: 25,       // Lacks AI math foundations (matrix, prob, stats)
  frameworks: 15, // Lacks PyTorch/Tensorflow experience
  llms: 20,       // Has used API wrappers, knows simple prompts
  operations: 30  // Understands standard DevOps (Docker, Git), but not LLMOps
};

// Diagnostic Quiz questions
const DIAGNOSTIC_QUESTIONS = [
  {
    title: "What is your primary software engineering background?",
    options: [
      { text: "Backend Dev (Python, Node, SQL, APIs)", skillWeight: { dev: 90, math: 25, frameworks: 15, llms: 25, operations: 35 } },
      { text: "Frontend / Mobile Dev (JS, React, Mobile UI)", skillWeight: { dev: 85, math: 20, frameworks: 10, llms: 20, operations: 25 } },
      { text: "Data Analyst / BI (Python, SQL, Pandas, Tableau)", skillWeight: { dev: 75, math: 40, frameworks: 20, llms: 15, operations: 20 } },
      { text: "Full Stack Engineer (Generalist)", skillWeight: { dev: 90, math: 25, frameworks: 15, llms: 20, operations: 30 } }
    ]
  },
  {
    title: "How comfortable are you with Linear Algebra, Calculus, and Probability?",
    options: [
      { text: "Minimal (Know basic matrices, need algebra refresher)", skillWeight: { math: 25 } },
      { text: "Intermediate (Understand derivatives, dot products, probability)", skillWeight: { math: 50 } },
      { text: "Advanced (Formulate gradients, backpropagation, and multivariate distributions)", skillWeight: { math: 80 } }
    ]
  },
  {
    title: "What is your practical experience with training loops and deep learning frameworks?",
    options: [
      { text: "None (Never written neural network training loops)", skillWeight: { frameworks: 15 } },
      { text: "Concept Only (Completed academic tutorials, used simple wrappers)", skillWeight: { frameworks: 35 } },
      { text: "Practical (Wrote PyTorch train loaders, custom weights, loss functions)", skillWeight: { frameworks: 65 } }
    ]
  },
  {
    title: "Have you configured GPU servers, quantized models, or scaled inference containers?",
    options: [
      { text: "No (Used standard CPU hosting or API keys)", skillWeight: { operations: 30, llms: 20 } },
      { text: "Basic (Used Docker, know simple quantization)", skillWeight: { operations: 50, llms: 35 } },
      { text: "Production (Managed vLLM/Triton servers, CUDA setups, K8s)", skillWeight: { operations: 80, llms: 60 } }
    ]
  }
];

// ==========================================
// 2. STATE MANAGER
// ==========================================

const State = {
  currentTrack: "genai",
  hoursPerWeek: 15,
  completedSteps: new Set(),
  skills: { ...INITIAL_SKILLS },
  activePlatformFilter: "all",
  studyHoursLogged: 0,
  
  // Custom interactive bonuses
  jobInterviewsDone: {}, // jobId -> score (max 3)
  optimizedJobs: new Set(), // jobIds optimized via Resume Optimizer
  diagnosticCompleted: false,

  recalculateSkills() {
    // If diagnostic completed, we use the user's customized baseline, otherwise static initial
    if (!this.diagnosticCompleted) {
      this.skills = { ...INITIAL_SKILLS };
    }
    
    // Add impacts of completed steps in current track
    const steps = TRACKS_DATA[this.currentTrack].steps;
    steps.forEach((step) => {
      if (this.completedSteps.has(step.id)) {
        Object.entries(step.skillImpacts || {}).forEach(([skill, impact]) => {
          this.skills[skill] = Math.min(100, (this.skills[skill] || 0) + impact);
        });
      }
    });

    // Add bonus impact from completed practice playgrounds
    this.completedSteps.forEach(stepId => {
      // Find step
      const step = steps.find(s => s.id === stepId);
      if (step && step.challenge) {
        // Double the frameworks and math impacts if they passed coding challenge
        this.skills.frameworks = Math.min(100, this.skills.frameworks + 5);
        this.skills.math = Math.min(100, this.skills.math + 5);
      }
    });
  },

  getProgressPercentage() {
    const steps = TRACKS_DATA[this.currentTrack].steps;
    if (steps.length === 0) return 0;
    const completedCount = steps.filter(s => this.completedSteps.has(s.id)).length;
    return Math.round((completedCount / steps.length) * 100);
  }
};

// ==========================================
// 3. AGENT MODULES
// ==========================================

/**
 * SkillAuditingAgent - Audits current skill gaps and renders the SVG radar chart.
 */
const SkillAuditingAgent = {
  getSkillsArray() {
    return [
      { key: "dev", name: "Core Software Dev" },
      { key: "math", name: "AI Math Foundations" },
      { key: "frameworks", name: "Deep Learning Frameworks" },
      { key: "llms", name: "LLM & GenAI Architectures" },
      { key: "operations", name: "AI Ops (LLMOps)" }
    ];
  },

  renderRadarChart() {
    const section = document.getElementById("radar-chart-section");
    if (!section) return;

    const skills = this.getSkillsArray();
    const width = 200;
    const height = 200;
    const cx = width / 2;
    const cy = height / 2;
    const r = 70; // Radar radius

    // Angle spacing
    const angleStep = (Math.PI * 2) / skills.length;

    // Calculate polygon points
    const currentPoints = [];
    const targetPoints = [];
    
    const targetSkills = TRACKS_DATA[State.currentTrack].targetSkills;

    skills.forEach((skill, idx) => {
      const angle = angleStep * idx - Math.PI / 2; // Offset to start at top
      
      // Current Point
      const curVal = State.skills[skill.key] / 100;
      const cxPoint = cx + r * curVal * Math.cos(angle);
      const cyPoint = cy + r * curVal * Math.sin(angle);
      currentPoints.push(`${cxPoint},${cyPoint}`);

      // Target Point
      const tarVal = targetSkills[skill.key] / 100;
      const txPoint = cx + r * tarVal * Math.cos(angle);
      const tyPoint = cy + r * tarVal * Math.sin(angle);
      targetPoints.push(`${txPoint},${tyPoint}`);
    });

    // Build grid circles
    let gridCircles = "";
    for (let i = 1; i <= 4; i++) {
      const gridR = (r / 4) * i;
      gridCircles += `<circle cx="${cx}" cy="${cy}" r="${gridR}" fill="none" stroke="rgba(255, 255, 255, 0.05)" stroke-width="1" />`;
    }

    // Build axis lines and label positions
    let axisLines = "";
    let labels = "";
    skills.forEach((skill, idx) => {
      const angle = angleStep * idx - Math.PI / 2;
      const targetX = cx + r * Math.cos(angle);
      const targetY = cy + r * Math.sin(angle);
      
      // Axis Line
      axisLines += `<line x1="${cx}" y1="${cy}" x2="${targetX}" y2="${targetY}" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />`;
      
      // Label offset
      const labelDist = r + 16;
      const lx = cx + labelDist * Math.cos(angle);
      const ly = cy + labelDist * Math.sin(angle) + 4; // Adjust vertical alignment
      let anchor = "middle";
      if (Math.cos(angle) > 0.1) anchor = "start";
      else if (Math.cos(angle) < -0.1) anchor = "end";

      labels += `<text x="${lx}" y="${ly}" fill="rgba(255, 255, 255, 0.6)" font-size="8" font-weight="600" text-anchor="${anchor}">${skill.name}</text>`;
    });

    const svgHTML = `
      <svg class="chart-svg" viewBox="0 0 ${width} ${height}">
        <!-- Grid -->
        ${gridCircles}
        ${axisLines}
        
        <!-- Target Skills Shape (Dotted Purple Outline) -->
        <polygon points="${targetPoints.join(" ")}" fill="rgba(139, 92, 246, 0.04)" stroke="var(--primary)" stroke-width="1.5" stroke-dasharray="3,3" />
        
        <!-- Current Skills Shape (Solid Cyan Fill) -->
        <polygon points="${currentPoints.join(" ")}" fill="rgba(6, 182, 212, 0.25)" stroke="var(--secondary)" stroke-width="1.5" />
        
        <!-- Interactive Nodes -->
        ${skills.map((skill, idx) => {
          const angle = angleStep * idx - Math.PI / 2;
          const curVal = State.skills[skill.key] / 100;
          const nx = cx + r * curVal * Math.cos(angle);
          const ny = cy + r * curVal * Math.sin(angle);
          return `<circle cx="${nx}" cy="${ny}" r="3" fill="var(--secondary)" stroke="#fff" stroke-width="0.5" />`;
        }).join("")}

        <!-- Labels -->
        ${labels}
      </svg>
    `;

    section.innerHTML = svgHTML;
    this.renderLegend();
  },

  renderLegend() {
    const legend = document.getElementById("radar-chart-legend");
    if (!legend) return;

    const skills = this.getSkillsArray();
    const targetSkills = TRACKS_DATA[State.currentTrack].targetSkills;

    let html = "";
    skills.forEach(skill => {
      const currentVal = State.skills[skill.key];
      const targetVal = targetSkills[skill.key];
      const gap = targetVal - currentVal;
      const gapDisplay = gap > 0 
        ? `<span style="color: var(--accent); font-weight:600;">(Gap: -${gap}%)</span>` 
        : `<span style="color: #10b981; font-weight:600;">(Match!)</span>`;

      html += `
        <div class="legend-item">
          <div class="legend-color ${currentVal >= targetVal ? 'current' : 'future'}"></div>
          <div class="legend-text">
            <h5>${skill.name}</h5>
            <p>Current: ${currentVal}% | Target: ${targetVal}% ${gapDisplay}</p>
          </div>
        </div>
      `;
    });

    legend.innerHTML = html;

    // Update panel subtitle with global status
    const matchesCount = skills.filter(s => State.skills[s.key] >= targetSkills[s.key]).length;
    document.getElementById("skill-audit-stats").innerText = `${matchesCount} of ${skills.length} Domains Aligned`;
  }
};

/**
 * CurriculumAgent - Generates timeline schedules and learning steps.
 */
const CurriculumAgent = {
  renderRoadmap() {
    const container = document.getElementById("roadmap-steps-container");
    const durationLabel = document.getElementById("timeline-duration-label");
    if (!container) return;

    const track = TRACKS_DATA[State.currentTrack];
    const weeklyHrs = State.hoursPerWeek;

    // Calculate total weeks
    const totalWeeks = Math.ceil(track.totalHours / weeklyHrs);
    durationLabel.innerText = `Estimated Study Duration: ${totalWeeks} Weeks`;

    let stepHTML = "";
    let accumulatedHours = 0;

    track.steps.forEach((step, index) => {
      const startWeek = Math.floor(accumulatedHours / weeklyHrs) + 1;
      accumulatedHours += step.hours;
      const endWeek = Math.ceil(accumulatedHours / weeklyHrs);
      const weekLabel = startWeek === endWeek ? `Week ${startWeek}` : `Weeks ${startWeek}-${endWeek}`;
      
      const isCompleted = State.completedSteps.has(step.id);
      
      // Determine if active (first non-completed step)
      let isActive = false;
      const firstNonCompleted = track.steps.find(s => !State.completedSteps.has(s.id));
      if (firstNonCompleted && firstNonCompleted.id === step.id) {
        isActive = true;
      }

      const resourceLinks = step.resources.map(r => `
        <a href="${r.url}" target="_blank" class="resource-tag" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
          ${r.name}
        </a>
      `).join("");

      // Challenge practice button
      const practiceBtn = step.challenge ? `
        <button class="practice-challenge-btn" onclick="PlaygroundEngine.openPlayground('${step.id}')">
          <svg viewBox="0 0 24 24" width="10" height="10" stroke="currentColor" stroke-width="2.5" fill="none">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
          ${isCompleted ? 'Retry Coding Practice' : 'Start Code Sandbox Practice'}
        </button>
      ` : '';

      stepHTML += `
        <div class="timeline-step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}" id="step-node-${step.id}">
          <div class="timeline-node"></div>
          <div class="step-check-wrapper">
            <input type="checkbox" class="step-checkbox" id="check-${step.id}" ${isCompleted ? 'checked' : ''} data-step-id="${step.id}">
          </div>
          <div class="step-content">
            <div class="step-meta">
              <span class="step-week">${weekLabel}</span>
              <span class="step-duration">${step.hours} Hrs</span>
            </div>
            <h4 class="step-title">${step.title}</h4>
            <p class="step-desc">${step.desc}</p>
            <div class="step-resources" style="margin-bottom: 0.4rem;">
              ${resourceLinks}
            </div>
            ${practiceBtn}
          </div>
        </div>
      `;
    });

    container.innerHTML = stepHTML;

    // Attach checkbox events
    const checkboxes = container.querySelectorAll(".step-checkbox");
    checkboxes.forEach(chk => {
      chk.addEventListener("change", (e) => {
        const id = e.target.getAttribute("data-step-id");
        if (e.target.checked) {
          State.completedSteps.add(id);
        } else {
          State.completedSteps.delete(id);
        }
        
        // Update model and re-trigger renders
        State.recalculateSkills();
        SkillAuditingAgent.renderRadarChart();
        CurriculumAgent.renderProgressStats();
        JobScoutAgent.renderJobs();
        
        // Visual completed class toggle
        const card = document.getElementById(`step-node-${id}`);
        if (card) {
          card.classList.toggle("completed", e.target.checked);
        }

        // AI Mentor Reaction
        AegisMentorChat.addMentorReaction(id, e.target.checked);
      });
    });

    this.renderProgressStats();
  },

  renderProgressStats() {
    const progressText = document.getElementById("roadmap-progress-text");
    const progressBar = document.getElementById("roadmap-progress-bar");
    if (!progressText || !progressBar) return;

    const track = TRACKS_DATA[State.currentTrack];
    const completedCount = track.steps.filter(s => State.completedSteps.has(s.id)).length;
    const progressPercent = State.getProgressPercentage();

    progressText.innerText = `Progress: ${progressPercent}% (${completedCount}/${track.steps.length} Steps)`;
    progressBar.style.width = `${progressPercent}%`;
  }
};

/**
 * JobScoutAgent - Matches, audits, and unlocks Naukri & LinkedIn jobs based on user milestones.
 */
const JobScoutAgent = {
  renderJobs() {
    const container = document.getElementById("jobs-list-container");
    const totalCountText = document.getElementById("total-jobs-count");
    if (!container) return;

    const trackJobs = JOBS_DATABASE.filter(j => j.track === State.currentTrack);
    const progressPercent = State.getProgressPercentage();
    
    // Filter by platform
    const platform = State.activePlatformFilter;
    const filteredJobs = trackJobs.filter(j => {
      if (platform === "all") return true;
      return j.platform === platform;
    });

    totalCountText.innerText = `${filteredJobs.length} Jobs Available`;

    if (filteredJobs.length === 0) {
      container.innerHTML = `<div style="text-align:center; padding:2rem; color:var(--text-muted); font-size:0.9rem;">No matching roles found for this track & platform combination.</div>`;
      return;
    }

    let jobHTML = "";
    filteredJobs.forEach(job => {
      const isLocked = progressPercent < job.unlockProgress;
      
      // Calculate dynamic match score
      // As user completes steps, match score increases from its base score toward 98%
      let matchScore = isLocked 
        ? Math.round(job.matchBase * 0.8) // Reduced preview match score when locked
        : Math.round(job.matchBase + ((90 - job.matchBase) * (progressPercent / 100)));
      
      // Add custom quiz bonuses
      const interviewScore = State.jobInterviewsDone[job.id] || 0;
      matchScore += interviewScore * 3; // Up to +9% bonus
      if (State.optimizedJobs.has(job.id)) {
        matchScore += 5; // +5% resume optimization bonus
      }

      matchScore = Math.min(99, matchScore);
      
      // SVG Circle Gauge Math
      const circleRadius = 14;
      const strokeCircumference = 2 * Math.PI * circleRadius;
      const strokeOffset = strokeCircumference - (matchScore / 100) * strokeCircumference;

      // Class names
      const cardClass = isLocked ? "job-card locked" : "job-card";
      const platformLabel = job.platform === "linkedin" ? "LinkedIn" : "Naukri";
      const badgeClass = `platform-badge ${job.platform}`;

      const skillsHTML = job.skills.map(skill => {
        // Evaluate if user's skills are high enough to mark skill as 'matched'
        let isMatched = false;
        if (skill.toLowerCase() === "python" || skill.toLowerCase() === "api integration") {
          isMatched = State.skills.dev > 80;
        } else if (skill.toLowerCase() === "pytorch" || skill.toLowerCase() === "tensorflow") {
          isMatched = State.skills.frameworks > 40;
        } else if (skill.toLowerCase() === "langchain" || skill.toLowerCase() === "vectordb" || skill.toLowerCase() === "rag" || skill.toLowerCase() === "lora" || skill.toLowerCase() === "transformer architecture" || skill.toLowerCase() === "custom tokenizers") {
          isMatched = State.skills.llms > 40;
        } else if (skill.toLowerCase() === "kubernetes" || skill.toLowerCase() === "docker" || skill.toLowerCase() === "triton inference" || skill.toLowerCase() === "mlflow") {
          isMatched = State.skills.operations > 40;
        } else if (skill.toLowerCase() === "opencv" || skill.toLowerCase() === "yolo") {
          isMatched = State.skills.frameworks > 50;
        }
        return `<span class="job-skill-tag ${isMatched ? 'matched' : ''}">${skill}</span>`;
      }).join("");

      jobHTML += `
        <div class="${cardClass}" id="job-card-${job.id}">
          ${isLocked ? `
            <div class="lock-container">
              <div class="lock-icon-circle">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <p>Requires learning milestones alignment</p>
              <span class="unlock-requirement">Unlocks at ${job.unlockProgress}% Roadmap Progress</span>
            </div>
          ` : ''}

          <div class="job-card-header">
            <div class="job-meta-main">
              <h4 class="job-title">${job.title}</h4>
              <span class="job-company">${job.company}</span>
            </div>
            <span class="${badgeClass}">${platformLabel}</span>
          </div>

          <div class="job-details-row">
            <div class="job-detail-item">
              <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
                <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>${job.location}</span>
            </div>
            <div class="job-detail-item">
              <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none">
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <line x1="12" y1="4" x2="12" y2="20"></line>
              </svg>
              <span>${job.salary}</span>
            </div>
          </div>

          <div class="job-skills">
            ${skillsHTML}
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.4rem;">
            <div class="match-gauge-wrapper">
              <svg class="match-circle-svg">
                <circle class="match-circle-bg" cx="16" cy="16" r="${circleRadius}" />
                <circle class="match-circle-fill" cx="16" cy="16" r="${circleRadius}" 
                        stroke="${matchScore > 75 ? 'var(--secondary)' : 'var(--primary)'}"
                        stroke-dasharray="${strokeCircumference}" 
                        stroke-dashoffset="${strokeOffset}" />
              </svg>
              <div>
                <span class="match-percent" style="color:${matchScore > 75 ? 'var(--secondary)' : 'var(--primary)'}">${matchScore}%</span>
                <span class="match-label">Match</span>
              </div>
            </div>
            <div class="job-actions">
              <button class="apply-btn" onclick="JobScoutAgent.openApplyModal('${job.id}')">
                Analyze & Apply
              </button>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = jobHTML;
  },

  openApplyModal(jobId) {
    const job = JOBS_DATABASE.find(j => j.id === jobId);
    if (!job) return;

    const overlay = document.getElementById("job-details-modal");
    document.getElementById("modal-job-title").innerText = job.title;
    document.getElementById("modal-job-company").innerText = job.company;
    document.getElementById("modal-job-meta").innerText = `${job.location} | via ${job.platform === 'linkedin' ? 'LinkedIn' : 'Naukri'}`;
    document.getElementById("modal-job-desc").innerText = job.desc;
    document.getElementById("modal-job-salary").innerText = job.salary;

    // Render skills tags inside modal
    const skillsContainer = document.getElementById("modal-job-skills");
    skillsContainer.innerHTML = job.skills.map(s => `<span class="job-skill-tag matched">${s}</span>`).join("");

    overlay.classList.add("active");
    
    // Set up Prep & Tailor action button
    const prepBtn = document.getElementById("modal-prep-btn");
    prepBtn.onclick = () => {
      overlay.classList.remove("active");
      InterviewSimulator.openPrepCenter(job.id);
    };

    // Track event for apply button inside modal
    const applyButton = document.getElementById("modal-apply-btn");
    applyButton.onclick = () => {
      alert(`Success! Aegis Mentor has formatted and customized your resume matching: ${job.skills.join(", ")}, and initiated your application on ${job.platform === 'linkedin' ? 'LinkedIn' : 'Naukri'} portal.`);
      overlay.classList.remove("active");
    };
  }
};

/**
 * DiagnosticQuiz - Manages the interactive entry quiz assessment.
 */
const DiagnosticQuiz = {
  currentQuestionIndex: 0,
  selectedOptionIndex: null,
  answers: [],

  openQuiz() {
    this.currentQuestionIndex = 0;
    this.selectedOptionIndex = null;
    this.answers = [];
    document.getElementById("quiz-modal").classList.add("active");
    this.renderQuestion();
  },

  renderQuestion() {
    const progressText = document.getElementById("quiz-progress-text");
    const questionTitle = document.getElementById("quiz-question-title");
    const optionsContainer = document.getElementById("quiz-options-container");
    const prevBtn = document.getElementById("quiz-prev-btn");
    const nextBtn = document.getElementById("quiz-next-btn");
    const footer = document.getElementById("quiz-footer-buttons");
    const loader = document.getElementById("quiz-loader-container");

    loader.style.display = "none";
    optionsContainer.style.display = "flex";
    questionTitle.style.display = "block";
    progressText.style.display = "block";
    footer.style.display = "flex";

    const question = DIAGNOSTIC_QUESTIONS[this.currentQuestionIndex];
    progressText.innerText = `Diagnostic Assessment: Question ${this.currentQuestionIndex + 1} of ${DIAGNOSTIC_QUESTIONS.length}`;
    questionTitle.innerText = question.title;

    optionsContainer.innerHTML = question.options.map((opt, index) => `
      <div class="quiz-option-card ${this.selectedOptionIndex === index ? 'selected' : ''}" onclick="DiagnosticQuiz.selectOption(${index})">
        <span>${opt.text}</span>
      </div>
    `).join("");

    prevBtn.style.display = this.currentQuestionIndex > 0 ? "block" : "none";
    nextBtn.innerText = this.currentQuestionIndex === DIAGNOSTIC_QUESTIONS.length - 1 ? "Complete Audit" : "Next";
    nextBtn.disabled = this.selectedOptionIndex === null;
  },

  selectOption(idx) {
    this.selectedOptionIndex = idx;
    const cards = document.querySelectorAll("#quiz-options-container .quiz-option-card");
    cards.forEach((c, index) => {
      c.classList.toggle("selected", index === idx);
    });
    document.getElementById("quiz-next-btn").disabled = false;
  },

  nextQuestion() {
    this.answers[this.currentQuestionIndex] = this.selectedOptionIndex;
    
    if (this.currentQuestionIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
      this.currentQuestionIndex++;
      this.selectedOptionIndex = this.answers[this.currentQuestionIndex] !== undefined ? this.answers[this.currentQuestionIndex] : null;
      this.renderQuestion();
    } else {
      this.calculateResults();
    }
  },

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.selectedOptionIndex = this.answers[this.currentQuestionIndex];
      this.renderQuestion();
    }
  },

  calculateResults() {
    // Show spinner loader screen
    const optionsContainer = document.getElementById("quiz-options-container");
    const questionTitle = document.getElementById("quiz-question-title");
    const progressText = document.getElementById("quiz-progress-text");
    const footer = document.getElementById("quiz-footer-buttons");
    const loader = document.getElementById("quiz-loader-container");
    const loaderText = document.getElementById("quiz-loader-text");

    optionsContainer.style.display = "none";
    questionTitle.style.display = "none";
    progressText.style.display = "none";
    footer.style.display = "none";
    loader.style.display = "block";

    const loadingStages = [
      "Parsing baseline software engineering capabilities...",
      "Evaluating mathematical vector foundations...",
      "Mapping framework experiences against target curriculum parameters...",
      "Matching Naukri and LinkedIn index benchmarks..."
    ];

    let stage = 0;
    const interval = setInterval(() => {
      if (stage < loadingStages.length) {
        loaderText.innerText = loadingStages[stage];
        stage++;
      } else {
        clearInterval(interval);
        
        // Compute actual skills weights
        const computedSkills = { dev: 40, math: 20, frameworks: 10, llms: 10, operations: 15 };
        this.answers.forEach((ansIndex, qIndex) => {
          const opt = DIAGNOSTIC_QUESTIONS[qIndex].options[ansIndex];
          Object.entries(opt.skillWeight || {}).forEach(([skill, val]) => {
            computedSkills[skill] = Math.max(computedSkills[skill], val);
          });
        });

        // Save states
        State.skills = computedSkills;
        State.diagnosticCompleted = true;
        State.recalculateSkills();
        
        // Close modal
        document.getElementById("quiz-modal").classList.remove("active");

        // Re-render
        SkillAuditingAgent.renderRadarChart();
        CurriculumAgent.renderRoadmap();
        JobScoutAgent.renderJobs();

        // Dialogue reaction
        const backgroundText = DIAGNOSTIC_QUESTIONS[0].options[this.answers[0]].text;
        const feedback = `Diagnostic Audit Complete! 📊 I've verified your **${backgroundText}** profile. Your starting Skill Radar has been calibrated. Math foundations are benchmarked at **${State.skills.math}%** and Deep Learning Frameworks at **${State.skills.frameworks}%**. Let's tackle Module 1 to close your gaps!`;
        AegisMentorChat.addBubble("system", "Diagnostic Profile Calibrated");
        AegisMentorChat.addBubble("assistant", feedback);
      }
    }, 850);
  }
};

/**
 * PlaygroundEngine - Manages the IDE compiler simulation coding playgrounds.
 */
const PlaygroundEngine = {
  activeStepId: null,

  openPlayground(stepId) {
    const track = TRACKS_DATA[State.currentTrack];
    const step = track.steps.find(s => s.id === stepId);
    if (!step || !step.challenge) return;

    this.activeStepId = stepId;
    document.getElementById("playground-modal").classList.add("active");
    document.getElementById("challenge-name").innerText = step.challenge.name;
    document.getElementById("challenge-desc").innerText = step.challenge.desc;
    document.getElementById("playground-filename").innerText = step.challenge.filename;
    
    const textarea = document.getElementById("playground-code-textarea");
    textarea.value = step.challenge.initialCode;
    
    // Reset Terminal
    const terminal = document.getElementById("playground-terminal");
    terminal.innerHTML = `<span style="color:var(--text-muted);">&gt; Sandbox loaded. Waiting for verification...</span>`;
    terminal.style.color = "#10b981";
  },

  verifyCode() {
    const track = TRACKS_DATA[State.currentTrack];
    const step = track.steps.find(s => s.id === this.activeStepId);
    if (!step || !step.challenge) return;

    const code = document.getElementById("playground-code-textarea").value;
    const terminal = document.getElementById("playground-terminal");

    terminal.innerHTML = `<span style="color:#a5b4fc;">&gt; python ${step.challenge.filename} --eval</span><br><span style="color:var(--text-muted);">Compiling neural scripts...</span>`;
    
    setTimeout(() => {
      // Validate code using solution regex
      if (step.challenge.solutionRegex.test(code)) {
        terminal.innerHTML += `<br><span style="color:#10b981;">[SUCCESS] Test cases passed! compilation 0.00ms. Code matched math formulation checks.</span>`;
        
        // Auto-complete checkpoint
        setTimeout(() => {
          document.getElementById("playground-modal").classList.remove("active");
          
          // Complete step in state
          State.completedSteps.add(this.activeStepId);
          State.recalculateSkills();
          
          // Refresh views
          SkillAuditingAgent.renderRadarChart();
          CurriculumAgent.renderRoadmap();
          JobScoutAgent.renderJobs();

          // Dialogue notification
          AegisMentorChat.addBubble("assistant", `💻 **Sandbox Verified!** You successfully solved the practice coding challenge for **${step.title}**. I've added a bonus boost to your PyTorch Frameworks & Math skill metrics!`);
        }, 1200);
      } else {
        terminal.style.color = "var(--accent)";
        terminal.innerHTML += `<br><span style="color:var(--accent);">[ERROR] Compilation mismatch: Output did not match expected mathematical formulation. Please verify matrix orientation or variables.</span>`;
      }
    }, 900);
  }
};

/**
 * InterviewSimulator - Handles the mock screening tech quiz for each job.
 */
const InterviewSimulator = {
  activeJobId: null,
  activeQuestionIndex: 0,
  score: 0,

  openPrepCenter(jobId) {
    const job = JOBS_DATABASE.find(j => j.id === jobId);
    if (!job) return;

    this.activeJobId = jobId;
    document.getElementById("job-prep-modal").classList.add("active");
    this.showTab("optimizer");

    // Optimizer report setup
    const progress = State.getProgressPercentage();
    const report = document.getElementById("resume-match-report");
    const diff = document.getElementById("resume-diff-box");

    // Match matrix logic
    report.innerHTML = `
      <div>
        <div style="font-weight:600; color:#10b981; margin-bottom:0.2rem;">Matched Keywords</div>
        <div style="color:var(--text-secondary); line-height:1.4;">
          ${job.skills.slice(0, Math.ceil(job.skills.length * (progress / 100)) + 1).map(s => `✓ ${s}`).join("<br>")}
        </div>
      </div>
      <div>
        <div style="font-weight:600; color:var(--accent); margin-bottom:0.2rem;">Missing Keywords</div>
        <div style="color:var(--text-secondary); line-height:1.4;">
          ${progress >= 95 ? "None! Complete match." : job.skills.slice(Math.ceil(job.skills.length * (progress / 100)) + 1).map(s => `✗ ${s} (Study roadmap)`).join("<br>")}
        </div>
      </div>
    `;

    // Optimizer Diff setup
    if (State.optimizedJobs.has(jobId)) {
      diff.innerHTML = `<span style="color:#10b981;">// Optimization already applied to profile.</span>`;
      document.getElementById("optimize-resume-action").disabled = true;
      document.getElementById("optimize-resume-action").innerText = "Resume Optimization Injected";
    } else {
      diff.innerHTML = job.resumeInjections.join("<br>");
      document.getElementById("optimize-resume-action").disabled = false;
      document.getElementById("optimize-resume-action").innerText = "Inject & Apply Custom Optimization";
    }

    // Reset Interview Screens
    document.getElementById("interview-start-screen").style.display = "flex";
    document.getElementById("interview-question-screen").style.display = "none";
    document.getElementById("interview-result-screen").style.display = "none";
  },

  showTab(tabId) {
    const tabs = document.querySelectorAll(".prep-tab-btn");
    const panels = document.querySelectorAll(".prep-panel");
    
    tabs.forEach(t => t.classList.toggle("active", t.id === `tab-btn-${tabId}`));
    panels.forEach(p => p.style.display = p.id === `panel-${tabId}` ? "flex" : "none");
  },

  applyResumeOptimization() {
    State.optimizedJobs.add(this.activeJobId);
    
    document.getElementById("optimize-resume-action").disabled = true;
    document.getElementById("optimize-resume-action").innerText = "Resume Optimization Injected";
    document.getElementById("resume-diff-box").innerHTML = `<span style="color:#10b981;">// Optimization Applied! Match score boosted by +5%</span>`;

    JobScoutAgent.renderJobs();
    AegisMentorChat.addBubble("assistant", `📄 **Resume Optimized!** Tailored bullet points for vectors and architectures have been compiled into your developer profile. This boosts your candidate match rating.`);
  },

  startInterview() {
    this.activeQuestionIndex = 0;
    this.score = 0;
    
    document.getElementById("interview-start-screen").style.display = "none";
    document.getElementById("interview-question-screen").style.display = "flex";
    
    this.renderQuestion();
  },

  renderQuestion() {
    const job = JOBS_DATABASE.find(j => j.id === this.activeJobId);
    if (!job || !job.interview) return;

    const progress = document.getElementById("interview-q-progress");
    const questionText = document.getElementById("interview-question-text");
    const optionsContainer = document.getElementById("interview-options-container");

    const qData = job.interview[this.activeQuestionIndex];
    progress.innerText = `Question ${this.activeQuestionIndex + 1} of ${job.interview.length}`;
    questionText.innerText = qData.q;

    optionsContainer.innerHTML = qData.options.map((opt, idx) => `
      <button class="interview-option-btn" onclick="InterviewSimulator.answerQuestion(${idx})">${opt}</button>
    `).join("");
  },

  answerQuestion(selectedIdx) {
    const job = JOBS_DATABASE.find(j => j.id === this.activeJobId);
    if (!job || !job.interview) return;

    const qData = job.interview[this.activeQuestionIndex];
    const buttons = document.querySelectorAll("#interview-options-container .interview-option-btn");
    
    // Disable all options
    buttons.forEach(btn => btn.disabled = true);

    // Apply color classes
    if (selectedIdx === qData.correctIndex) {
      buttons[selectedIdx].classList.add("correct");
      this.score++;
    } else {
      buttons[selectedIdx].classList.add("wrong");
      buttons[qData.correctIndex].classList.add("correct");
    }

    setTimeout(() => {
      if (this.activeQuestionIndex < job.interview.length - 1) {
        this.activeQuestionIndex++;
        this.renderQuestion();
      } else {
        this.showResults();
      }
    }, 1200);
  },

  showResults() {
    document.getElementById("interview-question-screen").style.display = "none";
    document.getElementById("interview-result-screen").style.display = "flex";

    const scoreDisplay = document.getElementById("interview-score-display");
    const feedback = document.getElementById("interview-score-feedback");
    
    scoreDisplay.innerText = `${this.score}/3`;
    
    // Save score in state
    State.jobInterviewsDone[this.activeJobId] = this.score;
    JobScoutAgent.renderJobs(); // Redraw with score bonus

    if (this.score === 3) {
      feedback.innerText = "Exceptional performance! 🌟 Perfect scoring boosts candidate match metrics on the Opportunity Hub (+9% bonus).";
      AegisMentorChat.addBubble("assistant", `🎯 **Mock Interview Passed!** You achieved a perfect score of 3/3 on the technical screening drill for **${JOBS_DATABASE.find(j => j.id === this.activeJobId).title}**.`);
    } else if (this.score >= 1) {
      feedback.innerText = `Good effort! You answered ${this.score} questions correctly. Re-read the curriculum roadmap gaps to secure a perfect score next time.`;
    } else {
      feedback.innerText = "Score: 0/3. We recommend reviewing the foundational modules of this track before attempting another screening drill.";
    }
  }
};

/**
 * PomodoroTimer - Study timer that logs hours.
 */
const PomodoroTimer = {
  durationSeconds: 25 * 60,
  timerInterval: null,
  isRunning: false,

  init() {
    const btn = document.getElementById("timer-toggle-btn");
    btn.addEventListener("click", () => this.toggle());
  },

  toggle() {
    const icon = document.getElementById("timer-icon");
    const label = document.getElementById("timer-label");

    if (this.isRunning) {
      // Pause
      clearInterval(this.timerInterval);
      this.isRunning = false;
      label.innerText = "Study block paused";
      icon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"></polygon>`; // Play symbol
    } else {
      // Start
      this.isRunning = true;
      label.innerText = "Studying...";
      icon.innerHTML = `<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>`; // Pause symbol
      
      this.timerInterval = setInterval(() => {
        if (this.durationSeconds > 0) {
          this.durationSeconds--;
          this.updateDisplay();
        } else {
          // Timer finished!
          clearInterval(this.timerInterval);
          this.isRunning = false;
          this.durationSeconds = 25 * 60; // Reset
          this.updateDisplay();
          
          label.innerText = "Block completed!";
          icon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"></polygon>`;

          // Log study hour
          State.studyHoursLogged += 2;
          AegisMentorChat.addBubble("system", "Pomodoro Study Interval Logged");
          AegisMentorChat.addBubble("assistant", `⏱️ **Interval Complete!** You've completed a 25-minute focused study block. Logged **+2 Hrs** to your study tracker. Taking short breaks keeps attention neural pathways fresh!`);
        }
      }, 1000);
    }
  },

  updateDisplay() {
    const mins = Math.floor(this.durationSeconds / 60);
    const secs = this.durationSeconds % 60;
    const disp = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    document.getElementById("timer-display").innerText = disp;
  }
};

/**
 * AegisMentorChat - Interactive Mentor Chatbot Agent.
 */
const AegisMentorChat = {
  chatContainer: null,
  
  init() {
    this.chatContainer = document.getElementById("chat-history-container");
    this.renderWelcomeMessage();
    this.renderQuickPrompts();
  },

  renderWelcomeMessage() {
    const trackName = TRACKS_DATA[State.currentTrack].title;
    const msg = `Greetings Developer! I've loaded your software engineering background. You have strong programming core skills, but to pivot into **${trackName}**, we need to close critical AI conceptual gaps. I've designed your dynamic roadmap below. Ask me any questions or complete steps to unlock Naukri/LinkedIn job vacancies!`;
    this.addBubble("assistant", msg);
  },

  addBubble(sender, text) {
    if (!this.chatContainer) return;
    
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${sender}`;
    
    // Parse brief markdown bolding
    const formattedText = text.replace(/\*\*(.*?)\*\"/g, '<strong>$1</strong>')
                             .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    bubble.innerHTML = `
      ${formattedText}
      <span class="timestamp">${timeStr}</span>
    `;

    this.chatContainer.appendChild(bubble);
    this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
  },

  addMentorReaction(stepId, isChecked) {
    const steps = TRACKS_DATA[State.currentTrack].steps;
    const completedStep = steps.find(s => s.id === stepId);
    if (!completedStep) return;

    if (isChecked) {
      const progress = State.getProgressPercentage();
      let response = `Excellent progress! Completing **${completedStep.title}** increases your Deep Learning core framework familiarity. `;
      
      // Calculate newly unlocked jobs
      const newUnlocks = JOBS_DATABASE.filter(j => j.track === State.currentTrack && j.unlockProgress > 0 && progress >= j.unlockProgress && (progress - (100 / steps.length)) < j.unlockProgress);
      if (newUnlocks.length > 0) {
        response += `🎉 **Milestone Unlocked!** You've unlocked the following roles: ${newUnlocks.map(j => `*${j.title} (${j.company})*`).join(", ")} on your Opportunity Center!`;
      } else {
        response += `Keep completing modules to unlock advanced positions from LinkedIn & Naukri.`;
      }
      this.addBubble("assistant", response);
    } else {
      this.addBubble("assistant", `Removed completion status for **${completedStep.title}**. Your skill index and job match ranks have been recalculated.`);
    }
  },

  handleUserInput(text) {
    if (!text.trim()) return;

    this.addBubble("user", text);

    // Simulated parsing response logic
    setTimeout(() => {
      const input = text.toLowerCase();
      let response = "";

      if (input.includes("skill gap") || input.includes("audit") || input.includes("radar")) {
        response = `Our analyzer shows your biggest gap is in **Deep Learning Frameworks** and **AI Math Foundations** (specifically Matrix calculus and gradient formulations). Ticking off Week 1 and Week 2 modules will bridge this gap.`;
      } else if (input.includes("hours") || input.includes("time") || input.includes("schedule")) {
        const track = TRACKS_DATA[State.currentTrack];
        const weeks = Math.ceil(track.totalHours / State.hoursPerWeek);
        response = `You are currently scheduled for **${weeks} weeks** of training (at **${State.hoursPerWeek} hours/week**). If you slide your weekly commitment in the top bar, I will dynamically compress or expand the timeline for you!`;
      } else if (input.includes("job") || input.includes("naukri") || input.includes("linkedin")) {
        const progress = State.getProgressPercentage();
        const nextUnlock = JOBS_DATABASE.find(j => j.track === State.currentTrack && j.unlockProgress > progress);
        if (nextUnlock) {
          response = `You have active matching jobs on your panel. Your next major role: **${nextUnlock.title}** by **${nextUnlock.company}** will unlock when you reach **${nextUnlock.unlockProgress}%** progress in your current roadmap.`;
        } else {
          response = `Congratulations! You've unlocked all target roles for the ${TRACKS_DATA[State.currentTrack].title} track. Check your Jobs board on the right to apply.`;
        }
      } else if (input.includes("pytorch") || input.includes("matrix") || input.includes("resource")) {
        response = `To study Math or PyTorch, open the **Week 1 (Deep Learning Foundations)** node in your Roadmap. Click on the resource tag **"Karpathy's micrograd"** to learn exactly how backpropagation builds gradients!`;
      } else if (input.includes("quiz") || input.includes("assessment") || input.includes("start diagnostic")) {
        response = `Launching Diagnostic Assessment...`;
        setTimeout(() => DiagnosticQuiz.openQuiz(), 500);
        return;
      } else if (input.includes("lora")) {
        response = `**LoRA (Low-Rank Adaptation)** is a parameter-efficient fine-tuning (PEFT) method. Instead of updating all billions of model weights, it freezes the base model and updates small rank decomposition matrices (A and B). This cuts VRAM requirements by over 70%, allowing fine-tuning on consumer-grade GPUs!`;
      } else if (input.includes("rag")) {
        response = `**RAG (Retrieval-Augmented Generation)** is a framework that connects an LLM to external data. 
        <br><br>
        <table>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.1);"><td style="padding:0.4rem; font-weight:600;">Step</td><td style="padding:0.4rem; font-weight:600;">Description</td></tr>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:0.4rem;">1. Embed</td><td style="padding:0.4rem;">Convert document chunks to vectors.</td></tr>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.05);"><td style="padding:0.4rem;">2. Retrieve</td><td style="padding:0.4rem;">Search Vector DB (FAISS/Pinecone) for similarity matches.</td></tr>
          <tr><td style="padding:0.4rem;">3. Inject</td><td style="padding:0.4rem;">Provide matches inside LLM prompt context.</td></tr>
        </table>`;
      } else {
        response = `Understood. As your AI Mentor, I recommend continuing your **${TRACKS_DATA[State.currentTrack].title}** modules. If you need details on specific steps, check off modules to see your matching index shift on the radar graph.`;
      }

      this.addBubble("assistant", response);
    }, 600);
  },

  renderQuickPrompts() {
    const container = document.getElementById("quick-prompts-container");
    if (!container) return;

    const prompts = [
      { text: "⚡ Start Diagnostic Assessment", action: "start diagnostic" },
      { text: "🔍 Analyze my Skill Gaps", action: "Analyze my skill gaps" },
      { text: "⏱️ Check my Time Commitment", action: "How long will my curriculum take?" }
    ];

    container.innerHTML = prompts.map(p => `
      <button class="suggested-btn" onclick="AegisMentorChat.handleUserInput('${p.action}')">${p.text}</button>
    `).join("");
  }
};

// ==========================================
// 4. INTERACTION CONTROLLERS & INITIALIZATION
// ==========================================

function initApp() {
  // Select DOM inputs
  const trackSelect = document.getElementById("track-select");
  const hoursSlider = document.getElementById("hours-slider");
  const hoursValue = document.getElementById("hours-value");
  
  const chatInput = document.getElementById("chat-user-input");
  const chatSendBtn = document.getElementById("chat-send-btn");

  const modalClose = document.getElementById("modal-close-btn");
  const modalCancel = document.getElementById("modal-cancel-btn");
  const modalOverlay = document.getElementById("job-details-modal");

  // Quiz Modal binds
  document.getElementById("quiz-close-btn").onclick = () => document.getElementById("quiz-modal").classList.remove("active");
  document.getElementById("quiz-prev-btn").onclick = () => DiagnosticQuiz.prevQuestion();
  document.getElementById("quiz-next-btn").onclick = () => DiagnosticQuiz.nextQuestion();

  // Playground Modal binds
  document.getElementById("playground-close-btn").onclick = () => document.getElementById("playground-modal").classList.remove("active");
  document.getElementById("playground-reset-btn").onclick = () => {
    const track = TRACKS_DATA[State.currentTrack];
    const step = track.steps.find(s => s.id === PlaygroundEngine.activeStepId);
    if (step && step.challenge) {
      document.getElementById("playground-code-textarea").value = step.challenge.initialCode;
    }
  };
  document.getElementById("playground-run-btn").onclick = () => PlaygroundEngine.verifyCode();

  // Job Prep Modal binds
  document.getElementById("prep-close-btn").onclick = () => document.getElementById("job-prep-modal").classList.remove("active");
  document.getElementById("tab-btn-optimizer").onclick = () => InterviewSimulator.showTab("optimizer");
  document.getElementById("tab-btn-interview").onclick = () => InterviewSimulator.showTab("interview");
  document.getElementById("optimize-resume-action").onclick = () => InterviewSimulator.applyResumeOptimization();
  document.getElementById("start-interview-btn").onclick = () => InterviewSimulator.startInterview();
  document.getElementById("finish-interview-btn").onclick = () => document.getElementById("job-prep-modal").classList.remove("active");

  // Track Selector Change
  trackSelect.addEventListener("change", (e) => {
    State.currentTrack = e.target.value;
    State.completedSteps.clear(); // Reset progress when switching tracks
    State.recalculateSkills();
    
    // Re-render dashboard components
    SkillAuditingAgent.renderRadarChart();
    CurriculumAgent.renderRoadmap();
    JobScoutAgent.renderJobs();
    
    // Dynamic Mentor Greeting on Track Change
    const trackTitle = TRACKS_DATA[State.currentTrack].title;
    AegisMentorChat.addBubble("system", `System shifted to target track: ${trackTitle}`);
    AegisMentorChat.addBubble("assistant", `I've custom-tailored your roadmap for **${trackTitle}**. Tensors, custom embeddings, and architectures are now adjusted to industry benchmarks. Let's start with Module 1!`);
  });

  // Commitment Slider Change
  hoursSlider.addEventListener("input", (e) => {
    State.hoursPerWeek = parseInt(e.target.value);
    hoursValue.innerText = `${State.hoursPerWeek} Hrs`;
    
    // Recalculate timeline weeks
    CurriculumAgent.renderRoadmap();
  });

  // Chat User Input submission
  chatSendBtn.addEventListener("click", () => {
    const text = chatInput.value;
    if (text.trim()) {
      AegisMentorChat.handleUserInput(text);
      chatInput.value = "";
    }
  });

  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const text = chatInput.value;
      if (text.trim()) {
        AegisMentorChat.handleUserInput(text);
        chatInput.value = "";
      }
    }
  });

  // Platform Filter Tab Controls
  const platformTabs = document.querySelectorAll(".platform-tab");
  platformTabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      platformTabs.forEach(t => t.classList.remove("active"));
      e.target.classList.add("active");
      State.activePlatformFilter = e.target.getAttribute("data-platform");
      JobScoutAgent.renderJobs();
    });
  });

  // Modal Close Events
  const closeModal = () => modalOverlay.classList.remove("active");
  modalClose.addEventListener("click", closeModal);
  modalCancel.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Initialize Agents & Widgets
  State.recalculateSkills();
  SkillAuditingAgent.renderRadarChart();
  CurriculumAgent.renderRoadmap();
  JobScoutAgent.renderJobs();
  AegisMentorChat.init();
  PomodoroTimer.init();
  
  // Prompt user to take diagnostic audit after initial loading
  setTimeout(() => {
    AegisMentorChat.addBubble("assistant", "💡 **Tip:** Click **'Start Diagnostic Assessment'** below to set up your customized skill baseline profiles!");
  }, 1500);
}

// Window load init trigger
window.addEventListener("DOMContentLoaded", initApp);
