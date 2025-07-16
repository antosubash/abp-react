/**
 * Tests for HTML utility functions
 */
import {
  sanitizeHTML,
  validateHTMLContent,
  normalizeHTML,
  processHTMLOutput,
  processHTMLInput,
  isHTMLEmpty,
  extractTextFromHTML,
} from './html-utils';

describe('HTML Utilities', () => {
  describe('sanitizeHTML', () => {
    it('should remove script tags', () => {
      const html = '<p>Hello</p><script>alert("xss")</script>';
      expect(sanitizeHTML(html)).toBe('<p>Hello</p>');
    });

    it('should remove javascript: protocols', () => {
      const html = '<a href="javascript:alert(\'xss\')">Click me</a>';
      expect(sanitizeHTML(html)).not.toContain('javascript:');
    });

    it('should remove event handlers', () => {
      const html = '<button onclick="alert(\'xss\')">Click me</button>';
      expect(sanitizeHTML(html)).not.toContain('onclick');
    });

    it('should handle empty input', () => {
      expect(sanitizeHTML('')).toBe('');
      expect(sanitizeHTML(null as unknown as string)).toBe('');
      expect(sanitizeHTML(undefined as unknown as string)).toBe('');
    });
  });

  describe('validateHTMLContent', () => {
    it('should validate well-formed HTML', () => {
      const html = '<div><p>Hello</p><p>World</p></div>';
      expect(validateHTMLContent(html)).toBe(true);
    });

    it('should detect unbalanced tags', () => {
      const html = '<div><p>Hello</div>';
      expect(validateHTMLContent(html)).toBe(false);
    });

    it('should handle self-closing tags', () => {
      const html = '<div><img src="test.jpg" /><p>Caption</p></div>';
      expect(validateHTMLContent(html)).toBe(true);
    });

    it('should handle empty input', () => {
      expect(validateHTMLContent('')).toBe(true);
      expect(validateHTMLContent(null as unknown as string)).toBe(true);
      expect(validateHTMLContent(undefined as unknown as string)).toBe(true);
    });
  });

  describe('normalizeHTML', () => {
    it('should normalize whitespace', () => {
      const html = '<p>  Hello  \n  World  </p>';
      expect(normalizeHTML(html)).toBe('<p> Hello World </p>');
    });

    it('should handle empty paragraphs', () => {
      expect(normalizeHTML('<p></p>')).toBe('');
      expect(normalizeHTML('<p><br></p>')).toBe('');
      expect(normalizeHTML('<p><br/></p>')).toBe('');
    });

    it('should normalize void elements', () => {
      const html = '<p>Line 1<br />Line 2<hr /></p>';
      expect(normalizeHTML(html)).toBe('<p>Line 1<br>Line 2<hr></p>');
    });

    it('should handle empty input', () => {
      expect(normalizeHTML('')).toBe('');
      expect(normalizeHTML(null as unknown as string)).toBe('');
      expect(normalizeHTML(undefined as unknown as string)).toBe('');
    });
  });

  describe('processHTMLOutput', () => {
    it('should sanitize and normalize HTML', () => {
      const html = '<p>Hello</p><script>alert("xss")</script><p>  World  </p>';
      expect(processHTMLOutput(html)).toBe('<p>Hello</p><p> World </p>');
    });

    it('should handle empty input', () => {
      expect(processHTMLOutput('')).toBe('');
      expect(processHTMLOutput(null as unknown as string)).toBe('');
      expect(processHTMLOutput(undefined as unknown as string)).toBe('');
    });
  });

  describe('processHTMLInput', () => {
    it('should sanitize input HTML', () => {
      const html = '<p>Hello</p><script>alert("xss")</script>';
      expect(processHTMLInput(html)).toBe('<p>Hello</p>');
    });

    it('should handle invalid HTML', () => {
      const html = '<div><p>Unclosed tag';
      expect(processHTMLInput(html)).toBe('<div><p>Unclosed tag');
    });

    it('should handle empty input', () => {
      expect(processHTMLInput('')).toBe('');
      expect(processHTMLInput(null as unknown as string)).toBe('');
      expect(processHTMLInput(undefined as unknown as string)).toBe('');
    });
  });

  describe('isHTMLEmpty', () => {
    it('should detect empty HTML', () => {
      expect(isHTMLEmpty('')).toBe(true);
      expect(isHTMLEmpty('<p></p>')).toBe(true);
      expect(isHTMLEmpty('<div><br></div>')).toBe(true);
    });

    it('should detect non-empty HTML', () => {
      expect(isHTMLEmpty('<p>Hello</p>')).toBe(false);
      expect(isHTMLEmpty('<div> </div>')).toBe(false);
    });

    it('should handle null/undefined input', () => {
      expect(isHTMLEmpty(null as unknown as string)).toBe(true);
      expect(isHTMLEmpty(undefined as unknown as string)).toBe(true);
    });
  });

  describe('extractTextFromHTML', () => {
    it('should extract text from HTML', () => {
      const html = '<p>Hello</p><div>World</div>';
      expect(extractTextFromHTML(html)).toBe('HelloWorld');
    });

    it('should convert HTML entities', () => {
      const html = '<p>Hello &amp; World</p>';
      expect(extractTextFromHTML(html)).toBe('Hello & World');
    });

    it('should handle empty input', () => {
      expect(extractTextFromHTML('')).toBe('');
      expect(extractTextFromHTML(null as unknown as string)).toBe('');
      expect(extractTextFromHTML(undefined as unknown as string)).toBe('');
    });
  });
});