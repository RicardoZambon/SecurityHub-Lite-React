export type Application = {
  id?: string;
  name?: string;
}

export function fetchApplications(): Promise<Application[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(readApplications());
    }, Math.random() * 2000);
  });
}

export function getApplicationById(id: string): Promise<Application | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(readApplications().find(application => application.id === id));
    }, Math.random() * 2000);
  });
}

export function saveApplication(application: Application): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const applicationId: string = application.id || (readApplications().length + 1).toString();

      const applications = readApplications();
      if (application.id) {
        // Update existing application
        const index = applications.findIndex(a => a.id === application.id);
        if (index !== -1) {
          applications[index] = application;
        } else {
          // Application not found, something went wrong.
          throw new Error(`Application with id ${application.id} not found`);
        }
      } else {
        // Create new application
        applications.push({ ...application, id: applicationId });
      }

      localStorage.setItem("applications", JSON.stringify(applications));
      resolve(applicationId);

    }, Math.random() * 2000);
  });
}

// Utility function to read applications from localStorage.
function readApplications(): Application[] {
  let applications = [];
  const data: string | null = localStorage.getItem("applications");
  if (data) {
    try {
      applications = JSON.parse(data);
    }
    catch (e) {
      console.error("Error parsing applications from localStorage", e);
    }
  }

  if (applications.length === 0) {
    applications = [
      { id: '1', name: 'App One' },
      { id: '2', name: 'App Two' },
      { id: '3', name: 'App Three' },
    ];
  }

  return applications;
}