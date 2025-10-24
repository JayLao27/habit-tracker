# Life Reset OS

A comprehensive daily reflection and life management system with AI-powered insights and Notion sync capabilities.

## 🧠 System Overview

**Life Reset OS** is a personal life management system designed to help you:
- Track daily activities and reflections
- Set and monitor long-term goals
- Get AI-powered insights and recommendations
- Sync data with Notion for external organization

## 🏗️ Core Modules

### 🕒 Daily Routine Module
- **Morning/Afternoon/Night Tracker**: Track activities throughout the day
- **Feelings Journal**: Record emotional states and reflections
- **AI Recommendations**: Get personalized suggestions based on your patterns

### 💭 Mind Reframe Module
- **What I Want**: Define your desires and aspirations
- **What I Don't Want**: Identify things to avoid or eliminate
- **Reflection Questions**: Deepen your understanding of your values

### 🎯 Goal Clarity Module
- **10-Year Vision**: Long-term life goals and legacy
- **1-Year Goals**: Annual milestones and achievements
- **3-Month Focus**: Quarterly objectives and habits
- **Goal Alignment Check**: Ensure consistency across timeframes

### ⚙️ Growth Plan Module
- **Skills Development**: Identify and track skills to develop
- **Distraction Elimination**: Recognize and eliminate unproductive habits
- **Growth Strategy**: Actionable steps for personal development

### 📆 Weekly Review Module
- **What Went Well**: Celebrate successes and wins
- **What Didn't Go Well**: Identify challenges and improvements
- **Gratitude Practice**: Cultivate appreciation and positivity
- **Next Week Planning**: Set focus areas and projects

### 🗓️ Task Scheduler Module
- **Daily Task Management**: Plan and track tasks (Monday-Friday)
- **Progress Tracking**: Monitor completion and productivity
- **Weekly Overview**: Visualize your week's commitments

### 🤖 AI Integration Layer
- **Pattern Recognition**: Identify productivity and behavioral patterns
- **Personalized Recommendations**: Get tailored advice based on your data
- **Goal Alignment Analysis**: Check if daily activities support your goals
- **Motivation and Insights**: Receive encouragement and actionable tips

## 🛠️ Technical Stack

### Frontend
- **Next.js 14** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn/ui** for component library
- **Radix UI** for accessible primitives

### Backend
- **Next.js API Routes** for backend logic
- **Prisma ORM** for database management
- **SQLite** for local development
- **OpenAI API** for AI insights

### Database Schema
```sql
- users: User profiles and authentication
- daily_logs: Daily activity tracking and reflections
- goals: Long-term, medium-term, and short-term goals
- mind_reframe: What you want vs. don't want
- growth_plan: Skills to develop and distractions to eliminate
- weekly_reviews: Weekly reflection and planning
- tasks: Daily task management and scheduling
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd life-reset-os
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your values:
   ```env
   DATABASE_URL="file:./dev.db"
   OPENAI_API_KEY="your_openai_api_key_here"
   NOTION_KEY="your_notion_api_key_here"
   NOTION_DB_ID="your_notion_database_id_here"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📱 Features

### Dashboard
- Quick stats and progress overview
- Recent activity feed
- AI insights summary
- Quick action buttons

### Daily Reset
- Three-column layout (Morning/Afternoon/Night)
- Activity tracking with add/remove functionality
- Feelings and reflection journal
- AI-powered insights generation

### Goals Management
- Hierarchical goal setting (10-year → 1-year → 3-month)
- Goal alignment checking
- Progress tracking and visualization

### Mind Reframe
- Define what you want and don't want
- Reflection questions for deeper insights
- Visual categorization

### Growth Planning
- Skills development tracking
- Distraction elimination
- Actionable growth strategies

### Weekly Reviews
- Comprehensive week reflection
- Gratitude practice
- Next week planning
- Progress assessment

### Task Management
- Monday-Friday task scheduling
- Task completion tracking
- Weekly overview
- Progress statistics

### AI Coach
- Pattern recognition in your data
- Personalized recommendations
- Goal alignment analysis
- Custom question answering

## 🔧 API Endpoints

### Daily Logs
- `GET /api/daily-logs` - Fetch daily logs
- `POST /api/daily-logs` - Create new daily log
- `PUT /api/daily-logs` - Update existing daily log

### Goals
- `GET /api/goals` - Fetch user goals
- `POST /api/goals` - Create new goal
- `PUT /api/goals` - Update existing goal

### Mind Reframe
- `GET /api/mind-reframe` - Fetch mind reframe data
- `POST /api/mind-reframe` - Create new mind reframe
- `PUT /api/mind-reframe` - Update existing mind reframe

### AI Recommendations
- `GET /api/ai-recommend` - Get AI insights based on context
- `POST /api/ai-recommend` - Generate comprehensive AI analysis

## 🤖 AI Integration

The AI Coach uses OpenAI's GPT-4 to provide:
- **Pattern Analysis**: Identify trends in your daily activities
- **Personalized Recommendations**: Suggest improvements based on your data
- **Goal Alignment**: Check if daily activities support your long-term goals
- **Motivation**: Provide encouragement and actionable advice

### AI Prompt Engineering
The system uses carefully crafted prompts to:
- Analyze daily activity patterns
- Provide context-aware recommendations
- Generate motivational content
- Suggest habit improvements

## 📊 Data Flow

1. **User Input** → Daily activities, goals, reflections
2. **Database Storage** → Prisma + SQLite for persistence
3. **AI Analysis** → OpenAI API for insights generation
4. **Frontend Display** → React components for user interaction
5. **Notion Sync** → Export data to Notion (optional)

## 🔮 Future Enhancements

### Planned Features
- **Notion Integration**: Automatic sync with Notion databases
- **Google Calendar Integration**: Schedule focus blocks automatically
- **Mobile App**: React Native version for mobile access
- **Advanced Analytics**: Detailed progress tracking and visualization
- **Habit Tracking**: Integration with habit formation principles
- **Social Features**: Share insights with accountability partners

### Automation Layer
- **Cron Jobs**: Auto-create daily logs every morning
- **Smart Notifications**: Context-aware reminders
- **Data Export**: CSV/PDF reports for external analysis
- **Backup System**: Automatic data backup and recovery

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** for the amazing React framework
- **Tailwind CSS** for the utility-first CSS framework
- **Shadcn/ui** for the beautiful component library
- **Prisma** for the excellent database ORM
- **OpenAI** for the powerful AI capabilities

## 📞 Support

If you have any questions or need help, please:
1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed description
3. Contact the maintainers

---

**Built with ❤️ for personal growth and life optimization**