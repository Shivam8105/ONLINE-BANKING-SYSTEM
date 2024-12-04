// Toggle Mobile Menu
document.getElementById('mobile-menu')?.addEventListener('click', () => {
  const nav = document.querySelector('nav');
  nav.classList.toggle('active');  // Toggle the 'active' class to show/hide the menu
});

// Fetch and Display Profile Data
// Fetch and Display Profile Data
// Fetch and Display Profile Data
// Fetch and Display Profile Data
async function loadProfile() {
  try {
    const response = await fetch('/profileData/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Failed to load profile: ${response.statusText}`);
    }

    const profileData = await response.json();

    // Ensure profileData contains all required properties
    console.log('Profile Data:', profileData);

    const usernameElement = document.getElementById('username');
    const fullName =  document.getElementById('fullName');
    const emailElement = document.getElementById('email');
    const phoneElement = document.getElementById('phone');
    const DOBElement = document.getElementById('DOB');
    const genderElement = document.getElementById('gender');
    const addressElement = document.getElementById('address');
    const accountNumberElement = document.getElementById('accountNumber');
    const ifscCodeElement = document.getElementById('ifscCode');
    const balanceElement = document.getElementById('balance');
    const profileImageElement = document.getElementById('profileImage');

    if(fullName) fullName.textContent = profileData.fullName || 'Shadil';
    if (usernameElement) usernameElement.textContent = profileData.username || 'Unknown';
    if (emailElement) emailElement.textContent = profileData.email || 'No email provided';
    if (phoneElement) phoneElement.textContent = profileData.phone || 'No phone number';
    if (DOBElement) DOBElement.textContent = profileData.DOB || '12/02/2000';
    if (genderElement) genderElement.textContent = profileData.gender || 'Not provided';
    if (addressElement) addressElement.textContent = profileData.address || 'No address provided';
    if (accountNumberElement) accountNumberElement.textContent = profileData.accountNumber || 'N/A';
    if (ifscCodeElement) ifscCodeElement.textContent = profileData.ifscCode || 'Not provided';
    if (balanceElement) balanceElement.textContent = `₹${profileData.balance || 0}`;
    if (profileImageElement) profileImageElement.src = profileData.profileImage || 'assets/default-profile.PNG';

  } catch (error) {
    console.error('Error loading profile data:', error);
    const profileCard = document.getElementById('profileCard');
    if (profileCard) {
      profileCard.textContent = 'Failed to load profile information.';
    }
  }
}


// Edit Profile Button Functionality (you can replace this with actual editing functionality later)
document.getElementById('editProfileBtn')?.addEventListener('click', () => {
  alert("Edit Profile functionality is under construction.");
});

// Logout Button Functionality
document.getElementById('logout')?.addEventListener('click', (event) => {
  event.preventDefault();
  fetch('/logout', { method: 'POST' })
      .then((response) => {
          if (response.ok) {
              window.location.href = '/login';
          } else {
              alert('Logout failed. Please try again.');
          }
      })
      .catch((error) => {
          console.error('Error:', error);
          alert('Logout failed. Please try again.');
      });
});

// Toggle Profile Card Visibility
document.getElementById("toggleProfileBtn")?.addEventListener("click", function () {
  const profileCard = document.getElementById("profileCard");
  profileCard.classList.toggle("open");  // Toggle the 'open' class to show/hide profile card
});

// Close Profile Card
document.getElementById("closeProfileBtn")?.addEventListener("click", function () {
  const profileCard = document.getElementById("profileCard");
  profileCard.classList.remove("open");  // Ensure the profile card is closed
});

// Three.js 3D Interactive Background Setup
// Three.js 3D Interactive Background Setup
function initThreeJS() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.style.position = 'absolute';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';
  document.body.appendChild(renderer.domElement);

  const particleCount = 5000;
  const particles = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = Math.random() * 2000 - 1000;  // X
    positions[i * 3 + 1] = Math.random() * 2000 - 1000;  // Y
    positions[i * 3 + 2] = Math.random() * 2000 - 1000;  // Z
  }

  particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const pMaterial = new THREE.PointsMaterial({
    color: 0xFFFFFF,
    size: 2,
    map: new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/disc.png'),
    blending: THREE.AdditiveBlending,
    transparent: true
  });

  const particleSystem = new THREE.Points(particles, pMaterial);
  scene.add(particleSystem);

  camera.position.z = 300;

  // Variables to store mouse position
  let mouseX = 0;
  let mouseY = 0;

  // Event listener for mouse movement
  window.addEventListener('mousemove', function(event) {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    particleSystem.rotation.x += 0.001;
    particleSystem.rotation.y += 0.001;

    // Update camera position based on mouse movement
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  animate();  // Start animation
}

window.onload = function() {
  initThreeJS();
  loadProfile();  // Assuming you have a loadProfile function for other profile-related logic
};
