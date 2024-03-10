// // App.js
// import React, { useState, useEffect } from 'react';
// import { DragDropContext } from 'react-beautiful-dnd';
// import TaskCard from './components/TaskCard'; // Import TaskCard component
// import NewTaskForm from './components/NewTaskForm';
// import TaskDetailsPage from './components/TaskDetailsPage'; // Import TaskDetailsPage component
// import StatusColumn from './components/StatusColumn';
// import AddStatusForm from './components/AddStatusForm';
// import './App.css'; // Import CSS file for styling

// const App = () => {
//   const [statuses, setStatuses] = useState([
//     { id: 'todo', title: 'To Do', tasks: [] },
//     { id: 'inProgress', title: 'In Progress', tasks: [] },
//     { id: 'done', title: 'Done', tasks: [] }
//   ]);

//   // Load tasks from local storage on component mount
//   useEffect(() => {
//     const savedTasks = localStorage.getItem('tasks');
//     if (savedTasks) {
//       setStatuses(JSON.parse(savedTasks));
//     }
//   }, []);

//   // Update local storage whenever tasks change
//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(statuses));
//   }, [statuses]);

//   const handleDragEnd = (result) => {
//     const { destination, source, draggableId } = result;

//     // If dropped outside of droppable area
//     if (!destination) {
//       return;
//     }

//     // If dropped in the same column and position hasn't changed
//     if (
//       destination.droppableId === source.droppableId &&
//       destination.index === source.index
//     ) {
//       return;
//     }

//     const startColumn = statuses.find(
//       (column) => column.id === source.droppableId
//     );
//     const endColumn = statuses.find(
//       (column) => column.id === destination.droppableId
//     );

//     // If dropped in the same column
//     if (startColumn === endColumn) {
//       const newTasks = Array.from(startColumn.tasks);
//       newTasks.splice(source.index, 1);
//       newTasks.splice(destination.index, 0, draggableId);

//       const newColumn = {
//         ...startColumn,
//         tasks: newTasks
//       };

//       const newStatuses = statuses.map((column) =>
//         column.id === newColumn.id ? newColumn : column
//       );

//       setStatuses(newStatuses);
//     } else {
//       // If dropped in different column
//       const startTasks = Array.from(startColumn.tasks);
//       startTasks.splice(source.index, 1);
//       const newStartColumn = {
//         ...startColumn,
//         tasks: startTasks
//       };

//       const endTasks = Array.from(endColumn.tasks);
//       endTasks.splice(destination.index, 0, draggableId);
//       const newEndColumn = {
//         ...endColumn,
//         tasks: endTasks
//       };

//       const newStatuses = statuses.map((column) =>
//         column.id === newStartColumn.id
//           ? newStartColumn
//           : column.id === newEndColumn.id
//           ? newEndColumn
//           : column
//       );

//       setStatuses(newStatuses);
//     }
//   };

//   const addNewTask = (title, description, statusId) => {
//     const newTask = {
//       id: `task${Date.now()}`,
//       title,
//       description
//     };

//     const updatedStatuses = statuses.map((status) =>
//       status.id === statusId
//         ? { ...status, tasks: [...status.tasks, newTask] }
//         : status
//     );

//     setStatuses(updatedStatuses);
//   };

//   const addNewStatus = (title) => {
//     const newStatus = {
//       id: `status${Date.now()}`,
//       title,
//       tasks: []
//     };

//     setStatuses([...statuses, newStatus]);
//   };

//   return (
//     <DragDropContext onDragEnd={handleDragEnd}>
//       <div className="main-app">
//         <div className="status-columns">
//           {statuses.map((status) => (
//             <StatusColumn key={status.id} status={status} />
//           ))}
//         </div>
//         <div className="new-task-form">
//           <NewTaskForm statuses={statuses} addNewTask={addNewTask} />
//           <AddStatusForm addNewStatus={addNewStatus} />
//         </div>
//       </div>
//     </DragDropContext>
//   );
// };

// export default App;

//App.js

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'; // Removed unused imports
import TaskCard from './components/TaskCard';
import NewTaskForm from './components/NewTaskForm';
import StatusColumn from './components/StatusColumn';
import AddStatusForm from './components/AddStatusForm';
import './App.css';

const App = () => {
  const [statuses, setStatuses] = useState([
    { id: 'todo', title: 'To Do', tasks: [] },
    { id: 'inProgress', title: 'In Progress', tasks: [] },
    { id: 'done', title: 'Done', tasks: [] }
  ]);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setStatuses(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(statuses));
  }, [statuses]);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = statuses.find((column) => column.id === source.droppableId);
    const endColumn = statuses.find((column) => column.id === destination.droppableId);

    const startTasks = Array.from(startColumn.tasks);
    startTasks.splice(source.index, 1);
    const newStartColumn = {
      ...startColumn,
      tasks: startTasks
    };

    const endTasks = Array.from(endColumn.tasks);
    endTasks.splice(destination.index, 0, draggableId);
    const newEndColumn = {
      ...endColumn,
      tasks: endTasks
    };

    const newStatuses = statuses.map((column) =>
      column.id === newStartColumn.id
        ? newStartColumn
        : column.id === newEndColumn.id
          ? newEndColumn
          : column
    );

    setStatuses(newStatuses);
  };

  const addNewTask = (title, description, statusId) => {
    const newTask = {
      id: `task${Date.now()}`,
      title,
      description
    };

    const updatedStatuses = statuses.map((status) =>
      status.id === statusId
        ? { ...status, tasks: [...status.tasks, newTask] }
        : status
    );

    setStatuses(updatedStatuses);
  };

  const addNewStatus = (title) => {
    const newStatus = {
      id: `status${Date.now()}`,
      title,
      tasks: []
    };

    setStatuses([...statuses, newStatus]);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="main-app">
        <Droppable droppableId="todo" direction="horizontal">
          {(provided) => (
            <div className="status-columns" ref={provided.innerRef} {...provided.droppableProps}>
              {/* Render tasks for the "todo" status */}
              {statuses.map((status, index) => (
                <StatusColumn key={status.id} status={status} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>



        <div className="new-task-form">
          <NewTaskForm statuses={statuses} addNewTask={addNewTask} />
          <AddStatusForm addNewStatus={addNewStatus} />
        </div>
      </div>
    </DragDropContext>
  );
};

export default App;



