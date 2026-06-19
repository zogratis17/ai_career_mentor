/**
 * AEGIS - Agentic AI Career Mentor & Job Recommendation Engine
 * Core Application Script
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
        skillImpacts: { math: 15, frameworks: 20 }
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
        skillImpacts: { math: 15, frameworks: 30, llms: 20 }
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
        skillImpacts: { math: 10, frameworks: 35 }
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
        skillImpacts: { operations: 35, llms: 15, frameworks: 10 }
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
    desc: "Deploy API-wrapped generative intelligence modules. Implement RAG connectors with corporate databases and maintain vector index integrity."
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
    desc: "Maintain tokenization microservices, train sentence encoders, and perform fine-tuning setups on custom BERT and classifier models."
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
    desc: "Design domain-specific fine-tuning pipelines. Quantize transformer architectures for Edge execution and configure custom attention layers."
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
    desc: "Optimize spatial boundary-box prediction models. Train and fine-tune convolutional neural networks and deploy custom vision transformers."
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
    desc: "Architect GPU scheduling pipelines inside Kubernetes cluster loops. Configure Triton inference engines with PagedAttention and monitor telemetry logs."
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
    desc: "Lead custom foundation model training initiatives. Architect RLHF/DPO loops, manage high-density supercomputer clusters, and deploy safety guardrails."
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

// ==========================================
// 2. STATE MANAGER
// ==========================================

const State = {
  currentTrack: "genai",
  hoursPerWeek: 15,
  completedSteps: new Set(),
  skills: { ...INITIAL_SKILLS },
  activePlatformFilter: "all",
  
  // Recalculates user's skills based on marked steps
  recalculateSkills() {
    // Reset to base
    this.skills = { ...INITIAL_SKILLS };
    
    // Add impacts of completed steps in current track
    const steps = TRACKS_DATA[this.currentTrack].steps;
    steps.forEach((step) => {
      if (this.completedSteps.has(step.id)) {
        Object.entries(step.skillImpacts || {}).forEach(([skill, impact]) => {
          this.skills[skill] = Math.min(100, (this.skills[skill] || 0) + impact);
        });
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
    const progressText = document.getElementById("roadmap-progress-text");
    const progressBar = document.getElementById("roadmap-progress-bar");
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
            <div class="step-resources">
              ${resourceLinks}
            </div>
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
      const matchScore = isLocked 
        ? Math.round(job.matchBase * 0.8) // Reduced preview match score when locked
        : Math.round(job.matchBase + ((98 - job.matchBase) * (progressPercent / 100)));
      
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
    
    // Track event for apply button inside modal
    const applyButton = document.getElementById("modal-apply-btn");
    applyButton.onclick = () => {
      alert(`Success! Aegis Mentor has formatted and customized your resume matching: ${job.skills.join(", ")}, and initiated your application on ${job.platform === 'linkedin' ? 'LinkedIn' : 'Naukri'} portal.`);
      overlay.classList.remove("active");
    };
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
    const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
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
      { text: "🔍 Analyze my Skill Gaps", action: "Analyze my skill gaps" },
      { text: "⏱️ Check my Time Commitment", action: "How long will my curriculum take?" },
      { text: "💼 Next Job Unlock Goal", action: "What is my next job unlock milestone?" }
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

  // Initialize Agents
  State.recalculateSkills();
  SkillAuditingAgent.renderRadarChart();
  CurriculumAgent.renderRoadmap();
  JobScoutAgent.renderJobs();
  AegisMentorChat.init();
}

// Window load init trigger
window.addEventListener("DOMContentLoaded", initApp);
