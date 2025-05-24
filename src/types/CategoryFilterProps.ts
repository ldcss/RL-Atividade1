export interface CategoryFilterProps {
  onCategorySelect?: (categoryId: string | null) => void;
  selectedCategory?: string | null;
}
