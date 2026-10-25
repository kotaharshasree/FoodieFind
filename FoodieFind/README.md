# 🍲 FoodieFind — Smart Recipe Finder & Food Discovery Platform

> **"Your ingredients. Your cravings. Your next delicious discovery."**

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-orange.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Build-Vite-blueviolet.svg)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2F%20Express-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20%2F%20Mongoose-brightgreen.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/Lab-FSD%20Project-yellow.svg)]()

FoodieFind is a modern, responsive, and visually stunning Full Stack MERN web application built as a college **Full Stack Development (FSD)** lab project. It solves the everyday kitchen dilemma: *"What can I cook with what I already have in my fridge?"*

Users can enter or select available ingredients to discover matching recipes with dynamically calculated match percentages, view available and missing ingredients, adjust serving sizes on the fly, cook distraction-free in focused step-by-step cooking mode with a built-in cooking timer, save favorites locally, and perform full CRUD operations on recipes without needing any login or registration.

---

## 🌟 Key Features

### 1. 🍳 Smart Ingredient-Based Recipe Matcher
- **Pantry Search**: Add ingredients by typing or clicking popular staple chips (e.g., *Tomato*, *Potato*, *Paneer*, *Cheese*, *Chicken*, *Rice*).
- **Dynamic Matching Algorithm**: Calculates the exact match percentage `(availableCount / totalRecipeIngredients) * 100` on the fly.
- **Missing Ingredients List**: Highlights which ingredients you have and explicitly lists what you are missing (`You need: Cucumber...`).
- **Dynamic Sorter**: Sort results by **Best Match**, **Quickest Recipe**, or **Alphabetical Order**.

### 2. 📖 Rich Recipe Details & Dynamic Serving Scaler
- **High-Definition Photography**: Curated food photography with fallback placeholders.
- **Dynamic Servings Adjustment**: Scaler (`+` / `-`) that recalculates ingredient quantities in real time (e.g., doubling a recipe from 2 to 4 servings scales `250g` to `500g`, `2 cups` to `4 cups`, etc.).
- **Interactive Mise-en-place Checklist**: Click ingredients to mark them as prepped before cooking.

### 3. 👨‍🍳 Focused "Start Cooking" Mode
- Distraction-free full-screen overlay for hands-on kitchen use.
- Large, high-visibility step-by-step cooking instructions.
- Step progress bar, `Step X of Y` counter, and previous/next controls with keyboard shortcut support (Left/Right arrow keys).
- Festive confetti celebration animation upon completing the final step!

### 4. ⏱️ Interactive Kitchen Cooking Timer
- Built-in timer with presets (+1m, +3m, +5m, +10m) and manual duration inputs.
- Circular animated countdown ring with pause and reset controls.
- Audio bell chime generated via the browser Web Audio API (zero external audio file dependencies) plus toast alerts.

### 5. ❤️ Persistent Favorites (No Login Required)
- Toggle favorite recipes with an animated heart button.
- Synced reactively to browser `localStorage` across tabs and sessions.
- Dedicated Favorites page with instant search and filtering.

### 6. ✍️ Add & Edit Custom Recipes (Full CRUD)
- Clean, intuitive modal form with dynamic ingredient and instruction step rows.
- 8 one-click curated food photo presets so users don't need to find image links.
- Form validation and instant updates to the database.
- Edit and Delete features with confirmation safeguards.

### 7. 🎲 "Surprise Me!" & Recipe of the Day
- **Surprise Me! 🎲**: Animated dice roll modal that picks a random recipe and triggers celebration confetti.
- **Recipe of the Day**: Spotlight dish calculated deterministically from the calendar date (`dayOfYear % recipes.length`).
- **Quick & Easy Showcase**: Highlights recipes ready in 20 minutes or less.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | ReactJS (v18) + Vite | Fast component-based UI and blazing fast hot-reload |
| **Styling & Theme** | CSS3 + Tailwind Utility Classes | Custom warm food palette (`#F97316`, `#FFF8F0`, `#FFE5D0`) |
| **Icons & Micro-animations** | Lucide React & Framer Motion | Fluid card lifts, layout transitions, and icon badges |
| **State & Storage** | React Hooks (`useState`, `useEffect`, `useMemo`) + `localStorage` | Zero-login persistence and reactive state updates |
| **Notifications** | React Hot Toast | Elegant toast feedback for user actions |
| **HTTP Client** | Axios | REST API communication with backend |
| **Backend Runtime** | Node.js + Express.js | Robust RESTful APIs and middleware |
| **Database & ODM** | MongoDB + Mongoose | Schema modeling, timestamps, and indexes |
| **Zero-Config Fallback** | `mongodb-memory-server` | Automatic in-memory database fallback if local `mongod` is stopped |

