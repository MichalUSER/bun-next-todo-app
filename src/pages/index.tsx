import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import styles from "../styles/Home.module.css";
import "../styles/Mobile.module.css";
import useStorage from "../other/useStorage";
import Form from "../components/Form";
import Todos from "../components/Todos";
import Transition from "../components/Transition";
import Footer from "../components/Footer";
import Header from "../components/Header";

export type TodoType = [string, boolean, string];
export type TodosType = TodoType[];

export default function Home({}) {
  const [todos, setTodos] = useState<TodosType>([]);
  const [title, setTitle] = useState("");
  const { getItem, setItem, removeItem } = useStorage();

  useEffect(() => {
    const data = getItem("todos");
    if (data !== undefined) {
      setTodos(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(key: string) {
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo[2] == key) todo[1] = !todo[1];
        return todo;
      })
    );
  }

  function removeTodo(key: string) {
    setTodos((todos) => todos.filter((todo) => todo[2] != key));
  }

  function removeTodos() {
    removeItem("todos");
    setTodos([]);
  }

  function addTodo(todo: string) {
    if (todo.length == 0 || todo.length >= 24 || todo[0] == " ") return;
    setTodos((todos) => [...todos, [todo, false, uuidv4()]]);
    setTitle("");
  }

  function onDragEnd({ source, destination }: DropResult) {
    if (!destination) return;
    setTodos((todos) => {
      const newTodos = Array.from(todos);
      const [reorderedTodo] = newTodos.splice(source.index, 1);
      newTodos.splice(destination.index, 0, reorderedTodo);
      return newTodos;
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Todo app</title>
        <meta name="description" content="Todo app bootstrapped with Bun" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <h1>Todo app</h1>
        <Link href="/about">
          <a className={styles.link}>About</a>
        </Link>

        <Transition>
          <Form title={title} setTitle={setTitle} addTodo={addTodo} />
          <button className={styles.clear} onClick={removeTodos}>
            Clear
          </button>
          {todos != [] && (
            <DragDropContext onDragEnd={onDragEnd}>
              <Todos
                removeTodo={removeTodo}
                toggleTodo={toggleTodo}
                todos={todos}
              />
            </DragDropContext>
          )}
        </Transition>
      </main>

      <Footer />
    </div>
  );
}
