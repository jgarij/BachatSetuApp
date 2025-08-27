import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../App';
import { v4 as uuidv4 } from 'uuid';
import { incomeCategories, expenseCategories } from '../constant/categories';
import { formatDate } from '../utils/formatedDate';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function Form() {
  const { taskList, setTaskList } = useContext(DataContext);
  const [selectType, setSelectType] = useState('');
  const [Category, setCategory] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    category: '',
    amount: 0,
    date: ''
  });
 
  // Destructure values from useSpeechRecognition hook
  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  // Ensure SpeechRecognition is supported outside the render logic
  const isSpeechRecognitionSupported = SpeechRecognition.browserSupportsSpeechRecognition();

  // Handle form input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'amount' ? Number(value) : value
    }));
    if (name === 'type') {
      setSelectType(value);
    }
  }

  function handleClear() {
    setTaskList([]); // Clear the task list
  }
  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    if (formData.type && formData.category && formData.amount > 0) {
      const newTask = {
        id: uuidv4(),
        type: formData.type,
        category: formData.category,
        amount: formData.amount,
        date:
          formData.date === ''
            ? formatDate(new Date())
            : formatDate(new Date(formData.date))
      };

      setTaskList([...taskList, newTask]);

      // Reset form data
      setFormData({
        type: '',
        category: '',
        amount: '',
        date: ''
      });
      setSelectType('');
      resetTranscript();
    } else {
      alert('Please fill out all fields correctly.');
    }
  }

  // Update category options based on selected type
  useEffect(() => {
    if (selectType === 'Income') {
      setCategory(incomeCategories);
    } else if (selectType === 'Expense') {
      setCategory(expenseCategories);
    } else {
      setCategory([]);
    }
  }, [selectType]);

  // Handle speech input parsing
  useEffect(() => {
    console.log("Speech recognition effect triggered");

    if (!isSpeechRecognitionSupported) {
      console.log("Speech recognition not supported");
      return;
    }

    const speechResult = transcript.toLowerCase();
    console.log('Transcript:', speechResult); // Debugging

    if (speechResult.includes('type income')) {
      console.log("Setting type to Income");
      setFormData((prevData) => ({
        ...prevData,
        type: 'Income'
      }));
      setSelectType('Income');
      resetTranscript();
    } else if (speechResult.includes('type expense')) {
      console.log("Setting type to Expense");
      setFormData((prevData) => ({
        ...prevData,
        type: 'Expense'
      }));
      setSelectType('Expense');
      resetTranscript();
    } else if (speechResult.includes('category')) {
      const category = speechResult.replace('category', '').trim();
      const matchedCategory = Category.find(cat => cat.type.toLowerCase() === category);
      console.log("outside match",Category)
      if (matchedCategory) {
        console.log("match")
        console.log("Setting category to:", matchedCategory.type);
        setFormData(prevData => ({
          ...prevData,
          category: matchedCategory.type
        }));
        resetTranscript();
      }
    } else if (speechResult.includes('amount')) {
      const amountString = speechResult.replace('amount', '').trim();
      const amount = parseInt(amountString, 10);
      if (!isNaN(amount)) {
        console.log("Setting amount to:", amount);
        setFormData((prevData) => ({
          ...prevData,
          amount
        }));
        resetTranscript();
      }
    } else if (speechResult.includes('date')) {
      const dateString = speechResult.replace('date', '').trim();
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        console.log("Setting date to:", date);
        setFormData((prevData) => ({
          ...prevData,
          date: formatDate(date)
        }));
        resetTranscript();
      }
    }
  }, [transcript, resetTranscript, isSpeechRecognitionSupported]);

  // Start speech recognition
  const startRecognition = () => {
    if (isSpeechRecognitionSupported) {
      console.log("Starting speech recognition");
      SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
    }
  };

  // Stop speech recognition
  const stopRecognition = () => {
    if (isSpeechRecognitionSupported) {
      console.log("Stopping speech recognition");
      SpeechRecognition.stopListening();
    }
  };

  return (
    <div>
      {!isSpeechRecognitionSupported && (
        <span>Browser doesn't support speech recognition.</span>
      )}
      <form onSubmit={handleSubmit}>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Type
        </label>
        <select
          name="type"
          id="type"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
          onChange={handleChange}
          value={formData.type}
        >
          <option hidden name="type">
            Select Type
          </option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mt-4">
          Category
        </label>
        <select
          name="category"
          id="category"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
          onChange={handleChange}
          value={formData.category}
        >
          <option hidden name="category" value="">
            Select Category
          </option>
          {Category.map((c, index) => (
            <option key={index} value={c.type}>
              {c.type}
            </option>
          ))}
        </select>

        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mt-4">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          placeholder="Amount"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
          onChange={handleChange}
          value={formData.amount}
        />

        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mt-4">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm"
          onChange={handleChange}
          value={formData.date}
        />

        {isSpeechRecognitionSupported && (
          <button
            type="button"
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md"
            onClick={listening ? stopRecognition : startRecognition}
          >
            {listening ? 'Stop Voice Recognition 🎙️' : 'Start Voice Recognition 🎙️'}
          </button>
        )}

        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md">
          Create
        </button>
        <br/>
        {taskList.length>0 &&   <button onClick={handleClear}  className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md"> Clear </button>}

      </form>
    </div>
  );
}
