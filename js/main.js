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
   * 4. Service & Gallery Category Filter Tabs (services.html & gallery.html)
   * ------------------------------------------------------------------------ */
  const filterTabBtns = document.querySelectorAll('.filter-tab-btn');
  const filterableItems = document.querySelectorAll('.service-card[data-category], .gallery-item[data-category]');

  if (filterTabBtns.length > 0 && filterableItems.length > 0) {
    filterTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        filterableItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');
          const isMatch = filterValue === 'all' || itemCategory === filterValue;

          if (isMatch) {
            if (item.classList.contains('gallery-item')) {
              item.style.display = 'inline-block';
            } else {
              item.style.display = 'flex';
            }
          } else {
            item.style.display = 'none';
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
      hero_title: "Το ωραίο χρώμα θέλει υγιή μαλλιά.",
      hero_subtitle: "Βαφές, balayage και θεραπείες που δυναμώνουν την τρίχα. Για αποτέλεσμα που φαίνεται όμορφο πολύ μετά το ραντεβού σας.",
      hero_btn_explore: "Ανακαλύψτε τις Υπηρεσίες",
      hero_btn_book: "Κλείστε Ραντεβού",
      philo_title: "Φιλοσοφία",
      philo_heading: "Αναδεικνύουμε τη φυσική ομορφιά των μαλλιών σας.",
      philo_desc: "Με έμπειρα χέρια, εξειδίκευση σε θεραπείες Malibu, K18 & Κερατίνης και κορυφαία προϊόντα, δημιουργούμε το αποτέλεσμα των ονείρων σας.",
      feat_title: "Υπηρεσίες Κομμωτηρίου",
      feat_heading: "Κουρέματα, Βαφές, Balayage & Εξειδικευμένες Θεραπείες.",
      feat_view_all: "Δείτε Όλες τις Υπηρεσίες",
      services_menu_title: "Μενού Υπηρεσιών",
      services_menu_heading: "Υπηρεσίες Κομμωτηρίου",
      services_menu_subtitle: "Ανακαλύψτε τις εξειδικευμένες υπηρεσίες κουρέματος, βαφών, balayage, θεραπειών Malibu, K18 & Κερατίνης καθώς και τοποθέτησης extensions.",
      services_all: "Όλες οι Υπηρεσίες",
      services_cuts: "Κουρέματα & Styling",
      services_color: "Χρώμα",
      services_balayage: "Balayage & Τεχνικές",
      services_extensions: "Extensions",
      services_therapy: "Θεραπείες Μαλλιών",
      services_care: "Περιποίηση & Λούσιμο",
      services_bridal: "Bridal & Events",
      services_men: "Ανδρικά",
      services_kids: "Παιδικά",
      services_products: "Προϊόντα",
      services_consultation: "Consultation",
      cat_cuts_title: "Κουρέματα & Styling",
      cat_color_title: "Χρώμα",
      cat_balayage_title: "Balayage & Τεχνικές Ξανοίγματος",
      cat_extensions_title: "Extensions",
      cat_therapy_title: "Θεραπείες Μαλλιών",
      cat_care_title: "Περιποίηση & Λούσιμο",
      cat_bridal_title: "Bridal & Special Occasions",
      cat_men_title: "Ανδρικές Υπηρεσίες",
      cat_kids_title: "Παιδικές Υπηρεσίες",
      cat_products_title: "Προϊόντα & Συμβουλευτική",
      cat_consultation_title: "Consultation",

      /* Cuts */
      srv_women_cut: "Γυναικείο Κούρεμα",
      srv_women_cut_desc: "Προσωποποιημένο γυναικείο κούρεμα ακριβείας προσαρμοσμένο στα χαρακτηριστικά και το στυλ σας.",
      srv_kids_cut_cuts: "Παιδικό Κούρεμα",
      srv_kids_cut_cuts_desc: "Φροντισμένο και περιποιημένο κούρεμα για παιδιά.",
      srv_men_cut_cuts: "Ανδρικό Κούρεμα",
      srv_men_cut_cuts_desc: "Σύγχρονο ανδρικό κούρεμα ακριβείας.",
      srv_styling: "Χτένισμα",
      srv_styling_desc: "Επαγγελματικό χτένισμα για εντυπωσιακές εμφανίσεις και διάρκεια.",
      srv_straightening: "Ίσιωμα",
      srv_straightening_desc: "Λείο ίσιωμα για μεταξένιο και λαμπερό αποτέλεσμα.",
      srv_curls: "Μπούκλες / Σπαστό",
      srv_curls_desc: "Styling με ανάλαφρες μπούκλες ή φυσική σπαστή κίνηση.",
      srv_event_styling: "Χτένισμα για Ειδική Περίσταση",
      srv_event_styling_desc: "Εντυπωσιακό χτένισμα για δεξιώσεις και ιδιαίτερες στιγμές.",
      srv_bridal_styling: "Βραδινό / Νυφικό Χτένισμα",
      srv_bridal_styling_desc: "Πολυτελές βραδινό ή νυφικό styling.",
      srv_bridal_trial: "Δοκιμαστικό Νυφικό Χτένισμα",
      srv_bridal_trial_desc: "Δοκιμαστική συνεδρία για την τέλεια επιλογή νυφικού χτενίσματος.",

      /* Color */
      srv_root_color: "Βαφή Ρίζας",
      srv_root_color_desc: "Ανανέωση βαφής στη ρίζα για πλήρη κάλυψη.",
      srv_full_color: "Βαφή σε Όλα τα Μήκη",
      srv_full_color_desc: "Ολική βαφή από τη ρίζα έως τις άκρες για πλούσιο, λαμπερό χρώμα.",
      srv_refle: "Ρεφλέ",
      srv_refle_desc: "Φρεσκάρισμα τόνου και εξουδετέρωση ανεπιθύμητων κιτρινιλών.",
      srv_toner_gloss: "Toner / Gloss",
      srv_toner_gloss_desc: "Χρωματικό toner & λάμψη για ζωντάνια.",
      srv_color_correction: "Διόρθωση Χρώματος",
      srv_color_correction_desc: "Εξειδικευμένη διόρθωση τόνων και αλλαγή χρώματος.",
      srv_bleach_full: "Ντεκαπάζ",
      srv_bleach_full_desc: "Ολικό ξάνθισμα υψηλής προστασίας.",
      srv_bleach_root: "Ντεκαπάζ Ρίζας",
      srv_bleach_root_desc: "Στοχευμένο ξάνθισμα στη ρίζα με φροντίδα της τρίχας.",
      srv_color_removal: "Αποχρωματισμός",
      srv_color_removal_desc: "Ασφαλής αφαίρεση προηγούμενων χρωστικών.",

      /* Balayage */
      srv_balayage: "Balayage",
      srv_balayage_desc: "Signature hand-painted balayage για φυσικές, ομαλές μεταβάσεις χρώματος.",
      srv_babylights: "Babylights",
      srv_babylights_desc: "Πολύ λεπτές, διακριτικές ανταύγειες για φυσική φωτεινότητα.",
      srv_highlights: "Highlights",
      srv_highlights_desc: "Κλασικές ανταύγειες με αλουμινόχαρτο για βάθος και λάμψη.",
      srv_lowlights: "Lowlights",
      srv_lowlights_desc: "Σκούρες πινελιές για βάθος και φυσικότητα.",
      srv_face_framing: "Face Framing",
      srv_face_framing_desc: "Φωτεινές ανταύγειες γύρω από το πρόσωπο που αναδεικνύουν τα χαρακτηριστικά.",
      srv_money_piece: "Money Piece",
      srv_money_piece_desc: "Έντονο φωτεινό πλαίσιο στις μπροστινές τούφες.",
      srv_antavgeies: "Ανταύγειες",
      srv_antavgeies_desc: "Τεχνική ανταυγειών προσαρμοσμένη στις ανάγκες σας.",
      srv_combo_lightening: "Συνδυαστικές Τεχνικές Ξανοίγματος",
      srv_combo_lightening_desc: "Custom συνδυασμός Balayage, Babylights & Highlights.",
      srv_balayage_correction: "Διόρθωση Balayage / Ανταυγειών",
      srv_balayage_correction_desc: "Επαγγελματική διόρθωση και εξομάλυνση μεταβάσεων balayage.",

      /* Extensions */
      srv_tape_extensions: "Ταινίες Extensions",
      srv_tape_extensions_desc: "Τοποθέτηση extensions με ταινίες (tape-in) για φυσικό μήκος & όγκο.",
      srv_invisible_tapes: "Invisible Tape Extensions",
      srv_invisible_tapes_desc: "Αόρατες ταινίες tape extensions για διακριτικότητα και άνεση.",
      srv_ext_length: "Extensions για Μήκος",
      srv_ext_length_desc: "Προσθήκη extensions premium ποιότητας για μακριά μαλλιά.",
      srv_ext_volume: "Extensions για Όγκο",
      srv_ext_volume_desc: "Πύκνωση και ενίσχυση όγκου σε λεπτά μαλλιά.",
      srv_ext_placement: "Τοποθέτηση Extensions",
      srv_ext_placement_desc: "Εξειδικευμένη εφαρμογή extensions με ακρίβεια.",
      srv_ext_removal: "Αφαίρεση Extensions",
      srv_ext_removal_desc: "Ανώδυνη και προσεκτική αφαίρεση extensions χωρίς φθορά.",
      srv_ext_refitting: "Επανατοποθέτηση / Συντήρηση Extensions",
      srv_ext_refitting_desc: "Περιοδική συντήρηση, αντικατάσταση ταινιών και επανατοποθέτηση.",
      srv_ext_consultation: "Συμβουλευτική Extensions & Χρώματος",
      srv_ext_consultation_desc: "Προσωπική συνεδρία για την επιλογή μεθόδου & απόχρωσης.",

      /* Therapy */
      srv_k18: "K18 Molecular Repair",
      srv_k18_desc: "Επαναστατική μοριακή θεραπεία K18 που επανορθώνει την τρίχη σε 4 λεπτά.",
      srv_olaplex: "Olaplex",
      srv_olaplex_desc: "Παγκοσμίως αναγνωρισμένη θεραπεία προστασίας και αναδόμησης δεσμών.",
      srv_malibu_cocktail: "Cocktail Malibu C",
      srv_malibu_cocktail_desc: "Συνδυαστική θεραπεία Malibu C για βαθύ καθαρισμό και αναζωογόνηση.",
      srv_malibu_crystal: "Crystal Gel Malibu C",
      srv_malibu_crystal_desc: "Αφαιρεί σκληρά μέταλλα, άλατα και χλώριο που θαμπώνουν τα μαλλιά.",
      srv_malibu_cpr: "CPR Malibu C",
      srv_malibu_cpr_desc: "Αφαιρεί με ασφάλεια τις συσσωρευμένες τεχνητές χρωστικές.",
      srv_hair_detox: "Detox Μαλλιών",
      srv_hair_detox_desc: "Θεραπεία αποτοξίνωσης για απομάκρυνση ρύπων και επικαθίσεων.",
      srv_keratin: "Θεραπεία Κερατίνης",
      srv_keratin_desc: "Επαγγελματική ισιωτική θεραπεία λείανσης κερατίνης κατά του φριζαρίσματος.",
      srv_hydration: "Ενυδάτωση",
      srv_hydration_desc: "Βαθιά ενυδατική φροντίδα για ελαστικότητα, απαλότητα και λάμψη.",
      srv_reconstruction: "Αναδόμηση",
      srv_reconstruction_desc: "Εντατική θεραπεία πρωτεϊνικής αναδόμησης για ταλαιπωρημένα μαλλιά.",
      srv_damaged_therapy: "Θεραπεία για Ταλαιπωρημένα Μαλλιά",
      srv_damaged_therapy_desc: "Εξειδικευμένο πρωτόκολλο επανόρθωσης για καταστρεμμένα μαλλιά.",
      srv_split_ends: "Θεραπεία κατά της Ψαλίδας",
      srv_split_ends_desc: "Σφράγιση των αιχμών της τρίχας για πρόληψη της ψαλίδας.",
      srv_custom_therapy: "Εξατομικευμένη Θεραπεία",
      srv_custom_therapy_desc: "Custom θεραπεία σχεδιασμένη αποκλειστικά για τις ανάγκες της τρίχας σας.",

      /* Care */
      srv_wash: "Λούσιμο",
      srv_wash_desc: "Χαλαρωτικό λούσιμο με εξειδικευμένα επαγγελματικά σαμπουάν.",
      srv_conditioner_mask: "Conditioner / Μάσκα",
      srv_conditioner_mask_desc: "Εντατική μαλακτική φροντίδα & μάσκα για μεταξένια υφή.",
      srv_scalp_care: "Εξειδικευμένη Περιποίηση Τριχωτού",
      srv_scalp_care_desc: "Στοχευμένη φροντίδα για ευαίσθητο, ξηρό ή λιπαρό τριχωτό.",
      srv_scalp_treatment: "Scalp Treatment",
      srv_scalp_treatment_desc: "Θεραπεία τριχωτού κεφαλής για υγιή ανάπτυξη της τρίχας.",
      srv_scalp_detox: "Detox Τριχωτού",
      srv_scalp_detox_desc: "Βαθύς απολεπιστικός καθαρισμός τριχωτού από σμήγμα.",
      srv_rejuvenation: "Θεραπεία Αναζωογόνησης",
      srv_rejuvenation_desc: "Τονωτική φροντίδα που ζωντανεύει τα θαμπά και άτονα μαλλιά.",
      srv_strengthening: "Θεραπεία Ενδυνάμωσης",
      srv_strengthening_desc: "Ενίσχυση της ρίζας και της δομής της τρίχας κατά του σπασίματος.",

      /* Bridal */
      srv_bridal_main: "Νυφικό Χτένισμα",
      srv_bridal_main_desc: "Πολυτελές νυφικό styling προσαρμοσμένο στο νυφικό και το ύφος του γάμου.",
      srv_bridal_styling_opt: "Bridal Styling",
      srv_bridal_styling_opt_desc: "Ολοκληρωμένη περιποίηση και φορμάρισμα για τη μέρα του γάμου.",
      srv_bridal_trial_opt: "Δοκιμαστικό Νυφικό Χτένισμα",
      srv_bridal_trial_opt_desc: "Δοκιμαστικές προτάσεις & εφαρμογές για την οριστικοποίηση του νυφικού look.",
      srv_wedding_guest: "Χτένισμα για Γάμο",
      srv_wedding_guest_desc: "Κομψά χτενίσματα για κουμπάρες, μαμάδες και καλεσμένες γάμου.",
      srv_baptism_styling: "Χτένισμα για Βάπτιση",
      srv_baptism_styling_desc: "Φρέσκα και κομψά χτενίσματα για μαμάδες & νονές σε βαπτίσεις.",
      srv_events_styling: "Χτένισμα για Εκδηλώσεις",
      srv_events_styling_desc: "Επαγγελματικό styling για gala, δεξιώσεις και επίσημες εκδηλώσεις.",
      srv_party_styling: "Χτένισμα για Πάρτι / Special Occasions",
      srv_party_styling_desc: "Μοντέρνα χτενίσματα για γενέθλια, ρεβεγιόν και πάρτι.",

      /* Men */
      srv_men_cut: "Ανδρικό Κούρεμα",
      srv_men_cut_desc: "Σύγχρονο ή κλασικό ανδρικό κούρεμα ακριβείας.",
      srv_clippers_cut: "Κούρεμα με Μηχανή",
      srv_clippers_cut_desc: "Κούρεμα με μηχανή (fade / buzz cut) με καθαρές γραμμές.",
      srv_razor_cut: "Κούρεμα με Ξυράφι",
      srv_razor_cut_desc: "Παραδοσιακό κούρεμα & φινίρισμα με ξυράφι για απόλυτη ακρίβεια.",
      srv_beard_trim: "Περιποίηση Γενειάδας",
      srv_beard_trim_desc: "Σχηματισμός και περιποίηση γενειάδας & μουστακιού.",
      srv_men_styling: "Styling",
      srv_men_styling_desc: "Φινίρισμα και φορμάρισμα με επαγγελματικά προϊόντα styling.",

      /* Kids */
      srv_kids_styling: "Παιδικό Χτένισμα",
      srv_kids_styling_desc: "Όμορφα, ανάλαφρα χτενίσματα για παιδιά.",
      srv_girls_cut: "Κοριτσίστικο Κούρεμα",
      srv_girls_cut_desc: "Μοντέρνο κούρεμα και φορμάρισμα για μικρές δεσποινίδες.",
      srv_boys_cut: "Αγορίστικο Κούρεμα",
      srv_boys_cut_desc: "Στυλάτο αγορίστικο κούρεμα με προσοχή στη λεπτομέρεια.",

      /* Products */
      srv_product_advice: "Συμβουλευτική Επιλογής Προϊόντων",
      srv_product_advice_desc: "Επαγγελματική καθοδήγηση για τη σωστή επιλογή προϊόντων στο σπίτι.",
      srv_custom_care_routine: "Προτάσεις Εξατομικευμένης Περιποίησης",
      srv_custom_care_routine_desc: "Σχεδιασμός ρουτίνας περιποίησης προσαρμοσμένης στα μαλλιά σας.",
      srv_color_products: "Προτάσεις Προϊόντων για Βαμμένα Μαλλιά",
      srv_color_products_desc: "Εξειδικευμένα προϊόντα διατήρησης & προστασίας του χρώματος.",
      srv_extensions_products: "Προτάσεις Προϊόντων για Extensions",
      srv_extensions_products_desc: "Ειδικά προϊόντα καθαρισμού & ενυδάτωσης για extensions.",
      srv_pro_products: "Προϊόντα Επαγγελματικής Περιποίησης",
      srv_pro_products_desc: "Κορυφαία επαγγελματικά προϊόντα κομμωτηρίου για θεραπεία & styling.",

      /* Consultation */
      srv_free_consultation: "Δωρεάν Συμβουλευτική",
      srv_free_consultation_desc: "Δωρεάν προσωπική συνεδρία αξιολόγησης πριν από κάθε εργασία.",
      srv_hair_diagnosis: "Hair Diagnosis",
      srv_hair_diagnosis_desc: "Επαγγελματική διάγνωση της ποιότητας και της υγείας της τρίχας.",
      srv_hair_analysis: "Ανάλυση Κατάστασης Τρίχας",
      srv_hair_analysis_desc: "Λεπτομερής έλεγχος των αναγκών σε ενυδάτωση και πρωτεΐνη.",
      srv_color_proposal: "Πρόταση Χρώματος",
      srv_color_proposal_desc: "Προσωποποιημένη πρόταση απόχρωσης με βάση τον τόνο της επιδερμίδας σας.",
      srv_balayage_proposal: "Πρόταση Τεχνικής Balayage",
      srv_balayage_proposal_desc: "Επιλογή της ιδανικής τεχνικής ξανοίγματος.",
      srv_cut_consultation: "Συμβουλευτική πριν από Κούρεμα",
      srv_cut_consultation_desc: "Μελέτη σχήματος προσώπου & τύπου μαλλιών.",
      srv_custom_plan: "Εξατομικευμένο Πλάνο Περιποίησης",
      srv_custom_plan_desc: "Ολοκληρωμένο πλάνο θεραπειών και φροντίδας.",
      book_btn: "Κράτηση",
      gallery_eyebrow: "Portfolio",
      gallery_title: "Φροντίδα που φαίνεται στην πράξη.",
      gallery_subtitle: "Εξερευνήστε. Εμπνευστείτε.",
      gallery_all: "Όλα",
      contact_eyebrow: "Επικοινωνία",
      contact_title: "Επικοινωνήστε Μαζί Μας",
      contact_subtitle: "Βρείτε όλες τις πληροφορίες του καταστήματός μας στο Γαλάτσι και κλείστε το ραντεβού σας τηλεφωνικά ή μέσω Instagram.",
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
      modal_title: "Κλείστε το Ραντεβού&nbsp;σας",
      modal_subtitle: "Για να διασφαλίσουμε την προσωπική φροντίδα κάθε πελάτη, οι κρατήσεις γίνονται αποκλειστικά μέσω τηλεφώνου ή μηνύματος στο Instagram.<br><br>Κλείσε τώρα το δωρεάν Συμβουλευτικό Ραντεβού σου και δώσε στα μαλλιά σου την προσοχή που τους αξίζουν.",
      modal_call: "210 2917238",
      modal_ig: "DM Instagram",
      footer_desc: "Το S&M είναι ένα σύγχρονο πολυτελές hair salon αφιερωμένο στο κούρεμα ακριβείας, τις εξειδικευμένες τεχνικές χρώματος, τις θεραπείες Malibu & K18 και την τοποθέτηση extensions.",
      footer_explore: "Εξερεύνηση",
      footer_info_title: "Πληροφορίες",
      footer_address_val: "Σκύρου 2, Γαλάτσι",
      contact_hours_val: `<div class="hours-card-container">
  <div class="hours-day-row" data-day="1">
    <span class="hours-day-name">Δευτέρα</span>
    <span class="closed-pill">Κλειστά</span>
  </div>
  <div class="hours-day-row" data-day="2">
    <span class="hours-day-name">Τρίτη</span>
    <div class="hours-time-group">
      <span class="time-pill">09:00 - 14:00</span>
      <span class="time-pill">17:00 - 20:30</span>
    </div>
  </div>
  <div class="hours-day-row" data-day="3">
    <span class="hours-day-name">Τετάρτη</span>
    <div class="hours-time-group">
      <span class="time-pill">09:00 - 15:30</span>
    </div>
  </div>
  <div class="hours-day-row" data-day="4">
    <span class="hours-day-name">Πέμπτη</span>
    <div class="hours-time-group">
      <span class="time-pill">09:00 - 14:00</span>
      <span class="time-pill">17:00 - 20:30</span>
    </div>
  </div>
  <div class="hours-day-row" data-day="5">
    <span class="hours-day-name">Παρασκευή</span>
    <div class="hours-time-group">
      <span class="time-pill">09:00 - 20:00</span>
    </div>
  </div>
  <div class="hours-day-row" data-day="6">
    <span class="hours-day-name">Σάββατο</span>
    <div class="hours-time-group">
      <span class="time-pill">09:00 - 17:00</span>
    </div>
  </div>
  <div class="hours-day-row" data-day="0">
    <span class="hours-day-name">Κυριακή</span>
    <span class="closed-pill">Κλειστά</span>
  </div>
</div>`,
      footer_hours_val: `<div class="hours-card-container footer-hours-compact">
  <div class="hours-day-row" data-day="1">
    <span class="hours-day-name">Δευτέρα</span>
    <span class="closed-pill">Κλειστά</span>
  </div>
  <div class="hours-day-row" data-day="2">
    <span class="hours-day-name">Τρίτη</span>
    <div class="hours-time-group">
      <span class="time-pill">09:00 - 14:00</span>
      <span class="time-pill">17:00 - 20:30</span>
    </div>
  </div>
  <div class="hours-day-row" data-day="3">
    <span class="hours-day-name">Τετάρτη</span>
    <div class="hours-time-group">
      <span class="time-pill">09:00 - 15:30</span>
    </div>
  </div>
  <div class="hours-day-row" data-day="4">
    <span class="hours-day-name">Πέμπτη</span>
    <div class="hours-time-group">
      <span class="time-pill">09:00 - 14:00</span>
      <span class="time-pill">17:00 - 20:30</span>
    </div>
  </div>
  <div class="hours-day-row" data-day="5">
    <span class="hours-day-name">Παρασκευή</span>
    <div class="hours-time-group">
      <span class="time-pill">09:00 - 20:00</span>
    </div>
  </div>
  <div class="hours-day-row" data-day="6">
    <span class="hours-day-name">Σάββατο</span>
    <div class="hours-time-group">
      <span class="time-pill">09:00 - 17:00</span>
    </div>
  </div>
  <div class="hours-day-row" data-day="0">
    <span class="hours-day-name">Κυριακή</span>
    <span class="closed-pill">Κλειστά</span>
  </div>
</div>`,
      footer_rights: "© 2026 S&M Hair Salon"
    },
    en: {
      nav_home: "Home",
      nav_services: "Services",
      nav_gallery: "Gallery",
      nav_contact: "Contact",
      nav_book: "Book Appointment",
      hero_welcome: "Welcome to S&M Hair Salon",
      hero_title: "Beautiful Color Starts with Healthy Hair.",
      hero_subtitle: "Hair coloring, balayage, and treatments that strengthen the hair fiber. For results that look beautiful long after your appointment.",
      hero_btn_explore: "Explore Services",
      hero_btn_book: "Book Appointment",
      philo_title: "Philosophy",
      philo_heading: "Enhancing the natural beauty of your hair.",
      philo_desc: "With expert artistry, specialized Malibu, K18 & Keratin treatments, and premium products, we bring your dream hair to life.",
      feat_title: "Hair Services",
      feat_heading: "Haircuts, Coloring, Balayage & Specialized Treatments.",
      feat_view_all: "View All Services",
      services_menu_title: "Service Menu",
      services_menu_heading: "Hair Salon Services",
      services_menu_subtitle: "Discover our specialized haircuts, hair coloring, balayage, Malibu, K18 & Keratin treatments, and extensions.",
      services_all: "All Services",
      services_cuts: "Cuts & Styling",
      services_color: "Coloring",
      services_balayage: "Balayage & Lightening",
      services_extensions: "Extensions",
      services_therapy: "Hair Treatments",
      services_care: "Scalp & Care",
      services_bridal: "Bridal & Events",
      services_men: "Men's",
      services_kids: "Kids",
      services_products: "Products",
      services_consultation: "Consultation",
      cat_cuts_title: "Cuts & Styling",
      cat_color_title: "Coloring",
      cat_balayage_title: "Balayage & Lightening",
      cat_extensions_title: "Extensions",
      cat_therapy_title: "Hair Treatments",
      cat_care_title: "Scalp & Hair Care",
      cat_bridal_title: "Bridal & Special Occasions",
      cat_men_title: "Men's Grooming",
      cat_kids_title: "Kids Hair Care",
      cat_products_title: "Products & Advice",
      cat_consultation_title: "Consultation",

      /* Cuts */
      srv_women_cut: "Women's Haircut",
      srv_women_cut_desc: "Bespoke precision haircut tailored to your features and personal style.",
      srv_kids_cut_cuts: "Kids' Haircut",
      srv_kids_cut_cuts_desc: "Gentle and stylish haircut for kids.",
      srv_men_cut_cuts: "Men's Haircut",
      srv_men_cut_cuts_desc: "Modern precision haircut for men.",
      srv_styling: "Hair Styling",
      srv_styling_desc: "Professional styling for stunning, long-lasting looks.",
      srv_straightening: "Hair Straightening",
      srv_straightening_desc: "Sleek blow-dry straightening for silky shine.",
      srv_curls: "Curls & Waves",
      srv_curls_desc: "Styling with soft curls or natural beachy waves.",
      srv_event_styling: "Special Event Styling",
      srv_event_styling_desc: "Elegant styling for special events and gala occasions.",
      srv_bridal_styling: "Evening & Bridal Styling",
      srv_bridal_styling_desc: "Luxury evening or bridal hair design.",
      srv_bridal_trial: "Bridal Hair Trial",
      srv_bridal_trial_desc: "Personal trial session to perfect your wedding day look.",

      /* Color */
      srv_root_color: "Root Touch-Up",
      srv_root_color_desc: "Root tint touch-up for flawless full coverage.",
      srv_full_color: "Full Length Color",
      srv_full_color_desc: "All-over permanent color from root to tip for rich vibrancy.",
      srv_refle: "Color Gloss / Refle",
      srv_refle_desc: "Tone refresher neutralizing brassiness and adding shine.",
      srv_toner_gloss: "Toner & Gloss",
      srv_toner_gloss_desc: "Custom color toner and gloss treatment for maximum radiance.",
      srv_color_correction: "Color Correction",
      srv_color_correction_desc: "Specialized corrective color transformation.",
      srv_bleach_full: "Full Bleach & Lightening",
      srv_bleach_full_desc: "Full head bleaching with scalp protection.",
      srv_bleach_root: "Root Bleach",
      srv_bleach_root_desc: "Targeted root bleaching preserving hair health.",
      srv_color_removal: "Color Removal",
      srv_color_removal_desc: "Safe removal of artificial pigments for shade changes.",

      /* Balayage */
      srv_balayage: "Signature Balayage",
      srv_balayage_desc: "Hand-painted custom balayage for natural seamless transitions.",
      srv_babylights: "Babylights",
      srv_babylights_desc: "Ultra-fine weave highlights for delicate sun-lit brightness.",
      srv_highlights: "Classic Highlights",
      srv_highlights_desc: "Foil highlights adding contrast, depth, and luminosity.",
      srv_lowlights: "Lowlights",
      srv_lowlights_desc: "Darker tones woven through blonde hair for natural depth.",
      srv_face_framing: "Face Framing",
      srv_face_framing_desc: "Brightening highlights framing the face features.",
      srv_money_piece: "Money Piece",
      srv_money_piece_desc: "Bold face-framing pop of highlight for a modern edge.",
      srv_antavgeies: "Foil Highlights",
      srv_antavgeies_desc: "Custom foil technique tailored to your preferred tone.",
      srv_combo_lightening: "Combined Lightening Techniques",
      srv_combo_lightening_desc: "Bespoke blend of Balayage, Babylights, and foils.",
      srv_balayage_correction: "Balayage & Highlight Correction",
      srv_balayage_correction_desc: "Professional color blend correction for seamless finish.",

      /* Extensions */
      srv_tape_extensions: "Tape-in Extensions",
      srv_tape_extensions_desc: "Premium tape-in hair extensions for instant length and volume.",
      srv_invisible_tapes: "Invisible Tape Extensions",
      srv_invisible_tapes_desc: "Ultra-discreet invisible tape-in extensions.",
      srv_ext_length: "Extensions for Length",
      srv_ext_length_desc: "High grade extension application tailored for length.",
      srv_ext_volume: "Extensions for Volume",
      srv_ext_volume_desc: "Targeted extension placement for natural thickness.",
      srv_ext_placement: "Extension Installation",
      srv_ext_placement_desc: "Expert professional hair extension installation.",
      srv_ext_removal: "Extension Removal",
      srv_ext_removal_desc: "Safe damage-free extension removal service.",
      srv_ext_refitting: "Extension Refitting & Maintenance",
      srv_ext_refitting_desc: "Extension re-taping, maintenance, and refitting.",
      srv_ext_consultation: "Extensions & Color Consultation",
      srv_ext_consultation_desc: "Personalized consultation matching color texture & method.",

      /* Therapy */
      srv_k18: "K18 Molecular Repair",
      srv_k18_desc: "Revolutionary K18 peptide therapy repairing hair in 4 minutes.",
      srv_olaplex: "Olaplex Bond Building",
      srv_olaplex_desc: "Globally acclaimed bond-building treatment protecting hair structure.",
      srv_malibu_cocktail: "Malibu C Cocktail",
      srv_malibu_cocktail_desc: "Custom Malibu C blend removing buildup and restoring shine.",
      srv_malibu_crystal: "Malibu C Crystal Gel",
      srv_malibu_crystal_desc: "Wellness gel removing mineral buildup, copper & chlorine.",
      srv_malibu_cpr: "Malibu C CPR",
      srv_malibu_cpr_desc: "Safely removes metallic pigments and unwanted dye buildup.",
      srv_hair_detox: "Hair Detox Therapy",
      srv_hair_detox_desc: "Purifying detox treatment eliminating styling residue.",
      srv_keratin: "Keratin Smoothing Treatment",
      srv_keratin_desc: "Professional smoothing Keratin treatment eliminating frizz.",
      srv_hydration: "Deep Hydration",
      srv_hydration_desc: "Intensive moisture therapy restoring elasticity and sheen.",
      srv_reconstruction: "Hair Reconstruction",
      srv_reconstruction_desc: "Protein reconstruction treatment strengthening brittle strands.",
      srv_damaged_therapy: "Damaged Hair Recovery",
      srv_damaged_therapy_desc: "Targeted recovery protocol for over-processed hair.",
      srv_split_ends: "Split End Repair",
      srv_split_ends_desc: "Sealing treatment fortifying hair ends against breakage.",
      srv_custom_therapy: "Custom Tailored Hair Therapy",
      srv_custom_therapy_desc: "Bespoke formula crafted specifically for your hair needs.",

      /* Care */
      srv_wash: "Shampoo & Massage Wash",
      srv_wash_desc: "Relaxing shampoo wash with scalp massage.",
      srv_conditioner_mask: "Conditioner & Mask Treatment",
      srv_conditioner_mask_desc: "Nourishing conditioning mask for silky softness.",
      srv_scalp_care: "Specialized Scalp Care",
      srv_scalp_care_desc: "Targeted scalp wellness treatment for dryness or excess oil.",
      srv_scalp_treatment: "Scalp Renewal Treatment",
      srv_scalp_treatment_desc: "Revitalizing scalp therapy encouraging healthy follicle growth.",
      srv_scalp_detox: "Scalp Exfoliating Detox",
      srv_scalp_detox_desc: "Exfoliating detox cleansing the scalp of buildup.",
      srv_rejuvenation: "Hair Rejuvenation",
      srv_rejuvenation_desc: "Invigorating treatment bringing energy back to dull hair.",
      srv_strengthening: "Hair Strengthening Therapy",
      srv_strengthening_desc: "Fortifying root and strand therapy reducing breakage.",

      /* Bridal */
      srv_bridal_main: "Bridal Hairstyling",
      srv_bridal_main_desc: "Luxury custom bridal styling designed for your wedding aesthetic.",
      srv_bridal_styling_opt: "Bridal Hair Design",
      srv_bridal_styling_opt_desc: "Complete wedding day hair preparation and design.",
      srv_bridal_trial_opt: "Bridal Hair Preview & Trial",
      srv_bridal_trial_opt_desc: "Consultation and trial session perfecting your bridal look.",
      srv_wedding_guest: "Wedding Guest Styling",
      srv_wedding_guest_desc: "Sophisticated hair design for bridesmaids, mothers & wedding guests.",
      srv_baptism_styling: "Baptism & Christening Styling",
      srv_baptism_styling_desc: "Chic styling for godmothers and family at christenings.",
      srv_events_styling: "Gala & Event Styling",
      srv_events_styling_desc: "Polished hair design for galas, red carpets, and formal dinners.",
      srv_party_styling: "Party & Celebration Styling",
      srv_party_styling_desc: "Trendy stylish looks for birthday bashes, parties, and celebrations.",

      /* Men */
      srv_men_cut: "Men's Precision Haircut",
      srv_men_cut_desc: "Classic or contemporary precision cut tailored for men.",
      srv_clippers_cut: "Clipper Buzz & Fade Cut",
      srv_clippers_cut_desc: "Clean clipper haircut with custom fade or buzz finish.",
      srv_razor_cut: "Razor Cut & Finish",
      srv_razor_cut_desc: "Traditional razor cut and precise hairline detailing.",
      srv_beard_trim: "Beard Grooming & Shaping",
      srv_beard_trim_desc: "Beard trimming, line shaping, and conditioning care.",
      srv_men_styling: "Men's Styling & Finish",
      srv_men_styling_desc: "Professional styling using premium matte or pomade products.",

      /* Kids */
      srv_kids_styling: "Kids' Styling",
      srv_kids_styling_desc: "Cute, lightweight hair styling for children.",
      srv_girls_cut: "Girls' Haircut",
      srv_girls_cut_desc: "Stylish haircut and shaping for young girls.",
      srv_boys_cut: "Boys' Haircut",
      srv_boys_cut_desc: "Smart and trendy haircut crafted for young boys.",

      /* Products */
      srv_product_advice: "Home Product Consultation",
      srv_product_advice_desc: "Professional guidance selecting home hair care products.",
      srv_custom_care_routine: "Custom Care Routine",
      srv_custom_care_routine_desc: "Personalized hair regimen tailored to your hair type.",
      srv_color_products: "Color-Protecting Products Advice",
      srv_color_products_desc: "Curated recommendations for preserving color vibrancy.",
      srv_extensions_products: "Extension Care Product Advice",
      srv_extensions_products_desc: "Nourishing shampoo & mask products for extension longevity.",
      srv_pro_products: "Professional Salon Care Range",
      srv_pro_products_desc: "Access to top salon-grade treatments and styling lines.",

      /* Consultation */
      srv_free_consultation: "Complimentary Hair Consultation",
      srv_free_consultation_desc: "Free face-to-face consultation prior to hair services.",
      srv_hair_diagnosis: "Professional Hair Diagnosis",
      srv_hair_diagnosis_desc: "Detailed diagnostic assessment of strand health and porosity.",
      srv_hair_analysis: "Hair Strand & Scalp Analysis",
      srv_hair_analysis_desc: "In-depth moisture and protein balance analysis.",
      srv_color_proposal: "Personalized Color Matching",
      srv_color_proposal_desc: "Custom hair color recommendations tailored to skin tone.",
      srv_balayage_proposal: "Balayage Technique Recommendation",
      srv_balayage_proposal_desc: "Expert advice on selecting the right lightening technique.",
      srv_cut_consultation: "Pre-Cut Style Consultation",
      srv_cut_consultation_desc: "Facial shape and hair structure analysis for your cut.",
      srv_custom_plan: "Custom Long-Term Hair Plan",
      srv_custom_plan_desc: "Long-term hair journey plan for maximum hair health.",
      book_btn: "Book Now",
      gallery_eyebrow: "Portfolio",
      gallery_title: "Care that shows in practice.",
      gallery_subtitle: "Explore. Get Inspired.",
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
      modal_subtitle: "To ensure personal care for every client, bookings are taken exclusively by Phone or Instagram DM.<br><br>Book your free Consultation Appointment now and give your hair the care it deserves.",
      modal_call: "210 2917238",
      modal_ig: "DM Instagram",
      footer_desc: "S&M is a luxury hair salon dedicated to precision cutting, custom color art, Malibu & K18 treatments, and extensions.",
      footer_explore: "Explore",
      footer_info_title: "Information",
      footer_address_val: "Skyrou 2, Galatsi",
      contact_hours_val: `<div class="hours-card-container">
  <div class="hours-day-row" data-day="1">
    <span class="hours-day-name">Monday</span>
    <span class="closed-pill">Closed</span>
  </div>
  <div class="hours-day-row" data-day="2">
    <span class="hours-day-name">Tuesday</span>
    <div class="hours-time-group">
      <span class="time-pill">9:00 AM – 2:00 PM</span>
      <span class="time-pill">5:00 PM – 8:30 PM</span>
    </div>
  </div>
  <div class="hours-day-row" data-day="3">
    <span class="hours-day-name">Wednesday</span>
    <div class="hours-time-group">
      <span class="time-pill">9:00 AM – 3:30 PM</span>
    </div>
  </div>
  <div class="hours-day-row" data-day="4">
    <span class="hours-day-name">Thursday</span>
    <div class="hours-time-group">
      <span class="time-pill">9:00 AM – 2:00 PM</span>
      <span class="time-pill">5:00 PM – 8:30 PM</span>
    </div>
  </div>
  <div class="hours-day-row" data-day="5">
    <span class="hours-day-name">Friday</span>
    <div class="hours-time-group">
      <span class="time-pill">9:00 AM – 8:00 PM</span>
    </div>
  </div>
  <div class="hours-day-row" data-day="6">
    <span class="hours-day-name">Saturday</span>
    <div class="hours-time-group">
      <span class="time-pill">9:00 AM – 5:00 PM</span>
    </div>
  </div>
  <div class="hours-day-row" data-day="0">
    <span class="hours-day-name">Sunday</span>
    <span class="closed-pill">Closed</span>
  </div>
</div>`,
      footer_hours_val: `<div class="hours-card-container footer-hours-compact">
  <div class="hours-day-row" data-day="1">
    <span class="hours-day-name">Monday</span>
    <span class="closed-pill">Closed</span>
  </div>
  <div class="hours-day-row" data-day="2">
    <span class="hours-day-name">Tuesday</span>
    <div class="hours-time-group">
      <span class="time-pill">9:00 AM – 2:00 PM</span>
      <span class="time-pill">5:00 PM – 8:30 PM</span>
    </div>
  </div>
  <div class="hours-day-row" data-day="3">
    <span class="hours-day-name">Wednesday</span>
    <div class="hours-time-group">
      <span class="time-pill">9:00 AM – 3:30 PM</span>
    </div>
  </div>
  <div class="hours-day-row" data-day="4">
    <span class="hours-day-name">Thursday</span>
    <div class="hours-time-group">
      <span class="time-pill">9:00 AM – 2:00 PM</span>
      <span class="time-pill">5:00 PM – 8:30 PM</span>
    </div>
  </div>
  <div class="hours-day-row" data-day="5">
    <span class="hours-day-name">Friday</span>
    <div class="hours-time-group">
      <span class="time-pill">9:00 AM – 8:00 PM</span>
    </div>
  </div>
  <div class="hours-day-row" data-day="6">
    <span class="hours-day-name">Saturday</span>
    <div class="hours-time-group">
      <span class="time-pill">9:00 AM – 5:00 PM</span>
    </div>
  </div>
  <div class="hours-day-row" data-day="0">
    <span class="hours-day-name">Sunday</span>
    <span class="closed-pill">Closed</span>
  </div>
</div>`,
      footer_rights: "© 2026 S&M Hair Salon"
    }
  };

  const setLanguage = (lang) => {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });

    langBtns.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    updateSalonStatus();
  };

  const updateSalonStatus = () => {
    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const timeInMinutes = hours * 60 + minutes;

    document.querySelectorAll('.hours-day-row').forEach(row => {
      if (parseInt(row.getAttribute('data-day')) === day) {
        row.classList.add('is-today');
      } else {
        row.classList.remove('is-today');
      }
      const existingTag = row.querySelector('.today-tag');
      if (existingTag) {
        existingTag.remove();
      }
    });

    let isOpen = false;
    if (day === 2 || day === 4) {
      isOpen = (timeInMinutes >= 9 * 60 && timeInMinutes < 14 * 60) ||
               (timeInMinutes >= 17 * 60 && timeInMinutes < 20 * 60 + 30);
    } else if (day === 3) {
      isOpen = (timeInMinutes >= 9 * 60 && timeInMinutes < 15 * 60 + 30);
    } else if (day === 5) {
      isOpen = (timeInMinutes >= 9 * 60 && timeInMinutes < 20 * 60);
    } else if (day === 6) {
      isOpen = (timeInMinutes >= 9 * 60 && timeInMinutes < 17 * 60);
    }

    const badgeEl = document.getElementById('salon-status-badge');
    const textEl = document.getElementById('salon-status-text');
    if (badgeEl && textEl) {
      const currentLang = document.querySelector('.lang-btn.active')?.getAttribute('data-lang') || 'el';
      if (isOpen) {
        badgeEl.className = 'status-badge open';
        textEl.textContent = currentLang === 'en' ? 'Open Now' : 'Ανοιχτά Τώρα';
      } else {
        badgeEl.className = 'status-badge closed';
        textEl.textContent = currentLang === 'en' ? 'Closed Now' : 'Κλειστά Τώρα';
      }
    }
  };

  updateSalonStatus();

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.getAttribute('data-lang');
      setLanguage(selectedLang);
    });
  });

});
