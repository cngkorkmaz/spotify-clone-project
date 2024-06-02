//1.html etiketlerimizi burada bir obje halinde tutalım. const element adında bir değişken tanımlayalım.başlangıçta bir form yapısını alalım.bir değişkeni tanımlarkende obje içerisinde key value şeklinde tanımlıyorduk.  form: document.querySelector("form") yapısı ile aldık ve bunu dışarıda görebilmemiz için export etmemiz gerekiyor.daha sonra main.js içerisinde bunu ibr import edip elementsin içerisindeki formu bi alalım.

export const elements = {
  form: document.querySelector("form"),
  //şarkıları içine aktardığımız list i çağıralım
  list: document.querySelector(".list"),
  title: document.querySelector(".songs h2"),
  playingInfo: document.querySelector(".playing .info"),
  audio: document.querySelector("audio"),
  audioSource: document.querySelector("audio source"),
};
