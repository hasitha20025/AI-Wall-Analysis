import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  async generatePreventionGuidelines(damageTypes) {
    try {
      // Create a comprehensive prompt based on detected damage types
      const damageList = damageTypes.map(damage => damage.class.replace(/_/g, ' ')).join(', ');
      
      const prompt = `
As a construction and building maintenance expert, provide comprehensive prevention guidelines for the following wall damage types detected: ${damageList}.

For each damage type, provide:
1. **Root Causes**: What typically causes this type of damage
2. **Prevention Strategies**: Specific actionable steps to prevent this damage
3. **Early Warning Signs**: What to look for before the damage becomes severe
4. **Maintenance Schedule**: How often to inspect and maintain
5. **Professional vs DIY**: What homeowners can do vs when to call professionals

Please format the response in a clear, structured way with headings and bullet points. Focus on practical, actionable advice that property owners can implement.

Damage types to address: ${damageList}
`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating prevention guidelines:', error);
      throw new Error('Failed to generate prevention guidelines. Please check your Gemini API key.');
    }
  }

  async generateSpecificAdvice(damageType, confidence, areaSize, estimatedCost) {
    try {
      const prompt = `
You are a building maintenance expert. A ${damageType.replace(/_/g, ' ')} has been detected with ${(confidence * 100).toFixed(1)}% confidence, covering an area of ${areaSize.toFixed(4)} square meters, with an estimated repair cost of LKR ${estimatedCost.toLocaleString()}.

Provide specific advice including:
1. **Urgency Level**: How urgent is this repair (Low/Medium/High/Critical)
2. **Immediate Actions**: What should be done right now to prevent further damage
3. **Repair Timeline**: How soon should this be addressed
4. **DIY vs Professional**: Can this be DIY or requires professional help
5. **Cost-saving Tips**: Ways to minimize repair costs
6. **Prevention**: How to prevent this from happening again

Keep the response concise but comprehensive, focusing on actionable advice.
`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating specific advice:', error);
      throw new Error('Failed to generate specific advice.');
    }
  }

  async generateMaintenanceSchedule(allDamageTypes) {
    try {
      const damageList = allDamageTypes.map(damage => damage.class.replace(/_/g, ' ')).join(', ');
      
      const prompt = `
Based on the detected wall damage types: ${damageList}, create a comprehensive maintenance schedule for this property.

Provide:
1. **Monthly Tasks**: What should be done every month
2. **Quarterly Tasks**: What should be done every 3 months
3. **Bi-Annual Tasks**: What should be done twice a year
4. **Annual Tasks**: What should be done once a year
5. **Seasonal Considerations**: Special tasks for different seasons
6. **Professional Inspections**: When to call professionals

Format as a clear schedule that a property owner can follow to maintain their walls and prevent future damage.
`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating maintenance schedule:', error);
      throw new Error('Failed to generate maintenance schedule.');
    }
  }
}

export default GeminiService;
