import { Skeleton, Stack } from "@chakra-ui/react"

const TableSkeleton = () => {
  return (
    <Stack paddingTop={25} paddingBottom={25} spacing={3}>
      <Skeleton height='53px' startColor='gray.300' endColor='gray.100' />
      <Skeleton height='53px' startColor='gray.300' endColor='gray.100' />
      <Skeleton height='53px' startColor='gray.300' endColor='gray.100' />
      <Skeleton height='53px' startColor='gray.300' endColor='gray.100' />
      <Skeleton height='53px' startColor='gray.300' endColor='gray.100' />
      <Skeleton height='53px' startColor='gray.300' endColor='gray.100' />
      <Skeleton height='53px' startColor='gray.300' endColor='gray.100' />
      <Skeleton height='53px' startColor='gray.300' endColor='gray.100' />
      <Skeleton height='53px' startColor='gray.300' endColor='gray.100' />
    </Stack>
  )
}

export default TableSkeleton
