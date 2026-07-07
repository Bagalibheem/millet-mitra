// ==========================================================================
// Millet Mitra - JavaScript Engine
// ==========================================================================

// --- Millet Products Catalog Data ---
const MILLET_PRODUCTS = [
    {
        id: "p1",
        name: "Organic Barnyard Millet",
        category: "grains",
        tag: "Whole Grain",
        desc: "Rich in dietary fiber and highly digestible protein.Sourced from rain-fed natural hills, making it a perfect low-glycemic rice substitute.",
        price: 180,
        weight: "1 kg",
        benefits: "Rich in Fiber & Iron",
        image: "assets/millet.jpg" // Sourced from local generated image
    },
    {
        id: "p2",
        name: "Foxtail Millet Whole Grains",
        category: "grains",
        tag: "Superfood",
        desc: "Packed with energy-releasing carbohydrates, Vitamin B12, and calcium. Cultivated naturally using sustainable ancestral methods.",
        price: 160,
        weight: "1 kg",
        benefits: "Heart & Nerve Health",
        image: "assets/millet.jpg"
    },
    {
        id: "p3",
        name: "Finger Millet (Premium Ragi)",
        category: "grains",
        tag: "High Calcium",
        desc: "A natural powerhouse of calcium and essential amino acids. Excellent for growing infants, bone density, and gluten-free diets.",
        price: 120,
        weight: "1 kg",
        benefits: "Bone Density & Strength",
        image: "assets/millet.jpg"
    },
    {
        id: "p4",
        name: "Pearl Millet (Organic Bajra)",
        category: "grains",
        tag: "Traditional",
        desc: "High-protein, iron-rich grain that naturally cools the body in summer and provides sustained warmth and energy in winter.",
        price: 130,
        weight: "1 kg",
        benefits: "High Iron & Oxygen",
        image: "assets/millet.jpg"
    },
    {
        id: "p5",
        name: "Kodo Millet Natural Grains",
        category: "grains",
        tag: "Mineral Rich",
        desc: "An ancient grain containing high levels of lecithin, beneficial for strengthening nervous systems and blood purification.",
        price: 175,
        weight: "1 kg",
        benefits: "Purifying & Strengthening",
        image: "assets/millet.jpg"
    },
    {
        id: "p6",
        name: "Organic Sorghum (Jowar Flakes)",
        category: "flakes",
        tag: "Breakfast Flakes",
        desc: "Crispy, double-milled sorghum flakes. Light on stomach, high in potassium and dietary fibers. Perfect cereal swap.",
        price: 145,
        weight: "500g",
        benefits: "Digestive Support",
        image: "assets/millet.jpg"
    },
    {
        id: "p7",
        name: "Little Millet Baking Flour",
        category: "flour",
        tag: "Fine Flour",
        desc: "100% stone-ground flour from natural Little Millets. High antioxidant content, rich in zinc and perfect for baking rotis or cakes.",
        price: 110,
        weight: "500g",
        benefits: "Antioxidant Powerhouse",
        image: "assets/millet.jpg"
    },
    {
        id: "p8",
        name: "Millet Muesli & Berries",
        category: "flakes",
        tag: "Granola Mix",
        desc: "Sustainably-grown multi-millet flakes mixed with natural forest honey, crunchy almonds, and wild dried berries.",
        price: 240,
        weight: "500g",
        benefits: "Instant Healthy Energy",
        image: "assets/millet.jpg"
    }
];

