// update-json.js - Tauri updater için update.json dosyası oluşturur
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Yapılandırma
const config = {
  version: process.env.VERSION || '0.1.0',
  notes: process.env.NOTES || 'Yeni güncelleme',
  pub_date: new Date().toISOString(),
  platforms: {
    'windows-x86_64': { 
      signature: '', // tauri-key ile imzalandıktan sonra güncellenecek
      url: 'https://github.com/erenaydin0/CrossDoc/releases/latest/download/synchdoc_0.1.0_x64-setup.exe'
    },
    'darwin-x86_64': {
      signature: '', // tauri-key ile imzalandıktan sonra güncellenecek
      url: 'https://github.com/erenaydin0/CrossDoc/releases/latest/download/synchdoc_0.1.0_x64.dmg'
    },
    'darwin-aarch64': {
      signature: '', // tauri-key ile imzalandıktan sonra güncellenecek
      url: 'https://github.com/erenaydin0/CrossDoc/releases/latest/download/synchdoc_0.1.0_aarch64.dmg'
    }
  }
};

// update.json dosyasını oluştur
fs.writeFileSync(
  path.join(__dirname, '..', 'update.json'),
  JSON.stringify(config, null, 2)
);

console.log('update.json dosyası oluşturuldu');