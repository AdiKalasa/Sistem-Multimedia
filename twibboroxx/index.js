
// Template Data
const templates = [
    { id: 1, name: "Blue & Yellow Pngtree", category: "minimalis", occasion: "umum", tier: "free", image: "BlueAndYellow.png" },
    { id: 2, name: "Builder / Constructor", category: "colorful", occasion: "promo", tier: "free", image: "twibbox-construction.png" },
    { id: 3, name: "Fruit", category: "colorful", occasion: "promo", tier: "free", image: "ChatGPT_Fruit.png" },
    // { id: 3, name: "Grand Opening Gold", category: "elegant", occasion: "grand-opening", tier: "premium", gradient: "linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)" },
    // { id: 4, name: "Fun Party", category: "fun", occasion: "promo", tier: "free", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
    // { id: 5, name: "New Product Launch", category: "minimalis", occasion: "new-product", tier: "premium", gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" },
    // { id: 6, name: "Elegant Black", category: "elegant", occasion: "umum", tier: "free", gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)" },
    // { id: 7, name: "Colorful Fiesta", category: "colorful", occasion: "promo", tier: "premium", gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" },
    // { id: 8, name: "Simple White", category: "minimalis", occasion: "umum", tier: "free", gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)" },
    // { id: 9, name: "Fun Gradient", category: "fun", occasion: "new-product", tier: "free", gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)" },
    // { id: 10, name: "Premium Gold", category: "elegant", occasion: "grand-opening", tier: "premium", gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)" },
    // { id: 11, name: "Fresh Green", category: "minimalis", occasion: "new-product", tier: "free", gradient: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)" },
    // { id: 12, name: "Vibrant Pink", category: "colorful", occasion: "promo", tier: "free", gradient: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)" }
];
 
// Current State
let currentTemplate = null;
let userImageData = null;
let imageSettings = {
    scale: 100,
    rotation: 0,
    brightness: 100,
    posX: 50,
    posY: 50
};

// ===== TAMBAHKAN DI BAGIAN STATE (setelah imageSettings) =====
let backgroundColor = '#FFFFFF';

// Color Presets
const colorPresets = [
    '#FFFFFF', '#F0F0F0', '#E0E0E0', '#FFE5E5', '#E5F5FF',
    '#FFF4E5', '#E5FFE5', '#FFE5F5', '#F5E5FF', '#FFE5E5',
    '#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe',
    '#43e97b', '#38f9d7', '#fa709a', '#fee140', '#ff9a9e'
];

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    createParticles();
    renderTemplates();
    initializeColorPresets(); // TAMBAHAN BARU
    updateBackgroundColor();  // TAMBAHAN BARU
});

// ===== FUNGSI-FUNGSI BARU UNTUK BACKGROUND COLOR =====

// Initialize Color Presets
function initializeColorPresets() {
    const presetsContainer = document.getElementById('colorPresets');
    if (!presetsContainer) return;
    
    colorPresets.forEach(color => {
        const preset = document.createElement('div');
        preset.className = 'color-preset';
        preset.style.backgroundColor = color;
        preset.onclick = () => selectColorPreset(color);
        presetsContainer.appendChild(preset);
    });
}

// Select Color Preset
function selectColorPreset(color) {
    backgroundColor = color;
    document.getElementById('bgColorPicker').value = color;
    document.getElementById('bgColorInput').value = color;
    document.getElementById('bgColorValue').textContent = color;
    updateBackgroundColor();
    
    // Update active state
    document.querySelectorAll('.color-preset').forEach(preset => {
        preset.classList.remove('active');
        if (preset.style.backgroundColor === color || 
            rgbToHex(preset.style.backgroundColor) === color.toUpperCase()) {
            preset.classList.add('active');
        }
    });
}

// Update Background Color
function updateBackgroundColor() {
    backgroundColor = document.getElementById('bgColorPicker').value;
    document.getElementById('bgColorInput').value = backgroundColor;
    document.getElementById('bgColorValue').textContent = backgroundColor;
    
    // Update preview background
    const bgLayer = document.getElementById('backgroundLayer');
    if (bgLayer) {
        bgLayer.style.backgroundColor = backgroundColor;
    }
}

