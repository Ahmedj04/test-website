document.addEventListener('DOMContentLoaded', () => {
  // Select the features list container and the image element
  const featuresList = document.querySelector('.features-list');
  const imageElement = document.getElementById('feature-image');
  // const featuresContainer = document.querySelector('.features-container');

  // Create an IntersectionObserver to observe each feature item within the list
  const featureItemObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const newImage = entry.target.getAttribute('data-image');
        // Change the image source only if it has changed
        if (imageElement.src.includes(newImage) === false) {
          imageElement.src = newImage;
        }
      }
    });
  }, {
    threshold: 0.5 // Change when the item is at least 50% visible in the viewport
  });

  // Observe each feature item
  document.querySelectorAll('.feature-item').forEach(item => {
    featureItemObserver.observe(item);
  });
});

// function isSectionFullyVisible(element) {
//     const rect = element.getBoundingClientRect();
//     console.log(rect); // Debugging: check the properties of the rect object
//     return rect.top >= 0 && rect.bottom <= window.innerHeight && rect.left >= 0 && rect.right <= window.innerWidth;
// }

// function isSectionFullyVisible(element) {
//     const rect = element.getBoundingClientRect();
//     const elementHeight = rect.height;
//     const viewportHeight = window.innerHeight;
//     // const viewportWidth = window.innerWidth;

//     // Calculate the percentage of the element that is within the viewport
//     const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
//     // const visibleWidth = Math.min(rect.right, viewportWidth) - Math.max(rect.left, 0);

//     // Check if at least 80% of the element's height is within the viewport
//     const isHeightVisible = (visibleHeight / elementHeight) >= 0.9;
//     // const isWidthVisible = (visibleWidth / rect.width) >= 0.9; // Optional: check if at least 80% of the width is visible

//     // console.log(`Element height visibility: ${isHeightVisible}`);
//     // console.log(`Element width visibility: ${isWidthVisible}`);

//     return isHeightVisible 
// }

// window.addEventListener('scroll', () => {
//     if (isSectionFullyVisible(featuresContainer)) {
//         console.log('The section is fully visible');
//         featuresList.style.overflowY = 'auto';
//         featuresList.style.backgroundColor = 'red';

//     } else {
//         console.log('The section is not fully visible');
//         featuresList.style.overflowY = 'hidden';
//         featuresList.style.backgroundColor = 'blue';


//     }
// });

// =====================================
// Carousel 
// ==============================
// const track = document.querySelector('.carousel-track');
// const items = Array.from(document.querySelectorAll('.carousel-item'));
// const indicatorsContainer = document.querySelector('.carousel-indicators');
// const firstClone = items[0].cloneNode(true);
// const lastClone = items[items.length - 1].cloneNode(true);

// // Clone first and last items
// track.appendChild(firstClone);
// track.insertBefore(lastClone, items[0]);

// const allItems = Array.from(document.querySelectorAll('.carousel-item'));
// const itemWidth = 100;
// let currentIndex = 1;

// // Initialize carousel position
// track.style.transform = `translateX(-${currentIndex * itemWidth}%)`;

// // Create dots dynamically
// function generateDots() {
//     indicatorsContainer.innerHTML = ''; // Clear any existing dots (for reuse)

//     items.forEach((_, i) => {
//       const dot = document.createElement('button');
//       dot.classList.add('indicator');
//       if (i === 0) dot.classList.add('active'); // First dot is active
//       indicatorsContainer.appendChild(dot);

//       // Add click event to navigate to the corresponding slide
//       dot.addEventListener('click', () => {
//         currentIndex = i + 1; // Adjust index since clones exist
//         updateCarousel();
//         updateDots();
//       });
//     });
//   }
// generateDots();  
// const dots = Array.from(document.querySelectorAll('.indicator'));

// // Update the carousel to show the current slide
// function updateCarousel() {
//   track.style.transition = 'transform 0.9s ease-in-out';
//   track.style.transform = `translateX(-${currentIndex * itemWidth}%)`;

//   // Handle seamless looping
//   setTimeout(() => {
//     if (currentIndex === allItems.length - 1) {
//       track.style.transition = 'none';
//       currentIndex = 1; // Reset to the first real slide
//       track.style.transform = `translateX(-${currentIndex * itemWidth}%)`;
//       updateDots(); // Ensure the first dot is active
//     }
//     if (currentIndex === 0) {
//       track.style.transition = 'none';
//       currentIndex = allItems.length - 2; // Reset to the last real slide
//       track.style.transform = `translateX(-${currentIndex * itemWidth}%)`;
//       updateDots(); // Ensure the last dot is active
//     }
//   }, 900); // Ensure this happens after the transition
// }

