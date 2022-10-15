import { FormControl, FormErrorMessage, FormLabel, Input, Select, Switch, Textarea } from "@chakra-ui/react"
import { ChangeEvent } from "react"
import { INewOutlay, INewOutlayErrors } from "../../../models/outlays"
import { useQuery } from 'react-query';
import { getMaterials } from "../../../http/materials";
import { getOutlayTypes } from "../../../http/outlay-types";
import { IMaterial } from "../../../models/materials";
import { IOutlayType } from "../../../models/outlay-types";

const OutlayForm = ({
    outlay,
    errors,
    handleChange,
    isEditAction
}:{
    outlay: INewOutlay,
    errors: INewOutlayErrors,
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void,
    isEditAction: boolean
}) => {

    const {data: materials} = useQuery(['materials'], getMaterials); 
    const {data: outlayTypes} = useQuery(['outlayTypes'], getOutlayTypes); 

    console.log(outlay)

    return (
        <>
            <FormControl>
                <FormLabel>Material</FormLabel>
                    <Select 
                        value={outlay.materialId}
                        isInvalid={errors.materialId} 
                        onChange={handleChange} 
                        name="materialId" 
                        placeholder='Select Material'>
                            {
                                materials && materials.materials.map((material: IMaterial) => 
                                    <option value={material.id}>{material.name}</option>
                                )
                            }
                    </Select>
                {errors.materialId && <FormErrorMessage>Material is Required.</FormErrorMessage>}
            </FormControl>

            <FormControl mt={5}>
                <FormLabel>Outlay Type</FormLabel>
                    <Select 
                        value={outlay.outlayTypeId}
                        isInvalid={errors.outlayTypeId} 
                        onChange={handleChange} 
                        name="outlayTypeId" 
                        placeholder='Select Outlay Type'>
                            {
                                outlayTypes && outlayTypes.outlayTypes.map((outlayType: IOutlayType) => 
                                    <option value={outlayType.id}>{outlayType.name}</option>
                                )
                            }
                    </Select>
                {errors.outlayTypeId && <FormErrorMessage>Outlay Type is Required.</FormErrorMessage>}
            </FormControl>

             <FormControl mt={5}>
                <FormLabel>Price</FormLabel>
                <Input 
                    isInvalid={errors.price} 
                    onChange={handleChange} 
                    value={outlay.price} 
                    name="price" 
                    type='number' />
                {errors.price && <FormErrorMessage>Price is Required.</FormErrorMessage>}
            </FormControl>

            <FormControl mt={5}>
                <FormLabel>Date</FormLabel>
                <Input 
                    onChange={handleChange} 
                    value={outlay.date?.toString().split('T')[0]} 
                    name="date" 
                    type={'date'}/>
             </FormControl>

            <FormControl mt={5}>
                <FormLabel>Description</FormLabel>
                <Textarea 
                    isInvalid={errors.description} 
                    onChange={handleChange} 
                    value={outlay.description} 
                    name="description" />
                {errors.description && <FormErrorMessage>Description is Required.</FormErrorMessage>}
            </FormControl>
        </>
    )

}

export default OutlayForm
