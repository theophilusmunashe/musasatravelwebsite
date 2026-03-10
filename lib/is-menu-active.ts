export const isParentActive = (item: any, path: string) => {
    if (!item.dropdown && !path) return false;

    if (item.dropdown) {
        return item.dropdown.some(
            (child: any) =>
                child?.url === path ||
                child?.dropdown?.some((subChild: any) => subChild?.url === path)
        );
    }
};
