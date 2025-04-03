import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  TextInput
} from 'react-native';
import { 
  generatePreferenceQuestions, 
  processQuestionnaireAnswers, 
  calculatePersonalizedBudget,
  generateBudgetInsights
} from '../utils/budgetUtils';
import Navbar from '../Components/Navbar';

const BudgetQuestionnaireScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [totalBudget, setTotalBudget] = useState('');
  const [budgetAllocations, setBudgetAllocations] = useState(null);
  const [budgetInsights, setBudgetInsights] = useState([]);
  
  const questions = generatePreferenceQuestions();
  const totalSteps = questions.length + 1; // +1 for the budget input step
  
  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // Move to next question after answering
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleBudgetSubmit = () => {
    const budget = parseFloat(totalBudget);
    if (isNaN(budget) || budget <= 0) {
      alert('Please enter a valid budget amount');
      return;
    }
    
    // Process answers and calculate budget
    const preferences = processQuestionnaireAnswers(answers);
    const allocations = calculatePersonalizedBudget(preferences, budget);
    const insights = generateBudgetInsights(allocations);
    
    setBudgetAllocations(allocations);
    setBudgetInsights(insights);
    
    // Move to results
    setCurrentStep(totalSteps);
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
        <Text style={styles.questionText}>What is your total monthly budget?</Text>
        <TextInput
          style={styles.budgetInput}
          keyboardType="numeric"
          placeholder="Enter amount"
          value={totalBudget}
          onChangeText={setTotalBudget}
        />
        <TouchableOpacity 
          style={styles.submitButton}
          onPress={handleBudgetSubmit}
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
        
        <Text style={styles.sectionTitle}>Monthly Budget: ${budgetAllocations.totalBudget}</Text>
        
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
              ${budgetAllocations.amount[category]}
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
          onPress={() => navigation.navigate('Dashboard')}
        >
          <Text style={styles.continueText}>Continue to Dashboard</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  // Helper function to get different colors for different categories
  const getCategoryColor = (category) => {
    const colors = {
      Food: '#FF6B6B',
      Accommodation: '#4ECDC4',
      Travel: '#FFD166',
      Entertainment: '#6A0572',
      Education: '#1A535C',
      Other: '#7D7ABC'
    };
    
    return colors[category] || '#470967'; // Default to app primary color
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <Navbar 
        title="Budget Questionnaire" 
        onBackPress={() => {
          if (currentStep > 0 && currentStep < totalSteps) {
            setCurrentStep(currentStep - 1);
          } else {
            navigation.goBack();
          }
        }} 
      />
      <ScrollView contentContainerStyle={styles.container}>
        {currentStep < questions.length && renderQuestion(questions[currentStep])}
        {currentStep === questions.length && renderBudgetInput()}
        {currentStep > questions.length && renderResults()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: "#f0f0f0" 
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