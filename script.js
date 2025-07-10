// Portfolio data with sample projects
const portfolioData = {
  all: [
    {
      id: 1,
      title: "YouTube Thumbnail Pack for Tech Reviews",
      category: "content",
      images: ["/images/photo-2.jpg", "/images/photo-1.jpg", "/images/photo-3.jpg"],
    },
    {
      id: 2,
      title: "YouTube Thumbnail Pack",
      category: "content",
      images: ["/images/photo-1.jpg", "/images/photo-2.jpg"],
    },
    {
      id: 3,
      title: "Floral Illustration Design",
      category: "branding",
      images: ["/images/photo-1.jpg", "/images/photo-2.jpg", "/images/photo-3.jpg"],
    },
    {
      id: 4,
      title: "3D Lion Sculpture",
      category: "branding",
      images: ["/images/photo-2.jpg", "/images/photo-1.jpg"],
    },
    {
      id: 5,
      title: "Social Media Campaign",
      category: "social",
      images: ["/images/photo-3.jpg", "/images/photo-1.jpg", "/images/photo-3.jpg"],
    },
    {
      id: 6,
      title: "Brand Identity Package",
      category: "branding",
      images: ["/images/photo-3.jpg", "/images/photo-1.jpg"],
    },
  ],
  branding: [],
  social: [],
  content: [],
}

// Populate category arrays
portfolioData.all.forEach((item) => {
  portfolioData[item.category].push(item)
})

// DOM elements
const leftSidebar = document.getElementById("leftSidebar")
const rightContent = document.getElementById("rightContent")
const profileImage = document.getElementById("profileImage")
const coverPhoto = document.getElementById("coverPhoto")
const portfolioGrid = document.getElementById("portfolioGrid")
const modal = document.getElementById("modal")
const modalTitle = document.getElementById("modalTitle")
const modalContent = document.getElementById("modalContent")
const closeModal = document.getElementById("closeModal")
const playPauseBtn = document.getElementById("playPauseBtn")
const portfolioVideo = document.getElementById("portfolioVideo")
const nameSection = document.getElementById("nameSection")
const mainContent = document.getElementById("mainContent")

document.getElementById("prevImage").addEventListener("click", () => {
  if (!currentCategoryItems.length) return;
  currentItemIndex = (currentItemIndex - 1 + currentCategoryItems.length) % currentCategoryItems.length;
  renderModalContent(currentCategoryItems[currentItemIndex]);
});

document.getElementById("nextImage").addEventListener("click", () => {
  if (!currentCategoryItems.length) return;
  currentItemIndex = (currentItemIndex + 1) % currentCategoryItems.length;
  renderModalContent(currentCategoryItems[currentItemIndex]);
});


// Sticky sidebar functionality
let isSticky = false

