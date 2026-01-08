"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Pencil, Trash2, Plus } from "lucide-react"

interface Task {
  id: number
  text: string
  completed: boolean
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState("")

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
      setNewTask("")
    }
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleComplete = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const startEdit = (task: Task) => {
    setEditingId(task.id)
    setEditText(task.text)
  }

  const saveEdit = () => {
    if (editText.trim() && editingId !== null) {
      setTasks(tasks.map((task) => (task.id === editingId ? { ...task, text: editText } : task)))
      setEditingId(null)
      setEditText("")
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText("")
  }

  const activeTasks = tasks.filter((task) => !task.completed)
  const completedTasks = tasks.filter((task) => task.completed)

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-foreground md:text-5xl">Task Manager</h1>
          <p className="text-muted-foreground">Organize your work and get things done</p>
        </div>

        <Card className="mb-6 bg-card p-6">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Add a new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              className="flex-1 bg-background"
            />
            <Button onClick={addTask} size="lg" className="gap-2">
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
        </Card>

        <div className="space-y-6">
          {activeTasks.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Active Tasks ({activeTasks.length})
              </h2>
              <div className="space-y-2">
                {activeTasks.map((task) => (
                  <Card key={task.id} className="bg-card p-4 transition-all hover:shadow-md">
                    {editingId === task.id ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") saveEdit()
                            if (e.key === "Escape") cancelEdit()
                          }}
                          className="flex-1 bg-background"
                          autoFocus
                        />
                        <Button onClick={saveEdit} size="sm">
                          Save
                        </Button>
                        <Button onClick={cancelEdit} size="sm" variant="outline">
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => toggleComplete(task.id)}
                          className="h-5 w-5"
                        />
                        <span className="flex-1 text-foreground">{task.text}</span>
                        <div className="flex gap-1">
                          <Button onClick={() => startEdit(task)} size="icon" variant="ghost" className="h-8 w-8">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => deleteTask(task.id)}
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          )}

          {completedTasks.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Completed ({completedTasks.length})
              </h2>
              <div className="space-y-2">
                {completedTasks.map((task) => (
                  <Card key={task.id} className="bg-muted/50 p-4 opacity-75 transition-all hover:opacity-100">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => toggleComplete(task.id)}
                        className="h-5 w-5"
                      />
                      <span className="flex-1 text-muted-foreground line-through">{task.text}</span>
                      <Button
                        onClick={() => deleteTask(task.id)}
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {tasks.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">No tasks yet. Add one to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
