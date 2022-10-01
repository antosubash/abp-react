import { Button } from "@abpreact/core";
import { useIsomorphicLayoutEffect } from "@abpreact/utils";

export default function Docs() {
  useIsomorphicLayoutEffect(() => {
    console.log("abpreact docs page");
  }, []);
  return (
    <div>
      <h1>abpreact Documentation</h1>
      <Button>Click me</Button>
    </div>
  );
}
