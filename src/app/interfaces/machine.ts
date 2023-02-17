import { Exhauster, mockExhausters } from "./exhauster";

export interface Machine{
    exhausters: Exhauster[]
}

export const mockMachines: Machine[] = [
    {
        exhausters: [mockExhausters[0], mockExhausters[1]]
    },
    {
        exhausters: [mockExhausters[2], mockExhausters[3]]
    },
    {
        exhausters: [mockExhausters[4], mockExhausters[5]]
    },
]