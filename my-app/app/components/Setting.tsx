import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack, Switch, Text, useDisclosure } from '@chakra-ui/react'
import Image from 'next/image';
import React, { useRef, useState } from 'react'

type Props = {
    setWork: (minutes: number) => void,
    setRest: (rest: number) => void,
    setDarkMode: (mode: boolean) => void,
    darkMode: boolean,
    startTimer: boolean
}

const Setting = ({ setWork, setRest, setDarkMode, darkMode, startTimer }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef<HTMLButtonElement>(null);
    const [changeWork, setChangeWork] = useState(25);
    const [changeRest, setChangeRest] = useState(5);
    const [changeMode, setChangeMode] = useState(false);

    const handleSubmit = () => {
        if (Number.isNaN(changeWork)) {
            setWork(1);
        } else {
            setWork(changeWork);
        };

        if (Number.isNaN(changeRest)) {
            setRest(1);
        } else {
            setRest(changeRest);
        };

        onClose();
    };

    return (
        <>
            <Button
                size="md"
                borderRadius="0.75rem"
                textAlign="center"
                boxShadow="lg"
                bgColor={darkMode ? "#DCD7C9" : "#FEDAD8"}
                _hover={{ bg: "#fff" }}
                _active={{ bg: darkMode ? "#DCD7C9" : "#FEDAD8" }}
                onClick={onOpen}
            >
                <Image src='/images/setting.svg' alt='' width={27} height={27} />
            </Button>

            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Setting</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        <Stack direction="column" gap={4}>
                            {/* Change Work Time */}
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Text fontWeight={600}>Work</Text>
                                <NumberInput defaultValue={changeWork} keepWithinRange min={1} max={60} onChange={(value) => setChangeWork(parseInt(value))}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Stack>

                            {/* Change Rest Time */}
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Text fontWeight={600}>Rest</Text>
                                <NumberInput defaultValue={changeRest} keepWithinRange min={1} max={60} onChange={(value) => setChangeRest(parseInt(value))}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Stack>

                            {/* Dark Mode Toggle */}
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Text fontWeight={600}>Dark Mode</Text>
                                <Switch size="lg" defaultChecked={changeMode} onChange={(e) => {
                                    setDarkMode(e.target.checked); setChangeMode(e.target.checked);
                                }} />
                            </Stack>
                        </Stack>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        {startTimer
                            ? <></>
                            : <Button ref={cancelRef} onClick={handleSubmit}>
                                Save
                            </Button>
                        }
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default Setting