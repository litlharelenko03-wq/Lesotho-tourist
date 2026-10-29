// Lesotho Tourism JavaScript Functionality

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Registration & Booking Form Validation ---
    const regForm = document.getElementById('registrationForm');
    
    if (regForm) {
        regForm.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();

            let isValid = true;

            // Form Inputs
            const fullName = document.getElementById('fullName');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirmPassword');
            const alertBox = document.getElementById('formAlert');

            // Reset custom errors
            confirmPassword.setCustomValidity("");

            // Name Validation
            if (!fullName.value.trim()) {
                isValid = false;
            }

            // Email Validation (Regex)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                isValid = false;
            }

            // Phone Number Validation (At least 8 digits)
            const phoneRegex = /^[0-9+\s-]{8,}$/;
            if (!phoneRegex.test(phone.value.trim())) {
                isValid = false;
            }

            // Password Validation (Minimum 6 characters)
            if (password.value.length < 6) {
                isValid = false;
            }

            // Password Matching
            if (password.value !== confirmPassword.value) {
                confirmPassword.setCustomValidity("Passwords do not match.");
                isValid = false;
            }

            // Apply Bootstrap validation visuals
            regForm.classList.add('was-validated');

            // Show Alert Message
            if (isValid) {
                alertBox.className = 'alert alert-success mt-3';
                alertBox.innerHTML = '<strong>Success!</strong> Your registration has been submitted successfully.';
                alertBox.classList.remove('d-none');
                regForm.reset();
                regForm.classList.remove('was-validated');
            } else {
                alertBox.className = 'alert alert-danger mt-3';
                alertBox.innerHTML = '<strong>Error!</strong> Please check the highlighted fields and try again.';
                alertBox.classList.remove('d-none');
            }
        });
    }

    // --- 2. Dynamic Image Gallery Lightbox ---
    const galleryImages = document.querySelectorAll('.gallery-img');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');

    if (galleryImages.length > 0 && lightboxModal) {
        let currentIndex = 0;
        const imageList = Array.from(galleryImages);

        const updateLightbox = (index) => {
            currentIndex = index;
            const selectedImg = imageList[currentIndex];
            lightboxImage.src = selectedImg.src;
            lightboxImage.alt = selectedImg.alt;
            lightboxCaption.textContent = selectedImg.getAttribute('data-caption') || selectedImg.alt;
        };

        imageList.forEach((img, index) => {
            img.parentElement.addEventListener('click', () => {
                updateLightbox(index);
                const bsModal = new bootstrap.Modal(lightboxModal);
                bsModal.show();
            });
        });

        // Prev/Next Navigation Controls inside Lightbox
        const prevBtn = document.getElementById('prevImgBtn');
        const nextBtn = document.getElementById('nextImgBtn');

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                let prevIndex = (currentIndex - 1 + imageList.length) % imageList.length;
                updateLightbox(prevIndex);
            });

            nextBtn.addEventListener('click', () => {
                let nextIndex = (currentIndex + 1) % imageList.length;
                updateLightbox(nextIndex);
            });
        }
    }
});