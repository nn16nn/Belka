# Белка / Belka

Қарағанды белкасы — Android карта ойыны (Capacitor 8, target API 36).

- `www/` — ойынның өзі (офлайн, қаріптер ішінде)
- `android/` — Android жобасы
- `.github/workflows/android.yml` — әр push-та қолтаңбалы `app-release.aab` құрастырады (Actions → Artifacts)

Қажетті secret-тер: `BELKA_KEYSTORE_PASSWORD`, `BELKA_KEYSTORE_B64` (upload.jks base64 түрінде).

`.github/workflows/pages.yml` — `www/` папкасын GitHub Pages-ке шығарады (онлайн ойын браузерде).