// // Update active dot
// function updateDots() {
//   dots.forEach((dot, idx) => {
//     // `currentIndex - 1` adjusts for the clone slides
//     const realIndex = currentIndex - 1; // Ignore the first clone
//     const dotIndex = idx;

//     dot.classList.toggle('active', dotIndex === realIndex);
//   });
// }

// // Auto-play functionality
// let autoPlay = setInterval(() => {
//   currentIndex++;
//   updateCarousel();
//   updateDots();
// }, 4000);

// // Pause auto-play on hover
// track.addEventListener('mouseenter', () => clearInterval(autoPlay));
// track.addEventListener('mouseleave', () => {
//   autoPlay = setInterval(() => {
//     currentIndex++;
//     updateCarousel();
//     updateDots();
//   }, 4000);
// });

// // Handle transition reset for looping
// setTimeout(() => {
//   if (currentIndex === 0) {
//     track.style.transition = 'none';
//     currentIndex = allItems.length - 2;
//     track.style.transform = `translateX(-${currentIndex * itemWidth}%)`;
//     updateDots();
//   }
// }, 900);

// ========================
// Draggable Carousel
// ======================
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  const items = Array.from(document.querySelectorAll('.carousel-item'));
  const indicatorsContainer = document.querySelector('.carousel-indicators');
  const firstClone = items[0].cloneNode(true);
  const lastClone = items[items.length - 1].cloneNode(true);

  // Clone first and last items
  track.appendChild(firstClone);
  track.insertBefore(lastClone, items[0]);

  const allItems = Array.from(document.querySelectorAll('.carousel-item'));
  const itemWidth = 100;
  let currentIndex = 1;
  let isDragging = false;
  let startPosition = 0;
  let currentTranslate = 0;
  let previousTranslate = 0;
  let animationID;

  // Initialize carousel position
  track.style.transform = `translateX(-${currentIndex * itemWidth}%)`;

  // Create dots dynamically
  function generateDots() {
    indicatorsContainer.innerHTML = ''; // Clear any existing dots (for reuse)

    items.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('indicator');
      if (i === 0) dot.classList.add('active'); // First dot is active
      indicatorsContainer.appendChild(dot);

      // Add click event to navigate to the corresponding slide
      dot.addEventListener('click', () => {
        currentIndex = i + 1; // Adjust index since clones exist
        updateCarousel();
        updateDots();
      });
    });
  }
  generateDots();
  const dots = Array.from(document.querySelectorAll('.indicator'));

  // Update the carousel to show the current slide
  function updateCarousel() {
    // If the current index goes below 0 (user moves left past the first slide),
    // reset it to the second last item (excluding the duplicate last slide).
    if (currentIndex < 0) currentIndex = allItems.length - 2;

    // If the current index exceeds the total number of items (user moves right past the last slide),
    // reset it to 1 (skipping the duplicate first slide for seamless looping).
    if (currentIndex >= allItems.length) currentIndex = 1;

    track.style.transition = 'transform 0.9s ease-in-out';
    track.style.transform = `translateX(-${currentIndex * itemWidth}%)`;

    // Handle seamless looping
    setTimeout(() => {
      if (currentIndex === allItems.length - 1) {
        track.style.transition = 'none';
        currentIndex = 1; // Reset to the first real slide
        track.style.transform = `translateX(-${currentIndex * itemWidth}%)`;
        updateDots(); // Ensure the first dot is active
      }
      if (currentIndex === 0) {
        track.style.transition = 'none';
        currentIndex = allItems.length - 2; // Reset to the last real slide
        track.style.transform = `translateX(-${currentIndex * itemWidth}%)`;
        updateDots(); // Ensure the last dot is active
      }
    }, 900); // Ensure this happens after the transition
  }

  // Update active dot
  function updateDots() {
    dots.forEach((dot, idx) => {
      const realIndex = currentIndex - 1; // Ignore the first clone
      const dotIndex = idx;

      dot.classList.toggle('active', dotIndex === realIndex);
    });
  }

  // Auto-play functionality
  let autoPlay = setInterval(() => {
    currentIndex++;
    updateCarousel();
    updateDots();
  }, 3500);

  // Pause auto-play on hover
  track.addEventListener('mouseenter', () => clearInterval(autoPlay));
  track.addEventListener('mouseleave', () => {
    autoPlay = setInterval(() => {
      currentIndex++;
      updateCarousel();
      updateDots();
    }, 3500);
  });

  // Drag functionality
  track.addEventListener('mousedown', (e) => {
    startDragging(e);
  });
  track.addEventListener('mousemove', (e) => {
    if (isDragging) dragging(e);
  });
  track.addEventListener('mouseup', endDragging);
  track.addEventListener('mouseleave', endDragging);
  track.addEventListener('touchstart', (e) => startDragging(e.touches[0]));
  track.addEventListener('touchmove', (e) => dragging(e.touches[0]));
  track.addEventListener('touchend', endDragging);

  function startDragging(e) {
    isDragging = true;
    startPosition = e.clientX;
    previousTranslate = -currentIndex * itemWidth;
    cancelAnimationFrame(animationID);
    track.style.transition = 'none';
  }

  function dragging(e) {
    if (!isDragging) return;
    const currentPosition = e.clientX;
    currentTranslate = previousTranslate + (currentPosition - startPosition) / window.innerWidth * 100;
    track.style.transform = `translateX(${currentTranslate}%)`;
  }

  function endDragging() {
    if (!isDragging) return;
    isDragging = false;

    const movedBy = (currentTranslate + currentIndex * itemWidth);
    if (movedBy < -25) {
      currentIndex++;
    } else if (movedBy > 25) {
      currentIndex--;
    }

    updateCarousel();
    updateDots();
  }
});

