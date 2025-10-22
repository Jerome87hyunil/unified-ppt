#!/usr/bin/env node

/**
 * Claude Skill: PPT 생성
 *
 * 사용법:
 * 1. 자연어로 요청: "3개 슬라이드 PPT 만들어줘"
 * 2. JSON으로 직접 구조 제공
 */

const path = require('path');

// 프로젝트 루트에서 빌드된 라이브러리 로드
const { createPresentation, themes } = require('../../../dist/src/index');

/**
 * 메인 실행 함수
 */
async function main() {
  try {
    // 커맨드 라인 인자 파싱
    const args = process.argv.slice(2);
    const params = parseArguments(args);

    // 테마 선택
    const themeName = params.theme || 'professional';
    const theme = themes[themeName];

    if (!theme) {
      throw new Error(`알 수 없는 테마: ${themeName}. 사용 가능한 테마: ${Object.keys(themes).join(', ')}`);
    }

    // 콘텐츠 파싱
    const definition = parseContent(params.content, theme);

    // 프레젠테이션 생성
    console.log('프레젠테이션 생성 중...');
    const generator = createPresentation(definition);
    generator.generate();

    // 파일 저장
    const filename = params.filename || 'presentation.pptx';
    const outputPath = path.resolve(process.cwd(), filename);

    await generator.save(outputPath);

    console.log(`✅ 프레젠테이션이 생성되었습니다: ${outputPath}`);
    console.log(`   - 테마: ${themeName}`);
    console.log(`   - 슬라이드 수: ${definition.slides.length}`);

    return {
      success: true,
      filepath: outputPath,
      slideCount: definition.slides.length,
      theme: themeName
    };

  } catch (error) {
    console.error('❌ 에러 발생:', error.message);
    if (error.code) {
      console.error('   에러 코드:', error.code);
    }
    process.exit(1);
  }
}

/**
 * 커맨드 라인 인자 파싱
 */
function parseArguments(args) {
  const params = {};

  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace(/^--/, '');
    const value = args[i + 1];
    params[key] = value;
  }

  return params;
}

/**
 * 콘텐츠 파싱 (JSON 또는 자연어)
 */
function parseContent(content, theme) {
  // JSON 시도
  try {
    const parsed = JSON.parse(content);

    // 이미 완전한 definition이면 그대로 사용
    if (parsed.metadata && parsed.slides) {
      return {
        ...parsed,
        theme: parsed.theme || theme
      };
    }

    // slides 배열만 있으면 메타데이터 추가
    if (Array.isArray(parsed)) {
      return {
        metadata: {
          title: 'Presentation',
          author: 'PPT Auto'
        },
        theme,
        slides: parsed
      };
    }

  } catch (e) {
    // JSON이 아니면 기본 구조 생성
  }

  // 기본 프레젠테이션 생성 (자연어 처리는 Claude가 JSON으로 변환해서 넘겨주는 것으로 가정)
  return {
    metadata: {
      title: 'Presentation',
      author: 'PPT Auto'
    },
    theme,
    slides: [
      {
        type: 'title',
        props: {
          title: content,
          subtitle: 'Created with PPT Auto'
        }
      }
    ]
  };
}

// 실행
if (require.main === module) {
  main();
}

module.exports = { main, parseContent };
