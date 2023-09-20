export const ROLE_CONSTANTS = {
  name: "role",
  description: "添加/移除role",
};

export const occupation = [
  { role: "FullStack", label: "全栈" },
  { role: "Frontend", label: "前端" },
  { role: "Backend", label: "后端" },
  { role: "Data Science", label: "数据" },
  { role: "AI/ML", label: "人工智能" },
  { role: "UI-UX Designer", label: "UI-UX设计师" },
  { role: "Student", label: "学生" },
];

export const getRoleSelectMessageCustomId = (memberId: string): string =>
  `role-select-${memberId}`;
