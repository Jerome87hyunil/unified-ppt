/**
 * Design System Analyzer
 * 프로젝트의 디자인 시스템을 자동으로 분석합니다
 */

const fs = require('fs');
const path = require('path');

/**
 * CSS 파일 후보 경로들
 */
const CSS_FILE_CANDIDATES = [
  'src/index.css',
  'src/app/globals.css',
  'src/styles/globals.css',
  'styles/globals.css',
  'public/styles.css',
  'app/globals.css',
  'styles/index.css',
];

/**
 * 프로젝트에서 CSS 변수 추출
 */
function extractCSSVariables(projectRoot) {
  const variables = {};

  for (const candidate of CSS_FILE_CANDIDATES) {
    const fullPath = path.join(projectRoot, candidate);

    if (fs.existsSync(fullPath)) {
      console.log(`  📄 CSS 파일 발견: ${candidate}`);
      const content = fs.readFileSync(fullPath, 'utf8');
      const extracted = parseCSSVariables(content);
      Object.assign(variables, extracted);
    }
  }

  return variables;
}

/**
 * CSS 내용에서 :root 블록의 변수 파싱
 */
function parseCSSVariables(css) {
  const variables = {};

  // :root 블록 찾기
  const rootRegex = /:root\s*\{([^}]+)\}/gs;
  const varRegex =/--([\w-]+)\s*:\s*([^;]+);/g;

  const rootMatches = css.matchAll(rootRegex);

  for (const match of rootMatches) {
    const block = match[1];
    const varMatches = block.matchAll(varRegex);

    for (const varMatch of varMatches) {
      const name = varMatch[1];
      const value = varMatch[2].trim();
      variables[name] = value;
    }
  }

  return variables;
}

/**
 * CSS 변수에서 컬러 스킴 추출
 */
