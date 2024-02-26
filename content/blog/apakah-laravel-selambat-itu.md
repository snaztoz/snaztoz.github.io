---
title: Apakah Laravel Selambat Itu?🤔
description: Saya melakukan benchmarking Laravel untuk membuktikan apakah benar Laravel selambat itu
date: '2024-02-26T15:52:50+07:00'
draft: false
tags:
- benchmark
- cache
- laravel
- web-framework
---

Beberapa kali saya mendengar komplain orang terkait lambatnya *framework* yang satu ini.

Saya pribadi menyukai framework Laravel. Fiturnya lengkap, package banyak, development pun juga cepat.

Tapi, kini trend sudah mulai bergeser. Dengan alasan Laravel lambat, banyak programmer yang berpindah menggunakan teknologi lain seperti Golang ataupun Java Spring yang dikenal memiliki performa tinggi.

Hal ini membuat saya bertanya-tanya: benarkah Laravel selambat itu?

Untuk menjawab hal ini, saya melakukan *benchmarking*, dan hasilnya saya bagikan di artikel ini.

## ❓ Mengapa saya melakukan *benchmarking*?

Tidak, saya tidak melakukan *benchmarking* dengan tujuan untuk membandingkan performa dari framework Laravel dengan framework lain (saya beresiko mentrigger *framework war*🥲)

Saya melakukan *benchmarking* ini untuk mengetahui apakah benar Laravel selambat seperti yang dikatakan orang-orang.

## 🥸 Bagaimana saya melakukan *benchmarking*?

