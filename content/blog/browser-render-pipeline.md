---
title: "Brauzer HTML-i DOM-a necə çevirir (render pipeline)"
date: "2025-12-05"
tags: ["Browser", "DOM", "Render pipeline", "Performance"]
summary: "Bu məqalə brauzerin HTML-i necə oxuyub DOM-a çevirdiyini və sonradan ekrana necə çəkdiyini addım-addım izah edir."
---
## 🌐 Ümumi Baxış

- Bütün UI framework-lər (React, Vue, Svelte və s.) real DOM ilə birbaşa yox, abstraksiyalarla (Virtual DOM, Reconciliation, Fiber) işləyir.
- Brauzerin öz “render” pipeline-ını bilmədən framework-lərdəki “render”-i tam anlamaq çətindir.

### 🌳 DOM Ağacı Necə Yaranır: Brauzer HTML-i Necə “Anlayır”?

Veb səhifəni açanda brauzer sadəcə HTML mətnini göstərmir — onu **oxuyur, təhlil edir və yaddaşda canlı bir ağac strukturu yaradır.** Bu struktur **DOM ağacı (Document Object Model Tree)** adlanır. Gəlin bu prosesi addım-addım başa düşək.

---

### 🧩  HTML-in Oxunması və Parsinq (Encoding daxil)

Sən [**https://example.com**](https://example.com/) yazırsan.

Brauzer [**https://example.com**](https://example.com/) ünvanına sorğu göndərir. Arxada bu baş verir:

1. DNS sorğusu — domenin IP ünvanı tapılır (məsələn, 93.184.216.34)
2. HTTPS bağlantısı — TCP handshake + TLS şifrələmə
3. HTTP GET sorğusu
4. Server cavabı — HTML faylını göndərir

Bu cavab iki hissədən ibarətdir:

```
HTTP Header-lər (metadata)
+
HTTP Body (faylın özü, məsələn HTML, JSON və ya şəkil)
```

```markup
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Content-Length: 1234

<!DOCTYPE html>
<html>
 <head>
 <title>Mənim səhifəm</title>
 </head>
 <body>
 <h1>Salam Dünya</h1>
 </body>
</html>
```

Brauzer bu cavabı **baytlar** şəklində alır.Məsələn:

```
3C 21 44 4F 43 54 59 50 45 20 68 74 6D 6C 3E …
```

Brauzer aldığı byte-ları oxuyur və **encoding-ə** (məsələn UTF-8) əsasən simvollara çevirir.

### Encoding Nədir?

**Encoding** - simvolların rəqəmsal formada necə saxlanacağını müəyyən edən qayda.

```jsx
// ASCII encoding (sadə):
'A' = 65 (decimal) = 41 (hex)
'B' = 66 (decimal) = 42 (hex)

// UTF-8 encoding (daha geniş):
'A' = 41 (hex)
'ə' = C9 99 (hex) - 2 byte
'😀' = F0 9F 98 80 (hex) - 4 byte
```

---

Brauzer encoding-i burada tapır:

1) HTTP Header: `Content-Type: text/html; charset=UTF-8`

2) HTML `<meta charset="UTF-8">`

3) BOM: `EF BB BF` (UTF-8)

Burada brauzer üçün ən vacib hissə **Content-Type** və **charset** sətirləridir.

Çünki bu iki məlumat brauzerə deyir:

> “Mən sənə hansı tip məlumat göndərirəm və onu hansı kodlaşdırma ilə oxumalısan.”
> 

### `Content-Type`: Brauzerin nə aldığını anlaması

O, brauzerə **məzmunun növünü (MIME type)** bildirir.

| **Baytlar** | **Simvol** | **İzah** |
| --- | --- | --- |
| `3C 68 31 3E` | `<h1>` | HTML açılışı |
| `53 61 6C 61 6D` | Salam | Normal ASCII |
| `20` | (boşluq) | Space |
| `44 C3 BC 6E 79 61` | Dünya | "ü" üçün 2 bayt (C3 BC) |
| `3C 2F 68 31 3E` | `&lt;/h1&gt;` | HTML bağlanışı |

