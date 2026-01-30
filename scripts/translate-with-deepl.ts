/**
 * DeepL Translation Script for next-intl
 * 
 * This script translates the English messages file to Arabic and Korean using DeepL API.
 * 
 * Usage:
 *   1. Set your DeepL API key: export DEEPL_API_KEY=your-api-key
 *   2. Run: npx ts-node scripts/translate-with-deepl.ts
 * 
 * Get your free DeepL API key at: https://www.deepl.com/pro-api
 */

import * as deepl from 'deepl-node';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ES Module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const MESSAGES_DIR = path.join(__dirname, '..', 'messages');
const SOURCE_FILE = path.join(MESSAGES_DIR, 'en.json');

// Target languages with DeepL language codes
const TARGET_LANGUAGES: { locale: string; deeplCode: deepl.TargetLanguageCode }[] = [
  { locale: 'ar', deeplCode: 'ar' },  // Arabic
  { locale: 'ko', deeplCode: 'ko' },  // Korean
];

// Strings that should NOT be translated (brand names, technical terms, etc.)
const PRESERVE_STRINGS = [
  'CA Agency',
  'Instagram',
  'TikTok',
  'YouTube',
  'Twitter',
  'LinkedIn',
  'Facebook',
  'WhatsApp',
  'K-beauty',
  'K-pop',
  'Gen Z',
  'ROI',
  'CTA',
  'SEO',
  'UAE',
  'GCC',
  'MENA',
  'info@caagency.com',
  '+971 58 510 7546',
  '2417532.01',
];

// Check for API key
if (!DEEPL_API_KEY) {
  console.error('❌ Error: DEEPL_API_KEY environment variable is not set.');
  console.log('\nTo get a DeepL API key:');
  console.log('1. Go to https://www.deepl.com/pro-api');
  console.log('2. Sign up for a free account (500,000 characters/month free)');
  console.log('3. Copy your API key');
  console.log('4. Set it: export DEEPL_API_KEY=your-api-key');
  process.exit(1);
}

// Initialize DeepL translator
const translator = new deepl.Translator(DEEPL_API_KEY);

/**
 * Recursively translate all string values in an object
 */
async function translateObject(
  obj: Record<string, unknown>,
  targetLang: deepl.TargetLanguageCode,
  currentPath = ''
): Promise<Record<string, unknown>> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    const newPath = currentPath ? `${currentPath}.${key}` : key;

    if (typeof value === 'string') {
      // Check if this string should be preserved
      const shouldPreserve = PRESERVE_STRINGS.some(
        (preserve) => value.includes(preserve) && value === preserve
      );

      if (shouldPreserve) {
        result[key] = value;
        console.log(`  ⏭️  Preserved: ${newPath}`);
      } else {
        try {
          // Translate with DeepL
          const translated = await translator.translateText(
            value,
            'en',
            targetLang,
            {
              preserveFormatting: true,
              formality: 'prefer_more', // More formal for marketing content
            }
          );
          result[key] = translated.text;
          console.log(`  ✅ Translated: ${newPath}`);
        } catch (error) {
          console.error(`  ❌ Failed: ${newPath}`, error);
          result[key] = value; // Keep original on error
        }
      }
    } else if (Array.isArray(value)) {
      // Handle arrays (like testimonials)
      const translatedArray: unknown[] = [];
      for (let i = 0; i < value.length; i++) {
        const item = value[i];
        if (typeof item === 'object' && item !== null) {
          translatedArray.push(
            await translateObject(item as Record<string, unknown>, targetLang, `${newPath}[${i}]`)
          );
        } else if (typeof item === 'string') {
          try {
            const translated = await translator.translateText(item, 'en', targetLang, {
              preserveFormatting: true,
              formality: 'prefer_more',
            });
            translatedArray.push(translated.text);
            console.log(`  ✅ Translated: ${newPath}[${i}]`);
          } catch {
            translatedArray.push(item);
          }
        } else {
          translatedArray.push(item);
        }
      }
      result[key] = translatedArray;
    } else if (typeof value === 'object' && value !== null) {
      // Recursively translate nested objects
      result[key] = await translateObject(value as Record<string, unknown>, targetLang, newPath);
    } else {
      // Keep non-string values as-is (numbers, booleans, null)
      result[key] = value;
    }
  }

  return result;
}

/**
 * Add delay to avoid rate limiting
 */
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Main translation function
 */
async function main() {
  console.log('🌍 DeepL Translation Script for CA Agency\n');

  // Check if source file exists
  if (!fs.existsSync(SOURCE_FILE)) {
    console.error(`❌ Source file not found: ${SOURCE_FILE}`);
    process.exit(1);
  }

  // Load source messages
  const sourceMessages = JSON.parse(fs.readFileSync(SOURCE_FILE, 'utf-8'));
  console.log(`📖 Loaded source messages from: ${SOURCE_FILE}\n`);

  // Check DeepL usage
  try {
    const usage = await translator.getUsage();
    if (usage.character) {
      console.log(`📊 DeepL Usage: ${usage.character.count.toLocaleString()} / ${usage.character.limit.toLocaleString()} characters used`);
      const remaining = usage.character.limit - usage.character.count;
      console.log(`   Remaining: ${remaining.toLocaleString()} characters\n`);
    }
  } catch (error) {
    console.warn('⚠️ Could not fetch DeepL usage stats\n');
  }

  // Translate to each target language
  for (const target of TARGET_LANGUAGES) {
    console.log(`\n🔄 Translating to ${target.locale.toUpperCase()} (${target.deeplCode})...`);
    console.log('─'.repeat(50));

    try {
      const translatedMessages = await translateObject(sourceMessages, target.deeplCode);

      // Write translated file
      const targetFile = path.join(MESSAGES_DIR, `${target.locale}.json`);
      fs.writeFileSync(targetFile, JSON.stringify(translatedMessages, null, 2), 'utf-8');

      console.log(`\n✅ Successfully saved: ${targetFile}`);

      // Delay between languages to avoid rate limiting
      await delay(1000);
    } catch (error) {
      console.error(`\n❌ Failed to translate to ${target.locale}:`, error);
    }
  }

  console.log('\n🎉 Translation complete!\n');
  console.log('Next steps:');
  console.log('1. Review the translated files in the messages/ directory');
  console.log('2. Make any necessary adjustments for brand terms');
  console.log('3. Test the translations in your app');
}

// Run the script
main().catch(console.error);
