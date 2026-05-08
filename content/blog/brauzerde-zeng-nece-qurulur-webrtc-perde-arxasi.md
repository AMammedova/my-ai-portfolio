---
title: "Brauzerdə zəng necə qurulur? WebRTC-nin pərdə arxası"
date: "2026-05-08"
tags: ["WebRTC", "Networking", "STUN", "TURN", "ICE", "UDP"]
summary: "Brauzerdə bir video zəngin arxasında işləyən STUN, ICE, SDP, signaling, DTLS və SRTP mexanizmlərini sadə dildən texniki dərinliyə doğru izah edir."
---

## Hər gün milyardlarla insan internet üzərindən danışır, amma çox azı bilir ki, bunun arxasında nə dayanır

Təsəvvür edin:

Bakıda bir kafedə oturmusunuz və Almaniyadakı dostunuza video zəng edirsiniz.

`Join Call` düyməsinə basırsınız.
Bir neçə saniyə gözləyirsiniz.
Və sonra onun səsini eşidirsiniz.

Təxminən **150 millisaniyə**.

Bu, göz qırpımının yarısı qədər vaxtdır.

Bu sadə görünən prosesin arxasında isə onlarla protokol, milyonlarla şifrələnmiş paket və 30 ildən çox mühəndislik dayanır.

Bu məqalədə WebRTC-nin necə işlədiyini ən əsas prinsiplərdən başlayaraq dərindən izah edəcəyik.

---

## İnternet əslində peer-to-peer üçün dizayn edilməyib

İnternet əvvəlcə **client-server** modeli üçün qurulub.

YouTube açırsınız:

- Siz serverə sorğu göndərirsiniz
- Server cavab qaytarır
- Bağlantı qurulur

Burada problem yoxdur.

Çünki serverin məlum və daimi public IP ünvanı var.

Amma iki adi istifadəçi bir-biri ilə birbaşa danışmaq istəyəndə vəziyyət dəyişir.

Çünki:

- Heç birinin daimi public IP-si yoxdur
- Hər ikisi router arxasındadır
- Firewall və NAT bağlantıları bloklayır

WebRTC məhz bu problemi həll etmək üçün yaradılıb.

---

## NAT problemi necə həll edib, daha böyük problem yaratdı

Ev interneti adətən belə işləyir:

```text
Internet
    |
[ Router / NAT ]
    |
 +--+--+
PC   Telefon
```

Evdəki cihazların lokal IP ünvanları olur:

```text
192.168.1.5
192.168.1.6
```

Amma internet bu ünvanları görmür.
İnternet yalnız router-in public IP ünvanını görür.

Bu proses **NAT** adlanır.
Router daxili cihazların internetə çıxışını "tərcümə edir".

Bu yanaşma IPv4 ünvan çatışmazlığını həll etdi.
Amma yeni problem yaratdı:

Kənardan gələn biri birbaşa sizin cihazınıza qoşula bilmir.

Çünki router hansı paketin hansı cihaza aid olduğunu bilmir.

Normal internet istifadəsində bu problem deyil:

Siz əlaqəni başladırsınız, router isə bunu yadda saxlayır.

Amma iki cihaz bir-biri ilə birbaşa danışmaq istəyəndə problem yaranır.

Bu problem **NAT traversal** adlanır.
WebRTC-nin əsas məqsədi də məhz budur.

---

## STUN - cihazın internetdə özünü tanıması

İlk addım cihazın internetdə necə göründüyünü öyrənməkdir.

Burada STUN serverləri istifadə olunur.

Cihaz STUN serverinə sorğu göndərir.
Server isə cavab verir:

> "Sən internetdə bu IP və port ilə görünürsən."

Məsələn:

```text
85.123.45.67:54321
```

Beləliklə cihaz öz public ünvanını öyrənmiş olur.

STUN-un ən vacib xüsusiyyəti budur:

- O səs ötürmür
- Zəng yaratmır
- Sadəcə cihazın internetdə hansı ünvan ilə göründüyünü göstərir

Bir növ şəbəkə güzgüsü kimi işləyir.

---

## ICE - internetdə işləyən yolu tapmaq

Public IP-ni bilmək kifayət etmir.

Çünki NAT-ların fərqli növləri var və bəziləri çox sərt işləyir.

Buna görə WebRTC bütün mümkün bağlantı yollarını yoxlayır.
Bu proses **ICE** adlanır.

Hər cihaz öz mümkün ünvanlarını toplayır:

- Lokal şəbəkə ünvanı
- STUN vasitəsilə tapılan public ünvan
- TURN relay ünvanı

Bu ünvanlara **ICE candidate** deyilir.

Sonra hər iki tərəf öz candidate-lərini bir-birinə göndərir və bütün kombinasiyalar yoxlanılır:

```text
host  <-> host
srflx <-> srflx
srflx <-> relay
relay <-> relay
```

İlk işləyən bağlantı seçilir.

Bütün bunlar adətən 1-3 saniyə ərzində baş verir.
İstifadəçi isə sadəcə:

> "Connecting..."

mesajını görür.

---

## İki cihaz əvvəlcə necə "razılaşır"?

İki cihaz bir-birini tapsa belə, hələ necə danışacaqlarını bilmirlər.

Məsələn:

- Hansı audio codec istifadə olunacaq?
- Video olacaqmı?
- Şifrələmə necə aparılacaq?
- Hansı keyfiyyətdə media göndəriləcək?

Bu məlumatlar **SDP** adlı xüsusi format vasitəsilə paylaşılır.

Məsələn:

```text
m=audio
a=rtpmap:111 opus/48000/2
```

Bu o deməkdir ki:

