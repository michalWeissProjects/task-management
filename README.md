# Task Management App

A simple, clean task management application built with Next.js and React. Manage your daily tasks with an intuitive interface that allows you to add, edit, delete, and mark tasks as completed.

## Features

- ✅ **Add Tasks** - Quickly add new tasks with a simple input field
- ✏️ **Edit Tasks** - Modify task descriptions inline with save/cancel options
- 🗑️ **Delete Tasks** - Remove tasks you no longer need
- ✔️ **Mark Complete** - Check off completed tasks to stay organized
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 💾 **Local Storage** - Tasks persist in your browser (no backend required)

## Technologies Used

- **Next.js 16** - React framework with App Router
- **React 19** - Latest React features
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Modern icon library

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <https://github.com/michalWeissProjects/task-management.git>
cd task-management-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Usage

- **Add a task**: Type in the input field and click "Add Task" or press Enter
- **Mark as complete**: Click the checkbox next to any task
- **Edit a task**: Click the pencil icon, modify the text, and save
- **Delete a task**: Click the trash icon to remove a task
- **View organization**: Tasks are automatically sorted into "Active" and "Completed" sections

## Build for Production

To create an optimized production build:

```bash
npm run build
npm start
```

## Deployment

The easiest way to deploy this app is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## Project Structure

```
task-management-app/
├── app/
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Main task management page
│   └── globals.css     # Global styles and design tokens
├── components/
│   └── ui/             # UI components (button, input, etc.)
├── public/             # Static assets
└── README.md           # This file
```

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## Support

If you have any questions or need help, please open an issue in the repository.
