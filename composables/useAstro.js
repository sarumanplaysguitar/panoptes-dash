import { ref } from 'vue';

// moon
const phase_angle = ref(0); // deg
const illumination = computed(() => {
    const radians = (phase_angle.value * Math.PI) / 180;
    return (1 - Math.cos(radians)) / 2.0; // normalized
});
const tolerance = 0.1; // radians, small (~6 degrees)

// moon phase definitions
const moonPhases = [
    { name: 'new_moon', range: [0 - tolerance, 0 + tolerance] },
    { name: 'waxing_crescent', range: [0 + tolerance, Math.PI / 2 - tolerance] },
    { name: 'first_quarter', range: [Math.PI / 2 - tolerance, Math.PI / 2 + tolerance] },
    { name: 'waxing_gibbous', range: [Math.PI / 2 + tolerance, Math.PI - tolerance] },
    { name: 'full_moon', range: [Math.PI - tolerance, Math.PI + tolerance] },
    { name: 'waning_gibbous', range: [Math.PI + tolerance, (3 * Math.PI) / 2 - tolerance] },
    { name: 'third_quarter', range: [(3 * Math.PI) / 2 - tolerance, (3 * Math.PI) / 2 + tolerance] },
    { name: 'waning_crescent', range: [(3 * Math.PI) / 2 + tolerance, 2 * Math.PI - tolerance] },
];

// determine the moon phase
const phase_name = computed(() => {
    const radians = (phase_angle.value * Math.PI) / 180; // rad

    // loop thru moon phases to find the matching phase
    for (const phase of moonPhases) {
        const [start, end] = phase.range;
        
        if (radians >= start && radians < end) {
            return phase.name;
        }
    }
});
// TODO get from astropy
const moon_rise = ref(0);
const moon_set = ref(0);

// sun
const sun_altitude = ref(-3.6); // deg
// const sun_altitude = ref(-5.1); // deg

// sidereal time TODO
const current_lst = ref(0); // decimal deg
const current_gst = ref(0); // decimal deg

// unit status
const observing = ref(false);
const current_ra = ref(0); // decimal deg
const current_dec = ref(0); // decimal deg


export function useMoon() {

    return {
        // moon vars
        phase_angle,
        illumination,
        phase_name,
        moon_rise,
        moon_set,
    }
}

export function useSun() {
    return {
        // sun
        sun_altitude,
    }
}

export function useSiderealTime() {

    return {
        // sidereal time
        current_lst,
        current_gst,
    }
}

export function useUnit() {

    return {
        // unit status
        observing,
        current_ra,
        current_dec,
    }
}