//Yüklenen sayfanın doğruluğunu kontrol eder.
if (window.location.pathname !== "/" && window.location.pathname !== "/index.html") {
  console.log("Yanlış sayfa yüklendi.");
} else {
  console.log("Ana sayfa yüklendi.");

  // En dış div tanımlanması
  const wrapper = document.createElement("div");
  wrapper.className = "container";

  // En dış div'in içine header kısmının eklenmesi
  const header = document.createElement("div");
  header.className = "container_header";
  header.innerHTML = `<h2>Beğenebileceğinizi düşündüklerimiz</h2>`;

  //Slider bölümünün geri butonunun tanımlanması
  const prevBtn = document.createElement("button");
  prevBtn.id = "prev";
  prevBtn.textContent = "←";

  //Slider bölümünün ileri butonunun tanımlanması
  const nextBtn = document.createElement("button");
  nextBtn.id = "next";
  nextBtn.textContent = "→";

  // Carousel bölümünün tanımlanması
  const carousel = document.createElement("div");
  carousel.className = "carousel";

  //Ürünlerin yer alacağı container'ın tanımlanması
  const productContainer = document.createElement("div");
  productContainer.id = "product-container";
  productContainer.className = "carousel_items";

  //İlgili alanların eklenmesi
  carousel.appendChild(header);
  carousel.appendChild(productContainer);
  wrapper.appendChild(prevBtn);
  wrapper.appendChild(carousel);
  wrapper.appendChild(nextBtn);
  document.body.appendChild(wrapper);

  //Random sayı üreten yardımcı fonksiyon
  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const renderProducts = (products) => {
    productContainer.innerHTML = "";
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    products.forEach((product, index) => {
      const rating = getRandomInt(3, 5);
      const reviews = getRandomInt(1, 300);
      const badges = [];

      //Ürünlere rastgele rozet atama
      if (index % 2 === 0) badges.push("cok-satan");
      if (index % 3 === 0) badges.push("yildiz-urun");

      const discountPercent = product.original_price > product.price
        ? Math.round(100 - (product.price / product.original_price) * 100)
        : 0;

      const isFavorite = favorites.includes(product.id);
// Ürün fiyatlarını formatlama
      const formattedPrice = `${product.price.toFixed(2)} TL`;
      const formattedOriginalPrice = `${product.original_price.toFixed(2)} TL`;
      const hasDiscount = discountPercent > 0;
// Ürünün detayları yeni sekme açılır
      const card = document.createElement("a");
      card.href = product.url;
      card.target = "_blank";
      card.className = "product-link";
// Ürün kartının içeriğinin oluşturulması
      card.innerHTML = `
        <div class="carousel_card" data-id="${product.id}">
          ${badges.includes("cok-satan") ? `<div class="badge top-left">ÇOK SATAN</div>` : ""}
          ${badges.includes("yildiz-urun") ? `<div class="badge star-badge">YILDIZ ÜRÜN</div>` : ""}
          <img src="${product.img}" alt="${product.name}" />
          <div class="heart ${isFavorite ? "favorited" : ""}">
            <img id="default-favorite" src="default-favorite.svg" alt="heart" class="heart-icon">
            <img src="default-hover-favorite.svg" alt="heart" class="heart-icon hovered">
          </div>
          <p>${product.name} - <strong>${product.brand}</strong></p>
          <div class="rating">
            ${'⭐'.repeat(rating)}${'☆'.repeat(5 - rating)}
            <span class="reviews">(${reviews})</span>
          </div>
          <div class="price">
            <div class="discount-price">${formattedPrice}</div>
            ${hasDiscount ? `<s>${formattedOriginalPrice}</s><span class="discount-percent">%${discountPercent}</span>` : ""}
          </div>
          <div class="add-to-cart"><button>Sepete Ekle</button></div>
        </div>
      `;

      productContainer.appendChild(card);
    });

    // Kalp ikonlarını işle
    document.querySelectorAll(".carousel_card").forEach(card => {
      const heart = card.querySelector(".heart");
      const productId = parseInt(card.getAttribute("data-id"));
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

      if (favorites.includes(productId)) {
        heart.classList.add("favorited");
      }

      // Kalp içindeki ikonlara özel tıklama
      heart.querySelectorAll("img").forEach(icon => {
        icon.addEventListener("click", e => {
          e.preventDefault();
          e.stopPropagation();

          favorites = JSON.parse(localStorage.getItem("favorites")) || [];
          if (favorites.includes(productId)) {
            favorites = favorites.filter(id => id !== productId);
            heart.classList.remove("favorited");
          } else {
            favorites.push(productId);
            heart.classList.add("favorited");
          }
          localStorage.setItem("favorites", JSON.stringify(favorites));
        });
      });

      // Sepete Ekle butonlarını işle
      const cartBtn = card.querySelector(".add-to-cart button");
      cartBtn.addEventListener("click", e => {
        e.preventDefault();
        e.stopPropagation();
        alert("Ürün sepete eklendi.");
      });
    });
  };

  // Eğer localStorage'da ürünler varsa, onları kullanmak için verileri çekilmesi
  const storedProducts = localStorage.getItem("productList");
  if (storedProducts) {
    renderProducts(JSON.parse(storedProducts));
  } else {
    fetch("https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json")
      .then(res => res.json())
      .then(data => {
        localStorage.setItem("productList", JSON.stringify(data));
        renderProducts(data);
      })
      .catch(err => console.error("Veri alınamadı:", err));
  }

  // Slider kısmında geri butonlarının işlevselliği
  prevBtn.addEventListener("click", () => {
    productContainer.scrollBy({ left: -300, behavior: 'smooth' });
  });

  // Slider kısmında ileri butonlarının işlevselliği
  nextBtn.addEventListener("click", () => {
    productContainer.scrollBy({ left: 300, behavior: 'smooth' });
  });

  // Slider kısmında otomatik kaydırma işlevselliği
  let autoScroll = setInterval(() => {
    productContainer.scrollBy({ left: 300, behavior: 'smooth' });
  }, 3000);

  // Slider bölümünde fare ile ürünleri incelerken otomatik kaydırmayı durdurma ve fare ayrıldığında tekrar başlatma işlevselliği
  productContainer.addEventListener('mouseenter', () => clearInterval(autoScroll));
  productContainer.addEventListener('mouseleave', () => {
    autoScroll = setInterval(() => {
      productContainer.scrollBy({ left: 300, behavior: 'smooth' });
    }, 3000);
  });
} 