// Update Background Color from Input
function updateBackgroundColorFromInput() {
    const inputColor = document.getElementById('bgColorInput').value;
    if (/^#[0-9A-F]{6}$/i.test(inputColor)) {
        backgroundColor = inputColor;
        document.getElementById('bgColorPicker').value = inputColor;
        document.getElementById('bgColorValue').textContent = inputColor;
        
        const bgLayer = document.getElementById('backgroundLayer');
        if (bgLayer) {
            bgLayer.style.backgroundColor = inputColor;
        }
    }
}

// RGB to Hex converter
function rgbToHex(rgb) {
    const result = rgb.match(/\d+/g);
    if (!result) return rgb;
    return '#' + result.map(x => {
        const hex = parseInt(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('').toUpperCase();
}


// Particle Animation
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const colors = ['#8B5CF6', '#EC4899', '#3B82F6', '#10B981'];

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = Math.random() * 50 + 10 + 'px';
        particle.style.height = particle.style.width;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Navigation
function navigateTo(page) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));

    if (page === 'home') {
        document.getElementById('homePage').classList.add('active');
    } else if (page === 'catalog') {
        document.getElementById('catalogPage').classList.add('active');
    } else if (page === 'pricing') {
        document.getElementById('pricingPage').classList.add('active');
    } else if (page === 'editor') {
        document.getElementById('editorPage').classList.add('active');
    }

    window.scrollTo(0, 0);

    // Close mobile menu if open
    document.getElementById('navMenu').classList.remove('active');
}

function toggleMenu() {
    document.getElementById('navMenu').classList.toggle('active');
}

// Template Rendering
function renderTemplates() {
    const grid = document.getElementById('templatesGrid');
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const occasionFilter = document.getElementById('occasionFilter').value;
    const tierFilter = document.getElementById('tierFilter').value;

    const filteredTemplates = templates.filter(template => {
        const matchSearch = template.name.toLowerCase().includes(searchTerm);
        const matchCategory = !categoryFilter || template.category === categoryFilter;
        const matchOccasion = !occasionFilter || template.occasion === occasionFilter;
        const matchTier = !tierFilter || template.tier === tierFilter;
        return matchSearch && matchCategory && matchOccasion && matchTier;
    });

    grid.innerHTML = filteredTemplates.map(template => `
                <div class="template-card" onclick="selectTemplate(${template.id})">
                    <div class="template-preview" style="background:url('./template/${template.image}')">
                        <div class="template-badge ${template.tier === 'free' ? 'badge-free' : 'badge-pro'}">
                            ${template.tier.toUpperCase()}
                        </div>
                    </div>
                    <div class="template-info">
                        <h3>${template.name}</h3>
                        <div class="template-tags">
                            <span class="tag">${template.category}</span>
                            <span class="tag">${template.occasion}</span>
                        </div>
                    </div>
                </div>
            `).join('');
}

function filterTemplates() {
    renderTemplates();
}

function selectTemplate(templateId) {
    currentTemplate = templates.find(t => t.id === templateId);
    // document.getElementById('templateLayer').style.background = currentTemplate.gradient;
    document.getElementById('templateLayer').style.background = `url('./template/${currentTemplate.image}')`;
    navigateTo('editor');
}

// Image Upload
function handleImageUpload(files) {

    for (const file of files) {
        if (!file) return;
        console.log("returned");
        const reader = new FileReader();
        reader.onload = function (e) {
            userImageData = e.target.result;
            const img = document.getElementById('userImage');
            img.src = userImageData;
            img.style.display = 'block';
            document.getElementById('imageControls').style.display = 'block';
            resetControls();
        };
        reader.readAsDataURL(file);
    }
}
// v1
// function handleImageUpload(event) {
//     const file = event.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = function (e) {
//         userImageData = e.target.result;
//         const img = document.getElementById('userImage');
//         img.src = userImageData;
//         img.style.display = 'block';
//         document.getElementById('imageControls').style.display = 'block';
//         resetControls();
//     };
//     reader.readAsDataURL(file);
// }

// Image Transform

