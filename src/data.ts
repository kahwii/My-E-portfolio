export interface Activity {
  id: number;
  title: string;
  type: 'activity' | 'assignment' | 'quiz' | 'project' | 'comfile' | 'notes';
  description: string;
  date: string;
  status: 'submitted' | 'pending' | 'draft';
  files?: string[];
  notes?: string;
  reflection?: string;
  period: 'prelim' | 'midterm' | 'finals';
}

export const activities: Activity[] = [
  {
    id: 1,
    title: 'WW-P2: Introduction to NLP Concepts',
    type: 'activity',
    description:
      'Guided module on foundational Natural Language Processing — tokenization, TF-IDF statistical weighting, and semantic embeddings. The hands-on portion used two browser-based apps running Microsoft Phi-3.5-mini locally via WebGPU: a Chat Playground for abstractive summarization and a Language Playground for language detection and PII extraction.',
    date: '2025-07-23',
    status: 'submitted',
    period: 'prelim',
    files: [
      '/assets/Sagarino-NLP_Exercise.pdf',
      '/assets/Emmanuel_Sagarino_NLP_IEEE_Reflection.docx',
    ],
    reflection:
      'Coming into this exercise, my understanding of text handling was purely operational — strip punctuation, lowercase, vectorize, then hand it to a classifier. This activity turned that procedure into actual reasoning about *why* each step exists and what it costs. Three ideas stuck with me. First, preprocessing is never neutral: aggressive lowercasing would have erased the German capitalization that the language detector relied on, and removing stop-words would kill the negation in "not good" that carries the entire sentiment. Every cleaning decision is a trade-off tied to the task. Second, TF-IDF and embeddings are complementary, not competing — TF-IDF is transparent and auditable but treats "laptop" and "notebook computer" as unrelated, while embeddings place similar meanings near each other as measurable geometry. Third, and most eye-opening, was the limitation of static embeddings: one fixed vector per word collapses the "bank" of a river and the "bank" that holds money into a single averaged point. Contextual models fix this by computing a fresh vector for every occurrence based on its surrounding words — that self-attention step is the real bridge to modern LLMs like Phi-3.5-mini. Running everything locally in the browser (with graceful fallback from WebGPU to WebAssembly) also reframed the generative-vs-specialized choice as an architecture decision rather than a "which tool is better" question. This directly changed how I plan to approach the sentiment analysis in my capstone: a contextual representation is now the defensible choice, and the PII detection tasks made the Data Privacy Act obligations feel concrete rather than abstract.',
  },
  {
    id: 2,
    title: 'PT-P1: Text Classification of Customer Feedback Using a Neural Network',
    type: 'activity',
    description:
      'No-code neural network exercise on the Machine Learning for Kids platform: trained a text classifier to sort food-delivery customer feedback into Positive_Praise, Negative_Complaint, and Urgent_Support. After refining an initial 30-example dataset to remove class overlap, the model correctly classified all 10 unseen test phrases (100% accuracy, 94.9% average confidence). Sarcastic and out-of-vocabulary phrases were also tested to probe the model\'s failure modes.',
    date: '2026-07-27',
    status: 'submitted',
    period: 'prelim',
    files: [
      '/assets/Sagarino_Exercise_PT-P1.pdf',
      '/assets/Sagarino_Exercise_PT-P1.xlsx',
    ],
    reflection:
      'Honestly, before this exercise I thought you had to program every rule for the computer to understand text, like telling it "if the message says refund, it\'s a complaint." But building the model showed me it doesn\'t work that way. The neural network just learned from the examples I gave it and was able to classify new messages I never trained it on. That part was actually cool to see.\nWhat stuck with me the most was how much the data mattered. When I only had a few examples and they overlapped, the model gave a weak 44% guess. After I added more examples and made them clearer, the same type of phrase went up to over 90%. It made me realize the model is only as good as the data you feed it. The tricky part was testing the sarcastic and random questions — the sarcastic ones still got classified right but with lower confidence, and the billing questions dropped to like 4-5% because I never gave it a class for those. It made sense once I thought about it.\nOverall I learned a lot about how these models actually learn and why data quality is such a big deal. If I did it again I\'d probably add more classes and some sarcastic examples from the start so it could handle the harder cases better.',
  },
  {
    id: 3,
    title: 'PT-P2: Neural Network Training and Testing (Hyperparameters)',
    type: 'assignment',
    description:
      'Code-based follow-up to PT-P1, re-implementing the same three-class text classifier as an explicit TensorFlow/Keras pipeline (Embedding → GlobalAveragePooling1D → Dense ReLU → Dropout → softmax). Ran seven controlled experiments varying the three hyperparameter pillars — architecture, optimization, and regularization — across two datasets, diagnosing each run from its loss curve. Every training behavior was reproduced on demand: underfitting pinned at the ln(3) chance-level loss, severe overfitting (validation loss 15.24), the partial corrective effect of dropout, and early stopping. No configuration achieved a good fit on the 15-row sample set, but the very first run on a 210-row dataset converged cleanly (validation loss 0.066, 96.77% accuracy), showing dataset volume — not tuning — was the binding constraint.',
    date: '2026-08-08',
    status: 'submitted',
    period: 'prelim',
    files: [
      '/assets/Sagarino_Emmanuel_IEEE_Repor.pdf',
      '/assets/Sagarino_Emmanuel_Neural_Network_Training_Testing.ipynb',
      '/assets/Sagarino_Emmanuel_FFBP_Training_Log_Template.xlsx',
    ],
    reflection:
      'This one was a big jump from PT-P1. In the first exercise the no-code tool just handed me a working model and a 100% score, and I never saw what was going on underneath. Doing it in Keras this time forced me to actually set the learning rate, the number of epochs, the hidden units, and the dropout myself, and that\'s where it got real. I could break the model on purpose and watch it happen in the loss curve.\nThe part that clicked the most was reading the loss curves instead of just trusting the accuracy. When I used a tiny learning rate the two curves just sat flat at the chance level and nothing learned — that was underfitting. When I cranked up the capacity with no dropout the training loss dropped to zero while the validation loss shot up to like 15 — that was overfitting, basically the model memorizing. Adding dropout pulled that back down a lot but didn\'t fully fix it, which showed me regularization treats the symptom, not the cause.\nThe biggest lesson was about the data again. No matter how I tuned the 15-row set, I could never get a clean fit, because a 70/15/15 split only leaves 2 validation samples — so one run showed a fake 100% accuracy while the loss proved it learned nothing. The moment I switched to the 210-row dataset it converged on the first try at 96.77%. So even though my number didn\'t beat PT-P1\'s 100% on paper, I understand now that 96.77% on 31 unseen samples means way more than 100% on 10 hand-picked ones. The real win was finally seeing why a model works or fails, not just the score.',
  },
  {
    id: 4,
    title: 'PT-M1: Retrieval-Augmented Generation Chatbot for Waste Segregation (SDG 11 & 12)',
    type: 'project',
    description:
      'Built and adversarially evaluated a RAG chatbot for Philippine household waste segregation, aligned with SDG 11 and SDG 12. A 3-document corpus was split into 38 chunks, embedded with all-MiniLM-L6-v2, indexed in ChromaDB, and queried through openai/gpt-oss-20b under a strict grounding contract. Across four in-domain and one out-of-domain query it produced zero factual hallucinations. Two findings complicate the usual story: the grounding contract caused a false refusal on an in-domain question whose answer was in the corpus but missing from the top-3 retrieval (refusal has a real recall cost), and removing the fallback rule at temperature 1.0 did not induce hallucination — it produced four different refusal wordings. The instruction\'s real benefit was output determinism, not hallucination suppression. API key handled via getpass so it never touches the saved notebook.',
    date: '2026-09-07',
    status: 'submitted',
    period: 'midterm',
    files: [
      '/assets/Sagarino_Emmanuel_PT-M1_RAG.pdf',
      '/assets/Sagarino_Emmanuel_PT_M1_RAG.ipynb',
    ],
    reflection:
      'This exercise changed how I think about hallucination. Going in, I assumed the whole point of the grounding rule was to stop the model from making things up, and that removing it plus cranking the temperature to 1.0 would obviously make it hallucinate. But it didn\'t — even ungrounded, the model still refused to answer the out-of-domain question. What actually changed was the wording: with the rule I got one exact refusal sentence every time, and without it I got four completely different refusals. That was the real lesson — the rule buys you a predictable, catchable output, not protection from lies. In a real system that matters, because you can string-match one canonical refusal and route it to a person, but you can\'t catch random paraphrases.\nThe part that surprised me most was the false refusal. The chatbot refused to answer a question that WAS in my documents, just because the right chunk didn\'t make it into the top 3 retrieved. It made me realize the retrieval side was actually my weakest link, not the prompt — my 500-character chunks split the category list across three pieces and none of them scored high enough. So "refusal is not free," a safe-looking no-answer was actually hiding information I already had. If I did it again I\'d raise k, use bigger chunks, and add a reranker so the model only refuses when the corpus is truly silent.',
  },
  {
    id: 5,
    title: 'Prelim Examination',
    type: 'quiz',
    description:
      'Preliminary period examination for ITC-C508 covering the foundational topics of the term — NLP concepts, neural network text classification, and model training and testing. Score: 8/30.',
    date: '2026-08-29',
    status: 'submitted',
    period: 'prelim',
    reflection:
      'I actually enjoyed taking this exam, and I made sure to answer everything in my own words instead of just memorizing and copying definitions. That part felt good because it showed me which topics I really understood versus the ones I only thought I knew. Looking at my 8/30, I can see the gap was not that I did not study, but that my answers were too short and surface-level — I stated the idea but did not explain it or back it up with examples. For the next exam my main goal is to give more detailed and complete answers: define the concept, explain why it matters, and connect it to what we actually did in the activities like the text classifier and the loss-curve experiments. I would rather fully explain fewer points than rush through everything with one-liners. This result is a clear signal of where to focus, and I am treating it as a starting point to improve on, not a final grade.',
  },
  {
    id: 6,
    title: 'WW-M2 Extension: Updated Research Proposal (Group — Purple R)',
    type: 'project',
    description:
      'Updated group proposal (Purple R, 3 members) for the Final Project. Proposes a Retrieval-Augmented Generation chatbot that routes a described defective Philippine purchase to the single governing statute — RA 7394 (Consumer Act), RA 8792 (E-Commerce Act), RA 10642 (Lemon Law), RA 11967 (Internet Transactions Act), or none — then reads the remedy, deadline, and required first step out of the retrieved provision. Aligned with SDG 12 (Responsible Consumption and Production). The core research question is whether retrieval grounding improves statutory-routing accuracy over a non-RAG baseline on the same model (gpt-oss-20b via Groq), scored as a five-way classification against a reconciled answer key, with a 40-item evaluation set built around adversarial near-miss cases. Submitted via Teams on Sep 29, 2026.',
    date: '2026-09-29',
    status: 'submitted',
    period: 'midterm',
    files: [
      '/assets/PurpleR_Revised_IEEE.docx',
      '/assets/PurpleR_Revised.pptx',
    ],
    reflection:
      'This was our group\'s updated proposal, and the biggest change from our first version was how much narrower and sharper the problem got. At first we only asked what remedies the Consumer Act gives an online buyer, which sounded fine until we actually surveyed the laws and realized a single defective purchase can fall under four different statutes with different triggers, deadlines, and forums. That was the real insight — the problem is not that the information is hidden, it is that it is spread across laws a normal buyer cannot tell apart, and picking the wrong one can forfeit a valid claim on a technicality. That is exactly the kind of problem RAG is built for, because every answer already exists word-for-word in public statutes and can be cited back.\nWorking as a group taught me a lot about scoping. We learned to lock the output down to one label from a closed set so the whole study has a single measurable question instead of several bundled together, and we set up the ground truth so two of us map each question independently and the third reconciles. My takeaway is that widening our research of the legal landscape did not widen the project — it actually tightened it, and that is what made the proposal defensible.',
  },
  {
    id: 7,
    title: 'Midterm Examination (Test I: Quiz & Test II: Exam)',
    type: 'quiz',
    description:
      'Combined midterm assessment for ITC-C508, covering the Midterm topics including Retrieval-Augmented Generation, vector embeddings, and prompt grounding. Scores — Test I (Quiz): 0, Test II (Exam): 8.',
    date: '2026-10-17',
    status: 'submitted',
    period: 'midterm',
    reflection:
      'This midterm was a wake-up call for me. Getting a 0 on Test I (the quiz) stung, but being honest with myself, it showed me I went in underprepared on that part and relied too much on recognition instead of really knowing the material. Test II went better at 8, which told me I understand the concepts more when I can explain them in my own words rather than pick an exact answer under pressure. Putting the two together, my pattern is clear: I know the ideas but I lose points when the format is strict or when I have not reviewed the specific details.\nFor the finals my plan is to fix the preparation side, not just the test-taking side — actually drilling the quiz-type details ahead of time, reviewing each topic right after the lecture instead of cramming, and connecting every concept back to the hands-on activities like the RAG chatbot and the training experiments so it sticks. I am treating these scores as feedback on how I study, and the goal is a steadier result across both the quiz and the exam next time.',
  },
  {
    id: 8,
    title: 'PT-F1: Optimizing Chunk Size and Overlap — Initial Preps',
    type: 'activity',
    description:
      'Finals preparation stage for the consumer-remedy RAG pipeline: setting up a controlled comparison of chunk size and overlap. A 17-page corpus of four Philippine consumer statutes (RA 7394, 8792, 10642, 11967) plus DTI guidance was indexed with all-MiniLM-L6-v2 into a FAISS IndexFlatIP store (85 chunks at the 1000/200 baseline). Three graded test questions (easy/average/difficult) plus a guardrail were authored with verbatim evidence, the flan-t5-base model was swapped for openai/gpt-oss-20b via Groq, and a hardened grounding prompt was developed across six documented iterations. The key finding: Q3 is a retrieval failure, not a generation failure — at k=3 all top results come from one page, so the motorcycle-exclusion passage sits at rank 4, one place below the cut. That measured gap is the specific reason the upcoming chunk-size experiment is expected to change the Q3 outcome. Everything except chunk size and overlap is held fixed so any change in Precision@3/Recall@3/MRR@3 is attributable to chunking alone.',
    date: '2026-10-24',
    status: 'submitted',
    period: 'finals',
    files: [
      '/assets/Sagarino_PT-F1_Submission.pdf',
      '/assets/Sagarino_PT-F1_Corpus.pdf',
      '/assets/Sagarino_PT_F1.ipynb',
      '/assets/Sagarino_PT-F1_Corpus_chunks_1000_200.xlsx',
    ],
    reflection:
      'The biggest thing I learned here is the difference between a retrieval failure and a generation failure, and why you cannot fix one by patching the other. My hardest question (Q3) kept coming out wrong even after I tightened the prompt again and again, and at first I assumed the model was just being careless. But when I actually traced the retrieval, I saw the passage that proves the Lemon Law does NOT cover motorcycles was never even handed to the model — at my 1000-character chunk size all three retrieved chunks came from the same page, and the exclusion sat at rank 4, one spot below the cut. No amount of prompt engineering can fix that, because the model cannot reason from evidence it never received.\nThe other lesson was that my checker could lie to me. One version passed Q3 as "grounded" just because it cited a page that happened to be retrieved, even though the answer was wrong. That pushed me to make the check verify an actual verbatim quote against the retrieved text, and to report coverage as a fraction instead of a yes/no, so a confident answer built on only 1 of 3 required passages shows up as UNSAFE instead of sneaking through. Setting all of this up as a controlled experiment — holding everything fixed except chunk size and overlap — is what makes the next stage meaningful, because any change in the metrics will be caused by the chunking and nothing else. Finding the problem during prep, with a measured reason to expect resizing to help, felt like the whole point of this stage.',
  },
  {
    id: 9,
    title: 'PT-F2: Chunk Size Dominates Overlap — Controlled Retrieval Experiment',
    type: 'project',
    description:
      'The full chunking experiment that follows PT-F1. Twelve configurations (chunk sizes 300–2000 chars × overlaps of 0/10/20%) were compared on the 17-page Philippine consumer-law corpus with a fixed FAISS retriever, fixed embeddings, and nine questions carrying nineteen pre-registered evidence units. Headline finding: chunk size — not overlap — governs retrieval quality. Mean Precision@3 rises from 0.154 (≤500 chars) to 0.296 (≥1000), and Recall@3 from 0.356 to 0.597. The effect is categorical on hard questions — every config at 800 chars or below scores exactly 0.000 on the difficult band, because a three-passage answer cannot fit in three fragments. Zero-overlap settings were eliminated first for cutting evidence at boundaries. The recommended config is 1500/300 (C11): best MRR@3 of 0.667, equal-best Recall@3 of 0.611, using fewer chunks (60) and less storage than the 1000/200 baseline. It also confirmed PT-F1\'s prediction — the motorcycle-exclusion passage, previously stuck at rank 4, enters the top-3 at 1500 chars.',
    date: '2026-10-30',
    status: 'submitted',
    period: 'finals',
    files: [
      '/assets/Sagarino_PT-F2_Report.pdf',
      '/assets/Sagarino_PT_F2_Chunking_Experiment.ipynb',
      '/assets/Sagarino_PT-F2_Experiment_Log.xlsx',
      '/assets/Sagarino_PT-F2_TableC_retrieval_log.csv',
      '/assets/Sagarino_PT-F1_Corpus-29c8895b.pdf',
    ],
    reflection:
      'This part was satisfying because it turned the hunch from PT-F1 into an actual measured answer. In the prep stage I had predicted that resizing my chunks might pull the motorcycle-exclusion passage into the top 3, and running all twelve configurations proved it — at 1500 characters the exclusion finally enters the retrieved set and the difficult-band recall jumps. Seeing a prediction I made beforehand get confirmed by the numbers, instead of explaining a result after the fact, is the first time a project felt like real science to me.\nThe clearest lesson was that chunk size matters far more than overlap, and the reason is in the text itself: these are statutes where a rule, its condition, and its exception are written as consecutive sentences, so a small window literally cuts the answer in half. Overlap mostly earned its keep by stopping evidence from being destroyed at boundaries, not by improving ranking. I also learned to be careful about what a metric is really telling me — Precision@3 could never go above 0.333 here just because most questions only need one chunk, so a low number was not bad performance, it was the structure of the test. And picking 1500/300 over the higher-precision 2000/400 taught me to weigh the rank of the first relevant chunk, since that is what actually survives a limited context budget in a real RAG system. The nicest surprise was that the best configuration was also the cheapest — fewer chunks and smaller index — so I did not have to trade quality for cost.',
  },
  {
    id: 10,
    title: 'WW1 & WW2: Hardware Decides the Configuration — CPU vs GPU Benchmark (Group — Purple R)',
    type: 'project',
    description:
      'Group optimization and GPU-testing study (Purple R) benchmarking the consumer-law RAG chatbot across two Colab runtimes — a shared CPU and a Tesla T4 — with every variable but hardware held fixed. Five indexing configurations over 73,652 characters of Philippine consumer law were measured with Qwen2.5-1.5B-Instruct generation. Retrieval metrics are bit-identical across devices; only generation differs. The GPU is 51.4× faster end to end, but not uniformly: the generation speedup grows with chunk size (26.2× at 400 chars → 81.8× at 1200), because prompt-prefill is sequential on the CPU and parallel on the GPU. The practical punchline — the best-quality config (1200/150, Run C) takes 304.90 s/answer on CPU but only 6.31 s on GPU: the same parameters are unusable on one device and comfortable on the other, so parameter selection and hardware selection are a single joint decision. Recommended operating point: Run C on a Tesla T4.',
    date: '2026-10-30',
    status: 'submitted',
    period: 'finals',
    files: [
      '/assets/PurpleR_RAG_Experiment_Report.pdf',
      '/assets/PurpleR_RAG_Experiment_Notebook_GPU.ipynb',
      '/assets/PurpleR_RAG_Experiment_Results.xlsx',
      '/assets/PurpleR_RAG_Experiment_Data.zip',
    ],
    reflection:
      'The headline lesson for me was that you cannot pick your parameters and your hardware separately — they are one decision. My best configuration took over five minutes per answer on the CPU and about six seconds on the GPU, so the exact same settings were useless on one device and perfectly fine on the other. The ranking of configurations by speed even flipped between devices, which means if I had tuned everything on a laptop CPU and then deployed on a GPU, I would have optimized against the wrong cost model entirely.\nDigging into why the speedup was not a single number taught me the most. Retrieval barely sped up (about 4.5×) because the similarity search runs on the host CPU either way, while generation sped up 51× and dominated the total because it is basically all of the response time. The gain grew with chunk size because longer prompts mean a longer prefill pass, which the CPU reads almost linearly but the GPU nearly absorbs. I also hit a subtle thing I did not expect: greedy decoding was supposed to be deterministic, but the CPU and GPU gave slightly different answers because the arithmetic is not bitwise identical, so reproducibility turned out to be a property of the hardware too. As the group member who built and ran the experiment, being careful about timers — synchronizing CUDA before stopping the clock, separating indexing from retrieval from generation — was what made the numbers trustworthy, and that discipline is the part I am most proud of.',
  },
];

export function getActivitiesByPeriod(period: Activity['period']): Activity[] {
  return activities.filter(a => a.period === period);
}

export function searchActivities(query: string, period?: Activity['period']): Activity[] {
  const lower = query.toLowerCase();
  let filtered = activities;
  if (period) {
    filtered = filtered.filter(a => a.period === period);
  }
  return filtered.filter(a =>
    a.title.toLowerCase().includes(lower) ||
    a.description.toLowerCase().includes(lower) ||
    a.type.toLowerCase().includes(lower) ||
    (a.notes && a.notes.toLowerCase().includes(lower))
  );
}

export function getRecentActivities(count: number = 3): Activity[] {
  return [...activities]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

export function getActivityTypeLabel(type: Activity['type']): string {
  const labels: Record<Activity['type'], string> = {
    activity: 'Activity',
    assignment: 'Assignment',
    quiz: 'Quiz',
    project: 'Project',
    comfile: 'COMFILE',
    notes: 'Notes'
  };
  return labels[type];
}

export function getActivityTypeIcon(type: Activity['type']): string {
  const icons: Record<Activity['type'], string> = {
    activity: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    assignment: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
    quiz: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
    project: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
    comfile: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,
    notes: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`
  };
  return icons[type];
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
