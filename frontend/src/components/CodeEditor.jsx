import React, { useState, useRef, useEffect } from 'react';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/clike/clike'; // For C++
import 'codemirror/mode/python/python'; // For Python
import 'codemirror/mode/javascript/javascript'; // For Java (Java mode can be used as a placeholder)

const CodeEditor = ({ code, onCodeChange, language, onLanguageChange, input, onInputChange, onRun, onSubmit }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.editor.setValue(code);
    }
  }, [code]);

  const mode = {
    cpp: 'text/x-c++src',
    py: 'python',
    java: 'text/x-java',
  }[language] || 'text/x-c++src';

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <select value={language} onChange={(e) => onLanguageChange(e.target.value)} className="p-2 border rounded">
          <option value="cpp">C++</option>
          <option value="py">Python</option>
          <option value="java">Java</option>
        </select>
        <textarea
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Enter input here..."
          rows="3"
          className="p-2 border rounded"
        />
      </div>
      <ControlledEditor
        ref={editorRef}
        value={code}
        onBeforeChange={(editor, data, value) => onCodeChange(value)}
        options={{
          lineNumbers: true,
          mode: mode,
          theme: 'material',
        }}
        className="h-60 border rounded"
      />
      <div className="flex space-x-2">
        <button onClick={onRun} className="px-4 py-2 bg-green-500 text-white rounded">
          Run
        </button>
        <button onClick={onSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </div>
    </div>
  );
};

export default CodeEditor;
