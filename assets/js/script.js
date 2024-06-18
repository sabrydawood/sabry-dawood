"use strict";
const NavbBarButtons = ["About", "Projects", "Blog", "Contact", "Cv"];

window.addEventListener("DOMContentLoaded", function () {
  const { Projects, Skills, Services, SocialMedia, ContactData } = siteData;
  const navbarList = document.getElementById("navbarList");
  const contactList = document.getElementById("contactList");
  const socialList = document.getElementById("socialList");
  const projectsList = document.getElementById("projectList");
  const skillList = document.getElementById("skillsList");
  const serviceList = document.getElementById("serviceList");
  if (NavbBarButtons.length) {
    NavbBarButtons.map((button, index) => {
      const li = document.createElement("li");
      li.classList.add("navbar-item");
      li.innerHTML = `
        <button class="navbar-link ${index === 0 ? "active" : ""}" 
        id="nav_${button.toLowerCase()}"
        onclick="handleToggleNavigation('${button}')"
        >${button}</button>
      `;
      navbarList.appendChild(li);
    });
  }
  if (ContactData.length) {
    ContactData.map((contact) => {
      const li = document.createElement("li");
      li.classList.add("contact-item");
      li.innerHTML = `
        <div class="icon-box">
          <ion-icon name="${contact.icon}"></ion-icon>
        </div>
        <div class="contact-info">
          <p class="contact-title">${contact.name}</p>
          <a rel="noopener" target="_blank" href="${contact.link}" class="contact-link">${contact.value}</a>
        </div>
      `;
      contactList.appendChild(li);
    });
  }
  if (SocialMedia.length) {
    SocialMedia.map((social) => {
      const li = document.createElement("li");
      li.classList.add("social-item");
      li.innerHTML = `
        <a rel="noopener" href="${social.link}" target="_blank" class="social-link">
          <ion-icon name="${social.icon}"></ion-icon>
        </a>
      `;
      socialList.appendChild(li);
    });
  }
  if (Projects.length) {
    Projects.map((project) => {
      const li = document.createElement("li");
      li.classList.add("project-item");
      li.classList.add("active");
      li.setAttribute("data-filter-item", project.name);
      li.innerHTML = `
        <a href="${project.link}">
          <figure class="project-img">
            <div class="project-item-icon-box">
              <ion-icon name="eye-outline"></ion-icon>
            </div>
            <img src="${project.img}" alt="preview image" loading="lazy" />
          </figure>
          <h3 class="project-title">${project.name}</h3>
        </a>
      `;
      projectsList.appendChild(li);
    });
  }
  if (Skills.length) {
    Skills.map((skill) => {
      const li = document.createElement("li");
      li.classList.add("skills-item");
      li.innerHTML = `
        <div class="title-wrapper">
          <h5 class="h5">${skill.name}</h5>
          <data value="${skill.percentage}"></data>
        </div>
        <div class="skill-progress-bg">
          <div class="skill-progress-fill" style="width: ${skill.percentage}%"></div>
        </div>
      `;
      skillList.appendChild(li);
    });
  }
  if (Services.length) {
    Services.map((service) => {
      const li = document.createElement("li");
      li.classList.add("service-item");
      li.innerHTML = `
        <div class="service-icon-box">
          <img src="${service.img}" alt="${service.name}" width="60"/>
        </div>
        <div class="service-content-box">
          <h4 class="h4 service-item-title">${service.name}</h4>
          <p class="service-item-text">
            ${service.description}
          </p>
        </div>
      `;
      serviceList.appendChild(li);
    });
  }
});

const pages = document.querySelectorAll("[data-page]");
function handleToggleNavigation(page) {
  NavbBarButtons.map((button, index) => {
    const label = document.getElementById(`nav_${button.toLowerCase()}`);
    if (button.toLowerCase() === page.toLowerCase()) {
      label.classList.add("active");
    } else {
      label.classList.remove("active");
    }
  });
  Object.values(pages).forEach((pageItem) => {
    if (pageItem.dataset.page === page.toLowerCase()) {
      pageItem.classList.add("active");
    } else {
      pageItem.classList.remove("active");
    }
  });
  // const isHavePage = pages.find((pageItem) => pageItem.dataset.page === page);
  // console.log({ isHavePage });
  // if (isHavePage) {
  //   navigationLinks[0].classList.add("active");
  //   navigationLinks[1].classList.remove("active");
  //   navigationLinks[2].classList.remove("active");
  // }
}
// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}
