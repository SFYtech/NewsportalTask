# News Portal

# NewsPortal

This project integrates a .NET Core backend with a React frontend.

## Features

- Detailed view of individual articles
- API integration with [NewsData.io](https://newsdata.io)
- Swagger documentation for API endpoints

## Technologies Used

- **Backend:** .NET Core Web API
- **Frontend:** React, TypeScript, CSS
- **API Integration:** NewsData.io
- **Documentation:** Swagger

## Getting Started

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (v18)
- [Git](https://github.com/)

### Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sfytech/newsportal.git
   cd newsportal
   ```

2. **Backend Setup (.NET Core API):**

   ```bash
   cd NewsFullstack.Server
   dotnet restore
   dotnet build
   dotnet run
   ```

   The API will run on `http://localhost:7200` by default.

3. **Frontend Setup (React App):**

   ```bash
   cd newsfullstack.client
   npm install
   npm start
   ```

   The React app will run on `http://localhost:52639` by default.

---

## API Documentation (Swagger)

Swagger is set up to help you explore and test API endpoints directly.

1. **Access Swagger UI:**

   Once the backend is running, navigate to:

   ```
   http://localhost:7200/swagger
   ```

2. **Available Endpoints:**

   - `GET /api/News/headlines` - Fetches the latest news headlines.
   - `GET /api/News/{id}` - Fetches details for a specific news article.

---

## Folder Structure

```
newsportal/
├── backend/
│   ├── Controllers/
│   ├── Program.cs
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── NewsDetails.tsx
│   │   ├── NewsList.tsx
│   │   └── main.tsx
│   ├── public/
│   └── ...
└── README.md
```

## Contributing

Testing Feel free to open issues or submit pull requests.

1. Clone the repository.
3. Make changes as sdk and environment.
4. Pull



## Contact

- **Developer:** Ankit Kumar Mishra
- **Email:** [ankit_mishra4794@live.com]
- **GitHub:** (https://github.com/SFYtech)
