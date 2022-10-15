import { FormControl, FormErrorMessage, FormLabel, Input, Switch, Textarea } from "@chakra-ui/react"
import { ChangeEvent } from "react"
import { INewMaterial, INewMaterialErrors } from "../../../models/materials";

const MaterialForm = ({
    material,
    errors,
    handleChange,
    isEditAction
}:{
    material: INewMaterial,
    errors: INewMaterialErrors,
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    isEditAction: boolean
}) => {

    return (
        <>
            <FormControl>
                <FormLabel>Material Name</FormLabel>
                <Input 
                    isInvalid={errors.name} 
                    onChange={handleChange} 
                    value={material.name} 
                    name="name"/>
                {errors.name && <FormErrorMessage>Material Name is Required.</FormErrorMessage>}
            </FormControl>

            <FormControl mt={5}>
                <FormLabel>Description</FormLabel>
                <Textarea 
                    isInvalid={errors.description} 
                    onChange={handleChange} 
                    value={material.description} 
                    name="description" />
                {errors.name && <FormErrorMessage>Material Description is Required.</FormErrorMessage>}
            </FormControl>

            <FormControl  mt={6} display='flex' alignItems='center'>
                <FormLabel htmlFor='is-service' mb='0'>
                    Is Service?
                </FormLabel>
                <Switch isChecked={material.isService === 1 ? true: false} name="isService" onChange={handleChange} colorScheme={'teal'} id='is-service' />
            </FormControl>
        </>
    )

}

export default MaterialForm
