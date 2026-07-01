---
title: "Böyük Dil Modelləri (LLM)"
date: "2026-06-02"
tags: ["LLM", "AI", "Transformer", "Neural Networks", "GenAI"]
summary: "LLM-lərin nə olduğu, parametrlər və neyron şəbəkələri, transformer arxitekturası, təlim mərhələləri (pre-training, fine-tuning, RLHF) və əsas məhdudiyyətlər haqqında ətraflı baxış."
---

Böyük Dil Modelləri (LLM) 2022-ci ildən bəri maşınların insan dilini oxumasına, təhlil etməsinə, şərh etməsinə və ondan məna çıxarmasına imkan verən bir sıra Süni İntellekt (AI) sistemləridir.

Dil modeli (language model) mətn girişini — sorğu (prompt) — emal etmək, anlamaq və buna uyğun olaraq mətn çıxışı — cavab (response) — yaratmaq üçün qurulmuşdur.

LLM əslində mətnin **ehtimal modelidir** (probabilistic model of text). O, cümlədə verilmiş söz ardıcıllığının baş vermə ehtimalını əvvəlki sözlərə əsaslanaraq müəyyənləşdirir və cümlədə növbəti sözün hansı sözün daha çox görünəcəyini proqnozlaşdırmağa kömək edir.

## "Böyük" anlayışı

Adi dil modeli ilə Böyük Dil Modeli (LLM) arasındakı əsas fərq istifadə olunan **parametrlərin** sayındadır. Parametrlər neyron şəbəkədə tənzimlənən çəkilərdir (adjustable weights).

**Parametrlərin mənası:** Böyük bir dil modelindəki parametrlərin ümumi sayı, modelin daxilindəki bütün neyron şəbəkələrindən gələn parametrlər toplanarkən əldə edilir. Parametrlərin sayı modelin mürəkkəbliyini anlamağımıza kömək edir. Məsələn, 14 milyard parametrə malik bir dil modeli əslində olduqca orta səviyyəli bir LLM hesab olunur.

## Neyron şəbəkələri (Neural Networks)

Parametrlərin nə olduğunu başa düşmək üçün neyron şəbəkələrinin əsas prinsiplərinə baxmalıyıq.

- **Tərif:** Neyron şəbəkəsi insan beyninin strukturu və işləmə prinsipindən ilhamlanmış hesablama modelidir.
- **Struktur:** Şəbəkə bir-birinə bağlı neyron qatlarından ibarətdir; bu neyronlar giriş məlumatlarını emal edir və çevirərək bir nəticə çıxarır.

Sadə bir neyron şəbəkəsi üç əsas hissədən ibarətdir:

| Qat | Vəzifə |
| --- | --- |
| **Giriş qatı (Input Layer)** | Rəqəmlər, şəkillər və ya mətn kimi məlumatları qəbul edir |
| **Gizli qatlar (Hidden Layers)** | Hesablamalar aparır və giriş məlumatlarından nümunələri çıxarır |
| **Çıxış qatı (Output Layer)** | Yekun proqnozları və ya təsnifatları, adətən ehtimallar şəklində verir |

## Məlumat emalı və parametrlər

Məlumatların emalı mürəkkəbmiş kimi səslənsə də, əslində sadə vurma və toplama əməliyyatlarını əhatə edir. Hər bir neyron şəbəkəsi əsasən iki növ parametrə sahibdir: **çəkilər (weights)** və **bias**.

### Çəkilər (Weights)

- Ardıcıl qatlardakı neyronlar arasındakı hər bir əlaqə vurma əməliyyatına cavabdehdir.
- Diaqramda görünən hər bir əlaqəyə təyin edilmiş bir çəki var.
- Bu çəki neyronun aktivasiyasını hesablamaq üçün giriş dəyərini vurmaq üçün istifadə olunur.

### Bias

1. Vurma əməliyyatlarının nəticələri toplanılır.
2. Hər bir neyronun yekun nəticəyə əlavə etdiyimiz bir **bias** parametri var.