// =====================================
// Counter Animation
// =====================================
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter');
  const speed = 80; // Adjust this value to control the speed of the count-up animation

  const countUp = (counter) => {
    const target = +counter.getAttribute('data-target'); //The + operator in front of counter.getAttribute('data-target') is a unary plus operator. It attempts to convert the value into a number.
    const updateCount = () => {
      const current = +counter.innerText;
      const increment = Math.ceil(target / speed);

      if (current < target) {
        counter.innerText = current + increment;
        setTimeout(updateCount, 10); // Adjust for smoother animation
      } else {
        counter.innerText = target; // Ensure it ends exactly at the target
      }
    };
    updateCount();
  };

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          countUp(counter);
          observer.unobserve(counter); // Ensure animation runs only once
        }
      });
    },
    { threshold: 0.5 } // Trigger when 50% of the element is visible
  );

  counters.forEach((counter) => counterObserver.observe(counter));
});

// ===========================
// Function to Show Use Case
// ===========================
function showUseCase(useCase) {
  // Remove active class from all buttons
  document.querySelectorAll('.use-case-container .tab-button').forEach(btn => btn.classList.remove('active'));

  // Add active class to clicked button
  event.currentTarget.classList.add('active');

  // Hide all use-case details
  document.querySelectorAll('.use-case-detail').forEach(detail => detail.classList.remove('active'));

  // Show the selected use case
  document.getElementById(useCase).classList.add('active');
}

// ===========================
// Function to Show deployment Options
// ===========================
function showDeploymentOption(deployment) {
  // Remove active class from all buttons
  document.querySelectorAll('.deployment-options-container .tab-button').forEach(btn => btn.classList.remove('active'));

  // Add active class to clicked button
  event.currentTarget.classList.add('active');

  // Hide all use-case details
  document.querySelectorAll('.deployment-detail').forEach(detail => detail.classList.remove('active'));

  // Show the selected use case
  document.getElementById(deployment).classList.add('active');
}


// =======================
//  Open One FAQ at a time
// =======================
document.addEventListener("DOMContentLoaded", function () {
  const details = document.querySelectorAll(".faq-list details");

  details.forEach((targetDetail) => {
      targetDetail.addEventListener("click", () => {
          details.forEach((detail) => {
              if (detail !== targetDetail) {
                  detail.removeAttribute("open");
              }
          });
      });
  });
});


