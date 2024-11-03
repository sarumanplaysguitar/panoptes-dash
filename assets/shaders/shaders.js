// Shaders for main Panoptes3D Three.js canvas.
export const stars_vshader = `
// This shader...
// 1) rotates vertices about z axis with latitude
// 2) rotates vertices about y axis with siderial time (diurnal motion)
// 3) sets star point size
// 4) calculates some info for the fragment shader's cutoffs

mat3 rotation_matrix_z(float angle_rad) {
    vec3 axis = vec3(0., 0., 1.);
    float s = sin(angle_rad);
    float c = cos(angle_rad);

    return mat3(
    c, s, 0,
    -s, c, 0,
    0, 0, 1
    );

}

mat3 rotation_matrix_y(float angle_rad) {
    vec3 axis = vec3(0., 1., 0.);
    float s = sin(angle_rad);
    float c = cos(angle_rad);

    return mat3(
    c, 0, s,
    0, 1, 0,
    -s, 0, c
    );
}

// need uniforms u_unitLatitude, u_siderial_angle in here 
// varying vec2 vUv;
varying vec2 v_uv;
uniform float u_unitLatitude;
uniform float u_scale;
uniform vec2 u_resolution;
attribute float size;
attribute float twinkle_offset;
uniform float u_time;
uniform float u_diurnal;
varying vec4 mvPosition;
varying vec3 pos;
varying vec4 glpos;
// varying vec4 origin;
varying vec4 glorigin;
uniform vec4 origin;
varying vec4 mv_origin;
const float PI = 3.14159265358979323846;
const float PI_2 = 1.57079632679489661923;
const float PI_4 = 0.78539816339744830962;
attribute vec3 star_color;
varying vec3 vColor;

void main() {

    #ifdef USE_COLOR
    vColor = star_color;
    // vColor = vec3( 1.0, 0.0, 0.0 );
    #endif

    v_uv = uv - 0.5;

    // Correct for the offset between how unit's latitude=0 (horizon)
    // and star's default positions (NCP at zenith) were defined

    pos = rotation_matrix_y(u_diurnal) * position;
    pos = rotation_matrix_z(u_unitLatitude + PI_2) * pos;
    mvPosition = modelViewMatrix * vec4(pos, 1.0);
    float camera_dist = distance(mvPosition, origin);

    // shrink w/ distance
    float attenuation_factor = (u_resolution.y / (2. * - mvPosition.z)) * 0.01;

    // gl_PointSize = (size + 25. * pow(size, 3.) * sin(10. * u_time + twinkle_offset)) * attenuation_factor;
    // gl_PointSize = (size + 25. * pow(size, 3.) * sin(10. * u_time + twinkle_offset)) * attenuation_factor;
    gl_PointSize = 1. * size * attenuation_factor + sin(10. * u_time + twinkle_offset) * 0.15 * size;
    gl_Position = projectionMatrix * mvPosition;
    glpos = gl_Position;
    mv_origin = modelViewMatrix * vec4(0., 0., 0., 1.0);
    glorigin = projectionMatrix * origin;
}
`;

export const stars_fshader = `
varying vec3 vColor;
varying vec4 mvPosition;
varying vec3 pos;
varying vec4 glpos;
uniform vec4 origin;
varying vec4 mv_origin;
uniform vec2 u_resolution;
varying vec2 v_uv;


void main(void) {

    // float r = 0.799999999;
    // float d = length(v_uv);
    // float a = smoothstep(r, r-0.01, d);

    float aspect_ratio = u_resolution.x / u_resolution.y;

    // clip stars below horizon, and ones with "backs" facing camera
    // if ( mvPosition.z > mv_origin.z + (11.0 * (1. / length(mv_origin)) + clamp(aspect_ratio, 10., 20.) * 0.02)) {
    if ( mvPosition.z > mv_origin.z + (11.0 * (1. / length(mv_origin)) + clamp(aspect_ratio, 10., 20.) * 0.02) || pos.y < 0. + 0.2) {
    discard;
    }

    gl_FragColor = vec4(vColor, 1.);

}
`;

export const sky_vshader = `
varying vec3 final_mix;
uniform vec3 u_ground;
uniform vec3 u_horizon;
uniform vec3 u_low;
uniform vec3 u_mid;
uniform vec3 u_upper;
uniform vec3 u_white;

void main() {
    // Mix from the ground up.
    vec3 mix1 = mix(u_ground, u_horizon, smoothstep(0.5, 0.55, uv.y));
    vec3 mix2 = mix(mix1, u_low, smoothstep(0.5, 0.65, uv.y));
    vec3 mix3 = mix(mix2, u_mid, smoothstep(0.5, 0.8, uv.y));
    vec3 mix4 = mix(mix3, u_upper, smoothstep(0.7, 1., uv.y));

    final_mix = mix4;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const sky_fshader = `
varying vec3 final_mix;

void main(void) {
    gl_FragColor = vec4(final_mix, 1.0);
}
`;

export const ground_vshader = `
varying vec2 v_uv;

void main() {
    v_uv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const ground_fshader = `
uniform vec2 u_resolution;
uniform vec3 u_ground_glow;
varying vec2 v_uv;

// Make opacity falloff as function of distance
// Plane should be a solid color

void main(void) {
    vec2 coords = v_uv - 0.5;
    vec3 color = u_ground_glow;
    float d = length(coords);

    // float t = 0.4;
    // float falloff = clamp(d, 0.0, t);
    // gl_FragColor = vec4(vec3(color), (t - falloff) * 2.);

    float falloff = 1.0 - smoothstep(0.0, 0.4, d);

    gl_FragColor = vec4(color, falloff);
}
`;