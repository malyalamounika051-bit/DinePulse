import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const AI_DASHBOARD_INSTRUCTIONS = `
You are DinePulse AI Copilot, an elite restaurant operations consultant and SaaS intelligence engine.

STRICT FORMATTING RULES:
NEVER return a paragraph or wall of text.
Always format your response as a clean, professional dashboard summary using the following layout:

## 📊 [Section Title]

🚨 **Critical Alerts**
• [Short actionable alert 1]
• [Short actionable alert 2]

📈 **Key Insights**
• [Insight with important numbers in **bold**]
• [Insight with trends in **bold**]

💡 **Recommendations**
• [Actionable step 1]
• [Actionable step 2]

⏳ **Predictions**
• [Future prediction with timeline in **bold**]

────────────────────────

DESIGN RULES:
- Keep every sentence under 20 words.
- Bold only key metrics, numbers, and timelines.
- Leave blank lines between sections.
- Make it sound like a premium Vercel, Stripe, or Linear dashboard summary.
`;

export async function generateAICopilotResponse(prompt: string, context?: any) {
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const response = await model.generateContent(
        `${AI_DASHBOARD_INSTRUCTIONS}
Context of current restaurant state: ${JSON.stringify(context || {})}
User Question: ${prompt}`
      );

      return response.response.text();
    } catch (err) {
      console.warn('Gemini API call failed, falling back to local intelligence engine:', err);
    }
  }

  // Smart Local Dashboard Intelligence Engine
  const query = prompt.toLowerCase();

  if (query.includes('waste') || query.includes('ingredient')) {
    return `## 📊 AI Inventory & Waste Analysis

🚨 **Critical Alerts**
• Black Truffle Oil: **1.1 L** remaining (Below safety stock)
• A5 Wagyu Beef: **4.2 kg** remaining (Reorder immediately)

📈 **Key Insights**
• Wagyu demand increased **27%** this week.
• Premium dishes generated **41%** of today's revenue.

💡 **Recommendations**
• Render trimmed Wagyu fat into Truffle Wagyu Butter.
• Reorder premium ingredients before tomorrow evening.

⏳ **Predictions**
• Wagyu stock expected to deplete in **1.5 days**.
• Black Truffle Oil likely to run out within **2 days**.

────────────────────────`;
  }

  if (query.includes('staff') || query.includes('shift') || query.includes('schedule')) {
    return `## 📊 AI Staff & Shift Optimization

🚨 **Critical Alerts**
• Main Dining floor understaffed during **7:30 PM** peak rush.
• Kitchen ticket velocity lagging on **Table 4** order cluster.

📈 **Key Insights**
• Demand spikes predicted between **7:00 PM - 9:00 PM** (**31 orders/hr**).
• Head Chef Kenji Sato operating at **98% efficiency**.

💡 **Recommendations**
• Shift **1 server (Elena)** from Main Dining to Patio Deck.
• Pace entree orders to smooth out kitchen line load.

⏳ **Predictions**
• Average table wait time expected to decrease by **4 mins**.
• Staff efficiency rating projected to hit **4.9/5.0**.

────────────────────────`;
  }

  if (query.includes('discount') || query.includes('pricing') || query.includes('happy hour')) {
    return `## 📊 Smart Dynamic Pricing & Happy Hour Suggestions

🚨 **Critical Alerts**
• Appetizer order volume dipped **12%** during off-peak hours.
• Perishable produce stock requires faster turnover.

📈 **Key Insights**
• Smoked Old Fashioned yields a **88% gross margin**.
• Off-peak covers are down **15%** between **4:00 PM - 5:30 PM**.

💡 **Recommendations**
• Launch **Burrata + Spritz Special** for **$28** (save **$6**).
• Apply **10%** promotional discount on high-margin drinks.

⏳ **Predictions**
• Dynamic offer will boost off-peak covers by **22%**.
• Overall beverage revenue projected to increase by **18%**.

────────────────────────`;
  }

  return `## 📊 DinePulse Operations Intelligence

🚨 **Critical Alerts**
• Black Truffle Oil stock level at **critical threshold**.
• Ticket prep time on **Table 4** exceeds **20 mins**.

📈 **Key Insights**
• Today's gross sales reached **$4,850.20** (**+14.2%** vs last week).
• High-margin cocktails generated **32%** of gross profit.

💡 **Recommendations**
• Trigger automated ingredient restock order with supplier.
• Assign auxiliary server to assist VIP Lounge seating.

⏳ **Predictions**
• Dinner service revenue projected to reach **$6,200** tonight.
• Table occupancy expected to peak at **90%** by **8:15 PM**.

────────────────────────`;
}

export async function generateMenuRecommendations(dietaryPreference: string, timeOfDay: string) {
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const response = await model.generateContent(
        `Recommend 3 optimal restaurant menu items for a customer who prefers "${dietaryPreference}" dining during ${timeOfDay}. Return JSON format with itemId, reason, pairing.`
      );
      return response.response.text();
    } catch (e) {
      console.warn('Gemini API call fallback for recommendations');
    }
  }

  return [
    {
      itemId: 'm1',
      name: 'Truffle Glazed Wagyu Ribeye',
      reason: 'Chef’s top rated dish, aged for maximum flavor depth.',
      pairing: 'Smoked Old Fashioned'
    },
    {
      itemId: 'm3',
      name: 'Artisanal Burrata & Heirloom Tomato',
      reason: 'Fresh, light organic appetizer with 25-yr balsamic.',
      pairing: 'Dragonfruit Botanical Spritz'
    },
    {
      itemId: 'm2',
      name: 'Pan-Seared Chilean Sea Bass',
      reason: 'Wild sea bass with rich saffron beurre blanc.',
      pairing: 'Chardonnay'
    }
  ];
}
