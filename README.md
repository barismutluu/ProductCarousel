# Product Carousel

Bu proje, web sitesinin ana sayfasında bulunan "Beğenebileceğinizi düşündüklerimiz" başlıklı ürün karuselinin oluşturulmasını amaçlamaktadır.

![Carousel Screenshot](./image.png)

## 🔧 Özellikler

- **Sayfa Doğrulama:** Kod sadece anasayfada (`/` veya `/index.html`) çalışır, aksi halde `console.log("wrong page")` mesajı verir.
- **Veri Kaynağı:** Ürün listesi ilk çalıştırmada dış kaynaktan `fetch` ile alınır, sonraki çalışmalarda `localStorage`'dan yüklenir.
- **Favori Ürünler:** Kalp ikonuna tıklayarak ürün favorilere eklenebilir. Bu tercih `localStorage`'da saklanır ve yeniden yüklendiğinde korunur.
- **Fiyatlandırma ve İndirim:** İndirimi olan ürünlerde hem eski hem yeni fiyat gösterilir. Ayrıca indirim yüzdesi hesaplanıp görüntülenir.
- **Tasarım:** Piksel hassasiyetinde responsive yapı. Orijinal siteye birebir benzerlik.
- **Navigasyon:** Ürün görseline tıklanıldığında ürün bağlantısı yeni sekmede açılır.
- **Slider Kontrolleri:** İleri/Geri butonlarıyla scroll özelliği.
- **Otomatik Kaydırma:** Ürünler belirli aralıklarla kendiliğinden kayar. Hover durumunda durur.
