import "./Container.css";
import Entry from "../Entry/Entry";
import InputBar from "../InputBar/InputBar";
import Footer from "../Footer/Footer";
import IconButton from "../IconButton/IconButton";

export default function Container(props: { taskObj: Array<string> }) {
  const taskArray: Array<string> = props.taskObj;
  const taskList = taskArray.map((todo) => <Entry toDo={todo} />);

  return (
    <>
      <div className="outer-box">
        <header className="main-header">
          <h1>TODO</h1>
          <span></span>
          <IconButton></IconButton>
        </header>
        <InputBar></InputBar>
        <div className="line-break-container"></div>
        <>{taskList}</>
        <Footer></Footer>
      </div>
    </>
  );
}
