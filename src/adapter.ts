import * as Gun from "gun";
import { AsyncStorage } from "react-native";

export class Adapter {
  public db: any;
  constructor(db: any) {
    this.db = db;
    // Preserve the `this` context for read/write calls.
    this.read = this.read.bind(this);
    this.write = this.write.bind(this);
  }

  public read(context: any) {
    const { get, gun } = context;
    const { "#": key } = get;

    const done = (err: any, data?: any) => {
      this.db.on("in", {
        "@": context["#"],
        put: Gun.graph.node(data),
        err
      });
    };

    AsyncStorage.getItem(key, (err, result) => {
      if (err) {
        done(err);
      } else if (result === null) {
        // Nothing found
        done(null);
      } else {
        done(null, JSON.parse(result as string));
      }
    });
  }

  public write(context: any) {
    const { put: graph, gun } = context;
    const keys = Object.keys(graph);

    const instructions = keys.map((key: string) => [
      key,
      JSON.stringify(graph[key])
    ]);

    AsyncStorage.multiMerge(instructions, (err?: Array<any>) => {
      this.db.on("in", {
        "@": context["#"],
        ok: !err || err.length === 0,
        err
      });
    });
  }
}
