// ekrana yansıtacağımız

import { elements } from "./helpers.js";

//! Ekrana gönderilen müzikleri aktarır
export const renderSearchMusic = (songs) => {
  //parametresine şarkıları gönderdik allaım . /*  console.log(song);  *///biz bunu nereye bastıracağız index.html de list kısmına yani card ları kapsayan üst kısmına .biz html etiketlerimizi helpers.js kısımında çağırıyorduk.
  elements.list.innerHTML = ""; //! alltaki innerHTML yapınısını başlangıçta içi boş olsun.

  /* console.log(elements.list); */ //konsolda gördük .daha sonraher bir şarkı için aktacracağımız için her bir şarkıyı dönmemiz lazım. for each ile dönelim.

  /* songs.forEach((song) => console.log(song))  */ //ben bu gelen veri için ne yapıcam ilk başta bir div oluşturucam. card yapısı var card içerisinde bunlardan oluşturuyoruz.bizdde bu oluşturduğumuz kartların dataset lerine verilerimizi ekleyelim ki resmini audio etiketlerini aktarabilelim. ondan dolay bu card yapılarının dataset özelliklerini aktaracağız. card yapısını bir createElement metodunu kullanarak ui.js içerisinde oluşturalım

  songs.forEach((song) => {
    console.log(song); // ilk başta bir de console şarkılarını yazdıralım
    const div = document.createElement("div"); //döndüğü her bir etiket için bir div oluşturacak
    /*   console.log(div); */

    //kartın datasına bunları bir ekleyelim.daha sonra hub yapısı içerisindeki actionslardan sıfırıncı değil birinci elemanı alacağız.burada pop metoduyla bu işi yapabiliriz.buradan url adresini almış oluruz.pop dizinin içerisindeki son elemanı tekrardan bize veriyor yani return etmiş oluyor.yani çıkarıp bir değişkene aktarmış oluyoruz
    //!kart datasına kart elemanına bazı verileri ekleme
    div.dataset.url = song.hub.actions.pop().uri;
    console.log(song);
    div.dataset.title = song.title; // konsolda inceleyerek bulduk
    div.dataset.img = song.images.coverart; // konsolda inceleyerek bulduk
    div.className = "card";
    console.log(div);

    //div oluşturuldu bunu içerisinde etiketleri h4 yapısı bunların içerisine aktaralım.innerHTML oluşturalım.içerisine card divinin içerisindeki yapıları kopyalayalım
    div.innerHTML = `
    <figure>
        <img
        src="${song.images.coverart}"
        alt=""
        />
        <div class="play">
        <i class="bi bi-play-fill" id="play-btn"></i>
        </div>
    </figure>
    <h4>${song.subtitle}</h4>
    <h4>${song.title.slice(0, 15) + "..."}</h4>
    
    `;

    elements.list.appendChild(div); //her döndüğümüz yapıyı ekleeyceği için bu blok içerinde söylemem lazım. appendChild yöntemi ile ekleme yap neyi oluşturduğumuz div i

    //div e bir class verelim
    /*   div.className = "card";
    console.log(div); */
  });
};

//!Başlığı aldığı parametreye göre günceller
//başlık(poüler müzik yazan yer) güncelleme main alanındaki update
export const updateTitle = (message) => {
  /*    console.log(message);
    console.log(elements.title); */

  //yeni tanımladığımız title
  elements.title.innerText = message;
};

//! Popüler Müzikleri Ekrana Yazdırır
export const renderSongs = (songs) => {
  elements.list.innerHTML = "";
  songs.forEach((song) => {
    const div = document.createElement("div");
    //konsolda preview url olarak görünen yapıyı aldık.
    div.dataset.url = song.preview_url;
    div.dataset.title = song.name;
    div.dataset.img = song.album.images[1].url;
    // console.log(song);
    div.className = "card";

    div.innerHTML = `
    <figure>
      <img
        src="${song.album.images[1].url}"
        alt=""
      />
      <div class="play">
        <i class="bi bi-play-fill" id="play-btn"></i>
      </div>
    </figure>
    <h4>${song.album.artists[0].name}</h4>
    //* aşağıdaki slice yapısı 15 kelimeden sonrasını keser
    <h4>${song.name.slice(0, 15) + "..."}</h4>
    
    `;
    elements.list.appendChild(div);
  });
};

//* Playing info kısmına resmi ve title i aktardık
export const renderPlayingInfo = (song) => {
  console.log(song);
  console.log(elements.playingInfo);
  elements.playingInfo.innerHTML = ` 
  <img
    src="${song.img}"
    class="animate"
    id="info-img"
    alt=""
  />
  <div>
    <p>Şu an oynatılıyor...</p>
    <h3>${song.title}</h3>
  </div>`;
};
