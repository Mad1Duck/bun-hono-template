export const fileUtils = (file: File): { originalName: string; ext: string; } => {
  const originalName = file.name.split('.').slice(0, -1).join('.');
  const ext = file.name.split('.').pop() || '';
  return { originalName, ext };
};