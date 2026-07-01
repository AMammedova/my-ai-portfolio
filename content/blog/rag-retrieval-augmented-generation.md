---
title: "RAG nədir və LLM-i necə 'yalan danışmamağa' kömək edir?"
date: "2026-06-03"
tags: ["RAG", "LLM", "AI", "Vector Database", "GenAI"]
summary: "Retrieval-Augmented Generation (RAG) LLM-lərin halüsinasiya problemini həll etmək üçün xarici bilik bazasından məlumat çəkib modelin kontekstinə əlavə edən bir arxitekturadır."
---

Əvvəlki məqalədə LLM-lərin əsas məhdudiyyətlərindən birini qeyd etdik: **halüsinasiya** — modelin əslində bilmədiyi bir şeyi uydurub əminliklə cavab verməsi. Bu məqalədə bu problemi həll etmək üçün ən geniş yayılmış yanaşmalardan biri olan **RAG** (Retrieval-Augmented Generation) arxitekturasını araşdıracağıq.

## Problem: LLM niyə "yalan danışır"?

LLM-lər pre-training zamanı öyrəndikləri məlumatları **model ağırlıqlarında (weights)** saxlayır. Bu o deməkdir ki:

- Model yalnız təlim məlumatlarındakı bilgiləri bilir.
- Təlim kəsildiyi tarixdən sonrakı hadisələrdən xəbərsizdir.
- Şirkətinizin daxili sənədlərini, bazasını, xüsusi məlumatlarını bilmir.
- Cavab verməyə məcbur ediləndə bəzən **uydurmaya** başlayır.

**Sadə misal:** Bir bank öz müştəriləri üçün AI chatbot qursun. Müştəri soruşur: "Sizin ipoteka faiz dərəcəniz neçədir?" — LLM bu məlumatı bilmədiyi üçün ya köhnəlmiş rəqəm verir, ya da uydurur.

## RAG nədir?

**Retrieval-Augmented Generation (RAG)** — modelin cavab verməzdən əvvəl xarici bir bilik bazasından uyğun məlumatı tapıb, onu kontekst kimi istifadə etməsi prinsipinə əsaslanan arxitekturadır.

Sadə dillə: LLM-ə cavab verməzdən əvvəl əlaqəli sənədlər "göstərilir" və model öz biliyinə deyil, bu sənədlərə əsaslanaraq cavab verir.

## RAG necə işləyir?

RAG arxitekturası iki əsas mərhələdən ibarətdir: **İndeksləmə** və **Sorğu-Cavab**.

### Mərhələ 1: İndeksləmə (Indexing)

Bu mərhələ bir dəfə aparılır — bilik bazası hazırlanır.

**1. Sənədlərin yüklənməsi**

Şirkətin sənədləri, PDF-lər, veb sayt məzmunu, məlumat bazaları — bütün mənbələr sistemə yüklənir.

**2. Parçalanma (Chunking)**

Uzun sənədlər kiçik hissələrə — **chunk**-lara — bölünür. Məsələn, 50 səhifəlik sənəd 200 ayrı parçaya bölünə bilər. Bu ona görədir ki, LLM-in kontekst pəncərəsi məhduddur — hər şeyi birdən oxuya bilmir.

**3. Embedding — Vektorlaşdırma**

Hər chunk xüsusi bir **embedding modeli** vasitəsilə ədədi vektora çevrilir. Bu vektorlar sözlərin və cümlələrin **mənasını** riyazi formada ifadə edir.

Məsələn:
- "ipoteka faizi" → `[0.23, -0.71, 0.88, ...]`
- "kredit dərəcəsi" → `[0.21, -0.69, 0.90, ...]`

Bu iki vektor bir-birinə çox yaxındır — çünki mənaca oxşardırlar.

**4. Vektor bazasına saxlanma**

Bütün vektorlar **vektor bazasına** (vector database) yüklənir. Pinecone, Weaviate, Qdrant, pgvector bu məqsəd üçün istifadə edilən populyar həllərdir.

---

### Mərhələ 2: Sorğu-Cavab (Retrieval + Generation)

