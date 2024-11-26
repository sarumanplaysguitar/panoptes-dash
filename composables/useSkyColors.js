import { ref, watchEffect } from 'vue';

// refs to store current sky colors.
// these get determined within the three.js canvas.
const groundColor = ref('#09090b');
const horizonColor = ref('#18181b');
const lowSkyColor = ref('#18181b');
const midSkyColor = ref('#18181b');
const upperSkyColor = ref('#18181b');

// Color conversions for CSS
function hexToRGB(hex) {
    // remove #
    hex = hex.replace('#', '');

    // parse hex values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // RGB values as comma separated string
    return `${r}, ${g}, ${b}`;
}

// CSS variables
watchEffect(() => {
    document.documentElement.style.setProperty('--ground-color', hexToRGB(groundColor.value));
    document.documentElement.style.setProperty('--horizon-color', hexToRGB(horizonColor.value));
    document.documentElement.style.setProperty('--low-sky-color', hexToRGB(lowSkyColor.value));
    document.documentElement.style.setProperty('--mid-sky-color', hexToRGB(midSkyColor.value));
    document.documentElement.style.setProperty('--upper-sky-color', hexToRGB(upperSkyColor.value));
});

export function useSkyColors() {
    const setSkyColors = (newColors) => {
        groundColor.value = newColors[0];
        horizonColor.value = newColors[1];
        lowSkyColor.value = newColors[2];
        midSkyColor.value = newColors[3];
        upperSkyColor.value = newColors[4];
    };

    return {
        groundColor,
        horizonColor,
        lowSkyColor,
        midSkyColor,
        upperSkyColor,
        setSkyColors,
    };
};