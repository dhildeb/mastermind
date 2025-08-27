import { useEffect, useState } from "react"
import CustomDropdown from "./components/dropdown"

type Guess = {
    colors: string[],
    correctSpot: number
    correctColor: number
}

export const Mastermind = () => {
    const [pattern, setPattern] = useState<string[]>([])
    const [guesses, setGuesses] = useState<Guess[]>([])
    const [currentGuess, setCurrentGuess] = useState<string[]>([])
    const [attempts, setAttempts] = useState<number>(0)
    const pegs = 5
    const options = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink']
    const [win, setWin] = useState<boolean | null>()

    const setNewPattern = () => {
        const newPattern = []
        for(let i = 0; i < pegs; i++){
            let rand = Math.floor(Math.random()*options.length)
            newPattern[i] = options[rand]
        }
        setPattern(newPattern)
    }

    const updateCurrentGuess = (value: string, position: number) => {
        let guess = currentGuess
        guess[position] = value
        setCurrentGuess(guess)
    }

    const makeAGuess = () => {
        let pass = true
        let goal = [...pattern]
        let attempt = [...currentGuess]
        let toRemove = []
        let correctSpot = 0
        let correctColor = 0
        for (let i = 0; i < pattern.length; i++) {
            if (pattern[i] !== currentGuess[i]) {
                pass = false;
            } else if (pattern[i] === currentGuess[i]) {
                toRemove.push(i)
                correctSpot++
            }
        }
        toRemove.sort((a, b) => b - a)
        toRemove.forEach(index => {
            goal.splice(index, 1)
            attempt.splice(index, 1)
        })
        if(pass){
            setWin(true)
        } else {
            for(let i = 0 ; i < attempt.length; i++){
                if(goal.includes(attempt[i])){
                    goal.splice(goal.indexOf(attempt[i]), 1)
                    correctColor++
                }
            }
            setGuesses([...guesses, {colors: [...currentGuess], correctSpot: correctSpot, correctColor: correctColor}])
            setAttempts(attempts + 1)
        }

    }

    useEffect(() => {
        setNewPattern()
    }, [])


    return (
        <div className="flex flex-col items-center justify-center h-screen gap-5 bg-black text-white">
            <span>Guess the Pattern</span>
            {win ? (
                pattern.map(peg => (
                    <span className={`size-2 bg-${peg}-500`}></span>
                ))
            ) : (
                <span className="text-yellow-500">{pattern.map((_) => (
                    ' ? '
                ))}</span>
            )}
            <div className="flex flex-col">
            {guesses.map(guess => {
                let colors = guess.colors.map((peg) => (
                    <span className={`size-4 rounded-full bg-${peg || 'red'}-500`}>&ensp;&ensp;&ensp;</span>
                ))

                if (guess?.colors.length === 0) return null;
                if (win) {
                    return<span>{colors} You Got It!</span>
                }
                return (
                    <div className="flex items-center gap-2">
                        {colors}
                        {guess.correctSpot} correct spot, {guess.correctColor} correct color
                    </div>
                )
            })}
            </div>
            <div className={`flex mt-5 ${win && 'hidden'}`}>
                {pattern.map((_, index) => (
                    <CustomDropdown key={index} options={options} onChange={(value) => updateCurrentGuess(value, index)} />
                ))}
                <span className="cursor-pointer rounded border border-1" onClick={() => makeAGuess()}>Make Guess</span>
            </div>
        </div>
    )
}