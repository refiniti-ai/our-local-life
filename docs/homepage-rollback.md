# Homepage rollback (client rejection)

If the client does **not** approve homepage changes, restore the previous version of the homepage **only**, then deploy.

## Files that drive the current homepage

These are the usual targets when the work was “homepage + curated/community carousel”:

- `index.html`
- `assets/js/main.js`

(Other pages, `blog.html`, `content.js`, etc. are **not** reverted by this unless you include them on purpose.)

---

## 1) Before you show the client (one-time setup)

Make a **pointer commit** you can return to later:

```bash
git add index.html assets/js/main.js
git status
git commit -m "Homepage: client review build (curated + community section)"
```

Optional but useful—save the **parent** commit (last good state *before* that build):

```bash
git rev-parse HEAD^
```

Copy that hash somewhere safe, or create a tag on the pre-change commit:

```bash
git tag homepage-before-client-review HEAD^
```

---

## 2) When the client says it’s not OK — “revoke”

**Option A — you tagged the old state**

```bash
git checkout homepage-before-client-review -- index.html assets/js/main.js
git status
git commit -m "Revert homepage to pre–client review"
```

**Option B — restore from a specific commit hash** (`abc1234` = the commit *before* the homepage you’re undoing)

```bash
git checkout abc1234 -- index.html assets/js/main.js
git commit -m "Revert homepage to approved baseline"
```

**Option C — one commit to undo** (only if the homepage was the *only* thing in that commit)

```bash
git log --oneline -5
git revert <that-commit-sha> --no-edit
```

---

## 3) Deploy to Firebase

```bash
firebase deploy
```

(Or only hosting: `firebase deploy --only hosting` — match whatever you normally use.)

---

## 4) Telling the assistant in Cursor

You can say: **“Revoke the homepage per `docs/homepage-rollback.md` and deploy”**  
The assistant should restore `index.html` and `assets/js/main.js` from the right git revision, not hand-edit a backup.

If you did **not** make a tag or note a hash, use `git log --oneline -- index.html` to find the last commit you want.
