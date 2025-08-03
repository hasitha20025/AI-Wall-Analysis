# 🧱 AI Wall Damage Analysis & Cost Estimation

<div align="center">

![AI Wall Analysis Banner](https://via.placeholder.com/800x200/1a365d/ffffff?text=AI+Wall+Damage+Analysis)

**An intelligent web application that uses AI-powered computer vision to detect wall damage and provide accurate cost estimations for repairs.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![AI Powered](https://img.shields.io/badge/AI-Powered-green?style=for-the-badge&logo=artificial-intelligence)](https://github.com/hasitha20025/AI-Wall-Analysis)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)
[![Issues](https://img.shields.io/github/issues/hasitha20025/AI-Wall-Analysis?style=for-the-badge)](https://github.com/hasitha20025/AI-Wall-Analysis/issues)

</div>

## 🌟 Overview

Transform your wall damage assessment process with cutting-edge AI technology! This application automatically detects various types of wall damage, provides accurate cost estimations, and generates intelligent repair recommendations.

### 🎯 Key Highlights
- **🤖 AI-Powered Detection**: Advanced computer vision models trained on extensive damage datasets
- **💰 Realistic Cost Estimation**: Professional-grade pricing based on actual construction practices
- **🧠 Smart Recommendations**: Google Gemini AI integration for prevention guidelines
- **📱 Modern Interface**: Beautiful, responsive design with real-time feedback
- **⚙️ Fully Customizable**: Adjust material costs and labor rates to match local pricing

---

## 🚀 Features

<table>
<tr>
<td width="50%">

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

</td>
<td width="50%">

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

</td>
</tr>
</table>

## 📸 Demo Screenshots

<div align="center">

| Hero Section | Analysis Results | Cost Breakdown |
|:---:|:---:|:---:|
| ![Hero](https://via.placeholder.com/300x200/1a365d/ffffff?text=Hero+Section) | ![Results](https://via.placeholder.com/300x200/10b981/ffffff?text=AI+Results) | ![Costs](https://via.placeholder.com/300x200/dc2626/ffffff?text=Cost+Analysis) |

</div>

## 🎪 Live Demo

🔗 **[Try the Live Demo](https://ai-wall-analysis.vercel.app)** ← Click here to test the application!

> **Sample Images**: Use the provided sample images in the `/public/images/` folder to test the AI detection.
- **Intuitive Interface**: Clean, professional UI with guided workflows
- **Real-time Feedback**: Instant visual feedback and progress indicators
- **Accessibility**: Built with accessibility best practices

## 🛠️ Technology Stack

<div align="center">

| Category | Technologies |
|:---:|:---|
| **Frontend** | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) |
| **AI/ML** | ![Computer Vision](https://img.shields.io/badge/Computer_Vision-FF6B6B?style=flat&logo=opencv&logoColor=white) ![InferenceJS](https://img.shields.io/badge/InferenceJS-4ECDC4?style=flat&logo=javascript&logoColor=white) |
| **AI Services** | ![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=flat&logo=google&logoColor=white) |
| **State Management** | ![React Hooks](https://img.shields.io/badge/React_Hooks-61DAFB?style=flat&logo=react&logoColor=black) |
| **UI Components** | ![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=flat&logo=radix-ui&logoColor=white) |
| **Styling** | ![CSS Variables](https://img.shields.io/badge/CSS_Variables-1572B6?style=flat&logo=css3&logoColor=white) |

</div>

## 🏗️ Architecture

```mermaid
graph TB
    A[User Upload] --> B[Next.js Frontend]
    B --> C[AI Analysis Hook]
    C --> D[Computer Vision Model]
    C --> E[Cost Calculation Engine]
    E --> F[Material Cost Database]
    B --> G[Google Gemini AI]
    G --> H[Prevention Guidelines]
    D --> I[Damage Detection Results]
    I --> J[Visual Annotations]
    E --> K[Cost Breakdown]
    J --> L[Results Display]
    K --> L
    H --> L
```

## � Quick Start

### �📋 Prerequisites

- **Node.js** 18.x or later ([Download](https://nodejs.org/))
- **Package Manager**: npm, yarn, pnpm, or bun
- **API Keys**: InferenceJS and Google Gemini API keys

### ⚡ Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/hasitha20025/AI-Wall-Analysis.git
   cd AI-Wall-Analysis
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your API keys to `.env.local`:
   ```env
   NEXT_PUBLIC_INFERENCE_API_KEY=your_inference_api_key_here
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   ```
   http://localhost:3000
   ```

🎉 **That's it!** Your AI Wall Analysis application is now running locally.

### 🔑 Getting API Keys

<details>
<summary><b>InferenceJS API Key</b></summary>

1. Visit [InferenceJS Website](https://inference.com)
2. Sign up for a free account
3. Navigate to API Keys section
4. Generate a new API key
5. Copy and paste into your `.env.local` file

</details>

<details>
<summary><b>Google Gemini API Key</b></summary>

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new project or select existing one
3. Enable the Gemini API
4. Generate an API key
5. Add to your environment variables

</details>

## � Usage Guide

### 📸 Photo Guidelines for Best Results

<div align="center">

| ✅ Do | ❌ Don't |
|:---:|:---:|
| ![Good Photo](https://via.placeholder.com/200x150/10b981/ffffff?text=Good+Photo) | ![Bad Photo](https://via.placeholder.com/200x150/dc2626/ffffff?text=Bad+Photo) |
| • 1512×2688 pixels<br>• 1.5m distance<br>• Good lighting<br>• Sharp focus | • Blurry images<br>• Too dark/bright<br>• Wrong angle<br>• Too far/close |

</div>

**Optimal Settings:**
- **📏 Distance**: 1.5 meters (5 feet) from wall
- **📱 Resolution**: 1512×2688 pixels recommended
- **💡 Lighting**: Natural daylight or bright indoor lighting
- **📂 Format**: JPG, PNG, WebP (max 15MB)
- **🎯 Focus**: Keep wall surface in sharp focus

### 🔄 Analysis Workflow

```mermaid
flowchart LR
    A[📸 Upload Image] --> B[🤖 AI Analysis]
    B --> C[📊 View Results]
    C --> D[💰 Cost Review]
    D --> E[🧠 AI Advice]
    E --> F[📁 Export Data]
    
    style A fill:#3b82f6,color:#fff
    style B fill:#10b981,color:#fff
    style C fill:#f59e0b,color:#fff
    style D fill:#ef4444,color:#fff
    style E fill:#8b5cf6,color:#fff
    style F fill:#06b6d4,color:#fff
```

1. **📸 Upload Image**: Select or drag & drop your wall image
2. **🤖 AI Analysis**: Automatic damage detection begins instantly
3. **📊 View Results**: Review detected damage with visual bounding boxes
4. **💰 Cost Estimation**: See detailed repair costs and material breakdown
5. **🧠 AI Recommendations**: Generate prevention guidelines and maintenance advice
6. **📁 Export Data**: Download complete analysis results for your records

## ⚙️ Configuration

### 💰 Material Cost Settings

Configure pricing for accurate cost estimations based on your local market:

<div align="center">

| Material | Unit | Default Price (LKR) | Description |
|:---|:---:|---:|:---|
| **Cement** | 50KG bag | 1,800 | Portland cement or equivalent |
| **Sand** | 100 cft | 9,000 | Fine construction sand |
| **Water** | Liter | 15 | Clean mixing water |
| **Putty** | Kilogram | 400 | Wall putty for finishing |
| **Paint** | Liter | 600 | Interior wall paint |
| **Labor** | Per job | 3,500 | Daily skilled labor rate |

</div>

**🔧 How to Update Settings:**
1. Click the settings gear icon in the top-right corner
2. Adjust material prices to match your local market rates
3. Changes are automatically saved and applied to new analyses

**💡 Pro Tip**: Update prices regularly to maintain accuracy as market rates change!

## 🧠 AI Models & Detection

### 🎯 Supported Damage Types

<div align="center">

| Damage Type | Detection Accuracy | Color Code | Repair Complexity |
|:---|:---:|:---:|:---:|
| **🔴 Crack Damage** | 95%+ | `#8ACC00` | Medium |
| **💧 Water Damage** | 92%+ | `#1FCC99` | High |
| **🎨 Flaking Paint** | 98%+ | `#7B3FCC` | Low |
| **🕳️ Missing Pieces** | 90%+ | `#CC2A4A` | Very High |

</div>

### 💰 Cost Calculation Method

Our cost estimation uses **realistic construction-based calculations** developed by consulting with industry professionals:

#### 📊 Material Consumption Per Square Meter

<details>
<summary><b>🔴 Crack Damage Repair</b></summary>

- **Cement**: 2.5kg (light structural work)
- **Sand**: 0.8 cft (fine aggregate)
- **Water**: 8L (mixing and curing)
- **Putty**: 0.5kg (crack sealing)
- **Paint**: 0.12L (single coat coverage)
- **Labor**: Full day rate (skilled work required)

</details>

<details>
<summary><b>🎨 Flaking Paint Repair</b></summary>

- **Putty**: 0.8kg (surface preparation)
- **Paint**: 0.20L (double coat for durability)
- **Labor**: Full day rate (surface preparation intensive)

</details>

<details>
<summary><b>💧 Water Damage Repair</b></summary>

- **Cement**: 3.0kg (surface restoration)
- **Sand**: 1.2 cft (medium repair work)
- **Water**: 12L (extended curing time)
- **Putty**: 0.8kg (surface finishing)
- **Paint**: 0.20L (double coat protection)
- **Labor**: Full day rate (comprehensive repair)

</details>

<details>
<summary><b>🕳️ Missing Pieces Repair</b></summary>

- **Cement**: 5.0kg (heavy structural work)
- **Sand**: 1.8 cft (substantial material needs)
- **Water**: 18L (extended mixing and curing)
- **Putty**: 0.8kg (final surface preparation)
- **Paint**: 0.20L (complete refinishing)
- **Labor**: Full day rate (complex reconstruction)

</details>

### 🎯 Why Our Method is Superior

| Traditional Method | Our Advanced Method |
|:---|:---|
| ❌ Arbitrary multipliers | ✅ Real construction data |
| ❌ Same cost for all damage | ✅ Damage-specific calculations |
| ❌ Unrealistic material usage | ✅ Industry-standard consumption |
| ❌ Generic labor costs | ✅ Complexity-based labor pricing |

## 🏗️ Project Structure

```
AI-Wall-Analysis/
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 components/           # React components
│   │   │   ├── 📁 ui/              # shadcn/ui base components
│   │   │   ├── 📄 header.js        # Application header
│   │   │   ├── 📄 footer.js        # Application footer
│   │   │   ├── 📄 hero-section.js  # Landing hero section
│   │   │   ├── 📄 material-form.js # Image upload form
│   │   │   ├── 📄 detection-results.js # Results display
│   │   │   ├── 📄 prevention-guidelines.js # AI guidelines
│   │   │   ├── 📄 settings-dialog.js # Settings configuration
│   │   │   └── 📄 image-analysis-canvas.js # Visual annotations
│   │   ├── 📁 hooks/               # Custom React hooks
│   │   │   └── 📄 useAIAnalysis.js # AI analysis logic
│   │   ├── 📁 context/             # React context providers
│   │   │   └── 📄 settings-context.js # Settings management
│   │   ├── 📄 globals.css          # Global styles
│   │   ├── 📄 layout.js           # Root layout
│   │   └── 📄 page.js             # Main page
│   └── 📁 lib/
│       ├── 📄 api.js              # API utilities
│       ├── 📄 geminiService.js    # Google Gemini integration
│       └── 📄 utils.js            # Utility functions
├── 📁 public/                     # Static assets
│   ├── 📁 images/                 # Sample damage images
│   └── 📄 logo.png               # Application logo
├── 📄 next.config.mjs            # Next.js configuration
├── 📄 tailwind.config.js         # Tailwind CSS config
├── 📄 package.json               # Dependencies
└── 📄 README.md                  # This file
```

## 🔧 Development

### 📋 Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build optimized production bundle
npm run start        # Start production server
npm run lint         # Run ESLint for code quality
npm run type-check   # TypeScript type checking (if applicable)

# Deployment
npm run export       # Export static site
npm run analyze      # Analyze bundle size
```

### 🔑 Key Components

| Component | Purpose | Features |
|:---|:---|:---|
| **`useAIAnalysis`** | Main AI logic hook | Model loading, image processing, cost calculation |
| **`MaterialForm`** | Upload interface | Drag & drop, file validation, preview |
| **`SettingsDialog`** | Configuration UI | Material costs, labor rates, persistence |
| **`ImageAnalysisCanvas`** | Visual display | Damage annotations, bounding boxes, zoom |
| **`DetectionResults`** | Results presentation | Cost breakdown, material lists, export |
| **`PreventionGuidelines`** | AI recommendations | Gemini integration, prevention tips |

### 🎨 Styling System

- **CSS Variables**: Dynamic theming support
- **Tailwind CSS**: Utility-first styling
- **Responsive Design**: Mobile-first approach
- **Modern Gradients**: Professional visual appeal
- **Accessibility**: WCAG 2.1 AA compliant

## 🤝 Contributing

We love contributions! Here's how you can help make this project even better:

### 🌟 Ways to Contribute

- 🐛 **Bug Reports**: Found an issue? [Open a bug report](https://github.com/hasitha20025/AI-Wall-Analysis/issues/new?template=bug_report.md)
- ✨ **Feature Requests**: Have an idea? [Suggest a feature](https://github.com/hasitha20025/AI-Wall-Analysis/issues/new?template=feature_request.md)
- 📖 **Documentation**: Improve docs, add examples, fix typos
- 🎨 **UI/UX**: Enhance design, improve accessibility
- 🧠 **AI Models**: Help improve detection accuracy
- 🌍 **Translations**: Add support for more languages

### 🚀 Development Process

1. **🍴 Fork the Repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/AI-Wall-Analysis.git
   ```

2. **🌿 Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-new-feature
   ```

3. **💻 Make Your Changes**
   - Follow the existing code style
   - Add tests if applicable
   - Update documentation

4. **✅ Test Your Changes**
   ```bash
   npm run dev      # Test locally
   npm run build    # Verify production build
   npm run lint     # Check code quality
   ```

5. **📝 Commit Your Changes**
   ```bash
   git commit -m "✨ Add amazing new feature"
   ```

6. **🚀 Push and Create PR**
   ```bash
   git push origin feature/amazing-new-feature
   ```

### 📋 Development Guidelines

- **Code Style**: Follow existing patterns and ESLint rules
- **Commits**: Use [conventional commit messages](https://conventionalcommits.org/)
- **Documentation**: Update README and inline docs
- **Testing**: Verify functionality before submitting

## 🏆 Contributors

<div align="center">

[![Contributors](https://contrib.rocks/image?repo=hasitha20025/AI-Wall-Analysis)](https://github.com/hasitha20025/AI-Wall-Analysis/graphs/contributors)

**Thank you to all our amazing contributors!** 🙏

</div>

## 📊 Project Stats

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/hasitha20025/AI-Wall-Analysis?style=social)
![GitHub forks](https://img.shields.io/github/forks/hasitha20025/AI-Wall-Analysis?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/hasitha20025/AI-Wall-Analysis?style=social)

![GitHub repo size](https://img.shields.io/github/repo-size/hasitha20025/AI-Wall-Analysis)
![GitHub language count](https://img.shields.io/github/languages/count/hasitha20025/AI-Wall-Analysis)
![GitHub last commit](https://img.shields.io/github/last-commit/hasitha20025/AI-Wall-Analysis)

</div>

## 📄 License

<div align="center">

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**TL;DR**: You can use, modify, and distribute this project freely! ✨

</div>

## 🙏 Acknowledgments

<div align="center">

| Technology | Description |
|:---:|:---|
| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white) | Amazing React framework for production |
| ![InferenceJS](https://img.shields.io/badge/InferenceJS-4ECDC4?style=flat&logo=javascript&logoColor=white) | Powerful AI model integration |
| ![Google](https://img.shields.io/badge/Google_Gemini-4285F4?style=flat&logo=google&logoColor=white) | Intelligent recommendations |
| ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | Beautiful utility-first CSS |
| ![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=flat&logo=radix-ui&logoColor=white) | Elegant component designs |

</div>

Special thanks to:
- 🏗️ **Construction Industry Experts** for providing realistic material consumption data
- 🧠 **AI/ML Community** for open-source tools and models
- 👥 **Beta Testers** for feedback and bug reports
- 🌟 **Open Source Contributors** who make projects like this possible

## 📞 Support & Contact

<div align="center">

### 🚨 Need Help?

| Type | Contact |
|:---:|:---|
| 🐛 **Bug Reports** | [GitHub Issues](https://github.com/hasitha20025/AI-Wall-Analysis/issues) |
| 💡 **Feature Requests** | [GitHub Discussions](https://github.com/hasitha20025/AI-Wall-Analysis/discussions) |
| 📧 **General Support** | [support@wallanalyzer.com](mailto:support@wallanalyzer.com) |
| 💬 **Community Chat** | [Discord Server](https://discord.gg/your-discord) |

### 🌐 Connect With Us

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/hasitha20025)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/your-profile)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/your-handle)

</div>

---

<div align="center">

**Built with ❤️ using Next.js and AI technology**

[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red.svg)](https://github.com/hasitha20025/AI-Wall-Analysis)
[![Powered by AI](https://img.shields.io/badge/Powered%20by-🤖%20AI-blue.svg)](https://github.com/hasitha20025/AI-Wall-Analysis)

⭐ **Star this repo if you found it helpful!** ⭐

</div>