Nəticə: **Simvol səviyyəsində HTML parçası** yaranır və parser artıq bu mətni tokenləşdirməyə hazır olur.

### Əgər `charset` səhvdirsə nə baş verir?

`Tutaq ki, sənəddə əslində UTF-8 var, amma header-də charset=ISO-8859-1 yazılıb.`

Bu halda:

- "ə", "ü", "ö" kimi simvollar səhv oxunacaq;
- HTML sintaksisi pozula bilər (çünki `<` və `>` simvolları səhv deşifrə olunar);
- parser səhvləri bərpa etməyə çalışacaq və səhifə qarışıq görünəcək.

Ona görə də **doğru charset** həm backend, həm də frontend səviyyəsində eyni olmalıdır.

## Niyə bu mərhələ performansa təsir edir?

- Çünki bu deşifrə mərhələsi **streaming parser** zamanı baş verir.
- Doğru charset parseri sürətləndirir, yanlış charset isə əlavə bərpa addımları yaradır.

---

### 2. Tokenləşdirmə (Tokenization)

Bu mərhələnin məqsədi brauzerin aldığı **simvol axınını** sintaktik vahidlərə (tokenlərə) çevirmək, onları **strukturlaşdırılmış DOM ağacına** salmaqdır.

Burada prosesi iki əsas modul idarə edir:

1. **Lexer (Tokenizator)** — mətni analiz edib tokenlərə bölür.
2. **Parser** — tokenləri qaydalar əsasında DOM strukturuna çevirir.

| Token tipi | Nümunə | İzah |
| --- | --- | --- |
| Start Tag | `<div>` | Yeni element açılır |
| End Tag | `</div>` | Element bağlanır |
| Doctype | `<!DOCTYPE html>` | Parsing rejimini müəyyən edir |
| Comment | `<!-- note --→` | DOM-a daxil olmur |
| Character | `Hello` | Mətn node-u yaradır |
| Attribute | `class="container"` | Atributlar  |

### 3. Ağacın Qurulması (Tree Construction)

Tokenlər hazır olduqdan sonra, Tree Builder moduluna ötürülür.
Brauzer “stack” (yığın) strukturu ilə hər bir tag üçün obyekt (node) yaradır və onları **parent-child** əlaqəsinə görə birləşdirir.

#### Node nədir?

**Node** - DOM ağacının əsas vahidi, JavaScript obyekti.

| Node növü | Məsələn | İzah |
| --- | --- | --- |
| `Document` | `document` | Kök obyekt, bütün DOM-u saxlayır |
| `Element` | `<div>`, `<p>` | HTML tag-ı təmsil edir |
| `Text` | “Salam Dünya” | Mətn hissəsi |
| `Attribute` | `class="intro”` | Elementə bağlı metadata |

### Script və Blocking davranışı

Parser `<script>` tagına çatdıqda:

1. HTML parsing dayana bilər
2. Script yüklənir və icra olunur
3. DOM dəyişərsə, parser yenidən işə düşür

Performans üçün adətən `defer` və ya `async` istifadə olunur.

## 🎨 Addım 4: CSSOM və Render Tree

CSS faylları oxunur və **CSSOM** qurulur.
Sonra DOM + CSSOM birləşib **Render Tree** yaradır.

Render Tree-də yalnız görünən elementlər olur (`display: none` olanlar daxil deyil).

## 🧮 Addım 5: Layout, Paint, Composite

1. **Layout (Reflow)** – elementlərin ölçü/mövqeyi hesablanır.
2. **Paint** – piksellər çəkilir.
3. **Composite** – layer-lər birləşdirilib ekrana çıxarılır.

## Error Recovery və Real Dünya

HTML5 parser-lər tolerantdır:

- tag uyğunsuzluqlarını bərpa edir,
- bağlanmayan elementləri tamamlayır,
- bəzi hallarda quirks mode-a keçir.

## Nəticə

Brauzerin render pipeline-ını anlamaq React/Vue kimi framework-lərin niyə və necə optimizasiya etdiyini daha aydın göstərir. Parse, style, layout, paint və composite addımlarında baş verənləri bildikdə həm performans problemlərini daha tez tapmaq, həm də daha düzgün UI qərarları vermək olur.
