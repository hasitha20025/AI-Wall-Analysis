# 🧱 AI Wall Damage Analysis & Cost Estimation

An intelligent web application that uses AI-powered computer vision to detect wall damage and provide accurate cost estimations for repairs. Built with Next.js and powered by advanced machine learning models.

![AI Wall Analysis](https://img.shields.io/badge/AI-Powered-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Features

### 🤖 AI-Powered Damage Detection
- **Advanced Computer Vision**: Automatically detects multiple types of wall damage
- **Real-time Analysis**: Instant damage detection upon image upload
- **High Accuracy**: Trained on extensive datasets for reliable results
- **Multiple Damage Types**: Detects cracks, water damage, flaking paint, and missing pieces

### 💰 Smart Cost Estimation
- **Dynamic Pricing**: Calculates repair costs based on current material prices
- **Customizable Rates**: Adjust material and labor costs through settings
- **Detailed Breakdown**: Shows cost per damage type and total estimation
- **Real-time Updates**: Cost calculations update when material prices change

### 🎯 Professional Features
- **AI Guidelines Generation**: Get prevention tips using Google Gemini AI
- **Maintenance Scheduling**: Receive AI-generated maintenance schedules
- **Specific Advice**: Get tailored repair recommendations for each damage type
- **Export Capabilities**: Download analysis results as JSON

### 📱 Modern User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Intuitive Interface**: Clean, professional UI with guided workflows
- **Real-time Feedback**: Instant visual feedback and progress indicators
- **Accessibility**: Built with accessibility best practices

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **AI/ML**: InferenceJS, Computer Vision models
- **AI Services**: Google Gemini API for intelligent recommendations
- **State Management**: React Hooks, Custom hooks for AI analysis
- **UI Components**: Custom shadcn/ui components
- **Styling**: CSS Variables, Modern gradient designs
- **Storage**: localStorage for settings persistence

## 📋 Prerequisites

- Node.js 18.x or later
- npm, yarn, pnpm, or bun
- Environment variables for AI services

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ai-wall-analysis.git
cd ai-wall-analysis
```

### 2. Install Dependencies
```bash
npm install

```

### 3. Environment Setup
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_INFERENCE_API_KEY=your_inference_api_key
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Run Development Server
```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📸 Usage Guide

### Photo Guidelines for Best Results
- **Image Resolution**: 1512×2688 pixels recommended
- **Distance**: Take photos from 1.5 meters (5 feet) away from the wall
- **Lighting**: Ensure good lighting and avoid shadows
- **Focus**: Keep camera steady and wall in focus
- **File Format**: Supports JPG, PNG, WebP (max 15MB)

### Analysis Workflow
1. **Upload Image**: Select or drag & drop wall image
2. **AI Analysis**: Automatic damage detection begins
3. **View Results**: Review detected damage with bounding boxes
4. **Cost Estimation**: See repair costs and material breakdown
5. **AI Recommendations**: Generate prevention guidelines and advice
6. **Export Data**: Download results for record keeping

## ⚙️ Settings & Configuration

### Material Cost Settings
Configure pricing for accurate cost estimations:
- **Cement**: 50KG bag price (LKR)
- **Sand**: 100 cubic feet price (LKR)
- **Water**: Per liter price (LKR)
- **Putty**: Per kilogram price (LKR)
- **Paint**: Per liter price (LKR)
- **Labor Cost**: Per job pricing (LKR)

Settings are automatically saved and persist across sessions.

## 🧠 AI Models & Detection

### Supported Damage Types
1. **Crack Damage**: Structural cracks in walls
2. **Water Damage**: Moisture-related deterioration
3. **Flaking Paint**: Paint peeling and surface issues
4. **Missing Pieces**: Holes or missing wall sections

### Cost Calculation Method
Our cost estimation uses realistic construction-based calculations:

#### Material Consumption Per Square Meter:
- **Crack Repair**: 2.5kg cement, 0.8 cft sand, 8L water, 0.5kg putty, 0.12L paint + 80% labor
- **Flaking Paint**: 0.8kg putty, 0.20L paint + 50% labor
- **Water Damage**: 3.0kg cement, 1.2 cft sand, 12L water, 0.8kg putty, 0.20L paint + 100% labor  
- **Missing Pieces**: 5.0kg cement, 1.8 cft sand, 18L water, 0.8kg putty, 0.20L paint + 150% labor

#### Calculation Logic:
- Material costs are calculated based on actual consumption rates
- Labor multipliers reflect work complexity (0.5x to 1.5x daily rate)
- Prices automatically update when settings are changed

## ✅ Improved Cost Calculation Method

I've significantly improved your cost calculation method! Here's what's better now:

### 🔧 What Was Wrong Before:
- **Arbitrary multipliers**: Values like 0.2, 0.04 had no real-world basis
- **Unrealistic consumption**: Didn't reflect actual construction material usage
- **Same labor cost**: All damage types had identical labor requirements

### 🎯 New Realistic Approach:

#### 1. Material Consumption Based on Reality:
- **Cement**: Calculated per 50kg bag (industry standard)
- **Sand**: Calculated per 100 cubic feet (standard measurement)
- **Realistic quantities**: Based on actual construction practices

#### 2. Damage-Specific Requirements:
- **Crack Damage**: Light repair work (2.5kg cement/m²)
- **Water Damage**: Medium repair work (3.0kg cement/m²)
- **Missing Pieces**: Heavy structural work (5.0kg cement/m²)
- **Flaking Paint**: Surface work only (no cement/sand needed)

#### 3. Smart Labor Pricing:
- **Flaking Paint**: 50% of daily rate (quick work)
- **Crack Repair**: 80% of daily rate (moderate complexity)
- **Water Damage**: 100% of daily rate (standard work)
- **Missing Pieces**: 150% of daily rate (complex structural work)

### 📊 Benefits of New Method:
- **More Accurate**: Based on real construction practices
- **Scalable**: Easy to adjust consumption rates as needed
- **Professional**: Matches industry standards
- **Transparent**: Clear reasoning behind each calculation
- **Flexible**: Different complexity levels for different damage types

The new calculation method provides much more realistic cost estimates that construction professionals would recognize and trust!

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui base components
│   │   ├── header.js       # Application header
│   │   ├── footer.js       # Application footer
│   │   ├── material-form.js # Image upload form
│   │   ├── settings-dialog.js # Settings configuration
│   │   └── ...
│   ├── hooks/              # Custom React hooks
│   │   └── useAIAnalysis.js # AI analysis logic
│   ├── globals.css         # Global styles
│   ├── layout.js          # Root layout
│   └── page.js            # Main page
├── lib/
│   ├── api.js             # API utilities
│   ├── geminiService.js   # Google Gemini integration
│   └── utils.js           # Utility functions
└── public/                # Static assets
    ├── images/            # Sample damage images
    └── logo.png           # Application logo
```

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Key Components
- **useAIAnalysis**: Main hook for AI analysis logic
- **MaterialForm**: Image upload and submission
- **SettingsDialog**: Material cost configuration
- **ImageAnalysisCanvas**: Visual damage display
- **DetectionResults**: Analysis results display

## 🌟 Features in Detail

### Automatic Analysis
- Images are automatically analyzed upon upload when the AI model is ready
- Real-time progress indicators show analysis status
- Error handling for various failure scenarios

### Dynamic Cost Calculations
- Costs update automatically when material prices change
- Pixel-to-area conversion for accurate measurements
- Comprehensive cost breakdown by damage type

### AI-Powered Recommendations
- Google Gemini AI integration for intelligent advice
- Prevention guidelines based on detected damage
- Maintenance scheduling recommendations
- Specific repair advice for each damage type

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -am 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the excellent framework
- InferenceJS for AI model integration
- Google Gemini for intelligent recommendations
- shadcn/ui for beautiful component designs

## 📞 Support

For support, email support@wallanalyzer.com or open an issue on GitHub.

---

**Built with ❤️ using Next.js and AI technology**
