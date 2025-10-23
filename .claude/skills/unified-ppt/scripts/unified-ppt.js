#!/usr/bin/env node

/**
 * Unified PPT Generator
 * 프로젝트 디자인 시스템을 자동으로 분석하여 PPT 생성
 * PptxGenJS를 사용하여 네이티브 PowerPoint 파일 생성
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 자동 의존성 설치
function ensureDependencies() {
  const skillDir = path.join(__dirname, '..');
  const nodeModulesPath = path.join(skillDir, 'node_modules');

  if (!fs.existsSync(nodeModulesPath)) {
    console.log('\n📦 의존성을 설치하는 중...');
    console.log('   (최초 1회만 실행됩니다)\n');

    try {
      execSync('npm install', {
        cwd: skillDir,
        stdio: 'inherit',
      });
      console.log('\n✅ 의존성 설치 완료!\n');
    } catch (error) {
      console.error('\n❌ 의존성 설치 실패:', error.message);
      console.error('\n수동 설치 방법:');
      console.error(`  cd ${skillDir}`);
      console.error('  npm install\n');
      process.exit(1);
    }
  }
}

// 의존성 확인 및 설치
ensureDependencies();

const { analyzeDesignSystem } = require('./analyzer');
const { generatePPTX } = require('./pptx-generator-v2');

/**
 * 추출된 디자인 시스템으로 기본 스타일 생성
 */
function createDefaultStyles(designSystem) {
  const colors = designSystem.colors || {};
  const primary = colors.primary || colors.brand || '#2563EB';
  const secondary = colors.secondary || colors.accent || '#64748B';
  const background = colors.background || '#FFFFFF';
  const text = colors.text || colors.foreground || '#1F2937';
  const muted = colors.muted || '#6B7280';

  return {
    title: {
      background: primary,
      title: { color: '#FFFFFF', fontSize: 48 },
      subtitle: { color: '#E5E7EB', fontSize: 24 },
    },
    section: {
      background: primary,
      title: { color: '#FFFFFF', fontSize: 44 },
    },
    content: {
      background: '#F9FAFB',
      accentBar: { color: primary },
      title: { color: text, fontSize: 32 },
      body: { color: text, fontSize: 18 },
    },
    bullet: {
      background: '#FFFFFF',
      accentBar: { color: primary },
      title: { color: text, fontSize: 32 },
      bullets: {
        primaryColor: primary,
        secondaryColor: secondary,
        mutedColor: muted,
        fontSize: 18,
      },
    },
    twoColumn: {
      background: '#F9FAFB',
      title: { color: text, fontSize: 32 },
      leftColumn: { backgroundColor: '#FFFFFF', textColor: text },
      rightColumn: { backgroundColor: '#FFFFFF', textColor: text },
    },
    thankYou: {
      background: '#F9FAFB',
      message: { color: primary, fontSize: 44 },
      contact: { color: muted, fontSize: 20 },
    },
    image: {
      background: '#FFFFFF',
      title: { color: text, fontSize: 32 },
      caption: { color: muted, fontSize: 16 },
    },
    chart: {
      background: '#FFFFFF',
      title: { color: text, fontSize: 32 },
      chartColors: [primary, secondary, muted],
    },
    table: {
      background: '#FFFFFF',
      title: { color: text, fontSize: 32 },
      header: { backgroundColor: primary, textColor: '#FFFFFF' },
      body: { backgroundColor: '#FFFFFF', textColor: text },
    },
    quote: {
      background: '#F9FAFB',
      quote: { color: text, fontSize: 32, italic: true },
      author: { color: muted, fontSize: 20 },
    },
    comparison: {
      background: '#FFFFFF',
      title: { color: text, fontSize: 32 },
      leftContent: { backgroundColor: '#FFFFFF', textColor: text },
      rightContent: { backgroundColor: '#FFFFFF', textColor: text },
    },
    timeline: {
      background: '#FFFFFF',
      title: { color: text, fontSize: 32 },
      node: { fillColor: primary, borderColor: primary },
      itemTitle: { color: text, fontSize: 18 },
      itemDescription: { color: muted, fontSize: 14 },
    },
  };
}

/**
 * 슬라이드에 기본 스타일 적용 (style 속성이 없는 경우만)
 */