// --- Mock Orders to Seed Dashboard (Runs if empty) ---
const MOCK_ORDERS = [
    {
        id: "MM-7491",
        timestamp: "2026-07-06 14:32",
        customer: {
            name: "Ananya Sen",
            phone: "9830012345",
            email: "ananya@gmail.com",
            address: "Flat 4B, Greenwood Apts, Koramangala",
            city: "Bengaluru",
            zip: "560034",
            notes: "Please call 10 mins before arrival."
        },
        items: [
            { id: "p3", name: "Finger Millet (Premium Ragi)", price: 120, weight: "1 kg", quantity: 2 },
            { id: "p1", name: "Organic Barnyard Millet", price: 180, weight: "1 kg", quantity: 1 }
        ],
        subtotal: 420,
        shipping: 50,
        total: 470,
        status: "pending"
    },
    {
        id: "MM-9102",
        timestamp: "2026-07-05 09:15",
        customer: {
            name: "Dr. Vikram Seth",
            phone: "9444056789",
            email: "vikram.seth@health.org",
            address: "32, Temple Road, Alwarpet",
            city: "Chennai",
            zip: "600018",
            notes: "Deliver in the morning hours."
        },
        items: [
            { id: "p2", name: "Foxtail Millet Whole Grains", price: 160, weight: "1 kg", quantity: 3 },
            { id: "p8", name: "Millet Muesli & Berries", price: 240, weight: "500g", quantity: 1 }
        ],
        subtotal: 720,
        shipping: 0,
        total: 720,
        status: "completed"
    }
];

// --- App State ---
let cart = [];
let orders = [];
let currentCategory = "all";
let currentDashboardStatusFilter = "all";
let dashboardSearchQuery = "";

// --- DOM Cache Elements ---
const productsGrid = document.getElementById("productsGrid");
const categoryFilters = document.getElementById("categoryFilters");
const cartBtn = document.getElementById("cartBtn");
const cartCount = document.getElementById("cartCount");
const cartCountHeader = document.getElementById("cartCountHeader");
const cartDrawer = document.getElementById("cartDrawer");
const cartDrawerOverlay = document.getElementById("cartDrawerOverlay");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartItemsContainer = document.getElementById("cartItems");
const emptyCartView = document.getElementById("emptyCartView");
const cartFooter = document.getElementById("cartFooter");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartShipping = document.getElementById("cartShipping");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");
const continueBtn = document.getElementById("continueBtn");

// Mobile Drawer Elements
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileDrawer = document.getElementById("mobileDrawer");
const closeDrawerBtn = document.getElementById("closeDrawerBtn");
const drawerLinks = document.querySelectorAll(".drawer-link");

// Modal Elements
const checkoutModal = document.getElementById("checkoutModal");
const closeCheckoutBtn = document.getElementById("closeCheckoutBtn");
const checkoutForm = document.getElementById("checkoutForm");
const checkoutSummaryItems = document.getElementById("checkoutSummaryItems");
const checkoutSubtotal = document.getElementById("checkoutSubtotal");
const checkoutShipping = document.getElementById("checkoutShipping");
const checkoutTotal = document.getElementById("checkoutTotal");

const successModal = document.getElementById("successModal");
const successOrderId = document.getElementById("successOrderId");
const successCloseBtn = document.getElementById("successCloseBtn");

// Merchant Portal Elements
const merchantLink = document.getElementById("merchantLink");
const merchantLoginModal = document.getElementById("merchantLoginModal");
const closeMerchantModalBtn = document.getElementById("closeMerchantModalBtn");
const merchantLoginForm = document.getElementById("merchantLoginForm");
const merchantPin = document.getElementById("merchantPin");
const loginErrorMsg = document.getElementById("loginErrorMsg");
const merchantSection = document.getElementById("merchant");
const logoutMerchantBtn = document.getElementById("logoutMerchantBtn");

// Dashboard DOM Elements
const statTotalOrders = document.getElementById("statTotalOrders");
const statTotalRevenue = document.getElementById("statTotalRevenue");
const statPendingOrders = document.getElementById("statPendingOrders");
const statTopProduct = document.getElementById("statTopProduct");
const ordersTableBody = document.getElementById("ordersTableBody");
const emptyInbox = document.getElementById("emptyInbox");
const statusTabs = document.getElementById("statusTabs");
const orderSearchInput = document.getElementById("orderSearchInput");
const exportCsvBtn = document.getElementById("exportCsvBtn");
const exportJsonBtn = document.getElementById("exportJsonBtn");

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
    initLocalData();
    renderProducts();
    updateCartUI();
    setupEventListeners();
});

