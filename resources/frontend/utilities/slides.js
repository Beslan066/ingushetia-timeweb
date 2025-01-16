export function parseReportageSlides(slides) {
  if (!slides) {
    return [];
  }

  if (typeof slides === 'object') {
    return slides;
  }

  if (typeof slides !== 'string') {
    console.error('Слайды должны быть строкой или массивом');
    return [];
  }

  let parsedSlides = [];
  try {
    parsedSlides = JSON.parse(slides);
  } catch (e) {
    console.error(e);
    return [];
  }

  return parsedSlides.map((slide) => '/storage/' + slide);
}
