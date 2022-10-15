import { FormControl, FormErrorMessage, FormLabel, Input, Switch, Textarea } from "@chakra-ui/react"
import { ChangeEvent } from "react"
import { INewOutlayType, INewOutlayTypeErrors } from "../../../models/outlay-types"

const OutlayTypeForm = ({
    outlayType,
    errors,
    handleChange,
    isEditAction
}:{
    outlayType: INewOutlayType,
    errors: INewOutlayTypeErrors,
    handleChange: (e: ChangeEvent<HTMLInputElement  | HTMLTextAreaElement>) => void,
    isEditAction: boolean
}) => {

    return (
        <>
            <FormControl>
                <FormLabel>OutlayType Name</FormLabel>
                <Input 
                    isInvalid={errors.name} 
                    onChange={handleChange} 
                    value={outlayType.name} 
                    name="name"/>
                {errors.name && <FormErrorMessage>Outlay Type Name is Required.</FormErrorMessage>}
            </FormControl>

            <FormControl mt={5}>
                <FormLabel>Description</FormLabel>
                <Textarea 
                    isInvalid={errors.description} 
                    onChange={handleChange} 
                    value={outlayType.description} 
                    name="description" />
                {errors.name && <FormErrorMessage>Outlay Type Description is Required.</FormErrorMessage>}
            </FormControl>
        </>
    )

}

export default OutlayTypeForm
