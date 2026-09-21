document.addEventListener("DOMContentLoaded", () => {
    const scrollContainer = document.querySelector('.scroll-container');
    
    // Dynamically darken the background as you scroll down
    scrollContainer.addEventListener('scroll', () => {

        const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        const scrollPercent = scrollContainer.scrollTop / maxScroll;
        const colorValue = Math.floor(10 - (scrollPercent * 10));
        
        document.body.style.backgroundColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
    });

    // --- AUTO-HIGHLIGHT ACTIVE NAV BUTTON ON SCROLL ---
    const navButtons = document.querySelectorAll('.nav-btn');
    const sectionElements = document.querySelectorAll('.screen');

    const navObserverOptions = {
        root: document.querySelector('.scroll-container'),
        threshold: 0.4
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                
                navButtons.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.getAttribute('href') === `#${currentId}`) {
                        btn.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sectionElements.forEach(section => navObserver.observe(section));

    // --- LIGHTBOX PREVIEW & NAVIGATION LOGIC ---
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    const modalCaption = document.getElementById("modal-caption");
    const closeBtn = document.getElementById("modal-close");
    const prevBtn = document.getElementById("modal-prev");
    const nextBtn = document.getElementById("modal-next");
    const carouselTrack = document.querySelector(".carousel-track");

    let imageList = [];
    let currentIndex = 0;

    // Update image displayed in modal
    const updateModalImage = (index) => {
        if (imageList.length === 0) return;

        // Loop around if out of bounds
        if (index < 0) index = imageList.length - 1;
        if (index >= imageList.length) index = 0;

        currentIndex = index;
        const selectedImg = imageList[currentIndex];
        
        modalImg.src = selectedImg.src;
        modalCaption.textContent = selectedImg.alt || "Artwork Preview";
    };

    // Listen for clicks on images in carousel
    if (carouselTrack) {
        carouselTrack.addEventListener("click", (e) => {
            const imgElement = e.target.tagName === 'IMG' ? e.target : e.target.querySelector('img');
            
            if (imgElement) {
                // Grab all images inside carousel track
                imageList = Array.from(carouselTrack.querySelectorAll("img"));
                const clickedIndex = imageList.indexOf(imgElement);

                if (clickedIndex !== -1) {
                    updateModalImage(clickedIndex);
                    modal.classList.add("active");
                }
            }
        });
    }

    // Function to close modal
    const closeModal = () => {
        if (modal) modal.classList.remove("active");
    };

    // Event Listeners for Controls
    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    if (prevBtn) {
        prevBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevents backdrop click close
            updateModalImage(currentIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevents backdrop click close
            updateModalImage(currentIndex + 1);
        });
    }

    // Close on backdrop click
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // Keyboard controls (Esc, Left Arrow, Right Arrow)
    document.addEventListener("keydown", (e) => {
        if (modal && modal.classList.contains("active")) {
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowLeft") updateModalImage(currentIndex - 1);
            if (e.key === "ArrowRight") updateModalImage(currentIndex + 1);
        }
    });

});
