export interface Dimensions {
    HEIGHT: number;
    WIDTH:number;
    SCALE:number;
    FONT_SCALE:number;
  }

  export type Context = {
    // todos: Dimensions[];
    saveTodo: (Dimension: Dimensions) => void;
    updateTodo: (Dimension: number) => void;
  };