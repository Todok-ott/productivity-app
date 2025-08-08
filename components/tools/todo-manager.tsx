"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Plus } from 'lucide-react'
import { toast } from "sonner"

interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: string
}

export function TodoManager() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem('todos')
    if (saved) {
      setTodos(JSON.parse(saved))
    }
  }, [])

  const saveTodos = (newTodos: Todo[]) => {
    setTodos(newTodos)
    localStorage.setItem('todos', JSON.stringify(newTodos))
  }

  const addTodo = () => {
    if (!newTodo.trim()) {
      toast.error("Please enter a todo item")
      return
    }

    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    }

    saveTodos([...todos, todo])
    setNewTodo("")
    toast.success("Todo added successfully!")
  }

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    saveTodos(updatedTodos)
  }

  const deleteTodo = (id: string) => {
    saveTodos(todos.filter(t => t.id !== id))
    toast.success("Todo deleted")
  }

  const completedCount = todos.filter(t => t.completed).length

  return (
    <div className="space-y-6">
      {/* Add Todo Form */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Todo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Enter your todo item"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            />
            <Button onClick={addTodo}>
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <Card className="bg-black/40 border-white/10">
        <CardContent className="p-4">
          <div className="text-white text-center">
            <span className="text-2xl font-bold">{completedCount}</span>
            <span className="text-white/70"> / {todos.length} completed</span>
          </div>
        </CardContent>
      </Card>

      {/* Todos List */}
      <div className="space-y-4">
        <h3 className="text-white text-lg font-semibold">
          Your Todos ({todos.length})
        </h3>
        
        {todos.length === 0 ? (
          <Card className="bg-black/40 border-white/10">
            <CardContent className="py-8 text-center">
              <p className="text-white/70">No todos yet. Add your first todo above!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {todos.map((todo) => (
              <Card key={todo.id} className="bg-black/40 border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                      className="border-white/30"
                    />
                    <span 
                      className={`flex-1 ${
                        todo.completed 
                          ? 'text-white/50 line-through' 
                          : 'text-white'
                      }`}
                    >
                      {todo.text}
                    </span>
                    <span className="text-white/50 text-xs">
                      {new Date(todo.createdAt).toLocaleDateString()}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-400 hover:text-red-300 p-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
