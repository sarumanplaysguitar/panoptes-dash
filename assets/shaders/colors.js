// Below are all color presets for Panoptes3D
// The functions for interpolating and blending them are in the useSkyColors composable

export const sun_thresholds = [90, 50, -5, -10, -13, -16, -18, -90];

// Define from ground to zenith, to floor/ground highlight at last position
// TODO: reorganize these later from zenith -> ground, and either bundle light + floor data in
// with this, or separate all 3 of them
export const sky_colors = {
    day: [
    0x94cbfe,
    0xe3fbff,
    0xc5efff,
    0xb5e7ff,
    0x95cbff,
    0xb5e7ff
    ],
    green: [
    0x80bfff,
    0xc5eef3,
    0x9cdef7,
    0x78c1fd,
    0x77a8ff,
    0x9addfc
    ],
    green_golden: [
    0x5f9df3,
    0xad9ed6,
    0xe4ffee,
    0x6ccaff,
    0x5f9df3,
    0x7abfff
    ],
    golden: [
    0x4c61d1,
    0xcfbee8,
    0xbad5fd,
    0x5c76da,
    0x5c76da,
    0x6f84e3
    ],
    twilight: [
    0x18181b,
    0x27272a,
    0x27272a,
    0x27272a,
    0x27272a,
    0x595959
    ],
    twilight_night: [
    0x18181b,
    0x27272a,
    0x27272a,
    0x27272a,
    0x27272a,
    0x595959
    ],
    night: [
    0x18181b,
    0x27272a,
    0x27272a,
    0x27272a,
    0x27272a,
    0x595959
    ],
    deep_night: [
    0x18181b,
    0x27272a,
    0x27272a,
    0x27272a,
    0x27272a,
    0x595959
    ]
};

export const ambient_light_colors = {
    day: 0xa6a9ff,
    green: 0xa6a9ff,
    green_golden: 0xa6a9ff,
    golden: 0xd7a6ff,
    twilight: 0xbfa6ff,
    twilight_night: 0x6947bf,
    night: 0x6947bf,
    deep_night: 0x6947bf
};

export const star_colors = {
    o: 0xc8c7ff, b: 0xbbdaff, a: 0xe7ecff, f: 0xedffff, g: 0xfafff1, k: 0xffffca, m: 0xffcdcd
};

export const star_color_index = [-0.33, -0.3, -0.02, 0.3, 0.58, 0.81, 1.4];