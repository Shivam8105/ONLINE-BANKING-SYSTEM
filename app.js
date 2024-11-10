document.addEventListener("DOMContentLoaded", function() {
  const toggleBtn = document.getElementById("toggle-btn");
  const sidebar = document.getElementById("sidebar");
  const dropdownButtons = document.querySelectorAll(".drop-btn");
  const login = document.getElementById("Login");
  const signup = document.getElementById("Sign-up");
  const SigninLogin = document.getElementsByClassName("button-container")[0];

  // Toggle sidebar visibility
  toggleBtn.addEventListener("click", function() {
      sidebar.classList.toggle("hidden");
      sidebar.classList.toggle("closed");
      
      // Adjust the login and signup button positions based on sidebar state
      if (sidebar.classList.contains("closed")) {
          login.style.left = "1400px";
          signup.style.left = "1400px";
      } else {
          login.style.left = "1350px";
          signup.style.left = "1350px";
      }

      // Adjust toggle button position
      toggleBtn.style.left = sidebar.classList.contains("closed") ? "15px" : "260px";
  });

  // Toggle dropdown menus
  dropdownButtons.forEach(button => {
      button.addEventListener("click", function() {
          const dropdownMenu = button.nextElementSibling;
          if (dropdownMenu.classList.contains("open")) {
              dropdownMenu.classList.remove("open");
          } else {
              document.querySelectorAll(".dropdown-profile, .dropdown-Accounts, .dropdown-Services, .dropdown-Setting")
                  .forEach(menu => menu.classList.remove("open"));
              dropdownMenu.classList.add("open");
          }
      });
  });
});
