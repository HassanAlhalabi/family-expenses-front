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
import Dialog from '../layout/dialog';
import TableSkeleton from '../layout/table-skeleton';
import { ChangeEvent, useState } from 'react';
import PopUp from '../layout/modal';
import MaterialForm from './material-form';
import { addMaterial, deleteMaterial, getMaterials, updateMaterial } from '../../http/materials';
import { IMaterial } from '../../models/materials';

const Materials = () => {

    const toast = useToast();

    const {data, isLoading, refetch} = useQuery(['materials'],getMaterials);

    const [materialId, setMaterialId] = useState<null | number>(null);

    const [deleteDialogOpen, setDeleteDialog] = useState(false);

    const [modalOpen, setModalOpen] = useState(false);

    const [isEditAction, setIsEditAction] = useState(false);

    // ***************** Add Material **************** //

    const [material, setMaterial] = useState({
        name: '',
        isService: 0,
        description: ''
    });

    const [errors, setErros] = useState({
        name: false,
        description: false,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.target.type === 'checkbox' ? 
            setMaterial(prev => ({
                ...prev,
                [e.target.name] : (e.target as HTMLInputElement).checked ? 1 : 0
            })) :
            setMaterial(prev => ({
                ...prev,
                [e.target.name] : e.target.value
            }))
    }

    const addMaterialMutaion = useMutation(addMaterial);

    const handleAddMaterial = async () => {

        // Reset Errors
        setErros({
            name: false,
            description: false,
        })

        // Validate Inputs
        if(material.name === '') {
            setErros(prev => ({
                ...prev,
                name: true
            }));
            return;
        }
        if(material.description === '') {
            setErros(prev => ({
                ...prev,
                description: true
            }));
            return;
        }

        setModalOpen(false);

        const res= await addMaterialMutaion.mutateAsync(material);

        if(res.success) {
            setMaterial({
                name: '',
                description: '',
                isService: 0,
            });
            refetch();
            toast({
                description: 'New Material Has Been Created Successfully',
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

    // ***************** Edit Material **************** //

    const editMaterialMutaion = useMutation(() => updateMaterial(materialId as number ,material));

    const handleEditMaterial = async () => {

        // Reset Errors
        setErros({
            name: false,
            description: false,
        })

        // Validate Inputs
        if(material.name === '') {
            setErros(prev => ({
                ...prev,
                name: true
            }));
            setIsEditAction(false);
            return;
        }
        if(material.description === '') {
            setErros(prev => ({
                ...prev,
                description: true
            }));
            setIsEditAction(false);
            return;
        }

        setModalOpen(false);
        setIsEditAction(false);

        const res= await editMaterialMutaion.mutateAsync();

        if(res.success) {
            setMaterial({
                name: '',
                description: '',
                isService: 0,
            });
            refetch();
            toast({
                description: 'New Material Has Been Updated Successfully',
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

    // ***************** Delete Material **************** //

    const deleteMaterialMutaion = useMutation(deleteMaterial);

    const handleDeleteMaterial = async () => {

        setDeleteDialog(false);

        const res= await deleteMaterialMutaion.mutateAsync(materialId as number);
        
        if(res.success) {
            refetch();
            toast({
                description: 'Material Has Been Deleted Successfully',
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
                deleteMaterialMutaion.isLoading ||
                addMaterialMutaion.isLoading &&
                <Progress isIndeterminate size='xs' colorScheme='teal' />
            }
            <Box>
                <Button onClick={() => setModalOpen(true)} rightIcon={<AddIcon />} bg='teal.500' color="white"_hover={{color: 'white'}} >Add Material</Button>
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
                                <Th>Material Name</Th>
                                <Th textAlign='center'>Is Service</Th>
                                <Th>Description</Th>
                                <Th isNumeric>Options</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                data.materials.map((material: IMaterial) =>
                                    <Tr key={material.id}>
                                        <Td>{material.name}</Td>
                                        <Td textAlign='center'>{material.isService === 1 ? 
                                                <CheckIcon boxSize={'5'} padding={1} borderRadius={'50%'} color='white' bg='green.500' /> : 
                                                ''}</Td>
                                        <Td>{material.description}</Td>
                                        <Td display={'flex'} justifyContent='flex-end'>
                                            <Button 
                                                size={'sm'} 
                                                bg="blue.400" 
                                                color={'white'} 
                                                _hover={{color: 'white'}}
                                                onClick={() => { 
                                                    setModalOpen(true);
                                                    setMaterialId(material.id);
                                                    setIsEditAction(true);
                                                    setMaterial(data.materials.filter((u: IMaterial) => u.id === material.id)[0])
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
                                                            setMaterialId(material.id);
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
            heading='Delete Material!'
            desc="Do you Want to Delete This Material!"
            actionText='Delete'
            cancelText='Cancel'
            onClose={() => {
                setDeleteDialog(false);
                setMaterialId(null)
            }}
            actionColor='red'
            onAction={handleDeleteMaterial} 
        />
        <PopUp 
            isOpen={modalOpen}
            onClose={() => { setModalOpen(false);setMaterial({
                name: '',
                description: '',
                isService: 0,
            });}}
            onAction={() => isEditAction ? handleEditMaterial() : handleAddMaterial()}
            heading={`${isEditAction ? 'Edit' : 'Add'} Material`}
            actionText={`${isEditAction ? 'Update' : 'Add'}`}
        >
            <MaterialForm material={material} errors={errors} handleChange={handleChange} isEditAction={isEditAction}/>
        </PopUp>
      </>
    )
}

export default Materials
