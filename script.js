var currentIndex = 0;
var mediaElements = document.querySelectorAll('.media'); // Selects all media types
var backgrounds = [
'',
'',
'',
'media/funding2.png',
'',
'',
'',
'media/crime.png'];
function showMedia(index) {
    mediaElements.forEach((element, i) => {
        element.style.display = 'none';
        if (element.classList.contains('video-container') && element.querySelector('video')) {
            element.querySelector('video').pause();
            element.querySelector('video').currentTime = 0;
        }
    });
    const activeElement = mediaElements[index];
    activeElement.style.display = 'block';
    document.body.style.backgroundImage = `url('${backgrounds[index]}')`;
// Check if the id of the activeElement contains 'chart' and refreshChart for this index is 1
if (activeElement.id.includes('story')) {
    let chartIframes = activeElement.querySelectorAll('iframe');
    chartIframes.forEach(iframe => {
        const src = iframe.src;
        iframe.src = ''; // Clear src
        iframe.src = src; // Reassign src to force reload
    });
}
    if (activeElement.classList.contains('video-container') && activeElement.querySelector('video')) {
        activeElement.querySelector('video').play();
    }
}
function changeMedia(direction) {
    currentIndex += direction;
    if (currentIndex >= mediaElements.length) {
        currentIndex = 0;
    } else if (currentIndex < 0) {
        currentIndex = mediaElements.length - 1;
    }
    showMedia(currentIndex);
}
var currentSvg = null;
var svgDetails = {
svg1: { path: 'media/SVG/outage.svg', width: '50px', height: '50px' },
svg2: { path: 'media/SVG/tornado.svg', width: '50px', height: '50px' },
svg3: { path: 'media/SVG/thunderstorm.svg', width: '50px', height: '50px' }
};
var placingSvg = false;
var allowPlacement = false;
function startPlacingSvg(svgKey) {
    currentSvg = svgDetails[svgKey];
    placingSvg = true;
    allowPlacement = false; // Initially do not allow placement until the next click.
}
function stopPlacingSvg() {
    placingSvg = false;
    currentSvg = null;
}
function clearSvgImages() {
    document.querySelectorAll('img.placed-svg').forEach(svg => svg.remove());
}
document.addEventListener('click', function (event) {
    if (placingSvg && currentSvg && allowPlacement) {
        const x = event.pageX - (parseInt(currentSvg.width) / 2);
        const y = event.pageY - (parseInt(currentSvg.height) / 2);
        const svgImage = document.createElement('img');
        svgImage.src = currentSvg.path;
        svgImage.className = 'placed-svg';
        svgImage.style.position = 'fixed';
        svgImage.style.left = `${x}px`;
        svgImage.style.top = `${y}px`;
        svgImage.style.width = currentSvg.width;
        svgImage.style.height = currentSvg.height;
        svgImage.style.pointerEvents = 'none';  // Allow click-through
        document.body.appendChild(svgImage);
    }
    if (placingSvg) {
        allowPlacement = true; // Enable SVG placement after the first click on the button.
    }
});
// Initialize to show the first media element
showMedia(currentIndex);

