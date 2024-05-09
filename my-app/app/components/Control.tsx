import { Button } from '@chakra-ui/react'
import Image from 'next/image'

type Props = {
    type: string,
    handleTimer: () => void,
    startTimer: boolean
}

const Control = ({ type, handleTimer, startTimer }: Props) => {
    return (
        <Button
            size={type == "play" ? "lg" : "md"}
            borderRadius="0.75rem"
            textAlign="center"
            boxShadow="lg"
            bgColor={type == "play" ? "#FF7C7E" : "#FEDAD8"}
            _hover={{ bg: type == "play" ? "#471514" : "#fff" }}
            _active={{ bg: type == "play" ? "#FF7C7E" : "#FEDAD8" }}
            onClick={handleTimer}
        >
            {type == "reset"
                ? <Image src='/images/reset.svg' alt='' width={27} height={27} />
                : (type == "play" && !startTimer
                    ? <Image src='/images/play.svg' alt='' width={27} height={27} />
                    : <Image src='/images/pause.svg' alt='' width={27} height={27} />)
            }
        </Button>
    )
}

export default Control