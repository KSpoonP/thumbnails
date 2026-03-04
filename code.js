var parser = document.createElement("a");
parser.href = document.location.href;
if (parser.hostname === "scratch.mit.edu" && parser.pathname.startsWith("/projects/")) {
    var projectID = parser.pathname.replace(/\D/g, '');
    var script = document.createElement('script');
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
    script.onload = animThumbnailMain;
    document.head.appendChild(script);
} else {
    alert("// please open a scratch project first");
}

function animThumbnailMain() {

    // ── Themes ─────────────────────────────────────────────────
    var THEMES = {
        default: {
            accent: '#e8ff47', accentText: '#000',
            panel: '#111', bg: '#161616', border: '#2a2a2a',
            text: '#f0f0f0', sub: '#555', progress: '#e8ff47',
        },
        midnight: {
            accent: '#a855f7', accentText: '#fff',
            panel: '#0e0b1a', bg: '#130d24', border: '#2d1f4e',
            text: '#e8d5ff', sub: '#5b3f8a', progress: '#a855f7',
        },
        blood: {
            accent: '#ff2233', accentText: '#fff',
            panel: '#110808', bg: '#180a0a', border: '#3a1010',
            text: '#ffd4d4', sub: '#6b2020', progress: '#ff2233',
        },
        moon: {
            accent: '#c8c8c8', accentText: '#000',
            panel: '#0f0f0f', bg: '#181818', border: '#2e2e2e',
            text: '#e8e8e8', sub: '#4a4a4a', progress: '#c8c8c8',
        }
    };

    var savedTheme = (function(){ try { return localStorage.getItem('tb-theme') || 'default'; } catch(e){ return 'default'; } })();
    var currentTheme = THEMES[savedTheme] ? savedTheme : 'default';

    var styleEl = document.createElement("style");
    styleEl.id = "tb-style";
    document.head.appendChild(styleEl);

    function buildCSS(k) {
        var t = THEMES[k];
        return `
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&family=Bebas+Neue&display=swap');
        #tb-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.75); z-index:99998; animation:tb-fade-in 0.2s ease; }
        @keyframes tb-fade-in { from{opacity:0} to{opacity:1} }
        @keyframes tb-slide-up { from{opacity:0;transform:translate(-50%,-48%)} to{opacity:1;transform:translate(-50%,-50%)} }
        #tb-panel {
            font-family:'IBM Plex Mono',monospace; position:fixed; top:50%; left:50%;
            transform:translate(-50%,-50%); z-index:99999;
            background:${t.panel}; border:1px solid ${t.border}; border-radius:4px;
            padding:28px; width:360px; animation:tb-slide-up 0.25s cubic-bezier(.34,1.3,.64,1);
        }
        #tb-panel * { box-sizing:border-box; margin:0; padding:0; font-family:'IBM Plex Mono',monospace; }
        #tb-header { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:20px; border-bottom:1px solid ${t.border}; padding-bottom:16px; }
        #tb-title { font-family:'Bebas Neue',sans-serif; font-size:1.5rem; letter-spacing:3px; color:${t.text}; line-height:1; }
        #tb-title em { color:${t.accent}; font-style:normal; }
        #tb-sub { font-size:0.58rem; letter-spacing:3px; text-transform:uppercase; color:${t.sub}; margin-top:4px; }
        #tb-header-btns { display:flex; gap:6px; align-items:center; }
        #tb-settings-btn, #tb-close {
            background:transparent; border:1px solid ${t.border}; color:${t.sub};
            font-size:0.65rem; letter-spacing:2px; text-transform:uppercase;
            padding:6px 10px; cursor:pointer; border-radius:2px; transition:all 0.15s;
        }
        #tb-settings-btn:hover { border-color:${t.accent}; color:${t.accent}; }
        #tb-close:hover { border-color:#ff4757; color:#ff4757; }
        #tb-theme-picker { display:none; margin-bottom:16px; border:1px solid ${t.border}; border-radius:2px; overflow:hidden; }
        #tb-theme-picker.open { display:block; }
        .tb-theme-label { font-size:0.55rem; letter-spacing:3px; text-transform:uppercase; color:${t.sub}; padding:8px 12px 6px; border-bottom:1px solid ${t.border}; background:${t.bg}; }
        .tb-theme-options { display:flex; }
        .tb-theme-opt {
            flex:1; padding:10px 4px; cursor:pointer; text-align:center;
            font-size:0.55rem; letter-spacing:1px; text-transform:uppercase;
            border:none; border-right:1px solid ${t.border}; background:${t.bg}; color:${t.sub};
            transition:all 0.15s;
        }
        .tb-theme-opt:last-child { border-right:none; }
        .tb-theme-opt:hover { color:${t.text}; }
        .tb-theme-opt.active { color:${t.accent}; background:${t.panel}; }
        .tb-theme-dot { display:block; width:8px; height:8px; border-radius:50%; margin:0 auto 5px; }
        #tb-drop-zone {
            background:${t.bg}; border:1px dashed ${t.border}; border-radius:2px;
            padding:20px 16px; text-align:center; cursor:pointer; transition:all 0.15s;
            margin-bottom:14px; color:${t.sub}; font-size:0.68rem; letter-spacing:2px; text-transform:uppercase;
        }
        #tb-drop-zone:hover, #tb-drop-zone.drag-over { border-color:${t.accent}; color:${t.accent}; }
        #tb-drop-zone span { display:block; font-size:1.4rem; margin-bottom:6px; }
        #tb-preview { display:none; margin-bottom:14px; border:1px solid ${t.border}; border-radius:2px; overflow:hidden; }
        #tb-preview img { display:block; width:100%; height:auto; }
        #tb-progress { display:none; height:2px; background:${t.border}; margin-bottom:14px; }
        #tb-progress-bar { height:100%; background:${t.progress}; width:0%; transition:width 0.2s ease; }
        #tb-status { font-size:0.65rem; letter-spacing:1px; color:${t.sub}; margin-bottom:16px; min-height:16px; }
        #tb-status.success { color:#4ade80; }
        #tb-status.error { color:#ff4757; }
        #tb-footer { display:flex; }
        #tb-select-btn {
            flex:1; background:${t.accent}; color:${t.accentText}; border:none;
            font-size:0.75rem; font-weight:700; letter-spacing:2px; text-transform:uppercase;
            padding:11px 16px; cursor:pointer; border-radius:2px; transition:filter 0.15s;
        }
        #tb-select-btn:hover { filter:brightness(1.1); }
        #uploadthumbnail { display:none; }
        `;
    }

    function applyTheme(key) {
        currentTheme = key;
        styleEl.innerHTML = buildCSS(key);
        try { localStorage.setItem('tb-theme', key); } catch(e){}
        document.querySelectorAll('.tb-theme-opt').forEach(function(el) {
            el.classList.toggle('active', el.dataset.theme === key);
        });
    }

    styleEl.innerHTML = buildCSS(currentTheme);

    // ── Overlay ────────────────────────────────────────────────
    var overlay = document.createElement("div");
    overlay.id = "tb-overlay";
    overlay.onclick = closePanel;
    document.body.appendChild(overlay);

    // ── Panel ──────────────────────────────────────────────────
    var panel = document.createElement("div");
    panel.id = "tb-panel";
    panel.innerHTML = `
        <div id="tb-header">
            <div>
                <div id="tb-title">THUMB <em>UPLOAD</em></div>
                <div id="tb-sub">// scratch thumbnail changer</div>
            </div>
            <div id="tb-header-btns">
                <button id="tb-settings-btn">⚙</button>
                <button id="tb-close">ESC</button>
            </div>
        </div>
        <div id="tb-theme-picker">
            <div class="tb-theme-label">// select theme</div>
            <div class="tb-theme-options">
                <button class="tb-theme-opt" data-theme="default"><span class="tb-theme-dot" style="background:#e8ff47"></span>DEFAULT</button>
                <button class="tb-theme-opt" data-theme="midnight"><span class="tb-theme-dot" style="background:#a855f7"></span>MIDNIGHT</button>
                <button class="tb-theme-opt" data-theme="blood"><span class="tb-theme-dot" style="background:#ff2233"></span>BLOOD</button>
                <button class="tb-theme-opt" data-theme="moon"><span class="tb-theme-dot" style="background:#c8c8c8"></span>MOON</button>
            </div>
        </div>
        <div id="tb-drop-zone"><span>⬆</span>drop image or click to browse</div>
        <div id="tb-preview"><img id="tb-preview-img" src="" alt="preview"></div>
        <div id="tb-progress"><div id="tb-progress-bar"></div></div>
        <div id="tb-status">// ready</div>
        <div id="tb-footer"><button id="tb-select-btn">SELECT FILE</button></div>
        <input type="file" id="uploadthumbnail" accept="image/*">
    `;
    document.body.appendChild(panel);

    // Apply saved theme active dots after panel is in DOM
    applyTheme(currentTheme);

    // ── Helpers ────────────────────────────────────────────────
    function setStatus(msg, type) {
        var el = document.getElementById("tb-status");
        el.innerHTML = "// " + msg;
        el.className = type || "";
    }

    function setProgress(pct) {
        document.getElementById("tb-progress").style.display = (pct > 0 && pct < 100) ? "block" : "none";
        document.getElementById("tb-progress-bar").style.width = pct + "%";
    }

    function getCookie(name) {
        var v = "; " + document.cookie;
        var parts = v.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
    }

    function closePanel() {
        overlay.style.opacity = "0";
        panel.style.opacity = "0";
        panel.style.transform = "translate(-50%,-48%)";
        panel.style.transition = "all 0.2s ease";
        $(document).off("dragover.tb dragleave.tb drop.tb");
        setTimeout(function() { overlay.remove(); panel.remove(); styleEl.remove(); }, 200);
    }

    function upload(file) {
        setStatus("reading file...");
        setProgress(0);
        var r1 = new FileReader();
        r1.onload = function(e) {
            document.getElementById("tb-preview-img").src = e.target.result;
            document.getElementById("tb-preview").style.display = "block";
        };
        try { r1.readAsDataURL(file); }
        catch(err) {
            setStatus(String(err).includes("parameter 1") ? "use a downloaded file, not a url" : "try a smaller image", "error");
            return;
        }
        var r2 = new FileReader();
        r2.onload = function(e2) {
            $.ajax({
                type: "POST",
                url: "/internalapi/project/thumbnail/" + projectID + "/set/",
                data: e2.target.result,
                headers: { "X-csrftoken": getCookie("scratchcsrftoken") },
                contentType: "", processData: false,
                xhr: function() {
                    var xhr = $.ajaxSettings.xhr();
                    xhr.upload.onprogress = function(e) {
                        var pct = Math.floor(e.loaded / e.total * 100);
                        setProgress(pct); setStatus("uploading " + pct + "%");
                    };
                    return xhr;
                },
                success: function() { setProgress(0); setStatus("thumbnail updated", "success"); },
                error: function() { setStatus("upload failed — try a smaller image", "error"); }
            });
        };
        r2.readAsArrayBuffer(file);
    }

    // ── Events ─────────────────────────────────────────────────
    document.getElementById("tb-close").onclick = closePanel;

    document.getElementById("tb-settings-btn").onclick = function() {
        document.getElementById("tb-theme-picker").classList.toggle("open");
    };

    document.querySelectorAll(".tb-theme-opt").forEach(function(btn) {
        btn.onclick = function() { applyTheme(this.dataset.theme); };
    });

    document.getElementById("tb-select-btn").onclick = function() { document.getElementById("uploadthumbnail").click(); };
    document.getElementById("tb-drop-zone").onclick = function() { document.getElementById("uploadthumbnail").click(); };
    document.getElementById("uploadthumbnail").onchange = function() { if (this.files[0]) upload(this.files[0]); };

    $(document).on("dragover.tb", function(e) {
        e.stopPropagation(); e.preventDefault();
        e.originalEvent.dataTransfer.dropEffect = "copy";
        document.getElementById("tb-drop-zone").classList.add("drag-over");
    });
    $(document).on("dragleave.tb", function() {
        document.getElementById("tb-drop-zone").classList.remove("drag-over");
    });
    $(document).on("drop.tb", function(e) {
        e.stopPropagation(); e.preventDefault();
        document.getElementById("tb-drop-zone").classList.remove("drag-over");
        upload(e.originalEvent.dataTransfer.items[0].getAsFile());
    });

    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape") closePanel();
    }, { once: true });
}
