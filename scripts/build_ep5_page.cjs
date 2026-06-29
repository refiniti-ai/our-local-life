const fs = require("fs");
const path = require("path");

const pagePath = path.join(
  __dirname,
  "../pages/podcast/biblical-wisdom-meets-energetic-spirituality.html"
);

let html = fs.readFileSync(pagePath, "utf8");

const replacements = [
  [
    /You Can't Think Your Way Out of a Deficient Body/g,
    "Biblical Wisdom Meets Energetic Spirituality",
  ],
  [
    /you-cant-think-your-way-out-of-a-deficient-body/g,
    "biblical-wisdom-meets-energetic-spirituality",
  ],
  [
    /you-cant-think-your-way-out-of-a-deficient-body-ep4/g,
    "biblical-wisdom-meets-energetic-spirituality-ep5",
  ],
  [/Episode 4/g, "Episode 5"],
  [/Ep\. 4/g, "Ep. 5"],
  [/wwXwPqfyqjo/g, "Zwk_g0QcWUM"],
  [
    /Minerals, vitamins, and coherence — why you cannot think your way out of a deficient body\./g,
    "Biblical wisdom and energetic science — how ancient truths map to your mitochondria, heart, and present moment.",
  ],
  [
    /Dustin DeFrates and holistic health expert Chris W\. break down the minerals and vitamins your body needs to think clearly, feel balanced, and stay in coherence — and the science behind why your body cannot function without them\./g,
    "Dustin DeFrates and holistic health expert Chris W. bridge the wisdom of the Bible with the science of energy, mind, and body — and show you how these ancient truths map to your mitochondria, your heart, and your present moment.",
  ],
  [
    /In Episode 4, Dustin DeFrates and holistic health expert Chris W\. break down the minerals and vitamins your body needs to think clearly, feel balanced, and stay in coherence — and the science behind why your body cannot function without them\./g,
    "In Episode 5, Dustin DeFrates and holistic health expert Chris W. bridge the wisdom of the Bible with the science of energy, mind, and body — and show you how these ancient truths map to your mitochondria, your heart, and your present moment.",
  ],
  [
    /<p class="text-sm opacity-80 mb-4">Missed the last episode\? Episode 3 covered practical reset tools for mind, body, and spirit\.<\/p>\s*<a\s+href="you-dont-need-more-control-you-need-better-resets\.html"[^>]*>\s*Listen to Episode 3\s*<\/a>/s,
    `<p class="text-sm opacity-80 mb-4">Missed the last episode? Episode 4 covered minerals, vitamins, and why you cannot think your way out of a deficient body.</p>
          <a
            href="you-cant-think-your-way-out-of-a-deficient-body.html"
            class="inline-block uppercase text-xs font-bold tracking-widest border border-current rounded-full px-6 py-3 hover:bg-oll-dark hover:text-white dark:hover:bg-white dark:hover:text-oll-dark transition-colors"
          >
            Listen to Episode 4
          </a>`,
  ],
];

for (const [pattern, replacement] of replacements) {
  html = html.replace(pattern, replacement);
}

const learnBlock = `          <div class="grid md:grid-cols-2 gap-10 text-sm md:text-base leading-relaxed opacity-80">
            <ul class="space-y-3 list-disc pl-5">
              <li>Why biblical wisdom and energetic science say the same thing</li>
              <li>How your mitochondria respond to every word, thought, and action</li>
              <li>Why ask, seek, and knock is a blueprint for coherence</li>
              <li>How new wine in old wineskins explains why habits fail</li>
              <li>Why becoming like a child is the fastest path to presence</li>
              <li>How serotonin levels affect rumination and the default mode network</li>
            </ul>
            <ul class="space-y-3 list-disc pl-5">
              <li>Why judgment creates a judging vibration in your heart</li>
              <li>How gratitude changes your state and rewires your response</li>
              <li>Why overstimulation is one of the biggest problems in 2025</li>
              <li>How self-forgiveness breaks the guilt and shame loop</li>
              <li>Why willingly doing hard things makes you stronger</li>
              <li>How compassionate reflection helps your subconscious overnight</li>
            </ul>
          </div>`;

