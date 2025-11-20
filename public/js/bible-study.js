// public/js/bible-study.js

$(document).ready(function () {
  const DATA_PATH = "public/data/bible-study.json";
  let allStudyData = null;
  let currentContent = null;
  const ITEMS_PER_PAGE = 5;
  let totalPages = 0;
  let currentPage = 1;

  function paginateContent(page) {
    if (!currentContent) return;

    const paragraphs = currentContent
      .split("\n")
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const pageContent = paragraphs.slice(startIndex, endIndex);

    const htmlContent = pageContent.map((p) => `<p>${p}</p>`).join("");

    $("#mainContentText").html(htmlContent);

    renderPaginationControls(page, totalPages);

    $("#mainContentCard").scrollTop(0);

    console.log(`Displaying content page ${page} of ${totalPages}`);
  }

  function renderPaginationControls(activePage, totalPages) {
    const $paginationContainer = $(".pagination");
    $paginationContainer.empty();

    if (totalPages <= 1) {
      $(".pagination-container").hide();
      return;
    }

    $(".pagination-container").show();
    currentPage = activePage;

    $paginationContainer.append(`
            <li class="page-item ${activePage === 1 ? "disabled" : ""}">
                <a class="page-link" href="#" data-page="${
                  activePage - 1
                }" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
        `);

    for (let i = 1; i <= totalPages; i++) {
      $paginationContainer.append(`
                <li class="page-item ${i === activePage ? "active" : ""}">
                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                </li>
            `);
    }

    $paginationContainer.append(`
            <li class="page-item ${
              activePage === totalPages ? "disabled" : ""
            }">
                <a class="page-link" href="#" data-page="${
                  activePage + 1
                }" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        `);
  }

  function setContentAndPaginate(title, content) {
    $("#mainContentTitle").text(title);

    currentContent = content;
    const paragraphs = content
      .split("\n")
      .map((p) => p.trim())
      .filter((p) => p.length > 0);
    totalPages = Math.ceil(paragraphs.length / ITEMS_PER_PAGE);

    paginateContent(1);
  }

  function handlePostClick(event) {
    event.preventDefault();

    const $link = $(event.currentTarget);

    $("#latestPostsList a").removeClass("active");
    $link.addClass("active");

    const postTitle = $link.find("h6").text();
    const postContent = $link.data("content");

    if (postContent) {
      setContentAndPaginate(postTitle, postContent);
    }
  }

  function renderLatestPosts(posts) {
    const $listContainer = $("#latestPostsList");
    $listContainer.empty();

    if (posts && posts.length) {
      posts.forEach((post) => {
        const postHtml = `
                    <a href="#" class="list-group-item list-group-item-action border-0 pb-0 pt-2" data-content="${post.full_content}">
                        <h6 class="mb-1">${post.h}</h6>
                        <small class="text-muted">${post.d}</small>
                    </a>
                `;
        $listContainer.append(postHtml);
      });
      $("#latestPostsList a").on("click", handlePostClick);
    }
  }

  function loadStudy(studyId) {
    const study = allStudyData.studies.find((s) => s.id == studyId);
    if (study) {
      $("#mainStudyTitle").text(`${study.book} - Chapter ${study.chapter}`);

      renderLatestPosts(study.posts);

      if (study.posts.length > 0) {
        $("#latestPostsList a:first").click();
      }

      console.log("Study loaded:", study.title);
    } else {
      console.error("Study not found for ID:", studyId);
    }
  }

  $(".pagination-container").on("click", ".page-link", function (e) {
    e.preventDefault();
    const newPage = parseInt($(this).data("page"));

    if (newPage > 0 && newPage <= totalPages) {
      paginateContent(newPage);
    }
  });

  function initializeDropdown(studies) {
    const $select = $("#selectStudy");
    $select.empty();
    $select.append('<option selected value="0">Select a Study</option>');

    studies.forEach((study) => {
      $select.append(
        `<option value="${study.id}">${study.book} Chapter ${study.chapter}: ${study.title}</option>`
      );
    });

    $select.on("change", function () {
      const selectedId = $(this).val();
      if (selectedId != "0") {
        loadStudy(selectedId);
      }
    });
  }

  $.getJSON(DATA_PATH)
    .done(function (data) {
      allStudyData = data;

      $(".main-title-section h1").text(data.title || "Bible Study");
      initializeDropdown(data.studies);

      if (data.studies.length > 0) {
        $("#selectStudy").val(data.studies[0].id);
        loadStudy(data.studies[0].id);
      } else {
        $("#mainContentText").html("<p>No studies found in the data file.</p>");
      }

      console.log("Bible study data loaded successfully!");
    })
    .fail(function (jqxhr, textStatus, error) {
      const err = textStatus + ", " + error;
      console.error("Request Failed: " + err);
    });
});
