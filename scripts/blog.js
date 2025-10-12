// Simple blog listing and post rendering using localStorage
document.addEventListener('DOMContentLoaded', () => {
  const listEl = document.getElementById('blog-list');
  const postContainer = document.getElementById('post-container');
  const params = new URLSearchParams(location.search);
  const postId = params.get('id');

  function getPosts() {
    try { return JSON.parse(localStorage.getItem('blog_posts') || '[]'); } catch { return []; }
  }

  async function renderList() {
    if (!listEl) return;
    // try loading remote index.json from GH config if present
    const ghCfg = getGhConfig();
    let posts = [];
    if (ghCfg && ghCfg.owner && ghCfg.repo){
      try{
        const raw = `https://raw.githubusercontent.com/${ghCfg.owner}/${ghCfg.repo}/${ghCfg.branch||'main'}/posts/index.json`;
        const r = await fetch(raw);
        if (r.ok) { posts = await r.json(); }
      }catch(e){ console.warn('Remote fetch failed', e); }
    }
    if (!posts.length) posts = getPosts();
    if (!posts.length) { document.getElementById('no-posts').style.display = 'block'; return; }
    listEl.innerHTML = posts.map(p => `
      <article class="card">
        <h3>${p.title}</h3>
        <p>${p.excerpt || ''}</p>
        <a href="post.html?slug=${encodeURIComponent(p.slug||p.id)}">Read more</a>
      </article>
    `).join('');
  }

  async function renderPostBySlug(slugOrId) {
    if (!postContainer) return;
    const ghCfg = getGhConfig();
    // attempt remote markdown fetch first
    if (ghCfg && ghCfg.owner && ghCfg.repo){
      try{
        const raw = `https://raw.githubusercontent.com/${ghCfg.owner}/${ghCfg.repo}/${ghCfg.branch||'main'}/posts/${encodeURIComponent(slugOrId)}.md`;
        const r = await fetch(raw);
        if (r.ok){ const md = await r.text(); await ensureMarked(); const clean = DOMPurify.sanitize(marked.parse(md)); postContainer.innerHTML = `<h1>${escapeHtml(slugOrId)}</h1>` + clean; return; }
      }catch(e){ console.warn('Remote post fetch failed', e); }
    }
    // fallback: localStorage posts
    const posts = getPosts();
    const p = posts.find(x => String(x.id) === String(slugOrId) || String(x.slug) === String(slugOrId));
    if (!p) { postContainer.innerHTML = '<p>Post not found.</p>'; return; }
    // render blocks (some blocks contain HTML already)
    const bodyHtml = p.blocks.map(b=>{
      if (b.type==='paragraph') return `<div class="post-paragraph">${b.text}</div>`;
      if (b.type==='image') return `<div class="post-image"><img src="${b.src}" style="max-width:100%"></div>`;
      if (b.type==='ad') return `<div class="ad-block">${b.html}</div>`;
      return '';
    }).join('\n');
    postContainer.innerHTML = `<h1>${escapeHtml(p.title)}</h1>` + bodyHtml;
  }

  function escapeHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  async function ensureMarked(){ if (window.marked && window.DOMPurify) return; await loadScript('https://cdn.jsdelivr.net/npm/marked/marked.min.js'); await loadScript('https://cdn.jsdelivr.net/npm/dompurify@2.4.0/dist/purify.min.js'); }

  function loadScript(src){ return new Promise((res, rej)=>{ const s=document.createElement('script'); s.src=src; s.onload=res; s.onerror=rej; document.head.appendChild(s); }); }

  if (postId) renderPostBySlug(postId); else renderList();

  function getGhConfig(){ try{ return JSON.parse(localStorage.getItem('gh_config')||'{}'); }catch(e){ return {}; } }
});
