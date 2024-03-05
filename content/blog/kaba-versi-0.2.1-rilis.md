---
title: Kaba Versi 0.2.1 Rilis🎉
description: Kaba versi 0.2.1 telah rilis, baca fitur-fitur baru selengkapnya di sini.
date: '2024-01-08T17:34:25+07:00'
draft: false
categories: ['Blog']
tags:
- programming-language
---

Yap, sesuai judul, Kaba versi 0.2.1 sudah rilis🎉.

## Apa Saja yang Baru?

Saya telah menyinggung beberapa fitur yang akan diimplementasikan di Kaba pada [postingan saya sebelum ini]({{< ref "saya-membuat-sebuah-bahasa-pemrograman#apa-selanjutnya" >}}).

Kabar baiknya, banyak dari fitur yang telah disebutkan sudah terimplementasi di Kaba!

Sejak versi sebelumnya ([v0.1.2](https://github.com/snaztoz/kaba/releases/tag/0.1.2)) hingga saat ini ([v0.2.1](https://github.com/snaztoz/kaba/releases/tag/0.2.1)), berikut adalah beberapa update yang ada di Kaba:

* Support untuk bilangan float

```text
var x = 5.4;
var y = -10.2;
```

* Support untuk tipe data boolean

```text
var isAwesome = true;
```

* Support untuk type notation dan semantic analysis (kode di bawah akan men-trigger *compiler error*)

```text
var condition: Bool = 5;
```

* Support untuk *equality checking* dan *comparison* operator

```text
var a = 5 == 5;
var b = 1 != 2;

var c = 10 > 2;
var d = 101 <= 101;
```

* Support untuk blok `if-else`

```text
var x = 500;

if x > 300 {
  x = x / 2;
}

print(x);
```

Dan masih banyak lainnya😆.

Kamu bisa melihat CHANGELOG Kaba [di sini](https://github.com/snaztoz/kaba/blob/main/CHANGELOG.md#021---2024-01-08) untuk membaca lebih lanjut.

Atau ingin mencoba langsung project ini? Aset untuk versi 0.2.1 bisa didownload [di sini](https://github.com/snaztoz/kaba/releases/tag/0.2.1).

## Apa Selanjutnya?

Target saya selanjutnya untuk Kaba adalah:

* Mengimplementasikan operator `AND`, `OR`, dan `NOT`
* Mengimplementasikan loop
* Mengubah behaviour auto-casting dari `Int` ke `Float` (**Breaking Change**)

Tertarik untuk ikut bermain dengan project ini? Langsung saja kunjungi [reponya](https://github.com/snaztoz/kaba)!

Sekian dan terima kasih sudah membaca👋.