function updateImageTransform() {
    const scale = document.getElementById('scaleControl').value;
    const rotation = document.getElementById('rotationControl').value;
    const brightness = document.getElementById('brightnessControl').value;
    const posX = document.getElementById('posXControl').value;
    const posY = document.getElementById('posYControl').value;

    imageSettings = { scale, rotation, brightness, posX, posY };

    const img = document.getElementById('userImage');
    img.style.transform = `translate(-50%, -50%) translate(${(posX - 50) * 2}%, ${(posY - 50) * 2}%) scale(${scale / 100}) rotate(${rotation}deg)`;
    img.style.filter = `brightness(${brightness}%)`;

    document.getElementById('scaleValue').textContent = scale + '%';
    document.getElementById('rotationValue').textContent = rotation + '°';
    document.getElementById('brightnessValue').textContent = brightness + '%';
    document.getElementById('posXValue').textContent = posX + '%';
    document.getElementById('posYValue').textContent = posY + '%';
}

function resetControls() {
    document.getElementById('scaleControl').value = 100;
    document.getElementById('rotationControl').value = 0;
    document.getElementById('brightnessControl').value = 100;
    document.getElementById('posXControl').value = 50;
    document.getElementById('posYControl').value = 50;

      // Reset background color (BARU!)
    selectColorPreset('#FFFFFF');

    updateImageTransform();
}

// Download Image
// Download Image - Versi Diperbaiki
// function downloadImage() {
//     if (!userImageData || !currentTemplate) {
//         alert('Silakan upload foto dan pilih template terlebih dahulu!');
//         return;
//     }

//     const canvas = document.getElementById('downloadCanvas');
//     const ctx = canvas.getContext('2d');
//     canvas.width = 1080;
//     canvas.height = 1080;

//     // 1. Draw user image dengan transformasi
//     const userImg = new Image();
//     userImg.onload = function () {
//         const scale = imageSettings.scale / 100;
//         const rotation = imageSettings.rotation * Math.PI / 180;
//         const brightness = imageSettings.brightness / 100;
//         const posX = (imageSettings.posX - 50) * 21.6; // 1080 * 2 / 100
//         const posY = (imageSettings.posY - 50) * 21.6;

//         ctx.save();
//         ctx.translate(540 + posX, 540 + posY);
//         ctx.rotate(rotation);
//         ctx.scale(scale, scale);

//         // Apply brightness
//         ctx.filter = `brightness(${brightness})`;

//         const aspectRatio = userImg.width / userImg.height;
//         let drawWidth, drawHeight;
//         if (aspectRatio > 1) {
//             drawWidth = 1080;
//             drawHeight = 1080 / aspectRatio;
//         } else {
//             drawHeight = 1080;
//             drawWidth = 1080 * aspectRatio;
//         }
//         ctx.drawImage(userImg, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
//         ctx.restore();

//         // 2. Draw template overlay (gambar frame)
//         const templateImg = new Image();
//         templateImg.onload = function() {
//             // Gambar template di atas user image
//             ctx.drawImage(templateImg, 0, 0, 1080, 1080);

//             // 3. Download hasil akhir
//             canvas.toBlob(function (blob) {
//                 const url = URL.createObjectURL(blob);
//                 const a = document.createElement('a');
//                 a.href = url;
//                 a.download = `twibbon-${currentTemplate.name}-${Date.now()}.png`;
//                 document.body.appendChild(a);
//                 a.click();
//                 document.body.removeChild(a);
//                 URL.revokeObjectURL(url);
//             }, 'image/png');
//         };
        
//         // Load template image
//         templateImg.src = './template/—Pngtree—blue and yellow product frame_14482169.png';
//     };
    
//     userImg.src = userImageData;
// }

