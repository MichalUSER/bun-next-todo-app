import React from "react";
import { TodosType, TodoType } from "../pages";
import styles from "../styles/Home.module.css";

type TodoProps = {
  todos: TodosType;
  removeTodo: (key: string) => void;
  toggleTodo: (key: string) => void;
};

function Todo({ removeTodo, toggleTodo }: TodoProps, todo: TodoType) {
  return (
    <div key={todo[2]}>
      <input
        type="checkbox"
        checked={todo[1]}
        onChange={() => toggleTodo(todo[2])}
      />
      <p
        style={todo[1] ? { textDecorationLine: "line-through" } : {}}
        onClick={() => removeTodo(todo[2])}
      >
        {todo[0]}
      </p>
    </div>
  );
}

export default function Todos(props: TodoProps) {
  return (
    <div className={styles.todos}>
      {props.todos.map((value) => Todo(props, value))}
    </div>
  );
}
