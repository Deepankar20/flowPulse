export type SocketContextType = {
  socket: WebSocket | null;
  pathFilter: Array<{}> | null;
};

export type SocketProviderType = {
  children: React.ReactNode;
};


export interface Project {
  id: number;
  name: string;
  description: string;
  status: "Active" | "Completed" | "On Hold" | "Pending";
  progress: number;
  dueDate: string;
  team: string[];
  priority: "High" | "Medium" | "Low";
  category: string;
  lastUpdated: string;
}