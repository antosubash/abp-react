/**
 * HTML processing utilities for Tiptap editor content serialization
 * These utilities ensure clean, safe HTML output compatible with the existing system
 */

/**
 * Sanitizes HTML content by removing potentially dangerous elements and attributes
 * @param html - Raw HTML string to sanitize
 * @returns Sanitized HTML string
 */
export const sanitizeHTML = (html: string): string => {
  if (!html || typeof html !== 'string') return ''
  
  // Remove potentially dangerous elements and attributes
  const cleanHtml = html
    // Remove script tags completely
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove javascript: protocols
    .replace(/javascript:/gi, '')
    // Remove event handlers (onclick, onload, etc.)
    .replace(/on\w+\s*=/gi, '')
    // Remove inline styles for security (can be re-enabled if needed)
    .replace(/style\s*=/gi, '')
    // Remove potentially dangerous protocols
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
  
  return cleanHtml.trim()
}

/**
 * Validates HTML content structure for basic correctness
 * @param html - HTML string to validate
 * @returns Boolean indicating if HTML structure appears valid
 */
export const validateHTMLContent = (html: string): boolean => {
  if (!html || typeof html !== 'string') return true
  
  try {
    // Check for basic HTML structure validity
    const openTags = (html.match(/<[^\/][^>]*>/g) || []).length
    const closeTags = (html.match(/<\/[^>]*>/g) || []).length
    const selfClosingTags = (html.match(/<[^>]*\/>/g) || []).length
    
    // Allow for some flexibility in tag matching (self-closing tags, void elements, etc.)
    const tagBalance = Math.abs(openTags - closeTags - selfClosingTags)
    
    // Check for obviously malformed content
    const hasUnmatchedBrackets = (html.match(/</g) || []).length !== (html.match(/>/g) || []).length
    
    return tagBalance <= 3 && !hasUnmatchedBrackets
  } catch (error) {
    console.warn('HTML validation error:', error)
    return false
  }
}

/**
 * Normalizes HTML output for consistency with existing system expectations
 * @param html - HTML string to normalize
 * @returns Normalized HTML string
 */
export const normalizeHTML = (html: string): string => {
  if (!html || typeof html !== 'string') return ''
  
  // Handle empty content cases
  if (html === '<p></p>' || html === '<p><br></p>' || html === '<p><br/></p>') {
    return ''
  }
  
  // Normalize HTML formatting
  return html
    // Normalize whitespace within text content
    .replace(/\s+/g, ' ')
    // Remove whitespace between tags
    .replace(/>\s+</g, '><')
    // Remove leading/trailing whitespace
    .trim()
    // Ensure consistent void element formatting
    .replace(/<br\s*\/?>/gi, '<br>')
    .replace(/<hr\s*\/?>/gi, '<hr>')
    // Normalize quote styles
    .replace(/'/g, "'")
    .replace(/"/g, '"')
    .replace(/"/g, '"')
}

/**
 * Processes HTML content for safe output (combines sanitization and normalization)
 * @param html - Raw HTML string to process
 * @returns Clean, normalized HTML string
 */
export const processHTMLOutput = (html: string): string => {
  const sanitized = sanitizeHTML(html)
  const normalized = normalizeHTML(sanitized)
  return normalized
}

/**
 * Processes HTML content for safe input (validates and sanitizes incoming content)
 * @param html - HTML string to process for input
 * @returns Clean HTML string ready for editor consumption
 */
export const processHTMLInput = (html: string): string => {
  if (!html) return ''
  
  // Validate incoming HTML content
  if (!validateHTMLContent(html)) {
    console.warn('Invalid HTML content detected, attempting to clean:', html.substring(0, 100) + '...')
    return sanitizeHTML(html)
  }
  
  return sanitizeHTML(html)
}

/**
 * Checks if HTML content is effectively empty (contains no meaningful content)
 * @param html - HTML string to check
 * @returns Boolean indicating if content is empty
 */
export const isHTMLEmpty = (html: string): boolean => {
  if (!html) return true
  
  // Remove HTML tags and check if any text content remains
  const textContent = html.replace(/<[^>]*>/g, '').trim()
  return textContent.length === 0
}

/**
 * Extracts plain text from HTML content
 * @param html - HTML string to extract text from
 * @returns Plain text content
 */
export const extractTextFromHTML = (html: string): string => {
  if (!html) return ''
  
  return html
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Convert non-breaking spaces
    .replace(/&amp;/g, '&') // Convert HTML entities
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim()
}