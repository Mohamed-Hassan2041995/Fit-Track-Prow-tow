import axios from 'axios';

const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const RAPIDAPI_HOST = 'exercisedb.p.rapidapi.com';

export class ExerciseService {
  private static instance: ExerciseService;
  private readonly baseURL = 'https://exercisedb.p.rapidapi.com';

  private constructor() {}

  static getInstance(): ExerciseService {
    if (!ExerciseService.instance) {
      ExerciseService.instance = new ExerciseService();
    }
    return ExerciseService.instance;
  }

  async getExerciseByName(name: string) {
    try {
      const response = await axios.get(`${this.baseURL}/exercises/name/${name}`, {
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': RAPIDAPI_HOST
        }
      });
      return response.data[0];
    } catch (error) {
      console.error('Error fetching exercise:', error);
      return null;
    }
  }

  async getExercisesByBodyPart(bodyPart: string) {
    try {
      const response = await axios.get(`${this.baseURL}/exercises/bodyPart/${bodyPart}`, {
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': RAPIDAPI_HOST
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching exercises:', error);
      return [];
    }
  }
}

export const exerciseService = ExerciseService.getInstance();