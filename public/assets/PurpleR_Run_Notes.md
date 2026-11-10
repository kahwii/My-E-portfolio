# Run notes — experiment logs and checkpoints

Deliverable 4, Group Purple R, ITC-C508 Final Project.
Compiled from the environment sheet of `PurpleR_Experiment_Logs.xlsx`.
Runs executed by S. J. C. Dizon.

---

## The reported run

| | |
|---|---|
| Run by | Sean John C. Dizon |
| Date and time | 2026-11-07 12:18:53 (timestamp recorded in sheet `08_Environment`) |
| Runtime | Google Colab, Tesla T4, 14.6 GiB |
| Language model | Qwen2.5-3B-Instruct, float16 |
| Embedding model | all-MiniLM-L6-v2, 384 dimensions |
| Vector store | Chroma 1.5.9, in-memory |
| Selected configuration | 1,200 / 150, k = 3, 78 chunks |
| Prompt version | 3 |
| Model load | 79.39 s (one-time setup cost) |
| Mean generation time | 3.02 s per question |
| Mean retrieval time | 9.9 ms per question |
| Framework | Python 3.13.16, torch 2.14.1+cu130, transformers 5.22.2 |

Every value above is read from the workbook rather than recalled, so this file and the
logs cannot disagree.

## Runs performed

Three runs were executed. All three are reported.

| Run | Model | Prompt | Reported as |
|---|---|---|---|
| 1 | Qwen2.5-1.5B-Instruct | v1 | Table III, column v1 |
| 2 | Qwen2.5-1.5B-Instruct | v2 | Table III, column v2 |
| 3 | Qwen2.5-3B-Instruct | v3 | **the run this workbook records** |

The second run produced worse results than the first — wrong refusals rose from four of
nine to five, and mean answer quality fell from 0.407 to 0.370. It was kept and reported
rather than discarded; the reason it was worse is what determined the third run. No run
was dropped and no figure was selected from among several runs.

Every number in the IEEE paper comes from run 3 unless the text names v1 or v2 explicitly.

The screenshots in `screenshots/` were taken from the saved notebook of run 3, not from a
later re-execution, so the outputs they show are the outputs the paper reports.

## Acceptance checks

The notebook's own checks at the end of section 15 passed on this run:

- every log sheet has rows
- stored vectors equal the chunk count (78)
- the evaluation holds all twelve questions
- the score columns for U1–U3 are blank, not zero

The pre-flight check in section 4 also passed: 47 checks, zero failures. Its output is in
`screenshots/09_preflight.png`.

## Headline figures recorded by this run

```
Mean Recall@3        0.5926
Mean Precision@3     0.2963
Mean answer quality  0.5370
Fully correct        3 of 9
Wrongly declined     0 of 9
Declined correctly   2 of 3
```

## Contents of this package

```
PurpleR_Experiment_Logs.xlsx      nine sheets, one per pipeline stage
PurpleR_Run_Notes.md              this file
screenshots/
  01_document_processing.png      section 5  — five source files and character counts
  02_chunking.png                 section 12 — the five-configuration sweep
  03_embeddings.png               section 6  — model, dimensions, device
  04_vectordb.png                 section 6  — collection, chunks, stored vectors
  05_retrieval.png                section 10 — a question with sources and timing
  06_llm.png                      section 7  — model, dtype, load time
  07_chatbot.png                  section 16 — the chatbot answering
  08_evaluation.png               section 14 — twelve questions and the summary
  09_preflight.png                section 4  — the pre-flight check passing
```