function downloadImage() {
    if (!userImageData || !currentTemplate) {
        alert('Silakan upload foto dan pilih template terlebih dahulu!');
        return;
    }

    const canvas = document.getElementById('downloadCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1080;
    canvas.height = 1080;

    // 1. Draw background color (BARU!)
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, 1080, 1080);

    // 2. Draw user image dengan transformasi
    const userImg = new Image();
    userImg.onload = function () {
        const scale = imageSettings.scale / 100;
        const rotation = imageSettings.rotation * Math.PI / 180;
        const brightness = imageSettings.brightness / 100;
        const posX = (imageSettings.posX - 50) * 21.6;
        const posY = (imageSettings.posY - 50) * 21.6;

        ctx.save();
        ctx.translate(540 + posX, 540 + posY);
        ctx.rotate(rotation);
        ctx.scale(scale, scale);
        ctx.filter = `brightness(${brightness})`;

        const aspectRatio = userImg.width / userImg.height;
        let drawWidth, drawHeight;
        if (aspectRatio > 1) {
            drawWidth = 1080;
            drawHeight = 1080 / aspectRatio;
        } else {
            drawHeight = 1080;
            drawWidth = 1080 * aspectRatio;
        }
        ctx.drawImage(userImg, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
        ctx.restore();

        // 3. Draw template overlay (frame PNG)
        const templateImg = new Image();
        templateImg.onload = function() {
            ctx.drawImage(templateImg, 0, 0, 1080, 1080);

            // 4. Download
            canvas.toBlob(function (blob) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `twibbon-${currentTemplate.name}-${Date.now()}.png`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 'image/png');
        };
        templateImg.src = `./template/${currentTemplate.image}`;
    };
    userImg.src = userImageData;
}

// function downloadImage() {
//     if (!userImageData || !currentTemplate) {
//         alert('Silakan upload foto dan pilih template terlebih dahulu!');
//         return;
//     }

//     const canvas = document.getElementById('downloadCanvas');
//     const ctx = canvas.getContext('2d');
//     canvas.width = 1080;
//     canvas.height = 1080;

//     // Draw user image
//     const img = new Image();
//     img.onload = function () {
//         const scale = imageSettings.scale / 100;
//         const rotation = imageSettings.rotation * Math.PI / 180;
//         const brightness = imageSettings.brightness / 100;
//         const posX = (imageSettings.posX - 50) * 21.6; // 1080 * 2 / 100
//         const posY = (imageSettings.posY - 50) * 21.6;

//         ctx.save();
//         ctx.translate(540 + posX, 540 + posY);
//         ctx.rotate(rotation);
//         ctx.scale(scale, scale);

//         // Apply brightness
//         ctx.filter = `brightness(${brightness})`;

//         const aspectRatio = img.width / img.height;
//         let drawWidth, drawHeight;
//         if (aspectRatio > 1) {
//             drawWidth = 1080;
//             drawHeight = 1080 / aspectRatio;
//         } else {
//             drawHeight = 1080;
//             drawWidth = 1080 * aspectRatio;
//         }
//         ctx.drawImage(img, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
//         ctx.restore();

//         // Draw template overlay (gradient)
//         const gradient = ctx.createLinearGradient(0, 0, 1080, 1080);
//         // Parse gradient from currentTemplate
//         gradient.addColorStop(0, 'rgba(139, 92, 246, 0.3)');
//         gradient.addColorStop(1, 'rgba(236, 72, 153, 0.3)');
//         ctx.fillStyle = gradient;
//         ctx.fillRect(0, 0, 1080, 1080);

//         // Download
//         canvas.toBlob(function (blob) {
//             const url = URL.createObjectURL(blob);
//             const a = document.createElement('a');
//             a.href = url;
//             a.download = `twibbon-${currentTemplate.name}-${Date.now()}.png`;
//             document.body.appendChild(a);
//             a.click();
//             document.body.removeChild(a);
//             URL.revokeObjectURL(url);
//         });
//     };
//     img.src = userImageData;
// }

// FAQ Toggle
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const isActive = answer.classList.contains('active');

    // Close all
    document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('active'));
    document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));

    // Open clicked if it wasn't active
    if (!isActive) {
        answer.classList.add('active');
        element.classList.add('active');
    }
}


// drag n drop
// === 3. Drag enter / over ===
const dropZone = document.getElementById("editorPage");
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

// === 4. Drag leave ===
dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

// === 5. Drop file ===
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const files = e.dataTransfer.files;
    //   handleFiles(files);]
    handleImageUpload(files);
});

// === 6. Handle file list (drag/drop atau file input) ===
function handleFiles(files) {
    for (const file of files) {
        if (!file.type.startsWith('image/')) continue;
        selectedFiles.push(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            const div = document.createElement('div');
            div.classList.add('preview');
            div.innerHTML = `
        <img src="${e.target.result}" alt="${file.name}">
        <small>${file.name}</small>
      `;
            previewGrid.appendChild(div);
        };
        reader.readAsDataURL(file);
    }
}
