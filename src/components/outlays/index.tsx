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
import { ChangeEvent, useContext, useState } from 'react';
import PopUp from '../layout/modal';
import OutlayForm from './outlay-form';
import { addOutlay, deleteOutlay, getOutlays, updateOutlay } from '../../http/outlays';
import { IOutlay } from '../../models/outlays';
import { AuthContext } from '../../context/auth';

const Outlays = () => {

    const { isAdmin } = useContext(AuthContext);

    const toast = useToast();

    const {data, isLoading, refetch} = useQuery(['outlays'],getOutlays);

    const [outlayId, setOutlayId] = useState<null | number>(null);

    const [deleteDialogOpen, setDeleteDialog] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);

    const [isEditAction, setIsEditAction] = useState(false);

    // ***************** Add Outlay **************** //

    const [outlay, setOutlay] = useState({
        materialId: 0,
        outlayTypeId: 0,
        price: 0,
        date: new Date(),
        description: ''
    });

    const [errors, setErros] = useState({
        materialId: false,
        outlayTypeId: false,
        price: false,
        description: false
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
            setOutlay(prev => ({
                ...prev,
                [e.target.name] : e.target.value
            }))
    }

    const addOutlayMutaion = useMutation(addOutlay);

    const handleAddOutlay = async () => {

        let isError = false;

        // Reset Errors
        setErros({
            materialId: false,
            outlayTypeId: false,
            price: false,
            description: false
        })

        // Validate Inputs
        Object.entries(outlay).map(([key,value]) => {
            if(!value) {
                isError = true;
                setErros(prev => ({
                    ...prev,
                    [key]: true
                }))
            }
        })

        if(isError) return;

        setModalOpen(false);

        const res= await addOutlayMutaion.mutateAsync(outlay);

        if(res.success) {
            setOutlay({
                materialId: 0,
                outlayTypeId: 0,
                price: 0,
                date: new Date(),
                description: ''
            });
            refetch();
            toast({
                description: 'New Outlay Has Been Created Successfully',
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

    // ***************** Edit Outlay **************** //

    const editOutlayMutaion = useMutation(() => updateOutlay(outlayId as number ,outlay));

    const handleEditOutlay = async () => {

        let isError = false;

        // Reset Errors
        setErros({
            materialId: false,
            outlayTypeId: false,
            price: false,
            description: false
        })

        // Validate Inputs
        Object.entries(outlay).map(([key,value]) => {
            if(!value) {
                isError = true;
                setErros(prev => ({
                    ...prev,
                    [key]: true
                }))
            }
        })

        if(isError) return;

        setModalOpen(false);
        setIsEditAction(false);

        const res= await editOutlayMutaion.mutateAsync();

        if(res.success) {
            setOutlay({
                materialId: 0,
                outlayTypeId: 0,
                price: 0,
                date: new Date(),
                description: ''
            });
            refetch();
            toast({
                description: 'New Outlay Has Been Updated Successfully',
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

    // ***************** Delete Outlay **************** //

    const deleteOutlayMutaion = useMutation(deleteOutlay);

    const handleDeleteOutlay = async () => {

        setDeleteDialog(false);

        const res= await deleteOutlayMutaion.mutateAsync(outlayId as number);
        
        if(res.success) {
            refetch();
            toast({
                description: 'Outlay Has Been Deleted Successfully',
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
                deleteOutlayMutaion.isLoading ||
                addOutlayMutaion.isLoading &&
                <Progress isIndeterminate size='xs' colorScheme='teal' />
            }
            <Box>
                <Button onClick={() => setModalOpen(true)} rightIcon={<AddIcon />} bg='teal.500' color="white"_hover={{color: 'white'}} >Add Outlay</Button>
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
                                { isAdmin && <Th>User Name</Th> }
                                <Th>Material</Th>
                                <Th>Outlay Type</Th>
                                <Th>Price</Th>
                                <Th>Date</Th>
                                <Th>Description</Th>
                                <Th>Options</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                data.outlays.map((outlay: IOutlay) =>
                                    <Tr key={outlay.id}>
                                        <Td>{outlay.id}</Td>
                                        { isAdmin && <Td>{outlay.userName}</Td> }
                                        <Td>{outlay.material}</Td>
                                        <Td>{outlay.outlayType}</Td>
                                        <Td>{outlay.price}</Td>
                                        <Td>{(new Date(outlay.date).toLocaleDateString())}</Td>
                                        <Td>{outlay.description}</Td>
                                        <Td display={'flex'} justifyContent='flex-end'>
                                            <Button 
                                                size={'sm'} 
                                                bg="blue.400" 
                                                color={'white'} 
                                                _hover={{color: 'white'}}
                                                onClick={() => { 
                                                    setModalOpen(true);
                                                    setOutlayId(outlay.id);
                                                    setIsEditAction(true);
                                                    setOutlay(data.outlays.filter((u: IOutlay) => u.id === outlay.id)[0])
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
                                                            setOutlayId(outlay.id);
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
            heading='Delete Outlay!'
            desc="Do you Want to Delete This Outlay!"
            actionText='Delete'
            cancelText='Cancel'
            onClose={() => {
                setDeleteDialog(false);
                setOutlayId(null)
            }}
            actionColor='red'
            onAction={handleDeleteOutlay} 
        />
        <PopUp 
            isOpen={modalOpen}
            onClose={() => { setModalOpen(false);setOutlay({
                materialId: 0,
                outlayTypeId: 0,
                price: 0,
                date: new Date(),
                description: ''
            });}}
            onAction={() => isEditAction ? handleEditOutlay() : handleAddOutlay()}
            heading={`${isEditAction ? 'Edit' : 'Add'} Outlay`}
            actionText={`${isEditAction ? 'Update' : 'Add'}`}
        >
            <OutlayForm outlay={outlay} errors={errors} handleChange={handleChange} isEditAction={isEditAction}/>
        </PopUp>
      </>
    )
}

export default Outlays
