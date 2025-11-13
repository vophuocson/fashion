const products = [
    { name: 'Áo blazer dáng dài', salePrice: '1.290.000₫', originalPrice: '1.690.000₫', description: 'Chất liệu tweed cao cấp, phối hợp cùng quần tây thanh lịch.' },
    { name: 'Đầm lụa midi', salePrice: '990.000₫', originalPrice: '1.290.000₫', description: 'Thiết kế nữ tính với chất liệu lụa mềm mại, tôn dáng.' },
    { name: 'Áo sơ mi họa tiết', salePrice: '590.000₫', originalPrice: '790.000₫', description: 'Gam màu pastel nhẹ nhàng phù hợp mọi hoàn cảnh.' },
    { name: 'Quần jeans ống suông', salePrice: '720.000₫', originalPrice: '890.000₫', description: 'Phom suông giúp hack dáng, dễ kết hợp cùng nhiều kiểu áo.' },
    { name: 'Áo khoác denim', salePrice: '860.000₫', originalPrice: '1.050.000₫', description: 'Phong cách năng động, phù hợp thời tiết chuyển mùa.' },
    { name: 'Chân váy xếp ly', salePrice: '540.000₫', originalPrice: '720.000₫', description: 'Độ dài midi, chất liệu thoáng mát, dễ phối đồ.' },
    { name: 'Áo len cổ lọ', salePrice: '630.000₫', originalPrice: '820.000₫', description: 'Len mịn êm, giữ ấm tốt cho những ngày se lạnh.' },
    { name: 'Áo khoác trench coat', salePrice: '1.450.000₫', originalPrice: '1.890.000₫', description: 'Form dáng chuẩn Âu, thiết kế cổ điển vượt thời gian.' },
    { name: 'Giày sneakers da', salePrice: '1.150.000₫', originalPrice: '1.350.000₫', description: 'Đệm êm ái, gam màu trung tính dễ phối trang phục.' },
    { name: 'Túi xách da mini', salePrice: '980.000₫', originalPrice: '1.250.000₫', description: 'Thiết kế tinh gọn, điểm nhấn kim loại sang trọng.' },
    { name: 'Áo hoodie oversize', salePrice: '650.000₫', originalPrice: '780.000₫', description: 'Chất vải nỉ dày dặn, thích hợp phong cách streetwear.' },
    { name: 'Bộ suit công sở', salePrice: '2.350.000₫', originalPrice: '2.790.000₫', description: 'Bộ suit 2 mảnh với phom dáng hiện đại, chất vải cao cấp.' },
    { name: 'Đầm body velvet', salePrice: '1.150.000₫', originalPrice: '1.480.000₫', description: 'Chất liệu nhung bóng sang trọng dành cho buổi tiệc tối.' },
    { name: 'Áo thun cổ tròn', salePrice: '320.000₫', originalPrice: '420.000₫', description: 'Cotton organic thoáng mát, logo in nổi bật.' },
    { name: 'Quần tây dáng slim', salePrice: '780.000₫', originalPrice: '920.000₫', description: 'Chất liệu chống nhăn, phù hợp mặc công sở hàng ngày.' },
    { name: 'Áo cardigan mỏng', salePrice: '580.000₫', originalPrice: '710.000₫', description: 'Len cotton nhẹ, phối màu pastel dịu dàng.' },
    { name: 'Giày cao gót mũi nhọn', salePrice: '1.050.000₫', originalPrice: '1.290.000₫', description: 'Cao 7cm, chất liệu da tổng hợp mềm mại.' },
    { name: 'Set đồ athleisure', salePrice: '1.050.000₫', originalPrice: '1.320.000₫', description: 'Set đồ thể thao phối màu thời thượng, co giãn tốt.' },
    { name: 'Túi tote canvas', salePrice: '420.000₫', originalPrice: '520.000₫', description: 'Thiết kế tối giản, phù hợp đi làm và đi học.' },
    { name: 'Áo khoác puffer nhẹ', salePrice: '1.280.000₫', originalPrice: '1.680.000₫', description: 'Trọng lượng nhẹ, khả năng giữ ấm cao cho mùa đông.' }
];

const productsPerPage = 9;
let currentPage = 1;

