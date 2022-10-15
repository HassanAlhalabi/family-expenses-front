
export interface IOutlayType {
    id: number,
    name: string,
    description: string
}

export interface INewOutlayType {
    name: string,
    description: string
}

export interface INewOutlayTypeErrors {
    name: boolean,
    description: boolean,
}