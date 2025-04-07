# BOB - Business Operating Buddy

BOB is a comprehensive business management application designed to streamline operations for small to medium enterprises.

## Project Structure

- `bob-app/`: Next.js application for the web interface
- `src/`: Core business logic and server components
- `prisma/`: Database schema and migrations
- `BOB_Business_Plan.md`: Business plan documentation
- `BOB_Technical_Architecture.md`: Technical architecture overview
- `BOB_User_Guide.md`: User guide and documentation

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/YousefSkandari/bobo.git
   cd bobo
   ```

2. Install dependencies:
   ```
   cd bob-app
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` (if available)
   - Configure your database connection

4. Run database migrations:
   ```
   npx prisma migrate dev
   ```

5. Start the development server:
   ```
   npm run dev
   ```

## Features

- Business operations management
- Customer relationship management
- Inventory tracking
- Financial reporting
- Task management

## License

[MIT License](LICENSE) 