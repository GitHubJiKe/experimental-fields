import { Button, Input } from "@ss/mtd-react";
import { RefObject, useEffect, useRef, useState } from "react";

export default function Frame() {
  const [url, setURL] = useState("");
  const inputRef = useRef() as RefObject<Input>;
  useEffect(() => {
    const a = Number(url);

    if (a > 0) {
      console.log(a);
    }
  }, [url]);
  return (
    <div>
      <div style={{ display: "flex", gap: 24 }}>
        <Input defaultValue={url} ref={inputRef} />
        <Button
          onClick={() => {
            setURL(inputRef.current?.state.value);
          }}
        >
          Sure
        </Button>
      </div>
      <br />
      <iframe
        src={url}
        referrerPolicy="strict-origin"
        style={{ width: window.innerWidth - 48, height: "80vh" }}
      ></iframe>
    </div>
  );
}
