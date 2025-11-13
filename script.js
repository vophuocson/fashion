const products = [
  {
    name: "Đầm satin cổ V",
    originalPrice: 1599000,
    salePrice: 1199000,
  },
  {
    name: "Áo blazer dáng suông",
    originalPrice: 1899000,
    salePrice: 1399000,
  },
  {
    name: "Quần jeans ống đứng",
    originalPrice: 999000,
    salePrice: 799000,
  },
  {
    name: "Áo thun basic logo",
    originalPrice: 399000,
    salePrice: 299000,
  },
  {
    name: "Chân váy midi xếp ly",
    originalPrice: 899000,
    salePrice: 689000,
  },
  {
    name: "Áo sơ mi linen",
    originalPrice: 799000,
    salePrice: 599000,
  },
  {
    name: "Giày sneakers da",
    originalPrice: 2199000,
    salePrice: 1699000,
  },
  {
    name: "Túi xách chữ nhật",
    originalPrice: 1599000,
    salePrice: 1299000,
  },
  {
    name: "Áo khoác gió unisex",
    originalPrice: 1299000,
    salePrice: 999000,
  },
  {
    name: "Đầm dạ hội ánh kim",
    originalPrice: 2599000,
    salePrice: 1999000,
  },
  {
    name: "Quần tây dáng slim",
    originalPrice: 1099000,
    salePrice: 859000,
  },
  {
    name: "Áo len cổ lọ",
    originalPrice: 899000,
    salePrice: 699000,
  },
  {
    name: "Áo khoác dạ dáng dài",
    originalPrice: 2799000,
    salePrice: 2199000,
  },
  {
    name: "Sneakers chunky",
    originalPrice: 2399000,
    salePrice: 1899000,
  },
  {
    name: "Áo hoodie oversize",
    originalPrice: 899000,
    salePrice: 659000,
  },
  {
    name: "Quần short thể thao",
    originalPrice: 599000,
    salePrice: 449000,
  },
  {
    name: "Áo polo kẻ sọc",
    originalPrice: 649000,
    salePrice: 499000,
  },
  {
    name: "Túi đeo chéo mini",
    originalPrice: 799000,
    salePrice: 599000,
  },
];

const ITEMS_PER_PAGE = 9;
let currentPage = 1;

const productGrid = document.getElementById("product-grid");
const prevPageButton = document.getElementById("prev-page");
const nextPageButton = document.getElementById("next-page");
const pageNumbersContainer = document.getElementById("page-numbers");
const currentYearEl = document.getElementById("current-year");
const searchForm = document.querySelector(".search-form");

const formatCurrency = (value) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(value);

function renderProducts() {
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const productsForPage = products.slice(startIndex, endIndex);

  productGrid.innerHTML = productsForPage
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-image">New Arrival</div>
          <div class="product-content">
            <div class="product-name">${product.name}</div>
            <div class="product-pricing">
              <span class="sale-price">${formatCurrency(
                product.salePrice
              )}</span>
              <span class="original-price">${formatCurrency(
                product.originalPrice
              )}</span>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function renderPagination() {
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  pageNumbersContainer.innerHTML = "";

  for (let page = 1; page <= totalPages; page += 1) {
    const button = document.createElement("button");
    button.className = "page-number";
    button.textContent = page;
    button.setAttribute("aria-label", `Trang ${page}`);

    if (page === currentPage) {
      button.classList.add("active");
      button.setAttribute("aria-current", "page");
    }

    button.addEventListener("click", () => {
      currentPage = page;
      updateView();
    });

    pageNumbersContainer.appendChild(button);
  }

  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = currentPage === totalPages;
}

function updateView() {
  renderProducts();
  renderPagination();
}

if (searchForm) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}

prevPageButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage -= 1;
    updateView();
  }
});

nextPageButton.addEventListener("click", () => {
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  if (currentPage < totalPages) {
    currentPage += 1;
    updateView();
  }
});

currentYearEl.textContent = new Date().getFullYear();

updateView();
