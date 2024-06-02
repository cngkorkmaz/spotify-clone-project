//rapidapi.com müzikleri getirme
//API'ye ne yapacağız bir fetch isteği atacağız
//GET isteği api den veri alma.
//POST ise api ye veri gönderme

import { renderSearchMusic, renderSongs } from "./ui.js";

//api dosyamızı da bir class şeklinde oluşturacağız.
//?SORU: js de class ı ne için kullanıyorduk? CEVAP: değişkenleri ve metodları bir arada tutabildiğimiz için kodu daha iyi yönetebiliyoruz.

//* Inputa girilen veriye göre aratacağımız api'nin keyi.
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "30bc8a8216msh5c1ef9fc4c540f3p17de24jsnd98c8b80f115",
    "x-rapidapi-host": "shazam.p.rapidapi.com",
  },
};

//* Popüler Müzikleri getirebileciğimiz api key
const optionsTop = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "30bc8a8216msh5c1ef9fc4c540f3p17de24jsnd98c8b80f115",
    "x-rapidapi-host": "spotify23.p.rapidapi.com",
  },
};

export class API {
  //constructor yapısını yani class API yi nerede çağırırsam bu constructor yapısı bir kere çalışıyordu.sonrasında asla bir daha çalışmıyordu.başlangıçta gelmesini istediniz yani tanımladığınız yerde bir daha çalıştırmak istemediğiniz bir yapı varsa bu constructor yapısı içerisinde tanımlayabiliriz. gelelim constructor yapısı içerisinde şarkılarımızı tutalım
  constructor() {
    //biz constructor içerisinde bir değişken tanımlıyorsak bunu this keyword u ile yapıyorduk. this ne anlama geliyordu API clası anlamına geliyordu.bunun içerisine gel şarkıların bulunduğu boş bir dizi oluştur.biz bu dizinin içerisine veri tabanından(rapidapi.com) gelen verileri bu this dizisinin içerisine aktaracağız.
    this.songs = [];
  }

  //sonrasında arama metodu ile getireceğimiz metodları söyleyelim.işlemleri gerçekleştirelim.zaten value sunu aldık.

  //gelelim bir API yapısına nasıl istek atıcaz.gelelim burada bir method oluşturalım.buna da searchMusic diyebiliriz şu an için. ilk başta ne yapacağız API ye bir istek atacağız.istek yapabilmemiz için de dışarıdan buna parametre göndereceğizm yani inputa girilen parametre göndreceğim."query" diyelim

  //!API ye nasıl istek atıcaz? js(fetch) bölümünden options yapısını alıcaz.bo options yapısını dışarıda tanımlıcaz. console.log(query) kapatacağız bir fetch isteği atıcaz.
  //!  inputa girilen veriye göre api'den cevabı getirir
  async searchMusic(query) {
    //fetch dinamik yapacağımız için bacticklerle tanımladık. options yapısını almamız gerekiyor.ayar yapısı olduğu için. option içerisinde method tanımlı API key tanımlı.$ ve {} içerisinde dışarıdan gönderdiğimiz query değeri gelecek
    //fetch yapısında kimin istek attığını bilmesi gerekiyor.bunu da options içerisindeki otantication keyleri ile algılıyor .bunu da fetch yapısında söylerken url in yanında options diyoruz.gelen cevabı "const res" adında bir değişkene aktralım ve gelen cevabı console  yazdıralım. verilerin seınkronize gelmesi için asycn yapısını kullandık. daha sonra bunları "data" isimli bir değişkene aktardık.

    //video da 02.14 te try catch yapısı içerisine aşağıdaki bloğu (const res ile başlaya ve renderSearchMusic ile devam eden bloğu aldık)
    /*   try { */
    const res = await fetch(
      `https://shazam.p.rapidapi.com/search?term=${query}=&locale=tr-TR&limit=5`,
      options
    );
    //daha sonra bunları "data" isimli bir değişkene aktardık.
    //bu değişken içerisinde şarkılarla alakalı ne arattıysak tüm bilgiler geliyor.bunları napıcaz ana ekrana kart oluşturup bastıracağız
    const data = await res.json();
    /* console.log(data); */ // burada sonucu gördük ve datayı yeni bir değişkene aktaralım "newData"
    let newData = data.tracks.hits; //datalarımız gelmiş sonrasında gelicem bu datalrla ilgili ekrana bir kart bastıracağım. bu kartlrın html yapısında bir tasarımını oluşturalım

    newData = newData.map((song) => ({ ...song.track })); //dizini içesinde her bir yapıyı döndük.sonra bir fonksiyonda bir değeri dışarı döndürürken ya return yazıyoruz ya da normal parantezimizi () açıyoruz. obje olarak gel her döndüün şarkının içerisinde ne vardı track vardı üç nokta ... ile bu trackleri bir yapının içerine yayacak hatta ne yapsın bunu tekrar newData ya aktarsın let olarak tanımladık zaten. her bir elemanı spread operatörü ile yaydıktan sonra her bir elemanı maplamasini söyledim. sonrada bu newData y ı yukarıda tanımladığım songs dizisine gönderebilirim
    /*  console.log(newData); */ //? SORU: bunların içinde objeler olduğu için bu elemanları dönmem gerekiyor ben bunları nasıl dönebilirim? cevap SPREAD OPERATÖRÜ yani üç nokta ... operatörü hemen üstte
    this.songs = newData;
    console.log(this.songs);

    //? aratılan şarkıları ekrana bastırcağımız bir fonksiyon oluşturalım buna renderSearchMusic diyebiliriz.buna da şarkıları içine aktardığımız yapıyı direkt gönderelim.gelelim ekrana yansıtacağımız işlemleri de ui.js isimli bir dosyada tanımlayalım

    //! Ekrana apiden gelen herbir şarkıyı yazdıracağımız method
    renderSearchMusic(this.songs);

    /*  console.log(query); */ // gelelim bunu görelim çalışıyor mu? bunun öncesinde main.js içerisinde bu API class ının bir örneğini oluşturmmamız lazım. //?main.js e git .oradada kullabilmemiz için örneğini almamız yani new API olarak tanımlayıp buradan export edip orada da import etmemiz gerekir.
  }
  catch(err) {
    console.log(err);
  }

  async topPopular() {
    const url =
      "https://spotify23.p.rapidapi.com/recommendations/?limit=20&seed_tracks=0c6xIDDpzE81m2q797ordA&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry'";

    try {
      //* api'ye fetch isteği at.
      const response = await fetch(url, optionsTop);

      //* veriyi json formatına çevir
      const result = await response.json();
      //* tanımladığımız song dizisine gelen cevabı aktar.
      this.songs = result.tracks;
      renderSongs(this.songs);
    } catch (error) {
      console.log(error);
    }
  }
}

//popüler müzkleri de aynı şekilde try catch bloğu içerisinde oluşturalım.


//? SORU: method ile fonksiyon arasında ne fark var?
//? CEVAP: fonksiyon başına  function yazılan ve js yapısı içerisinde tanımlanan bir yapı. METHOD ise API içesinde class yapısının içerisinde fonksiyon ile amacı aynı olan bir yapı

//ilk önce istek atacağımız url i rapidapi.com adresimde codesnippets bölümündeki (javacript)fetch bölümünden kopyacalayacağız
