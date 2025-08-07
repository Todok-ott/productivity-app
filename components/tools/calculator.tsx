"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
      case "+": return firstValue + secondValue
      case "-": return firstValue - secondValue
      case "×": return firstValue * secondValue
      case "÷": return firstValue / secondValue
      case "=": return secondValue
      default: return secondValue
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

  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-white/10 dark:bg-black/10">
        <TabsTrigger value="basic" className="text-white">기본</TabsTrigger>
        <TabsTrigger value="scientific" className="text-white">공학용</TabsTrigger>
        <TabsTrigger value="converter" className="text-white">변환기</TabsTrigger>
      </TabsList>
      
      <TabsContent value="basic" className="space-y-4">
        <Card className="p-4 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20">
          <div className="text-right text-3xl font-mono text-white mb-4 p-4 bg-black/20 rounded-lg">
            {display}
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            <Button onClick={clear} className="col-span-2 bg-red-500/20 hover:bg-red-500/30 text-white">지우기</Button>
            <Button onClick={() => inputOperation("÷")} className="bg-blue-500/20 hover:bg-blue-500/30 text-white">÷</Button>
            <Button onClick={() => inputOperation("×")} className="bg-blue-500/20 hover:bg-blue-500/30 text-white">×</Button>
            
            <Button onClick={() => inputNumber("7")} className="bg-white/10 hover:bg-white/20 text-white">7</Button>
            <Button onClick={() => inputNumber("8")} className="bg-white/10 hover:bg-white/20 text-white">8</Button>
            <Button onClick={() => inputNumber("9")} className="bg-white/10 hover:bg-white/20 text-white">9</Button>
            <Button onClick={() => inputOperation("-")} className="bg-blue-500/20 hover:bg-blue-500/30 text-white">-</Button>
            
            <Button onClick={() => inputNumber("4")} className="bg-white/10 hover:bg-white/20 text-white">4</Button>
            <Button onClick={() => inputNumber("5")} className="bg-white/10 hover:bg-white/20 text-white">5</Button>
            <Button onClick={() => inputNumber("6")} className="bg-white/10 hover:bg-white/20 text-white">6</Button>
            <Button onClick={() => inputOperation("+")} className="bg-blue-500/20 hover:bg-blue-500/30 text-white">+</Button>
            
            <Button onClick={() => inputNumber("1")} className="bg-white/10 hover:bg-white/20 text-white">1</Button>
            <Button onClick={() => inputNumber("2")} className="bg-white/10 hover:bg-white/20 text-white">2</Button>
            <Button onClick={() => inputNumber("3")} className="bg-white/10 hover:bg-white/20 text-white">3</Button>
            <Button onClick={performCalculation} className="row-span-2 bg-green-500/20 hover:bg-green-500/30 text-white">=</Button>
            
            <Button onClick={() => inputNumber("0")} className="col-span-2 bg-white/10 hover:bg-white/20 text-white">0</Button>
            <Button onClick={() => inputNumber(".")} className="bg-white/10 hover:bg-white/20 text-white">.</Button>
          </div>
        </Card>
      </TabsContent>
      
      <TabsContent value="scientific" className="space-y-4">
        <Card className="p-4 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20">
          <p className="text-white text-center">공학용 계산기 기능이 곧 제공됩니다...</p>
        </Card>
      </TabsContent>
      
      <TabsContent value="converter" className="space-y-4">
        <Card className="p-4 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20">
          <div className="space-y-4">
            <div>
              <Label className="text-white">길이 변환기</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <Input placeholder="값을 입력하세요" className="bg-white/10 text-white border-white/20" />
                  <Select>
                    <SelectTrigger className="mt-2 bg-white/10 text-white border-white/20">
                      <SelectValue placeholder="변환할 단위" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="m">미터</SelectItem>
                      <SelectItem value="ft">피트</SelectItem>
                      <SelectItem value="in">인치</SelectItem>
                      <SelectItem value="cm">센티미터</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Input placeholder="결과" readOnly className="bg-white/10 text-white border-white/20" />
                  <Select>
                    <SelectTrigger className="mt-2 bg-white/10 text-white border-white/20">
                      <SelectValue placeholder="변환될 단위" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="m">미터</SelectItem>
                      <SelectItem value="ft">피트</SelectItem>
                      <SelectItem value="in">인치</SelectItem>
                      <SelectItem value="cm">센티미터</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
