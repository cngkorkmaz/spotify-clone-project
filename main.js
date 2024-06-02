//rapidapi.com müzikleri getirme
//API'ye ne yapacağız bir fetch isteği atacağız
//GET isteği api den veri alma.
//POST ise api ye veri gönderme

//1.bize ne lazım ilk başta form yapısını almamız gerekiyor. Form yapısını alabilmemiz içinde javascript kısmında gömemiz lazım
//2.onun öncesinde js diye bir dosya oluşturup dosyalarımıızı bunun içerisinde parçalayıp yönetebiliriz.
//3.gelelim helpers.js dosyası oluşturalım

//helpers.js den gönderdiğimiz form geliyor mu diye clg.log ile kontrol edelim.
//daha sonra bu forma bir gönderme olayı izlemem gerekiyor.(form yapısının içeriğinin gelip gelmediğini anlamak için)
import { API } from "./js/api.js";
import { elements } from "./js/helpers.js";
import { renderPlayingInfo, updateTitle } from "./js/ui.js";
//? mavi yazan yer sonraki işlem alttan yeşilden devam et. API.js 21 satırından sonra buraya geldilk oradaki API clasının bir örneğini almamız gerekiyor. örneğini aldıktan sonra const api adında bir değişkene aktardık

const api = new API();
// console.log(api);
// console.log(api.searchMusic); // burada gelen yapı api.js içerisinde tanımladığımız class API yapısı. buraya direkt metodu aktardığımızda direkt metodu çağırmıyor çünkü metod bir değişken değil console.log içerisndeki api den sonra nokta  koyarsak içesinde bir method varsa küp şeklinde gelir, diğer şeyler yani bir değişken varsa dikdörtgen şeklinde gelir. Biz ne yapacağız searchMusic i çalıştıracağız nerde input gönderildiği yerde. //?aşağıda if bloğunun altında

// console.log(elements.form); konsolde görünce sildik

//biz hangi olayı izleyeceğiz gönderme olayı yani submit olayı
//bu yapı gönderildiğinde hemen yanında bir fonksiyon (() => console.log("gönderildi")) çalıştıralım
//inputa değer girelim gönderelim. sayfayı yeniliyor.ilk başta sayfanı yenilenmesini engelleyelim. nasıl engelleyecepiz events yöntemiyle
//! Form gönderildiği anda api'ye istek at ve gelen cevabı ekrana yazdır
elements.form.addEventListener("submit", (e) => {
  e.preventDefault(); //* Form gönderildiği anda sayfanın yenilenmesini engeller.
  //gelelim formun içerisindeki değeri almaya.eventin targetini bu yapı geliyordu zaten.hatta e yazarsak direkt submit yapısını geitirir. burada targetin içerisinde sıfırıncı eleman olarak input gelmiş.buraya  yani inputa ualaşalım.
  /*  console.log(e.target[0].value); */
  //bunun neyi lazım bize valuesu yani değeri lazım.gelelim bunu bir query isimli değişkene aktaralım
  const query = e.target[0].value; //* inputun içerisindeki değere ulaştık

  //inputun içerisi boşsa yani değer  yoksa ekrana bir uyarı bastıralım.   "if (!query)" demek ünlem işareti değil anlamına geldiğinden query yoksa yani içi boşsa demek
  if (!query) {
    alert("Lütfen bir müzik ismi giriniz!!!");
    return; //query boşsa başka işleme gerek olmadığından bu fonksinu burada durdurmam lazım onu da return ile sağlayabilirim
    //! inputa girilen değer boş ise fonksiyonu burada durdur
  }

  //?aşağıdaki yapılardan sonra buraya ekledik. populer müzik yazan yazı yazan yere kullanıcının arattığı sanatçının yazılması işlemi.buna yukarıdaki "query" i göndermem gerekecek. bu update title e görede başlığı güncelleyelim  ui.js içerisinde
  updateTitle(`${query} için sonuçlar`);

  //api clasının içerisinde searchMusic clasını çalıştır.paranteze dışardan göndereceğimiz değeri soruyoer query girelim. inputa veri gir enterla aynen ekrana yazar.yani api dosyasında bulunan searchMusic metoduna gönderebilmişim. ve bu gönderdiğim veriye göre api ye istek atıcam
  api.searchMusic(query);
});

//* Sayfa yüklendiği anda api'ye istek atıp popüler müzikleri getir.
document.addEventListener("DOMContentLoaded", async () => {
  await api.topPopular();
});

const playMusic = (url) => {
  //* müziğin url ini html e aktarma
  elements.audioSource.src = url;
  //* audio elementinin müziği yüklenmesini sağladık
  elements.audio.load();
  //* audio elementinin müziği oynatmasını sağlar
  elements.audio.play();
};

//* liste de tıklamada çalışır
const handleClick = (e) => {
  console.log("tıklanıldı");
  //tıkladığım yapının id si play btn ise aşağıdaki yapıyı çalıştır.
  //tıkldaığımda true dönüyorsa bu yapıyı if bloğu içerisinde çalıştıralım
  if (e.target.id === "play-btn") {
    /*   console.log(e.target.parentElement.parentElement.parentElement); */ //? birden çok parentElement yazmak istemezsek kısa yolu aşağıdaki closest yöntemidir
    const parent = e.target.closest(".card"); //ParentElement yerine kullanırız. En yakın ebeveyne götürür.
    renderPlayingInfo(parent.dataset);
    //* müziği çalar
    playMusic(parent.dataset.url);
  }
};

//* Liste alanındaki tıklamaları izler
document.addEventListener("click", handleClick);

//* fotoğrafı dönderir
const animatePhoto = () => {
  const img = document.querySelector(".info img");

  img.className = "animate";
};

//* img etiketine eklediğimiz animate clasını kaldırır
const stopAnimation = () => {
  const img = document.querySelector(".info img");

  img.classList.remove("animate");
};

//* Müziği çalma ve durdurma olaylarını izler
elements.audio.addEventListener("play", animatePhoto);
elements.audio.addEventListener("pause", stopAnimation);
