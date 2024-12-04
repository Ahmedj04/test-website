// Select the features list container and the image element
const featuresList = document.querySelector('.features-list');
const imageElement = document.getElementById('feature-image');
const featuresContainer = document.querySelector('.features-container');

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

function isSectionFullyVisible(element) {
    const rect = element.getBoundingClientRect();
    console.log(rect); // Debugging: check the properties of the rect object
    return rect.top >= 0 && rect.bottom <= window.innerHeight && rect.left >= 0 && rect.right <= window.innerWidth;
}

function isSectionFullyVisible(element) {
    const rect = element.getBoundingClientRect();
    const elementHeight = rect.height;
    const viewportHeight = window.innerHeight;
    // const viewportWidth = window.innerWidth;

    // Calculate the percentage of the element that is within the viewport
    const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
    // const visibleWidth = Math.min(rect.right, viewportWidth) - Math.max(rect.left, 0);

    // Check if at least 80% of the element's height is within the viewport
    const isHeightVisible = (visibleHeight / elementHeight) >= 0.9;
    // const isWidthVisible = (visibleWidth / rect.width) >= 0.9; // Optional: check if at least 80% of the width is visible

    // console.log(`Element height visibility: ${isHeightVisible}`);
    // console.log(`Element width visibility: ${isWidthVisible}`);

    return isHeightVisible 
}

window.addEventListener('scroll', () => {
    if (isSectionFullyVisible(featuresContainer)) {
        console.log('The section is fully visible');
        featuresList.style.overflowY = 'auto';
        featuresList.style.backgroundColor = 'red';
    
    } else {
        console.log('The section is not fully visible');
        featuresList.style.overflowY = 'hidden';
        featuresList.style.backgroundColor = 'blue';


    }
});