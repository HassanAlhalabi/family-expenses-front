import { useState } from 'react';
import { FormControl,
         FormLabel, 
         Input, 
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
import { getYearMonthReport } from '../../../http/reports';
import TableSkeleton from '../../layout/table-skeleton';
import { IOutlay } from '../../../models/outlays';

const currentMonth = ((new Date()).toISOString().split('T')[0]).split('-').slice(0,2).join('-');

const MonthReport = () => {

    const [date,setDate] = useState<string>(currentMonth);
    const year = date.split('-')[0];
    const month = date.split('-')[1];

    const {data,isLoading} = useQuery(['year-total',date],
        () => getYearMonthReport(Number(year),Number(month)))

    return (
        <>
            <FormControl mt={5} marginBottom={5}>
                <FormLabel>Month - Year</FormLabel>
                <Input 
                    onChange={e => setDate(e.target.value)} 
                    name="date"
                    value={date} 
                    type={'month'}/>
            </FormControl>
            <StatGroup gap={20}>
                {
                    isLoading ? 
                    <Skeleton marginRight={'auto'} width={150} height={100} startColor='gray.300' endColor='gray.100' /> : 
                    <Stat>
                        <StatLabel>{month}-{year} Expenses</StatLabel>
                        <StatNumber>{data.total === null ? 0 : data.total} SP</StatNumber>
                    </Stat>
                }
            </StatGroup>
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
                                        <Td>{outlay.userName}</Td>
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

export default MonthReport
