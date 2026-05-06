---
title: "Niyə Virtual DOM yaranıb?"
date: "2025-12-15"
tags: ["Virtual DOM", "Browser", "Performance", "React"]
summary: "Bu məqalə Virtual DOM-un yaranma səbəbləri və brauzerin məzmunu necə anladığı haqqındadır."
---
Əvvəllər, jQuery dövründə UI dəyişiklikləri birbaşa real DOM üzərində aparılırdı.

```jsx
document.querySelector('#user').textContent = 'Aisel';

```
Hər DOM əməliyyatı brauzerin render pipeline-ını yenidən işə salırdı.

Bu proses layout hesablamalarını, paint mərhələsini və GPU üzərində compositing-i əhatə edirdi.
Tək dəyişikliklər problem yaratmırdı.
Lakin bir neçə element eyni anda yenilənəndə performans sürətlə aşağı düşürdü.

Real DOM-un ağır olması React kimi framework-ləri alternativ yanaşma qurmağa vadar etdi.
Nəticədə Virtual DOM anlayışı ortaya çıxdı.


# 🧩 1. Virtual DOM-un konseptual mərhələləri

### (a) UI → Declarative Component Tree

React və ya Vue istifadə edərkən UI imperativ əmrlərlə deyil, təsviri şəkildə yazılır:

```jsx
<App>
  <Header />
  <Main>
    <User name="Aisel" />
  </Main>
</App>

```

Burada sən brauzerə necə işləməli olduğunu demirsən.
Sadəcə nə görmək istədiyini təsvir edirsən.

Framework bu təsviri daxili komponent ağacına çevirir.
Bu ağac sonradan Virtual DOM-un əsas strukturunu təşkil edir.

### (b) Virtual DOM ağacı (in-memory tree)

Hər komponent bu formada təmsil olunur:

```jsx
{
  type: 'div',
  props: { className: 'user', children: 'Aisel' },
  key: null
}

```

Bu obyektlərin yaratdığı struktur Virtual DOM Tree adlanır.

Virtual DOM:

- real DOM deyil

- brauzer API-lərinə toxunmur

- yaddaşda saxlanılan yüngül bir modeldir

Onun əsas məqsədi dəyişiklikləri əvvəlcədən hesablamaqdır.

### (c) İlk render (mount)

İlk render zamanı Virtual DOM real DOM-a çevrilir:

```jsx
document.createElement('div')

```
React hər Virtual DOM node-u ilə real DOM node-u arasında əlaqə saxlayır:

```
VirtualNode._dom = realDOMNode
```

Bu mapping gələcək yeniləmələr zamanı yalnız dəyişmiş hissələrin tapılmasına imkan verir.

# ⚙️ 2. Yenilənmə mərhələsi: Diff və Reconciliation

`setState()` və ya `props` dəyişdikdə komponent yenidən render olunur.
Nəticədə yeni Virtual DOM ağacı yaranır.

React köhnə və yeni ağacları müqayisə etməyə başlayır.

### (b) Diff (Tree Diff)

React bunu çox sadə, amma effektiv qaydada edir:

1. Əgər `type` eynidirsə (məsələn, `<div>` → `<div>`), node saxlanılır.
2. Əgər `props` dəyişibsə, yalnız fərqlər tətbiq olunur.
3. Əgər `children` fərqlidirsə, həmin hissə rekursiv diff olunur.
4. Əgər `key` fərqlidirsə (list elementlərində), köhnə node silinib yenisi yaradılır.

Bunun nəticəsində React minimal DOM əməliyyatı siyahısı çıxarır:

```jsx
[
  { op: 'updateText', target: #user, value: 'Aysel' },
  { op: 'addNode', parent: #main, node: <span>New</span> }
]

```

### (c) Commit mərhələsi

Diff nəticəsində çıxan əməliyyatlar “batch” şəklində icra olunur.

Bu “commit phase” adlanır:

```jsx
applyDOMUpdates(patchList)

```

Brauzer yalnız həmin dəyişikliklərə görə reflow/paint edir.


# 🔬 3. React Fiber: Virtual DOM-un daxili mexanizmi
React 16-dan əvvəl diff prosesi sinxron idi.
Böyük tətbiqlərdə bu UI-nin donmasına səbəb olurdu.

React Fiber bu problemi həll etdi.

Fiber hər virtual node üçün bir “iş vahidi”dir:

```jsx
fiber = {
  type: 'div',
  stateNode: realDOMNode,
  child: nextFiber,
  sibling: anotherFiber,
  return: parentFiber,
  pendingProps: ...,
  alternate: previousFiberVersion
}

```

Fiber architecture:

- render işlərini hissələrə bölür

- prioritetlər təyin edir

- lazım olduqda renderi dayandırıb davam etdirir

Nəticədə UI responsive qalır.


# 🧮 4. React Render Prosesi ilə Brauzer Render Pipeline-ının uyğunluğu

| Mərhələ       | Brauzerin etdiyi iş                     | React / Virtual DOM tərəfi                                                         |
| ------------- | --------------------------------------- | ---------------------------------------------------------------------------------- |
| **Parse**     | HTML oxunur və DOM ağacı qurulur        | JSX komponent ağacı Virtual DOM obyektlərinə çevrilir                              |
| **Style**     | CSS fayllarından CSSOM yaradılır        | `props` və `className` dəyişiklikləri diff olunur                                  |
| **Layout**    | Elementlərin ölçü və mövqeyi hesablanır | Reconciliation lazımsız layout dəyişikliklərini azaldır                            |
| **Paint**     | Piksellər ekrana çəkilir                | Commit phase yalnız dəyişmiş hissələr üçün repaint yaradır                         |
| **Composite** | GPU layer-ləri birləşdirilir            | Batching render çağırışlarının sayını azaldaraq bu mərhələyə dolayı təsir göstərir |


