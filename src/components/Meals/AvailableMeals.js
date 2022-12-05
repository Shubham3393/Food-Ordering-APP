import Card from '../UI/Card';
import { useEffect, useState } from 'react';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const feachingMeals = async() => {
    
    try {
      const response = await fetch("https://food-app-74f07-default-rtdb.firebaseio.com/meals.json");
      if(!response.ok){
        
        throw new Error('something wrong occoured xD');
      }
      const responseData = await response.json();
      const temp = [];

      for(const key in responseData){
        temp.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        })
      }
      setMeals(temp);

    } catch (error) {
      setError(true);
      console.log(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    feachingMeals();
  },[])

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      item={meal}
    />
  ));

  return (
    <div className={classes.meals}>
      <Card>
        {!isLoading && !error &&<ul>{mealsList}</ul>}
        {isLoading && <p>loading...</p>}
        {error && <p>Something went wrong!</p>}
      </Card>
    </div>
  );
};

export default AvailableMeals;
