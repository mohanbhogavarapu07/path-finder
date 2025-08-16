#!/usr/bin/env node

/**
 * Script to update remaining color references in assessment files
 * Run with: node update_remaining_colors.js
 */

const fs = require('fs');
const path = require('path');

// Color mapping for replacements
const colorMappings = [
  // Primary colors
  { from: 'bg-blue-600', to: 'bg-factorbeam-primary' },
  { from: 'hover:bg-blue-700', to: 'hover:bg-factorbeam-primary-alt' },
  { from: 'text-blue-600', to: 'text-factorbeam-primary' },
  { from: 'border-blue-600', to: 'border-factorbeam-primary' },
  
  // Green colors (for CTAs and success states)
  { from: 'bg-green-600', to: 'bg-factorbeam-green' },
  { from: 'hover:bg-green-700', to: 'hover:bg-factorbeam-green-alt' },
  { from: 'text-green-600', to: 'text-factorbeam-green' },
  
  // Yellow colors (for warnings and highlights)
  { from: 'bg-yellow-600', to: 'bg-factorbeam-yellow' },
  { from: 'hover:bg-yellow-700', to: 'hover:bg-factorbeam-yellow-alt' },
  { from: 'text-yellow-600', to: 'text-factorbeam-yellow' },
  
  // Background colors
  { from: 'bg-gray-50', to: 'bg-factorbeam-bg-alt' },
  { from: 'bg-gray-100', to: 'bg-factorbeam-bg-alt' },
  
  // Text colors
  { from: 'text-gray-900', to: 'text-factorbeam-heading' },
  { from: 'text-gray-700', to: 'text-factorbeam-text' },
  { from: 'text-gray-600', to: 'text-factorbeam-text-alt' },
];

// Directories to process
const directories = [
  'src/pages/assessments',
  'src/components',
  'src/pages'
];

// File extensions to process
const extensions = ['.tsx', '.ts', '.jsx', '.js'];

function updateFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    
    colorMappings.forEach(mapping => {
      const regex = new RegExp(mapping.from, 'g');
      if (regex.test(content)) {
        content = content.replace(regex, mapping.to);
        updated = true;
        console.log(`  Updated ${mapping.from} → ${mapping.to}`);
      }
    });
    
    if (updated) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✓ Updated: ${filePath}`);
    }
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
  }
}

function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.log(`Directory not found: ${dirPath}`);
    return;
  }
  
  const items = fs.readdirSync(dirPath);
  
  items.forEach(item => {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and other build directories
      if (!['node_modules', '.git', 'dist', 'build'].includes(item)) {
        processDirectory(fullPath);
      }
    } else if (stat.isFile()) {
      const ext = path.extname(item);
      if (extensions.includes(ext)) {
        updateFile(fullPath);
      }
    }
  });
}

console.log('🔄 Starting FactorBeam color update...\n');

directories.forEach(dir => {
  console.log(`Processing directory: ${dir}`);
  processDirectory(dir);
  console.log('');
});

console.log('✅ Color update completed!');
console.log('\n📋 Next steps:');
console.log('1. Review the changes made');
console.log('2. Test the website functionality');
console.log('3. Check for any remaining color inconsistencies');
console.log('4. Run accessibility tests');
console.log('5. Test across different browsers and devices');
