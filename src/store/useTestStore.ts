import create, { StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

interface TestState {
  currentQuestion: number;
  answers: Record<number, any>;
  isSubmitted: boolean;
  setAnswer: (questionId: number, answer: any) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  submitForm: () => void;
  resetTest: () => void;
}

type MyPersist = (
  config: StateCreator<TestState>,
  options: PersistOptions<TestState>
) => StateCreator<TestState>;

const useTestStore = create<TestState>(
  (persist as MyPersist)(
    (set) => ({
      currentQuestion: 0,
      answers: {},
      isSubmitted: false,
      setAnswer: (questionId, answer) =>
        set((state) => ({
          answers: { ...state.answers, [questionId]: answer },
        })),
      nextQuestion: () =>
        set((state) => ({
          currentQuestion: state.currentQuestion + 1,
        })),
      prevQuestion: () =>
        set((state) => ({
          currentQuestion: state.currentQuestion - 1,
        })),
      submitForm: () => set({ isSubmitted: true }),
      resetTest: () => set({ currentQuestion: 0, answers: {}, isSubmitted: false }),
    }),
    {
      name: 'test-storage',
    }
  )
);

export default useTestStore;