// ==============================================================
//  logic for Document Type Section tabs and content in home page
// ===============================================================
document.addEventListener('DOMContentLoaded', () => {
    const documentData = {
        'finance': [
            { title: 'Invoice' },
            { title: 'Purchase Order' },
            { title: 'Bank Statement' },
            { title: 'Receipt' },
            { title: 'PaySlip' },
            { title: 'DEWA Bill' }
        ],
        'operations': [
            { title: 'Rate Confirmation' },
            { title: 'Bill of Lading' },
            { title: 'Proof Of Delivery' },
            { title: 'Form' }
        ],
        'legal': [
            { title: 'Contract' },
            { title: 'Employment Contract' },
            { title: 'Rental Agreement' },
            { title: 'Home Insurance' },
            { title: 'Motor Insurance' },
            { title: 'Insurance Claim' },
            { title: 'Trade License' },
            { title: 'Residency Visa' },
            { title: 'Vehicle Registration Card' }
        ],
        'hr': [
            { title: 'Resume' },
            { title: 'Passport' },
            { title: 'National ID Card' },
            { title: 'Emirates ID' },
            { title: 'Resident ID' },
            { title: 'Driver\'s License USA' },
            { title: 'Driver\'s License UK' },
            { title: 'Driver\'s License UAE' },
        ],
        'medical': [
            { title: 'Medical Prescription' },
            { title: 'Medical Reports' }
        ]
    };

    const countryData = {
        'usa': [
            { title: 'Invoice' },
            { title: 'Bank Statement' },
            { title: 'Driver\'s License US' },
            { title: 'Passport' }
        ],
        'uk': [
            { title: 'Invoice' },
            { title: 'Driver\'s License UK' },
            { title: 'Passport' }
        ],
        'uae': [
            { title: 'Invoice' },
            { title: 'Emirates ID' },
            { title: 'Drivers Licence UAE' },
            { title: 'Residency Visa' },
            { title: 'DEWA Bill' },
            { title: 'Trade License' }
        ],
        'ksa': [
            { title: 'Invoice' },
            { title: 'Driving License KSA' },
            { title: 'Resident ID' },
            { title: 'Vehicle Registration Card' },
            { title: 'National ID Card' },
        ],
    };

    let lastHighlightedItemId = null; // Used for mobile toggle state
    let activeDesktopItemId = null; // Used for desktop persistent highlighting
    const desktopBreakpoint = 1023;
    const documentTilesDisplay = document.querySelector('#document-type-section .document-tiles-display');
    const originalBusinessParent = document.querySelector('#document-type-section #tab-content-business .dual-grid-section');
    const originalCountryParent = document.querySelector('#document-type-section #tab-content-country .dual-grid-section');
    const businessGrid = document.getElementById('document-tiles-grid-business');
    const countryGrid = document.getElementById('document-tiles-grid-country');

    // Helper to check if we are in the mobile view
    const isMobileView = () => window.innerWidth <= desktopBreakpoint;

    const clearHighlighting = () => {
        document.querySelectorAll('#document-type-section .function-item').forEach(item => {
            item.classList.remove('highlighted');
        });
    };

    // Function to render tiles for the Business tab
    const renderBusinessTiles = (category) => {
        businessGrid.innerHTML = '';
        const docs = documentData[category];
        if (docs) {
            docs.forEach(doc => {
                const tile = document.createElement('div');
                tile.className = 'document-tile';
                tile.textContent = doc.title;
                businessGrid.appendChild(tile);
            });
        }
        businessGrid.style.display = 'grid';
        countryGrid.style.display = 'none';
    };

    // Function to render tiles for the Country tab
    const renderCountryTiles = (country) => {
        countryGrid.innerHTML = '';
        const docs = countryData[country];
        if (docs) {
            docs.forEach(doc => {
                const tile = document.createElement('div');
                tile.className = 'document-tile';
                tile.textContent = doc.title;
                countryGrid.appendChild(tile);
            });
        }
        countryGrid.style.display = 'grid';
        businessGrid.style.display = 'none';
    };

    /**
     * Resets the document tiles display back to its default location/visibility.
     * This is crucial for transitions between mobile/desktop and when a mobile panel is closed.
     */
    const resetDisplayPosition = () => {
        const activeTab = document.querySelector('#document-type-section .tab-button.active').getAttribute('data-tab');
        const isBusinessTab = activeTab === 'business';
        const targetParent = isBusinessTab ? originalBusinessParent : originalCountryParent;
        const listContainer = targetParent.querySelector('.function-list-container');

        documentTilesDisplay.classList.remove('mobile-expanded');
        // Do NOT clear highlighting here. Highlighting is controlled by activeDesktopItemId logic.

        if (!isMobileView()) {
            // Desktop: Ensure the display is placed in the right column of the current dual-grid-section
            if (documentTilesDisplay.parentNode !== targetParent || documentTilesDisplay.previousElementSibling !== listContainer) {
                listContainer.after(documentTilesDisplay);
            }
        } else {
            // Mobile: Ensure the display is in its original (hidden) location at the end of the current dual-grid-section
            targetParent.appendChild(documentTilesDisplay);
            // Clear all highlighting when switching to mobile state logic
            clearHighlighting();
            lastHighlightedItemId = null; // Clear mobile active state
        }
    };

    /**
     * Initializes content for the active tab (called on tab switch and resize).
     * Ensures the first item is open by default on mobile, and permanently highlighted on desktop.
     */
    const initializeTabContent = (tabName) => {
        const itemSelector = tabName === 'business' ? '#business-function-list .function-item' : '#country-list .function-item';
        const items = document.querySelectorAll(itemSelector);

        if (items.length > 0) {
            const firstItem = items[0];
            const isBusinessTab = tabName === 'business';
            const categoryOrCountry = isBusinessTab ? firstItem.getAttribute('data-category') : firstItem.getAttribute('data-country');

            // 1. Reset position
            resetDisplayPosition();
            clearHighlighting(); // Ensure a clean slate

            // 2. Render initial content
            if (isBusinessTab) {
                renderBusinessTiles(categoryOrCountry);
            } else {
                renderCountryTiles(categoryOrCountry);
            }

            // 3. Set initial state based on view size
            if (isMobileView()) {
                // Mobile: Open the first item by default
                firstItem.classList.add('highlighted');
                firstItem.after(documentTilesDisplay);
                documentTilesDisplay.classList.add('mobile-expanded');
                lastHighlightedItemId = firstItem.id;
                activeDesktopItemId = null;
            } else {
                // Desktop: Ensure first item is permanently highlighted
                firstItem.classList.add('highlighted');
                activeDesktopItemId = firstItem.id; // Track the currently active desktop item
            }
        }
    };

    /**
     * Handles interaction (click on mobile, mouseenter on desktop).
     */
    const handleItemInteraction = (item, isBusinessTab, eventType) => {  // eventType: 'click' or 'mouseenter'
      const categoryOrCountry = isBusinessTab ? item.getAttribute('data-category') : item.getAttribute('data-country');

      // Responsive Logic (render ONLY when handling the event appropriately)
      if (isMobileView()) {
          if (eventType === 'click') {
              // Mobile: Render for this click
              if (isBusinessTab) {
                  renderBusinessTiles(categoryOrCountry);
              } else {
                  renderCountryTiles(categoryOrCountry);
              }

              // Toggle logic
              const currentItemId = item.id;
              activeDesktopItemId = null;

              if (lastHighlightedItemId === currentItemId) {
                  resetDisplayPosition();
                  return;
              }

              clearHighlighting();
              item.classList.add('highlighted');
              
              // Optional: Brief tap feedback (ADD THIS BLOCK HERE)
              item.classList.add('mobileclick');
              setTimeout(() => item.classList.remove('mobileclick'), 200);  // Removes after 200ms

              item.after(documentTilesDisplay);
              documentTilesDisplay.classList.add('mobile-expanded');

              lastHighlightedItemId = currentItemId;
          }
          // Intentionally ignore 'mouseenter' on mobile (no render, no logic)
      } else {
          // Desktop: Render and handle hover
          if (isBusinessTab) {
              renderBusinessTiles(categoryOrCountry);
          } else {
              renderCountryTiles(categoryOrCountry);
          }

          const currentItemId = item.id;
          if (activeDesktopItemId !== currentItemId) {
              clearHighlighting();
              item.classList.add('highlighted');
              activeDesktopItemId = currentItemId;
          }
          // If same item, render still happens (refreshes content), but no re-highlight
      }
    };
    const tabButtons = document.querySelectorAll('#document-type-section .tab-button');
    const tabContents = document.querySelectorAll('#document-type-section .tab-content');

    // Combined list of all items for event attachment
    const allItems = document.querySelectorAll('#business-function-list .function-item, #country-list .function-item');

    const switchTab = (tabName) => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => {
            content.classList.remove('active-content');
            content.classList.add('hidden-content');
        });

        const activeTabButton = document.querySelector(`#document-type-section .tab-button[data-tab="${tabName}"]`);
        const activeTabContent = document.getElementById(`tab-content-${tabName}`);

        if (activeTabButton && activeTabContent) {
            activeTabButton.classList.add('active');
            activeTabContent.classList.add('active-content');
            activeTabContent.classList.remove('hidden-content');

            // Initialize content for the newly active tab
            initializeTabContent(tabName);
        }
    };

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            switchTab(tabName);
        });
    });

    // Setup Event Listeners for all list items
    allItems.forEach(item => {
        const isBusinessTab = item.closest('#business-function-list') !== null;

        // Desktop hover behavior (mouseenter)
        item.addEventListener('mouseenter', () => {
            if (!isMobileView()) {
                handleItemInteraction(item, isBusinessTab, 'mouseenter');
            }
        });

        // Mobile/Click behavior (click)
        item.addEventListener('click', (e) => {
            handleItemInteraction(item, isBusinessTab, 'click');
        });
    });

    // Ensure proper state when resizing
    window.addEventListener('resize', () => {
        const activeTab = document.querySelector('#document-type-section .tab-button.active').getAttribute('data-tab');
        // Re-initialize the content to correctly switch between mobile and desktop layouts
        initializeTabContent(activeTab);
    });

    // Initial setup on page load:
    switchTab('business');
});