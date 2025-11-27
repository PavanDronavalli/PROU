# Employee Task Tracker

A full-stack web application built with React, Node.js, Express, and MongoDB to help manage employee tasks efficiently. The application provides user authentication, task assignment, tracking, and dashboard analytics.

## Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Employee Management**: Add, view, and manage employee information
- **Task Management**: Create, assign, update, and track tasks
- **Dashboard Analytics**: View task completion statistics and metrics
- **Role-based Access**: Secure API endpoints with authentication middleware

## Tech Stack

### Frontend
- React 19.2.0
- React Router DOM
- Create React App
- CSS for styling

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- Bcrypt for password hashing
- CORS for cross-origin requests

## Installation


### Prerequisites

- Node.js (v14 or higher)
- MongoDB (either locally installed or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd EmployeeTaskTracker/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory and add the following environment variables:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

4. Start the backend server:
```bash
# For development
npm run dev

# For production
npm start
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd EmployeeTaskTracker/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will start on `http://localhost:3000`.

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login (supports guest login)

### Employees
- `GET /api/employees` - Get all employees (authenticated)
- `POST /api/employees` - Create a new employee (authenticated)

### Tasks
- `GET /api/tasks` - Get all tasks for authenticated user (with optional filters)
- `POST /api/tasks` - Create a new task (authenticated)
- `PATCH /api/tasks/:id` - Update task status (authenticated)

### Dashboard
- `GET /api/dashboard/stats` - Get task statistics (authenticated)

## Guest Access

For testing purposes, you can use the following credentials:
- Email: `guest@example.com`
- Password: `guest123`

## Project Structure

```
EmployeeTaskTracker/
├── backend/
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── node_modules/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # React context providers
│   │   ├── App.js          # Main App component
│   │   └── index.js        # Entry point
│   ├── package.json        # Frontend dependencies
│   └── node_modules/
└── README.md               # This file
```

## Environment Variables

### Backend (.env file)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token generation
- `PORT` - Server port (defaults to 5000)

## Scripts

### Frontend
- `npm start` - Start development server
- `npm test` - Run tests
- `npm run build` - Build for production

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with Create React App
- MongoDB for data storage
- Express.js for the web framework