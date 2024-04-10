export function svgMarker(price, color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="71" height="45" viewBox="0 0 71 45" fill="none">
    <rect width="71" height="37" rx="10" fill="${color}"/>
    <path d="M35 45L27 37H43L35 45Z" fill="${color}"/>
    <text x="50%" y="24"
          text-anchor="middle" fill="#FFF"
          font-size="14px" font-family="sans-serif" font-weight="bold">
          €${price}
    </text>
  </svg>`;
}
export function encodeSVG(rawSvgString) {
  const symbols = /[\r\n%#()<>?\\[\\\]^`{|}]/g;
  // Use single quotes instead of double to avoid URI encoding
  rawSvgString = rawSvgString
    .replace(/'/g, '"')
    .replace(/>\s+</g, "><")
    .replace(/\s{2,}/g, " ");
  return (
    "data:image/svg+xml;utf-8," +
    rawSvgString.replace(symbols, encodeURIComponent)
  );
}