Simpel, saya membuat sebuah API endpoint dengan menggunakan Laravel, lalu saya melakukan stress testing dengan menggunakan library [Stressless](https://pestphp.com/docs/stress-testing).

Tapi, endpoint yang saya buat bukanlah sebuah endpoint "Hello, World!" karena endpoint seperti ini tidak terlalu berguna di dunia nyata...

Saya membuat sebuah endpoint yang perlu melakukan *query* data yang cukup banyak.

Saya menggunakan dataset [pertandingan tenis](https://www.kaggle.com/datasets/guillemservera/tennis) yang saya ambil dari Kaggle, dimana tabel yang saya gunakan adalah tabel *players* (> 64 ribu baris) dan tabel *rankings* (> 3,2 juta baris).

Query yang saya gunakan sendiri adalah:

> Tampilkan data terbaru dari 20 pemain dengan ranking teratas.

Jika dibuat ke SQL, maka querynya kurang lebih akan seperti berikut:

```sql
SELECT
  rankings.rank AS rank,
  players.name_first || " " || players.name_last AS name
FROM
  rankings
INNER JOIN
  players ON rankings.player = players.player_id
WHERE
  rankings.ranking_date = (SELECT MAX(rankings.ranking_date) FROM rankings)
ORDER BY
  rankings.ranking_date DESC,
  rankings.rank ASC
LIMIT
  20;
```

Komputer yang digunakan sendiri memiliki spesifikasi:

1. Prosesor 11th Gen Intel(R) Core(TM) i7-1165G7
2. RAM 16 GB

## 🧪 Percobaan

### Case #1: Default

Saya tidak melakukan custom setting apapun dan hanya menggunakan *development server* bawaan dari Laravel:

![Hasil Case #1](/images/202402/benchmark-laravel-case-1-result.png "Hasil dari case #1")

Dapat dilihat, Laravel lambat *by-default*.

Server hanya dapat menghandle 2,23 request/detik dengan rata-rata durasi tiap request adalah 450ms.

Berikut adalah log dari server:

![Retrieval Time Case #1](/images/202402/benchmark-laravel-case-1-retrieval-time.png "Waktu pengambilan data pada case #1")

Waktu rata-rata *query* data sendiri membutuhkan waktu kurang lebih 350ms untuk tiap request, atau dengan kata lain **77,78%** waktu tiap request habis pada proses pengambilan data.

Untuk mengatasi problem ini, cukup jelas kita perlu mengurangi waktu dalam tahap *query* data itu sendiri.

### Case #2: Menggunakan cache

Di case ini saya menambahkan mekanisme *caching* di dalam server (menggunakan [*file driver*](https://laravel.com/docs/10.x/cache#configuration)):

![Hasil Case #2](/images/202402/benchmark-laravel-case-2-result.png "Hasil dari case #2")

Hasil menunjukkan bahwa dengan menggunakan *cache*, server kini dapat menghandle *load* sebesar 11 request/detik.

Sedangkan waktu rata-rata request menurun menjadi 89,74ms, atau sekitar **19,78%** dari waktu yang dibutuhkan case sebelumnya.

Tidak buruk!

![Retrieval Time Case #2](/images/202402/benchmark-laravel-case-2-retrieval-time.png "Waktu pengambilan data pada case #2")

Waktu rata-rata *query* data sendiri menurun ke kisaran 6ms, atau sekitar **1,71%** dari waktu yang dibutuhkan server pada case #1!

Hal ini dapat terjadi karena server tidak perlu lagi untuk melakukan *query* database di setiap request-nya.

### Case #3: Menggunakan Laravel Octane

Jika *package* ini terdengar asing, singkatnya dengan menggunakan Laravel Octane server akan dapat menghandle request dengan lebih cepat, dengan cara:

1. [*Re-use*](https://laravel.com/docs/10.x/octane#introduction) aplikasi, sehingga Laravel tidak perlu melakukan *bootstrapping* aplikasi setiap kali ada request baru
2. Menggunakan banyak [*worker*](https://laravel.com/docs/10.x/octane#specifying-the-worker-count) sesuai dengan jumlah CPU *core* dari komputer untuk menghandle request.

Hasil setelah menggunakan *package* ini adalah seperti berikut:

![Hasil Case #3](/images/202402/benchmark-laravel-case-3-result.png "Hasil dari case #3")

Server kini dapat menghandle hingga **261 request/detik**!🤯

Dengan waktu rata-rata per requestnya sendiri adalah 2,96 detik, atau sekitar **0,53%** dari waktu yang dibutuhkan server pada case #1.

![Retrieval Time Case #3](/images/202402/benchmark-laravel-case-3-retrieval-time.png "Waktu pengambilan data pada case #3")

Sedangkan untuk waktu dari *query* data sendiri kurang lebih mirip dengan yang ada pada case #2.

## 📊 Pembahasan

Dari hasil yang didapat, bisa kita lihat bahwa sebagian besar waktu dari sebuah request **habis pada proses pengambilan data**.

Artinya, dengan menggunakan bahasa atau *framework* apapun, jika *query* yang digunakan kompleks (atau buruk), otomatis waktu pemrosesan request juga akan berjalan dengan lebih lambat.

Sehingga, *cache* sangat berperan penting dalam peningkatan performa aplikasi.

Selain itu, penggunaan banyak atau semua ***core* dari CPU** juga dapat meningkatkan performa server secara drastis.

## 🧘 Kesimpulan

1. Laravel tidak selambat itu (bahkan bisa cepat juga)
2. Sebisa mungkin *cache* data yang sering diakses
3. Apapun bahasa/*framework*-nya, jangan gunakan *development server*
4. Deployment membutuhkan konfigurasi untuk bisa mendapat hasil yang optimal

## 🙋‍♂️ Pertanyaan

#### Apakah server di percobaan ini sudah sangat optimal?

Belum. Masih banyak optimalisasi yang bisa dilakukan lagi😉

Contoh, *cache* pada aplikasi masih menggunakan *file*. Untuk performa yang lebih bagus lagi, *cache* berbasis memori seperti Redis atau Memcached dapat digunakan.

Penelitian ini masih menggunakan *engine* SQLite. Untuk menghandle aplikasi nyata, gunakan database lain yang lebih tinggi performanya seperti MySQL atau PostgreSQL.

Dan masih banyak yang lainnya...

#### Apakah saya harus menggunakan Laravel?

Tidak, gunakan *framework* yang developer kalian sudah nyaman menggunakannya.

Golang? Tidak masalah.

Java Spring? Aman juga.

Express.js? Boleh.

Percobaan ini hanya bertujuan untuk membuktikan bahwa Laravel juga bisa memiliki performa tinggi jika terkonfigurasi dengan benar.

#### Apakah 200+ request/detik cukup untuk aplikasi saya?

Bukan ingin mengecewakan, tapi mari kita hadapi kenyataan. Mayoritas dari kita tidak akan membutuhkan performa hingga 1000 request/detik🥲

Untuk mendapatkan perspektif dari sisi lain, 200 request/detik itu berarti 12000 request/menit, atau sekitar 17 juta request/hari🤯

Jika (syukurnya) aplikasi kita memang memiliki *workload* yang super besar, kita juga bisa menyalakan sebuah *instance* baru dari server dan mengatur *load balancer* di depannya. Mudah😉

## 🏠 Sekian

Semoga bermanfaat dan sampai jumpa👋