**Sadə misal:** Ən sadə neyron şəbəkəsində (iki giriş düyünü və bir çıxış neyronu ilə) iki çəki (hər giriş üçün bir əlaqə) və bir bias olur. Beləliklə, bu şəbəkənin **üç parametri** var (iki çəki və bir bias).

Məlumat emalına nümunə:

- Giriş dəyəri 4, çəki 1 → nəticə 4
- İkinci giriş dəyəri 2, çəki 3 → nəticə 6
- Toplama: 4 + 6 = 10
- Bias 2 olarsa → yekun nəticə **12**

### Real həyat nümunəsi

**Weights** şəbəkədə girişin nə qədər önəmli olduğunu müəyyənləşdirən parametrlərdir.

Məsələn, bir şirkətdə işçini işə götürərkən iki faktora baxırsınız: təcrübə illəri və təhsil səviyyəsi. Əgər sizin üçün təcrübə daha vacibdirsə, təcrübəyə daha yüksək çəki verirsiniz. Təhsil də əhəmiyyətlidir, amma ona daha kiçik çəki verə bilərsiniz.

Yəni **weights = giriş faktorunun "əhəmiyyət dərəcəsi"**.

**Bias** (sürüşmə parametri) nəticəni sabit bir dəyər qədər artırıb və ya azaldan əlavə parametrlərdir.

Real həyatda: şirkət deyir ki, "kim olursa-olsun, bizim minimum qəbul şərtimiz var." Yəni nəticəyə hər zaman əlavə +2 xal əlavə olunur. Bu, həmişə mövcud olan "əsas şərt" kimidir.

## LLM necə işləyir?

Böyük Dil Modellərinin əsas gücü onların **transformer arxitekturası** üzərində qurulmasındadır. Transformer 2017-ci ildə "Attention is All You Need" adlı məqalədə təqdim olundu və o vaxtdan bəri bütün müasir LLM-lərin təməl texnologiyasıdır.

Əksər müasir LLM-lər, o cümlədən bütün GPT ailəsi, **avtoreqressiv dil modelləridir**. Avtoreqressiv dil modeli mətn yaradarkən hər yeni sözü (və ya tokeni) əvvəlki sözlərə əsaslanaraq addım-addım proqnozlaşdırır.

Yəni cümləni tam birdən yaratmır, əksinə:

1. İlk sözü seçir
2. Sonra həmin sözə əsaslanaraq ikinci sözü seçir
3. Daha sonra əvvəlki iki sözə baxaraq üçüncü sözü seçir
4. … və bu proses ardıcıl davam edir

Bu üsul **autoregressive** adlanır, çünki model öz əvvəlki çıxışlarını (generated tokens) növbəti proqnoz üçün giriş kimi istifadə edir.

### 1. Tokenizasiya

Model mətnlə birbaşa işləyə bilmir. İlk addımda mətn **tokenlərə** parçalanır. Token bir söz, bir sözün hissəsi və ya hətta tək bir simvol ola bilər.

Hər token sonra **embedding** adlı ədədi vektorlara çevrilir. Bu vektorlar sözlərin semantik əlaqələrini daşıyır: məsələn, "müəllim" və "tələbə" vektorları bir-birinə yaxın yerləşir.

### 2. Özünə diqqət mexanizmi (Self-Attention)

LLM-lərin əsas fərqi **self-attention** mexanizmidir. Bu yanaşma modelə bütün cümləni eyni anda nəzərə almağa imkan verir.

Məsələn, "Bank çayın sahilində idi" cümləsində "bank" sözünün "çay sahili" ilə əlaqəli olduğunu model self-attention vasitəsilə müəyyənləşdirə bilir.

### 3. Növbəti sözün proqnozlaşdırılması

LLM-in işi sadə görünür: əvvəlki sözlərə baxaraq növbəti tokenin ehtimalını hesablayır.