İstifadəçi sual verdikdə bu mərhələ işə düşür.

**1. Sorğunun vektorlaşdırılması**

İstifadəçinin sualı eyni embedding modeli vasitəsilə vektora çevrilir.

```
"Sizin ipoteka faiziniz neçədir?" → [0.22, -0.70, 0.89, ...]
```

**2. Semantik axtarış**

Vektor bazasında bu sorğu vektoruna **ən yaxın vektorlar** tapılır. Bu klassik açar söz axtarışından fərqlidir — məna əsaslıdır. "faiz dərəcəsi" soruşsanız, "kredit xərci" haqqında olan chunk da tapıla bilər.

**3. Kontekstin formalaşdırılması**

Tapılan ən uyğun chunk-lar LLM-in sorğusuna kontekst kimi əlavə edilir:

```
Kontekst:
[Sənəd 1]: "Bankımızın cari ipoteka faiz dərəcəsi 12%-dir..."
[Sənəd 2]: "Faiz dərəcəsi kredit müddəti və müştəri tarixçəsinə görə dəyişir..."

Sual: Sizin ipoteka faiziniz neçədir?
```

**4. LLM cavab yaradır**

Model artıq uydurma etmir — verilmiş sənədlərə əsaslanaraq dəqiq cavab verir:

```
"Bankımızın cari ipoteka faiz dərəcəsi 12%-dir. Lakin bu dərəcə 
kredit müddəti və kredit tarixçənizə görə dəyişə bilər."
```

## RAG vs Fine-tuning: Hansını seçməli?

| Meyar | RAG | Fine-tuning |
| --- | --- | --- |
| **Məlumatın yenilənməsi** | Asandır — yeni sənəd əlavə et | Çətindir — modeli yenidən öyrət |
| **Xərc** | Aşağı | Yüksək (GPU, vaxt) |
| **Şəffaflıq** | Mənbəni göstərə bilir | Qara qutu |
| **Xüsusi üslub/davranış** | Məhduddur | Güclüdür |
| **Aktual məlumat** | Həmişə cari | Yalnız təlim vaxtı |

**Qısa qayda:** Bilik bazanız tez-tez dəyişirsə və ya mənbəyə istinad etmək istəyirsinizsə — **RAG**. Modelin tonunu, üslubunu, davranışını dəyişmək istəyirsinizsə — **fine-tuning**.

## Həqiqi tətbiq nümunələri

- **Müştəri dəstəyi chatbotu** — şirkətin sənədləri, FAQ, məhsul təlimatları üzərindən cavab verir.
- **Hüquq texnologiyaları** — minlərlə qanun məqaləsi arasından uyğun maddəni tapır.
- **Tibbi sistemlər** — həkimlərə ən son tədqiqat məqalələrindən süzülmüş məlumat verir.
- **Kod assistanları** — şirkətin daxili kod bazasını oxuyaraq context-aware təklif verir.

## RAG-ın məhdudiyyətləri

- **Chunk keyfiyyəti:** Sənədlər düzgün parçalanmasa, uyğun məlumat tapılmaya bilər.
- **Embedding modeli:** Zəif embedding modeli semantik oxşarlığı düzgün ölçə bilmir.
- **Kontekst pəncərəsi:** Həddən çox chunk daxil edilsə, LLM-in diqqəti dağılır.
- **Hallucination hələ mümkündür:** Chunk tapılmasa da model yenə cavab verməyə çalışa bilər.

## Nəticə

RAG LLM-ləri statik, qapalı sistemlərdən dinamik, bilik bazasına bağlı sistemlərə çevirir. Model artıq yalnız öyrəndiklərini deyil, **sizin** məlumatlarınıza əsaslanaraq cavab verir — daha dəqiq, daha etibarlı, mənbəyə istinad edilə bilən.

Bu arxitektura bugün enterprise AI tətbiqlərinin əksəriyyətinin təməlini təşkil edir və RAG-ı başa düşmək real dünya AI sistemlərinin necə işlədiyini anlamaq deməkdir.
