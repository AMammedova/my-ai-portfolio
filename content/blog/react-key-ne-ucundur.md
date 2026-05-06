---
title: "React-də `key` nə üçündür və niyə vacibdir?"
date: "2025-12-15"
tags: ["React", "Virtual DOM", "Reconciliation", "Performance"]
summary: "`key` anlayışı React-in diff və reconciliation mexanizminin əsas hissəsidir. Bu məqalədə `key`-in nə üçün lazım olduğunu, düzgün və səhv istifadənin nəticələrini izah edirik."
---

React hər render zamanı **tamamilə yeni Virtual DOM ağacı** yaradır.
Bu proses qaçılmazdır və dizaynın bir hissəsidir.

Lakin React üçün əsas sual budur:
“Bu yeni ağacdakı elementlər əvvəlki renderdəki hansı elementlərə uyğundur?”

Məhz bu nöqtədə **`key` anlayışı** ortaya çıxır.

`key` React-ə hər bir elementi **identifikasiya etmək** üçün lazımdır.
Əgər bu identifikator yoxdursa, React elementlərin əvvəlki və yeni vəziyyətini düzgün əlaqələndirə bilmir.


## 1. `key` olmadan problem haradan yaranır?

Sadə bir siyahıya baxaq:

```jsx
<ul>
  {['A', 'B', 'C'].map(item => <li>{item}</li>)}
</ul>
```

Bu halda React siyahı elementlərini **sıra nömrəsinə görə** müqayisə edir:

* 0-cı index → A
* 1-ci index → B
* 2-ci index → C

İndi isə massiv dəyişir:

```js
['X', 'A', 'B', 'C']
```

React-in düşündüyü şey budur:

* “A dəyişib X olub”
* “B dəyişib A olub”
* “C dəyişib B olub”

Yəni React **real eyniliyi qura bilmir**.
Nəticədə bütün elementlər yenidən render olunur.

Bu isə:

* lazımsız DOM əməliyyatları
* performans itkisi
* potensial state problemləri deməkdir.

## 2. `key` ilə vəziyyət necə dəyişir?

Eyni nümunəni bu dəfə `key` ilə yazaq:

```jsx
<ul>
  {['A', 'B', 'C'].map(item => (
    <li key={item}>{item}</li>
  ))}
</ul>
```

İndi React elementləri sıraya görə deyil, **identifikatora görə** müqayisə edir.

| Köhnə key | Yeni key | React-in qərarı       |
| --------- | -------- | --------------------- |
| A         | A        | saxla                 |
| B         | B        | saxla                 |
| C         | C        | saxla                 |
| –         | X        | yeni element əlavə et |

Beləliklə:

* mövcud elementlər qorunur
* yalnız yeni element əlavə olunur
* lazımsız render baş vermir

Diff prosesi artıq **məzmunla yox**, **identifikasiya ilə** işləyir.

## 3. Vacib məqam: `key` yalnız list-lər üçün deyil

Çox vaxt `key` yalnız `map` ilə əlaqələndirilir.
Əslində isə bu, yanlış və natamam yanaşmadır.

`key` React üçün elementin kimliyidir və aşağıdakı hallarda da istifadə olunur.

### 3.1. Şərti render zamanı component identity-si

```jsx
{isLogin
  ? <LoginForm key="login" />
  : <RegisterForm key="register" />
}
```

Əgər `key` olmasa, React bu iki komponenti eyni instansiya kimi qəbul edə bilər.
Bu isə arzuolunmaz state daşınmasına səbəb olur.

`key` əlavə edildikdə React başa düşür ki:
* bunlar fərqli komponentlərdir
* biri unmount olunur, digəri yenidən mount edilir

### 3.2. Eyni komponentin fərqli instansiyalarını ayırmaq

```jsx
<UserProfile key={userId} userId={userId} />
```

`userId` dəyişəndə:
* əvvəlki component destroy olunur
* yeni instance yaradılır
* daxili state tam sıfırlanır

Bu davranış bəzən şüurlu olaraq istənilir.

### 3.3. Fragment-lərlə istifadə

```jsx
{steps.map(step => (
  <React.Fragment key={step.id}>
    <h3>{step.title}</h3>
    <p>{step.desc}</p>
  </React.Fragment>
))}
```

Fragment özü DOM-a çıxmasa da, React üçün elementdir və `key` tələb edir.


## 4. `key` React Fiber daxilində nəyi dəyişir?

React Fiber hər element üçün ayrıca **fiber node** saxlayır.
Bu node-un daxilində `key` sahəsi mövcuddur:

```js
fiber = {
  type: 'li',
  key: 'user-42',
  child: null,
  sibling: null,
  return: parentFiber
}
```

Reconciliation zamanı React:

* yeni ağacdakı `key`-i köhnə fiber-lər arasında axtarır
* taparsa → fiber reuse olunur
* tapmazsa → yeni fiber yaradılır, köhnəsi silinir

Buna görə:

* **stabil key** → reusable fiber
* **dəyişən key** → destroy + create


## 5. Müsahibə üçün qısa cavab

> React hər renderdə yeni Virtual DOM ağacı yaradır.
> `key` reconciliation zamanı elementlərin identifikasiyası üçün istifadə olunur.
> Düzgün `key` köhnə və yeni node-ların düzgün müqayisəsini təmin edir, lazımsız render və DOM əməliyyatlarını azaldır və performansı qoruyur.
