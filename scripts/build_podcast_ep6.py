"""Build Episode 6 podcast page from template + transcript."""
import html
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TEMPLATE = ROOT / "pages/podcast/biblical-wisdom-meets-energetic-spirituality.html"
TRANSCRIPT = Path(
    r"C:\Users\pudum\Downloads\Break the Loop — Where Your Energy Is Actually Leaking  Ep. 6  Mind Body Spirit Podcast.txt"
)
OUT = ROOT / "pages/podcast/break-the-loop-where-your-energy-is-actually-leaking.html"

SLUG = "break-the-loop-where-your-energy-is-actually-leaking"
TITLE = (
    "Break the Loop — Where Your Energy Is Actually Leaking | Ep. 6 | Mind Body Spirit Podcast"
)
SHORT_DESC = (
    "Where your energy escapes and a five-step formula to break addiction, "
    "negative loops, and destructive patterns."
)
LONG_DESC = (
    "In Episode 6, Dustin DeFrates and holistic health expert Chris W. break down "
    "exactly where your energy is escaping your body and mind — and walk through a "
    "five step formula to break any addiction negative loop or destructive pattern for good."
)
YOUTUBE_ID = "fZ-V0biQffw"
IMAGE = "/assets/image/break-the-loop-where-your-energy-is-actually-leaking-ep6.webp"

LEARN_ITEMS = [
    "Why your brain optimizes for what feels safe not what is good",
    "How sexual energy is your biggest energy leak or greatest driver",
    "Why overstimulation fragments your focus and kills coherence",
    "How gluttony sloth and emotional loops drain your mitochondria",
    "Why insomnia is your body trying to detox at night",
    "How self forgiveness is the only way to break the loop",
    "Why gratitude removes fear judgment and shame simultaneously",
    "How your breath is the gateway to the present moment",
    "How one small action hits the window and starts the chain",
]

TIMESTAMPS = [
    ("0:00", "Welcome To Episode 6"),
    ("0:16", "Breaking Free From Addiction Depression And Negative Patterns"),
    ("2:07", "Energy Leaks: Where Your Power Is Actually Escaping"),
    ("2:56", "Energy Leak One: Sexual Energy And Stem Cell Conversion"),
    ("3:58", "Energy Leak Two: Overstimulation And The Need For External Things"),
    ("5:04", "Napoleon Hill And Sexual Energy As The Driver Of All Success"),
    ("7:13", "The Seven Chakras And The Three Lower Energy Centers"),
    ("8:39", "Energy Leak Three: Gluttony Of Food And Drink"),
    ("10:02", "Energy Leak Five: Emotional Loops Shame Guilt And Fear"),
    ("11:06", "Energy Leak Six: Insomnia And Losing Touch With Your Body Cycle"),
    ("12:15", "Why Your Brain Runs At Night: Emotional And Physical Detox"),
    ("13:21", "Dustin's Weed Withdrawal And The Chakra Cleanse That Helped"),
    ("16:11", "Five Steps To Break Any Addiction Or Negative Pattern"),
    ("16:37", "Step One: Forgiveness — Your Brain Was Just Optimizing For Safety"),
    ("17:09", "Safety Reward And Relief: Why Every Addiction Gives You Something"),
    ("22:22", "Matthew 18:21 Forgive Not Seven Times But Seventy Times Seven"),
    ("23:44", "Step Two: Embrace The Process And Become Grateful"),
    ("25:06", "Gratitude Puts You In An Active State And Removes The Negative"),
    ("27:44", "The Four Brain Areas Fighting Against Your Change Right Now"),
    ("29:05", "Step Three: Use Breath As Your Gateway To The Present Moment"),
    ("31:31", "New Wine In Old Wineskins: Why Your Past Patterns Ruin New Habits"),
    ("33:06", "Sour Patch Kids At Midnight: The Breath That Could Have Saved It"),
    ("36:13", "Step Four: Prepare And Act — Remember The Night Is Coming"),
    ("37:06", "Jesus Said Those Who Humble Themselves Will Be Exalted"),
    ("39:22", "Plan The Night Before So The Day Does Not Choose For You"),
    ("40:43", "Missing A Window Sends An Incoherent Signal To Your Mitochondria"),
    ("45:08", "Close Out Your Day So Racing Thoughts Cannot Chase You To Bed"),
    ("46:28", "Step Five: Remain In Your State Regardless Of The Outcome"),
    ("47:16", "Your Circumstances Do Not Matter Only Your Next Step Does"),
    ("50:44", "To Whom Much Is Given Much Is Expected: The Responsibility Side"),
    ("55:32", "Jesus Said My Yoke Is Easy: What That Really Means In The Body"),
    ("1:03:20", "Fake It Until You Make It Means Practice It Until You Feel It"),
    ("1:11:20", "Five Step Summary: Forgive Grateful Breathe Act Remain"),
    ("1:14:19", "No Good Tree Produces Bad Fruit: The State Determines The Fruit"),
    ("1:15:38", "Roger Federer Won Only 54 Percent Of His Points And Still Dominated"),
    ("1:19:25", "Diego Ripped The Card And Then Gave His Best One Away"),
    ("1:26:35", "Find An Accountability Buddy And Tell Someone What You Are Working On"),
    ("1:29:11", "Thank You And See You Next Episode"),
]

