document.addEventListener('DOMContentLoaded', () => {
  const scripts = document.querySelectorAll('script[src]');
  let scriptDir = '';

  scripts.forEach(script => {
    if (script.src.includes('clouds.js')) { // <--- Using your filename
      scriptDir = script.src.substring(0, script.src.lastIndexOf('/'));
    }
  });

  if (!scriptDir) {
    console.error('Script source not found!');
    return;
  }

  const cloudsBasePath = `${scriptDir}/assets`;

  const cloudImages = [
    `${cloudsBasePath}/cloud1.png`,
    `${cloudsBasePath}/cloud2.png`,
    `${cloudsBasePath}/cloud3.png`,
    `${cloudsBasePath}/cloud4.png`,
    `${cloudsBasePath}/cloud5.png`,
    `${cloudsBasePath}/cloud6.png`,
  ];

  const images = document.querySelectorAll('img');

  images.forEach(img => {
    // Create a wrapper
    const wrapper = document.createElement('div');
    wrapper.classList.add('image-wrapper');

    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(img);

    // Helper function to create a cloud with given src
    const createCloud = (src, offsetX = 0, offsetY = 0) => {
        const cloud = document.createElement('img');
        cloud.src = src;
        cloud.classList.add('cloud-overlay');
        cloud.style.position = 'absolute';
        cloud.style.left = `calc(50% + ${offsetX}px)`;  
        cloud.style.bottom = `${offsetY}px`;
        cloud.style.transform = 'translateX(-50%)'; // Center from middle
        cloud.style.pointerEvents = 'none';
        cloud.style.zIndex = '2';
        cloud.style.maxWidth = 'none'; // Prevent limiting its width artificially
        return cloud;
    };

    // Check image height AFTER it loads
    if (img.complete) {
      injectClouds();
    } else {
      img.onload = injectClouds;
    }

    function injectClouds() {
      if (img.height > 400) {
        // Pick two DIFFERENT random clouds
        let indexes = [...cloudImages.keys()]; // [0, 1, 2, 3, 4, 5]
        shuffle(indexes);

        const firstCloudSrc = cloudImages[indexes[0]];
        const secondCloudSrc = cloudImages[indexes[1]];

        // Small random shifts
        const firstCloudOffsetX = Math.random() * 20 - 10; // between -10px and +10px
        const secondCloudOffsetX = Math.random() * 20 - 10;
        const firstCloudOffsetY = Math.random() * 10; // between 0 and 10px upward
        const secondCloudOffsetY = Math.random() * 10;

        wrapper.appendChild(createCloud(firstCloudSrc, firstCloudOffsetX, firstCloudOffsetY));
        wrapper.appendChild(createCloud(secondCloudSrc, secondCloudOffsetX, secondCloudOffsetY));
      } else {
        // Otherwise, just one random cloud
        const randomCloud = cloudImages[Math.floor(Math.random() * cloudImages.length)];
        wrapper.appendChild(createCloud(randomCloud));
      }
    }

    // Simple shuffle function (Fisher-Yates)
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  });
});
