async function loadComponent(elementId, filePath) {
  try {
    console.log("🔄 Loading:", filePath);
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    const element = document.getElementById(elementId);

    if (element) {
      element.innerHTML = html;
      console.log("✅ Successfully loaded:", filePath);
      return true;
    } else {
      throw new Error(`Element #${elementId} not found`);
    }
  } catch (error) {
    console.error("❌ Error loading component:", error.message);
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = `
                        <div style="background: #f8d7da; color: #721c24; padding: 15px; text-align: center;">
                            <strong>Error loading ${filePath}</strong><br>
                            <small>${error.message}</small>
                        </div>
                    `;
    }
    return false;
  }
}

function updateCurrentYear() {
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
    console.log("✅ Current year updated to:", yearElement.textContent);
  } else {
    console.log("⚠️ Year element not found yet, will retry...");
    setTimeout(updateCurrentYear, 100);
  }
}

async function initializePage() {
  console.log("🚀 Starting page initialization...");

  const headerSuccess = await loadComponent(
    "header",
    "public/components/header.html"
  );
  const footerSuccess = await loadComponent(
    "footer",
    "public/components/footer.html"
  );

  if (footerSuccess) {
    setTimeout(updateCurrentYear, 50);
  }

  console.log("🎉 Page initialization complete!");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializePage);
} else {
  initializePage();
}