MENTIONED = [
    "Napoleon Hill — <em>Think And Grow Rich</em>",
    "Matthew 18:21 — Forgive Seventy Times Seven",
    'HeartMath Institute — <a href="https://www.heartmath.org" target="_blank" rel="noopener noreferrer" class="border-b border-current pb-0.5">heart-brain coherence studies</a>',
    "Default mode network and four brain areas research",
    "The seven chakras and energy center framework",
    "Roger Federer point win rate study",
]


def parse_transcript(path: Path) -> str:
    lines = path.read_text(encoding="utf-8").splitlines()
    ts_only = re.compile(r"^\d{1,2}:\d{2}(:\d{2})?$")
    ts_prefix = re.compile(r"^\d{1,2}:\d{2}(:\d{2})?\s+(.*)$")
    speaker = "Dustin"
    buffer: list[str] = []
    paragraphs: list[tuple[str, str]] = []

    def flush() -> None:
        nonlocal buffer, speaker
        if buffer:
            text = " ".join(buffer)
            text = re.sub(r"\s+", " ", text).strip()
            if text:
                paragraphs.append((speaker, text))
            buffer = []

    for raw in lines:
        line = raw.strip()
        if not line or ts_only.match(line):
            continue
        match = ts_prefix.match(line)
        if match:
            line = match.group(2).strip()
        if not line:
            continue
        if line.startswith(">>"):
            flush()
            speaker = "Chris"
            buffer = [line[2:].strip()]
        else:
            if speaker == "Chris":
                flush()
                speaker = "Dustin"
                buffer = [line]
            else:
                buffer.append(line)

    flush()

    parts = []
    for who, text in paragraphs:
        safe = html.escape(text, quote=True).replace("&quot;", '"')
        parts.append(f'              <p><strong>{who}:</strong> {safe}</p>')
    parts.append(
        '              <p><em>Full transcript from the Mind Body Spirit Podcast, Episode 6. Watch and listen on YouTube.</em></p>'
    )
    return "\n".join(parts), len(paragraphs)


def build_learn_html() -> str:
    half = (len(LEARN_ITEMS) + 1) // 2
    cols = [LEARN_ITEMS[:half], LEARN_ITEMS[half:]]
    blocks = []
    for col in cols:
        items = "\n".join(f"              <li>{html.escape(i)}</li>" for i in col)
        blocks.append(f"""            <ul class="space-y-3 list-disc pl-5">
{items}
            </ul>""")
    return "\n".join(blocks)


def build_timestamps_html() -> str:
    rows = []
    for ts, label in TIMESTAMPS:
        rows.append(
            f'              <li><span class="opacity-60 tabular-nums">{ts}</span> — {html.escape(label)}</li>'
        )
    return "\n".join(rows)


def build_mentioned_html() -> str:
    return "\n".join(f"                <li>{item}</li>" for item in MENTIONED)


