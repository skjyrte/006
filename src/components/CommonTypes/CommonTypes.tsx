export enum FilterState {
  ALL = "All",
  ACTIVE = "Active",
  COMPLETED = "Completed",
}

export type Todo = {
  _id: string;
  task: string;
  completed: boolean;
  __v: number;
};