---

## 📁 Project Structure

```
FoodieFind/
├── client/                             # ReactJS + Vite Frontend
│   ├── public/                         # Public assets & icons
│   ├── src/
│   │   ├── components/                 # Modular, reusable UI components
│   │   │   ├── Navbar.jsx              # Sticky navigation with mobile menu
│   │   │   ├── HeroSection.jsx         # Animated hero with ingredient search & floating badges
│   │   │   ├── CategoryFilter.jsx      # Food category selector (Breakfast, Lunch, Dinner, etc.)
│   │   │   ├── KitchenMatcher.jsx      # "What's in Your Kitchen?" ingredient chip engine
│   │   │   ├── RecipeCard.jsx          # Food card with hover zoom, match %, favorite heart
│   │   │   ├── RecipeDetailModal.jsx   # Recipe view modal with dynamic serving scaler
│   │   │   ├── CookingModeModal.jsx    # Step-by-step focused cooking mode with progress bar
│   │   │   ├── CookingTimer.jsx        # Circular countdown timer with audio chime
│   │   │   ├── RecipeFormModal.jsx     # Add & Edit recipe modal with dynamic rows
│   │   │   ├── SurpriseMeModal.jsx     # Random recipe picker with dice rolling animation
│   │   │   ├── RecipeOfTheDay.jsx      # Spotlight recipe changing daily
│   │   │   ├── EmptyState.jsx          # Friendly empty states with clear CTAs
│   │   │   └── Footer.jsx              # Footer with links and 1-click reseed button
│   │   ├── pages/
│   │   │   ├── HomePage.jsx            # Landing page with all interactive sections
│   │   │   ├── ExplorePage.jsx         # Full search, multi-parameter filter, and sorting
│   │   │   ├── KitchenPage.jsx         # Dedicated ingredient matching page
│   │   │   └── FavoritesPage.jsx       # Saved favorite recipes collection
│   │   ├── hooks/
│   │   │   └── useFavorites.js         # Reactive localStorage hook for favorites
│   │   ├── services/
│   │   │   └── api.js                  # Axios client for backend endpoints
│   │   ├── utils/
│   │   │   ├── ingredientMatcher.js    # Smart fuzzy matching and match % calculation
│   │   │   └── servingScaler.js        # Dynamic ingredient quantity scaling
│   │   ├── data/
│   │   │   └── sampleIngredients.js    # Staple ingredients & preset food photography
│   │   ├── App.jsx                     # Router, global modal controllers, and toast provider
│   │   ├── main.jsx                    # React root entry
│   │   └── index.css                   # Custom food theme tokens & animations
│   ├── index.html                      # HTML document with Google Fonts & Tailwind CDN
│   ├── vite.config.js                  # Vite configuration with API proxy
│   └── package.json
│
├── server/                             # Node.js + Express.js Backend
│   ├── config/
│   │   └── db.js                       # Mongoose connection with zero-setup memory fallback
│   ├── models/
│   │   └── Recipe.js                   # Mongoose Recipe schema with validation & indexes
│   ├── controllers/
│   │   └── recipeController.js         # CRUD controllers, search, and seed endpoints
│   ├── routes/
│   │   └── recipeRoutes.js             # Express routes: /api/recipes
│   ├── seed/
│   │   ├── recipesData.js              # 22+ realistic sample recipes (Indian & Continental)
│   │   └── seedDatabase.js             # Standalone CLI seeding script
│   ├── server.js                       # Express app entry, middleware, error handler
│   ├── .env.example                    # Sample environment variables
│   ├── .env                            # Active environment configuration
│   └── package.json
│
├── .gitignore
├── package.json                        # Root package.json with concurrent start scripts
└── README.md                           # Documentation and Lab Viva Guide
```

---

## ⚡ Quick Start & Installation

### Prerequisites
- **Node.js** (v18 or higher recommended; verified on Node v24)
- **npm** (v9 or higher)

### 1. Clone or Open the Workspace in VS Code
Open the `FoodieFind` directory in VS Code:
```bash
code FoodieFind
```

### 2. Install Dependencies
You can install dependencies for root, server, and client with one command:
```bash
npm run install:all
```
*(Or manually run `npm install` inside both `server` and `client` directories).*

### 3. Run the Application
From the root `FoodieFind` directory, run:
```bash
npm run dev
```
This runs both the backend server (port `5000`) and the Vite frontend (port `5173`) concurrently!

- **Frontend URL**: `http://localhost:5173`
- **Backend API URL**: `http://localhost:5000/api/recipes`

---

## 🗄️ MongoDB Configuration & Zero-Config Demo Mode

FoodieFind is engineered to be **100% resilient for college lab demonstrations and vivas**:

