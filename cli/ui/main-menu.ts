import { CliView } from "./class.ts";
import { GroupMain } from "./group.ts";

export const MainMenu = new CliView({
  title: "Pronocup",
  options: async () =>
    await [
      { name: "👥 Groups", value: "group", disabled: false },
      { name: "⚽ Predictions", value: "group", disabled: false },
    ],
  handleValue: async (value) => {
    const views = { group: GroupMain } as Record<string, CliView>;
    if (Object.keys(views).includes(value)) return await views[value].show();
  },
});
