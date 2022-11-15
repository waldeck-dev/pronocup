import { Select, SelectOptionSettings } from "../deps.ts";
import { jwt } from "../mod.ts";

interface ICliViewOptions {
  title?: string;
  parent?: CliView;
  prefetch?: IPrefetch;
  options: (arg0: IOptionsOptions) => Promise<SelectOptionSettings[] | void>;
  handleValue?: (value: string) => Promise<void>;
}

type CliViewParams = Record<string, unknown>;

interface IOptionsOptions {
  params?: CliViewParams;
  data: Record<string, unknown>;
}

interface IPrefetch {
  url: string | ((params: CliViewParams) => string);
  method?: string;
  body?: Record<string, unknown>;
}

export class CliView {
  title;
  parent;
  prefetch;
  options;
  handleValue;
  params = {};

  constructor(options: ICliViewOptions) {
    this.title = options.title;
    this.parent = options?.parent;
    this.prefetch = options?.prefetch;
    this.options = options.options;
    this.handleValue = options?.handleValue;
  }

  async show(params?: CliViewParams) {
    this.params = params ?? {};

    this.clear();

    const rawResponse = await this.fetchData(params);

    const options = await this.options({ params, data: rawResponse });

    const value = await Select.prompt({
      message: this.getTitle(),
      options: [
        ...(options || []),
        ...(
          this.parent
            ? [
              Select.separator("——————————"),
              { name: "⬅️  Go back", value: "back" },
            ]
            : []
        ),
      ],
    });

    if (value === "back") {
      if (this.parent) {
        await this.parent?.show(this.parent?.params);
      }
    }

    if (typeof this.handleValue === "function") {
      await this.handleValue(value);
    }
  }

  async fetchData(params?: CliViewParams) {
    let rawResponse;

    if (this.prefetch) {
      const url = typeof this.prefetch.url === "function"
        ? this.prefetch.url({ ...params })
        : this.prefetch.url;

      const res = await fetch(url, {
        method: this.prefetch.method ?? "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwt}`,
        },
        body: typeof this.prefetch.body === "object"
          ? JSON.stringify({ ...this.prefetch.body })
          : undefined,
      });

      rawResponse = await res.json();
    }

    return rawResponse;
  }

  getTitle() {
    let title = "";

    if (this.parent) {
      title += this.parent.getTitle() + " 〉";
    }

    return title + this.title;
  }

  clear(messages?: string | string[]) {
    console.log("\x1Bc");

    if (messages) {
      if (typeof messages === "string") {
        messages = [messages];
      }

      messages.forEach((msg) => {
        console.error(msg);
      });
    }
  }
}
