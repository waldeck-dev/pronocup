import { Confirm, Input, Select, SelectOptionSettings } from "../deps.ts";
import { IGroup, IUserGroup } from "../types/api.ts";
import { clear } from "./utils.ts";
import { jwt } from "../mod.ts";
import { CliView } from "./class.ts";

export const GroupMain = new CliView({
  title: "Groups",
  prefetch: {
    url: "http://localhost:1337/api/user-groups",
  },
  options: async ({ data }) =>
    await [
      // @ts-ignore Data comming from api
      ...data.data.map((ug: IUserGroup) => ({
        name: `- ${ug?.group?.name}`,
        value: `${ug?.group?.id}`,
      })),
      Select.separator("——————————"),
      { name: "🔍 Join a Group", value: "search", disabled: true },
      { name: "➕ Create new Group", value: "new" },
    ],
  handleValue: async (value) => {
    if (typeof +value === "number" && !isNaN(+value)) {
      await GroupDetails.show({ groupId: +value });
    }
  },
});

export const GroupDetails = new CliView({
  title: "Users",
  parent: GroupMain,
  prefetch: {
    url: (params) => {
      return typeof params?.groupId === "number"
        ? `http://localhost:1337/api/groups/${+params.groupId}`
        : "";
    },
  },
  options: async ({ data }) => {
    // @ts-ignore Data comming from api
    const allUserGroups = data?.attributes["user-groups"];
    if (!Array.isArray(allUserGroups)) return await GroupMain.show();
    return allUserGroups.map((ug) => ({
      name: ug?.user?.username,
      value: "" + ug?.user?.id,
    } as SelectOptionSettings));
  },
});

export async function GroupForm(_group?: IGroup) {
  clear();

  const name = await Input.prompt({
    message: "Enter group name",
    minLength: 1,
  });

  const confirmed = await Confirm.prompt(
    `Are you sure you want to create group ${name}?`,
  );

  if (confirmed) {
    const res = await fetch("http://localhost:1337/api/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`,
      },
      body: JSON.stringify({ data: { name } }),
    });

    const resJson = await res.json();

    if (typeof resJson?.data?.id === "number") {
      await GroupMain.show();
    }
  }
}
