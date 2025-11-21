document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const sidebarMenu = document.getElementById('sidebar-menu');
    
    // वह तत्व जो इमेज और टेक्स्ट दोनों को होल्ड करेगा
    const slideTextContainer = document.querySelector('.slide-text'); 
    const sliderDotsContainer = document.getElementById('slider-dots');
    
    // यदि कोई ज़रूरी तत्व नहीं मिला, तो JavaScript को रोक दें
    if (!slideTextContainer || !sliderDotsContainer) {
        console.error("Required elements for slider or sidebar not found!");
        return;
    }

    // --- 1. Sidebar Menu Functionality ---
    
    // Open Sidebar
    menuToggle.addEventListener('click', () => {
        sidebarMenu.classList.add('open');
    });

    // Close Sidebar
    closeMenu.addEventListener('click', () => {
        sidebarMenu.classList.remove('open');
    });

    // --- 2. Hero Slider Data (इमेज पाथ और टेक्स्ट) ---
    
    // महत्वपूर्ण: यहाँ 'imagePath' को अपनी वास्तविक फ़ाइल लोकेशन से बदलें
    const slidesData = [
        { 
            title: "Discover Your Journey", 
            text: "Dynamic, comfortable and easily accessible travel solutions.", 
            imagePath: 'cab.jpeg' // Cab Economy/General 
        },
        { 
            title: "Bike Rides for Quick Trips", 
            text: "Beat the traffic with Raahi Bike in a snap.", 
            imagePath: 'bike.jpeg' // Bike 
        },
        { 
            title: "Parcel Delivery Made Easy", 
            text: "Send and receive packages instantly with Raahi Parcel.", 
            imagePath: 'parcel.jpeg' // Parcel
        },
        { 
            title: "Affordable Auto Rides", 
            text: "Local travel at the best prices, hail an Auto now.", 
            imagePath: 'auto.jpeg' // Auto
        },
        { 
            title: "Group & Event Bookings", 
            text: "Book for Marriages, Parties, and functions easily.", 
            imagePath: 'group.jpeg' // Group Booking
        }
    ];

    let currentSlide = 0;
    const slideDuration = 5000; // 5 seconds

    // --- 3. Dynamically Create Dots ---
    
    sliderDotsContainer.innerHTML = ''; // HTML में मौजूद पुराने डॉट्स हटा दें

    slidesData.forEach((slide, index) => {
        const dotSpan = document.createElement('span');
        dotSpan.className = `dot ${index === 0 ? 'active' : ''}`;
        dotSpan.dataset.slide = index;
        dotSpan.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
            resetInterval(); // मैन्युअल क्लिक पर टाइमर रीसेट करें
        });
        sliderDotsContainer.appendChild(dotSpan);
    });

    const dots = sliderDotsContainer.children;
    
    // --- 4. Slider Logic Functions ---

    function updateSlider() {
        const currentData = slidesData[currentSlide];

        // 1. Overlay टेक्स्ट को अपडेट करें
        if (slideTextContainer) {
            slideTextContainer.querySelector('h1').textContent = currentData.title;
            slideTextContainer.querySelector('p').textContent = currentData.text;
            
            // 2. slide-text के बैकग्राउंड इमेज को अपडेट करें
            // इसमें डार्क ओवरले और इमेज पाथ दोनों शामिल हैं
            slideTextContainer.style.backgroundImage = `
                linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 100%), 
                url('${currentData.imagePath}')
            `;
        }

        // 3. Active डॉट को अपडेट करें
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove('active');
        }
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
    }

    function showNextSlide() {
        // अगली स्लाइड पर जाएँ और अंत में लूप करें
        currentSlide = (currentSlide + 1) % slidesData.length;
        updateSlider();
    }

    // --- 5. Automatic Slide Interval Control ---

    let slideInterval = setInterval(showNextSlide, slideDuration);
    
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(showNextSlide, slideDuration);
    }
    
    // पेज लोड होने पर स्लाइडर को इनिशियलाइज़ करें
    updateSlider();

});