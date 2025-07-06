# Testing Gemini API Integration

## Test the Prevention Guidelines Feature

1. **Start the Development Server**
   ```bash
   npm run dev
   ```
   The app will run on http://localhost:3000

2. **Set Up Your Gemini API Key**
   - Open `.env.local` file
   - Replace `your_gemini_api_key_here` with your actual Gemini API key
   - Save the file and restart the development server

3. **Test the Feature**
   - Upload a wall image with visible damage
   - Wait for the Roboflow model to detect damage types
   - Scroll down to see the "AI Prevention Guidelines" section
   - Click "Generate Guidelines" to get AI-powered advice
   - Click on individual damage types for specific recommendations
   - Click "Get Schedule" for maintenance planning

## Sample Test Images

Use the images in the `public/images/` folder:
- `Crack_Damage.jpeg` - For testing crack detection
- `Flaking_Paint_Damage.jpeg` - For paint damage detection
- `Water_Damage.jpg` - For water damage detection
- `Missing_Piece_Damage.webp` - For missing piece detection

## Expected Results

After uploading an image and clicking "Generate Guidelines", you should see:

1. **General Prevention Guidelines** with sections like:
   - Root Causes
   - Prevention Strategies
   - Early Warning Signs
   - Maintenance Schedule
   - Professional vs DIY advice

2. **Specific Advice** for individual damage types including:
   - Urgency Level
   - Immediate Actions
   - Repair Timeline
   - Cost-saving Tips

3. **Maintenance Schedule** with:
   - Monthly Tasks
   - Quarterly Tasks
   - Seasonal Considerations
   - Professional Inspections

## Troubleshooting

### If you see "Failed to generate prevention guidelines":
1. Check that your Gemini API key is correctly set in `.env.local`
2. Make sure you have an active internet connection
3. Verify your Gemini API key has the necessary permissions
4. Check the browser console for detailed error messages

### If the Roboflow model doesn't detect damage:
1. Try using the sample images in `public/images/`
2. Ensure the image clearly shows wall damage
3. Check that the image file size is under 15MB

## API Usage

The system makes API calls to:
1. **Roboflow API** - For damage detection (already working)
2. **Gemini API** - For generating prevention guidelines (new feature)

Both APIs require valid API keys to function properly.
