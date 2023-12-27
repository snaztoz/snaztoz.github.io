+++
title = 'Saya Membuat Sebuah Bahasa Pemrograman'
date = 2023-12-27T17:38:39+07:00
draft = false
tags = ['ProgrammingLanguage']
+++

Saya selalu ingin membuat bahasa pemrograman milik saya sendiri.

Tapi darimana dan bagaimana caranya saya memulai? Project seperti ini cukup tricky karena ada banyak concern yang perlu dipikirkan dalam pengimplementasiannya.

Compiled atau interpreted? Static atau dynamic typed? Bagaimana syntax-nya? Semantic rule? Dan lain sebagainya.

Tapi karena saya tetap ingin membuat sebuah bahasa pemrograman, akhirnya saya nekat langsung terjun saja😆.

Alhasil, seringkali saya melakukan "bongkar pasang" project.

Banyak project implementasi saya yang gagal (kebanyakan karena salah desain🥲). Entah ada berapa saja repo-repo yang sudah saya buat! Ada yang sampai saat ini membeku sebagai repo private github dan ada juga yang terkubur entah di dalam direktori mana di laptop saya.

Syukurlah, akhirnya kenekatan ini membuahkan hasil.

Saya berhasil membuat bahasa pemrograman [Kaba](https://github.com/snaztoz/kaba)🎉.

## Halo, Kaba!

Kaba adalah sebuah bahasa pemrograman yang (rencananya) berjenis *compiled* dan *static typed*.

Fitur yang ada saat ini masih sangat sangat sangat terbatas. Pada titik ini (versi 0.1.2), bahkan tipe data yang tersedia baru ada integer (bisa positif maupun negatif).

Fungsi yang tersedia hanya ada `print` dan operasi expression hanya memiliki support untuk operasi Kali-Tambah-Bagi-Kurang (KaTaBaKu).

Sangat terbatas memang, tapi bahasa ini sudah bisa bekerja😁.

Berikut ini contoh sebuah program Kaba untuk melakukan *value swapping* variabel:

```
var x = 15;
var y = 50;

print(x);
print(y);

var z = x;
x = y;
y = z;

print(x);
print(y);
```

## Apa Selanjutnya?

Saya merasa sangat *excited* dengan progress dari project ini.

Rencana saya selanjutnya adalah:

1. Mengimplementasikan tipe data `float`.
2. Mengimplementasikan tipe data `boolean`.
3. Mengimplementasikan control-flow seperti `if-else` dan loop.

Jika ingin mencoba secara langsung, *executable* ataupun *source code* dari project ini bisa langsung didownload dari section [release](https://github.com/snaztoz/kaba/releases) di github.

Terima kasih!
