import * as Gun from "gun";
import { Adapter } from "./adapter";

Gun.on("create", (db: any) => {
  const adapter = new Adapter(db);

  // Allows other plugins to respond concurrently.
  const pluginInterop = (middleware: any) =>
    function(ctx: any) {
      this.to.next(ctx);
      return middleware(ctx);
    };

  // Register the adapter
  db.on("get", pluginInterop(adapter.read));
  db.on("put", pluginInterop(adapter.write));
});
