import { AddIcon, CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Button,
    Box,
    Stack,
    Progress,
    useToast
} from '@chakra-ui/react';
import { useMutation, useQuery } from 'react-query';
import { addUser, deleteUser, getUsers, updateUser } from '../../http/users';
import { IUser } from '../../models/users';
import Dialog from '../layout/dialog';
import TableSkeleton from '../layout/table-skeleton';
import { ChangeEvent, useState } from 'react';
import PopUp from '../layout/modal';
import UserForm from './user-form';

const Users = () => {

    const toast = useToast();

    const {data, isLoading, refetch} = useQuery(['users'],getUsers);

    const [userId, setUserId] = useState<null | number>(null);

    const [deleteDialogOpen, setDeleteDialog] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);

    const [isEditAction, setIsEditAction] = useState(false);

    // ***************** Add User **************** //

    const [user, setUser] = useState({
        userName: '',
        password: '',
        isAdmin: 0,
    });

    const [errors, setErros] = useState({
        userName: false,
        password: false,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.type === 'checkbox' ? 
            setUser(prev => ({
                ...prev,
                [e.target.name] : e.target.checked ? 1 : 0
            })) :
            setUser(prev => ({
                ...prev,
                [e.target.name] : e.target.value
            }))
    }

    const addUserMutaion = useMutation(addUser);

    const handleAddUser = async () => {

        // Reset Errors
        setErros({
            userName: false,
            password: false,
        })

        // Validate Inputs
        if(user.userName === '') {
            setErros(prev => ({
                ...prev,
                userName: true
            }));
            return;
        }
        if(user.password === '') {
            setErros(prev => ({
                ...prev,
                password: true
            }));
            return;
        }

        setModalOpen(false);

        const res= await addUserMutaion.mutateAsync(user);

        if(res.success) {
            setUser({
                userName: '',
                password: '',
                isAdmin: 0,
            });
            refetch();
            toast({
                description: 'New User Has Been Created Successfully',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'bottom-left'
            });
            return;
        }

        toast({
            description: res.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'bottom-left'
        }) 
    }

    // ***************** Edit User **************** //

    const editUserMutaion = useMutation(() => updateUser(userId as number ,user));

    const handleEditUser = async () => {

        // Reset Errors
        setErros({
            userName: false,
            password: false,
        })

        // Validate Inputs
        if(user.userName === '') {
            setErros(prev => ({
                ...prev,
                userName: true
            }));
            setIsEditAction(false);
            return;
        }

        setModalOpen(false);
        setIsEditAction(false);

        const res= await editUserMutaion.mutateAsync();

        if(res.success) {
            setUser({
                userName: '',
                password: '',
                isAdmin: 0,
            });
            refetch();
            toast({
                description: 'New User Has Been Updated Successfully',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'bottom-left'
            });
            return;
        }

        toast({
            description: res.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'bottom-left'
        });

    }

    // ***************** Delete User **************** //

    const deleteUserMutaion = useMutation(deleteUser);

    const handleDeleteUser = async () => {

        setDeleteDialog(false);

        const res= await deleteUserMutaion.mutateAsync(userId as number);
        
        if(res.success) {
            refetch();
            toast({
                description: 'User Has Been Deleted Successfully',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'bottom-left'
            });
            return;
        }

        toast({
            description: res.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
            position: 'bottom-left'
        });

    }

    return (
        <>
        <Stack spacing={10} marginTop={50}>
            {
                deleteUserMutaion.isLoading ||
                addUserMutaion.isLoading &&
                <Progress isIndeterminate size='xs' colorScheme='teal' />
            }
            <Box>
                <Button onClick={() => setModalOpen(true)} rightIcon={<AddIcon />} bg='teal.500' color="white"_hover={{color: 'white'}} >Add User</Button>
            </Box>
            {
                isLoading ?
                (
                    <TableSkeleton />
                )
        
            :
            
            (
                <TableContainer mt={25}>
                    <Table variant='striped' marginBottom={50}>
                        <Thead>
                            <Tr>
                                <Th>Id</Th>
                                <Th>User Name</Th>
                                <Th textAlign='center'>Is Admin</Th>
                                <Th isNumeric>Options</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                data.users.map((user: IUser) =>
                                    <Tr key={user.id}>
                                        <Td>{user.id}</Td>
                                        <Td>{user.userName}</Td>
                                        <Td textAlign='center'>{user.isAdmin === 1 ? 
                                                <CheckIcon boxSize={'5'} padding={1} borderRadius={'50%'} color='white' bg='green.500' /> : 
                                                ''}</Td>
                                        <Td display={'flex'} justifyContent='flex-end'>
                                            <Button 
                                                size={'sm'} 
                                                bg="blue.400" 
                                                color={'white'} 
                                                _hover={{color: 'white'}}
                                                onClick={() => { 
                                                    setModalOpen(true);
                                                    setUserId(user.id);
                                                    setIsEditAction(true);
                                                    setUser(data.users.filter((u: IUser) => u.id === user.id)[0])
                                                }}>
                                                    <EditIcon />
                                            </Button>
                                            <Button 
                                                marginLeft={3}
                                                size={'sm'} 
                                                bg="red.400" 
                                                color={'white'} 
                                                _hover={{color: 'white'}}
                                                onClick={() => { 
                                                            setDeleteDialog(true);
                                                            setUserId(user.id);
                                                        }}>
                                                    <DeleteIcon />
                                            </Button>
                                        </Td>
                                    </Tr>                             
                                )
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            )
            }
        </Stack>
        <Dialog
            isOpen={deleteDialogOpen}
            heading='Delete User!'
            desc="Do you Want to Delete This User!"
            actionText='Delete'
            cancelText='Cancel'
            onClose={() => {
                setDeleteDialog(false);
                setUserId(null)
            }}
            actionColor='red'
            onAction={handleDeleteUser} 
        />
        <PopUp 
            isOpen={modalOpen}
            onClose={() => { setModalOpen(false);setUser({
                userName: '',
                password: '',
                isAdmin: 0,
            });}}
            onAction={() => isEditAction ? handleEditUser() : handleAddUser()}
            heading={`${isEditAction ? 'Edit' : 'Add'} User`}
            actionText={`${isEditAction ? 'Update' : 'Add'}`}
        >
            <UserForm user={user} errors={errors} handleChange={handleChange} isEditAction={isEditAction}/>
        </PopUp>
      </>
    )
}

export default Users
