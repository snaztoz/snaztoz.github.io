---
title: Jangan Abaikan Struktur Data
description: Alasan mengapa struktur data dapat meningkatkan ataupun menurunkan performa sebuah software.
date: '2023-12-15T20:54:45+07:00'
draft: false
categories: ['Blog']
tags:
- data-structure
---

Ya, pada kebanyakan kasus mungkin kita hanya akan perlu menggunakan [array ataupun hashmap](https://doc.rust-lang.org/std/collections/).

Tapi, bukan berarti kita boleh mengabaikan struktur data lainnya dengan begitu saja.

### Mengapa?

Karena tidak jarang pilihan struktur data yang diambil akan menjadi fondasi dari software yang dibuat.

Pemilihan jenis struktur data akan sangat mempengaruhi algoritma yang digunakan, yang mana kemudian akan berimbas juga kepada performa dari software yang dibuat.

### Contoh 1: RDBMS

Sebuah contoh yang dapat saya berikan adalah implementasi penyimpanan internal dari sebuah RDBMS (*Relational Database Management System*) seperti [PostgreSQL](https://www.postgresql.org/docs/current/btree-implementation.html) ataupun [MySQL](https://dev.mysql.com/doc/refman/8.0/en/innodb-physical-structure.html) yang seringkali menggunakan struktur data berupa B-Tree ataupun B+-Tree (varian dari tree), dan bukan menggunakan array.

Struktur data jenis ini dipilih karena adanya kebutuhan bagi RDBMS yang mengharuskannya untuk dapat melakukan searching data dalam jumlah ribuan atau bahkan jutaan *row* data dengan cepat.

![Aplikasi visualisasi B-Tree](/images/202312/btree-visualization.png "Aplikasi visualisasi B-Tree")

Dengan menggunakan B-Tree (ataupun B+-Tree), maka data yang dimasukkan akan ter-*sorted* secara otomatis sehingga proses pencarian data akan lebih efisien ketimbang menggunakan struktur data lain, misal, array.

Di sisi lain, bukan berarti B-Tree adalah struktur data yang tidak memiliki kekurangan: Penggunaan banyak index di RDBMS dapat [memperlambat proses `insert`](https://use-the-index-luke.com/sql/dml/insert). Oleh karena itu, pemahaman terkait mengapa hal ini dapat terjadi akan sangat membantu dalam pengimplementasian sistem yang optimal.

### Contoh 2: Redis

Contoh lain, sebuah software *caching* yang sangat banyak digunakan oleh perusahaan-perusahaan raksasa, Redis, merupakan sebuah software penyimpanan data yang menekankan [penggunaan struktur data secara intensif](https://redis.io/docs/about/).

Ingin menyimpan daftar user yang memiliki privilege sebagai editor? [Gunakan struktur data set](https://redis.io/docs/data-types/sets/).

Ingin membuat sebuah *queue* untuk *background job worker*? [Gunakan list](https://redis.io/docs/data-types/lists/).

Atau bahkan ingin menyimpan data leaderboard sementara dari sebuah turnamen di suatu game online yang populer? [Gunakan struktur data sorted set](https://redis.io/docs/data-types/sorted-sets/).

Dan masih banyak lagi...

### Kesimpulan?

Berikut adalah [kutipan dari Linus Torvalds](https://lwn.net/Articles/193245/) sendiri:

> ... Bad programmers worry about the code. Good programmers worry about data structures and their relationships.

Atau simpelnya: jangan abaikan struktur data😉.

Sekian👋.

### External Links

1. Aplikasi visualisasi B-Tree: [https://www.cs.usfca.edu/~galles/visualization/BTree.html](https://www.cs.usfca.edu/~galles/visualization/BTree.html)
