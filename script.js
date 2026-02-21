const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSm1SN8R7eQk4Jp2UjlNyldW6pSOpgwGSfJuEOjU_fHc4u4X6l24RD9NQsbdJgK5xmuSQYg_f19ZViW/pub?output=csv";

async function loadProducts() {
  const response = await fetch(sheetURL);
  const data = await response.text();

  const rows = data.split("\n").slice(1);

  const products = rows.map(row => {
    const cols = row.split(",");

    return {
      name: cols[0],
      image: cols[1],
      old_price: cols[2],
      new_price: cols[3],
      badge: cols[4],
      affiliate: cols[5],
      category: cols[6]
    };
  });

  renderProducts(products);
}

function renderProducts(products) {
  const container = document.getElementById("product-list");

  container.innerHTML = products.map(p => `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>
        <del>${p.old_price}đ</del>
        <strong>${p.new_price}đ</strong>
      </p>
      <span>${p.badge}</span>
      <a href="${p.affiliate}" target="_blank">Mua Ngay</a>
    </div>
  `).join("");
}

loadProducts();
