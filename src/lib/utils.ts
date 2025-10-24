import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Category slug utilities
export function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .replace(/&/g, 'and') // Replace & with 'and' first
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

export function slugToCategory(slug: string): string {
  // Convert slug to category name dynamically
  const result = slug
    .split('-')
    .map(word => {
      // Handle special case for 'and' -> '&'
      if (word.toLowerCase() === 'and') {
        return '&';
      }
      // Handle special case for 'gate' -> 'GATE'
      if (word.toLowerCase() === 'gate') {
        return 'GATE';
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
  
  console.log('🔍 Slug to Category conversion:', { slug, result });
  return result;
}