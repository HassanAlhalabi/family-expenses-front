
export interface IMaterial {
    id: number,
    name: string,
    isService: number,
    description: string
}

export interface INewMaterial {
    name: string,
    isService: number,
    description: string
}

export interface INewMaterialErrors {
    name: boolean,
    description: boolean,
}