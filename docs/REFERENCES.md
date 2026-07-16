# Landmark references (training)

Short reading list for the “how we got here” section. Prefer linking arXiv abstracts in slides; full citations live here.

## Anchor — Transformers

**Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, Ł., & Polosukhin, I. (2017).**  
*Attention Is All You Need.* Advances in Neural Information Processing Systems (NeurIPS), 30.  
Google Brain / Google Research.  
https://arxiv.org/abs/1706.03762  

Introduces the **Transformer** architecture (attention-only, no recurrence). This is the major publication that enabled the current generation of LLMs.

## Precursor — Attention for translation

**Bahdanau, D., Cho, K., & Bengio, Y. (2014).**  
*Neural Machine Translation by Jointly Learning to Align and Translate.*  
https://arxiv.org/abs/1409.0473  

Early neural **attention** for seq2seq — important background before the Transformer paper.

## Language understanding at scale (Google)

**Devlin, J., Chang, M.-W., Lee, K., & Toutanova, K. (2018).**  
*BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding.*  
Google AI Language.  
https://arxiv.org/abs/1810.04805  

Shows transformer pretraining as a general recipe for NLP.

## Scale & in-context learning

**Brown, T., et al. (2020).**  
*Language Models are Few-Shot Learners* (GPT-3). OpenAI.  
https://arxiv.org/abs/2005.14165  

Makes “scale + prompts” a mainstream product story.

## Instruction-following / assistants (example)

**Ouyang, L., et al. (2022).**  
*Training language models to follow instructions with human feedback* (InstructGPT). OpenAI.  
https://arxiv.org/abs/2203.02155  

Example of **post-training** that turns base models into usable chat assistants (many labs followed similar ideas).

## Optional later (agentic tooling)

Add when the agentic section deepens, e.g. tool-use / ReAct / function-calling papers — keep the main deck focused on Vaswani et al. as the architectural root.
