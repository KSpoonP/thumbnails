# THUMB UPLOAD
### // scratch animated thumbnail bookmarklet

---

A bookmarklet that lets you set **animated thumbnails** on your Scratch projects — drag, drop, done. No extensions, no nonsense.

---

## // SETUP

**1.** Open the [landing page](https://kspoonp.github.io/thumbnails/) in your browser.

**2.** Show your bookmarks bar if it's hidden.
- Windows / Linux → `Ctrl + Shift + B`
- Mac → `Cmd + Shift + B`

**3.** Drag the **ANIMATED THUMBNAIL SET** button to your bookmarks bar.

**4.** Open any Scratch project you own and click the bookmark.

**5.** Select or drop an image. Done.

---

## // USAGE

```
1. go to scratch.mit.edu/projects/<your-project-id>
2. click the bookmarklet
3. drop an image or click SELECT FILE
4. watch the progress bar
5. thumbnail updated ✓
```

---

## // THEMES

Pick a theme on the landing page — your choice is saved automatically and baked into the bookmarklet so the popup matches every time.

| THEME | ACCENT | VIBE |
|-------|--------|------|
| `DEFAULT` | `#e8ff47` | sharp yellow on black |
| `MIDNIGHT` | `#a855f7` | deep purple dark |
| `BLOOD` | `#ff2233` | dark red minimal |
| `MOON` | `#c8c8c8` | monochrome clean |

---

## // FILES

```
index.html     → landing page + drag-to-bookmark button
code.js      → bookmarklet source (hosted via is.gd/scrthu)
README.md      → you are here
```

---

## // NOTES

- Only works on projects **you own** — Scratch blocks thumbnail edits on others
- Use a **downloaded image**, not a URL — the API requires a file upload
- If upload fails, try a **smaller image** — Scratch has a size limit
- We highly reccomend converting **.png, .jpg, and .jpeg** image files to **.webp** with [ezgif](https://exgif.com/webp-maker/)
- Tested on Chrome, Firefox, Edge, Safari.

---

## // STACK

```
vanilla js     → no build step, no framework
jquery 1.7.1   → ajax + drag/drop (loaded by bookmarklet)
IBM Plex Mono  → monospace ui font
Bebas Neue     → display / title font
is.gd/scrthu   → script host shortlink
```

---

## // CREDITS

Original code by [@WorldLanguages GitHub](https://github.com/WorldLanguages/) same person as [@World_Languages on Scratch](https://scratch.mit.edu/users/World_Languages/).

Complete remodel by [@kspoonp on GitHub](https://github.com/KSpoonP/) also known as [@sorees on Scratch](https://scratch.mit.edu/users/sorees/).

### // QUICK TIP

When adding the bookmark;
*// drag the button — do not click it*
Don't make yourself look stupid.
