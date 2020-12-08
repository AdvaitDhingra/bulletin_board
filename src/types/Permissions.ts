export default interface Permissions {
  verified: boolean;
  className: string;
  courses: Record<string, string[]>;
}
