# Wall Damage Analysis with AI Prevention Guidelines

This project analyzes wall damage using Roboflow's computer vision model and provides AI-powered prevention guidelines using Google's Gemini API.

## Features

- **Wall Damage Detection**: Uses Roboflow model to detect various types of wall damage
- **Cost Estimation**: Calculates repair costs based on detected damage area
- **AI Prevention Guidelines**: Generates comprehensive prevention advice using Gemini AI
- **Specific Damage Advice**: Get targeted advice for individual damage types
- **Maintenance Scheduling**: AI-generated maintenance schedules

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Roboflow API Key (already configured)
NEXT_PUBLIC_INFERENCE_API_KEY=your_roboflow_api_key

# Google Gemini API Key (add your key here)
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Get Google Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Click "Get API Key" 
4. Create a new API key or use an existing one
5. Copy the API key and paste it in your `.env.local` file

### 4. Run the Development Server

```bash
npm run dev
```

## How to Use

1. **Upload Image**: Upload a wall image using the form
2. **View Detection Results**: See detected damage types with cost estimates
3. **Generate Guidelines**: Click "Generate Guidelines" to get AI-powered prevention advice
4. **Get Specific Advice**: Click on individual damage types for targeted recommendations
5. **Maintenance Schedule**: Generate a comprehensive maintenance schedule

## Damage Types Detected

- **Crack Damages**: Wall cracks and fissures
- **Flaking Paint Damage**: Paint peeling and flaking
- **Water Damage**: Water-related wall damage
- **Missing Piece Damage**: Missing sections or holes in walls

## AI-Powered Features

### Prevention Guidelines
- Root causes analysis
- Prevention strategies
- Early warning signs
- Maintenance schedules
- Professional vs DIY recommendations

### Specific Advice
- Urgency levels
- Immediate actions required
- Repair timelines
- Cost-saving tips
- Prevention methods

### Maintenance Scheduling
- Monthly tasks
- Quarterly inspections
- Seasonal considerations
- Professional inspection recommendations

## Cost Estimation

The system calculates repair costs in LKR (Sri Lankan Rupees) based on:
- Detected damage area in square meters
- Predefined cost rates per damage type
- Total repair cost estimation

## Technical Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **AI Detection**: Roboflow Inference API
- **AI Guidelines**: Google Gemini API
- **Deployment**: Ready for Vercel deployment

## API Configuration

The system uses two main APIs:

1. **Roboflow API**: For computer vision-based damage detection
2. **Gemini API**: For generating intelligent prevention guidelines and advice

## Troubleshooting

### Common Issues

1. **Gemini API Error**: Make sure your API key is correctly set in `.env.local`
2. **Model Loading Error**: Check your Roboflow API key
3. **Canvas Issues**: Ensure browser supports HTML5 Canvas

### Error Messages

- "Failed to generate prevention guidelines": Check Gemini API key
- "Failed to load model": Check Roboflow API key
- "Canvas not available": Browser compatibility issue

## Development

To extend the functionality:

1. **Add New Damage Types**: Update `damageCostRates` in `page.js`
2. **Modify AI Prompts**: Edit prompts in `src/lib/geminiService.js`
3. **Customize UI**: Modify components in `src/app/components/`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This is a research project for educational purposes.
