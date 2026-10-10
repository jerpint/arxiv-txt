import test from 'node:test';
import assert from 'node:assert/strict';
import { convertHtmlToText } from '../app/lib/arxiv.js';

const math = (tex, display = 'inline') => `<math display="${display}"><annotation encoding="application/x-tex">${tex}</annotation></math>`;

test('preserves display delimiters and literal replacement patterns', () => {
  for (const tex of ['h=W_{0}x+\\Delta Wx=W_{0}x+BAx', "$$ $& $` $'"]) {
    assert.equal(convertHtmlToText(math(tex, 'block')), `$$${tex}$$`);
  }
});

test('decodes annotation entities once, including numeric entities', () => {
  assert.equal(convertHtmlToText(math('&lt;1% &gt;0.5 &amp; &#945; &amp;lt;')), '$<1% >0.5 & α &lt;$');
});

test('keeps paper headings and excludes page chrome', () => {
  const html = '<nav>REPORT GITHUB ISSUE</nav><article class="ltx_document"><h1>Paper Title</h1><h2 class="ltx_title_section">1 Introduction</h2><p>First paragraph</p><h3 class="ltx_title_subsection">1.1 Method</h3><p>Second paragraph</p></article><footer>Footer</footer>';
  assert.equal(convertHtmlToText(html), '# Paper Title\n\n## 1 Introduction\n\nFirst paragraph\n\n### 1.1 Method\n\nSecond paragraph');
});

test('keeps display math separate from surrounding paragraphs', () => {
  assert.equal(convertHtmlToText(`<p>Before</p>${math('x=1', 'block')}<p>After</p>`), 'Before\n\n$$x=1$$\n\nAfter');
});

test('supports alttext and annotation attributes', () => {
  assert.equal(convertHtmlToText('<math display="block" alttext="x &lt; y"></math>'), '$$x < y$$');
  assert.equal(convertHtmlToText("<math><annotation class='tex' encoding='application/x-tex'>x</annotation></math>"), '$x$');
});

test('preserves literal placeholder-like text and multiple equations', () => {
  assert.equal(convertHtmlToText(`<p>__ARXIV_MATH_0__ ${math('x')} ${math('y')}</p>`), '__ARXIV_MATH_0__ $x$ $y$');
});

test('supports fragments without an article wrapper', () => {
  assert.equal(convertHtmlToText('<p>Plain text.</p>'), 'Plain text.');
});
