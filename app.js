// --- 1. Logika Tab Switcher (Pengalaman) ---
function switchTab(sectionId, targetId) {
    var section = document.getElementById(sectionId);
    if (!section) return;
    
    // Menghapus class active dari semua button di section tersebut
    var buttons = section.querySelectorAll('.btn-group .cyber-btn');
    buttons.forEach(function (btn) { return btn.classList.remove('active'); });
    
    // Menghapus class active dari semua konten
    var contents = section.querySelectorAll('.tab-content');
    contents.forEach(function (content) { return content.classList.remove('active'); });
    
    // Mengaktifkan button dan konten yang diklik
    var activeBtn = Array.from(buttons).find(function (btn) { return btn.dataset.target === targetId; });
    var activeContent = document.getElementById(targetId);
    if (activeBtn) activeBtn.classList.add('active');
    if (activeContent) activeContent.classList.add('active');
}

// --- 2. Logika Filter (Project) ---
var projectTimeouts = [];

function filterProject(category) {
    var section = document.getElementById('project');
    if (!section) return;
    
    // Bersihkan timeout sebelumnya untuk mencegah race condition saat klik cepat
    projectTimeouts.forEach(clearTimeout);
    projectTimeouts = [];
    
    // Update status active pada button
    var buttons = section.querySelectorAll('.btn-group .cyber-btn');
    buttons.forEach(function (btn) { return btn.classList.remove('active'); });
    
    // Cari button yang men-trigger filter
    var clickedBtn = Array.from(buttons).find(function (btn) {
        return (btn.textContent || '').toLowerCase().includes(category === 'all' ? 'semua' : category);
    });
    if (clickedBtn) clickedBtn.classList.add('active');
    
    // Filter animasi pada item project
    var projects = document.querySelectorAll('.project-item');
    projects.forEach(function (project) {
        var type = project.dataset.type;
        
        // Reset animasi
        project.style.display = 'none';
        
        if (category === 'all' || type === category) {
            // Memberikan efek delay agar terlihat interaktif
            var timeoutId = setTimeout(function () {
                project.style.display = 'block';
                project.style.animation = 'fadeIn 0.5s ease forwards';
            }, 50);
            projectTimeouts.push(timeoutId);
        }
    });
}

// --- 3. Scroll Animation Observer (Efek muncul perlahan) ---
document.addEventListener("DOMContentLoaded", function () {
    var observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // Trigger animasi saat 30% slide terlihat
    };
    var observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                // Menambahkan class 'visible' ke glass-card
                var card = entry.target.querySelector('.glass-card');
                if (card) {
                    card.classList.add('visible');
                }
            }
        });
    }, observerOptions);
    
    // Memantau semua slide
    var slides = document.querySelectorAll('.slide');
    slides.forEach(function (slide) {
        observer.observe(slide);
    });
});