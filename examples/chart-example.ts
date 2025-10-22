/**
 * 차트 예제
 */

import { createPresentation, themes } from '../src';

async function main() {
  const presentation = createPresentation({
    metadata: {
      title: '차트 예제',
      author: 'PPT Auto',
    },
    theme: themes.corporate,
    slides: [
      {
        type: 'title',
        props: {
          title: '데이터 시각화',
          subtitle: '차트로 보는 실적',
        },
      },
      // 막대 차트
      {
        type: 'chart',
        props: {
          title: '분기별 매출 (막대 차트)',
          chartType: 'bar',
          data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [
              {
                name: '2023',
                values: [65, 78, 82, 90],
              },
              {
                name: '2024',
                values: [72, 85, 95, 105],
              },
            ],
          },
        },
      },
      // 라인 차트
      {
        type: 'chart',
        props: {
          title: '월별 트래픽 (라인 차트)',
          chartType: 'line',
          data: {
            labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
            datasets: [
              {
                name: '방문자',
                values: [1200, 1500, 1800, 2100, 2400, 2800],
              },
            ],
          },
        },
      },
      // 파이 차트
      {
        type: 'chart',
        props: {
          title: '시장 점유율 (파이 차트)',
          chartType: 'pie',
          data: {
            labels: ['제품 A', '제품 B', '제품 C', '기타'],
            datasets: [
              {
                name: '점유율',
                values: [35, 28, 22, 15],
              },
            ],
          },
        },
      },
    ],
  });

  presentation.generate();
  await presentation.save('chart-example.pptx');

  console.log('✅ 차트 예제 프레젠테이션이 생성되었습니다!');
}

main().catch(console.error);
