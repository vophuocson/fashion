(function (window) {
  const CART_STORAGE_KEY = 'fashion-cart-items';

  function readCartItems() {
    if (!window.localStorage) {
      return [];
    }

    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.map((item) => ({
          ...item,
          quantity: Number.parseInt(item.quantity, 10) || 0,
          unitPrice: Number.parseInt(item.unitPrice, 10) || 0
        })).filter((item) => item.quantity > 0 && item.unitPrice >= 0);
      }
    } catch (error) {
      console.warn('Không thể đọc dữ liệu giỏ hàng:', error);
    }

    return [];
  }

  function persistCartItems(items) {
    if (!window.localStorage) {
      return;
    }

    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.warn('Không thể lưu dữ liệu giỏ hàng:', error);
    }
  }

  function addItemToCart(newItem) {
    const items = readCartItems();
    const existingIndex = items.findIndex((item) =>
      item.id === newItem.id &&
      item.size === newItem.size &&
      item.color === newItem.color
    );

    if (existingIndex > -1) {
      items[existingIndex].quantity += newItem.quantity;
    } else {
      items.push({ ...newItem });
    }

    persistCartItems(items);
    return items;
  }

  function updateItemQuantity(id, size, color, quantity) {
    const items = readCartItems();
    const target = items.find((item) =>
      item.id === id && item.size === size && item.color === color
    );

    if (!target) {
      return items;
    }

    if (quantity <= 0) {
      const filtered = items.filter((item) => !(item.id === id && item.size === size && item.color === color));
      persistCartItems(filtered);
      return filtered;
    }

    target.quantity = quantity;
    persistCartItems(items);
    return items;
  }

  function removeItem(id, size, color) {
    const items = readCartItems().filter((item) =>
      !(item.id === id && item.size === size && item.color === color)
    );
    persistCartItems(items);
    return items;
  }

  function clearCart() {
    if (!window.localStorage) {
      return;
    }

    try {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.warn('Không thể xóa dữ liệu giỏ hàng:', error);
    }
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  }

  function getCartTotals(items) {
    return items.reduce((totals, item) => {
      totals.itemCount += item.quantity;
      totals.subtotal += item.quantity * item.unitPrice;
      return totals;
    }, { itemCount: 0, subtotal: 0 });
  }

  window.cartUtils = {
    getCartItems: readCartItems,
    saveCartItems: persistCartItems,
    addItemToCart,
    updateItemQuantity,
    removeItem,
    clearCart,
    formatCurrency,
    getCartTotals
  };
})(window);
