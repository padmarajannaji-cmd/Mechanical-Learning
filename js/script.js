/* ========================================================
   Mechanical Learning Corner - Main Script
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Dynamic Copyright Year Update
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Generate YouTube Cards Dynamically
    const ytContainer = document.getElementById('youtube-container');
    if (ytContainer && typeof youtubeData !== 'undefined') {
        let htmlContent = '';
        for (const [key, data] of Object.entries(youtubeData)) {
            htmlContent += `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="card h-100 shadow-sm subject-card border-0">
                        <div class="card-body text-center p-4">
                            <div class="icon-box mb-3 text-danger bg-danger bg-opacity-10">
                                <i class="fa-brands fa-youtube fa-3x"></i>
                            </div>
                            <h5 class="card-title fw-bold">${data.title}</h5>
                            <p class="card-text text-muted small mb-4">${data.description}</p>
                            <a href="${data.playlistUrl}" target="_blank" class="btn btn-danger w-100 fw-medium">
                                <i class="fa-solid fa-play me-2"></i> Watch Playlist
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }
        ytContainer.innerHTML = htmlContent;
    }

    // 3. Generate Subject Cards Dynamically (on subjects.html)
    const subjectGrid = document.getElementById('dynamicSubjectGrid');
    if (subjectGrid && typeof subjectsData !== 'undefined') {
        let subjectHTML = '';
        subjectsData.forEach(subject => {
            subjectHTML += `
                <div class="col-md-6 col-lg-4 subject-item">
                    <div class="card h-100 shadow-sm subject-card border-0">
                        <div class="card-body text-center p-4">
                            <div class="icon-box mb-3 text-primary"><i class="${subject.icon} fa-3x"></i></div>
                            <h5 class="card-title fw-bold subject-title-text">${subject.title}</h5>
                            <p class="card-text text-muted small">${subject.description}</p>
                            <a href="youtube.html" class="btn btn-outline-primary btn-sm mt-2">View Videos</a>
                        </div>
                    </div>
                </div>
            `;
        });
        subjectGrid.innerHTML = subjectHTML;
    }

    // 4. Generate Notes Table Dynamically (on notes.html)
    const notesTableBody = document.getElementById('dynamicNotesTable');
    if (notesTableBody && typeof subjectsData !== 'undefined') {
        let notesHTML = '';
        subjectsData.forEach(subject => {
            notesHTML += `
                <tr>
                    <td class="px-4 py-3 fw-medium">
                        <i class="fa-solid fa-file-pdf text-danger me-2"></i> ${subject.title}
                    </td>
                    <td class="py-3 text-muted small">${subject.description}</td>
                    <td class="text-end px-4 py-3">
                        <a href="${subject.notesLink}" target="_blank" class="btn btn-sm btn-outline-danger">
                            <i class="fa-solid fa-download me-1"></i> Download
                        </a>
                    </td>
                </tr>
            `;
        });
        notesTableBody.innerHTML = notesHTML;
    }

    // 5. Search Functionality
    const searchForm = document.querySelector('form');
    const searchInput = document.getElementById('searchInput');

    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim().toLowerCase();
            if (query) {
                window.location.href = `subjects.html?q=${encodeURIComponent(query)}`;
            } else {
                window.location.href = 'subjects.html';
            }
        });
    }

    // Handle filtering on the Subjects Page
    // We use setTimeout to ensure dynamic cards are rendered before grabbing them
    setTimeout(() => {
        const subjectCards = document.querySelectorAll('.subject-item');
        if (subjectCards.length > 0) {
            const urlParams = new URLSearchParams(window.location.search);
            const q = urlParams.get('q');
            const localSearchInput = document.getElementById('subjectSearchInput');
            
            const filterCards = (query) => {
                const lowerQuery = query.toLowerCase();
                subjectCards.forEach(card => {
                    const title = card.querySelector('.subject-title-text').textContent.toLowerCase();
                    if (title.includes(lowerQuery)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            };

            if (q) {
                if (localSearchInput) localSearchInput.value = q;
                filterCards(q);
            }

            if (localSearchInput) {
                localSearchInput.addEventListener('keyup', (e) => {
                    filterCards(e.target.value);
                });
            }
        }
    }, 100);
});