const productGrid = document.getElementById('productGrid');
const paginationNumbers = document.getElementById('paginationNumbers');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('navMenu');

function renderProducts(page = 1) {
    if (!productGrid) {
        return;
    }

    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    const items = products.slice(start, end);

    productGrid.innerHTML = items
        .map(
            product => `
            <article class="product-card" tabindex="0">
                <a class="product-link" href="product-detail.html">
                    <div class="product-image" aria-hidden="true">👗</div>
                    <div class="product-content">
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-pricing">
                            <span class="product-price">${product.salePrice}</span>
                            <span class="product-original-price">${product.originalPrice}</span>
                        </div>
                        <p class="product-description">${product.description}</p>
                    </div>
                </a>
            </article>
        `
        )
        .join('');
}

function renderPagination(totalPages) {
    if (!paginationNumbers) {
        return;
    }

    paginationNumbers.innerHTML = '';
    for (let page = 1; page <= totalPages; page += 1) {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = page;
        button.className = 'pagination-number';
        button.setAttribute('aria-label', `Đi tới trang ${page}`);
        if (page === currentPage) {
            button.setAttribute('aria-current', 'page');
        }
        button.addEventListener('click', () => {
            currentPage = page;
            updateView();
        });
        paginationNumbers.appendChild(button);
    }
}

function updatePaginationButtons(totalPages) {
    if (!prevPageBtn || !nextPageBtn) {
        return;
    }

    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
    prevPageBtn.classList.toggle('disabled', prevPageBtn.disabled);
    nextPageBtn.classList.toggle('disabled', nextPageBtn.disabled);
}

function updateView() {
    if (!productGrid) {
        return;
    }

    const totalPages = Math.ceil(products.length / productsPerPage);
    renderProducts(currentPage);
    renderPagination(totalPages);
    updatePaginationButtons(totalPages);
}

function initProductListing() {
    if (!productGrid) {
        return;
    }

    prevPageBtn?.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage -= 1;
            updateView();
        }
    });

    nextPageBtn?.addEventListener('click', () => {
        const totalPages = Math.ceil(products.length / productsPerPage);
        if (currentPage < totalPages) {
            currentPage += 1;
            updateView();
        }
    });

    updateView();
}

function initDetailInteractions() {
    const gallery = document.querySelector('.product-gallery');
    const mainImage = document.querySelector('.product-main-image img');
    const thumbnailButtons = document.querySelectorAll('[data-gallery-thumb]');
    const sizeButtons = document.querySelectorAll('[data-size-option]');
    const colorButtons = document.querySelectorAll('[data-color-option]');
    const quantityInput = document.querySelector('[data-quantity-input]');
    const decreaseBtn = document.querySelector('[data-quantity-decrease]');
    const increaseBtn = document.querySelector('[data-quantity-increase]');

    if (gallery && mainImage && thumbnailButtons.length) {
        thumbnailButtons.forEach(button => {
            button.addEventListener('click', () => {
                const newSrc = button.getAttribute('data-image-src');
                const newAlt = button.getAttribute('data-image-alt');

                if (newSrc) {
                    mainImage.src = newSrc;
                }
                if (newAlt) {
                    mainImage.alt = newAlt;
                }

                thumbnailButtons.forEach(item => item.classList.remove('is-active'));
                button.classList.add('is-active');
            });
        });
    }

    function handleToggle(buttons, activeClass) {
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                buttons.forEach(item => item.classList.remove(activeClass));
                button.classList.add(activeClass);
            });
        });
    }

    if (sizeButtons.length) {
        handleToggle(sizeButtons, 'is-selected');
    }

    if (colorButtons.length) {
        handleToggle(colorButtons, 'is-selected');
    }

    if (quantityInput && decreaseBtn && increaseBtn) {
        const minQuantity = Number(quantityInput.getAttribute('min')) || 1;
        decreaseBtn.addEventListener('click', () => {
            const current = Number(quantityInput.value) || minQuantity;
            const nextValue = Math.max(minQuantity, current - 1);
            quantityInput.value = nextValue;
        });

        increaseBtn.addEventListener('click', () => {
            const current = Number(quantityInput.value) || minQuantity;
            quantityInput.value = current + 1;
        });
    }
}

navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu?.classList.toggle('open');
});

initProductListing();
initDetailInteractions();
