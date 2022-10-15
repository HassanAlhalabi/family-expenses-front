import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
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
import Dialog from '../layout/dialog';
import TableSkeleton from '../layout/table-skeleton';
import { ChangeEvent, useState } from 'react';
import PopUp from '../layout/modal';
import OutlayTypeForm from './outlay-type-form';
import { addOutlayType, deleteOutlayType, getOutlayTypes, updateOutlayType } from '../../http/outlay-types';
import { IOutlayType } from '../../models/outlay-types';

const OutlayTypes = () => {

    const toast = useToast();

    const {data, isLoading, refetch} = useQuery(['outlayTypes'],getOutlayTypes);

    const [outlayTypeId, setOutlayTypeId] = useState<null | number>(null);

    const [deleteDialogOpen, setDeleteDialog] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);

    const [isEditAction, setIsEditAction] = useState(false);

    // ***************** Add OutlayType **************** //

    const [outlayType, setOutlayType] = useState({
        name: '',
        description: ''
    });

    const [errors, setErros] = useState({
        name: false,
        description: false,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.target.type === 'checkbox' ? 
            setOutlayType(prev => ({
                ...prev,
                [e.target.name] : (e.target as HTMLInputElement).checked ? 1 : 0
            })) :
            setOutlayType(prev => ({
                ...prev,
                [e.target.name] : e.target.value
            }))
    }

    const addOutlayTypeMutaion = useMutation(addOutlayType);

    const handleAddOutlayType = async () => {

        // Reset Errors
        setErros({
            name: false,
            description: false,
        })

        // Validate Inputs
        if(outlayType.name === '') {
            setErros(prev => ({
                ...prev,
                name: true
            }));
            return;
        }
        if(outlayType.description === '') {
            setErros(prev => ({
                ...prev,
                description: true
            }));
            return;
        }

        setModalOpen(false);

        const res= await addOutlayTypeMutaion.mutateAsync(outlayType);

        if(res.success) {
            setOutlayType({
                name: '',
                description: '',
            });
            refetch();
            toast({
                description: 'New OutlayType Has Been Created Successfully',
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

    // ***************** Edit OutlayType **************** //

    const editOutlayTypeMutaion = useMutation(() => updateOutlayType(outlayTypeId as number ,outlayType));

    const handleEditOutlayType = async () => {

        // Reset Errors
        setErros({
            name: false,
            description: false,
        })

        // Validate Inputs
        if(outlayType.name === '') {
            setErros(prev => ({
                ...prev,
                name: true
            }));
            setIsEditAction(false);
            return;
        }
        if(outlayType.description === '') {
            setErros(prev => ({
                ...prev,
                description: true
            }));
            setIsEditAction(false);
            return;
        }

        setModalOpen(false);
        setIsEditAction(false);

        const res= await editOutlayTypeMutaion.mutateAsync();

        if(res.success) {
            setOutlayType({
                name: '',
                description: '',
            });
            refetch();
            toast({
                description: 'New OutlayType Has Been Updated Successfully',
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

    // ***************** Delete OutlayType **************** //

    const deleteOutlayTypeMutaion = useMutation(deleteOutlayType);

    const handleDeleteOutlayType = async () => {

        setDeleteDialog(false);

        const res= await deleteOutlayTypeMutaion.mutateAsync(outlayTypeId as number);
        
        if(res.success) {
            refetch();
            toast({
                description: 'OutlayType Has Been Deleted Successfully',
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
                deleteOutlayTypeMutaion.isLoading ||
                addOutlayTypeMutaion.isLoading &&
                <Progress isIndeterminate size='xs' colorScheme='teal' />
            }
            <Box>
                <Button onClick={() => setModalOpen(true)} rightIcon={<AddIcon />} bg='teal.500' color="white"_hover={{color: 'white'}} >Add OutlayType</Button>
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
                                <Th>OutlayType Name</Th>
                                <Th>Description</Th>
                                <Th isNumeric>Options</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                data.outlayTypes.map((outlayType: IOutlayType) =>
                                    <Tr key={outlayType.id}>
                                        <Td>{outlayType.id}</Td>
                                        <Td>{outlayType.name}</Td>
                                        <Td>{outlayType.description}</Td>
                                        <Td display={'flex'} justifyContent='flex-end'>
                                            <Button 
                                                size={'sm'} 
                                                bg="blue.400" 
                                                color={'white'} 
                                                _hover={{color: 'white'}}
                                                onClick={() => { 
                                                    setModalOpen(true);
                                                    setOutlayTypeId(outlayType.id);
                                                    setIsEditAction(true);
                                                    setOutlayType(data.outlayTypes.filter((u: IOutlayType) => u.id === outlayType.id)[0])
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
                                                            setOutlayTypeId(outlayType.id);
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
            heading='Delete OutlayType!'
            desc="Do you Want to Delete This OutlayType!"
            actionText='Delete'
            cancelText='Cancel'
            onClose={() => {
                setDeleteDialog(false);
                setOutlayTypeId(null)
            }}
            actionColor='red'
            onAction={handleDeleteOutlayType} 
        />
        <PopUp 
            isOpen={modalOpen}
            onClose={() => { setModalOpen(false);setOutlayType({
                name: '',
                description: '',
            });}}
            onAction={() => isEditAction ? handleEditOutlayType() : handleAddOutlayType()}
            heading={`${isEditAction ? 'Edit' : 'Add'} OutlayType`}
            actionText={`${isEditAction ? 'Update' : 'Add'}`}
        >
            <OutlayTypeForm outlayType={outlayType} errors={errors} handleChange={handleChange} isEditAction={isEditAction}/>
        </PopUp>
      </>
    )
}

export default OutlayTypes