// Seed orders if empty in local storage
function initLocalData() {
    // Load cart
    const savedCart = localStorage.getItem("millet_cart");
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    // Load orders
    const savedOrders = localStorage.getItem("millet_mitra_orders");
    if (savedOrders) {
        orders = JSON.parse(savedOrders);
    } else {
        orders = [...MOCK_ORDERS];
        localStorage.setItem("millet_mitra_orders", JSON.stringify(orders));
    }
}

// Save data helper
function saveCartToStorage() {
    localStorage.setItem("millet_cart", JSON.stringify(cart));
}
function saveOrdersToStorage() {
    localStorage.setItem("millet_mitra_orders", JSON.stringify(orders));
}

// --- Storefront Logic ---

// Render products dynamically
function renderProducts() {
    if (!productsGrid) return;
    productsGrid.innerHTML = "";

    const filtered = currentCategory === "all" 
        ? MILLET_PRODUCTS 
        : MILLET_PRODUCTS.filter(p => p.category === currentCategory);

    if (filtered.length === 0) {
        productsGrid.innerHTML = `<div class="loading-spinner"><i class="fa-solid fa-seedling"></i> No products in this category yet.</div>`;
        return;
    }

    filtered.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <div class="product-img-wrapper">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <span class="product-badge">${product.tag}</span>
            </div>
            <div class="product-info">
                <span class="product-tag">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <span class="product-benefits"><i class="fa-solid fa-shield-heart"></i> ${product.benefits}</span>
                <p class="product-desc">${product.desc}</p>
                <div class="product-footer">
                    <div class="product-price-box">
                        <span class="product-price">₹${product.price}</span>
                        <span class="product-weight">Pack: ${product.weight}</span>
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart('${product.id}')" aria-label="Add to cart">
                        <i class="fa-solid fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// Global functions for cart operations (attached to window for onclick)
window.addToCart = (productId) => {
    const product = MILLET_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            weight: product.weight,
            quantity: 1
        });
    }

    saveCartToStorage();
    updateCartUI();
    openCartDrawer();
    
    // Add micro animation to cart icon
    cartBtn.classList.add("pulse-anim");
    setTimeout(() => cartBtn.classList.remove("pulse-anim"), 500);
};

window.updateCartQuantity = (productId, delta) => {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== productId);
    }

    saveCartToStorage();
    updateCartUI();
};

window.removeFromCart = (productId) => {
    cart = cart.filter(i => i.id !== productId);
    saveCartToStorage();
    updateCartUI();
};

// Update cart counter and drawer rendering
function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;
    cartCountHeader.textContent = totalCount;

    if (cart.length === 0) {
        emptyCartView.classList.remove("hidden");
        cartFooter.classList.add("hidden");
        cartItemsContainer.innerHTML = "";
        return;
    }

    emptyCartView.classList.add("hidden");
    cartFooter.classList.remove("hidden");

    cartItemsContainer.innerHTML = "";
    cart.forEach(item => {
        const itemRow = document.createElement("div");
        itemRow.className = "cart-item";
        itemRow.innerHTML = `
            <img src="assets/millet.jpg" alt="${item.name}" class="cart-item-img">
            <div class="cart-item-details">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-weight">Pack: ${item.weight}</p>
                <span class="cart-item-price">₹${item.price}</span>
            </div>
            <div class="quantity-control">
                <button class="quantity-btn" onclick="updateCartQuantity('${item.id}', -1)"><i class="fa-solid fa-minus"></i></button>
                <span class="quantity-val">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateCartQuantity('${item.id}', 1)"><i class="fa-solid fa-plus"></i></button>
            </div>
            <button class="remove-item-btn" onclick="removeFromCart('${item.id}')" aria-label="Remove item">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        `;
        cartItemsContainer.appendChild(itemRow);
    });

    // Subtotals
    const subtotal = getCartTotal();
    cartSubtotal.textContent = `₹${subtotal}`;
    
    // Free shipping above 499
    if (subtotal >= 499) {
        cartShipping.textContent = "FREE";
        cartShipping.className = "summary-value text-green";
        cartTotal.textContent = `₹${subtotal}`;
    } else {
        cartShipping.textContent = "₹50";
        cartShipping.className = "summary-value";
        cartTotal.textContent = `₹${subtotal + 50}`;
    }
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function openCartDrawer() {
    cartDrawer.classList.add("open");
}

