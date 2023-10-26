type AuthContextType = {
  setAccessToken: (token: string) => void;
  accessToken: string
};

type Order = 'asc' | 'desc';

interface Task {
  id: string;
  name: string;
  description: string;
}

interface NewTaskProps {
  onTaskCreated: () => void;
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

interface Data {
  id: number | string;
  lastName: string;
  role: string;
  email: string;
  username: string;
  firstName: string;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

interface ToDoProps {
  taskCreated: boolean;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
}

interface UserData {
  projectsIncludes: ProjectData[];
}

interface ProjectData {
  project: {
    name: string;
    description: string;
  };
}