> "Mən Opus codec dəstəkləyirəm."

Bir tərəf **SDP offer** yaradır.
Digər tərəf isə **SDP answer** göndərir.

Beləliklə hər iki cihaz texniki imkanlar üzərində razılaşır.

---

## Paradoks: iki cihazı birləşdirmək üçün əvvəlcə server lazımdır

Burada maraqlı bir məqam var:

SDP və ICE məlumatları necə ötürülür?
Axı cihazlar hələ bir-biri ilə əlaqədə deyil.

Burada **signaling server** istifadə olunur.

Sadə dillə desək, bu bir vasitəçidir:

```text
Cihaz A -> Signaling Server -> Cihaz B
```

Server yalnız ilkin məlumatları ötürür:

- SDP offer/answer
- ICE candidate-lər

Bağlantı qurulduqdan sonra isə audio və video artıq serverdən keçmir.
Əlaqə birbaşa cihazlar arasında qurulur.

Bu, WebRTC-nin ən vacib xüsusiyyətlərindən biridir.

---

## WebRTC niyə TCP yox, UDP istifadə edir?

Bu çox vacib mövzudur.

TCP etibarlı protokoldur.
Paket itərsə, yenidən göndərilir.

Fayl yükləmələri üçün bu mükəmməldir.
Amma real-time audio üçün problem yaradır.

Çünki gecikmiş paket artıq dəyərsiz olur.

TCP belə düşünür:

> "Bir paket itdimi? Gözlə, onu yenidən göndərim."

Bu isə gecikmə yaradır.

UDP isə fərqli işləyir:

> "Paket itdimi? Problem deyil. Növbəti paketə keç."

Real-time sistemlər üçün əsas prioritet sürətdir.

İnsan qulağı kiçik səs itkisini hiss etməyə bilər.
Amma böyük gecikməni dərhal hiss edir.

Buna görə WebRTC UDP istifadə edir.

---

## Birbaşa bağlantı mümkün olmayanda nə baş verir?

Bəzi şəbəkələr çox sərt olur, xüsusilə:

- Korporativ şəbəkələr
- Bəzi mobil operatorlar
- Symmetric NAT sistemləri

Belə hallarda iki cihaz birbaşa əlaqə qura bilmir.
Bu zaman TURN serverləri istifadə olunur.

Normal halda trafik belə gedir:

```text
A <-> B
```

TURN istifadə olunanda isə:

```text
A -> TURN -> B
```

Yəni bütün audio və video server üzərindən relay edilir.

Bu:

- Daha bahalıdır
- Gecikmə artırır
- Amma demək olar ki həmişə işləyir

Real sistemlərdə bağlantıların böyük hissəsi birbaşa P2P olur.
Amma müəyyən hissə TURN relay istifadə edir.

Bu səbəbdən böyük platformalar TURN infrastrukturlarına milyonlarla dollar xərcləyir.

---

## Bir "Salam" qarşı tərəfə necə çatır?

Siz "Salam" deyirsiniz.

Mikrofon səsi rəqəmsal məlumat halına çevirir.
Codec bu məlumatı sıxır.
Paketlər şifrələnir.
UDP vasitəsilə internet üzərindən göndərilir.

Qarşı tərəfdə isə proses tərsinə işləyir:

- Paket açılır
- Audio decode edilir
- Dinamikdən səs çıxır

Bütün bunlar təxminən 80-150 millisaniyə ərzində baş verir.
İnsan bunu demək olar ki hiss etmir.

---

## Bu texnologiyanı kim yaratdı?

WebRTC bir nəfərin yaratdığı sistem deyil.
Bu, on illərlə davam edən kollektiv mühəndislik işidir.

Əsas mərhələlərdən bəziləri:

### 1990-cı illər

VoIP texnologiyaları yaranmağa başladı.

### 2003

Jonathan Rosenberg STUN standartını yaratdı.
Daha sonra TURN və ICE texnologiyalarının inkişafında da böyük rol oynadı.

### 2010

Google GIPS şirkətini satın aldı və browser daxilində real-time communication ideyasına ciddi investisiya etməyə başladı.

### 2012

Opus codec yaradıldı.
Bu gün Discord-dan WhatsApp-a qədər demək olar hər yerdə istifadə olunur.

### 2021

WebRTC rəsmi standart kimi qəbul edildi.

Ən maraqlısı isə budur:

Google, Apple, Mozilla, Microsoft kimi rəqiblər eyni standart üzərində birlikdə işlədilər.
Çünki internetdə real-time communication yalnız ortaq standart ilə mümkün idi.

---

## Nəticə

Brauzerdə video zəng etmək adi görünür.
Amma əslində bu, internetin ən mürəkkəb və ən gözəl mühəndislik sistemlərindən biridir.

Hər zəng zamanı:

- STUN sizin internetdə kim olduğunuzu tapır
- ICE işləyən yolu müəyyən edir
- SDP texniki imkanları razılaşdırır
- Signaling server ilk əlaqəni qurur
- DTLS şifrələmə açarlarını yaradır
- SRTP media trafikini qoruyur
- Opus səsi sıxır
- UDP onu mümkün qədər sürətli çatdırır

Və bütün bunlar saniyənin kiçik bir hissəsində baş verir.

Növbəti dəfə browser-də `Join Call` düyməsinə basanda bunu xatırlayın:

Siz sadəcə zəng etmirsiniz.

Arxa planda onlarla protokol, minlərlə bağlantı yoxlaması və milyonlarla şifrələnmiş paket işləyir.
İstifadəçi isə bunların heç birini hiss etmir.

Məhz yaxşı mühəndislik də budur.
