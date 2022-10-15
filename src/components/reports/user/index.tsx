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
import { getUserReport } from '../../../http/reports';
import TableSkeleton from '../../layout/table-skeleton';
import { IOutlay } from '../../../models/outlays';
import { getUsers } from '../../../http/users';
import { IUser } from '../../../models/users';

const UserReport = () => {

    const [userId,setUserId] = useState<number>(0);

    const {data,isLoading} = useQuery(['user-total',userId],() => getUserReport(userId));

    const {data: users} = useQuery(['users'], getUsers);

    return (
        <>
            <FormControl mt={5} marginBottom={5}>
                <FormLabel>User</FormLabel>
                <Select onChange={e => setUserId(Number(e.target.value))} value={userId}>
                    <option value={0}>Selecet User</option>
                    {
                        users && users.users.map((user: IUser) => <option key={user.id} value={user.id}>{user.userName}</option>)
                    }
                </Select>
            </FormControl>
            <StatGroup gap={20}>
                {
                    isLoading ? 
                    <Skeleton marginRight={'auto'} width={150} height={100} startColor='gray.300' endColor='gray.100' /> : 
                    <Stat>
                        <StatLabel>User Expenses</StatLabel>
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

export default UserReport
