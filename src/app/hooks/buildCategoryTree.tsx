interface Category {
  _id: string;
  name: string;
  parentId?: string;
  level: number;
  children?: Category[];
}

export function buildCategoryTree(categories: Category[]): Category[] {
  const map = new Map<string, Category>();
  const roots: Category[] = [];
  categories.forEach(cat => {
    map.set(cat._id, { ...cat, children: [] });
  });

  categories.forEach(cat => {
    if (cat.parentId && map.has(cat.parentId)) {
      map.get(cat.parentId)!.children!.push(map.get(cat._id)!);
    } else {
      roots.push(map.get(cat._id)!);
    }
  });

  return roots;
}
