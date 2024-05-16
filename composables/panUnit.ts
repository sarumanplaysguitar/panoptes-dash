import type {ConfigI, LocationI, MetadataI} from "~/composables/interfaces";

const dayjs = useDayjs()

export class PanUnit {
    id: string;
    name?: string;
    config?: ConfigI;
    status?: MetadataI
    safety?: MetadataI
    power?: MetadataI
    weather?: MetadataI

    constructor(unitId: string) {
        this.id = unitId
    }

    get location(): LocationI | undefined {
        return this.config?.location
    }


    get timezone(): string {
        return this.location?.timezone ?? 'UTC'
    }

    get local_time(): any {
        if (this.location == undefined) return null
        return dayjs().tz(this.timezone).format('llll')
    }

    get last_status_time(): any {
        return dayjs(this.status?.received_time.toDate()).tz(this.timezone).format('lll')
    }

    get last_status_time_relative(): any {
        return dayjs(this.status?.received_time.toDate()).fromNow()
    }

    get state(): string {
        return this.status?.from_state
    }

    get hardware_ready(): boolean {
        return this.status?.observatory.can_observe ? true : false
    }

    get moon(): MoonI {
        return <MoonI>{
            phase: this.status?.observatory?.observer?.local_moon_phase,
            altitude: this.status?.observatory?.observer?.local_moon_alt,
            altitude: this.status?.observatory?.observer?.local_moon_alt,
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
        let mount_time_local = dayjs(this.status?.observatory?.mount?.time_local)

        return `
        Hello ${this.name} (${this.id}), how are you?

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
          Observatory: ${this.local_time}
          UTC        : ${dayjs().utc().format('llll')}
          Browser    : ${dayjs().format('llll')}
          
        Moon:
            Phase        : ${this.moon?.phase?.toFixed(2)}
            Illumination : ${this.moon?.illumination?.toFixed(2)}
            Altitude     : ${this.moon?.altitude?.toFixed(2)}
        
        Sun:
            Position     : ${this.sun?.position?.toFixed(2)}°
            Rise:
                Civil: ${this.sun?.sunrise.format('lll')}
                Astro: ${this.sun?.astro_sunrise.format('lll')}
            Set:
                Civil: ${this.sun?.sunset.format('lll')}
                Astro: ${this.sun?.astro_sunset.format('lll')}
            
        Observatory:
            Name     : ${this.location?.name}
            Latitude : ${this.location?.latitude}
            Longitude: ${this.location?.longitude}
            Elevation: ${this.location?.elevation}        
        
        Machine State: ${this.state}
        Hardware ready: ${this.hardware_ready}
        
        Last status update: ${this.last_status_time} 
                            (${this.last_status_time_relative})
        `
    }
}
