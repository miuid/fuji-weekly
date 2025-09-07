#!/usr/bin/env node

/**
 * FujiWeekly Recipe Data Updater
 * Downloads and converts latest recipe data to JSON format
 *
 * Usage: node scripts/update-recipes.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const DOWNLOAD_URL = 'https://fxwapp.s3.amazonaws.com/FXW+App+Recipes.xlsx';
const TEMP_FILE = 'temp-recipes.xlsx';
const OUTPUT_FILE = path.join('public', 'recipes.json');

console.log('🚀 Updating FujiWeekly recipe data...');

function downloadFile() {
  return new Promise((resolve, reject) => {
    console.log('📥 Downloading latest data...');
    const file = fs.createWriteStream(TEMP_FILE);

    https.get(DOWNLOAD_URL, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('✅ Download completed!');
        resolve();
      });
    }).on('error', reject);
  });
}

function convertToJson() {
  return new Promise((resolve, reject) => {
    console.log('🔄 Converting to JSON...');

    if (!fs.existsSync('example')) {
      console.log('⚠️  Java converter not found. Use manual conversion.');
      reject(new Error('Java converter not available'));
      return;
    }

    // Copy file and run Java converter
    fs.copyFileSync(TEMP_FILE, path.join('example', 'recipes.xlsx'));

    const { spawn } = require('child_process');
    const java = spawn('mvn', ['compile', 'exec:java', '-Dexec.mainClass=cn.codezhou.fuji.RecipeCrawler'], {
      cwd: 'example',
      stdio: 'inherit'
    });

    java.on('close', (code) => {
      if (code === 0 && fs.existsSync(path.join('example', 'recipes.json'))) {
        fs.copyFileSync(path.join('example', 'recipes.json'), OUTPUT_FILE);
        console.log('✅ Conversion completed!');
        resolve();
      } else {
        reject(new Error(`Conversion failed (exit code: ${code})`));
      }
    });
  });
}

function validateJson() {
  try {
    const data = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
    if (!data.total || !data.data || !Array.isArray(data.data)) {
      throw new Error('Invalid JSON structure');
    }
    console.log(`✅ Validation passed! Total recipes: ${data.total}`);
    return true;
  } catch (error) {
    console.error('❌ Validation failed:', error.message);
    return false;
  }
}

function cleanup() {
  [TEMP_FILE, path.join('example', 'recipes.xlsx')].forEach(file => {
    if (fs.existsSync(file)) fs.unlinkSync(file);
  });
}

async function main() {
  try {
    await downloadFile();
    await convertToJson();

    if (validateJson()) {
      console.log('🎉 Update successful! Restart your dev server to see changes.');
    } else {
      throw new Error('Validation failed');
    }
  } catch (error) {
    console.error('❌ Update failed:', error.message);
    console.log('📖 Check README.md for manual instructions.');
    process.exit(1);
  } finally {
    cleanup();
  }
}

if (require.main === module) main();