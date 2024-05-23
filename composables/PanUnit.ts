import type {ConfigI, ImageI, LocationI, MetadataI, MetadataRecordI, ObservationI} from "~/composables/interfaces";

const dayjs = useDayjs()

export class PanUnit {
    id: string;
    name?: string;
    metadata?: MetadataI;
    metadata_records?: MetadataRecordI[];
    observations?: ObservationI[]

    constructor(unitId: string) {
        this.id = unitId
    }

    get config(): ConfigI | null {
        // Check if metadata is defined
        if (this.metadata == null) return null
        return this.metadata.config ?? null
    }

    get weather(): MetadataRecordI | null {
        if (this.metadata == null) return null
        return this.metadata.weather ?? null
    }

    get weather_thresholds(): any {
        if (this.config == null) return null
        return this.config.environment.weather.thresholds ?? null
    }

    get status(): MetadataRecordI | null {
        if (this.metadata == null) return null
        return this.metadata.status ?? null
    }

    get safety(): MetadataRecordI | null {
        if (this.metadata == null) return null
        return this.metadata.safety ?? null
    }

    get observatory(): MetadataRecordI | null {
        if (this.status == null) return null
        return this.status.observatory ?? null
    }

    get image(): string[] | null {
        if (this.metadata == null) return null
        // Sort the image keys.
        let image = this.metadata.images
        if (image == null) return null
        return Object.keys(image).sort().map(key => `${key}                     ${image[key]}`)
    }

    get image_metadata(): ImageI[] | null {
        if (this.metadata == null) return null
        let image = this.metadata.images ?? null

        return {
            id: image?.image_id,
            sequence_id: image?.sequence_id,
            public_url: image?.fits_public_url,
            pretty_public_url: image?.pretty_image_url,
            exptime: image?.exptime,
            field_ra: image?.field_ra,
            field_dec: image?.field_dec,
            mount_ra: image.ra_mnt,
            mount_dec: image.dec_mnt,
            mount_ha: image.ha_mnt,
            airmass: image?.airmass,
            field: image?.field_name,
            cam_id: image?.camera_id,
            current_exp: image?.current_exp,
            exp_set_size: image?.exp_set_size,
            min_nexp: image?.min_nexp,
            moon_fraction: image?.moon_fraction,
            moon_separation: image?.moon_separation,
            received_time: image?.received_time.toDate(),
            status: image?.status,
        }
    }

    get location(): LocationI | null {
        if (this.config == null) return null
        return this.config.location ?? null
    }

    get timezone(): string {
        if (this.location == null) return 'UTC'
        return this.location.timezone ?? 'UTC'
    }

    get local_time(): any {
        if (this.location == null) return null
        return dayjs().tz(this.timezone)
    }

    get last_status_time(): any {
        // Check the received_time on the status entry and format locally.
        if (this.status == null) return null
        return dayjs(this.status.received_time.toDate()).tz(this.timezone)
    }

    get last_status_time_relative(): any {
        if (this.last_status_time == null) return null
        return dayjs(this.last_status_time).from(this.local_time)
    }

    get state(): string {
        return this.status?.state ?? 'unknown'
    }

    get hardware_ready(): boolean {
        return this.observatory?.can_observe
    }

    get moon(): MoonI {
        return <MoonI>{
            phase: this.status?.observatory?.observer?.local_moon_phase,
            altitude: this.status?.observatory?.observer?.local_moon_alt,
            azimuth: this.status?.observatory?.observer?.local_moon_az,
            illumination: this.status?.observatory?.observer?.local_moon_illumination
        }
    }

    get sun(): SunI {
        return <SunI>{
            sunrise: dayjs(this.status?.observatory?.observer?.local_sun_rise_time),
            sunset: dayjs(this.status?.observatory?.observer?.local_sun_set_time),
            astro_sunrise: dayjs(this.status?.observatory?.observer?.local_morning_astro_time),
            astro_sunset: dayjs(this.status?.observatory?.observer?.local_evening_astro_time),
            position: this.status?.observatory?.observer?.local_sun_position
        }
    }

    about(): string {
        let mount_time_local = dayjs(this.status?.observatory?.mount?.time_local) // in obs time
        let weather_time_local = dayjs(this.weather?.received_time.toDate())  // in UTC

        return `
        Hello ${this.name} (${this.id}), how are you?

        State       : ${this.state}

        Mount:
            State   : ${this.status?.observatory?.mount?.state}
            Parked  : ${this.status?.observatory?.mount?.is_parked}
            RA      : ${this.status?.observatory?.mount?.current_ra.toFixed(2)}
            Dec     : ${this.status?.observatory?.mount?.current_dec.toFixed(2)}
            HA      : ${(this.status?.observatory?.mount?.current_ha / 180).toFixed(2)}
            Updated : ${mount_time_local.format('lll')}
                      (${mount_time_local.from(this.local_time)})
        
        Time:
          Timezone   : ${this.timezone} (${this.location?.gmt_offset})
          Observatory: ${this.local_time.format('lll')}
          UTC        : ${dayjs().utc().format('llll')}
          Browser    : ${dayjs().format('llll')}
          
        Weather:
            Safe       : ${this.weather?.is_safe}
            Temp       : ${this.weather?.ambient_temp}
            Sky Temp   : ${this.weather?.sky_temp}
            Temp Diff  : ${(this.weather?.sky_temp - this.weather?.ambient_temp).toFixed(2)}
            Wind Speed : ${this.weather?.wind_speed}
            Wind Safe  : ${this.weather?.wind_safe} (${this.weather?.wind_condition})
            Cloud Safe : ${this.weather?.cloud_safe} (${this.weather?.cloud_condition})            
            Rain Safe  : ${this.weather?.rain_safe} (${this.weather?.rain_condition})
            Updated    : ${weather_time_local.format('lll')} 
                        (${weather_time_local.fromNow()})            
          
        Moon:
            Phase        : ${this.moon?.phase?.toFixed(2)}
            Illumination : ${this.moon?.illumination?.toFixed(2)}
            Altitude     : ${this.moon?.altitude?.toFixed(2)}
        
        Sun:
            Position     : ${this.sun?.position?.toFixed(2)}°
            
        Observatory:
            Name     : ${this.location?.name}
            Latitude : ${this.location?.latitude}
            Longitude: ${this.location?.longitude}
            Elevation: ${this.location?.elevation}        
        
        Hardware ready: ${this.hardware_ready}
        
        Last status update: ${this.last_status_time} 
                            (${this.last_status_time_relative})
        `
    }
}