def main() -> None:
    doc = TEMPLATE.read_text(encoding="utf-8")

    replacements = [
        ("Biblical Wisdom Meets Energetic Spirituality | Ep. 5 | Mind Body Spirit Podcast", TITLE),
        ("biblical-wisdom-meets-energetic-spirituality", SLUG),
        (
            "In Episode 5, Dustin DeFrates and Chris W. bridge the wisdom of the Bible with the science of energy, mind, and body — and show you how these ancient truths map to your mitochondria, your heart, and your present moment.",
            LONG_DESC,
        ),
        (
            "Biblical wisdom and energetic science — how ancient truths map to your mitochondria, heart, and present moment.",
            SHORT_DESC,
        ),
        ("biblical-wisdom-meets-energetic-spirituality-ep5.webp", "break-the-loop-where-your-energy-is-actually-leaking-ep6.webp"),
        ("Mind Body Spirit Podcast · Episode 5", "Mind Body Spirit Podcast · Episode 6"),
        ("Zwk_g0QcWUM", YOUTUBE_ID),
        (
            "Missed the last episode? Episode 4 covered minerals, vitamins, and why you cannot think your way out of a deficient body.",
            "Missed the last episode? Episode 5 bridged biblical wisdom with energetic spirituality and mitochondria science.",
        ),
        (
            'href="you-cant-think-your-way-out-of-a-deficient-body.html"',
            'href="biblical-wisdom-meets-energetic-spirituality.html"',
        ),
        ("Listen to Episode 4", "Listen to Episode 5"),
        ("Biblical Wisdom Meets Energetic Spirituality podcast cover", "Break the Loop podcast cover"),
    ]
    for old, new in replacements:
        doc = doc.replace(old, new)

    learn_block = build_learn_html()
    doc = re.sub(
        r'<div class="grid md:grid-cols-2 gap-10 text-sm md:text-base leading-relaxed opacity-80">[\s\S]*?</div>\s*</div>\s*</section>\s*<section class="py-24 bg-white',
        f'<div class="grid md:grid-cols-2 gap-10 text-sm md:text-base leading-relaxed opacity-80">\n{learn_block}\n          </div>\n        </div>\n      </section>\n\n      <section class="py-24 bg-white',
        doc,
        count=1,
    )

    ts_block = build_timestamps_html()
    doc = re.sub(
        r'<ol class="mt-6 space-y-2 text-sm leading-relaxed opacity-80 list-none">[\s\S]*?</ol>',
        f'<ol class="mt-6 space-y-2 text-sm leading-relaxed opacity-80 list-none">\n{ts_block}\n            </ol>',
        doc,
        count=1,
    )

    mentioned_block = build_mentioned_html()
    doc = re.sub(
        r'<ul class="space-y-2 text-sm leading-relaxed opacity-80">[\s\S]*?</ul>\s*</div>\s*<div class="bg-oll-sand-light dark:bg-\[#1a1a1a\] rounded-\[28px\] p-8 space-y-4">\s*<p class="text-xs uppercase tracking-widest opacity-60">About this podcast</p>',
        f'<ul class="space-y-2 text-sm leading-relaxed opacity-80">\n{mentioned_block}\n              </ul>\n            </div>\n            <div class="bg-oll-sand-light dark:bg-[#1a1a1a] rounded-[28px] p-8 space-y-4">\n              <p class="text-xs uppercase tracking-widest opacity-60">About this podcast</p>',
        doc,
        count=1,
    )

    transcript_html, para_count = parse_transcript(TRANSCRIPT)
    doc = re.sub(
        r'<div class="mt-6 space-y-4 text-sm leading-relaxed opacity-80">[\s\S]*?</div>\s*</details>\s*</div>\s*</section>\s*<footer',
        f'<div class="mt-6 space-y-4 text-sm leading-relaxed opacity-80">\n{transcript_html}\n            </div>\n          </details>\n        </div>\n      </section>\n\n      <footer',
        doc,
        count=1,
    )

    OUT.write_text(doc, encoding="utf-8", newline="\n")
    print(f"Wrote {OUT.relative_to(ROOT)} ({para_count} transcript paragraphs)")


if __name__ == "__main__":
    main()
