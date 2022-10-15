import { useState } from 'react';
import { FormControl,
         FormLabel, 
         Select, 
         Skeleton, 
         Stat, 
         StatArrow, 
         StatGroup, 
         StatHelpText, 
         StatLabel, 
         StatNumber, 
         Table, 
         TableContainer,
         Tbody,
         Td,
         Th,
         Thead,
         Tr} from '@chakra-ui/react'
import { useQuery } from 'react-query';
import { getServicesReport } from '../../../http/reports';
import TableSkeleton from '../../layout/table-skeleton';
import { IOutlay } from '../../../models/outlays';
import { IMaterial } from '../../../models/materials';
import { getServices } from '../../../http/materials';

const ServicesReport = () => {

    const [materialId,setMaterialId] = useState<number>(0);

    const {data,isLoading} = useQuery(['service-total',materialId],() => getServicesReport(materialId));

    const {data: materials} = useQuery(['services'], getServices);

    return (
        <>
            <FormControl mt={5} marginBottom={5}>
                <FormLabel>Service</FormLabel>
                <Select onChange={e => setMaterialId(Number(e.target.value))} value={materialId}>
                    <option value={0}>Selecet Service</option>
                    {
                        materials && materials.materials.map((material: IMaterial) => <option key={material.id} value={material.id}>{material.name}</option>)
                    }
                </Select>
            </FormControl>
            {
                isLoading ? 
                <>
                    <Skeleton width={150} height={100} startColor='gray.300' endColor='gray.100' />
                    <Skeleton width={150} height={100} startColor='gray.300' endColor='gray.100' />
                </> : 
                <StatGroup gap={20}>
                    <Stat>
                        <StatLabel>Service Expenses</StatLabel>
                        <StatNumber>{data.total === null ? 0 : data.total} SP</StatNumber>
                        <StatHelpText>
                            <StatArrow type='increase' />
                            23.36%
                        </StatHelpText>
                    </Stat>
                    <Stat>
                        <StatLabel>Total Services Expenses</StatLabel>
                        <StatNumber>{
                            data.servicesTotal
                        } SP</StatNumber>
                        <StatHelpText>
                            <StatArrow type='increase' />
                            23.36%
                        </StatHelpText>
                    </Stat>
                </StatGroup>
            }
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
                                <Th>Material Name</Th>
                                <Th>Material</Th>
                                <Th>Outlay Type</Th>
                                <Th>Price</Th>
                                <Th>Date</Th>
                                <Th>Description</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                data.outlays.map((outlay: IOutlay) =>
                                    <Tr key={outlay.id}>
                                        <Td>{outlay.id}</Td>
                                        <Td>{outlay.materialName}</Td>
                                        <Td>{outlay.material}</Td>
                                        <Td>{outlay.outlayType}</Td>
                                        <Td>{outlay.price}</Td>
                                        <Td>{(new Date(outlay.date).toLocaleDateString())}</Td>
                                        <Td>{outlay.description}</Td>
                                    </Tr>                             
                                )
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
                )
            }
        </>
    )
}

export default ServicesReport
