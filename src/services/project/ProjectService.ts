export interface ProjectData {
  moduleList: Record<string, unknown>;
  metadata?: {
    name?: string;
    version?: string;
    created?: string;
    modified?: string;
  };
}

export class ProjectService {
  saveProject(data: ProjectData, filename = 'project.json'): void {
    const projectData = {
      ...data,
      metadata: {
        ...data.metadata,
        modified: new Date().toISOString()
      }
    };

    const blob = new Blob([JSON.stringify(projectData, null, 2)], {
      type: 'application/json'
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  async loadProject(file: File): Promise<ProjectData> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const data = JSON.parse(content) as ProjectData;
          
          if (!data.moduleList) {
            throw new Error('Invalid project file: missing moduleList');
          }
          
          resolve(data);
        } catch (error) {
          reject(new Error(
            `Failed to parse project file: ${error instanceof Error ? error.message : 'Unknown error'}`
          ));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read project file'));
      };
      
      reader.readAsText(file);
    });
  }

  createFilePicker(): Promise<File | null> {
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      
      input.onchange = (event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0] || null;
        resolve(file);
      };
      
      input.oncancel = () => {
        resolve(null);
      };
      
      document.body.appendChild(input);
      input.click();
      document.body.removeChild(input);
    });
  }
}

export const projectService = new ProjectService();