1. **Local MongoDB**: If MongoDB is installed and running locally, it connects to:
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/foodiefind
   ```
2. **MongoDB Atlas (Cloud)**: If you have a MongoDB Atlas cloud cluster, paste your connection string into `server/.env`:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/foodiefind?retryWrites=true&w=majority
   ```
3. **✨ Automatic Zero-Config In-Memory Fallback**:
   If local MongoDB is not installed or the service is stopped, FoodieFind **automatically spins up an embedded in-memory MongoDB instance** (`mongodb-memory-server`) and pre-seeds the 22+ sample recipes in seconds!
   > **Result**: The application will NEVER crash during a viva or presentation due to missing database daemons!

---

## 📡 REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/recipes` | Fetch recipes with optional query params (`search`, `category`, `isVegetarian`, `maxTime`, `difficulty`, `sort`) |
| `GET` | `/api/recipes/:id` | Fetch details of a single recipe by its MongoDB ObjectId |
| `POST` | `/api/recipes` | Create a new recipe (with ingredients array, instructions array, prep/cook times) |
| `PUT` | `/api/recipes/:id` | Update an existing recipe by ID |
| `DELETE` | `/api/recipes/:id` | Delete a recipe from the database |
| `POST` | `/api/recipes/seed` | Reset and reseed database with the 22+ realistic sample recipes |

---

## 🎓 College FSD Lab Viva & Demonstration Guide

Here are standard questions examiners ask during Full Stack Development lab evaluations and how FoodieFind demonstrates them:

### Q1: What is the MERN stack and how does data flow in FoodieFind?
**Answer**:
- **MongoDB**: NoSQL database that stores recipes as JSON-like documents via Mongoose schemas.
- **Express.js**: Node.js web application framework that exposes RESTful endpoints (`/api/recipes`).
- **ReactJS**: Client-side single-page application (SPA) that renders components, captures user input, and manages UI state.
- **Node.js**: Asynchronous JavaScript runtime executing the backend server.
- **Data Flow**: When a user adds an ingredient in the UI, React updates local state and filters or sends HTTP requests via Axios to Express routes. Express controllers validate the input, interact with Mongoose models, and return JSON responses back to the React UI.

### Q2: How does the ingredient-matching algorithm work?
**Answer**:
- Implemented in `client/src/utils/ingredientMatcher.js`.
- It performs normalization (lowercasing, trimming common cooking descriptors like *boiled*, *chopped*, and stripping plurals like *tomatoes* -> *tomato*).
- For each recipe, it compares the user's selected ingredient list against the recipe's ingredient list.
- Calculates `matchPercentage = Math.round((availableIngredients / totalIngredients) * 100)`.
- Categorizes ingredients into `availableIngredients` and `missingIngredients` so the user knows exactly what they already have and what they still need.

### Q3: How do you handle favorites without requiring authentication?
**Answer**:
- Implemented using a custom React hook `useFavorites` in `client/src/hooks/useFavorites.js`.
- Stores an array of favorited recipe `_id` strings in browser `localStorage`.
- Listens to both `storage` events and custom `foodiefind_favs_updated` window events so that adding or removing a favorite immediately synchronizes across all components and pages without requiring a page reload.

### Q4: How is dynamic serving scaling calculated?
**Answer**:
- In `client/src/utils/servingScaler.js`, the function `scaleQuantity` calculates:
  $$\text{scaledQuantity} = \frac{\text{originalQuantity}}{\text{originalServings}} \times \text{targetServings}$$
- It automatically formats whole numbers and common culinary fractions (e.g., $0.5 \to \frac{1}{2}$, $1.5 \to 1\frac{1}{2}$, $0.25 \to \frac{1}{4}$).

### Q5: What React hooks are utilized in this project?
- `useState`: For local component state (search queries, form inputs, active category, modal open/close states).
- `useEffect`: For lifecycle actions (fetching recipes on mount, listening to keyboard arrows in Cooking Mode, running the countdown timer interval).
- `useMemo`: For performance optimization when computing filtered and sorted recipe arrays without recalculating on unrelated re-renders.
- `useCallback`: For memoizing event handler functions in custom hooks.
- `useRef`: For keeping a stable reference to the timer's `setInterval` handle across re-renders.

---

## 🔮 Future Enhancements
- Nutritional breakdown & calorie counter (protein, carbs, fats).
- Grocery shopping list export (PDF / WhatsApp sharing).
- Voice-assisted step navigation in Cooking Mode ("Next step", "Repeat").
- Offline PWA (Progressive Web App) caching.

---

## 👨‍💻 Author & Acknowledgements
Built for the **Full Stack Development (FSD) Lab Exam & Evaluation**.
Designed with passion for great food, clean code, and delightful user experiences.