function extractColorScheme(variables) {
  const colors = {};

  // 직접 매핑 (기존 로직)
  if (variables['primary']) colors.primary = parseColor(variables['primary']);
  if (variables['secondary']) colors.secondary = parseColor(variables['secondary']);
  if (variables['accent']) colors.accent = parseColor(variables['accent']);
  if (variables['background']) colors.background = parseColor(variables['background']);
  if (variables['foreground']) colors.foreground = parseColor(variables['foreground']);
  if (variables['muted']) colors.muted = parseColor(variables['muted']);
  if (variables['destructive']) colors.destructive = parseColor(variables['destructive']);
  if (variables['border']) colors.border = parseColor(variables['border']);

  // 자동 감지: color 관련 변수 찾기
  const colorKeywords = ['color', 'background', 'bg', 'foreground', 'fg', 'text', 'border', 'primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'danger', 'muted', 'link'];

  Object.entries(variables).forEach(([key, value]) => {
    const lowerKey = key.toLowerCase();

    // 이미 추가된 경우 스킵
    if (colors[key]) return;

    // color 관련 키워드 포함 여부 확인
    const isColorVar = colorKeywords.some(keyword => lowerKey.includes(keyword));

    // 값이 색상 포맷인지 확인 (HEX, RGB, HSL)
    const isColorValue = value.trim().startsWith('#') ||
                        value.trim().startsWith('rgb') ||
                        value.trim().startsWith('hsl') ||
                        /^[\d.]+\s+[\d.]+%\s+[\d.]+%$/.test(value.trim());

    if (isColorVar && isColorValue) {
      const parsedColor = parseColor(value);
      if (parsedColor && parsedColor.startsWith('#')) {
        colors[key] = parsedColor;
        console.log(`  🎨 자동 감지: --${key} → ${parsedColor}`);
      }
    }
  });

  return colors;
}

/**
 * CSS 변수에서 폰트 스킴 추출
 */
function extractFontScheme(variables) {
  const fonts = {};

  // 직접 매핑
  if (variables['font-sans']) fonts.sans = variables['font-sans'];
  if (variables['font-serif']) fonts.serif = variables['font-serif'];
  if (variables['font-mono']) fonts.mono = variables['font-mono'];

  // 자동 감지: font 관련 변수 찾기
  Object.entries(variables).forEach(([key, value]) => {
    const lowerKey = key.toLowerCase();

    // 이미 추가된 경우 스킵
    if (fonts[key]) return;

    // font 관련 키워드 확인
    if (lowerKey.includes('font') && !lowerKey.includes('size') && !lowerKey.includes('weight')) {
      fonts[key] = value;
      console.log(`  📝 자동 감지: --${key} → ${value}`);
    }
  });

  return fonts;
}

/**
 * CSS 변수에서 스페이싱 스킴 추출
 */
function extractSpacingScheme(variables) {
  const spacing = {};

  if (variables['spacing-sm']) spacing.sm = variables['spacing-sm'];
  if (variables['spacing-md']) spacing.md = variables['spacing-md'];
  if (variables['spacing-lg']) spacing.lg = variables['spacing-lg'];
  if (variables['spacing-xl']) spacing.xl = variables['spacing-xl'];

  return spacing;
}

/**
 * 다양한 포맷의 컬러를 HEX로 변환
 */
function parseColor(value) {
  value = value.trim();

  // HEX 형식 (#000000)
  if (value.startsWith('#')) {
    return value;
  }

  // RGB 형식 (rgb(0, 0, 0))
  if (value.startsWith('rgb(')) {
    return rgbToHex(value);
  }

  // HSL 형식 shadcn/ui (221.2 83.2% 53.3%)
  if (/^[\d.]+\s+[\d.]+%\s+[\d.]+%$/.test(value)) {
    return hslToHex(value);
  }

  // HSL 형식 (hsl(221, 83%, 53%))
  if (value.startsWith('hsl(')) {
    return hslFunctionToHex(value);
  }

  // 변환 실패 시 원본 반환
  return value;
}

/**
 * RGB를 HEX로 변환
 */
function rgbToHex(rgb) {
  const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!match) return rgb;

  const r = parseInt(match[1]);
  const g = parseInt(match[2]);
  const b = parseInt(match[3]);

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/**
 * shadcn/ui 형식 HSL을 HEX로 변환 (221.2 83.2% 53.3%)
 */
function hslToHex(hsl) {
  const parts = hsl.split(/\s+/);
  if (parts.length !== 3) return hsl;

  const h = parseFloat(parts[0]);
  const s = parseFloat(parts[1]) / 100;
  const l = parseFloat(parts[2]) / 100;

  return hslValuesToHex(h, s, l);
}

/**
 * HSL 함수 형식을 HEX로 변환 (hsl(221, 83%, 53%))
 */
function hslFunctionToHex(hsl) {
  const match = hsl.match(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/);
  if (!match) return hsl;

  const h = parseFloat(match[1]);
  const s = parseFloat(match[2]) / 100;
  const l = parseFloat(match[3]) / 100;

  return hslValuesToHex(h, s, l);
}

/**
 * HSL 값을 HEX로 변환
 */
function hslValuesToHex(h, s, l) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0, g = 0, b = 0;

  if (h < 60) { r = c; g = x; b = 0; }
  else if (h < 120) { r = x; g = c; b = 0; }
  else if (h < 180) { r = 0; g = c; b = x; }
  else if (h < 240) { r = 0; g = x; b = c; }
  else if (h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }

  const red = Math.round((r + m) * 255);
  const green = Math.round((g + m) * 255);
  const blue = Math.round((b + m) * 255);

  return `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)}`;
}

/**
 * 웹 폰트를 PPT 호환 폰트로 정규화
 */
