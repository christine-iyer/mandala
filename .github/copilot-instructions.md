# Mandala Generator Project

## Project Overview
A React application using Vite that generates interactive, customizable mandalas with user controls.

## Features
- **Pattern Types**: Circles, Petals, Stars, Diamonds, Waves
- **Customizable Parameters**:
  - Number of layers (1-20)
  - Repeats per layer (3-24)
  - Canvas size (300-800px)
  - Color schemes (Rainbow, Ocean, Fire, Purple, Monochrome)
  - Rotation speed (0-5, 0 = static)

## Project Structure
- `src/components/Mandala.jsx` - Canvas-based mandala renderer with animation
- `src/components/Controls.jsx` - User input controls
- `src/components/Controls.css` - Styling for controls
- `src/App.jsx` - Main application component
- `src/App.css` - Application layout and styling

## Running the Project
The dev server is running at http://localhost:5173/

To start the dev server manually:
```bash
npm run dev
```

To build for production:
```bash
npm run build
```

## Progress
- [x] Created copilot-instructions.md file
- [x] Retrieved project setup information
- [x] Scaffolded Vite React project
- [x] Installed dependencies
- [x] Created Mandala component
- [x] Created Controls component
- [x] Integrated components
- [x] Added styling
- [x] Tested compilation
- [x] Created and ran dev task
