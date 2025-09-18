# Cognitive Skills & Student Performance Dashboard

A comprehensive dashboard for analyzing student cognitive skills and performance metrics with machine learning insights.

## Features

###  Data Analysis
- **200 synthetic students** across grades 9-12
- **Cognitive skills tracking**: comprehension, attention, focus, retention
- **Performance metrics**: assessment scores, engagement time
- **Correlation analysis** between skills and performance

###  Machine Learning
- **Prediction models** for assessment scores
- **Student clustering** into learning personas:
  - High Performers
  - Focused Learners
  - Engaged Students
  - Developing Learners
- **Feature importance** analysis

###  Interactive Dashboard
- **Overview statistics** with key metrics
- **Interactive charts**:
  - Bar charts for skill comparisons
  - Scatter plots for attention vs performance
  - Radar charts for student profiles
  - Pie charts for persona distribution
- **Searchable and sortable** student table
- **Real-time insights** and recommendations

## Project Structure

`
IGEBRA/
 data/
    student_data.csv                    # Original dataset
    student_data_with_personas.csv     # Dataset with ML personas
    generate_data.py                   # Data generation script
 analysis/
    student_analysis.ipynb             # Jupyter notebook with analysis
 dashboard/                             # Next.js dashboard
    src/app/page.tsx                 # Main dashboard component
    public/student_data.csv           # Data for dashboard
    package.json                      # Dependencies
 README.md                             # This file
`

## Setup Instructions

### 1. Data Analysis (Jupyter Notebook)
`ash
# Install Python dependencies
pip install pandas numpy scikit-learn matplotlib seaborn plotly jupyter

# Run the analysis notebook
jupyter notebook analysis/student_analysis.ipynb
`

### 2. Dashboard (Next.js)
`ash
# Navigate to dashboard directory
cd dashboard

# Install dependencies
npm install

# Run development server
npm run dev
`

### 3. Deploy to Vercel
`ash
# Install Vercel CLI
npm i -g vercel

# Deploy from dashboard directory
cd dashboard
vercel --prod
`

## Key Findings

###  Correlation Analysis
- **Comprehension** has the strongest correlation with assessment scores (0.85+)
- **Retention** and **Focus** show moderate correlations (0.70+)
- **Attention** correlates with engagement time

###  Learning Personas
1. **High Performers** (25%): High scores across all metrics
2. **Focused Learners** (30%): Strong focus and attention skills
3. **Engaged Students** (25%): High engagement time, moderate scores
4. **Developing Learners** (20%): Need support across all areas

###  Performance Insights
- Average assessment score: 72.3
- 45% of students score above 80
- Strong correlation between engagement time and performance
- Different learning personas require tailored approaches

## Technologies Used

### Data Analysis
- **Python**: pandas, numpy, scikit-learn
- **Visualization**: matplotlib, seaborn, plotly
- **ML Models**: Random Forest, Linear Regression, K-Means clustering

### Dashboard
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Recharts**: Interactive charts and visualizations
- **Lucide React**: Beautiful icons

## Deployment

The dashboard is deployed on Vercel and accessible at:
**https://cognitive-skills-dashboard.vercel.app**

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the MIT License.
