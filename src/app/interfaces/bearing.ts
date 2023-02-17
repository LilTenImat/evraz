export enum status {
    OK = 'OK',
    WARNING = 'WARNING',
    DANGER = 'DANGER'
}

export interface Bearing{
    temperatureStatus: status,
    vibrationStatus: status,
}

export const mockBearings: Bearing[] = [
    {
        temperatureStatus: status.OK,
        vibrationStatus: status.OK,
    },
    {
        temperatureStatus: status.OK,
        vibrationStatus: status.WARNING,
    },
    {
        temperatureStatus: status.OK,
        vibrationStatus: status.DANGER,
    },
    {
        temperatureStatus: status.WARNING,
        vibrationStatus: status.OK,
    },
    {
        temperatureStatus: status.WARNING,
        vibrationStatus: status.WARNING,
    },
    {
        temperatureStatus: status.WARNING,
        vibrationStatus: status.DANGER,
    },
    {
        temperatureStatus: status.DANGER,
        vibrationStatus: status.OK,
    },
    {
        temperatureStatus: status.DANGER,
        vibrationStatus: status.WARNING,
    },
    {
        temperatureStatus: status.DANGER,
        vibrationStatus: status.DANGER,
    },
]