function handleScroll() {
  const coverBottom = coverPhoto.offsetTop + coverPhoto.offsetHeight;
  const scrollTop   = window.pageYOffset || document.documentElement.scrollTop;
  const tabNav      = document.getElementById('tabNav');
  const container   = document.getElementById('profileImageContainer');

  
  if (scrollTop >= coverBottom - 50) {
    container.classList.add('scrolled-profile');
  } else {
    container.classList.remove('scrolled-profile');
  }

  if (window.innerWidth >= 768) {
    // ----- SCROLL PAST COVER: activate sticky state -----
    if (scrollTop >= coverBottom - 50 && !isSticky) {
      // --- left sidebar sticky setup ---
      const stickyHeader = document.createElement("div");
      stickyHeader.id = "stickyHeader";
      stickyHeader.innerHTML = `
        <div class="flex flex-row items-center justify-start p-4 pb-0 mb-0 gap-2">
          <img src="/images/profile.jpg" alt="MD. Tanvirul Islam"
               class="h-28 w-28 rounded-full border-4 border-white object-cover transition-all duration-300">
          <div class="name-info flex-1">
            <h1 class="text-name font-bold text-gray-900 mb-1">MD. Tanvirul Islam</h1>
            <p class="text-gray-600 text-xs mb-2">Creative designer & Content creator</p>
            <div class="flex items-center text-gray-500 text-xs">
              <i class="fas fa-map-marker-alt mr-1"></i>
              <span>Bangladesh</span>
            </div>
          </div>
        </div>
      `;
      leftSidebar.classList.add("profile-sticky");
      leftSidebar.style.width = window.innerWidth >= 1280
        ? "384px"
        : window.innerWidth >= 1024
          ? "320px"
          : "384px";
      leftSidebar.insertBefore(stickyHeader, leftSidebar.firstChild);

      profileImage.classList.add("profile-image-hidden");
      nameSection.classList.add("name-section-hidden");

      // leftContent.style.height = "100vh";
      // leftContent.style.overflowY = "auto";

      rightContent.style.height = "100vh";
      rightContent.style.overflowY = "auto";
      profileImageContainer.classList.add("scrolled-profile");

      // --- right tabNav sticky setup ---
      if (tabNav && !tabNav.classList.contains("tabs-fixed")) {
        tabNav.classList.add("tabs-fixed");
        tabNav.style.width = `calc(100% - ${leftSidebar.offsetWidth}px)`;
        rightContent.style.paddingTop = `${tabNav.offsetHeight}px`;
      }

      isSticky = true;
    }
    // ----- SCROLL BACK UP: remove sticky state -----
    else if (scrollTop < coverBottom - 50 && isSticky) {
      // --- left sidebar restore ---
      const oldHeader = document.getElementById("stickyHeader");
      if (oldHeader) oldHeader.remove();

      leftSidebar.classList.remove("profile-sticky");
      leftSidebar.style.width = "";
      profileImage.classList.remove("profile-image-hidden");
      nameSection.classList.remove("name-section-hidden");

      rightContent.style.height = "";
      rightContent.style.overflowY = "";

      // --- right tabNav restore ---
      if (tabNav && tabNav.classList.contains("tabs-fixed")) {
        tabNav.classList.remove("tabs-fixed");
        tabNav.style.width = "";
        rightContent.style.paddingTop = "";
      }

      isSticky = false;
    }
  }
}

// Tab functionality
function initTabs() {
  const tabBtns = document.querySelectorAll(".tab-btn")

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all tabs
      tabBtns.forEach((tab) => {
        tab.classList.remove("tab-active", "text-gray-900")
        tab.classList.add("text-gray-500")
      })

      // Add active class to clicked tab
      btn.classList.add("tab-active", "text-gray-900")
      btn.classList.remove("text-gray-500")

      // Show corresponding content
      const tabType = btn.dataset.tab
      showPortfolioItems(tabType)
    })
  })

  // Show 'all' category by default
  showPortfolioItems("all")
}

// Show portfolio items based on category
function showPortfolioItems(category) {
  const items = portfolioData[category]
  portfolioGrid.innerHTML = ""

  items.forEach((item) => {
    const itemElement = document.createElement("div")
    itemElement.className = "image-container relative overflow-hidden rounded-lg cursor-pointer group"
    itemElement.innerHTML = `
      <div class="relative">
        <img src="${item.images[0]}" alt="${item.title}" class="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105">
        <!-- Hover title for medium devices and up -->
        <div class="hover-title hidden md:block absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4">
          <h4 class="text-white font-medium text-sm">${item.title}</h4>
        </div>
      </div>
      <!-- Title below image for small devices -->
      <h4 class="card-title-sm block md:hidden text-gray-900 font-medium text-md">${item.title}</h4>
    `

    itemElement.addEventListener("click", () => openModal(item))
    portfolioGrid.appendChild(itemElement)
  })
}

// Modal functionality
// function openModal(item) {
//   modalTitle.textContent = item.title
//   modalContent.innerHTML = ""

