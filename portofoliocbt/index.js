let index = 0;
const slider = document.getElementById("slider");
const totalSlides = 5;
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const progressDots = document.getElementById("progressDots");
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    if (i === 0) dot.classList.add('active');
    dot.onclick = () => goToSlide(i);
    progressDots.appendChild(dot);
}

function updateSlide() {
    slider.style.transform = `translateX(-${index * 100}vw)`;

    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function goToSlide(i) {
    index = i;
    updateSlide();
}

function nextSlide() {
    index = (index + 1) % totalSlides;
    updateSlide();
}

function prevSlide() {
    index = (index - 1 + totalSlides) % totalSlides;
    updateSlide();
}

function showFeature(title, video, desc) {
    modalContent.innerHTML = `
    <h2>${title}</h2>
    <video class="card-image" autoplay muted loop playsinline>
      <source src="asset/${video}" type="video/webm">
    </video>
    <p style="margin-top:20px; font-size:1.1rem; line-height:1.8; color:var(--text);">${desc}</p>
    
  `;
    modal.style.display = "flex";
}

function showImage(title, foto) {
    modalContent.innerHTML = `
    <h2>${title}</h2>
    <div class="media-placeholder">
      <img src="asset/${foto}" class="card-image" alt="">
    </div>
    <button class="close" onclick="closeModal()">Tutup</button>
  `;
    modal.style.display = "flex";
}

function showVideo(title) {
    modalContent.innerHTML = `
    <h2>${title}</h2>
    <div class="media-placeholder video-placeholder">
      <video class="card-image" autoplay muted loop playsinline>
        <source src="asset/cbtdemo.webm" type="video/webm">
      </video>
    </div>
    <p>Video lebih lengkap ada di <a href="https://youtu.be/lL07ygR3-uU?si=3LZP2inlsbOWoryf" target="_blank" rel="noopener noreferrer">Youtube</a> </p>
    <button class="close" onclick="closeModal()">Tutup</button>
  `;
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'Escape') closeModal();
});
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});