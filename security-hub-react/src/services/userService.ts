export type User = {
  department: string,
  email: string,
  id: string,
  jobFunction: string,
  name: string,
}

export function fetchUsers(): Promise<User[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(readUsers().sort((a, b) => a.name.localeCompare(b.name)));
    }, Math.random() * 2000);
  });
}

export function getUserById(id: string): Promise<User | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(readUsers().find(user => user.id === id));
    }, Math.random() * 2000);
  });
}

export function saveUser(user: User): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userId: string = user.id || (readUsers().length + 1).toString();

      const users = readUsers();
      if (user.id) {
        // Update existing user
        const index = users.findIndex(u => u.id === user.id);
        if (index !== -1) {
          users[index] = user;
        } else {
          // User not found, something went wrong.
          throw new Error(`User with id ${user.id} not found`);
        }
      } else {
        // Create new user
        users.push({ ...user, id: userId });
      }

      localStorage.setItem("users", JSON.stringify(users));
      resolve(userId);

    }, Math.random() * 2000);
  });
}

// Utility function to read users from localStorage.
function readUsers(): User[] {
  let users = [];
  const data: string | null = localStorage.getItem("users");
  if (data) {
    try {
      users = JSON.parse(data);
    }
    catch (e) {
      console.error("Error parsing users from localStorage", e);
    }
  }

  if (users.length === 0) {
    users = [
      { id: '1', name: 'Admin', department: 'IT', email: 'admin@securityhub.com', jobFunction: 'Administrator' },
      { id: '2', name: 'John Doe', department: 'Finance', email: 'jd@securityhub.com', jobFunction: 'Accountant' },
      { id: '3', name: 'Jane Smith', department: 'HR', email: 'js@securityhub.com', jobFunction: 'HR Manager' },
      { id: '4', name: 'Emily Davis', department: 'IT', email: 'ed@securityhub.com', jobFunction: 'Developer' },
      { id: '5', name: 'Michael Brown', department: 'Marketing', email: 'mb@securityhub.com', jobFunction: 'Marketing Specialist' },
      { id: '6', name: 'Sarah Wilson', department: 'IT', email: 'sw@securityhub.com', jobFunction: 'System Analyst' },
      { id: '7', name: 'David Martinez', department: 'Finance', email: 'dm@securityhub.com', jobFunction: 'Financial Analyst' },
      { id: '8', name: 'Lisa Anderson', department: 'HR', email: 'la@securityhub.com', jobFunction: 'Recruiter' },
      { id: '9', name: 'James Taylor', department: 'Marketing', email: 'jt@securityhub.com', jobFunction: 'Content Manager' },
      { id: '10', name: 'Patricia Thomas', department: 'IT', email: 'pt@securityhub.com', jobFunction: 'Network Engineer' },
      { id: '11', name: 'Robert Jackson', department: 'Finance', email: 'rj@securityhub.com', jobFunction: 'Budget Analyst' },
      { id: '12', name: 'Jennifer White', department: 'HR', email: 'jw@securityhub.com', jobFunction: 'Training Coordinator' },
      { id: '13', name: 'Christopher Harris', department: 'IT', email: 'ch@securityhub.com', jobFunction: 'DevOps Engineer' },
      { id: '14', name: 'Linda Martin', department: 'Marketing', email: 'lm@securityhub.com', jobFunction: 'Brand Manager' },
      { id: '15', name: 'Daniel Thompson', department: 'Finance', email: 'dt@securityhub.com', jobFunction: 'Auditor' },
      { id: '16', name: 'Nancy Garcia', department: 'HR', email: 'ng@securityhub.com', jobFunction: 'Benefits Administrator' },
      { id: '17', name: 'Matthew Rodriguez', department: 'IT', email: 'mr@securityhub.com', jobFunction: 'Security Analyst' },
      { id: '18', name: 'Karen Lee', department: 'Marketing', email: 'kl@securityhub.com', jobFunction: 'Social Media Manager' },
      { id: '19', name: 'Paul Walker', department: 'Finance', email: 'pw@securityhub.com', jobFunction: 'Controller' },
      { id: '20', name: 'Betty Hall', department: 'IT', email: 'bh@securityhub.com', jobFunction: 'Database Administrator' },
    ];
  }

  return users;
}