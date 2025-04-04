import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  TextInput,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BudgetQuestionnaireScreen = ({ route }) => {
	const { userId } = route.params;
	const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [totalBudget, setTotalBudget] = useState('');
  const [rentAmount, setRentAmount] = useState('');
  const [savingsGoal, setSavingsGoal] = useState('');
  const [budgetAllocations, setBudgetAllocations] = useState(null);
  const [budgetInsights, setBudgetInsights] = useState([]);
  
  // Enhanced questions with more categories and options
  const questions = [
    {
      id: 'hasRental',
      question: 'Are you paying for accommodation/rent?',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' }
      ]
    },
    {
      id: 'livingStyle',
      question: 'What is your living style preference?',
      options: [
        { label: 'Very budget-conscious', value: 'veryBudget' },
        { label: 'Budget-conscious', value: 'budget' },
        { label: 'Moderate comfort', value: 'moderate' },
        { label: 'Comfortable', value: 'comfortable' },
        { label: 'Luxury experience', value: 'luxury' }
      ]
    },
    {
      id: 'foodPreference',
      question: 'How do you plan to eat while traveling?',
      options: [
        { label: 'Cook almost all meals', value: 'allSelfCook' },
        { label: 'Cook most meals', value: 'selfCook' },
        { label: 'Mix of eating out and cooking', value: 'mixed' },
        { label: 'Mostly restaurants', value: 'restaurants' },
        { label: 'Premium dining experiences', value: 'gourmet' }
      ]
    },
    {
      id: 'travelStyle',
      question: 'What is your preferred way to get around?',
      options: [
        { label: 'Walking/biking when possible', value: 'selfPowered' },
        { label: 'Public transit only', value: 'public' },
        { label: 'Mix of transit and rideshares', value: 'mixed' },
        { label: 'Rental car/private transport', value: 'private' },
        { label: 'Premium transport (taxis, luxury cars)', value: 'premium' }
      ]
    },
    {
      id: 'entertainmentPreference',
      question: 'What kind of entertainment do you prefer?',
      options: [
        { label: 'Free activities only', value: 'free' },
        { label: 'Mostly free/low-cost activities', value: 'budget' },
        { label: 'Mix of paid and free activities', value: 'moderate' },
        { label: 'Regular paid activities', value: 'regular' },
        { label: 'Premium experiences (shows, events)', value: 'premium' }
      ]
    },
    {
      id: 'shoppingHabits',
      question: 'How would you describe your shopping habits?',
      options: [
        { label: 'Necessities only', value: 'necessities' },
        { label: 'Mostly essentials', value: 'minimal' },
        { label: 'Occasional treats and souvenirs', value: 'moderate' },
        { label: 'Regular shopping', value: 'regular' },
        { label: 'Frequent shopping and luxury items', value: 'frequent' }
      ]
    },
    {
      id: 'healthcarePriority',
      question: 'How do you prioritize healthcare expenses?',
      options: [
        { label: 'Minimal coverage', value: 'minimal' },
        { label: 'Basic coverage', value: 'basic' },
        { label: 'Standard coverage', value: 'standard' },
        { label: 'Comprehensive coverage', value: 'comprehensive' },
        { label: 'Premium healthcare options', value: 'premium' }
      ]
    },
    {
      id: 'educationFocus',
      question: 'What are your educational priorities?',
      options: [
        { label: 'Free resources only', value: 'free' },
        { label: 'Self-learning (books, free resources)', value: 'selfLearning' },
        { label: 'Mix of courses and self-learning', value: 'balanced' },
        { label: 'Regular courses', value: 'regular' },
        { label: 'Premium courses and workshops', value: 'professional' }
      ]
    }
  ];
  
  const totalSteps = questions.length + (answers.hasRental === 'yes' ? 3 : 2); // +2/3 for budget input, savings goal, and potentially rent input
  
  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // Move to next question after answering
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleRentSubmit = () => {
    const rent = parseFloat(rentAmount);
    if (isNaN(rent) || rent <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid rent amount');
      return;
    }
    
    setCurrentStep(currentStep + 1);
  };
  
  const handleSavingsGoalSubmit = () => {
    const budget = parseFloat(totalBudget);
    const savings = parseFloat(savingsGoal);
    
    if (isNaN(savings) || savings < 0) {
      Alert.alert('Invalid Input', 'Please enter a valid savings amount');
      return;
    }
    
    // Check if savings goal is within the 20% limit
    if (savings > budget * 0.2) {
      Alert.alert(
        'Savings Goal Too High', 
        `Your savings goal of ₹${savings} exceeds 20% of your total budget (₹${(budget * 0.2).toFixed(2)}). Please adjust your goal.`
      );
      return;
    }
    
    // Generate budget plan
    const allocations = calculateBudget(answers, budget, savings, answers.hasRental === 'yes' ? parseFloat(rentAmount) : null);
    const insights = generateInsights(allocations, answers, savings);
    
    setBudgetAllocations(allocations);
    setBudgetInsights(insights);
    
    // Move to results
    setCurrentStep(totalSteps);
  };
  
  const handleBudgetSubmit = () => {
    const budget = parseFloat(totalBudget);
    if (isNaN(budget) || budget <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid budget amount');
      return;
    }
    
    // If user has rental, move to rent input step, otherwise to savings goal step
    if (answers.hasRental === 'yes') {
      setCurrentStep(questions.length + 1);
    } else {
      setCurrentStep(questions.length + 1);
    }
  };
  
  // Enhanced budget calculation logic
  const calculateBudget = (preferences, totalAmount, savingsGoal, rentAmount = null) => {
    // Default percentages
    let percentages = {
      Food: 25,
      Accommodation: 30,
      Transportation: 10,
      Entertainment: 10,
      Shopping: 5,
      Healthcare: 5,
      Education: 5,
      Savings: savingsGoal ? (savingsGoal / totalAmount) * 100 : 5,
      Utilities: 3,
      Other: 2
    };
    
    // If rent is specified, adjust accommodation percentage
    if (rentAmount) {
      const rentPercentage = (rentAmount / totalAmount) * 100;
      percentages.Accommodation = rentPercentage;
      
      // Adjust other categories proportionally if rent takes more or less than the default 30%
      const adjustment = (30 - rentPercentage) / 9; // Distribute the difference across 9 other categories
      Object.keys(percentages).forEach(category => {
        if (category !== 'Accommodation') {
          percentages[category] += adjustment;
        }
      });
    }
    
    // Adjust percentages based on living style
    if (preferences.livingStyle === 'luxury') {
      percentages.Accommodation += 10;
      percentages.Food += 5;
      percentages.Other -= 5;
      percentages.Utilities -= 5;
      percentages.Healthcare -= 5;
    } else if (preferences.livingStyle === 'comfortable') {
      percentages.Accommodation += 5;
      percentages.Food += 3;
      percentages.Other -= 3;
      percentages.Utilities -= 3;
      percentages.Transportation -= 2;
    } else if (preferences.livingStyle === 'budget') {
      percentages.Accommodation -= 5;
      percentages.Food -= 5;
      percentages.Savings += 5;
      percentages.Other += 5;
    } else if (preferences.livingStyle === 'veryBudget') {
      percentages.Accommodation -= 10;
      percentages.Food -= 8;
      percentages.Entertainment -= 4;
      percentages.Savings += 10;
      percentages.Transportation += 5;
      percentages.Other += 7;
    }
    
    // Adjust percentages based on food preferences
    if (preferences.foodPreference === 'gourmet') {
      percentages.Food += 15;
      percentages.Entertainment -= 5;
      percentages.Shopping -= 5;
      percentages.Other -= 5;
    } else if (preferences.foodPreference === 'restaurants') {
      percentages.Food += 10;
      percentages.Entertainment -= 3;
      percentages.Shopping -= 3;
      percentages.Other -= 4;
    } else if (preferences.foodPreference === 'selfCook') {
      percentages.Food -= 10;
      percentages.Savings += 5;
      percentages.Shopping += 2;
      percentages.Entertainment += 3;
    } else if (preferences.foodPreference === 'allSelfCook') {
      percentages.Food -= 15;
      percentages.Savings += 8;
      percentages.Shopping += 4;
      percentages.Other += 3;
    }
    
    // Adjust percentages based on travel style
    if (preferences.travelStyle === 'premium') {
      percentages.Transportation += 12;
      percentages.Entertainment -= 5;
      percentages.Shopping -= 4;
      percentages.Other -= 3;
    } else if (preferences.travelStyle === 'private') {
      percentages.Transportation += 8;
      percentages.Entertainment -= 3;
      percentages.Shopping -= 3;
      percentages.Other -= 2;
    } else if (preferences.travelStyle === 'public') {
      percentages.Transportation -= 5;
      percentages.Savings += 3;
      percentages.Education += 2;
    } else if (preferences.travelStyle === 'selfPowered') {
      percentages.Transportation -= 8;
      percentages.Savings += 4;
      percentages.Healthcare += 2;
      percentages.Other += 2;
    }
    
    // Adjust percentages based on entertainment preferences
    if (preferences.entertainmentPreference === 'premium') {
      percentages.Entertainment += 8;
      percentages.Savings -= 5;
      percentages.Other -= 3;
    } else if (preferences.entertainmentPreference === 'regular') {
      percentages.Entertainment += 5;
      percentages.Savings -= 3;
      percentages.Other -= 2;
    } else if (preferences.entertainmentPreference === 'budget') {
      percentages.Entertainment -= 5;
      percentages.Savings += 3;
      percentages.Education += 2;
    } else if (preferences.entertainmentPreference === 'free') {
      percentages.Entertainment -= 8;
      percentages.Savings += 5;
      percentages.Other += 3;
    }
    
    // Adjust percentages based on shopping habits
    if (preferences.shoppingHabits === 'frequent') {
      percentages.Shopping += 10;
      percentages.Savings -= 5;
      percentages.Other -= 5;
    } else if (preferences.shoppingHabits === 'regular') {
      percentages.Shopping += 5;
      percentages.Savings -= 3;
      percentages.Other -= 2;
    } else if (preferences.shoppingHabits === 'minimal') {
      percentages.Shopping -= 3;
      percentages.Savings += 3;
    } else if (preferences.shoppingHabits === 'necessities') {
      percentages.Shopping -= 4;
      percentages.Savings += 4;
    }
    
    // Adjust percentages based on healthcare priority
    if (preferences.healthcarePriority === 'premium') {
      percentages.Healthcare += 8;
      percentages.Entertainment -= 3;
      percentages.Shopping -= 3;
      percentages.Other -= 2;
    } else if (preferences.healthcarePriority === 'comprehensive') {
      percentages.Healthcare += 5;
      percentages.Entertainment -= 2;
      percentages.Shopping -= 2;
      percentages.Other -= 1;
    } else if (preferences.healthcarePriority === 'basic') {
      percentages.Healthcare -= 2;
      percentages.Savings += 2;
    } else if (preferences.healthcarePriority === 'minimal') {
      percentages.Healthcare -= 4;
      percentages.Savings += 4;
    }
    
    // Adjust percentages based on education focus
    if (preferences.educationFocus === 'professional') {
      percentages.Education += 10;
      percentages.Entertainment -= 4;
      percentages.Shopping -= 3;
      percentages.Other -= 3;
    } else if (preferences.educationFocus === 'regular') {
      percentages.Education += 5;
      percentages.Entertainment -= 2;
      percentages.Shopping -= 2;
      percentages.Other -= 1;
    } else if (preferences.educationFocus === 'selfLearning') {
      percentages.Education -= 2;
      percentages.Savings += 2;
    } else if (preferences.educationFocus === 'free') {
      percentages.Education -= 4;
      percentages.Savings += 4;
    }
    
    // Override savings percentage if user has a specific goal
    if (savingsGoal) {
      const savingsPercentage = (savingsGoal / totalAmount) * 100;
      
      // Adjust other categories proportionally to accommodate the savings goal
      const currentSavings = percentages.Savings;
      const difference = savingsPercentage - currentSavings;
      
      // Distribute the difference across all other categories proportionally
      const totalOtherPercentages = 100 - currentSavings;
      
      Object.keys(percentages).forEach(category => {
        if (category !== 'Savings') {
          // Reduce each category proportionally to its current percentage
          const adjustmentFactor = percentages[category] / totalOtherPercentages;
          percentages[category] -= difference * adjustmentFactor;
        }
      });
      
      percentages.Savings = savingsPercentage;
    }
    
    // Normalize percentages to ensure they add up to 100%
    const totalPercentage = Object.values(percentages).reduce((sum, val) => sum + val, 0);
    const normalizationFactor = 100 / totalPercentage;
    
    Object.keys(percentages).forEach(category => {
      percentages[category] = Math.round(percentages[category] * normalizationFactor * 10) / 10;
    });
    
    // Calculate amounts based on percentages
    const amounts = {};
    Object.keys(percentages).forEach(category => {
      amounts[category] = Math.round((percentages[category] / 100) * totalAmount);
    });
    
    return {
      totalBudget: totalAmount,
      percentage: percentages,
      amount: amounts,
      rentAmount: rentAmount || null,
      savingsGoal: savingsGoal || null
    };
  };
  
  // Enhanced insights generator
  const generateInsights = (allocations, preferences, savingsGoal) => {
    const insights = [];
    
    // Savings goal insights
    if (savingsGoal) {
      insights.push(`Your monthly savings goal of ₹${savingsGoal} represents ${allocations.percentage.Savings.toFixed(1)}% of your total budget.`);
    }
    
    // Rent insights
    if (allocations.rentAmount) {
      insights.push(`Your rent of ₹${allocations.rentAmount} takes up ${allocations.percentage.Accommodation.toFixed(1)}% of your budget.`);
    }
    
    // Living style insights
    if (preferences.livingStyle === 'luxury') {
      insights.push(`Your luxury living preference leads to ₹${allocations.amount.Accommodation} allocated for accommodation, which is ${allocations.percentage.Accommodation}% of your budget.`);
    } else if (preferences.livingStyle === 'veryBudget') {
      insights.push(`With your very budget-conscious approach, you're minimizing accommodation costs (₹${allocations.amount.Accommodation}) while maintaining a strong ₹${allocations.amount.Savings} savings plan.`);
    } else if (preferences.livingStyle === 'budget') {
      insights.push(`With your budget-conscious approach, you're saving on accommodation (₹${allocations.amount.Accommodation}) while maintaining a ₹${allocations.amount.Savings} savings plan.`);
    }
    
    // Food insights
    if (preferences.foodPreference === 'gourmet') {
      insights.push(`Your preference for premium dining experiences allocates a significant ₹${allocations.amount.Food} (${allocations.percentage.Food}%) to food expenses.`);
    } else if (preferences.foodPreference === 'restaurants') {
      insights.push(`Dining out regularly means ₹${allocations.amount.Food} (${allocations.percentage.Food}%) is allocated to food expenses.`);
    } else if (preferences.foodPreference === 'allSelfCook') {
      insights.push(`By cooking almost all meals yourself, you're significantly reducing food expenses to ₹${allocations.amount.Food} and boosting your savings considerably.`);
    } else if (preferences.foodPreference === 'selfCook') {
      insights.push(`By cooking most meals yourself, you're keeping food expenses to ₹${allocations.amount.Food} and saving more for other categories.`);
    }
    
    // Transportation insights
    if (preferences.travelStyle === 'premium') {
      insights.push(`Premium transportation options require a substantial ₹${allocations.amount.Transportation} of your budget, offering maximum convenience.`);
    } else if (preferences.travelStyle === 'private') {
      insights.push(`Private transportation costs are higher at ₹${allocations.amount.Transportation}, but offer more convenience.`);
    } else if (preferences.travelStyle === 'selfPowered') {
      insights.push(`Your choice of walking/biking significantly reduces transportation costs to just ₹${allocations.amount.Transportation}, freeing up money for other priorities.`);
    } else if (preferences.travelStyle === 'public') {
      insights.push(`Using public transit keeps your transportation budget at ₹${allocations.amount.Transportation}, allowing more for savings and education.`);
    }
    
    // Entertainment insights
    if (preferences.entertainmentPreference === 'premium') {
      insights.push(`Your preference for premium entertainment experiences accounts for ₹${allocations.amount.Entertainment} of your monthly budget.`);
    } else if (preferences.entertainmentPreference === 'free') {
      insights.push(`By focusing on free entertainment options, you're keeping these expenses at just ₹${allocations.amount.Entertainment} and maximizing your savings potential.`);
    }
    
    // Shopping insights
    if (preferences.shoppingHabits === 'frequent') {
      insights.push(`With regular shopping habits, you've allocated a significant ₹${allocations.amount.Shopping} for shopping expenses.`);
    } else if (preferences.shoppingHabits === 'necessities') {
      insights.push(`By limiting shopping to necessities only, you're spending just ₹${allocations.amount.Shopping} in this category, helping you reach your financial goals faster.`);
    }
    
    // General insights
    insights.push(`Consider setting aside some of your ₹${allocations.amount.Other} "Other" budget for unexpected expenses.`);
    
    if (allocations.amount.Savings > 0) {
      insights.push(`Your monthly savings of ₹${allocations.amount.Savings} will accumulate to ₹${allocations.amount.Savings * 12} annually.`);
    }
    
    return insights;
  };
  
  const renderQuestion = (question) => {
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question.question}</Text>
        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                answers[question.id] === option.value && styles.selectedOption
              ]}
              onPress={() => handleAnswer(question.id, option.value)}
            >
              <Text 
                style={[
                  styles.optionText,
                  answers[question.id] === option.value && styles.selectedOptionText
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.stepIndicator}>
          Question {currentStep + 1} of {questions.length}
        </Text>
      </View>
    );
  };
  
  const renderBudgetInput = () => {
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>What is your total monthly budget (in ₹)?</Text>
        <TextInput
          style={styles.budgetInput}
          keyboardType="numeric"
          placeholder="Enter amount in ₹"
          value={totalBudget}
          onChangeText={setTotalBudget}
        />
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleBudgetSubmit}
        >
          <Text style={styles.submitText}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const renderRentInput = () => {
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>How much do you pay for rent/accommodation (in ₹)?</Text>
        <TextInput
          style={styles.budgetInput}
          keyboardType="numeric"
          placeholder="Enter rent amount in ₹"
          value={rentAmount}
          onChangeText={setRentAmount}
        />
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleRentSubmit}
        >
          <Text style={styles.submitText}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const renderSavingsGoalInput = () => {
    const budget = parseFloat(totalBudget);
    const maxSavings = budget ? budget * 0.2 : 0;
    
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>How much would you like to save this month (in ₹)?</Text>
        <Text style={styles.helperText}>
          Note: Your savings goal cannot exceed 20% of your budget (₹{maxSavings.toFixed(2)})
        </Text>
        <TextInput
          style={styles.budgetInput}
          keyboardType="numeric"
          placeholder="Enter savings goal in ₹"
          value={savingsGoal}
          onChangeText={setSavingsGoal}
        />
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleSavingsGoalSubmit}
        >
          <Text style={styles.submitText}>Generate My Budget Plan</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const renderResults = () => {
    if (!budgetAllocations) return null;
    
    return (
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>Your Personalized Budget Plan</Text>
        
        <Text style={styles.sectionTitle}>Monthly Budget: ₹{budgetAllocations.totalBudget.toLocaleString()}</Text>
        
        {budgetAllocations.savingsGoal && (
          <View style={styles.savingsGoalContainer}>
            <Text style={styles.savingsGoalText}>
              Savings Goal: ₹{budgetAllocations.savingsGoal.toLocaleString()} 
              ({(budgetAllocations.percentage.Savings).toFixed(1)}% of total)
            </Text>
          </View>
        )}
        
        {budgetAllocations.rentAmount && (
          <View style={styles.savingsGoalContainer}>
            <Text style={styles.savingsGoalText}>
              Rent/Accommodation: ₹{budgetAllocations.rentAmount.toLocaleString()} 
              ({(budgetAllocations.percentage.Accommodation).toFixed(1)}% of total)
            </Text>
          </View>
        )}
        
        <Text style={styles.sectionTitle}>Budget Breakdown</Text>
        {Object.keys(budgetAllocations.amount).map((category, index) => (
          <View key={index} style={styles.categoryRow}>
            <View style={styles.categoryDetails}>
              <Text style={styles.categoryName}>{category}</Text>
              <Text style={styles.categoryPercent}>
                {budgetAllocations.percentage[category].toFixed(1)}%
              </Text>
            </View>
            <View style={styles.barContainer}>
              <View 
                style={[
                  styles.barFill, 
                  { 
                    width: `${budgetAllocations.percentage[category]}%`,
                    backgroundColor: getCategoryColor(category)
                  }
                ]} 
              />
            </View>
            <Text style={styles.categoryAmount}>
              ₹{budgetAllocations.amount[category].toLocaleString()}
            </Text>
          </View>
        ))}
        
        <Text style={styles.sectionTitle}>Budget Insights</Text>
        {budgetInsights.map((insight, index) => (
          <View key={index} style={styles.insightItem}>
            <Text style={styles.insightText}>{insight}</Text>
          </View>
        ))}
        
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => navigation.navigate('Home', { userId })}
        >
          <Text style={styles.continueText}>Continue to Dashboard</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  // Enhanced color scheme for different categories
  const getCategoryColor = (category) => {
    const colors = {
      Food: '#FF6B6B',
      Accommodation: '#4ECDC4',
      Transportation: '#FFD166',
      Entertainment: '#6A0572',
      Shopping: '#FF9A8B',
      Healthcare: '#88D9E6',
      Education: '#1A535C',
      Savings: '#4CB944',
      Utilities: '#3F88C5',
      Other: '#7D7ABC'
    };
    
    return colors[category] || '#470967'; // Default to app primary color
  };
  
  const renderCurrentStep = () => {
    if (currentStep < questions.length) {
      return renderQuestion(questions[currentStep]);
    } else if (currentStep === questions.length) {
      return renderBudgetInput();
    } else if (currentStep === questions.length + 1 && answers.hasRental === 'yes') {
      return renderRentInput();
    } else if ((currentStep === questions.length + 1 && answers.hasRental === 'no') || 
              (currentStep === questions.length + 2 && answers.hasRental === 'yes')) {
      return renderSavingsGoalInput();
    } else {
      return renderResults();
    }
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.navbar}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => {
            if (currentStep > 0 && currentStep < totalSteps) {
              setCurrentStep(currentStep - 1);
            } else {
              navigation.goBack();
            }
          }}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.navbarTitle}>Budget Questionnaire</Text>
        <View style={styles.emptySpace} />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {renderCurrentStep()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: "#f0f0f0" 
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    backgroundColor: '#470967',
    paddingHorizontal: 15,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  navbarTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptySpace: {
    width: 50,
  },
  container: { 
    padding: 20, 
    paddingBottom: 40 
  },
  questionContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  helperText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  selectedOption: {
    borderColor: '#470967',
    backgroundColor: '#e0d3e8',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: '#470967',
    fontWeight: 'bold',
  },
  stepIndicator: {
    textAlign: 'center',
    color: '#666',
    marginTop: 10,
  },
  budgetInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    borderRadius: 8,
    fontSize: 18,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#470967',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#470967',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  categoryRow: {
    marginBottom: 15,
  },
  categoryDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
  },
  categoryPercent: {
    fontSize: 16,
    color: '#666',
  },
  barContainer: {
    height: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 5,
  },
  barFill: {
    height: '100%',
    borderRadius: 6,
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  insightItem: {
    backgroundColor: '#f9f0ff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#470967',
  },
  insightText: {
    fontSize: 14,
    color: '#333',
  },
  continueButton: {
    backgroundColor: '#470967',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BudgetQuestionnaireScreen;