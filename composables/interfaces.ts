export interface MetadataRecordI {
    received_time: Date;
}

export interface ConfigI extends MetadataRecordI {
    unit_id?: string;
    name?: string;
    location?: LocationI;
}

export interface MetadataI {
    config?: ConfigI;
    status?: MetadataRecordI
    safety?: MetadataRecordI
    power?: MetadataRecordI
    weather?: MetadataRecordI
}


export interface LocationI {
    latitude: number;
    longitude: number;
    elevation: number;
    name: string;
    timezone: string;
}

export interface ImageI {
    id?: string;
    uid?: string;
    path?: string;
    exptime?: number;
}

export interface ObservationI {
    id?: string;
    field_name?: string;
    images?: ImageI[];
}

export interface UnitI {
    id: string;
    name: string;
    config?: ConfigI;
    metadata?: MetadataI;
    observations?: ObservationI[];
    num_images: number;
    total_exptime: number;
}

interface MoonI {
    phase: number;
    phase_name?: string;
    altitude: number;
    illumination: number;
}

interface SunI {
    sunrise: Date;
    sunset: Date;
    astro_sunrise: Date;
    astro_sunset: Date;
    position: number;
}
