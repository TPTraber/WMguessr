function getRequiredElement(id: string): HTMLElement {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Required element not found: ${id}`);
    }
    return element as HTMLElement;
}
