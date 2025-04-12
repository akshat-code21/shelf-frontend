# BookSwap

BookSwap is a platform that allows users to share and exchange books with other members of the community. The application enables book owners to list their books and seekers to browse and request books from the available collection.

## Features

- **User Authentication**: Secure login and signup functionality
- **Role-Based Access**: Different interfaces for book owners and book seekers
- **Book Listing**: Owners can add books to the platform
- **Book Discovery**: Users can browse available books
- **Book Exchange**: Simple and secure book exchange process
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**:
  - Next.js 15.3.0
  - React 19.0.0
  - TypeScript
  - Tailwind CSS
  - Framer Motion for animations
  - Axios for API requests

## Getting Started

### Prerequisites

- Node.js
- npm or Bun

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd shelf-frontend
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   bun install
   ```

3. Set up environment variables
   Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000
   NEXT_PUBLIC_BACKEND_URL = <your-backend-url>
   ```

4. Run the development server
   ```bash
   npm run dev
   # or
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Project Structure

- `src/app`: Contains the main pages and routing configuration
- `src/components`: Reusable UI components
- `src/components/ui`: UI library components
- `src/lib`: Utility functions and helpers

## Available Scripts

- `npm run dev`: Runs the development server
- `npm run build`: Builds the application for production
- `npm run start`: Starts the production server
- `npm run lint`: Runs linting checks

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
