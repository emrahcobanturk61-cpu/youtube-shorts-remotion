# YouTube Shorts — Remotion Projesi

Dikey (1080x1920) YouTube Shorts videosu üretmek için hazır Remotion projesi.
Örnek içerik: 4 sahneli, ~15 saniyelik "Fikrini Yaz → Kodunu Oluştur → Videonu Üret → Abone Ol" videosu.

## Hızlı başlangıç (GitHub Codespaces)

1. Depoyu GitHub'da aç: `emrahcobanturk61-cpu/youtube-shorts-remotion`
2. **Code → Codespaces → Create codespace on main**
3. Codespace açılınca bağımlılıklar otomatik kurulur (`npm ci`).
4. Studio'yu başlat:

   ```bash
   npm run dev
   ```

5. Açılan **3000** portunu "Open in Browser" ile aç. Sol panelde `EgitimVideoShorts` kompozisyonunu görürsün.

## Video üretme

```bash
npm run render     # out/egitim-shorts.mp4
npm run still      # out/cover.png (kapak karesi)
```

İlk render'da Remotion Chromium'u indirir, birkaç dakika sürebilir.

## Proje yapısı

```
src/
  index.ts        # Remotion giriş noktası (registerRoot)
  Root.tsx        # Kompozisyon tanımı (1080x1920, 30 FPS)
  Composition.tsx # Sahneler, animasyonlar, renkler
remotion.config.ts
.devcontainer/    # Codespaces ortamı (Node 22)
```

## Yeni video eklemek

`src/Root.tsx` içine yeni bir `<Composition>` ekle ve `src/` altında bileşenini oluştur.
Sahne süresini `src/Composition.tsx` içindeki `SCENE_DURATION` ile değiştirebilirsin
(30 FPS'te 112 kare ≈ 3.7 sn).

## Bilinen notlar

- **Termux/Android'de render çalışmaz:** Remotion'ın Chromium indirmesi Android'i
  desteklemiyor ("Unsupported platform: android"). Termux'da sadece kod düzenlenir,
  render Codespaces'te yapılır.
- **Rspack kullanılmıyor:** `Config.setRspack(true)` Android'de native binding
  bulamadığı için kaldırıldı; webpack ile her yerde çalışır.
- `node_modules/` ve `out/` artık `.gitignore` içinde — depo şişmez.

## Shorts kanalı açma kontrol listesi

- [ ] YouTube hesabıyla kanal oluştur (marka hesabı önerilir)
- [ ] Kanal adı + @kullanıcı adı + profil/ kapak görseli
- [ ] Kanal açıklaması ve bağlantılar
- [ ] İlk 3-5 Shorts videosunu yükle (dikey, 15-60 sn, 1080x1920)
- [ ] Başlık/açıklama/etiketlerde anahtar kelime kullan
- [ ] Sabit yükleme takvimi (örn. haftada 3 Shorts)
- [ ] YouTube Studio → Analytics ile izlenme/etkileşim takibi