function closeCartDrawer() {
    cartDrawer.classList.remove("open");
}

// --- Checkout Modal Setup ---
function showCheckoutModal() {
    if (cart.length === 0) return;
    closeCartDrawer();
    checkoutModal.classList.remove("hidden");

    // Populate order summary
    checkoutSummaryItems.innerHTML = "";
    cart.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "summary-item-row";
        itemDiv.innerHTML = `
            <span>${item.name} <strong>x ${item.quantity}</strong></span>
            <span>₹${item.price * item.quantity}</span>
        `;
        checkoutSummaryItems.appendChild(itemDiv);
    });

    const subtotal = getCartTotal();
    const shipping = subtotal >= 499 ? 0 : 50;
    
    checkoutSubtotal.textContent = `₹${subtotal}`;
    checkoutShipping.textContent = shipping === 0 ? "FREE" : `₹${shipping}`;
    checkoutTotal.textContent = `₹${subtotal + shipping}`;
}

function closeCheckoutModal() {
    checkoutModal.classList.add("hidden");
    checkoutForm.reset();
}

// Handle Order Submission
function handleCheckoutFormSubmit(e) {
    e.preventDefault();
    if (cart.length === 0) return;

    const subtotal = getCartTotal();
    const shipping = subtotal >= 499 ? 0 : 50;
    const finalTotal = subtotal + shipping;

    // Create Order Object
    const newOrderId = "MM-" + Math.floor(1000 + Math.random() * 9000);
    const date = new Date();
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

    const newOrder = {
        id: newOrderId,
        timestamp: dateStr,
        customer: {
            name: document.getElementById("custName").value.trim(),
            phone: document.getElementById("custPhone").value.trim(),
            email: document.getElementById("custEmail").value.trim() || "N/A",
            address: document.getElementById("custAddress").value.trim(),
            city: document.getElementById("custCity").value.trim(),
            zip: document.getElementById("custZip").value.trim(),
            notes: document.getElementById("custNotes").value.trim() || "No instructions"
        },
        items: [...cart],
        subtotal: subtotal,
        shipping: shipping,
        total: finalTotal,
        status: "pending"
    };

    // Store Order
    orders.unshift(newOrder); // Add to beginning of array
    saveOrdersToStorage();

    // Generate WhatsApp message and redirect
    const whatsappNumber = "919663218314"; // Country code 91 + number 9663218314
    let messageText = `🌿 *Millet Mitra - New Order Request*\n`;
    messageText += `---------------------------------------\n`;
    messageText += `*Order ID:* ${newOrderId}\n`;
    messageText += `*Date:* ${dateStr}\n\n`;
    
    messageText += `👤 *Customer Details:*\n`;
    messageText += `- *Name:* ${newOrder.customer.name}\n`;
    messageText += `- *Phone:* ${newOrder.customer.phone}\n`;
    messageText += `- *Email:* ${newOrder.customer.email}\n`;
    messageText += `- *Address:* ${newOrder.customer.address}, ${newOrder.customer.city} (${newOrder.customer.zip})\n`;
    messageText += `- *Notes:* ${newOrder.customer.notes}\n\n`;
    
    messageText += `🌾 *Ordered Items:*\n`;
    newOrder.items.forEach(item => {
        messageText += `- ${item.name} (${item.weight}) x ${item.quantity} - ₹${item.price * item.quantity}\n`;
    });
    messageText += `\n`;
    messageText += `---------------------------------------\n`;
    messageText += `*Items Subtotal:* ₹${newOrder.subtotal}\n`;
    messageText += `*Delivery Fee:* ${newOrder.shipping === 0 ? 'FREE' : '₹50'}\n`;
    messageText += `*Total Amount Payable:* ₹${newOrder.total}\n`;
    messageText += `---------------------------------------\n`;
    messageText += `Thank you for sourcing natural grains! Please confirm my order request.`;

    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');

    // Reset Cart
    cart = [];
    saveCartToStorage();
    updateCartUI();

    // Close checkout and show success
    closeCheckoutModal();
    successOrderId.textContent = newOrderId;
    successModal.classList.remove("hidden");

    // Re-render merchant dashboard if it's currently loaded
    if (isMerchantLoggedIn()) {
        renderDashboard();
    }
}

