import { createState } from "@hookstate/core";

export type StepBlock = {
  for: string;
  steps: RecipeStep[];
  blockNumber: number;
};

export type IngredientBlock = {
  for: string;
  ingredients: Ingredient[];
  blockNumber: number;
};

export type Ingredient = {
  name: string;
  amount: string;
  unit: string;
  id: number;
};

export type Recipe = {
  recipeName: string;
  docId?: string;
  stepList: StepBlock[];
  ingredientList: IngredientBlock[];
  imgPath?: string;
  prepTime?: string;
  activeCookingTime?: string;
  totalTime?: string;
  servesAmount?: string;
  source?: string;
  briefDescription?: string;
  cookBook?: string;
};

export type RecipeStep = {
  stepText: string;
  stepNumber: number;
};

export type CalendarDay = {
  isCurrentMonth: boolean;
  month: number;
  number: number;
  year: number;
  date: Date;
  id: number;
};

export type CalendarItem = {
  month: number;
  day: number;
  year: number;
  selectedMeal: string;
  name: string;
};

const currentRecipe: Recipe = {
  recipeName: "",
  prepTime: "",
  activeCookingTime: "",
  totalTime: "",
  servesAmount: "",
  source: "",
  briefDescription: "",
  cookBook: "",
  stepList: [
    {
      for: "",
      steps: [
        {
          stepNumber: 1,
          stepText: "",
        },
      ],
      blockNumber: 0,
    },
  ],
  ingredientList: [
    {
      for: "",
      ingredients: [
        {
          amount: "",
          id: 1,
          name: "",
          unit: "",
        },
      ],
      blockNumber: 0,
    },
  ],
};

const editedRecipe: Recipe = {
  recipeName: "",
  prepTime: "",
  activeCookingTime: "",
  totalTime: "",
  servesAmount: "",
  source: "",
  briefDescription: "",
  cookBook: "",
  stepList: [
    {
      for: "",
      steps: [
        {
          stepNumber: 1,
          stepText: "",
        },
      ],
      blockNumber: 0,
    },
  ],
  ingredientList: [
    {
      for: "",
      ingredients: [
        {
          amount: "",
          id: 1,
          name: "",
          unit: "",
        },
      ],
      blockNumber: 0,
    },
  ],
};

const inputRecipe: Recipe = {
  recipeName: "",
  prepTime: "",
  activeCookingTime: "",
  totalTime: "",
  servesAmount: "",
  source: "",
  briefDescription: "",
  cookBook: "",
  stepList: [
    {
      for: "",
      steps: [
        {
          stepNumber: 1,
          stepText: "",
        },
      ],
      blockNumber: 0,
    },
  ],
  ingredientList: [
    {
      for: "",
      ingredients: [
        {
          amount: "",
          id: 1,
          name: "",
          unit: "",
        },
      ],
      blockNumber: 0,
    },
  ],
};

const allRecipes: Recipe[] = [];

export const store = createState({
  currentRecipe: currentRecipe,
  editedRecipe: editedRecipe,
  inputRecipe: inputRecipe,
  editedImagePreview: "",
  inputImagePreview: "",
  cookBookList: [],
  globalIngredientList: [""],
  allRecipes: allRecipes,
});
