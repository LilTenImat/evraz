import { Bearing, status, mockBearings } from "./bearing";

export enum exhausterStatus {
    OK = 'OK',
    WARNING = 'WARNING',
    DANGER = 'DANGER'
}

export interface Exhauster{
    id: string,
    name: string,
    status: exhausterStatus,
    rotorNumber: string,
    rotorDate: Date,
    rotorLastChanged: Date,
    rotorChangePrediction: Date,

    bearings: Bearing[],

    oilLevelStatus: status,
}

export const mockExhausters: Exhauster[] = [
    {
        id: 'd16df254-2430-45fb-80de-76c34bafb6ef',
        name: 'У-171',
        status: exhausterStatus.DANGER,
        rotorNumber: '35k',
        rotorDate: new Date('02.12.2022'),
        rotorLastChanged: new Date('02.12.2023'),
        rotorChangePrediction:  new Date('02.24.2023'),
    
        bearings: [
            mockBearings[0],
            mockBearings[0],
            mockBearings[0],
            mockBearings[0],
            mockBearings[0],
            mockBearings[0],
            mockBearings[2],
            mockBearings[2],
            mockBearings[0],
        ],
        oilLevelStatus: status.OK,
    },
    {
        id: 'ffb4b343-c01f-45fd-b96a-5f8dc2645780',
        name: 'У-172',
        status: exhausterStatus.DANGER,
        rotorNumber: '47',
        rotorDate: new Date('02.25.2022'),
        rotorLastChanged: new Date('01.29.2023'),
        rotorChangePrediction:  new Date('02.23.2023'),
    
        bearings: [
            mockBearings[0],
            mockBearings[0],
            mockBearings[2],
            mockBearings[0],
            mockBearings[0],
            mockBearings[0],
            mockBearings[0],
            mockBearings[7],
            mockBearings[0],
        ],
        oilLevelStatus: status.OK,
    },
    {
        id: '3bb8c345-b000-4e37-a714-2b5af09b26a2',
        name: 'Ф-171',
        status: exhausterStatus.DANGER,
        rotorNumber: '37',
        rotorDate: new Date('02.12.2022'),
        rotorLastChanged: new Date('02.15.2023'),
        rotorChangePrediction: new Date('02.25.2023'),
    
        bearings: [
            mockBearings[0],
            mockBearings[0],
            mockBearings[3],
            mockBearings[0],
            mockBearings[0],
            mockBearings[0],
            mockBearings[0],
            mockBearings[2],
            mockBearings[0],
        ],
        oilLevelStatus: status.DANGER,
    }, 
    {
        id: '24a5de00-a87a-488c-bdb0-771a2ba88c60',
        name: 'Ф-172',
        status: exhausterStatus.DANGER,
        rotorNumber: '32',
        rotorDate: new Date('02.25.2022'),
        rotorLastChanged: new Date('02.03.2023'),
        rotorChangePrediction: new Date('02.19.2023'),
    
        bearings: [
            mockBearings[0],
            mockBearings[0],
            mockBearings[2],
            mockBearings[0],
            mockBearings[0],
            mockBearings[0],
            mockBearings[0],
            mockBearings[7],
            mockBearings[0],
        ],
        oilLevelStatus: status.OK,
    }, 
    {
        id: 'b8394fcd-7c98-4a77-8d03-9fa3c08432ee',
        name: 'Х-171',
        status: exhausterStatus.DANGER,
        rotorNumber: '24',
        rotorDate: new Date('02.12.2022'),
        rotorLastChanged: new Date('02.15.2023'),
        rotorChangePrediction: new Date('02.25.2023'),
    
        bearings: [
            mockBearings[0],
            mockBearings[0],
            mockBearings[3],
            mockBearings[0],
            mockBearings[0],
            mockBearings[0],
            mockBearings[0],
            mockBearings[2],
            mockBearings[0],
        ],
        oilLevelStatus: status.DANGER,
    }, 
    {
        id: 'b1af4992-a282-4bbd-9188-c889ba3483ef',
        name: 'Х-172',
        status: exhausterStatus.OK,
        rotorNumber: '24k',
        rotorDate: new Date('02.25.2022'),
        rotorLastChanged: new Date('02.13.2023'),
        rotorChangePrediction: new Date('02.28.2023'),
    
        bearings: [
            mockBearings[0],
            mockBearings[0],
            mockBearings[0],
            mockBearings[0],
            mockBearings[0],
            mockBearings[0],
            mockBearings[0],
            mockBearings[0],
            mockBearings[0],
        ],
        oilLevelStatus: status.OK,
    }, 
]