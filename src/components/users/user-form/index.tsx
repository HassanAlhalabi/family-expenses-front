import { FormControl, FormErrorMessage, FormLabel, Input, Switch } from "@chakra-ui/react"
import { ChangeEvent } from "react"
import { INewUser, INewUserErrors } from "../../../models/users"

const UserForm = ({
    user,
    errors,
    handleChange,
    isEditAction
}:{
    user: INewUser,
    errors: INewUserErrors,
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void,
    isEditAction: boolean
}) => {

    console.log(user);

    return (
        <>
            <FormControl>
                <FormLabel>User Name</FormLabel>
                <Input 
                    isInvalid={errors.userName} 
                    onChange={handleChange} 
                    value={user.userName} 
                    name="userName"/>
                {errors.userName && <FormErrorMessage>User Name is Required.</FormErrorMessage>}
            </FormControl>

            <FormControl mt={5}>
                <FormLabel>Password</FormLabel>
                <Input 
                    isInvalid={errors.password} 
                    onChange={handleChange} 
                    value={user.password} 
                    type="password" 
                    name="password" 
                    placeholder={isEditAction ? 'Leave Empty To Keep Your Old Password' : ''} />
                {errors.userName && <FormErrorMessage>Password is Required.</FormErrorMessage>}
            </FormControl>

            <FormControl  mt={6} display='flex' alignItems='center'>
                <FormLabel htmlFor='is-admin' mb='0'>
                    Is Admin?
                </FormLabel>
                <Switch isChecked={user.isAdmin === 1 ? true: false} name="isAdmin" onChange={handleChange} colorScheme={'teal'} id='is-admin' />
            </FormControl>
        </>
    )

}

export default UserForm
