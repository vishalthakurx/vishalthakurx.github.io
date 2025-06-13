(function() {
    const overlay = document.getElementById('modal-overlay');
    const content = document.getElementById('modal-content');
    const form = document.getElementById('modal-form');
    const title = document.getElementById('modal-title');
    const saveBtn = document.getElementById('modal-save-btn');
    const cancelBtn = document.getElementById('modal-cancel-btn');
    let onSave = null;

    window.showAdminModal = function(modalTitle, fields, saveCallback) {
        title.textContent = modalTitle;
        form.innerHTML = '';
        fields.forEach(f => {
            const div = document.createElement('div');
            div.className = 'form-group';
            const label = document.createElement('label');
            label.setAttribute('for', f.id);
            label.textContent = f.label;
            const input = document.createElement('input');
            input.type = f.type || 'text';
            input.id = f.id;
            input.required = !!f.required;
            if (f.pattern) input.pattern = f.pattern;
            if (f.min !== undefined) input.min = f.min;
            if (f.value !== undefined) input.value = f.value;
            input.style = 'padding: 0.5rem; border-radius: 5px; border: 1px solid #ccc; margin-top: 4px;';
            div.appendChild(label);
            div.appendChild(input);
            form.appendChild(div);
        });
        overlay.classList.remove('hidden');
        onSave = saveCallback;
    };

    saveBtn.onclick = function(e) {
        e.preventDefault();
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        const data = {};
        Array.from(form.elements).forEach(el => {
            if (el.id) data[el.id] = el.value;
        });
        if (onSave) onSave(data);
        overlay.classList.add('hidden');
    };
    cancelBtn.onclick = function(e) {
        e.preventDefault();
        overlay.classList.add('hidden');
    };
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) overlay.classList.add('hidden');
    });
})();
