import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack, Text, useDisclosure } from '@chakra-ui/react'
import Image from 'next/image';
import React, { useRef, useState } from 'react'

type Props = {
    setWork: (minutes: number) => void;
    setRest: (rest: number) => void;
}

const Setting = ({ setWork, setRest }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef<HTMLButtonElement>(null);
    const [changeWork, setChangeWork] = useState(25);
    const [changeRest, setChangeRest] = useState(5);

    const handleSubmit = () => {
        setWork(changeWork);
        setRest(changeRest);
        onClose();
    };

    return (
        <>
            <Button
                size="md"
                borderRadius="0.75rem"
                textAlign="center"
                boxShadow="lg"
                bgColor="#FEDAD8"
                _hover={{ bg: "#fff" }}
                _active={{ bg: "#FEDAD8" }}
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
                        <Stack direction="column" gap={2}>
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
                        </Stack>
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={handleSubmit}>
                            Save
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default Setting