Bu baxımdan React-in renderi də bir növ **“virtual pipeline”** kimidir:

- **Virtual DOM render**: hesablama və müqayisə (JS səviyyəsində)
- **Real render**: DOM yeniləmələri və brauzer paint (native səviyyədə)


# ⚡ 5. Virtual DOM-un real faydası nədədir?

### ✅ 1. Minimal DOM əməliyyatı

Çoxlu kiçik dəyişikliklər əvvəlcə JS-də hesablanır, sonra bir batch olaraq tətbiq olunur.

### ✅ 2. Deklarativ məntiq

Developer yalnız State → UI əlaqəsini düşünür.

### ✅ 3. Platform müstəqilliyi

Virtual DOM konsepti yalnız brauzer üçün deyil:

- **React Native** – diff nəticəsində “native UI elementləri” yenilənir
- **React Three Fiber** – diff nəticəsində “WebGL obyektləri” yenilənir
    
# 🧩 6. Virtual DOM-un məhdudiyyətləri

| Problem | İzah |
| --- | --- |
| **CPU yükü** | Hər renderdə JS səviyyəsində diff və ağac travers edilir. Böyük ağaclarda bu ciddi overhead yarada bilər. |
| **Əsl DOM optimizasiyaları** | Müasir brauzerlər DOM manipulyasiyalarını özü də optimallaşdırır, bəzən VDOM-un üstünlüyü azalır. |
| **Fine-grained reactivity yoxdur** | Reaktiv sistemlər (məs. SolidJS, Svelte) node səviyyəsində deyil, dəyər səviyyəsində izləmə aparır və daha yüngüldür. |

Buna görə **VDOM gələcəkdə dominant texnologiya olmayacaq**; lakin React Fiber kimi sistemlər onu yeniləyərək daha effektiv hala gətirirlər.


# 🔬 7. Qısaca müqayisə: Virtual DOM vs Real DOM vs Reactive DOM

| Sistem | Necə işləyir | Güclü tərəfi | Zəif tərəfi |
| --- | --- | --- | --- |
| **Real DOM (Native)** | Hər dəyişiklikdə layout/paint | Sadə, birbaşa | Çox dəyişiklikdə yavaşdır |
| **Virtual DOM (React/Vue)** | JS-də diff → minimal update | Dəyişikliklər qruplaşdırılır | Diff hesablama yükü var |
| **Reactive DOM (Svelte, Solid)** | Dəyər səviyyəsində “fine-grained” reactivity | Yüksək performans, diff yoxdur | Daha mürəkkəb compile mərhələsi |

# 🧭 8. Nəticə ( müsahibə zamanı professional səviyyədə cavab forması)

> “Virtual DOM real DOM-un JS səviyyəsində təqlididir. React hər renderdə komponentdən virtual ağac qurur, sonra köhnə ağacla yenisini müqayisə edir (reconciliation) və yalnız fərqləri real DOM-a tətbiq edir.
> 
> 
> Bu, brauzerin render pipeline-ına bənzər bir mexanizmdir: diff → layout → paint.
> 
> Fiber architecture bu prosesi hissələrə bölərək frame-based scheduling təmin edir, beləliklə UI responsive qalır.
> 
> Virtual DOM-un məqsədi DOM əməliyyatlarını azaltmaq, yeniləmələri qruplaşdırmaq və performansla yanaşı, deklarativ UI modelini mümkün etməkdir.”
> 

| Termin                     | İzah                                                                                                                                                                                        |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Batch**                  | Bir neçə DOM dəyişikliklərinin eyni frame daxilində yığılıb real DOM-a birlikdə tətbiq olunması. Məqsəd brauzerin render pipeline-ını hər dəyişiklik üçün ayrıca işə salmamaqdır.           |
| **Patch**                  | Virtual DOM diff nəticəsində yaranan konkret dəyişikliklərdir. Hansı node-un yenilənəcəyi, əlavə olunacağı və ya silinəcəyi barədə qərarların özüdür.                                       |
| **Render Pipeline**        | Brauzerin UI-ni ekrana çəkmək üçün keçdiyi mərhələlər ardıcıllığıdır: DOM və CSSOM → Render Tree → Layout → Paint → Composite → Frame.                                                      |
| **Frame-based scheduling** | Render işlərinin təxminən 16.6ms-lik frame pəncərələrinə bölünərək planlaşdırılmasıdır. Bu yanaşma UI-nin donmamasını və istifadəçi inputlarına vaxtında cavab verilməsini təmin edir.      |
| **Commit Phase**           | Diff mərhələsində hesablanmış patch-lərin real DOM-a tətbiq olunduğu mərhələdir. Bu mərhələdə DOM dəyişiklikləri artıq brauzer səviyyəsində icra olunur.                                    |
| **Reflow / Paint fərqi**   | Reflow elementlərin ölçü və yerləşməsinin dəyişməsi ilə bağlıdır və layout-un yenidən hesablanmasını tələb edir. Paint isə yalnız vizual dəyişiklikləri əhatə edir və daha az bahalıdır.    |
| **Fiber Scheduler**        | React Fiber-in render işlərini prioritetlərə bölən və vaxt üzrə planlaşdıran mexanizmidir. Render prosesini dayandırıb davam etdirməyə imkan verərək UI-nin responsiv qalmasını təmin edir. |
