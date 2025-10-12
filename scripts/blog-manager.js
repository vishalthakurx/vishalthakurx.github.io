document.addEventListener('DOMContentLoaded', () => {
  const drop = document.getElementById('drop-area');
  const addPara = document.getElementById('add-paragraph');
  const addImg = document.getElementById('add-image');
  const addAd = document.getElementById('add-ad');
  const saveBtn = document.getElementById('save-post');
  const savedPosts = document.getElementById('saved-posts');
  const titleEl = document.getElementById('post-title');
  const slugEl = document.getElementById('post-slug');
  const publishBtn = document.getElementById('publish-github');
  const exportBtn = document.getElementById('export-post');
  const publishCurrent = document.getElementById('publish-current');
  const saveGhConfig = document.getElementById('save-gh-config');

  // load saved GH config
  try{ const cfg = JSON.parse(localStorage.getItem('gh_config')||'{}'); if (cfg){ document.getElementById('gh-owner').value = cfg.owner||''; document.getElementById('gh-repo').value = cfg.repo||''; document.getElementById('gh-branch').value = cfg.branch||'main'; document.getElementById('gh-token').value = cfg.token||''; } }catch(e){}

  function getPosts(){ try { return JSON.parse(localStorage.getItem('blog_posts')||'[]'); } catch { return []; } }
  function setPosts(v){ localStorage.setItem('blog_posts', JSON.stringify(v)); }

  // Create block supports Quill instances for paragraph
  function createBlock(type, data){
    const el = document.createElement('div');
    el.className = 'block';
    el.draggable = true;
    el.dataset.type = type;
    if (type==='paragraph'){
      const editorContainer = document.createElement('div');
      editorContainer.className = 'quill-container';
      editorContainer.style.minHeight = '120px';
      el.appendChild(editorContainer);
      // initialize Quill
      const quill = new Quill(editorContainer, { theme: 'snow', modules: { toolbar: [['bold','italic'], ['link','image'], [{ list: 'ordered'}, { list: 'bullet'}]] } });
      if (data?.text) quill.clipboard.dangerouslyPasteHTML(data.text);
      // store instance for serialization
      el._quill = quill;
    } else if (type==='image'){
      el.innerHTML = `<input placeholder="Image URL" class="img-url" style="width:100%"><div class="preview"></div>`;
      el.querySelector('.img-url').value = data?.src||'';
      el.querySelector('.img-url').onchange = e=>{
        el.querySelector('.preview').innerHTML = `<img src="${e.target.value}" style="max-width:100%">`; }
      if (data?.src) el.querySelector('.img-url').dispatchEvent(new Event('change'));
    } else if (type==='ad'){
      el.classList.add('ad-block');
      el.contentEditable = true;
      el.innerHTML = data?.html || '<div style="padding:8px">Ad placeholder — paste ad code here</div>';
    }
    // drag handlers
    el.addEventListener('dragstart', (e)=>{ e.dataTransfer.setData('text/plain', 'dragging'); el.classList.add('dragging'); });
    el.addEventListener('dragend', ()=>el.classList.remove('dragging'));
    return el;
  }

  addPara.onclick = ()=> drop.appendChild(createBlock('paragraph'));
  addImg.onclick = ()=> drop.appendChild(createBlock('image'));
  addAd.onclick = ()=> drop.appendChild(createBlock('ad'));

  // allow dropping reordering (simple)
  drop.addEventListener('dragover', e=> e.preventDefault());
  drop.addEventListener('drop', e=>{
    e.preventDefault();
    const dragging = document.querySelector('.dragging');
    const target = e.target.closest('.block');
    if (!dragging) return;
    if (!target || target===dragging) { drop.appendChild(dragging); return; }
    drop.insertBefore(dragging, target);
  });

  function renderSaved(){
    const posts = getPosts();
    savedPosts.innerHTML = posts.map(p=>`<div><b>${p.title}</b> <button data-id="${p.id}" class="load">Load</button> <button data-id="${p.id}" class="del">Delete</button></div>`).join('');
    savedPosts.querySelectorAll('.load').forEach(b=> b.onclick = ()=> loadPost(b.dataset.id));
    savedPosts.querySelectorAll('.del').forEach(b=> b.onclick = ()=> { deletePost(b.dataset.id); });
  }

  function serializeBlocks(){
    return Array.from(drop.querySelectorAll('.block')).map(b=>{
      const t = b.dataset.type;
      if (t==='paragraph') return { type:'paragraph', text: b._quill ? b._quill.root.innerHTML : b.innerHTML };
      if (t==='image') return { type:'image', src: b.querySelector('.img-url')?.value||'' };
      if (t==='ad') return { type:'ad', html: b.innerHTML };
      return null;
    }).filter(Boolean);
  }

  function saveCurrent(){
    const title = titleEl.value.trim() || 'Untitled';
    const blocks = serializeBlocks();
    const posts = getPosts();
    const id = Date.now();
    posts.unshift({ id, title, blocks, created: new Date().toISOString() });
    setPosts(posts);
    renderSaved();
    alert('Post saved locally.');
  }

  function loadPost(id){
    const posts = getPosts();
    const p = posts.find(x=>String(x.id)===String(id));
    if (!p) return alert('Not found');
    titleEl.value = p.title;
    drop.innerHTML = '';
    p.blocks.forEach(b=> drop.appendChild(createBlock(b.type, b)));
  }

  function deletePost(id){
    let posts = getPosts(); posts = posts.filter(x=>String(x.id)!==String(id)); setPosts(posts); renderSaved();
  }

  async function publishToGitHub(post){
    // publish an HTML file under posts/<id>.html or posts/<slug>.html
    const owner = document.getElementById('gh-owner').value.trim();
    const repo = document.getElementById('gh-repo').value.trim();
    const branch = document.getElementById('gh-branch').value.trim() || 'main';
    const token = document.getElementById('gh-token').value.trim();
    if (!owner || !repo || !token) return alert('Provide GitHub owner, repo and token to publish.');

    const path = `posts/${post.id}.html`;
    const content = generateHTML(post);
    const b64 = btoa(unescape(encodeURIComponent(content)));

    // get current file sha if exists
    const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`;
    try{
      const existing = await fetch(apiBase + `?ref=${branch}`, { headers: { Authorization: 'token ' + token } });
      let sha = null;
      if (existing.status === 200){ const j = await existing.json(); sha = j.sha; }
      const res = await fetch(apiBase, {
        method: 'PUT',
        headers: { Authorization: 'token ' + token, 'Content-Type':'application/json' },
        body: JSON.stringify({ message: `Publish blog post ${post.title}`, content: b64, branch, sha })
      });
      if (!res.ok) throw new Error(await res.text());
      alert('Published to GitHub: ' + path);
    }catch(err){
      console.error(err); alert('GitHub publish failed: '+ err.message);
    }
  }

  function generateHTML(post){
    const body = post.blocks.map(b=>{
      if (b.type==='paragraph') return `<div class="post-paragraph">${b.text}</div>`;
      if (b.type==='image') return `<div class="post-image"><img src="${b.src}" style="max-width:100%"></div>`;
      if (b.type==='ad') return `<div class="ad-block">${b.html}</div>`;
      return '';
    }).join('\n');
    return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(post.title)}</title><link rel="stylesheet" href="/style.css"></head><body><main class="container"><article>${body}</article></main></body></html>`;
  }

  function escapeHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  function exportCurrent(){
    const post = { id: Date.now(), title: titleEl.value||'Untitled', slug: slugEl.value||'', blocks: serializeBlocks(), created: new Date().toISOString() };
    const html = generateHTML(post);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = (post.slug||post.title||'post') + '.html'; document.body.appendChild(a); a.click(); a.remove();
  }

  saveBtn.onclick = saveCurrent;
  publishBtn && (publishBtn.onclick = ()=>{
    const posts = getPosts(); if (!posts.length) return alert('No saved posts to publish');
    const p = posts[0]; if (slugEl.value) p.slug = slugEl.value;
    // prefer publishing markdown
    publishPostAsMarkdown(p);
  });
  exportBtn && (exportBtn.onclick = exportCurrent);
  publishCurrent && (publishCurrent.onclick = ()=>{
    const post = { id: Date.now(), title: titleEl.value||'Untitled', blocks: serializeBlocks(), created: new Date().toISOString() };
    // quick local save + publish attempt
    const posts = getPosts(); posts.unshift(post); setPosts(posts); renderSaved();
    if (confirm('Also try to publish to GitHub?')) publishPostAsMarkdown(post);
  });

  saveGhConfig && saveGhConfig.addEventListener('click', ()=>{
    const cfg = { owner: document.getElementById('gh-owner').value.trim(), repo: document.getElementById('gh-repo').value.trim(), branch: document.getElementById('gh-branch').value.trim()||'main', token: document.getElementById('gh-token').value.trim() };
    localStorage.setItem('gh_config', JSON.stringify(cfg)); alert('GitHub config saved locally (insecure).');
  });

  // publish helpers: convert Quill HTML to Markdown using Turndown (load Turndown dynamically)
  async function ensureTurndown(){ if (window.TurndownService) return window.TurndownService; await loadScript('https://unpkg.com/turndown/dist/turndown.js'); return window.TurndownService; }
  function loadScript(src){ return new Promise((res, rej)=>{ const s=document.createElement('script'); s.src=src; s.onload=res; s.onerror=rej; document.head.appendChild(s); }); }

  async function publishPostAsMarkdown(post){
    try{
      // ensure turndown available
      await ensureTurndown();
      const td = new TurndownService();
      // serialize HTML body
      const htmlBody = post.blocks.map(b=>{
        if (b.type==='paragraph') return b.text;
        if (b.type==='image') return `<img src="${b.src}">`;
        if (b.type==='ad') return b.html;
        return '';
      }).join('\n\n');
      const md = td.turndown(htmlBody);
      const slug = (post.slug && String(post.slug).trim()) || slugify(post.title || String(post.id));
      const filename = `posts/${slug}.md`;
      const content = `---\ntitle: "${post.title.replace(/"/g,'\"')}"\ndate: ${new Date(post.created).toISOString()}\n---\n\n${md}`;
      await writeFileToGitHub(filename, content, `Publish post ${post.title}`);
      // update index.json
      await updateIndexJson({ title: post.title, slug, date: post.created });
      alert('Published markdown to GitHub: ' + filename);
    }catch(err){ console.error(err); alert('Publish failed: '+ err.message); }
  }

  function slugify(s){ return String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }

  async function getGhConfig(){ try{ return JSON.parse(localStorage.getItem('gh_config')||'{}'); }catch(e){ return {}; } }

  async function writeFileToGitHub(path, content, message){
    const cfg = await getGhConfig(); if (!cfg.owner || !cfg.repo || !cfg.token) throw new Error('Set GitHub config first and save it.');
    const apiBase = `https://api.github.com/repos/${cfg.owner}/${cfg.repo}/contents/${encodeURIComponent(path)}`;
    const b64 = btoa(unescape(encodeURIComponent(content)));
    // try to get existing to obtain sha
    const existing = await fetch(apiBase + `?ref=${cfg.branch||'main'}`, { headers: { Authorization: 'token ' + cfg.token } });
    let sha = null; if (existing.status===200){ const j = await existing.json(); sha = j.sha; }
    const res = await fetch(apiBase, { method: 'PUT', headers: { Authorization: 'token ' + cfg.token, 'Content-Type':'application/json' }, body: JSON.stringify({ message: message||'Add file', content: b64, branch: cfg.branch||'main', sha }) });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async function updateIndexJson(entry){
    const cfg = await getGhConfig(); if (!cfg.owner) throw new Error('No GH config');
    const path = 'posts/index.json';
    const apiBase = `https://api.github.com/repos/${cfg.owner}/${cfg.repo}/contents/${encodeURIComponent(path)}`;
    // fetch existing index
    let index = [];
    try{
      const r = await fetch(apiBase + `?ref=${cfg.branch||'main'}`, { headers: { Authorization: 'token ' + cfg.token } });
      if (r.status===200){ const j = await r.json(); const raw = atob(j.content); index = JSON.parse(raw); }
    }catch(e){}
    // prepend entry and dedupe by slug
    index = [entry].concat(index.filter(i=>i.slug !== entry.slug)).slice(0,200);
    const content = JSON.stringify(index, null, 2);
    await writeFileToGitHub(path, content, `Update posts index with ${entry.slug}`);
  }

  renderSaved();
});