// --- Merchant Dashboard (Secure Access) ---

function isMerchantLoggedIn() {
    return sessionStorage.getItem("merchant_auth") === "true";
}

function handleMerchantClick() {
    if (isMerchantLoggedIn()) {
        switchToMerchantSection();
    } else {
        merchantLoginModal.classList.remove("hidden");
    }
}

function handleMerchantLogin(e) {
    e.preventDefault();
    const pin = merchantPin.value.trim();

    if (pin === "8314") {
        sessionStorage.setItem("merchant_auth", "true");
        merchantLoginModal.classList.add("hidden");
        loginErrorMsg.classList.add("hidden");
        merchantPin.value = "";
        switchToMerchantSection();
    } else {
        loginErrorMsg.classList.remove("hidden");
        merchantPin.value = "";
        merchantPin.focus();
    }
}

function logoutMerchant() {
    sessionStorage.removeItem("merchant_auth");
    switchToStorefrontSection();
}

// SPA Routing inside page
function switchToMerchantSection() {
    // Hide customer page layouts
    document.getElementById("home").classList.add("hidden");
    document.getElementById("about").classList.add("hidden");
    document.getElementById("products").classList.add("hidden");
    
    // Show merchant portal
    merchantSection.classList.remove("hidden");
    document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));
    document.getElementById("merchantLink").classList.add("active");

    renderDashboard();
    
    // Scroll to dashboard top
    merchantSection.scrollIntoView({ behavior: 'smooth' });
}

function switchToStorefrontSection() {
    // Show normal pages
    document.getElementById("home").classList.remove("hidden");
    document.getElementById("about").classList.remove("hidden");
    document.getElementById("products").classList.remove("hidden");
    
    // Hide merchant section
    merchantSection.classList.add("hidden");
    
    // Set first nav link active
    document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));
    document.querySelector('.nav-link[href="#home"]').classList.add("active");
}