//   item.images.forEach((imageSrc) => {
//     const img = document.createElement("img")
//     img.src = imageSrc
//     img.alt = item.title
//     img.className = "w-full mb-4 rounded-lg"
//     modalContent.appendChild(img)
//   })

//   modal.classList.remove("hidden")
//   document.body.style.overflow = "hidden"
// }
function openModal(item) {
  // Filter items of the same category
  currentCategoryItems = portfolioData.all.filter(i => i.category === item.category);
  currentItemIndex = currentCategoryItems.findIndex(i => i.id === item.id);

  renderModalContent(currentCategoryItems[currentItemIndex]);

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}
function renderModalContent(item) {
  modalTitle.textContent = item.title;
  modalContent.innerHTML = "";

  item.images.forEach(imageSrc => {
    const img = document.createElement("img");
    img.src = imageSrc;
    img.alt = item.title;
    img.className = "w-full mb-4 rounded-lg";
    modalContent.appendChild(img);
  });
}


function closeModalFunc() {
  modal.classList.add("hidden")
  document.body.style.overflow = ""
}

// Video functionality
function initVideo() {
  let isPlaying = false

  if (playPauseBtn && portfolioVideo) {
    playPauseBtn.addEventListener("click", () => {
      if (isPlaying) {
        portfolioVideo.pause()
        playPauseBtn.innerHTML =
          '<div class="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center"><i class="fas fa-play text-gray-800 ml-1 text-xs"></i></div>'
        isPlaying = false
      } else {
        portfolioVideo.play()
        playPauseBtn.innerHTML =
          '<div class="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center"><i class="fas fa-pause text-gray-800 text-xs"></i></div>'
        isPlaying = true
      }
    })

    portfolioVideo.addEventListener("ended", () => {
      playPauseBtn.innerHTML =
        '<div class="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center"><i class="fas fa-play text-gray-800 ml-1 text-xs"></i></div>'
      isPlaying = false
    })
  }
}

// Event listeners
window.addEventListener("scroll", handleScroll)
window.addEventListener("resize", () => {
  if (window.innerWidth < 768 && isSticky) {
    const stickyHeader = document.getElementById("stickyHeader")
    if (stickyHeader) {
      stickyHeader.remove()
    }
    leftSidebar.classList.remove("profile-sticky")
    leftSidebar.style.width = ""
    profileImage.classList.remove("profile-image-hidden")
    nameSection.classList.remove("name-section-hidden")
    rightContent.style.height = ""
    rightContent.style.overflowY = ""
    isSticky = false
  }
})

closeModal.addEventListener("click", closeModalFunc)
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModalFunc()
  }
})

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  initTabs()
  initVideo()
})

// Dropdown functionality for mobile
const toggleBtn = document.getElementById("dropdownToggle")
const dropdown = document.getElementById("dropdownMenu")
const selected = document.getElementById("selectedOption")
const options = dropdown?.querySelectorAll(".dropdown-option")

if (toggleBtn && dropdown && selected && options) {
  // Default view: show all projects
  showPortfolioItems("all")

  // Highlight "All Projects" visually on load
  options.forEach((opt) => {
    if (opt.dataset.value === "all") {
      opt.classList.add("bg-black", "text-white")
    }
  })

  toggleBtn.addEventListener("click", () => {
    dropdown.classList.toggle("hidden")
  })

  options.forEach((option) => {
    option.addEventListener("click", () => {
      const selectedValue = option.dataset.value
      selected.textContent = option.textContent

      // Remove selection styles
      options.forEach((o) => o.classList.remove("bg-black", "text-white"))

      // Add style to selected option
      option.classList.add("bg-black", "text-white")

      // Update portfolio items
      showPortfolioItems(selectedValue)

      // Close dropdown
      dropdown.classList.add("hidden")
    })
  })

  // Close dropdown if clicked outside
  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target) && !toggleBtn.contains(e.target)) {
      dropdown.classList.add("hidden")
    }
  })
}
