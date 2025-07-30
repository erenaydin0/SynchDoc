# SynchDoc Otomatik Güncelleme Sistemi

SynchDoc, Tauri'nin sağladığı güçlü otomatik güncelleme sistemi ile kullanıcıların her zaman en son sürümü kullanmasını sağlar.

## Nasıl Çalışır?

1. **Güncelleme Kontrolü**: Uygulama başlatıldığında, GitHub Releases'deki en son sürümü kontrol eder.
2. **Kullanıcı Bildirimi**: Yeni bir sürüm bulunduğunda, kullanıcıya bildirim gösterilir.
3. **Otomatik İndirme**: Kullanıcı onaylarsa, güncelleme indirilir ve uygulanır.
4. **Yeniden Başlatma**: Güncelleme tamamlandıktan sonra uygulama yeniden başlatılır.

## Teknik Detaylar

### 1. Tauri Updater Plugin

Güncelleme işlemleri `@tauri-apps/plugin-updater` ile yönetilir. Bu plugin:

- Güncelleme kontrolü (`checkUpdate`)
- Güncelleme indirme ve yükleme (`installUpdate`)
- İmza doğrulama

işlemlerini gerçekleştirir.

### 2. update.json Dosyası

Her sürüm için bir `update.json` dosyası oluşturulur ve GitHub Releases'e yüklenir:

```json
{
  "version": "0.1.0",
  "notes": "Yeni güncelleme",
  "pub_date": "2023-06-20T12:00:00Z",
  "platforms": {
    "windows-x86_64": {
      "signature": "...",
      "url": "https://github.com/erenaydin0/CrossDoc/releases/latest/download/synchdoc_0.1.0_x64-setup.exe"
    },
    "darwin-x86_64": {
      "signature": "...",
      "url": "https://github.com/erenaydin0/CrossDoc/releases/latest/download/synchdoc_0.1.0_x64.dmg"
    },
    "darwin-aarch64": {
      "signature": "...",
      "url": "https://github.com/erenaydin0/CrossDoc/releases/latest/download/synchdoc_0.1.0_aarch64.dmg"
    }
  }
}
```

### 3. GitHub Actions Workflow

Güncelleme süreci GitHub Actions ile otomatikleştirilmiştir:

1. Yeni bir tag oluşturulduğunda (örn. `v0.1.1`), workflow tetiklenir
2. Tüm platformlar için build alınır
3. `update.json` dosyası oluşturulur
4. Dosyalar GitHub Releases'e yüklenir

## Güvenlik

Güncellemeler dijital olarak imzalanır ve doğrulanır. Bu, güncelleme dosyalarının manipüle edilmesini önler.

## Kullanıcı Deneyimi

- Kullanıcılar güncellemeleri erteleyebilir
- Güncelleme indirme işlemi arka planda gerçekleşir
- Güncelleme tamamlandığında kullanıcıya bildirim gösterilir

## Geliştirici Notları

Yeni bir sürüm yayınlamak için:

1. Kodu güncelleyin
2. `src-tauri/tauri.conf.json` dosyasındaki versiyonu artırın
3. Değişiklikleri commit edin
4. Yeni bir tag oluşturun: `git tag v0.1.1`
5. Tag'i push edin: `git push origin v0.1.1`
6. GitHub Actions otomatik olarak yeni sürümü oluşturacak ve yayınlayacaktır