Məsələn, modelə "Payızda ağaclardan yarpaqlar …" verildikdə, "tökülür" sözünün gəlmə ehtimalı "rəqs edir" sözündən daha yüksək olacaq. Bu ehtimal hesablamaları milyonlarla parametrin (weights və bias) birgə işləməsi nəticəsində əldə edilir.

### 4. Çıxışın yaradılması

Model ən yüksək ehtimallı sözü seçərək cümləni davam etdirir. Bu proses addım-addım təkrarlanır və nəticədə insan dilinə bənzər axıcı cavab yaranır.

## LLM-lərin öyrədilməsi

Böyük Dil Modellərinin bu qədər güclü olmasının səbəbi onların geniş miqyaslı təlim prosesindən keçməsidir.

### 1. Pre-training (İlkin təlim)

Model əvvəlcə internetdən, kitabxanalardan, məqalələrdən və digər açıq mənbələrdən toplanmış çox böyük mətn korpusları üzərində öyrədilir. Bu mərhələdə modelin əsas məqsədi sadədir: **növbəti tokeni proqnozlaşdırmaq**.

Məsələn, "Azərbaycanın paytaxtı …" ifadəsi verildikdə, model çoxlu təlim nümunələrinə əsaslanaraq "Bakı" cavabını yüksək ehtimalla seçir.

Bu mərhələ adətən milyardlarla parametrin öyrədilməsi üçün minlərlə GPU istifadə etməyi və həftələrlə davam edən hesablama gücünü tələb edir.

### 2. Fine-tuning (İncə tənzimləmə)

İlkin təlimdən sonra model hələ də çox "ümumi" olur. İstifadəçi suallarına daha dəqiq və faydalı cavab verməsi üçün əlavə mərhələ — **fine-tuning** — tətbiq olunur. Burada model kiçik və xüsusi hazırlanmış datasetlərlə öyrədilir.

Məsələn, hüquq sahəsində istifadə ediləcək LLM qanunvericilik mətnləri üzərində fine-tune edilə bilər.

### 3. RLHF — İnsan əlaqəsi ilə gücləndirmə təlimi

Ən son mərhələlərdən biri **Reinforcement Learning from Human Feedback (RLHF)** adlanır. Bu yanaşmada insanlar modelin cavablarını qiymətləndirir — hansı cavab yaxşıdır, hansı isə zəifdir.

Daha sonra bu qiymətləndirmələrdən istifadə edərək modelin nəticələri "mükafatlandırılır" və ya "cəzalandırılır". Bu üsul modelin insan üslubuna daha yaxın və faydalı cavablar verməsini təmin edir.

## Əhəmiyyətli modellər və miqyaslama qanunları

| Model | Qeyd |
| --- | --- |
| **GPT (OpenAI)** | GPT-1-dən GPT-5-ə qədər inkişaf edib, ən məşhur dil modellərindən biridir |
| **PaLM (Google)** | Çoxdilli dəstəyi ilə tanınır |
| **LLaMA (Meta)** | Daha yüngül və açıq mənbəli |
| **Claude (Anthropic)** | Təhlükəsizlik və etik prinsiplərə yönəlib |
| **Mistral, Falcon, Gemma** | Son illərdə performans və səmərəliliyi ilə fərqlənir |

**Scaling laws:** Parametrlərin, məlumatın və hesablama gücünün artırılması nəticəni yaxşılaşdırır. Lakin müəyyən həddən sonra əlavə resursların faydası azalır, amma xərc və enerji sərfi sürətlə artır.

## LLM-lərin əsas məhdudiyyətləri

- **Xərc:** Nəhəng infrastruktur və maliyyə tələb edir.
- **Etibarlılıq:** Halüsinasiyalar — modelin səhv və ya uydurma məlumat yaratması mümkündür.
- **Müəllif hüquqları:** Təlim məlumatları və çıxış nəticələrinin hüquqi statusu mübahisəlidir.
- **Məxfilik və təhlükəsizlik:** Təlim zamanı şəxsi məlumatların sızma riski var.
