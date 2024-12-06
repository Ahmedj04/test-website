// Select the features list container and the image element
const featuresList = document.querySelector('.features-list');
const imageElement = document.getElementById('feature-image');
// const featuresContainer = document.querySelector('.features-container');

// Create an IntersectionObserver to observe each feature item within the list
const observer = new IntersectionObserver(entries => {
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
    observer.observe(item);
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
  track.style.transition = 'transform 0.3s ease-in-out';
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
  }, 300); // Ensure this happens after the transition
}

// Update active dot
function updateDots() {
  dots.forEach((dot, idx) => {
    // `currentIndex - 1` adjusts for the clone slides
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
}, 3000);

// Pause auto-play on hover
track.addEventListener('mouseenter', () => clearInterval(autoPlay));
track.addEventListener('mouseleave', () => {
  autoPlay = setInterval(() => {
    currentIndex++;
    updateCarousel();
    updateDots();
  }, 3000);
});

// Handle transition reset for looping
setTimeout(() => {
  if (currentIndex === 0) {
    track.style.transition = 'none';
    currentIndex = allItems.length - 2;
    track.style.transform = `translateX(-${currentIndex * itemWidth}%)`;
    updateDots();
  }
}, 300);
