/* ============================================
   DriversLane Driving Academy - Custom JavaScript
   Features: Lightbox, Scroll Animations, Navbar,
   Form Validation, Back to Top
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ---------- Navbar Scroll Effect ----------
  const navbar = document.querySelector('.navbar-custom');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ---------- Back to Top Button ----------
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- Scroll Reveal Animation ----------
  const reveals = document.querySelectorAll('.reveal');

  function checkReveal() {
    const windowHeight = window.innerHeight;
    reveals.forEach(function (el) {
      const revealTop = el.getBoundingClientRect().top;
      if (revealTop < windowHeight - 100) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', checkReveal);
  checkReveal(); // Check on page load

  // ---------- Lightbox / Pop-up Images ----------
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.querySelector('.lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (galleryItems.length > 0 && lightboxModal) {
    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () {
        const img = this.querySelector('img');
        const caption = this.getAttribute('data-caption') || '';
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = caption;
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);

    lightboxModal.addEventListener('click', function (e) {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ---------- Form Validation ----------
  const enrollForm = document.getElementById('enrollForm');
  if (enrollForm) {
    enrollForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const fullName = document.getElementById('fullName').value.trim();
      const contactNum = document.getElementById('contactNum').value.trim();
      const email = document.getElementById('email').value.trim();
      const course = document.getElementById('course').value;
      const branch = document.getElementById('branch').value;

      if (!fullName || !contactNum || !email || !course || !branch) {
        showAlert('Please fill in all required fields.', 'danger');
        return;
      }

      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showAlert('Please enter a valid email address.', 'danger');
        return;
      }

      showAlert('Thank you for your enrollment inquiry! We will contact you soon.', 'success');
      enrollForm.reset();
    });
  }

  function showAlert(message, type) {
    const alertDiv = document.getElementById('formAlert');
    if (alertDiv) {
      alertDiv.className = 'alert alert-' + type + ' mt-3';
      alertDiv.textContent = message;
      alertDiv.style.display = 'block';
      setTimeout(function () {
        alertDiv.style.display = 'none';
      }, 5000);
    }
  }

  // ---------- Active Nav Link ----------
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  navLinks.forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // ---------- Image Map Tooltip ----------
  const areas = document.querySelectorAll('area');
  areas.forEach(function (area) {
    area.addEventListener('click', function (e) {
      e.preventDefault();
      const title = this.getAttribute('title');
      alert(title);
    });
  });

});
