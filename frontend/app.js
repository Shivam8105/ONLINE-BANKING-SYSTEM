document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("toggle-btn");
  const sidebar = document.getElementById("sidebar");
  const dropdownButtons = document.querySelectorAll(".drop-btn");
  const mainContent = document.querySelector(".main");

  function updateTogglePosition() {
    const isSidebarClosed =
      sidebar.classList.contains("closed") ||
      sidebar.classList.contains("hidden");
    toggleBtn.style.left = isSidebarClosed ? "15px" : "260px";
  }

  toggleBtn.addEventListener("click", function () {
    sidebar.classList.toggle("hidden");
    updateTogglePosition();
  });

  dropdownButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const dropdownMenu = this.nextElementSibling;
      dropdownButtons.forEach((btn) => {
        if (btn !== button) {
          const menu = btn.nextElementSibling;
          menu.classList.remove("open");
        }
      });
      dropdownMenu.classList.toggle("open");
    });
  });
  document.addEventListener("click", function (e) {
    if (
      !e.target.closest(".drop-btn") &&
      !e.target.closest(
        ".dropdown-profile, .dropdown-Accounts, .dropdown-Services, .dropdown-Setting"
      )
    ) {
      document
        .querySelectorAll(
          ".dropdown-profile, .dropdown-Accounts, .dropdown-Services, .dropdown-Setting"
        )
        .forEach((menu) => {
          menu.classList.remove("open");
        });
    }
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth <= 768) {
      sidebar.classList.add("hidden");
      updateTogglePosition();
    }
  });
  updateTogglePosition();
});

document.querySelectorAll(".drop-btn").forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("active");
    const dropdown = button.nextElementSibling;
    document
      .querySelectorAll(
        ".dropdown-profile, .dropdown-Accounts, .dropdown-Services, .dropdown-Setting"
      )
      .forEach((d) => {
        if (d !== dropdown) {
          d.classList.remove("open");
          d.previousElementSibling?.classList.remove("active");
        }
      });
    dropdown.classList.toggle("open");
  });
});
