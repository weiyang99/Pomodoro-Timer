"use client"

import Image from "next/image";
import { Box, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { secondsToMinutes } from "../utils/Second-to-Minutes";
import Control from "./Control";
import Setting from "./Setting";

const Timer = () => {
    const [work, setWork] = useState(25);
    const [rest, setRest] = useState(5);
    const [darkMode, setDarkMode] = useState(false);
    const [startTimer, setStartTimer] = useState(false);
    const [working, setWorking] = useState(false);
    const [cycles, setCycles] = useState(0);
    const [time, setTime] = useState(work * 60);
    const [timeLapsed, setTimeLapsed] = useState(0);

    // Start / Pause
    const handleStartTimer = () => {
        startTimer ? setStartTimer(false) : setStartTimer(true);
    };

    // Resetting
    const handleReset = () => {
        setWork(25);
        setRest(5);
        setStartTimer(false);
        setWorking(true);
        setCycles(0);
        setTime(25 * 60);
        setTimeLapsed(0);
    };

    // Time lapse
    useEffect(() => {
        if (startTimer) {
            const interval = setTimeout(() => {
                time > 0 && setTime(time - 1);
                time > 0 && setTimeLapsed(timeLapsed + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [time, startTimer]);

    // Coordinate auto switching between Work / Rest
    useEffect(() => {
        if (working && timeLapsed == work * 60) {
            setCycles(cycles + 1);
            setWorking(false);
            setTime(rest * 60);
            setTimeLapsed(0);
        } else {
            if (!working && timeLapsed == rest * 60) {
                setWorking(true);
                setTime(work * 60);
                setTimeLapsed(0);
            }
        }
    }, [timeLapsed])

    // Changes from setting
    useEffect(() => {
        setWork(work);
        setRest(rest);

        if (working) {
            setTime(work * 60)
        } else {
            setTime(rest * 60)
        }
    }, [work, rest]);

    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" width="100%" height="100vh" bgColor={darkMode ? "#2C3639" : "#FFF2F2"}>

            {/* Current Cycle Status */}
            {working
                ?
                <Stack direction="row" bgColor={darkMode ? "#DCD7C9" : "#FEDAD8"} px={{ base: "1.125rem", sm: "1.5rem" }} py="0.375rem" border="4px" borderColor={darkMode ? "#A27B5C" : "#471514"} borderRadius="2rem" boxShadow="lg">
                    <Image src="/images/pen.svg" alt="pen" width={30} height={30} />
                    <Text color={darkMode ? "#A27B5C" : "#471514"} fontSize="2xl" fontWeight={600}>
                        Work
                    </Text>
                </Stack>
                :
                <Stack direction="column" alignItems="center" bgColor={darkMode ? "#DCD7C9" : "#FEDAD8"} px="3.5rem" py="0.375rem" border="4px" borderColor={darkMode ? "#A27B5C" : "#471514"} borderRadius="2rem" boxShadow="lg">
                    <Stack direction="row">
                        <Image src="/images/relax.svg" alt="pen" width={40} height={40} />
                        <Text color={darkMode ? "#A27B5C" : "#471514"} fontSize="3xl" fontWeight={600}>
                            Rest
                        </Text>
                    </Stack>
                    <Text fontSize="3rem">
                        {secondsToMinutes(time)}
                    </Text>
                </Stack>
            }

            {/* Time Display */}
            {working
                ? <Box fontSize={{ base: "6rem", sm: "8rem", md: "16rem" }} color={darkMode ? "#A27B5C" : "#471514"}>{secondsToMinutes(time)}</Box>
                : darkMode
                    ? <Box color={darkMode ? "#A27B5C" : "#471514"}>
                        <Image src='/images/coffeeDark.svg' alt='' width={300} height={27} />
                    </Box>
                    : <Box color={darkMode ? "#A27B5C" : "#471514"}>
                        <Image src='/images/coffee.svg' alt='' width={300} height={27} />
                    </Box>
            }

            {/* Work cycles done */}
            <Box display="flex" alignItems="center" mb={5} gap={2}>
                <Image src="/images/tick.svg" alt="tick" width={37} height={37} />
                <Text fontSize="2xl" fontWeight={600} mt={1} color={darkMode ? "#A27B5C" : "#471514"}>
                    {cycles} work cycles
                </Text>
            </Box>

            {/* Control Buttons */}
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                gap={5}
            >
                <Setting setWork={setWork} setRest={setRest} setDarkMode={setDarkMode} darkMode={darkMode} startTimer={startTimer} />
                <Control type="play" handleTimer={handleStartTimer} startTimer={startTimer} darkMode={darkMode} />
                <Control type="reset" handleTimer={handleReset} startTimer={startTimer} darkMode={darkMode} />
            </Box>
        </Box >
    );
};

export default Timer;