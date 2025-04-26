console.log("Clouds.js init")

document.addEventListener('DOMContentLoaded', () => {


   // Find the <script> element where src includes 'main.js'
  const scripts = document.querySelectorAll('script[src]');
  let scriptDir = '';


  scripts.forEach(script => {
    if (script.src.includes('clouds.js')) { // <-- Replace with your script filename!
      scriptDir = script.src.substring(0, script.src.lastIndexOf('/'));
    }
  });

  if (!scriptDir) {
    console.error('Script source not found!');
    return;
  }

  

  const cloudImages = [
    `${scriptDir}/assets/cloud1.png`,
    `${scriptDir}/assets/cloud2.png`,
    `${scriptDir}/assets/cloud3.png`,
    `${scriptDir}/assets/cloud4.png`,
    `${scriptDir}/assets/cloud5.png`,
    `${scriptDir}/assets/cloud6.png`,
  ];

  const images = document.querySelectorAll('img');

  images.forEach(img => {
    // Create a wrapper
    const wrapper = document.createElement('div');
    wrapper.classList.add('image-wrapper');

    // Insert wrapper before the image
    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(img);

    // Create cloud overlay
    const cloud = document.createElement('img');
    cloud.src = cloudImages[Math.floor(Math.random() * cloudImages.length)];
    cloud.classList.add('cloud-overlay');

    // Append to wrapper
    wrapper.appendChild(cloud);
  });
});
