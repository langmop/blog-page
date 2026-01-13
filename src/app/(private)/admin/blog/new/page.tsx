"use client"
import React from "react";
import MDEditor from "@uiw/react-md-editor";

export default function NewBlog() {
  const [value, setValue] = React.useState("**Hello world!!!**");
  return (
    <div className="p-4 flex gap-2 flex-col">
    
      <MDEditor value={value} onChange={(val) => setValue(val || "")} />
    </div>
  );
}