function normalizeFontsForPPT(fonts) {
  const webSafeFonts = {
    'Inter': 'Arial',
    'Roboto': 'Arial',
    'Open Sans': 'Arial',
    'Lato': 'Arial',
    'Montserrat': 'Arial',
    'Helvetica Neue': 'Helvetica',
    'JetBrains Mono': 'Courier New',
    'Fira Code': 'Courier New',
    'Source Code Pro': 'Courier New',
    'SF Mono': 'Courier New',
  };

  const normalized = {};

  Object.entries(fonts).forEach(([key, value]) => {
    if (!value) return;

    const fontList = value.split(',').map(font => {
      const trimmed = font.trim().replace(/['"]/g, '');
      return webSafeFonts[trimmed] || trimmed;
    });

    normalized[key] = fontList.join(', ');
  });

  return normalized;
}

/**
 * 프레임워크 감지
 */
function detectFramework(dependencies, projectRoot) {
  if (dependencies['next']) return 'nextjs';
  if (dependencies['nuxt']) return 'nuxt';
  if (dependencies['vue']) return 'vue';
  if (dependencies['svelte']) return 'svelte';
  if (dependencies['react']) return 'react';
  if (fs.existsSync(path.join(projectRoot, 'index.html'))) return 'plain';
  return 'unknown';
}

/**
 * 프로젝트 정보 감지
 */
function detectProject(projectRoot) {
  const packagePath = path.join(projectRoot, 'package.json');

  if (!fs.existsSync(packagePath)) {
    console.log('  ⚠️ package.json 없음');
    return {
      framework: 'unknown',
      packageManager: 'unknown',
      typescript: false,
      tailwind: false,
      dependencies: [],
    };
  }

  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  const dependencies = { ...pkg.dependencies, ...pkg.devDependencies };

  const framework = detectFramework(dependencies, projectRoot);
  const typescript = !!dependencies['typescript'];
  const tailwind = !!dependencies['tailwindcss'];

  // 패키지 매니저 감지
  let packageManager = 'unknown';
  if (fs.existsSync(path.join(projectRoot, 'pnpm-lock.yaml'))) packageManager = 'pnpm';
  else if (fs.existsSync(path.join(projectRoot, 'yarn.lock'))) packageManager = 'yarn';
  else if (fs.existsSync(path.join(projectRoot, 'package-lock.json'))) packageManager = 'npm';

  console.log(`  ✅ 프레임워크: ${framework}`);
  console.log(`  ✅ TypeScript: ${typescript ? 'Yes' : 'No'}`);
  console.log(`  ✅ Tailwind: ${tailwind ? 'Yes' : 'No'}`);

  return {
    framework,
    packageManager,
    typescript,
    tailwind,
    dependencies: Object.keys(dependencies),
  };
}

/**
 * 프로젝트 메타데이터 추출
 */
function extractProjectMetadata(projectRoot) {
  const packagePath = path.join(projectRoot, 'package.json');

  if (fs.existsSync(packagePath)) {
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    return {
      projectName: pkg.name || 'Unknown Project',
      projectDescription: pkg.description || '',
    };
  }

  return {
    projectName: 'Unknown Project',
    projectDescription: '',
  };
}

/**
 * 전체 디자인 시스템 분석
 */
async function analyzeDesignSystem(projectRoot) {
  console.log('\n🔍 프로젝트 디자인 시스템 분석 시작...\n');

  // 1. 프로젝트 정보 감지
  console.log('📦 프로젝트 정보 감지 중...');
  const projectInfo = detectProject(projectRoot);

  // 2. CSS 변수 추출
  console.log('\n🎨 CSS 변수 추출 중...');
  const cssVariables = extractCSSVariables(projectRoot);
  console.log(`  ✅ ${Object.keys(cssVariables).length}개 변수 발견`);

  // 3. 컬러 스킴 추출
  console.log('\n🌈 컬러 팔레트 추출 중...');
  const colors = extractColorScheme(cssVariables);
  console.log(`  ✅ ${Object.keys(colors).length}개 컬러 발견`);
  if (Object.keys(colors).length > 0) {
    Object.entries(colors).slice(0, 5).forEach(([key, value]) => {
      console.log(`     • ${key}: ${value}`);
    });
    if (Object.keys(colors).length > 5) {
      console.log(`     ... ${Object.keys(colors).length - 5}개 더`);
    }
  } else {
    console.log('  ⚠️ CSS 변수에서 컬러를 찾을 수 없음 - 기본 테마 사용');
  }

  // 4. 폰트 시스템 추출
  console.log('\n📝 폰트 시스템 추출 중...');
  const rawFonts = extractFontScheme(cssVariables);
  const fonts = normalizeFontsForPPT(rawFonts);
  console.log(`  ✅ ${Object.keys(fonts).length}개 폰트 발견`);
  if (Object.keys(fonts).length > 0) {
    Object.entries(fonts).forEach(([key, value]) => {
      console.log(`     • ${key}: ${value}`);
    });
  } else {
    console.log('  ⚠️ CSS 변수에서 폰트를 찾을 수 없음 - Arial 사용');
  }

  // 5. 스페이싱 시스템 추출
  console.log('\n📏 스페이싱 시스템 추출 중...');
  const spacing = extractSpacingScheme(cssVariables);
  console.log(`  ✅ ${Object.keys(spacing).length}개 스페이싱 레벨 발견`);

  // 6. 프로젝트 메타데이터
  const { projectName, projectDescription } = extractProjectMetadata(projectRoot);

  console.log('\n✅ 디자인 시스템 분석 완료!\n');

  return {
    projectInfo,
    cssVariables,
    colors,
    fonts,
    spacing,
    projectName,
    projectDescription,
  };
}

module.exports = {
  analyzeDesignSystem,
  extractCSSVariables,
  extractColorScheme,
  extractFontScheme,
  normalizeFontsForPPT,
};