// Render Merchant Dashboard Data
function renderDashboard() {
    if (!merchantSection || merchantSection.classList.contains("hidden")) return;

    // 1. Calculate and update stats
    const totalOrdersCount = orders.length;
    const pendingOrdersCount = orders.filter(o => o.status === "pending").length;
    const completedOrders = orders.filter(o => o.status === "completed");
    
    // Calculate total estimated revenue (all valid orders except cancelled ones)
    const revenueTotal = orders
        .filter(o => o.status !== "cancelled")
        .reduce((sum, o) => sum + o.total, 0);

    // Calculate top selling variety
    const productCounts = {};
    orders.forEach(o => {
        if (o.status !== "cancelled") {
            o.items.forEach(item => {
                productCounts[item.name] = (productCounts[item.name] || 0) + item.quantity;
            });
        }
    });

    let topProduct = "-";
    let maxQty = 0;
    for (const [name, qty] of Object.entries(productCounts)) {
        if (qty > maxQty) {
            maxQty = qty;
            topProduct = name.replace("Organic ", "").replace(" Whole Grains", "");
        }
    }

    statTotalOrders.textContent = totalOrdersCount;
    statTotalRevenue.textContent = `₹${revenueTotal}`;
    statPendingOrders.textContent = pendingOrdersCount;
    statTopProduct.textContent = topProduct !== "-" ? `${topProduct} (${maxQty} kg)` : "-";

    // 2. Render Orders Table
    ordersTableBody.innerHTML = "";

    // Filter and search
    let filteredOrders = orders;
    
    if (currentDashboardStatusFilter !== "all") {
        filteredOrders = filteredOrders.filter(o => o.status === currentDashboardStatusFilter);
    }

    if (dashboardSearchQuery) {
        const query = dashboardSearchQuery.toLowerCase();
        filteredOrders = filteredOrders.filter(o => {
            return o.id.toLowerCase().includes(query) || 
                   o.customer.name.toLowerCase().includes(query) ||
                   o.customer.phone.includes(query) ||
                   o.customer.city.toLowerCase().includes(query);
        });
    }

    if (filteredOrders.length === 0) {
        emptyInbox.classList.remove("hidden");
        ordersTableBody.parentElement.classList.add("hidden");
        return;
    }

    emptyInbox.classList.add("hidden");
    ordersTableBody.parentElement.classList.remove("hidden");

    filteredOrders.forEach(order => {
        const tr = document.createElement("tr");
        
        // Format Items list
        const itemsListHtml = order.items.map(item => `
            <li><strong>${item.name}</strong> (${item.weight}) x ${item.quantity}</li>
        `).join("");

        // Build Status Badge
        const statusBadge = `<span class="status-badge ${order.status}">${order.status}</span>`;

        // Render Row
        tr.innerHTML = `
            <td class="order-id-cell">${order.id}</td>
            <td class="order-date-cell">${order.timestamp}</td>
            <td class="customer-info-cell">
                <p><strong>${order.customer.name}</strong></p>
                <p class="phone"><i class="fa-solid fa-phone text-sm"></i> ${order.customer.phone}</p>
                <p class="address"><i class="fa-solid fa-house text-sm"></i> ${order.customer.address}, ${order.customer.city} (${order.customer.zip})</p>
                ${order.customer.notes ? `<p class="address text-sm italic">Note: "${order.customer.notes}"</p>` : ''}
            </td>
            <td class="ordered-grains-cell">
                <ul>${itemsListHtml}</ul>
            </td>
            <td class="total-price">₹${order.total}</td>
            <td>${statusBadge}</td>
            <td class="actions-cell">
                ${order.status === 'pending' ? `
                    <button class="action-btn complete" onclick="updateOrderStatus('${order.id}', 'completed')" title="Mark as Completed">
                        <i class="fa-solid fa-check"></i>
                    </button>
                    <button class="action-btn cancel" onclick="updateOrderStatus('${order.id}', 'cancelled')" title="Cancel Order">
                        <i class="fa-solid fa-ban"></i>
                    </button>
                ` : ''}
                <button class="action-btn delete" onclick="deleteOrder('${order.id}')" title="Delete from Local Inbox">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
        `;
        ordersTableBody.appendChild(tr);
    });
}

// Global actions for order updates
window.updateOrderStatus = (orderId, newStatus) => {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    order.status = newStatus;
    saveOrdersToStorage();
    renderDashboard();
};

window.deleteOrder = (orderId) => {
    if (confirm(`Are you sure you want to permanently delete order ${orderId} from your local dashboard?`)) {
        orders = orders.filter(o => o.id !== orderId);
        saveOrdersToStorage();
        renderDashboard();
    }
};

