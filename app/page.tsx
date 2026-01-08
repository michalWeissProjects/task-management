"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Pencil, Trash2, Plus, Calendar, CheckCheck } from "lucide-react"

interface Task {
  id: number
  text: string
  completed: boolean
  createdAt: Date
}

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState("")
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false, createdAt: new Date() }])
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

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed))
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - new Date(date).getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days === 0) return "Today"
    if (days === 1) return "Yesterday"
    if (days < 7) return `${days} days ago`
    return new Date(date).toLocaleDateString()
  }

  const filteredTasks = () => {
    if (filter === "active") return tasks.filter((task) => !task.completed)
    if (filter === "completed") return tasks.filter((task) => task.completed)
    return tasks
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-foreground md:text-5xl">Task Manager</h1>
          <p className="text-muted-foreground">Organize your work and get things done</p>
          <div className="mt-4 flex items-center justify-center gap-4 text-sm">
            <span className="text-muted-foreground">
              Total: <strong className="text-foreground">{tasks.length}</strong>
            </span>
            <span className="text-muted-foreground">
              Active: <strong className="text-foreground">{tasks.filter((task) => !task.completed).length}</strong>
            </span>
            <span className="text-muted-foreground">
              Completed: <strong className="text-foreground">{tasks.filter((task) => task.completed).length}</strong>
            </span>
          </div>
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

        <div className="mb-4 flex items-center justify-between">
          <div className="flex gap-2">
            <Button onClick={() => setFilter("all")} variant={filter === "all" ? "default" : "outline"} size="sm">
              All
            </Button>
            <Button onClick={() => setFilter("active")} variant={filter === "active" ? "default" : "outline"} size="sm">
              Active
            </Button>
            <Button
              onClick={() => setFilter("completed")}
              variant={filter === "completed" ? "default" : "outline"}
              size="sm"
            >
              Completed
            </Button>
          </div>
          {tasks.filter((task) => task.completed).length > 0 && (
            <Button onClick={clearCompleted} variant="ghost" size="sm" className="gap-2 text-muted-foreground">
              <CheckCheck className="h-4 w-4" />
              Clear Completed
            </Button>
          )}
        </div>

        <div className="space-y-6">
          {filteredTasks().length > 0 ? (
            <div className="space-y-2">
              {filteredTasks().map((task) => (
                <Card
                  key={task.id}
                  className={`p-4 transition-all hover:shadow-md ${
                    task.completed ? "bg-muted/50 opacity-75 hover:opacity-100" : "bg-card"
                  }`}
                >
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
                      <div className="flex-1">
                        <span
                          className={`${task.completed ? "text-muted-foreground line-through" : "text-foreground"}`}
                        >
                          {task.text}
                        </span>
                        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {formatDate(task.createdAt)}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {!task.completed && (
                          <Button onClick={() => startEdit(task)} size="icon" variant="ghost" className="h-8 w-8">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        )}
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
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                {tasks.length === 0 ? "No tasks yet. Add one to get started!" : `No ${filter} tasks`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
