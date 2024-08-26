import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance.js";
import { useUser } from "../context/UserContext.jsx"; // Import the useUser hook
import Split from "react-split";
import CodeMirror from '@uiw/react-codemirror';
import Loader from "./Loader.jsx";
import ReactConfetti from "react-confetti";
import toast from "react-hot-toast";
import { createTheme } from '@uiw/codemirror-themes';
import {javascript} from '@codemirror/lang-javascript'

const extensions = [javascript({ jsx: true })];


const ComponentA = ({ language, code, setCode, setLanguage }) => {
  const onChange = React.useCallback((value, viewUpdate) => {
    setCode(value)
  }, []);
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 pb-2">
        <label htmlFor="language" className="block font-medium">
          Language:
        </label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-max border border-gray-300 rounded"
        >
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="python">Python</option>
        </select>
      </div>
      <div>
        <CodeMirror
      value={code}
      height="400px"
      extensions={extensions}
      onChange={onChange}
    />
      </div>
    </div>
  );
};

const ComponentB = ({ input, output, setInput, handleRun, handleSubmit }) => {
  return (
    <div className="flex flex-col">
      <div>
        <textarea
          placeholder="Input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded p-2"
        />
      </div>
      <div>
        <textarea
          placeholder="Output"
          value={output}
          readOnly
          rows={3}
          className="w-full border border-gray-300 rounded p-2 bg-gray-100"
        />
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleRun}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Run
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

function C1({ problem }) {
  
  return (
    <div className="md:w-1/2 mb-4 md:mb-0 md:pr-4 py-4 overflow-y-scroll h-[calc(100vh-5rem)]">
      <div className="pt-4 pb-8">
        <h2 className="text-2xl font-bold mb-2">{problem.title}</h2>
        <code className="mb-4">{problem.description}</code>
      </div>
      <div className="py-4">
        <h3 className="text-xl font-bold mb-2">Input Format:</h3>
        <code className="mb-4">{problem.inputFormat}</code>
      </div>
      <div className="py-4">
        <h3 className="text-xl font-bold mb-2">Output Format:</h3>
        <code className="mb-4">{problem.outputFormat}</code>
      </div>
      <div className="py-4">
        <h3 className="text-xl font-bold mb-2">Constraints:</h3>
        <code className="mb-4">{problem.constraints}</code>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-2 w-full">Examples:</h3>
        {problem?.examples?.length>0 ? problem.examples?.map((example,idx) => (
           <div className="py-4" key={idx}>
            <h3 className="text-xl font-bold mb-2">Input</h3>
            <code className="mb-4 bg-gray-200 w-full p-2">{example?.input}</code>
            <h3 className="text-xl font-bold mb-2">Output</h3>
            <code className="mb-4 bg-gray-200 w-full p-2">{example?.expectedOutput}</code>
          </div>
)) : <p className="text-gray-400">No example test cases</p>}
      </div>
    </div>
  );
}

function C2({
  setLanguage,
  setCode,
  code,
  language,
  input,
  output,
  setInput,
  handleRun,
  handleSubmit,
}) {
  return (
    <div className="pt-4 pr-4">
      <Split className="intterWrap ml-4" sizes={[70, 30]} direction="vertical">
        <ComponentA
          code={code}
          setCode={setCode}
          language={language}
          setLanguage={setLanguage}
        />
        <ComponentB
          input={input}
          setInput={setInput}
          output={output}
          handleRun={handleRun}
          handleSubmit={handleSubmit}
        />
      </Split>
    </div>
  );
}

function ProblemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser(); // Get user from context
  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState("cpp");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [code, setCode] = useState("//Write Your Code Below");
  const [status, setStatus] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    // Fetch the problem details from the database
    axiosInstance
      .get(`/problems/${id}`)
      .then((response) => setProblem(response.data))
      .catch((error) => console.error("Error fetching problem:", error));
  }, [id, user, navigate]);

  useEffect(() => {
    if (status === "Accepted") {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        setStatus("");
      }, 5000);
    }
  }, [status]);

  const handleRun = () => {
    // Run the code using the online compiler API
    axiosInstance
      .post("/compile", { code, input, language })
      .then((response) => setOutput(response.data.output))
      .catch((error) => console.error("Error running code:", error));
  };

  const handleSubmit = () => {
    axiosInstance
      .post("/submit", { problemId: id, code, language })
      .then((response) => {
        setOutput(response.data.output);
        setStatus(response.data.status);
        toast.success("Accepted.");
      })
      .catch((error) => {
        setStatus("Error submitting code");
        console.error("Error submitting code:", error);
      });
  };

  if (!problem) {
    return <Loader />;
  }

  return (
    <>
      <div className="px-8 h-[100vh-5rem]">
        <Split
          className="wrap"
          sizes={[40, 60]}
          minSize={100}
          expandToMin={false}
          gutterSize={5}
          gutterAlign="center"
          snapOffset={20}
          dragInterval={1}
          direction="horizontal"
          cursor="col-resize"
        >
          <C1 problem={problem} />
          <C2
            code={code}
            setCode={setCode}
            language={language}
            setLanguage={setLanguage}
            input={input}
            setInput={setInput}
            output={output}
            handleRun={handleRun}
            handleSubmit={handleSubmit}
          />
        </Split>
        {showConfetti && (
          <ReactConfetti className="absolute" width={1024} height={800} />
        )}
      </div>
    </>
  );
}

export default ProblemDetail;