// CSV Export logic
function exportOrdersToCSV() {
    if (orders.length === 0) {
        alert("No orders to export!");
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Order ID,Date/Time,Customer Name,Phone,Email,Address,City,Zip,Subtotal,Shipping,Total,Status,Items Ordered\n";

    orders.forEach(o => {
        const itemsSummary = o.items.map(item => `${item.name} (${item.quantity}x${item.weight})`).join(" | ");
        const row = [
            o.id,
            o.timestamp,
            `"${o.customer.name.replace(/"/g, '""')}"`,
            o.customer.phone,
            o.customer.email,
            `"${o.customer.address.replace(/"/g, '""')}"`,
            o.customer.city,
            o.customer.zip,
            o.subtotal,
            o.shipping,
            o.total,
            o.status,
            `"${itemsSummary}"`
        ].join(",");
        csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `MilletMitra_OrderRequests_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// JSON Export logic
function exportOrdersToJSON() {
    if (orders.length === 0) {
        alert("No orders to export!");
        return;
    }

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(orders, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", dataStr);
    link.setAttribute("download", `MilletMitra_OrderRequests_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// --- Event Listeners Mapping ---
function setupEventListeners() {
    // 1. Header scroll effect
    window.addEventListener("scroll", () => {
        const header = document.querySelector(".main-header");
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // 2. Navigation active link tracking & SPA behavior
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetSectionId = link.getAttribute("href");
            
            // Handle active class
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            if (targetSectionId === "#merchant") {
                e.preventDefault();
                handleMerchantClick();
            } else {
                switchToStorefrontSection();
            }
        });
    });

    // 3. Category Filters (Products Catalog)
    if (categoryFilters) {
        categoryFilters.addEventListener("click", (e) => {
            if (e.target.classList.contains("filter-btn")) {
                document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
                e.target.classList.add("active");
                currentCategory = e.target.getAttribute("data-category");
                renderProducts();
            }
        });
    }

    // 4. Cart drawer toggle actions
    cartBtn.addEventListener("click", openCartDrawer);
    closeCartBtn.addEventListener("click", closeCartDrawer);
    cartDrawerOverlay.addEventListener("click", closeCartDrawer);
    continueBtn.addEventListener("click", closeCartDrawer);

    // 5. Checkout Modals triggers
    checkoutBtn.addEventListener("click", showCheckoutModal);
    closeCheckoutBtn.addEventListener("click", closeCheckoutModal);
    checkoutForm.addEventListener("submit", handleCheckoutFormSubmit);

    // Success Close
    successCloseBtn.addEventListener("click", () => {
        successModal.classList.add("hidden");
    });

    // 6. Merchant Portal Modals and Authentication
    merchantLink.addEventListener("click", (e) => {
        e.preventDefault();
        handleMerchantClick();
    });
    
    // Bind checkout page and footer links matching merchant dashboard
    document.querySelectorAll(".merchant-trigger").forEach(el => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            handleMerchantClick();
        });
    });

    closeMerchantModalBtn.addEventListener("click", () => {
        merchantLoginModal.classList.add("hidden");
        loginErrorMsg.classList.add("hidden");
    });

    merchantLoginForm.addEventListener("submit", handleMerchantLogin);
    logoutMerchantBtn.addEventListener("click", logoutMerchant);

    // 7. Dashboard order filters and tabs
    if (statusTabs) {
        statusTabs.addEventListener("click", (e) => {
            if (e.target.classList.contains("status-tab")) {
                document.querySelectorAll(".status-tab").forEach(tab => tab.classList.remove("active"));
                e.target.classList.add("active");
                currentDashboardStatusFilter = e.target.getAttribute("data-status");
                renderDashboard();
            }
        });
    }

    if (orderSearchInput) {
        orderSearchInput.addEventListener("input", (e) => {
            dashboardSearchQuery = e.target.value.trim();
            renderDashboard();
        });
    }

    // Export buttons
    exportCsvBtn.addEventListener("click", exportOrdersToCSV);
    exportJsonBtn.addEventListener("click", exportOrdersToJSON);

    // 8. Mobile Menu Toggle
    mobileMenuBtn.addEventListener("click", () => {
        mobileDrawer.classList.add("open");
    });

    closeDrawerBtn.addEventListener("click", () => {
        mobileDrawer.classList.remove("open");
    });

    drawerLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            mobileDrawer.classList.remove("open");
            const targetHref = link.getAttribute("href");
            
            if (targetHref === "#merchant") {
                e.preventDefault();
                handleMerchantClick();
            } else {
                switchToStorefrontSection();
            }
        });
    });
}
