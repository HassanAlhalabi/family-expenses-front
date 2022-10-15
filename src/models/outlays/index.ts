
export interface IOutlay {
    id: number,
    userId: number,
    userName: string,
    materialId: number,
    material: string,
    materialName: string,
    outlayTypeId: number,
    outlayType: string,
    price: number,
    date: Date,
    description: string
}

export interface INewOutlay {
    materialId: number,
    outlayTypeId: number,
    price: number,
    date?: Date,
    description: string
}

export interface INewOutlayErrors {
    materialId: boolean,
    outlayTypeId: boolean,
    price: boolean,
    description: boolean
}