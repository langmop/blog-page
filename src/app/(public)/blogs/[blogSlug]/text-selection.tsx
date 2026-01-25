"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";

function TextSelection() {
  const [selection, setSelection] = useState<{
    text: string;
    rect: DOMRect | null;
  } | null>(null);
  console.log(selection?.rect, 'gggggggg');
  const [comment, setComment] = useState("");

  const popoverRef = useRef<HTMLDivElement | null>(null);
  function onSelectionStart(e: Event) {
    setSelection({
      text: "",
      rect: null,
    });
  }

  function onSelectionStop(e: MouseEvent) {
    if (popoverRef.current && popoverRef.current.contains(e.target as Node)) {
      return;
    }

    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) {
      setSelection(null);
      return;
    }

    const range = sel.getRangeAt(0);
    const text = sel.toString().trim();

    if (!text) {
      setSelection(null);
      return;
    }

    const rect = range.getBoundingClientRect();

    setSelection({
      text,
      rect,
    });
  }

  useEffect(() => {
    window.addEventListener("selectstart", onSelectionStart);
    window.addEventListener("mouseup", onSelectionStop);

    return () => {
      window.removeEventListener("selectstart", onSelectionStart);
      window.removeEventListener("mouseup", onSelectionStop);
    };
  }, []);

  const top = (selection?.rect?.top ?? 0) + window.scrollY - 40;
  const left =
    (selection?.rect?.left ?? 0) +
    (selection?.rect?.width ?? 0) / 2 +
    window.scrollX -
    40;

  return selection?.text && selection?.rect ? (
    <div
      ref={popoverRef}
      style={{
        position: "absolute",
        top,
        left,
      }}
    >
      <div className="flex items-between gap-3">
        <Input
          className="bg-black text-white"
          onChange={(e) => setComment(e.target?.value)}
          placeholder="Enter your content comment here"
        />
        <Button disabled={!comment} className="w-fit">Add comment</Button>
      </div>
    </div>
  ) : null;
}

export default TextSelection;