html = html.replace(
  /<div class="grid md:grid-cols-2 gap-10 text-sm md:text-base leading-relaxed opacity-80">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>\s*<section class="py-24 bg-white dark:bg-oll-dark/,
  learnBlock +
    `\n        </div>\n      </section>\n\n      <section class="py-24 bg-white dark:bg-oll-dark`
);

const timestamps = `            <ol class="mt-6 space-y-2 text-sm leading-relaxed opacity-80 list-none">
              <li><span class="opacity-60 tabular-nums">0:00</span> — Welcome to Episode 5</li>
              <li><span class="opacity-60 tabular-nums">0:08</span> — What makes this a special episode today</li>
              <li><span class="opacity-60 tabular-nums">0:58</span> — Recap of the electromagnetic body from previous episodes</li>
              <li><span class="opacity-60 tabular-nums">1:21</span> — Thoughts are electrical and the heart is magnetic</li>
              <li><span class="opacity-60 tabular-nums">2:40</span> — Religion vs spirituality: Dustin's personal journey</li>
              <li><span class="opacity-60 tabular-nums">3:53</span> — The Bible as a map for universal spiritual laws</li>
              <li><span class="opacity-60 tabular-nums">6:35</span> — Matthew 7:7 ask, seek, knock: the blueprint for coherence</li>
              <li><span class="opacity-60 tabular-nums">11:51</span> — Matthew 9:17 new wine in old wineskins explained</li>
              <li><span class="opacity-60 tabular-nums">16:16</span> — Matthew 18:3 become like little children</li>
              <li><span class="opacity-60 tabular-nums">23:01</span> — Lower serotonin causes rumination</li>
              <li><span class="opacity-60 tabular-nums">23:39</span> — Sunlight, fresh air, and nutrients: ways to raise serotonin</li>
              <li><span class="opacity-60 tabular-nums">27:29</span> — Luke 6:37 do not judge and you will not be judged</li>
              <li><span class="opacity-60 tabular-nums">34:00</span> — Luke 8:16 the lamp on the stand: gratitude and receiving</li>
              <li><span class="opacity-60 tabular-nums">36:54</span> — Whoever has more will be given more</li>
              <li><span class="opacity-60 tabular-nums">41:24</span> — Whoever does not have even what he thinks he has will be taken away</li>
              <li><span class="opacity-60 tabular-nums">46:15</span> — Luke 12:54 interpret the present time</li>
              <li><span class="opacity-60 tabular-nums">55:29</span> — Practical takeaway one: start every day with gratitude</li>
              <li><span class="opacity-60 tabular-nums">58:26</span> — Practical takeaway two: remineralize your body every day</li>
              <li><span class="opacity-60 tabular-nums">1:00:41</span> — Practical takeaway three: reduce overstimulation in 2025</li>
              <li><span class="opacity-60 tabular-nums">1:06:30</span> — Practical takeaway four: self-forgiveness throughout the day</li>
              <li><span class="opacity-60 tabular-nums">1:09:44</span> — Practical takeaway five: meditate on the feeling you desire</li>
              <li><span class="opacity-60 tabular-nums">1:13:20</span> — Practical takeaway six: willingly do hard things every day</li>
              <li><span class="opacity-60 tabular-nums">1:16:18</span> — Practical takeaway seven: compassionate reflection at night</li>
              <li><span class="opacity-60 tabular-nums">1:21:09</span> — Thank you and see you next episode</li>
            </ol>`;

html = html.replace(
  /<ol class="mt-6 space-y-2 text-sm leading-relaxed opacity-80 list-none">[\s\S]*?<\/ol>/,
  timestamps
);

const mentioned = `              <ul class="space-y-2 text-sm leading-relaxed opacity-80">
                <li>Dr. Joe Dispenza — <em>Breaking the Habit of Being Yourself</em></li>
                <li>Matthew 7:7, Matthew 9:17, Matthew 18:3, Luke 6:37, Luke 8:16, Luke 12:54</li>
                <li>Snoop Dogg gratitude affirmation meditation</li>
                <li>Default mode network and serotonin research</li>
                <li>HeartMath Institute — <a href="https://www.heartmath.org" target="_blank" rel="noopener noreferrer" class="border-b border-current pb-0.5">heart-brain coherence studies</a></li>
                <li>Grounding and earthing research</li>
                <li>Sunlight and serotonin production studies</li>
                <li>Sea salt remineralization and electrolyte research</li>
              </ul>`;

