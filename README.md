# FujiWeekly - React Edition

> A modern React web application for browsing [FujiX Weekly](https://fujixweekly.com/) film simulation recipes.

![FujiWeekly Screenshot](./public/images/fujiweekly_screenshoot.png)

## ✨ Features

- 🔍 **Real-time Search**: Search across 394+ film simulation recipes by name, camera model, or simulation type
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Clean, card-based interface with smooth animations
- 📸 **Image Gallery**: View sample photos with full-screen modal support
- ⚙️ **Detailed Settings**: Complete technical parameters for each recipe
- 📷 **Camera Compatibility**: See which Fujifilm cameras support each recipe
- 🏷️ **Color-coded Types**: Visual distinction between Color and B&W recipes

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FujiWeekly
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 🗂️ Project Structure

```
FujiWeekly/
├── public/
│   ├── recipes.json          # Recipe data file
│   ├── logo.png             # Application logo
│   └── images/              # Screenshots and assets
├── src/
│   ├── components/          # React components
│   │   ├── Header.jsx       # Navigation header
│   │   ├── SearchBar.jsx    # Search functionality
│   │   ├── RecipeList.jsx   # Recipe grid layout
│   │   ├── RecipeCard.jsx   # Individual recipe cards
│   │   ├── RecipeDetail.jsx # Detailed recipe view
│   │   └── ImageGallery.jsx # Photo gallery
│   ├── App.jsx              # Main application
│   ├── App.css              # Global styles
│   └── index.css            # Base styles
└── example/                 # Original Java application
```

## 📊 Data Management

### Understanding the Data Structure

The application uses a JSON file (`public/recipes.json`) containing Fujifilm camera film simulation recipes. Each recipe includes:

- **Basic Info**: Recipe name, ID, date, type (Color/B&W)
- **Technical Settings**: Film simulation, dynamic range, highlight/shadow adjustments
- **Camera Compatibility**: List of supported Fujifilm camera models
- **Visual Content**: Feature image and sample photograph URLs
- **External Links**: Original article URL from FujiX Weekly

### 🔄 Updating Recipes Data

> **Important**: The recipes data is sourced from FujiX Weekly and should be updated regularly to include new recipes.

#### Method 1: Automated Update (Recommended)

1. **Download the latest Excel file**

   The original data source is maintained at:
   ```
   https://fxwapp.s3.amazonaws.com/FXW+App+Recipes.xlsx
   ```

2. **Convert Excel to JSON using the Java tool**

   Navigate to the `example` directory and run the Java converter:
   ```bash
   cd example
   mvn compile exec:java -Dexec.mainClass="cn.codezhou.fuji.RecipeCrawler"
   ```

   Or compile and run manually:
   ```bash
   mvn compile
   java -cp target/classes:$(mvn dependency:build-classpath -Dmdep.outputFile=/dev/stdout -q) cn.codezhou.fuji.RecipeCrawler
   ```

3. **Copy the updated JSON file**
   ```bash
   cp example/recipes.json public/recipes.json
   ```

4. **Restart the development server**
   ```bash
   npm run dev
   ```

#### Method 2: Manual Update

1. **Download the Excel file manually**
   - Visit: https://fxwapp.s3.amazonaws.com/FXW+App+Recipes.xlsx
   - Save as `recipes.xlsx`

2. **Convert using online tools or Excel**
   - Use Excel's "Save As" feature to export as CSV
   - Convert CSV to JSON using online converters
   - Ensure the JSON structure matches the existing format

3. **Update the JSON file**
   - Replace `public/recipes.json` with the new data
   - Ensure the structure includes `total`, `data`, and `updateTime` fields

#### Method 3: Node.js Script (Advanced)

Create an automated update script:

```javascript
// update-recipes.js
const https = require('https');
const fs = require('fs');
const XLSX = require('xlsx');

const DOWNLOAD_URL = 'https://fxwapp.s3.amazonaws.com/FXW+App+Recipes.xlsx';

async function updateRecipes() {
  // Download Excel file
  const file = fs.createWriteStream('recipes.xlsx');
  https.get(DOWNLOAD_URL, (response) => {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      convertToJson();
    });
  });
}

function convertToJson() {
  // Convert Excel to JSON
  const workbook = XLSX.readFile('recipes.xlsx');
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(worksheet);

  // Process and save
  const recipes = {
    total: data.length,
    data: data,
    updateTime: Date.now()
  };

  fs.writeFileSync('public/recipes.json', JSON.stringify(recipes, null, 2));
  console.log(`Updated ${data.length} recipes successfully!`);
}

updateRecipes();
```

#### Scheduling Regular Updates

**For Development:**
- Set up a cron job or scheduled task to run the update script weekly
- Use GitHub Actions for automated updates in CI/CD

**For Production:**
- Implement server-side caching with TTL (Time To Live)
- Set up webhook notifications from FujiX Weekly updates
- Use cloud functions for serverless updates

### Data Validation

After updating, verify the data integrity:

1. **Check JSON structure**:
   ```javascript
   {
     "total": 394,
     "data": [...],
     "updateTime": 1694123456789
   }
   ```

2. **Validate recipe fields**:
   - Each recipe should have: `id`, `recipe`, `simulation`, `cameras`, etc.
   - Image URLs should be accessible
   - Camera names should be properly formatted

3. **Test the application**:
   - Search functionality works correctly
   - Recipe details display properly
   - Images load without errors

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

### Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: CSS Modules with responsive design
- **Build Tool**: Vite for fast development and optimized builds
- **Data**: JSON file with 394+ film simulation recipes

### Component Architecture

- **App.jsx**: Main container with state management and routing logic
- **Header.jsx**: Navigation header with back button functionality
- **SearchBar.jsx**: Real-time search with clear functionality
- **RecipeList.jsx**: Grid layout displaying recipe cards
- **RecipeCard.jsx**: Individual recipe preview with metadata
- **RecipeDetail.jsx**: Detailed recipe view with tabbed interface
- **ImageGallery.jsx**: Photo gallery with modal functionality

## 🚀 Deployment to Vercel

> **Vercel is the recommended deployment platform** for this React/Vite application due to its seamless integration, automatic builds, global CDN, and zero-configuration setup.

### ✅ Pre-configured for Vercel

This project includes optimized Vercel configuration:

- **[`vercel.json`](./vercel.json)**: Complete deployment configuration
- **[`.vercelignore`](./vercelignore)**: Optimized file exclusions
- **Enhanced [`vite.config.js`](./vite.config.js)**: Production build optimizations
- **SPA Routing**: Proper rewrites for single-page application
- **Caching Strategy**: Optimized headers for static assets and JSON data

### 🎯 Deployment Methods

#### Method 1: Git Integration (Recommended)

1. **Push to Git repository**
   ```bash
   git add .
   git commit -m "Deploy FujiWeekly to Vercel"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with your Git provider
   - Import your repository
   - Vercel will auto-detect Vite settings

3. **Automatic deployments**
   - Every push to main branch triggers deployment
   - Preview deployments for pull requests
   - Zero configuration required

#### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy the project**
   ```bash
   npm run deploy
   # or manually:
   vercel --prod
   ```

#### Method 3: Manual Upload

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload to Vercel Dashboard**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Drag and drop the `dist` folder
   - Vercel will handle the rest

### ⚙️ Configuration Details

#### Vercel Settings (vercel.json)
- **Framework**: Auto-detected as Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **SPA Rewrites**: All routes redirect to `index.html`
- **Caching**: 
  - Static assets: 1 year cache with immutable flag
  - [`recipes.json`](./public/recipes.json): 1 hour cache with stale-while-revalidate

#### Build Optimizations
- **Vendor Chunking**: React/React-DOM separated for better caching
- **Production Mode**: Optimized bundle size
- **Source Maps**: Disabled for production

### 🔄 Updating Deployed Application

#### For Git-based Deployments
1. Update the [`recipes.json`](./public/recipes.json) file using any method from the Data Management section
2. Commit and push changes
3. Vercel automatically rebuilds and deploys

#### For CLI Deployments
1. Update data locally
2. Run `npm run deploy`
3. New version goes live immediately

### 📊 Production Performance

**Optimized for Speed:**
- Global CDN delivery
- Gzip compression enabled
- Image optimization
- Cache-first strategy for static assets
- Edge network deployment

**Expected Load Times:**
- First visit: ~2-3 seconds
- Subsequent visits: ~0.5-1 second
- JSON data refresh: ~200-500ms

### 🔍 Monitoring & Analytics

Vercel provides built-in analytics:
- **Performance metrics**: Core Web Vitals tracking
- **Usage analytics**: Page views and user engagement
- **Error monitoring**: Runtime error tracking
- **Deployment history**: Easy rollback options

### 🛠️ Custom Domain (Optional)

1. **Add custom domain in Vercel dashboard**
2. **Update DNS records** as instructed by Vercel
3. **SSL certificate** automatically provisioned
4. **CDN optimization** applied globally

### 📋 Deployment Checklist

- ✅ Build succeeds locally (`npm run build`)
- ✅ [`recipes.json`](./public/recipes.json) file is present and valid
- ✅ All images load correctly
- ✅ Search functionality works
- ✅ Responsive design tested
- ✅ Git repository is up to date
- ✅ Vercel configuration files are included

## 📱 Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [FujiX Weekly](https://fujixweekly.com/) for the excellent film simulation recipes
- Original Java application by [codezhou](https://github.com/codezhou)
- Fujifilm community for continuous recipe contributions

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed description
3. Include browser version and steps to reproduce

---

**Happy shooting with your Fujifilm camera! 📸**
