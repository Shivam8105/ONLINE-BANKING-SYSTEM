document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const closeSidebarBtn = document.getElementById("close-sidebar");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  const toggleBtn = document.getElementById("toggle-btn");
  const dropdownButtons = document.querySelectorAll(".drop-btn[data-dropdown]");
  let isMobileMenuOpen = false;
  let isSidebarCollapsed = false;
  function toggleSidebar() {
      isSidebarCollapsed = !isSidebarCollapsed;
      sidebar.classList.toggle("hidden");
      if (isSidebarCollapsed) {
          document.body.style.setProperty('--sidebar-width', '0px');
          toggleBtn.style.transform = 'rotate(180deg)';
      } else {
          document.body.style.setProperty('--sidebar-width', 'min(280px, 90vw)');
          toggleBtn.style.transform = 'rotate(0deg)';
      }
  }
  
  function openMobileMenu() {
      sidebar.classList.add("show");
      overlay.classList.add("active");
      document.body.classList.add("menu-open");
      isMobileMenuOpen = true;
  }
  
  function closeMobileMenu() {
      sidebar.classList.remove("show");
      overlay.classList.remove("active");
      document.body.classList.remove("menu-open");
      isMobileMenuOpen = false;
      
      // Close all dropdowns when closing mobile menu
      document.querySelectorAll(".dropdown-menu").forEach(menu => {
          menu.classList.remove("show");
      });
  }
  
  function toggleMobileMenu() {
      if (isMobileMenuOpen) {
          closeMobileMenu();
      } else {
          openMobileMenu();
      }
  }
  
  function handleDropdown(button) {
      const dropdownType = button.getAttribute("data-dropdown");
      const currentDropdown = document.querySelector(`.dropdown-${dropdownType}`);
      const arrow = button.querySelector(".dropdown-arrow");
      
      // Close all other dropdowns first
      dropdownButtons.forEach(btn => {
          if (btn !== button) {
              const type = btn.getAttribute("data-dropdown");
              const dropdown = document.querySelector(`.dropdown-${type}`);
              const otherArrow = btn.querySelector(".dropdown-arrow");
              dropdown.classList.remove("show");
              otherArrow.style.transform = "rotate(0deg)";
          }
      });
      
      // Toggle current dropdown
      const isOpen = currentDropdown.classList.contains("show");
      currentDropdown.classList.toggle("show");
      arrow.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
  }
  
  // Event Listeners
  toggleBtn?.addEventListener("click", toggleSidebar);
  mobileMenuBtn?.addEventListener("click", toggleMobileMenu);
  closeSidebarBtn?.addEventListener("click", closeMobileMenu);
  overlay?.addEventListener("click", closeMobileMenu);
  
  dropdownButtons.forEach(button => {
      button.addEventListener("click", (e) => {
          e.stopPropagation();
          handleDropdown(button);
      });
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener("click", (e) => {
      if (!e.target.closest(".drop-btn") && !e.target.closest(".dropdown-menu")) {
          dropdownButtons.forEach(button => {
              const type = button.getAttribute("data-dropdown");
              const dropdown = document.querySelector(`.dropdown-${type}`);
              const arrow = button.querySelector(".dropdown-arrow");
              dropdown.classList.remove("show");
              arrow.style.transform = "rotate(0deg)";
          });
      }
  });
  
  // Handle window resize
  let resizeTimer;
  window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
          if (window.innerWidth > 768) {
              if (isMobileMenuOpen) {
                  closeMobileMenu();
              }
              // Reset sidebar state for desktop view
              if (isSidebarCollapsed) {
                  document.body.style.setProperty('--sidebar-width', '0px');
              } else {
                  document.body.style.setProperty('--sidebar-width', 'min(280px, 90vw)');
              }
          }
      }, 250);
  });
  
  // Handle escape key
  document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
          closeMobileMenu();
      }
  });
});


document.addEventListener('DOMContentLoaded', () => {
    const openAccountButton = document.getElementById('openAccountButton');
  
    // Check if the user has already created an account
    if (localStorage.getItem('accountCreated')) {
      openAccountButton.style.display = 'none'; // Hide the button
    }
  
    // Example: Simulate account creation success
    // Remove this in production; use the server response instead
    document.getElementById('accountCreationForm')?.addEventListener('submit', () => {
      localStorage.setItem('accountCreated', true);
      openAccountButton.style.display = 'none'; // Hide the button after success
    });
  });
  