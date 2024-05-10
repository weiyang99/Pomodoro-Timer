import { Button } from '@chakra-ui/react'
import Image from 'next/image'

type Props = {
    type: string,
    handleTimer: () => void,
    startTimer: boolean,
    darkMode: boolean
}

const Control = ({ type, handleTimer, startTimer, darkMode }: Props) => {
    return (
        <Button
            size={type == "play" ? "lg" : "md"}
            borderRadius="0.75rem"
            textAlign="center"
            boxShadow="lg"
            bgColor={type == "play" ? (darkMode ? "#B85C38" : "#FF7C7E") : (darkMode ? "#DCD7C9" : "#FEDAD8")}
            _hover={{ bg: type == "play" ? (darkMode ? "#A27B5C" : "#471514") : "#fff" }}
            _active={{ bg: type == "play" ? (darkMode ? "#B85C38" : "#FF7C7E") : (darkMode ? "#DCD7C9" : "#FEDAD8") }}
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