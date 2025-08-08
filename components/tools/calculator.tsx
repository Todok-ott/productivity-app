"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function Calculator() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
  }

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue
      case "-":
        return firstValue - secondValue
      case "×":
        return firstValue * secondValue
      case "÷":
        return firstValue / secondValue
      case "=":
        return secondValue
      default:
        return secondValue
    }
  }

  const performCalculation = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const clear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.")
      setWaitingForOperand(false)
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".")
    }
  }

  return (
    <div className="max-w-sm mx-auto">
      <Card className="bg-black/40 border-white/10">
        <CardContent className="p-6 space-y-4">
          {/* Display */}
          <div className="bg-black/30 p-4 rounded-lg">
            <div className="text-white text-right text-3xl font-mono overflow-hidden">
              {display}
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-4 gap-2">
            <Button
              onClick={clear}
              className="col-span-2 bg-red-600 hover:bg-red-700 text-white"
            >
              Clear
            </Button>
            <Button
              onClick={() => inputOperation("÷")}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              ÷
            </Button>
            <Button
              onClick={() => inputOperation("×")}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              ×
            </Button>

            <Button
              onClick={() => inputNumber("7")}
              className="bg-gray-600 hover:bg-gray-700 text-white"
            >
              7
            </Button>
            <Button
              onClick={() => inputNumber("8")}
              className="bg-gray-600 hover:bg-gray-700 text-white"
            >
              8
            </Button>
            <Button
              onClick={() => inputNumber("9")}
              className="bg-gray-600 hover:bg-gray-700 text-white"
            >
              9
            </Button>
            <Button
              onClick={() => inputOperation("-")}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              -
            </Button>

            <Button
              onClick={() => inputNumber("4")}
              className="bg-gray-600 hover:bg-gray-700 text-white"
            >
              4
            </Button>
            <Button
              onClick={() => inputNumber("5")}
              className="bg-gray-600 hover:bg-gray-700 text-white"
            >
              5
            </Button>
            <Button
              onClick={() => inputNumber("6")}
              className="bg-gray-600 hover:bg-gray-700 text-white"
            >
              6
            </Button>
            <Button
              onClick={() => inputOperation("+")}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              +
            </Button>

            <Button
              onClick={() => inputNumber("1")}
              className="bg-gray-600 hover:bg-gray-700 text-white"
            >
              1
            </Button>
            <Button
              onClick={() => inputNumber("2")}
              className="bg-gray-600 hover:bg-gray-700 text-white"
            >
              2
            </Button>
            <Button
              onClick={() => inputNumber("3")}
              className="bg-gray-600 hover:bg-gray-700 text-white"
            >
              3
            </Button>
            <Button
              onClick={performCalculation}
              className="row-span-2 bg-green-600 hover:bg-green-700 text-white"
            >
              =
            </Button>

            <Button
              onClick={() => inputNumber("0")}
              className="col-span-2 bg-gray-600 hover:bg-gray-700 text-white"
            >
              0
            </Button>
            <Button
              onClick={inputDecimal}
              className="bg-gray-600 hover:bg-gray-700 text-white"
            >
              .
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
