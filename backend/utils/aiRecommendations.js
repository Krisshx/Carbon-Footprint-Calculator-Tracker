const axios = require('axios');

const generateRecommendations = async (userActivities) => {
  try {
    // Fallback recommendations if API is not available
    const defaultRecommendations = [
      {
        category: 'Transportation',
        tip: 'Consider using public transportation, biking, or carpooling to reduce your carbon footprint from commuting.',
        impact: 'High',
      },
      {
        category: 'Energy',
        tip: 'Switch to LED bulbs and improve insulation in your home to reduce electricity consumption.',
        impact: 'Medium',
      },
      {
        category: 'Diet',
        tip: 'Try having at least one meatless day per week. Plant-based meals significantly reduce carbon emissions.',
        impact: 'Medium',
      },
      {
        category: 'Consumption',
        tip: 'Buy second-hand products and reduce unnecessary shopping to minimize consumption-related emissions.',
        impact: 'Low',
      },
    ];

    // If OpenAI API key is available, use it for personalized recommendations
    if (process.env.OPENAI_API_KEY) {
      try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
          model: 'gpt-3.5-turbo',
          messages: [{
            role: 'user',
            content: `Based on these carbon footprint activities: ${JSON.stringify(userActivities)}, provide 3 specific, actionable recommendations to reduce carbon emissions. Format as JSON array with {category, tip, impact}.`,
          }],
          max_tokens: 500,
        }, {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        });

        const content = response.data.choices[0].message.content;
        const jsonMatch = content.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (apiError) {
        console.log('OpenAI API error, using default recommendations:', apiError.message);
      }
    }

    return defaultRecommendations;
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return [];
  }
};

module.exports = { generateRecommendations };
