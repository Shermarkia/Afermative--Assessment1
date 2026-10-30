/* ==========================================================
   Web Refresher – script.js
   Interactions on this page:
     1. Theme switcher (light / dark, remembered between visits)
     2. Mobile menu toggle
     3. Project filter
     4. Skills show/hide + contact form validation
   ========================================================== */

// Wait until the HTML has loaded before looking for elements
document.addEventListener("DOMContentLoaded", () => {
  setUpThemeToggle();
  setUpMobileMenu();
  setUpProjectFilter();
  setUpLearningToggle();
  setUpContactForm();

  // Keep the footer year current
  document.getElementById("year").textContent = new Date().getFullYear();
});

/* ---------- 1. Theme switcher ---------- */
function setUpThemeToggle() {
  const root = document.documentElement;
  const button = document.getElementById("themeToggle");

  // localStorage can throw (e.g. private browsing), so wrap it in try/catch
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem("theme");
  } catch (error) {
    savedTheme = null;
  }

  // Use the saved choice, otherwise follow the operating system setting
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

  button.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch (error) {
      // Not saving is fine; the theme still changes for this visit
    }
  });

  function applyTheme(theme) {
    root.dataset.theme = theme;
    // The label stays "Dark mode"; aria-pressed tells screen readers if it's on
    button.setAttribute("aria-pressed", String(theme === "dark"));
  }
}

/* ---------- 2. Mobile menu ---------- */
function setUpMobileMenu() {
  const toggle = document.getElementById("navToggle");
  const list = document.getElementById("navList");

  toggle.addEventListener("click", () => {
    const isOpen = list.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.textContent = isOpen ? "Close" : "Menu";
  });

  // Close the menu after a link is chosen, so it doesn't cover the page
  list.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      list.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "Menu";
    });
  });
}

/* ---------- 3. Project filter ---------- */
function setUpProjectFilter() {
  const buttons = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project");
  const status = document.getElementById("filterStatus");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter; // "all", "client" or "app"

      // Update which button looks (and is announced as) selected
      buttons.forEach((b) => {
        const isCurrent = b === button;
        b.classList.toggle("is-active", isCurrent);
        b.setAttribute("aria-pressed", String(isCurrent));
      });

      // Show matching projects, hide the rest, and count what's visible
      let visibleCount = 0;
      projects.forEach((project) => {
        const matches = filter === "all" || project.dataset.type === filter;
        project.classList.toggle("is-hidden", !matches);
        if (matches) visibleCount++;
      });

      status.textContent =
        "Showing " + visibleCount + (visibleCount === 1 ? " project" : " projects");
    });
  });
}

/* ---------- 4a. Skills show/hide ---------- */
function setUpLearningToggle() {
  const button = document.getElementById("learningToggle");
  const panel = document.getElementById("learningPanel");

  button.addEventListener("click", () => {
    const willShow = panel.hidden; // currently hidden, so we're about to show it
    panel.hidden = !willShow;
    button.setAttribute("aria-expanded", String(willShow));
    button.textContent = willShow
      ? "Hide what I'm learning next"
      : "Show what I'm learning next";
  });
}

/* ---------- 4b. Contact form validation ---------- */
function setUpContactForm() {
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const messageCount = document.getElementById("messageCount");
  const success = document.getElementById("formSuccess");

  const MAX_MESSAGE_LENGTH = 500;

  // Live character counter for the message box
  messageInput.addEventListener("input", () => {
    const length = messageInput.value.length;
    messageCount.textContent = length + " / " + MAX_MESSAGE_LENGTH + " characters";
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // there is no server, so handle it here
    success.textContent = "";

    // Run every check so the user sees all problems at once
    const nameOk = checkField(
      nameInput,
      nameInput.value.trim().length >= 2,
      "Enter your name (at least 2 characters)."
    );
    const emailOk = checkField(
      emailInput,
      isValidEmail(emailInput.value.trim()),
      "Enter an email address like name@example.com."
    );
    const messageLength = messageInput.value.trim().length;
    const messageOk = checkField(
      messageInput,
      messageLength >= 10 && messageLength <= MAX_MESSAGE_LENGTH,
      "Write a message between 10 and " + MAX_MESSAGE_LENGTH + " characters."
    );

    if (nameOk && emailOk && messageOk) {
      success.textContent =
        "Thanks, " + nameInput.value.trim() + ". Your message is ready to send.";
      form.reset();
      messageCount.textContent = "0 / " + MAX_MESSAGE_LENGTH + " characters";
    } else {
      // Move focus to the first problem so keyboard users can fix it
      form.querySelector(".is-invalid").focus();
    }
  });

  // Shows or clears the error for one field; returns true if it passed
  function checkField(input, isValid, message) {
    const errorText = document.getElementById(input.id + "Error");
    errorText.textContent = isValid ? "" : message;
    input.classList.toggle("is-invalid", !isValid);
    input.setAttribute("aria-invalid", String(!isValid));
    return isValid;
  }

  // Simple pattern: something@something.something
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
}
