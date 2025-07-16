document.querySelector('h1').addEventListener('click', function() {
    alert('"I AM THAT I AM" (Exodus 3:14)');
});

document.addEventListener('DOMContentLoaded', () => {
    const title = document.getElementById('animated-title');
    const titleText = title.innerText;
    title.innerText = ''; // Clear the title

    titleText.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.innerText = char;
        span.style.animationDelay = `${index * 0.1}s`; // Adjust delay for each letter
        title.appendChild(span);
    //code to make trails
    })

    const trailCount = 25; // Number of trail elements
    const trails = [];
    const shrinkRate = 0.8; // Smaller values shrink faster
    const decreaseOpacity = 0.1; // Smaller values fade faster
    const minimumSize = 2; // Minimum size for the trail
    let hue = 0;

    // Create trail elements
    for (let i = 0; i < trailCount; i++) {
        const trailElement = document.createElement('div');
        trailElement.classList.add('trail');
        document.body.appendChild(trailElement);
        trails.push(trailElement);
    }

    let currentTrail = 0;
    let lastX = 0;
    let lastY = 0;
    const maxInitialSize = 20; // Maximum initial size of each trail

    document.addEventListener('mousemove', (event) => {
        lastX = event.pageX;
        lastY = event.pageY;
    });

    function updateTrails() {
        const trail = trails[currentTrail];

        // Center the trail over the mouse position
        trail.style.left = `${lastX - maxInitialSize / 2}px`; // Center horizontally
        trail.style.top = `${lastY - maxInitialSize / 2}px`; // Center vertically

        // Reset size and opacity when repositioned
        trail.style.width = `${maxInitialSize}px`;
        trail.style.height = `${maxInitialSize}px`;
        trail.style.opacity = 0.3;

        trail.style.borderColor = `hsl(${hue}, 100%, 50%)`;
        hue = (hue + 5) % 360; // Increment hue to cycle through colors
        

        // Move to next trail
        currentTrail = (currentTrail + 1) % trailCount;
    }

    function animate() {
        updateTrails();

        trails.forEach(trail => {
            const currentWidth = parseFloat(trail.style.width);
            const currentHeight = parseFloat(trail.style.height);
            const currentOpacity = parseFloat(trail.style.opacity);

            
             // Adjust position to remain centered as it shrinks
            const deltaX = (currentWidth - currentWidth * shrinkRate) / 2;
            const deltaY = (currentHeight - currentHeight * shrinkRate) / 2;

            if (currentWidth > minimumSize) {
                trail.style.width = `${currentWidth * shrinkRate}px`;
                trail.style.height = `${currentHeight * shrinkRate}px`;
                trail.style.left = `${parseFloat(trail.style.left) + deltaX}px`;
                trail.style.top = `${parseFloat(trail.style.top) + deltaY}px`;
            }
            


            // Reduce opacity, but not below zero
            if (currentOpacity > 0.1) {
                trail.style.opacity = currentOpacity - decreaseOpacity;
            }
        });

        // Request the next frame
        requestAnimationFrame(animate);
    }

    // Start the animation
    requestAnimationFrame(animate);
});

