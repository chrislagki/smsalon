/* ==========================================================================
   S&M Hair Salon & Beauty Studio - Main JavaScript Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
   * 1. Header Navbar Scroll Effect & Burger Drawer Menu
   * ------------------------------------------------------------------------ */
  const navbar = document.querySelector('.navbar');
  const burgerBtn = document.querySelector('.burger-menu-btn');
  const drawerOverlay = document.querySelector('.nav-drawer-overlay');
  const drawer = document.querySelector('.nav-drawer');
  const drawerCloseBtn = document.querySelector('.nav-drawer-close');

  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Open Drawer Menu
  if (burgerBtn && drawer && drawerOverlay) {
    burgerBtn.addEventListener('click', () => {
      drawer.classList.add('active');
      drawerOverlay.classList.add('active');
      document.body.classList.add('no-scroll');
    });
  }

  // Close Drawer Menu Function
  const closeDrawer = () => {
    if (drawer && drawerOverlay) {
      drawer.classList.remove('active');
      drawerOverlay.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  };

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeDrawer);
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeDrawer);
  }

  /* ------------------------------------------------------------------------
   * 2. Hero Background Image Slider Logic (index.html)
   * ------------------------------------------------------------------------ */
  const slides = document.querySelectorAll('.hero-slide');
  const indicators = document.querySelectorAll('.indicator-dot');
  const progressBar = document.querySelector('.timeline-progress');

  if (slides.length > 0) {
    let currentSlide = 0;
    const slideIntervalTime = 5000; // 5 seconds
    let slideTimer;

    const goToSlide = (index) => {
      slides.forEach((slide) => slide.classList.remove('active'));
      indicators.forEach((dot) => dot.classList.remove('active'));

      currentSlide = (index + slides.length) % slides.length;

      slides[currentSlide].classList.add('active');
      if (indicators[currentSlide]) {
        indicators[currentSlide].classList.add('active');
      }

      // Reset & Animate Progress Bar
      if (progressBar) {
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        setTimeout(() => {
          progressBar.style.transition = `width ${slideIntervalTime}ms linear`;
          progressBar.style.width = '100%';
        }, 20);
      }
    };

    const startSlideTimer = () => {
      goToSlide(currentSlide);
      slideTimer = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, slideIntervalTime);
    };

    indicators.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        clearInterval(slideTimer);
        goToSlide(idx);
        startSlideTimer();
      });
    });

    startSlideTimer();
  }

  /* ------------------------------------------------------------------------
   * 3. Direct Booking Info Modal Trigger
   * ------------------------------------------------------------------------ */
  const bookingModal = document.getElementById('booking-modal');
  const bookingModalCloseBtn = document.getElementById('booking-modal-close');
  const openBookingBtns = document.querySelectorAll('.btn-open-booking');

  const openBookingModal = () => {
    if (bookingModal) {
      bookingModal.classList.add('active');
      document.body.classList.add('no-scroll');
    }
  };

  const closeBookingModal = () => {
    if (bookingModal) {
      bookingModal.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  };

  openBookingBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
      openBookingModal();
    });
  });

  if (bookingModalCloseBtn) {
    bookingModalCloseBtn.addEventListener('click', closeBookingModal);
  }

  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        closeBookingModal();
      }
    });
  }

  /* ------------------------------------------------------------------------
   * 4. Service Category Filter Tabs (services.html & gallery.html)
   * ------------------------------------------------------------------------ */
  const filterTabBtns = document.querySelectorAll('.filter-tab-btn');
  const serviceCards = document.querySelectorAll('.service-card[data-category]');

  if (filterTabBtns.length > 0 && serviceCards.length > 0) {
    filterTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        serviceCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          if (filterValue === 'all' || cardCategory === filterValue) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ------------------------------------------------------------------------
   * 5. Gallery Lightbox Modal (gallery.html)
   * ------------------------------------------------------------------------ */
  const galleryItems = document.querySelectorAll('.gallery-item img');
  const lightboxModal = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  if (galleryItems.length > 0 && lightboxModal && lightboxImg) {
    galleryItems.forEach(img => {
      img.parentElement.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxModal.classList.add('active');
      });
    });

    lightboxModal.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
    });
  }

  /* ------------------------------------------------------------------------
   * 6. Contact Form Submission Handler
   * ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Ευχαριστούμε για το μήνυμά σας! Θα επικοινωνήσουμε μαζί σας σύντομα.');
      contactForm.reset();
    });
  }

  /* ------------------------------------------------------------------------
   * 7. Multilingual Language Switcher (Greek <-> English)
   * ------------------------------------------------------------------------ */
  const langBtns = document.querySelectorAll('.lang-btn');
  
  const translations = {
    el: {
      nav_home: "Αρχική",
      nav_services: "Υπηρεσίες",
      nav_gallery: "Γκαλερί",
      nav_contact: "Επικοινωνία",
      nav_book: "Κλείστε Ραντεβού",
      hero_welcome: "Καλώς Ήρθατε στο S&M Hair Salon",
      hero_title: "Πάθος για Στυλ, Τέχνη στα Μαλλιά",
      hero_subtitle: "Στο S&M Hair Salon προσφέρουμε εξειδικευμένες υπηρεσίες κομμωτικής, βαφών, balayage, θεραπειών Malibu & K18, τοποθέτησης extensions και περιποίησης.",
      hero_btn_explore: "Ανακαλύψτε τις Υπηρεσίες ↓",
      hero_btn_book: "Κλείστε Ραντεβού →",
      philo_title: "Φιλοσοφία",
      philo_heading: "Αναδεικνύουμε τη φυσική ομορφιά των μαλλιών σας.",
      philo_desc: "Με έμπειρα χέρια, εξειδίκευση σε θεραπείες Malibu, K18 & Κερατίνης και κορυφαία προϊόντα, δημιουργούμε το αποτέλεσμα των ονείρων σας.",
      feat_title: "Υπηρεσίες Κομμωτηρίου",
      feat_heading: "Κουρέματα, Βαφές, Balayage & Εξειδικευμένες Θεραπείες.",
      feat_view_all: "Δείτε Όλες τις Υπηρεσίες →",
      services_menu_title: "Μενού Υπηρεσιών",
      services_menu_heading: "Υπηρεσίες Κομμωτηρίου",
      services_menu_subtitle: "Ανακαλύψτε τις εξειδικευμένες υπηρεσίες κουρέματος, βαφών, balayage, θεραπειών Malibu, K18 & Κερατίνης καθώς και τοποθέτησης extensions.",
      services_all: "Όλες οι Υπηρεσίες",
      services_hair_cuts: "Κουρέματα & Styling",
      services_hair_color: "Βαφές & Balayage",
      services_hair_therapy: "Θεραπείες Μαλλιών",
      services_hair_ext: "Extensions & Αποτρίχωση",
      cat_cuts_title: "Κουρέματα & Styling",
      cat_color_title: "Βαφές & Balayage",
      cat_therapy_title: "Θεραπείες Μαλλιών",
      cat_extensions_title: "Extensions & Αποτρίχωση",
      srv_cut: "Κούρεμα",
      srv_cut_desc: "Προσωποποιημένο κούρεμα ακριβείας προσαρμοσμένο στα χαρακτηριστικά και το στυλ σας.",
      srv_styling: "Χτένισμα",
      srv_styling_desc: "Επαγγελματικό χτένισμα για εντυπωσιακές εμφανίσεις και διάρκεια.",
      srv_shaping: "Φορμάρισμα",
      srv_shaping_desc: "Ελαφρύ φορμάρισμα και styling για φυσικό όγκο και κίνηση.",
      srv_color: "Βαφή",
      srv_color_desc: "Βαφή υψηλής ποιότητας για πλούσιο, λαμπερό χρώμα και πλήρη κάλυψη.",
      srv_highlights: "Ανταύγειες",
      srv_highlights_desc: "Τεχνική φωτεινών ανταυγειών για βάθος, διάσταση και λάμψη στα μαλλιά σας.",
      srv_balayage: "Balayage",
      srv_balayage_desc: "Signature balayage για φυσικές, ομαλές μεταβάσεις χρώματος και ηλιόλουστο αποτέλεσμα.",
      srv_hydration: "Απλή Ενυδάτωση",
      srv_hydration_desc: "Βασική θεραπεία βαθιάς ενυδάτωσης για απαλότητα και ελαστικότητα.",
      srv_malibu_wash: "Malibu Λουτήρα",
      srv_malibu_wash_desc: "Εξειδικευμένος καθαρισμός Malibu στον λουτήρα για αφαίρεση επικαθίσεων.",
      srv_malibu_crystal: "Malibu Crystal",
      srv_malibu_crystal_desc: "Θεραπεία κρυσταλλικού καθαρισμού Malibu για απομάκρυνση σκληρών μετάλλων & αλάτων.",
      srv_malibu_cpr: "Malibu CPR",
      srv_malibu_cpr_desc: "Επαγγελματική θεραπεία Malibu CPR για αφαίρεση ανεπιθύμητων τεχνητών χρωστικών.",
      srv_malibu_headlab: "Malibu HEADLAB",
      srv_malibu_headlab_desc: "Προηγμένη διάγνωση & θεραπεία εξυγίανσης τριχωτού και μαλλιών Malibu HEADLAB.",
      srv_malibu_cocktail: "Malibu Cocktail",
      srv_malibu_cocktail_desc: "Συνδυαστική θεραπεία Malibu Cocktail για απόλυτη αναζωογόνηση και λάμψη.",
      srv_botox: "Botox Μαλλιών",
      srv_botox_desc: "Εντατική θεραπεία αναδόμησης & θρέψης που γεμίζει την τρίχα και χαρίζει μεταξένια υφή.",
      srv_keratin: "Θεραπεία Κερατίνης",
      srv_keratin_desc: "Επαγγελματική ισιωτική θεραπεία λείανσης κερατίνης κατά του φριζαρίσματος.",
      srv_k18: "Θεραπεία K18",
      srv_k18_desc: "Επαναστατική μοριακή θεραπεία K18 για επανόρθωση της τρίχης σε 4 λεπτά.",
      srv_tapes: "Τοποθέτηση Tapes",
      srv_tapes_desc: "Εξειδικευμένη τοποθέτηση τρέσας/tapes extensions για φυσικό μήκος και όγκο.",
      srv_microrings: "Τοποθέτηση Microrings",
      srv_microrings_desc: "Τοποθέτηση extensions με τη μέθοδο microrings χωρίς θερμότητα.",
      srv_refitting: "Επανατοποθέτηση Extensions",
      srv_refitting_desc: "Συντήρηση και επανατοποθέτηση extensions tapes ή microrings.",
      srv_waxing: "Αποτρίχωση",
      srv_waxing_desc: "Περιποίηση και αποτρίχωση προσώπου με προσοχή και υγιεινή.",
      book_btn: "Κράτηση",
      gallery_eyebrow: "Portfolio",
      gallery_title: "Γκαλερί Δημιουργιών",
      gallery_subtitle: "Δείτε φωτογραφίες από τις δημιουργίες μας: balayage, κουρέματα, θεραπείες Malibu & K18 και extensions.",
      gallery_all: "Όλα",
      contact_eyebrow: "Επικοινωνία",
      contact_title: "Επικοινωνήστε Μαζί Μας",
      contact_subtitle: "Έχετε ερωτήσεις για τις υπηρεσίες μας, τις βαφές ή τις θεραπείες; Στείλτε μας μήνυμα ή επισκεφθείτε το κατάστημά μας στο Γαλάτσι.",
      contact_box_title: "Πληροφορίες Καταστήματος",
      contact_box_subtitle: "Για κρατήσεις ραντεβού, καλέστε μας στο τηλέφωνο ή στείλτε μας μήνυμα στο Instagram.",
      contact_address_label: "Διεύθυνση",
      contact_phone_label: "Τηλέφωνο",
      contact_hours_label: "Ωράριο",
      contact_form_title: "Στείλτε μας Μήνυμα",
      form_name_label: "Ονοματεπώνυμο",
      form_email_label: "Διεύθυνση Email",
      form_subject_label: "Θέμα",
      form_message_label: "Μήνυμα",
      form_submit_btn: "Αποστολή Μηνύματος",
      modal_title: "Κλείστε το Ραντεβού σας",
      modal_subtitle: "Για να διασφαλίσουμε την προσωπική φροντίδα κάθε πελάτη, οι κρατήσεις γίνονται αποκλειστικά μέσω τηλεφώνου ή μηνύματος στο Instagram.",
      modal_call: "210 2917238",
      modal_ig: "DM Instagram",
      footer_desc: "Το S&M είναι ένα σύγχρονο πολυτελές hair salon αφιερωμένο στο κούρεμα ακριβείας, τις εξειδικευμένες τεχνικές χρώματος, τις θεραπείες Malibu & K18 και την τοποθέτηση extensions.",
      footer_explore: "Εξερεύνηση",
      footer_info_title: "Πληροφορίες Καταστήματος",
      footer_address_val: "Σκύρου 2, Γαλάτσι",
      footer_hours_val: "Δευ - Σαβ: 09:00 - 20:00 • Κυρ: Κλειστά",
      footer_rights: "© 2026 S&M Hair Salon. Όλα τα δικαιώματα διατηρούνται."
    },
    en: {
      nav_home: "Home",
      nav_services: "Services",
      nav_gallery: "Gallery",
      nav_contact: "Contact",
      nav_book: "Book Appointment",
      hero_welcome: "Welcome to S&M Hair Salon",
      hero_title: "Passion for Style, Artistry in Hair",
      hero_subtitle: "At S&M Hair Salon we provide specialized hairdressing, coloring, balayage, Malibu & K18 treatments, hair extensions, and beauty services.",
      hero_btn_explore: "Explore Services ↓",
      hero_btn_book: "Book Appointment →",
      philo_title: "Philosophy",
      philo_heading: "Enhancing the natural beauty of your hair.",
      philo_desc: "With expert artistry, specialized Malibu, K18 & Keratin treatments, and premium products, we bring your dream hair to life.",
      feat_title: "Hair Services",
      feat_heading: "Haircuts, Coloring, Balayage & Specialized Treatments.",
      feat_view_all: "View All Services →",
      services_menu_title: "Service Menu",
      services_menu_heading: "Hair Salon Services",
      services_menu_subtitle: "Discover our specialized haircuts, hair coloring, balayage, Malibu, K18 & Keratin treatments, and extensions.",
      services_all: "All Services",
      services_hair_cuts: "Cuts & Styling",
      services_hair_color: "Coloring & Balayage",
      services_hair_therapy: "Hair Treatments",
      services_hair_ext: "Extensions & Waxing",
      cat_cuts_title: "Cuts & Styling",
      cat_color_title: "Coloring & Balayage",
      cat_therapy_title: "Hair Treatments",
      cat_extensions_title: "Extensions & Waxing",
      srv_cut: "Precision Haircut",
      srv_cut_desc: "Bespoke precision haircut tailored to your features and personal style.",
      srv_styling: "Hair Styling",
      srv_styling_desc: "Professional styling for stunning, long-lasting looks.",
      srv_shaping: "Quick Shaping",
      srv_shaping_desc: "Light shaping and styling for natural volume and bounce.",
      srv_color: "Hair Color",
      srv_color_desc: "High-grade permanent or semi-permanent color for rich, luminous shine.",
      srv_highlights: "Highlights",
      srv_highlights_desc: "Luminous foil highlights for dimension, depth, and radiance.",
      srv_balayage: "Balayage",
      srv_balayage_desc: "Signature hand-painted balayage for seamless, sun-kissed color gradients.",
      srv_hydration: "Deep Hydration",
      srv_hydration_desc: "Essential deep hydration treatment for soft, flexible, silky hair.",
      srv_malibu_wash: "Malibu Basin Wash",
      srv_malibu_wash_desc: "Specialized Malibu basin wash to remove surface impurities.",
      srv_malibu_crystal: "Malibu Crystal Gel",
      srv_malibu_crystal_desc: "Malibu Crystal Gel treatment removing hard water minerals and copper build-up.",
      srv_malibu_cpr: "Malibu CPR",
      srv_malibu_cpr_desc: "Professional Malibu CPR treatment to safely remove unwanted artificial pigment.",
      srv_malibu_headlab: "Malibu HEADLAB",
      srv_malibu_headlab_desc: "Advanced scalp diagnosis & detox treatment with Malibu HEADLAB.",
      srv_malibu_cocktail: "Malibu Cocktail",
      srv_malibu_cocktail_desc: "Combined Malibu Cocktail treatment for total scalp & hair rejuvenation.",
      srv_botox: "Hair Botox",
      srv_botox_desc: "Intensive nourishing reconstruction treatment that plumps and restores hair fibers.",
      srv_keratin: "Keratin Treatment",
      srv_keratin_desc: "Professional smoothing Keratin treatment eliminating frizz for sleek hair.",
      srv_k18: "K18 Treatment",
      srv_k18_desc: "Revolutionary K18 molecular peptide treatment repairing hair damage in 4 minutes.",
      srv_tapes: "Tape-in Extensions",
      srv_tapes_desc: "Expert installation of tape-in extensions for natural length and fullness.",
      srv_microrings: "Microring Extensions",
      srv_microrings_desc: "Heat-free microring extension installation protecting natural hair.",
      srv_refitting: "Extension Refitting",
      srv_refitting_desc: "Maintenance, re-taping, and refitting service for hair extensions.",
      srv_waxing: "Facial Waxing",
      srv_waxing_desc: "Gentle facial waxing and brow grooming with strict hygiene.",
      book_btn: "Book Now",
      gallery_eyebrow: "Portfolio",
      gallery_title: "Creative Portfolio",
      gallery_subtitle: "Browse photos of our creations: balayage, haircuts, Malibu & K18 treatments, and extensions.",
      gallery_all: "All",
      contact_eyebrow: "Contact Us",
      contact_title: "Get in Touch",
      contact_subtitle: "Have questions about our hair services, colors, or treatments? Drop us a message or visit our salon in Galatsi.",
      contact_box_title: "Salon Information",
      contact_box_subtitle: "To ensure personal care for every client, bookings are taken exclusively by Phone or Instagram DM.",
      contact_address_label: "Address",
      contact_phone_label: "Phone",
      contact_hours_label: "Working Hours",
      contact_form_title: "Send Us a Message",
      form_name_label: "Full Name",
      form_email_label: "Email Address",
      form_subject_label: "Subject",
      form_message_label: "Message",
      form_submit_btn: "Send Message",
      modal_title: "Book Your Appointment",
      modal_subtitle: "To ensure personal care for every client, bookings are taken exclusively by Phone or Instagram DM.",
      modal_call: "210 2917238",
      modal_ig: "DM Instagram",
      footer_desc: "S&M is a luxury hair salon dedicated to precision cutting, custom color art, Malibu & K18 treatments, and extensions.",
      footer_explore: "Explore",
      footer_info_title: "Salon Information",
      footer_address_val: "Skyrou 2, Galatsi",
      footer_hours_val: "Mon - Sat: 09:00 - 20:00 • Sun: Closed",
      footer_rights: "© 2026 S&M Hair Salon. All rights reserved."
    }
  };

  const setLanguage = (lang) => {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    langBtns.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  };

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.getAttribute('data-lang');
      setLanguage(selectedLang);
    });
  });

});
