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
import { getYearReport } from '../../../http/reports';
import TableSkeleton from '../../layout/table-skeleton';
import { IOutlay } from '../../../models/outlays';

const currentYear = (new Date()).getFullYear();

const years = () => {
    const yearsArray = [];
    for (let i=currentYear ; i>=2010; i--) {
        yearsArray.push(i);        
    }
    return  yearsArray;
}

const YearReport = () => {

    const [year,setYear] = useState<number>(currentYear);

    const {data,isLoading} = useQuery(['year-total',year],() => getYearReport(year));

    return (
        <>
            <FormControl mt={5} marginBottom={5}>
                <FormLabel>Year</FormLabel>
                <Select onChange={e => setYear(Number(e.target.value))} value={year}>
                    {years().map(y => <option value={y}>{y}</option>)}
                </Select>
            </FormControl>
            <StatGroup gap={20}>
                {
                    isLoading ? 
                    <Skeleton width={150} height={100} startColor='gray.300' endColor='gray.100' /> : 
                    <Stat>
                        <StatLabel>{year} Expenses</StatLabel>
                        <StatNumber>{data.total === null ? 0 : data.total} SP</StatNumber>
                        <StatHelpText>
                            <StatArrow type='increase' />
                            23.36%
                        </StatHelpText>
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

export default YearReport