function applyDefaultStylesToSlides(slides, defaultStyles) {
  return slides.map((slide) => {
    // 이미 style이 있으면 그대로 유지
    if (slide.style) {
      return slide;
    }

    // 슬라이드 타입에 맞는 기본 스타일 적용
    const typeStyle = defaultStyles[slide.type];
    if (typeStyle) {
      return {
        ...slide,
        style: typeStyle,
      };
    }

    return slide;
  });
}

/**
 * 메인 함수
 */
async function main() {
  const args = process.argv.slice(2);

  // 도움말
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Unified PPT Generator - 프로젝트 디자인 시스템을 반영한 PPT 자동 생성

사용법:
  node unified-ppt.js [옵션]

옵션:
  --project <경로>      프로젝트 루트 경로 (기본: 현재 디렉토리)
  --slides <JSON>       슬라이드 정의 JSON 파일 경로
  --output <파일명>     출력 PPTX 파일명 (기본: unified-ppt/presentation.pptx)
  --theme <테마>        테마 선택 (professional|minimal|corporate, 기본: professional)
  --help, -h           도움말 표시

출력 폴더:
  모든 결과물은 프로젝트 루트의 'unified-ppt' 폴더에 자동 생성됩니다.
  예: /your/project/unified-ppt/presentation.pptx

예제:
  # 현재 디렉토리 프로젝트 분석 + 샘플 PPT 생성
  node unified-ppt.js
  → 출력: ./unified-ppt/presentation.pptx

  # 슬라이드 정의 파일 사용
  node unified-ppt.js --slides slides.json --output my-ppt.pptx
  → 출력: ./unified-ppt/my-ppt.pptx

  # 특정 프로젝트 분석
  node unified-ppt.js --project /path/to/project --slides slides.json
  → 출력: /path/to/project/unified-ppt/presentation.pptx

특징:
  ✅ PptxGenJS를 사용한 네이티브 PowerPoint 생성
  ✅ 완벽한 편집 가능
  ✅ 높은 품질
  ✅ Playwright/html2pptx 불필요
  ✅ 결과물이 unified-ppt 폴더에 정리되어 관리 용이
    `);
    process.exit(0);
  }

  // 옵션 파싱
  const projectRoot = args.includes('--project')
    ? args[args.indexOf('--project') + 1]
    : process.cwd();

  const slidesPath = args.includes('--slides')
    ? args[args.indexOf('--slides') + 1]
    : null;

  // unified-ppt 출력 폴더 생성
  const outputDir = path.join(projectRoot, 'unified-ppt');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 출력 경로 설정 (기본: unified-ppt/presentation.pptx)
  let outputPath;
  if (args.includes('--output')) {
    const userOutput = args[args.indexOf('--output') + 1];
    // 절대 경로면 그대로, 상대 경로면 unified-ppt 폴더 안에
    outputPath = path.isAbsolute(userOutput)
      ? userOutput
      : path.join(outputDir, userOutput);
  } else {
    outputPath = path.join(outputDir, 'presentation.pptx');
  }

  const themeName = args.includes('--theme')
    ? args[args.indexOf('--theme') + 1]
    : 'professional';

  console.log('='.repeat(60));
  console.log('Unified PPT Generator v3.0 (12 Slide Types + Master Layouts)');
  console.log('='.repeat(60));
  console.log(`프로젝트: ${projectRoot}`);
  console.log(`슬라이드: ${slidesPath || '(샘플 생성)'}`);
  console.log(`테마: ${themeName}`);
  console.log(`출력: ${outputPath}\n`);

  try {
    // 1. 디자인 시스템 분석
    console.log('📍 PHASE 1: 디자인 시스템 분석');
    console.log('-'.repeat(60));
    const designSystem = await analyzeDesignSystem(projectRoot);

    // 1.5. 추출된 디자인 시스템으로 기본 스타일 생성
    console.log('\n📍 PHASE 1.5: 기본 스타일 생성');
    console.log('-'.repeat(60));
    const defaultStyles = createDefaultStyles(designSystem);
    console.log('✅ 12개 슬라이드 타입의 기본 스타일 생성 완료');
    console.log(`   Primary: ${defaultStyles.title.background}`);
    console.log(`   Text: ${defaultStyles.content.title.color}`);

    // 2. 슬라이드 정의 로드 또는 생성
    console.log('\n📍 PHASE 2: 슬라이드 정의');
    console.log('-'.repeat(60));

    let slides;
    if (slidesPath && fs.existsSync(slidesPath)) {
      console.log(`JSON 파일 로드: ${slidesPath}`);
      const content = fs.readFileSync(slidesPath, 'utf8');
      const definition = JSON.parse(content);
      slides = definition.slides || definition;

      // 기존 JSON에 style이 없으면 자동 추가
      console.log('기본 스타일 자동 적용 중...');
      slides = applyDefaultStylesToSlides(slides, defaultStyles);
    } else {
      console.log('샘플 슬라이드 생성...');
      slides = [
        {
          type: 'title',
          props: {
            title: designSystem.projectName || '프로젝트 소개',
            subtitle: '프로젝트 디자인 시스템을 반영한 프레젠테이션',
          },
        },
        {
          type: 'section',
          props: {
            title: '프로젝트 개요',
          },
        },
        {
          type: 'bullet',
          props: {
            title: '프로젝트 정보',
            bullets: [
              { text: `프레임워크: ${designSystem.projectInfo.framework}`, level: 0 },
              { text: `TypeScript: ${designSystem.projectInfo.typescript ? '사용' : '미사용'}`, level: 0 },
              { text: `Tailwind CSS: ${designSystem.projectInfo.tailwind ? '사용' : '미사용'}`, level: 0 },
              { text: `CSS 변수: ${Object.keys(designSystem.cssVariables).length}개`, level: 0 },
            ],
          },
        },
        {
          type: 'content',
          props: {
            title: '디자인 시스템',
            body: [
              '이 프레젠테이션은 프로젝트의 디자인 시스템을 자동으로 분석하여 생성되었습니다.',
              '',
              '프로젝트의 CSS 변수, 컬러 팔레트, 타이포그래피가 자동으로 적용되어',
              '브랜드 일관성을 유지합니다.',
            ],
          },
        },
        {
          type: 'twoColumn',
          props: {
            title: '추출된 스타일',
            leftContent: Object.keys(designSystem.colors).length > 0
              ? `컬러:\n${Object.entries(designSystem.colors).map(([k, v]) => `• ${k}: ${v}`).join('\n')}`
              : '컬러 정보 없음',
            rightContent: Object.keys(designSystem.fonts).length > 0
              ? `폰트:\n${Object.entries(designSystem.fonts).map(([k, v]) => `• ${k}: ${v}`).join('\n')}`
              : '폰트 정보 없음',
          },
        },
        {
          type: 'thankYou',
          props: {
            message: '감사합니다',
            contact: designSystem.projectName || 'PPT-AUTO',
          },
        },
      ];

      // 샘플 슬라이드에도 기본 스타일 적용
      console.log('기본 스타일 자동 적용 중...');
      slides = applyDefaultStylesToSlides(slides, defaultStyles);
    }

    console.log(`✅ ${slides.length}개 슬라이드 준비 완료 (커스텀 스타일 적용)`);

    // 3. PPTX 생성 (Theme System 2.0)
    console.log('\n📍 PHASE 3: PPTX 생성 (Theme System 2.0)');
    console.log('-'.repeat(60));

    const result = await generatePPTX(slides, designSystem, outputPath, themeName);

    // 4. 결과 출력
    console.log('\n' + '='.repeat(60));
    console.log('결과');
    console.log('='.repeat(60));

    if (result.success) {
      console.log('✅ 생성 성공!');
      console.log(`📄 출력 파일: ${result.outputPath}`);
      console.log(`📊 슬라이드 수: ${result.slideCount}`);
      console.log(`🎨 테마: ${result.theme}`);
      console.log(`✨ 방식: Theme System 2.0 (완벽한 편집 가능)`);
    } else {
      console.log('❌ 생성 실패');
    }

    console.log('\n' + '='.repeat(60));
    console.log('적용된 디자인 시스템');
    console.log('='.repeat(60));
    console.log(JSON.stringify({
      framework: designSystem.projectInfo.framework,
      colors: designSystem.colors,
      fonts: designSystem.fonts,
    }, null, 2));

  } catch (error) {
    console.error('\n❌ 실행 실패:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// 직접 실행 시
if (require.main === module) {
  main();
}

module.exports = {
  main,
};
