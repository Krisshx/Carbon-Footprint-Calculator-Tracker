# Carbon Footprint Calculator & Tracker

## 🌱 Project Overview

A comprehensive web application designed to help individuals and small businesses track and reduce their carbon footprint through AI-powered personalized recommendations.

## 🎯 Features

### 1. **User Authentication**
- Secure registration and login system
- JWT-based authentication
- User profile management

### 2. **Activity Logging**
- Log daily activities (transportation, energy, diet, consumption)
- Support for multiple input methods
- Edit and delete past entries
- Date-based organization

### 3. **Carbon Emission Calculator**
- Accurate emissions calculation using standard formulas
- Activity categorization (transportation, energy, diet, consumption)
- Real-time emission tracking

### 4. **Visual Dashboard**
- Daily, weekly, and monthly emission summaries
- Emissions breakdown by category with progress bars
- Recent activities feed
- Responsive design for mobile and desktop

### 5. **AI-Powered Recommendations**
- Personalized tips based on user's emission patterns
- Impact categorization (High, Medium, Low)
- Actionable suggestions for reducing carbon footprint
- Fallback recommendations when API is unavailable

## 🏗️ Project Structure

```
Assignment_1/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Activity.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── activities.js
│   │   ├── recommendations.js
│   │   └── analytics.js
│   ├── middleware/
│   │   └── auth.js
│   ├── utils/
│   │   ├── carbonCalculator.js
│   │   └── aiRecommendations.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── MainApp.jsx
│   │   ├── components/
│   │   │   ├── AddActivity.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Recommendations.jsx
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── styles/
│   │   │   ├── Auth.css
│   │   │   ├── MainApp.css
│   │   │   ├── AddActivity.css
│   │   │   ├── Dashboard.css
│   │   │   ├── Recommendations.css
│   │   │   ├── App.css
│   │   │   └── index.css
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create or update `.env` file with your configuration:
```
MONGODB_URI=mongodb://localhost:27017/carbon-footprint
JWT_SECRET=your_jwt_secret_key_here
OPENAI_API_KEY=your_openai_api_key_here (optional)
PORT=5000
NODE_ENV=development
```

4. Start the backend server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will open at `http://localhost:3000`

## 📊 Carbon Emission Formulas

The application uses the following formulas to calculate emissions:

### Transportation
- Car (petrol): Distance (km) × 0.12 kg CO₂
- Car (diesel): Distance (km) × 0.10 kg CO₂
- Car (electric): Distance (km) × 0.05 kg CO₂
- Bus: Distance (km) × 0.05 kg CO₂
- Train: Distance (km) × 0.03 kg CO₂
- Flight (short-haul): Distance (km) × 0.255 kg CO₂
- Flight (long-haul): Distance (km) × 0.190 kg CO₂

### Energy
- Electricity: kWh × 0.5 kg CO₂
- Natural gas: Therms × 5.3 kg CO₂
- Heating oil: Gallons × 10.2 kg CO₂

### Diet
- Beef meal: 6.0 kg CO₂ per meal
- Pork meal: 2.5 kg CO₂ per meal
- Chicken meal: 1.8 kg CO₂ per meal
- Fish meal: 1.5 kg CO₂ per meal
- Vegetarian meal: 1.5 kg CO₂ per meal
- Vegan meal: 0.5 kg CO₂ per meal

### Consumption
- Shopping: Amount × 0.02 kg CO₂
- Waste: kg × 0.5 kg CO₂
- Water: Liters × 0.0003 kg CO₂

## 🤖 AI Integration

The application supports OpenAI API for generating personalized recommendations. If the API key is not configured, the application falls back to pre-defined recommendations.

To enable AI recommendations:
1. Get an API key from [OpenAI](https://platform.openai.com/)
2. Add it to your `.env` file as `OPENAI_API_KEY`

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Activities
- `POST /api/activities` - Add new activity
- `GET /api/activities` - Get all user activities
- `GET /api/activities/range/:startDate/:endDate` - Get activities in date range
- `PUT /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity

### Analytics
- `GET /api/analytics/summary` - Get emission summary
- `GET /api/analytics/daily/:days` - Get daily analytics

### Recommendations
- `GET /api/recommendations` - Get AI-powered recommendations

## 🎨 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop (1920px and above)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## 🔐 Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Protected API routes
- Secure environment variable management

## 📈 Technical Stack

**Frontend:**
- React 18.2
- React Router DOM
- Axios (HTTP client)
- CSS3 with Flexbox and Grid

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- OpenAI API integration

## 🧪 Testing the Application

1. Register a new account
2. Log in with your credentials
3. Add various activities (transportation, energy, diet, consumption)
4. View your emissions on the dashboard
5. Check personalized recommendations
6. Track your progress over time

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

## 📄 License

This project is open source and available under the MIT License.

## 📞 Support

For issues or questions, please open an issue on GitHub or contact the development team.

---

**Happy carbon tracking! 🌍**
