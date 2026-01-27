---
title: "From AI Scribe to AI Partner: A Shift in How I Build Software"
description: "How I moved from copying AI-generated code by hand to a collaborative, spec-driven workflow with Claude Code — and why I think it's made me a better developer."
pubDate: 2026-01-27
heroImage: "../../assets/ai-generated-content-image.png"
---

For months, I used AI the same way every time: ask a question, get a markdown code block back, read through it carefully, then implement by hand.

I told myself this was the responsible approach - if I typed every line myself, I'd truly understand it. The AI was just a better search engine — a documentation tool that happened to write code. I was still the one building things.

It felt disciplined. It felt thorough. And for a while, I didn't question it.

---

The workflow had a certain logic to it. I'd prompt an AI assistant, receive a response full of code snippets and explanations, read through the output, and then manually transcribe the implementation into my editor. Sometimes I'd adapt things as I went; sometimes I'd type it nearly verbatim.

The appeal was real. The act of typing forced me to read every line. It gave me a sense of ownership over the code. And it meant I could say, honestly, that I'd written it all myself.

But there was a hidden assumption buried in this process — that manual transcription equals understanding. That the physical act of retyping code is what produces comprehension.

---

Two things eventually cracked that assumption open.

The first was efficiency. I was spending _enormous_ amounts of time on transcription — not thinking, not designing, not debugging, just copying. The ratio of mechanical effort to intellectual effort was completely inverted. I was optimizing for the wrong thing.

The second was subtler and harder to admit. The quality of my code review was actually _worse_ under this workflow. By the time I'd spent twenty minutes typing out an implementation, I was fatigued. My critical eye was dulled by the sheer tedium of transcription. I wasn't catching issues more effectively — I was catching them _less_ effectively, because I'd burned my focus on keystrokes instead of judgment.

Typing code doesn't mean you understand it any better than reading a well-structured diff. And a tired reviewer is a bad reviewer, regardless of how the code got there.

---

The shift started when I began treating the AI less like a scribe and more like a collaborator with a very specific set of strengths and limitations.

The new workflow looks nothing like the old one. It starts before any code gets written — with specs. A markdown file or a GitHub Issue where _I_ define the problem, the constraints, the architecture. This forces me to think clearly before the AI does anything. If I can't articulate what I want, the AI certainly can't build it well.

From there, I use plan mode to review the AI's proposed approach. This is where real conversation happens — I add context the AI doesn't have, flag trade-offs it might miss, question assumptions, redirect when something feels off. The AI builds, but I stay in the loop the entire time. Guiding, redirecting, questioning.

I've also started using custom documentation prompts — project-level guidelines that the AI references as it works. This means it's not just generating code in a vacuum; it's working within the constraints and patterns of the actual codebase. For me, this looks like:

- A `PROJECT_SPEC.md` document that outlines the project requirements
- A `CHANGELOG.md` that captures version history and changes to the project over time, following the [keep a changelog](https://keepachangelog.com/en/1.1.0/) format
- A `PROJECT_STATE.md` that lays out the current state of the project against the overall requirements
- A `TESTING.md` that describes the testing standards and coverage for the project
- And, finally, a good `CLAUDE.md`, `AGENTS.md`, etc. that provides the model references to these documents and points out _when_ to reference them.

The key insight is that the human role shifts from _typist_ to _architect and reviewer_. You're not transcribing anymore. You're directing.

---

A recent experience made this concrete in a way I couldn't ignore.

I had a CI workflow that kept throwing lint errors — errors that passed cleanly on my local machine. The AI spotted the root cause quickly: a Go build version mismatch between my local environment's and the CI runner's linting package. A good catch.

But then it immediately reached for a fix I knew was wrong. It wanted to downgrade the Go module version to match an older Go release that the CI linter was built on. Technically, it could have silenced the errors. Practically, it would have cascaded into a mess — dependency mismatches, possible compilation issues, version drift that would only get worse over time.

I cancelled that iteration. I'd seen enough CI pipelines turn fragile from exactly this kind of erroneous fix. Instead, I dug through the logs myself, confirmed what was actually mismatched, and then prompted the AI with specific context: look for a newer version of the GitHub Action that's built against the correct Go version.

It found one. Implemented the fix cleanly. CI went green.

The lesson wasn't that the AI was wrong — its diagnosis was right. The lesson was that without precise technical context and clear architectural intent, it will reach for _whatever is available_, not necessarily what's correct. Detailed specs and requirements aren't bureaucratic overhead. They're what keep the AI on track.

---

Here's the part I didn't expect: this workflow has actually made me a _better_ developer.

When the AI makes a subtle mistake — a reasonable-looking approach that's actually fragile, or a solution that ignores a constraint it doesn't know about — catching that mistake _affirms_ your engineering judgment in a way that writing code from scratch doesn't always do. You're not just producing code; you're evaluating it against real-world context that only you have.

There's something surprisingly confidence-building about debugging alongside a tool that's struggling with the same problem you're solving. You realize that the hard parts of engineering — the judgment calls, the context-dependent decisions, the "this feels wrong and here's why" moments — are genuinely hard, even for a system that can generate syntactically perfect code in seconds.

The collaboration sharpens your thinking. You have to articulate _why_ something is wrong, not just feel it. You have to explain your reasoning clearly enough for the AI to course-correct. That discipline — putting intuition into words — forces a deeper understanding than just writing code ever did.

---

I think there's a version of AI-augmented development that people imagine where the human mostly watches. That's not what this is.

What it actually looks like is a feedback loop: human intent flows into AI execution, which flows back into human judgment, which redirects into another round of AI iteration. The human isn't passive. The human is the one who knows _why_ the software exists, _who_ it's for, and _what trade-offs are acceptable_. The AI is the one who can move fast once those decisions are made.

The developers who get the most out of these tools won't be the ones who type the fastest or prompt the cleverest. They'll be the ones who learn to direct — to think clearly about what they want, communicate it precisely, and exercise judgment on what comes back.

I spent months being a transcriber when I could have been an architect. The work is better now. And, honestly, so am I.

If you're figuring out your own version of this workflow, I'd be glad to hear how it's going.
