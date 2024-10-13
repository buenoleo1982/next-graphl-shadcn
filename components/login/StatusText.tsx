import { Heading } from '@chakra-ui/react'

interface StatusTextProps {
  errMsg?: string
  statusMsg?: string
}
const StatusText: React.FC<StatusTextProps> = ({ errMsg, statusMsg }) => {
  return (errMsg ?? statusMsg) ? (
    <Heading
      color={errMsg ? 'red.500' : 'green.500'}
      fontSize="lg"
      textAlign="center"
      backgroundColor="gray.100"
      padding="1rem"
      borderRadius="md"
    >
      {errMsg ?? statusMsg}
    </Heading>
  ) : null
}

export default StatusText
