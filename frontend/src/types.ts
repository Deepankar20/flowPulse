export type SocketContextType = {
  socket: WebSocket | null;
  pathFilter: Array<{}> | null;
  apiKey: string | null;
  setApiKey: React.Dispatch<React.SetStateAction<string | null>>;
};

export type SocketProviderType = {
  children: React.ReactNode;
};

export interface Project {
  id: number;
  name: string;
  description: string;
  events?: [];
  createdAt: string;
  apiKey: string;
}

export interface TableData {
  id: number;
  path: string;
  visitors: number;
  views: number;
}
