document.addEventListener("DOMContentLoaded", () => {
  const sermonDataUrl = "public/data/preaching.json";
  const cardsContainer = document.querySelector(
    ".row.row-cols-1.row-cols-md-2.row-cols-lg-3.g-4"
  );
  const paginationContainer = document.querySelector(".pagination");
  const searchInput = document.getElementById("searchSermon");
  const bookSelect = document.getElementById("bookSelect");
  const dateInput = document.getElementById("dateSelect");
  const searchButton = document.querySelector(
    ".btn.btn-outline-red.btn-audio.text-uppercase"
  );

  let allSermons = [];
  let filteredSermons = [];
  let currentPage = 1;
  const cardsPerPage = 6;

  const populateBookOptions = (sermons) => {
    if (!bookSelect) return;

    const books = new Set(sermons.map((s) => s.book).filter((b) => b));

    bookSelect.innerHTML = '<option selected value="-Any-">-Any-</option>';

    books.forEach((book) => {
      const option = document.createElement("option");
      option.value = book;
      option.textContent = book;
      bookSelect.appendChild(option);
    });
  };

  const createSermonCard = (sermon) => {
    const audioButton = sermon.hasAudio
      ? `<a href="#" class="btn btn-red btn-audio">DOWNLOAD AUDIO</a>`
      : "";
    const videoButton = sermon.hasVideo
      ? `<a href="#" class="btn btn-red btn-video">DOWNLOAD VIDEO</a>`
      : "";

    const dateOptions = { year: "numeric", month: "short", day: "numeric" };
    const dateObj = new Date(sermon.date);
    const formattedDate = isNaN(dateObj.getTime())
      ? "Date Unavailable"
      : dateObj.toLocaleDateString("en-US", dateOptions);

    return `
            <div class="col">
                <div class="sermon-card">
                    <div class="sermon-card-image">
                        <i class="fa-solid fa-camera-retro"></i>
                    </div>
                    <div class="sermon-card-body">
                        <div class="title">${sermon.title}</div>
                        
                        <div class="small fw-bold text-uppercase mb-1">${
                          sermon.book || "N/A"
                        }</div>
                        <div class="small text-muted mb-2">Preached: ${formattedDate}</div>
                        
                        <p class="text-muted small mb-3">${sermon.excerpt}</p>
                        ${audioButton}
                        ${videoButton}
                    </div>
                </div>
            </div>
        `;
  };

  const renderCards = () => {
    if (!cardsContainer) return;

    cardsContainer.innerHTML = "";

    const start = (currentPage - 1) * cardsPerPage;
    const end = start + cardsPerPage;
    const sermonsToRender = filteredSermons.slice(start, end);

    if (sermonsToRender.length === 0) {
      cardsContainer.innerHTML =
        '<p class="text-center text-muted w-100 p-5">No sermons found matching your criteria.</p>';
      return;
    }

    sermonsToRender.forEach((sermon) => {
      const cardHtml = createSermonCard(sermon);
      cardsContainer.insertAdjacentHTML("beforeend", cardHtml);
    });
  };

  const renderPagination = () => {
    if (!paginationContainer) return;

    paginationContainer.innerHTML = "";
    const totalPages = Math.ceil(filteredSermons.length / cardsPerPage);

    if (totalPages <= 1) return;

    for (let i = 1; i <= totalPages; i++) {
      const isActive = i === currentPage ? "active" : "";
      const pageItem = `
                <li class="page-item ${isActive}">
                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                </li>
            `;
      paginationContainer.insertAdjacentHTML("beforeend", pageItem);
    }
  };

  paginationContainer.addEventListener("click", (e) => {
    if (e.target.dataset.page) {
      e.preventDefault();
      currentPage = parseInt(e.target.dataset.page);
      renderCards();
      renderPagination();
    }
  });

  const applyFilters = () => {
    const searchText = searchInput ? searchInput.value.toLowerCase() : "";
    const bookFilter = bookSelect ? bookSelect.value : "-Any-";
    const dateFilter = dateInput ? dateInput.value : "";

    filteredSermons = allSermons.filter((sermon) => {
      const textMatch =
        sermon.title.toLowerCase().includes(searchText) ||
        sermon.excerpt.toLowerCase().includes(searchText);

      const bookMatch = bookFilter === "-Any-" || sermon.book === bookFilter;

      const dateMatch = dateFilter === "" || sermon.date === dateFilter;

      return textMatch && bookMatch && dateMatch;
    });

    currentPage = 1;
    renderCards();
    renderPagination();
  };

  const handleFilterEvent = (e) => {
    if (
      e.target.tagName === "BUTTON" ||
      (e.key === "Enter" && e.target === searchInput)
    ) {
      e.preventDefault();
      applyFilters();
    } else if (e.target === bookSelect) {
      applyFilters();
    }
  };

  if (searchButton) searchButton.addEventListener("click", handleFilterEvent);
  if (searchInput) searchInput.addEventListener("keypress", handleFilterEvent);
  if (bookSelect) bookSelect.addEventListener("change", handleFilterEvent);

  const initialize = async () => {
    try {
      const response = await fetch(sermonDataUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      allSermons = await response.json();

      populateBookOptions(allSermons);

      filteredSermons = allSermons;

      renderCards();
      renderPagination();
    } catch (error) {
      console.error("Error initializing sermon data:", error);
      if (cardsContainer) {
        cardsContainer.innerHTML =
          '<p class="text-danger">Failed to load sermons. Please check the console for details.</p>';
      }
    }
  };

  initialize();
});
