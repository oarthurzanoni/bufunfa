import CategoryOptions from "../settings/CategoryOptions";

export default function getCategoryIcon(category: string): string {
  const categoryFound = CategoryOptions.find(option => option.description === category)!;

  return categoryFound?.icon;
}