html = html.replace(
  /<ul class="space-y-2 text-sm leading-relaxed opacity-80">[\s\S]*?<\/ul>\s*<\/div>\s*<div class="bg-oll-sand-light dark:bg-\[#1a1a1a\] rounded-\[28px\] p-8 space-y-4">\s*<p class="text-xs uppercase tracking-widest opacity-60">About this podcast<\/p>/,
  mentioned +
    `\n            </div>\n            <div class="bg-oll-sand-light dark:bg-[#1a1a1a] rounded-[28px] p-8 space-y-4">\n              <p class="text-xs uppercase tracking-widest opacity-60">About this podcast</p>`
);

const transcriptEditorial = `              <p><strong>Opening — Biblical wisdom meets energetic science.</strong> Dustin and Chris open Episode 5 by recapping the electromagnetic body from previous episodes: thoughts are electrical, the heart is magnetic, and mitochondria respond to every word, thought, and action. Dustin shares his personal journey from religion to spirituality, and Chris frames the Bible as a practical map for universal spiritual laws — not doctrine, but coherence.</p>
              <p><strong>Matthew 7:7 — Ask, seek, knock.</strong> The famous passage becomes a blueprint for coherence: ask with intention, seek with attention, knock with action. When mind, body, and spirit align on what you are asking for, the signal reaches your cells. Misalignment — wanting one thing while your body signals another — breaks the circuit.</p>
              <p><strong>Matthew 9:17 — New wine in old wineskins.</strong> Why habits fail when you try to pour new behaviors into an old nervous system. You cannot think your way into a new life inside a depleted, overstimulated body. The wineskin — your physical and emotional container — must be renewed first.</p>
              <p><strong>Matthew 18:3 — Become like little children.</strong> Presence is the fastest path to coherence. Children are not ruminating in the default mode network; they are fully in the moment. Lower serotonin drives rumination — Chris connects sunlight, fresh air, nutrients, and movement as practical ways to raise serotonin and exit the mental loop.</p>
              <p><strong>Luke 6:37 — Do not judge.</strong> Judgment creates a judging vibration in the heart. HeartMath research on heart-brain coherence maps directly: what you emit emotionally is what your body receives. Self-judgment and judgment of others keep the nervous system in a defensive, incoherent state.</p>
              <p><strong>Luke 8:16 — The lamp on the stand.</strong> Gratitude changes state and rewires response. Whoever has more will be given more; whoever clings to scarcity loses even what they think they have. Gratitude is not positive thinking — it is a measurable shift in heart rhythm and cellular signaling.</p>
              <p><strong>Luke 12:54 — Interpret the present time.</strong> Overstimulation is one of the biggest problems in 2025. The call is to read your body in the present moment, not live in past guilt or future anxiety. Self-forgiveness throughout the day breaks the guilt-and-shame loop that drains mitochondrial energy.</p>
              <p><strong>Seven practical takeaways.</strong> Start every day with gratitude. Remineralize with sea salt and electrolytes daily. Reduce overstimulation. Practice self-forgiveness. Meditate on the feeling you desire, not just the outcome. Willingly do hard things to build resilience. End the day with compassionate reflection so the subconscious integrates overnight.</p>
              <p><em>Editorial transcript adapted from the Mind Body Spirit Podcast, Episode 5. Full audio and video available on YouTube.</em></p>
`;

const start = html.indexOf(
  '            <div class="mt-6 space-y-4 text-sm leading-relaxed opacity-80">'
);
const end = html.indexOf("            </div>\n          </details>", start);
if (start === -1 || end === -1) {
  console.error("transcript markers not found");
  process.exit(1);
}
const open =
  '            <div class="mt-6 space-y-4 text-sm leading-relaxed opacity-80">\n';
html = html.slice(0, start) + open + transcriptEditorial + html.slice(end);

fs.writeFileSync(pagePath, html, "utf8");
console.log("Built Episode 5 page");
