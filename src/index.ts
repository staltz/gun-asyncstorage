import * as Gun from "gun";
import { Adapter } from "./adapter";

Gun.on("opt", (context: any) => {
  this.to.next(context);
  const adapter = new Adapter();

  // Allows other plugins to respond concurrently.
  const pluginInterop = (middleware: any) =>
    function(ctx: any) {
      this.to.next(ctx);
      return middleware(ctx);
    };

  // Register the adapter
  context.on("get", pluginInterop(adapter.read));
  context.on("put", pluginInterop(adapter.write));
});
